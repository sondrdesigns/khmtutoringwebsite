-- KHM Tutoring — Staff Resource Library
-- Safe to run multiple times.

create table if not exists public.resources (
  id         uuid        primary key default gen_random_uuid(),
  type       text        not null check (type in ('worksheet', 'test')),
  title      text        not null,
  subject    text        not null,
  grade      text        not null,
  topic      text        not null,
  pages      integer     not null default 1,
  difficulty text        not null check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  added      date        not null default current_date,
  author     text        not null,
  file_url   text,
  created_at timestamptz not null default now()
);

alter table public.resources enable row level security;

drop policy if exists "staff_read"    on public.resources;
drop policy if exists "admin_insert"  on public.resources;
drop policy if exists "admin_update"  on public.resources;
drop policy if exists "admin_delete"  on public.resources;

create policy "staff_read" on public.resources
  for select to authenticated using (true);

create policy "admin_insert" on public.resources
  for insert to authenticated
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin_update" on public.resources
  for update to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admin_delete" on public.resources
  for delete to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
