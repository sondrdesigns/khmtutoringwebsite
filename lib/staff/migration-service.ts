import { put } from '@vercel/blob';
import { createAdminClient } from '@/lib/supabase/admin';
import { classifyResourceMetadata } from './classification';
import { toResourceInsert } from './resource-db';
import { GRADES, SUBJECTS } from './resources';
import type { Difficulty, ResourceDraft, ResourceType } from './types';
import { fetchSourceFile, listSourceResources, type SourceResourceRow } from './source-supabase';
import type { SourceMigrationConfig } from './source-config';

const DEFAULT_AUTHOR = 'Kody Kim';
const MAX_DRY_RUN_LIMIT = 200;
const MAX_COMMIT_LIMIT = 100;
const RESOURCE_TYPES: ResourceType[] = ['worksheet', 'test'];
const DIFFICULTIES: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

type MigrationStatus = 'dry_run' | 'committing' | 'completed' | 'completed_with_errors' | 'failed';
type ItemStatus = 'ready' | 'skipped' | 'done' | 'error';

export interface MigrationRunRow {
  id: string;
  status: MigrationStatus;
  source_provider: string;
  source_project_ref: string | null;
  source_table: string | null;
  source_bucket: string | null;
  total_count: number;
  ready_count: number;
  skipped_count: number;
  error_count: number;
  committed_count: number;
  created_by: string | null;
  error: string | null;
  created_at: string;
  updated_at: string;
}

export interface MigrationItemRow {
  id: string;
  run_id: string;
  source_id: string;
  source_path: string | null;
  source_bucket: string | null;
  source_url: string | null;
  status: ItemStatus;
  error: string | null;
  suggested_resource: ResourceDraft | null;
  blob_path: string | null;
  resource_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface MigrationRunWithItems {
  run: MigrationRunRow;
  items: MigrationItemRow[];
}

export async function createMigrationDryRun(limitInput: number | undefined, createdBy: string): Promise<MigrationRunWithItems> {
  const limit = clamp(limitInput ?? 25, 1, MAX_DRY_RUN_LIMIT);
  const { config, rows } = await listSourceResources(limit);
  const db = createAdminClient();

  const { data: run, error: runError } = await db
    .from('migration_runs')
    .insert({
      status: 'dry_run',
      source_provider: config.provider,
      source_project_ref: config.projectRef,
      source_table: config.table,
      source_bucket: config.defaultBucket ?? null,
      created_by: createdBy,
    })
    .select()
    .single();

  if (runError) throw new Error(runError.message);

  const items = await Promise.all(rows.map((row) => buildDryRunItem(String(run.id), config, row)));
  if (items.length) {
    const { error: itemError } = await db.from('migration_items').insert(items);
    if (itemError) throw new Error(itemError.message);
  }

  await updateRunCounts(String(run.id));
  return getMigrationRun(String(run.id));
}

export async function getMigrationRun(id: string): Promise<MigrationRunWithItems> {
  const db = createAdminClient();
  const { data: run, error: runError } = await db.from('migration_runs').select('*').eq('id', id).single();
  if (runError) throw new Error(runError.message);

  const { data: items, error: itemError } = await db
    .from('migration_items')
    .select('*')
    .eq('run_id', id)
    .order('created_at', { ascending: true });
  if (itemError) throw new Error(itemError.message);

  return { run: run as MigrationRunRow, items: (items ?? []) as MigrationItemRow[] };
}

export async function commitMigrationRun(id: string, limitInput?: number): Promise<MigrationRunWithItems> {
  const limit = clamp(limitInput ?? MAX_COMMIT_LIMIT, 1, MAX_COMMIT_LIMIT);
  const db = createAdminClient();
  const { run } = await getMigrationRun(id);
  const config = configFromRun(run);

  await db.from('migration_runs').update({ status: 'committing', updated_at: new Date().toISOString(), error: null }).eq('id', id);

  const { data: items, error } = await db
    .from('migration_items')
    .select('*')
    .eq('run_id', id)
    .eq('status', 'ready')
    .limit(limit);

  if (error) throw new Error(error.message);

  for (const item of (items ?? []) as MigrationItemRow[]) {
    await commitMigrationItem(item, config).catch(async (err) => {
      await db.from('migration_items').update({
        status: 'error',
        error: err instanceof Error ? err.message : 'Commit failed',
        updated_at: new Date().toISOString(),
      }).eq('id', item.id);
    });
  }

  await updateRunCounts(id);
  await finalizeRunStatus(id);
  return getMigrationRun(id);
}

export async function retryMigrationRun(id: string): Promise<MigrationRunWithItems> {
  const db = createAdminClient();
  const { error } = await db
    .from('migration_items')
    .update({ status: 'ready', error: null, updated_at: new Date().toISOString() })
    .eq('run_id', id)
    .eq('status', 'error');

  if (error) throw new Error(error.message);
  await updateRunCounts(id);
  return commitMigrationRun(id);
}

async function buildDryRunItem(runId: string, config: SourceMigrationConfig, row: SourceResourceRow) {
  const duplicateId = await findExistingResourceId(config, row);
  const base = {
    run_id: runId,
    source_id: row.sourceId,
    source_path: row.filePath ?? null,
    source_bucket: row.bucket || config.defaultBucket || null,
    source_url: row.fileUrl ?? null,
  };

  if (duplicateId) {
    return {
      ...base,
      status: 'skipped',
      error: `Already migrated as resource ${duplicateId}`,
      suggested_resource: null,
    };
  }

  if (!row.fileUrl && !row.filePath) {
    return {
      ...base,
      status: 'error',
      error: 'Missing source file URL/path.',
      suggested_resource: null,
    };
  }

  const classification = await classifyResourceMetadata({
    filename: row.filename,
    sourcePath: row.filePath,
    existingMetadata: row.raw,
  });

  const draft: ResourceDraft = {
    type: safeType(row.type) ?? classification.type,
    title: row.title || classification.suggestedTitle || titleFromFilename(row.filename),
    subject: safeSubject(row.subject) ?? classification.subject,
    grade: safeGrade(row.grade) ?? classification.grade,
    topic: row.topic || classification.suggestedTopic || titleFromFilename(row.filename),
    pages: row.pages ?? classification.pages,
    difficulty: safeDifficulty(row.difficulty) ?? classification.difficulty,
    author: DEFAULT_AUTHOR,
    storageProvider: 'vercel_blob',
    originalFilename: row.filename,
    mimeType: 'application/pdf',
    classificationConfidence: classification.confidence,
    sourceProvider: config.provider,
    sourceProjectRef: config.projectRef,
    sourceTable: config.table,
    sourceId: row.sourceId,
    sourceBucket: row.bucket || config.defaultBucket,
    sourcePath: row.filePath,
    sourceChecksum: row.checksum,
  };

  return {
    ...base,
    status: 'ready',
    error: null,
    suggested_resource: draft,
  };
}

async function commitMigrationItem(item: MigrationItemRow, config: SourceMigrationConfig) {
  if (!item.suggested_resource) throw new Error('Missing suggested resource payload.');

  const db = createAdminClient();
  const sourceRow = {
    fileUrl: item.source_url ?? undefined,
    bucket: item.source_bucket ?? undefined,
    filePath: item.source_path ?? undefined,
  };
  const fetched = await fetchSourceFile(sourceRow, config);
  const contentType = fetched.headers.get('content-type') || item.suggested_resource.mimeType || 'application/pdf';
  const size = Number(fetched.headers.get('content-length')) || item.suggested_resource.fileSize;
  const filename = sanitizeFilename(item.suggested_resource.originalFilename || `${item.source_id}.pdf`);
  const blobPath = `staff-library/migrated/${sanitizePathSegment(item.source_id)}/${filename}`;

  const blob = await put(blobPath, fetched.body!, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: false,
    contentType,
  });

