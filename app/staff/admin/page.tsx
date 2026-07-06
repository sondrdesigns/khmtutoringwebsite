import { redirect } from 'next/navigation';
import { getStaffSession } from '@/lib/staff/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { toResource, type DbResourceRow } from '@/lib/staff/resource-db';
import { AdminClient } from '@/components/staff/AdminClient';

/** Library Admin - admin role only. Tutors are redirected to the library. */
export default async function AdminPage() {
  const session = await getStaffSession();
  if (!session) redirect('/staff/login?from=/staff/admin');
  if (session.role !== 'admin') redirect('/staff/library');

  const db = createAdminClient();
  const { data, error } = await db
    .from('resources')
    .select('*')
    .order('added', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Unable to load staff resources: ${error.message}`);

  return <AdminClient initialResources={(data as DbResourceRow[]).map(toResource)} session={session} />;
}
