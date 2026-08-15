-- MagicBook 3.0 — Task 2 — User Account / Access Status / Trial Used
--
-- ⚠️ 建立時機已於 002_fix_user_account_creation_timing.sql 修正：
-- 本檔案原本的 trigger（AFTER INSERT ON auth.users）建立時機過早
-- （在 Email Verification 完成之前就會建立 user_accounts）。
-- 請依序執行 001 → 002；002 會移除本檔案建立的 trigger 並換成正確時機。
-- 資料表結構（user_accounts 本身）不受影響，仍然有效。
--
-- 依 05_Database_Design.md v2.0 §4（User Account and Access）：
-- - User Account 是個人教材資料的最上層歸屬單位（§3.1 / §4.2）
-- - Access Status 只允許 Active / Inactive（§4.3）
-- - Trial Used 記錄每個 User Account 一生一次的免費試用狀態（§4.4）
-- - Billing System 的方案/團體/價格資料不進入本表（§4.5）
-- - RLS 套用於需要 User Data Isolation 的資料（§19.7）
--
-- 本檔案只建立 Task 2 範圍內的資料表，不建立 Book Library / Folder / Book 等
-- 教材資料表（那些屬於後續 Task）。
--
-- 執行方式：Supabase Dashboard → SQL Editor → 貼上整份檔案 → Run。
-- （本檔案未套用任何 Service Role Key，純 SQL DDL，不含 Secret。）

-- ============================================================
-- 1. user_accounts
-- ============================================================
--
-- 與 auth.users 一對一對應（id 直接沿用 auth.users.id）。
-- auth.users 本身已由 Supabase Authentication 負責管理 Email / User ID / Session，
-- 這裡只補上 MagicBook 需要、但 Supabase Auth 原生不提供的欄位：
-- Access Status、Trial Used。

create table if not exists public.user_accounts (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  access_status text not null default 'Active'
    check (access_status in ('Active', 'Inactive')),
  trial_used boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.user_accounts is
  'MagicBook 3.0 User Account — 依 05_Database_Design.md v2.0 §4。Personal/Group 屬於 Billing Plan，不在本表建立資料根層級。';
comment on column public.user_accounts.access_status is
  '依 §4.3，只允許 Active / Inactive，不建立 Read Only / Archive Mode / Temporary Access。';
comment on column public.user_accounts.trial_used is
  '依 §4.4，每個 User Account 一生一次，不因重新登入而重置。';

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_user_accounts_updated_at on public.user_accounts;
create trigger trg_user_accounts_updated_at
  before update on public.user_accounts
  for each row
  execute function public.set_updated_at();

-- ============================================================
-- 2. 新使用者自動建立 User Account
-- ============================================================

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_accounts (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists trg_on_auth_user_created on auth.users;
create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_auth_user();

-- ============================================================
-- 3. Row Level Security
-- ============================================================

alter table public.user_accounts enable row level security;

drop policy if exists "user_accounts_select_own" on public.user_accounts;
create policy "user_accounts_select_own"
  on public.user_accounts
  for select
  to authenticated
  using (auth.uid() = id);