  const now = new Date().toISOString();
  const { data: resource, error: resourceError } = await db
    .from('resources')
    .insert(toResourceInsert({
      ...item.suggested_resource,
      fileUrl: blob.url,
      storageProvider: 'vercel_blob',
      storageKey: blob.pathname,
      mimeType: contentType,
      fileSize: size,
      migratedAt: now,
      added: now.slice(0, 10),
    }))
    .select('id')
    .single();

  if (resourceError) throw new Error(resourceError.message);

  const { error: itemError } = await db.from('migration_items').update({
    status: 'done',
    error: null,
    blob_path: blob.pathname,
    resource_id: resource.id,
    updated_at: now,
  }).eq('id', item.id);

  if (itemError) throw new Error(itemError.message);
}

async function findExistingResourceId(config: SourceMigrationConfig, row: SourceResourceRow): Promise<string | null> {
  const db = createAdminClient();
  const { data, error } = await db
    .from('resources')
    .select('id')
    .eq('source_provider', config.provider)
    .eq('source_project_ref', config.projectRef)
    .eq('source_table', config.table)
    .eq('source_id', row.sourceId)
    .maybeSingle();

  if (!error && data?.id) return String(data.id);

  if (row.filePath) {
    const { data: pathMatch } = await db
      .from('resources')
      .select('id')
      .eq('source_provider', config.provider)
      .eq('source_project_ref', config.projectRef)
      .eq('source_path', row.filePath)
      .maybeSingle();
    if (pathMatch?.id) return String(pathMatch.id);
  }

  return null;
}

