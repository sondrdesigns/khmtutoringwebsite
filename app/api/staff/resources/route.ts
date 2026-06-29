import { NextResponse } from 'next/server';
import type { Resource, ResourceDraft } from '@/lib/staff/types';
import { getStaffSession, requireAdmin } from '@/lib/staff/auth';
import { createAdminClient } from '@/lib/supabase/admin';

type DbRow = Omit<Resource, 'fileUrl'> & { file_url?: string | null; created_at: string };

function toResource(row: DbRow): Resource {
  const { file_url, created_at: _ts, ...rest } = row;
  return { ...rest, ...(file_url ? { fileUrl: file_url } : {}) };
}

// GET /api/staff/resources  -> list all (any signed-in staff)
export async function GET() {
  const session = await getStaffSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = createAdminClient();
  const { data, error } = await db
    .from('resources')
    .select('*')
    .order('added', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ resources: (data as DbRow[]).map(toResource) });
}

// POST /api/staff/resources  -> add one (admin only)
export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }

  const draft = await req.json() as ResourceDraft & { fileUrl?: string };
  const { fileUrl, ...rest } = draft;

  const db = createAdminClient();
  const { data, error } = await db
    .from('resources')
    .insert({
      ...rest,
      added: new Date().toISOString().slice(0, 10),
      ...(fileUrl ? { file_url: fileUrl } : {}),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ resource: toResource(data as DbRow) }, { status: 201 });
}
