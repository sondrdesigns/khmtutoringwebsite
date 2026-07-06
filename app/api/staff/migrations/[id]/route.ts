import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/staff/auth';
import { getMigrationRun } from '@/lib/staff/migration-service';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const run = await getMigrationRun(id);
    return NextResponse.json(run);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Could not load migration run' }, { status: 500 });
  }
}
