import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/staff/auth';
import { retryMigrationRun } from '@/lib/staff/migration-service';

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const run = await retryMigrationRun(id);
    return NextResponse.json(run);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Retry failed' }, { status: 500 });
  }
}
