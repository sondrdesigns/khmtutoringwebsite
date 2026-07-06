import { createClient } from '@/lib/supabase/server';
import type { StaffRole } from './types';

export interface StaffSession {
  role: StaffRole;
  name: string;
  email: string;
}

export async function getStaffSession(): Promise<StaffSession | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const role = (user.app_metadata?.role as StaffRole) ?? 'tutor';
  const name = (user.user_metadata?.name as string | undefined) ?? user.email!.split('@')[0];

  return { role, name, email: user.email! };
}

export async function requireAdmin(): Promise<boolean> {
  const session = await getStaffSession();
  return session?.role === 'admin';
}
