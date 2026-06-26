import { redirect } from 'next/navigation';
import { getStaffSession } from '@/lib/staff/auth';
import { SEED_RESOURCES } from '@/lib/staff/resources';
import { LibraryClient } from '@/components/staff/LibraryClient';

/**
 * Resource Library — any signed-in staff (tutors + Kody).
 *
 * Seed data is read directly here for the demo. In production, replace
 * `SEED_RESOURCES` with a DB query (e.g. `await db.resource.findMany()`).
 */
export default async function LibraryPage() {
  const session = await getStaffSession();
  if (!session) redirect('/staff/login?from=/staff/library');

  const resources = SEED_RESOURCES;
  return <LibraryClient initialResources={resources} session={session} />;
}
