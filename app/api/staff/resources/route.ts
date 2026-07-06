import { NextResponse } from 'next/server';
import type { ResourceDraft } from '@/lib/staff/types';
import { getStaffSession, requireAdmin } from '@/lib/staff/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { toResource, toResourceInsert, type DbResourceRow } from '@/lib/staff/resource-db';

// GET /api/staff/resources  -> list all (any signed-in staff)
export async function GET() {
  const session = await getStaffSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = createAdminClient();
  const { data, error } = await db
    .from('resources')
    .select('*')
    .order('added', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ resources: (data as DbResourceRow[]).map(toResource) });
}

// POST /api/staff/resources  -> add one (admin only)
export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }

  const draft = await req.json() as ResourceDraft;
  const db = createAdminClient();
  const { data, error } = await db
    .from('resources')
    .insert(toResourceInsert({ ...draft, added: new Date().toISOString().slice(0, 10) }))
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ resource: toResource(data as DbResourceRow) }, { status: 201 });
}
