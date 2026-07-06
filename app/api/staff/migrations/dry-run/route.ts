import { NextResponse } from 'next/server';
import { getStaffSession } from '@/lib/staff/auth';
import { createMigrationDryRun } from '@/lib/staff/migration-service';

export async function POST(req: Request) {
  const session = await getStaffSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }

  try {
    const body = await req.json().catch(() => ({})) as { limit?: number };
    const run = await createMigrationDryRun(body.limit, session.email);
    return NextResponse.json(run, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Dry run failed' }, { status: 500 });
  }
}
