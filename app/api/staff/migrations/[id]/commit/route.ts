import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/staff/auth';
import { commitMigrationRun } from '@/lib/staff/migration-service';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({})) as { limit?: number };
    const run = await commitMigrationRun(id, body.limit);
    return NextResponse.json(run);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Commit failed' }, { status: 500 });
  }
}
