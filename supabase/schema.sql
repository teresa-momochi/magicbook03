-- MagicBook 3.0 — Task 1: System Foundation
-- Database Foundation schema
--
-- Source of truth: docs/05_Database_Design.md v1.2, docs/11_MVP_Task_List.md v1.0 (Task 1)
--
-- Scope (Task 1 only):
--   - Workspace (Personal / Organization)          -> §4, §17
--   - Workspace membership + basic role permission -> §17.2, §17.4, §17.5
--   - Book Library Foundation (root Books only)     -> §5, §7 (Book), §8 (Lesson, Default Lesson)
--
-- Explicitly OUT of scope for Task 1 (Task 2 — Book Structure):
--   - Folder table / folder_id on books  (§6 Folder is a separate Task 2 concern; per §19.1
--     Implementation Timing we do not pre-build unconfirmed structures ahead of the relevant Phase)
--   - Page / Content / Overlay / Hotspot tables (Task 3 / Task 4)
--
-- Run this file in the Supabase SQL editor (or via `supabase db push`) against a fresh project.

-- ============================================================
-- 1. Workspace  (docs/05_Database_Design.md §3.1, §4)
-- ============================================================

create table if not exists public.workspaces (
  id           uuid primary key default gen_random_uuid(),
  type         text not null check (type in ('personal', 'organization')),
  name         text not null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.workspaces is
  'Root data-ownership boundary. §4.1/§4.3 — every core teaching-material row must trace back to a workspace.';

-- ============================================================
-- 2. Workspace Membership + Basic Permission
--    (docs/05_Database_Design.md §17.2, §17.4, §17.5;
--     docs/02_MVP_Development.md §1.1 default roles: Owner / Administrator / Teacher)
-- ============================================================

create table if not exists public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  role         text not null check (role in ('owner', 'administrator', 'teacher')),
  created_at   timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

comment on table public.workspace_members is
  'Basic Permission (§7.4 Task List). Personal Workspace has exactly one member with role=owner. '
  'Organization Workspace may have multiple members.';

create index if not exists workspace_members_user_id_idx on public.workspace_members(user_id);

-- ============================================================
-- 3. Book  (docs/05_Database_Design.md §3.4, §7; docs/06_API_Design.md §7)
--    Task 1 scope: root-level Book only. No folder_id yet (Task 2).
-- ============================================================

create table if not exists public.books (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title        text not null default 'Untitled Book',
  created_by   uuid not null references auth.users(id),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.books is
  'Book Library Foundation (§7.6 Task List). Root Books only — Folder relationship is Task 2 (§5.3 Database Design).';

create index if not exists books_workspace_id_idx on public.books(workspace_id);

-- ============================================================
-- 4. Lesson  (docs/05_Database_Design.md §3.5, §8)
--    Task 1 needs only the Default Lesson created alongside a Book (§7.2 API Design).
-- ============================================================

create table if not exists public.lessons (
  id           uuid primary key default gen_random_uuid(),
  book_id      uuid not null references public.books(id) on delete cascade,
  title        text not null default 'Lesson 1',
  is_default   boolean not null default true,
  order_index  integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.lessons is
  'Default Lesson created together with a Book (§3.5 / §7.2 API Design). Full Lesson CRUD is Task 2.';

create index if not exists lessons_book_id_idx on public.lessons(book_id);

-- ============================================================
-- 5. updated_at maintenance
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists workspaces_set_updated_at on public.workspaces;
create trigger workspaces_set_updated_at
  before update on public.workspaces
  for each row execute function public.set_updated_at();

drop trigger if exists books_set_updated_at on public.books;
create trigger books_set_updated_at
  before update on public.books
  for each row execute function public.set_updated_at();

drop trigger if exists lessons_set_updated_at on public.lessons;
create trigger lessons_set_updated_at
  before update on public.lessons
  for each row execute function public.set_updated_at();

-- ============================================================
-- 6. Personal Workspace auto-provisioning
--    (§17.5 Database Design: "實際帳號與 Workspace 生命周期於 Authentication／
--     Workspace 實作階段確認" — resolved here: every new auth user gets exactly
--     one Personal Workspace, created atomically with signup.)
-- ============================================================

create or replace function public.handle_new_user_personal_workspace()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_workspace_id uuid;
begin
  insert into public.workspaces (type, name)
  values ('personal', coalesce(new.raw_user_meta_data ->> 'full_name', new.email, 'My Workspace'))
  returning id into new_workspace_id;

  insert into public.workspace_members (workspace_id, user_id, role)
  values (new_workspace_id, new.id, 'owner');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user_personal_workspace();

-- ============================================================
-- 7. Row Level Security (§19.7 Database Design; §17.3 Data Isolation)
-- ============================================================

alter table public.workspaces        enable row level security;
alter table public.workspace_members enable row level security;
alter table public.books             enable row level security;
alter table public.lessons           enable row level security;

-- Workspaces: visible/updatable only to members of that workspace.
create policy workspaces_select_member on public.workspaces
  for select using (
    exists (
      select 1 from public.workspace_members m
      where m.workspace_id = workspaces.id and m.user_id = auth.uid()
    )
  );

create policy workspaces_update_admin on public.workspaces
  for update using (
    exists (
      select 1 from public.workspace_members m
      where m.workspace_id = workspaces.id
        and m.user_id = auth.uid()
        and m.role in ('owner', 'administrator')
    )
  );

-- Workspace members: a member can see the roster of every workspace they belong to.
create policy workspace_members_select_self_workspace on public.workspace_members
  for select using (
    exists (
      select 1 from public.workspace_members m
      where m.workspace_id = workspace_members.workspace_id and m.user_id = auth.uid()
    )
  );

-- Books: strict Workspace Isolation (§4.4 / §4.5 API Design).
create policy books_select_member on public.books
  for select using (
    exists (
      select 1 from public.workspace_members m
      where m.workspace_id = books.workspace_id and m.user_id = auth.uid()
    )
  );

create policy books_insert_member on public.books
  for insert with check (
    exists (
      select 1 from public.workspace_members m
      where m.workspace_id = books.workspace_id and m.user_id = auth.uid()
    )
  );

create policy books_update_member on public.books
  for update using (
    exists (
      select 1 from public.workspace_members m
      where m.workspace_id = books.workspace_id and m.user_id = auth.uid()
    )
  );

create policy books_delete_member on public.books
  for delete using (
    exists (
      select 1 from public.workspace_members m
      where m.workspace_id = books.workspace_id and m.user_id = auth.uid()
    )
  );

-- Lessons: inherit isolation through the parent Book's workspace (§19.4 Relationship Integrity).
create policy lessons_select_member on public.lessons
  for select using (
    exists (
      select 1 from public.books b
      join public.workspace_members m on m.workspace_id = b.workspace_id
      where b.id = lessons.book_id and m.user_id = auth.uid()
    )
  );

create policy lessons_insert_member on public.lessons
  for insert with check (
    exists (
      select 1 from public.books b
      join public.workspace_members m on m.workspace_id = b.workspace_id
      where b.id = lessons.book_id and m.user_id = auth.uid()
    )
  );

create policy lessons_update_member on public.lessons
  for update using (
    exists (
      select 1 from public.books b
      join public.workspace_members m on m.workspace_id = b.workspace_id
      where b.id = lessons.book_id and m.user_id = auth.uid()
    )
  );

-- END OF TASK 1 SCHEMA
