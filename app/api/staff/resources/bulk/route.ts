import { NextResponse } from 'next/server';
import type { ResourceDraft } from '@/lib/staff/types';
import { requireAdmin } from '@/lib/staff/auth';
import { createAdminClient } from '@/lib/supabase/admin';

// POST /api/staff/resources/bulk  -> { drafts: ResourceDraft[] }  (admin only)
export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }

  const { drafts } = await req.json() as { drafts: ResourceDraft[] };
  if (!drafts?.length) return NextResponse.json({ created: [], count: 0 }, { status: 201 });

  const today = new Date().toISOString().slice(0, 10);
  const rows = drafts.map((d) => ({
    type: d.type,
    title: d.title,
    subject: d.subject,
    grade: d.grade,
    topic: d.topic,
    pages: d.pages,
    difficulty: d.difficulty,
    added: today,
    author: d.author ?? 'Kody Kim',
  }));

  const db = createAdminClient();
  const { data, error } = await db.from('resources').insert(rows).select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ created: data, count: data?.length ?? 0 }, { status: 201 });
}
