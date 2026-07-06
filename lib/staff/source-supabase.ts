import type { SupabaseClient } from '@supabase/supabase-js';
import { createSourceSupabaseClient } from '@/lib/supabase/source';
import { getSourceMigrationConfig, type SourceMigrationConfig } from './source-config';

export interface SourceResourceRow {
  sourceId: string;
  title?: string;
  filePath?: string;
  fileUrl?: string;
  filename: string;
  bucket?: string;
  subject?: string;
  grade?: string;
  type?: string;
  topic?: string;
  pages?: number;
  difficulty?: string;
  checksum?: string;
  raw: Record<string, unknown>;
}

export interface SourceResourcePage {
  config: SourceMigrationConfig;
  rows: SourceResourceRow[];
}

type StorageEntry = {
  id?: string | null;
  name: string;
  metadata?: Record<string, unknown> | null;
  updated_at?: string | null;
  created_at?: string | null;
};

export async function listSourceResources(limit: number): Promise<SourceResourcePage> {
  const config = getSourceMigrationConfig();
  const db = createSourceSupabaseClient();

  if (config.mode === 'storage') {
    return { config, rows: await listStoragePdfResources(db, config, limit) };
  }

  const { data, error } = await db
    .from(config.table)
    .select('*')
    .limit(limit);

  if (error) throw new Error(error.message);

  return {
    config,
    rows: ((data ?? []) as Record<string, unknown>[]).map((row, index) => normalizeSourceRow(row, config, index)),
  };
}

export async function fetchSourceFile(row: Pick<SourceResourceRow, 'fileUrl' | 'bucket' | 'filePath'>, config: SourceMigrationConfig): Promise<Response> {
  if (row.fileUrl) {
    const fetched = await fetch(row.fileUrl);
    if (!fetched.ok || !fetched.body) throw new Error(`Source URL fetch failed with ${fetched.status}`);
    return fetched;
  }

  const bucket = row.bucket || config.defaultBucket;
  if (bucket && row.filePath) {
    const db = createSourceSupabaseClient() as SupabaseClient;
    const { data, error } = await db.storage.from(bucket).createSignedUrl(row.filePath, 60 * 10);
    if (error || !data?.signedUrl) throw new Error(error?.message || 'Could not create source signed URL.');

    const fetched = await fetch(data.signedUrl);
    if (!fetched.ok || !fetched.body) throw new Error(`Source storage fetch failed with ${fetched.status}`);
    return fetched;
  }

  if (row.filePath) {
    const gcsUrl = googleCloudStorageUrl(row.filePath);
    if (gcsUrl) {
      const fetched = await fetch(gcsUrl);
      if (!fetched.ok || !fetched.body) throw new Error(`GCS source fetch failed with ${fetched.status}`);
      return fetched;
    }
  }

  throw new Error('Source file needs a file URL, Supabase bucket/path, or GCS public base/bucket configuration.');
}

async function listStoragePdfResources(db: SupabaseClient, config: SourceMigrationConfig, limit: number): Promise<SourceResourceRow[]> {
  const buckets = config.defaultBucket
    ? [{ name: config.defaultBucket }]
    : await listBuckets(db);

  const rows: SourceResourceRow[] = [];
  for (const bucket of buckets) {
    await appendBucketFiles(db, bucket.name, '', rows, limit);
    if (rows.length >= limit) break;
  }
  return rows.slice(0, limit);
}

async function listBuckets(db: SupabaseClient): Promise<{ name: string }[]> {
  const { data, error } = await db.storage.listBuckets();
  if (error) throw new Error(error.message);
  return (data ?? []).map((bucket) => ({ name: bucket.name })).filter((bucket) => !!bucket.name);
}

async function appendBucketFiles(db: SupabaseClient, bucket: string, prefix: string, rows: SourceResourceRow[], limit: number): Promise<void> {
  if (rows.length >= limit) return;

  const { data, error } = await db.storage.from(bucket).list(prefix || undefined, {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  });
  if (error) throw new Error(error.message);

  for (const entry of (data ?? []) as StorageEntry[]) {
    if (rows.length >= limit) return;
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (isFolder(entry)) {
      await appendBucketFiles(db, bucket, path, rows, limit);
      continue;
    }

    if (!/\.pdf$/i.test(entry.name)) continue;
    const size = numberValue(entry.metadata?.size);
    const checksum = stringValue(entry.metadata?.eTag) || stringValue(entry.metadata?.etag) || stringValue(entry.metadata?.cacheControl);

    rows.push({
      sourceId: `${bucket}:${path}`,
      filePath: path,
      filename: entry.name,
      bucket,
      pages: undefined,
      checksum,
      raw: {
        bucket,
        path,
        name: entry.name,
        id: entry.id,
        size,
        created_at: entry.created_at,
        updated_at: entry.updated_at,
        metadata: entry.metadata ?? {},
      },
    });
  }
}

function isFolder(entry: StorageEntry): boolean {
  return !entry.id && !/\.pdf$/i.test(entry.name);
}

function normalizeSourceRow(row: Record<string, unknown>, config: SourceMigrationConfig, index: number): SourceResourceRow {
  const c = config.columns;
  const sourceId = stringValue(row[c.id]) || stringValue(row.id) || `row-${index + 1}`;
  const filePath = stringValue(row[c.filePath]);
  const fileUrl = stringValue(row[c.fileUrl]);
  const filename = stringValue(row[c.filename]) || filenameFromPath(filePath) || filenameFromUrl(fileUrl) || `${sourceId}.pdf`;

  return {
    sourceId,
    title: stringValue(row[c.title]),
    filePath,
    fileUrl,
    filename,
    bucket: stringValue(row[c.bucket]) || config.defaultBucket,
    subject: stringValue(row[c.subject]),
    grade: stringValue(row[c.grade]),
    type: stringValue(row[c.type]),
    topic: stringValue(row[c.topic]),
    pages: numberValue(row[c.pages]),
    difficulty: stringValue(row[c.difficulty]),
    checksum: stringValue(row[c.checksum]),
    raw: row,
  };
}

function stringValue(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return undefined;
}

function numberValue(value: unknown): number | undefined {
  const n = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
  return Number.isFinite(n) && n > 0 ? Math.round(n) : undefined;
}

function filenameFromPath(path?: string): string | undefined {
  if (!path) return undefined;
  return path.split('/').filter(Boolean).pop();
}

function filenameFromUrl(raw?: string): string | undefined {
  if (!raw) return undefined;
  try {
    return filenameFromPath(new URL(raw).pathname);
  } catch {
    return undefined;
  }
}

function googleCloudStorageUrl(path: string): string | undefined {
  const explicitBase = process.env.CLIENT_GCS_PUBLIC_BASE_URL;
  if (explicitBase) return `${explicitBase.replace(/\/+$/, '')}/${path.split('/').map(encodeURIComponent).join('/')}`;

  const bucket = process.env.CLIENT_GCS_BUCKET;
  if (bucket) return `https://storage.googleapis.com/${bucket}/${path.split('/').map(encodeURIComponent).join('/')}`;

  return undefined;
}
