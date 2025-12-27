-- Supabase SQL setup for ZenBlog
-- 1) Create posts table
create table if not exists public.posts (
  id text primary key,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  author text not null,
  date text not null,
  imageUrl text not null,
  readTime text not null
);

-- 2) Enable Row Level Security
alter table public.posts enable row level security;

-- 3) Policies: read for everyone, write for admins only
create policy if not exists "Public read posts" on public.posts
  for select
  using (true);

-- Admins table to restrict writes
create table if not exists public.admins (
  user_id uuid primary key,
  created_at timestamptz default now()
);

alter table public.admins enable row level security;

-- Only admins themselves can see the admins table rows
create policy if not exists "Admins self read" on public.admins
  for select
  using (auth.uid() = user_id);

-- Writes only allowed for admins
create policy if not exists "Admins insert" on public.posts
  for insert
  with check (
    auth.uid() in (select user_id from public.admins)
  );

create policy if not exists "Admins update" on public.posts
  for update
  using (
    auth.uid() in (select user_id from public.admins)
  )
  with check (
    auth.uid() in (select user_id from public.admins)
  );

create policy if not exists "Admins delete" on public.posts
  for delete
  using (
    auth.uid() in (select user_id from public.admins)
  );

-- Helper: grant usage to anon/authenticated to hit RLS
grant usage on schema public to anon, authenticated;
