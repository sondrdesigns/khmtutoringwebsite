import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/staff/auth';

export async function POST() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }

  return NextResponse.json(
    {
      error: 'Legacy migration endpoint disabled. Use POST /api/staff/migrations/dry-run, then POST /api/staff/migrations/:id/commit.',
    },
    { status: 410 },
  );
}
