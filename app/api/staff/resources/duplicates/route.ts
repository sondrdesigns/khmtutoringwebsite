import { NextResponse } from 'next/server';
import { getStaffSession } from '@/lib/staff/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { toResource, type DbResourceRow } from '@/lib/staff/resource-db';

interface DuplicateCheckInput {
  files?: Array<{
    id: string;
    filename: string;
    fileSize?: number;
    checksum?: string;
  }>;
}

export async function POST(req: Request) {
  const session = await getStaffSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({})) as DuplicateCheckInput;
  const files = body.files ?? [];
  if (!files.length) return NextResponse.json({ duplicates: {} });

  const db = createAdminClient();
  const duplicates: Record<string, { resource: ReturnType<typeof toResource>; reason: string }> = {};

  const checksums = [...new Set(files.map((file) => file.checksum).filter(Boolean))] as string[];
  if (checksums.length) {
    const { data, error } = await db
      .from('resources')
      .select('*')
      .in('source_checksum', checksums);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const byChecksum = new Map((data as DbResourceRow[]).map((row) => [row.source_checksum, toResource(row)]));
    for (const file of files) {
      if (file.checksum && byChecksum.has(file.checksum)) {
        duplicates[file.id] = { resource: byChecksum.get(file.checksum)!, reason: 'same file hash' };
      }
    }
  }

  const remaining = files.filter((file) => !duplicates[file.id]);
  if (remaining.length) {
    const filenames = [...new Set(remaining.map((file) => file.filename).filter(Boolean))];
    const { data, error } = await db
      .from('resources')
      .select('*')
      .in('original_filename', filenames);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const candidates = (data as DbResourceRow[]).map(toResource);
    for (const file of remaining) {
      const match = candidates.find((resource) =>
        resource.originalFilename === file.filename &&
        (typeof file.fileSize !== 'number' || typeof resource.fileSize !== 'number' || resource.fileSize === file.fileSize)
      );
      if (match) duplicates[file.id] = { resource: match, reason: 'same filename and size' };
    }
  }

  return NextResponse.json({ duplicates });
}
