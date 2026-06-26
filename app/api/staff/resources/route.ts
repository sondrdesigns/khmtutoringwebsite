import { NextResponse } from 'next/server';
import { SEED_RESOURCES } from '@/lib/staff/resources';
import type { Resource, ResourceDraft } from '@/lib/staff/types';
import { getStaffSession, requireAdmin } from '@/lib/staff/auth';

/**
 * STUB store. In-memory only — resets on every cold start / deploy and is NOT
 * shared across serverless instances. Replace `store` reads/writes with your
 * database (Postgres, Supabase, Prisma, etc.). The request/response shapes
 * here are what the client expects, so swapping the body is all that's needed.
 */
const store: Resource[] = [...SEED_RESOURCES];

// GET /api/staff/resources  -> list all (any signed-in staff)
export async function GET() {
  const session = await getStaffSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ resources: store });
}

// POST /api/staff/resources  -> add one (admin only)
export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }
  const draft = (await req.json()) as ResourceDraft;
  const resource: Resource = {
    ...draft,
    id: `r_${Date.now()}`,
    added: new Date().toISOString().slice(0, 10),
    author: draft.author || 'Kody Kim',
  };
  store.unshift(resource);
  return NextResponse.json({ resource }, { status: 201 });
}
