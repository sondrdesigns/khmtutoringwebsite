import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/staff/auth';
import { createAdminClient } from '@/lib/supabase/admin';

// POST /api/staff/admin/invite  -> { email, role }  (admin only)
export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }

  const { email, role } = await req.json() as { email: string; role?: 'admin' | 'tutor' };
  if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const db = createAdminClient();

  const { data, error } = await db.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${siteUrl}/auth/callback`,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Set role in app_metadata so middleware can read it
  if (data.user) {
    await db.auth.admin.updateUserById(data.user.id, {
      app_metadata: { role: role ?? 'tutor' },
    });
  }

  return NextResponse.json({ ok: true });
}
