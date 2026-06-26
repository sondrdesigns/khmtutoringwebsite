import { redirect } from 'next/navigation';
import { getStaffSession } from '@/lib/staff/auth';
import { SEED_RESOURCES } from '@/lib/staff/resources';
import { AdminClient } from '@/components/staff/AdminClient';

/**
 * Library Admin — Kody (admin role) only. Tutors are redirected to the library.
 * In production, replace `SEED_RESOURCES` with a DB query.
 */
export default async function AdminPage() {
  const session = await getStaffSession();
  if (!session) redirect('/staff/login?from=/staff/admin');
  if (session.role !== 'admin') redirect('/staff/library');

  return <AdminClient initialResources={SEED_RESOURCES} session={session} />;
}
