import { createClient } from '@supabase/supabase-js';

export function createSourceSupabaseClient() {
  const url = process.env.CLIENT_SUPABASE_URL;
  const serviceRoleKey = process.env.CLIENT_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('CLIENT_SUPABASE_URL and CLIENT_SUPABASE_SERVICE_ROLE_KEY are required for source migration.');
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
