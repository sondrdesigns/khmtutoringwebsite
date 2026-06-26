import { NextResponse } from 'next/server';
import type { Resource } from '@/lib/staff/types';
import { requireAdmin } from '@/lib/staff/auth';

/**
 * STUB — per-resource update / delete (admin only). Wire to your DB.
 * The in-memory array here is illustrative and not shared across instances.
 */

// PATCH /api/staff/resources/:id  -> edit metadata
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }
  const { id } = await params;
  const patch = (await req.json()) as Partial<Resource>;
  // TODO: UPDATE resources SET ... WHERE id = $id
  return NextResponse.json({ id, ...patch });
}

// DELETE /api/staff/resources/:id
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }
  const { id } = await params;
  // TODO: DELETE FROM resources WHERE id = $id
  return NextResponse.json({ id, deleted: true });
}
