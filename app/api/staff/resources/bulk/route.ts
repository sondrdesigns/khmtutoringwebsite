import { NextResponse } from 'next/server';
import type { ResourceDraft } from '@/lib/staff/types';
import { requireAdmin } from '@/lib/staff/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { toResource, toResourceInsert, type DbResourceRow } from '@/lib/staff/resource-db';

// POST /api/staff/resources/bulk  -> { drafts: ResourceDraft[] }  (admin only)
export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }

  const { drafts } = await req.json() as { drafts: ResourceDraft[] };
  if (!drafts?.length) return NextResponse.json({ created: [], skipped: [], count: 0 }, { status: 201 });

  const db = createAdminClient();
  const checksums = [...new Set(drafts.map((draft) => draft.sourceChecksum).filter(Boolean))] as string[];
  const existingChecksums = new Set<string>();

  if (checksums.length) {
    const { data, error } = await db
      .from('resources')
      .select('source_checksum')
      .in('source_checksum', checksums);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    for (const row of data ?? []) {
      if (row.source_checksum) existingChecksums.add(row.source_checksum as string);
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const skipped = drafts.filter((draft) => draft.sourceChecksum && existingChecksums.has(draft.sourceChecksum));
  const rows = drafts
    .filter((draft) => !draft.sourceChecksum || !existingChecksums.has(draft.sourceChecksum))
    .map((draft) => toResourceInsert({ ...draft, added: today }));

  if (!rows.length) return NextResponse.json({ created: [], skipped, count: 0 }, { status: 201 });

  const { data, error } = await db.from('resources').insert(rows).select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const created = (data as DbResourceRow[]).map(toResource);
  return NextResponse.json({ created, skipped, count: created.length }, { status: 201 });
}
