import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getStaffSession } from '@/lib/staff/auth';

async function makeClient() {
  const jar = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return jar.getAll(); },
        setAll(list) {
          list.forEach(({ name, value, options }) => jar.set(name, value, options));
        },
      },
    }
  );
}

// POST /api/staff/auth  -> { email, password }  : signs in and sets session cookies
export async function POST(req: Request) {
  const { email, password } = await req.json() as { email?: string; password?: string };
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  const supabase = await makeClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return NextResponse.json({ error: error?.message ?? 'Invalid credentials' }, { status: 401 });
  }

  const role = (data.user.app_metadata?.role as 'admin' | 'tutor') ?? 'tutor';
  const session = {
    role,
    name: (data.user.user_metadata?.name as string | undefined) ?? data.user.email!.split('@')[0],
    email: data.user.email!,
  };

  return NextResponse.json({ session });
}

// GET /api/staff/auth  -> current session (or null)
export async function GET() {
  const session = await getStaffSession();
  return NextResponse.json({ session });
}

// DELETE /api/staff/auth  -> sign out
export async function DELETE() {
  const supabase = await makeClient();
  await supabase.auth.signOut();
  return NextResponse.json({ ok: true });
}