async function updateRunCounts(id: string) {
  const db = createAdminClient();
  const { data, error } = await db.from('migration_items').select('status').eq('run_id', id);
  if (error) throw new Error(error.message);

  const statuses = ((data ?? []) as { status: ItemStatus }[]).map((item) => item.status);
  const counts = {
    total_count: statuses.length,
    ready_count: statuses.filter((s) => s === 'ready').length,
    skipped_count: statuses.filter((s) => s === 'skipped').length,
    error_count: statuses.filter((s) => s === 'error').length,
    committed_count: statuses.filter((s) => s === 'done').length,
    updated_at: new Date().toISOString(),
  };

  const { error: updateError } = await db.from('migration_runs').update(counts).eq('id', id);
  if (updateError) throw new Error(updateError.message);
}

async function finalizeRunStatus(id: string) {
  const db = createAdminClient();
  const { data, error } = await db.from('migration_runs').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  const run = data as MigrationRunRow;
  const status: MigrationStatus = run.error_count > 0
    ? 'completed_with_errors'
    : run.ready_count > 0
      ? 'dry_run'
      : 'completed';

  const { error: updateError } = await db
    .from('migration_runs')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (updateError) throw new Error(updateError.message);
}

function configFromRun(run: MigrationRunRow): SourceMigrationConfig {
  const config = listConfigWithoutEnvSideEffects();
  return {
    ...config,
    projectRef: run.source_project_ref || config.projectRef,
    table: run.source_table || config.table,
    defaultBucket: run.source_bucket || config.defaultBucket,
  };
}

function listConfigWithoutEnvSideEffects(): SourceMigrationConfig {
  return {
    provider: 'client_supabase',
    mode: process.env.CLIENT_SUPABASE_SOURCE_MODE === 'table' || process.env.CLIENT_SUPABASE_RESOURCE_TABLE ? 'table' : 'storage',
    projectRef: projectRefFromEnv(),
    table: process.env.CLIENT_SUPABASE_RESOURCE_TABLE || 'storage.objects',
    defaultBucket: process.env.CLIENT_SUPABASE_STORAGE_BUCKET,
    columns: {
      id: process.env.CLIENT_SUPABASE_ID_COLUMN || 'id',
      title: process.env.CLIENT_SUPABASE_TITLE_COLUMN || 'title',
      filePath: process.env.CLIENT_SUPABASE_FILE_PATH_COLUMN || 'file_path',
      fileUrl: process.env.CLIENT_SUPABASE_FILE_URL_COLUMN || 'file_url',
      filename: process.env.CLIENT_SUPABASE_FILENAME_COLUMN || 'filename',
      bucket: process.env.CLIENT_SUPABASE_BUCKET_COLUMN || 'bucket',
      subject: process.env.CLIENT_SUPABASE_SUBJECT_COLUMN || 'subject',
      grade: process.env.CLIENT_SUPABASE_GRADE_COLUMN || 'grade',
      type: process.env.CLIENT_SUPABASE_TYPE_COLUMN || 'type',
      topic: process.env.CLIENT_SUPABASE_TOPIC_COLUMN || 'topic',
      pages: process.env.CLIENT_SUPABASE_PAGES_COLUMN || 'pages',
      difficulty: process.env.CLIENT_SUPABASE_DIFFICULTY_COLUMN || 'difficulty',
      checksum: process.env.CLIENT_SUPABASE_CHECKSUM_COLUMN || 'checksum',
    },
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(Math.round(value), min), max);
}

function safeType(value?: string): ResourceType | undefined {
  return RESOURCE_TYPES.includes(value as ResourceType) ? value as ResourceType : undefined;
}

function safeSubject(value?: string): string | undefined {
  return value && SUBJECTS.includes(value) ? value : undefined;
}

function safeGrade(value?: string): string | undefined {
  return value && GRADES.includes(value) ? value : undefined;
}

function safeDifficulty(value?: string): Difficulty | undefined {
  return DIFFICULTIES.includes(value as Difficulty) ? value as Difficulty : undefined;
}

function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.pdf$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || 'Untitled PDF';
}

function sanitizeFilename(filename: string): string {
  const clean = filename.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
  return clean.toLowerCase().endsWith('.pdf') ? clean : `${clean || 'resource'}.pdf`;
}

function sanitizePathSegment(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'source';
}

function projectRefFromEnv(): string {
  const raw = process.env.CLIENT_SUPABASE_URL;
  if (!raw) return 'unknown';
  try {
    return new URL(raw).hostname.split('.')[0] || 'unknown';
  } catch {
    return 'unknown';
  }
}
