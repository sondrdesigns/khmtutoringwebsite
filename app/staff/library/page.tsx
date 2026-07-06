import { redirect } from 'next/navigation';
import { getStaffSession } from '@/lib/staff/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { toResource, type DbResourceRow } from '@/lib/staff/resource-db';
import { LibraryClient } from '@/components/staff/LibraryClient';

/** Resource Library - any signed-in staff (tutors + admin). */
export default async function LibraryPage() {
  const session = await getStaffSession();
  if (!session) redirect('/staff/login?from=/staff/library');

  const db = createAdminClient();
  const { data, error } = await db
    .from('resources')
    .select('*')
    .order('added', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Unable to load staff resources: ${error.message}`);

  return <LibraryClient initialResources={(data as DbResourceRow[]).map(toResource)} session={session} />;
}
