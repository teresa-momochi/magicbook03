-- MagicBook 3.0 — Task 2 修正 — User Account 建立時機
--
-- 依 PM 回饋：
-- Email Verification 成功，才代表使用者正式完成註冊；
-- 在使用者輸入 Email、Supabase 建立（尚未驗證的）auth.users 記錄的當下，
-- 不應該視為 User Account 已建立完成。
--
-- 問題根源：
-- 001 的 trigger 掛在 `AFTER INSERT ON auth.users`。
-- 但 Supabase Email OTP 流程（shouldCreateUser: true）會在使用者
-- 「輸入 Email、尚未輸入驗證碼」的階段，就先在 auth.users 建立一筆
-- email_confirmed_at 為 NULL 的未驗證記錄。
-- 這代表 001 的 trigger 會在「Email 驗證成功之前」就建立 user_accounts，
-- 與正式產品流程（Email → Email Verification → User Account）不一致。
--
-- 修正方式：
-- 改成監聽 auth.users 的 UPDATE，只在 email_confirmed_at
-- 從 NULL 變成非 NULL 的那一刻（也就是 Email Verification 真正成功的那一刻）
-- 才建立 user_accounts。同一個 auth.users 記錄只會發生這個轉換一次，
-- 之後不論重新登入幾次都不會再觸發，Trial Used / Access Status 不會被動到。
--
-- Access Status 初始值、Trial Used 初始值維持不變（Active / false），
-- 資料表結構本身不變，此檔案只調整「什麼時候寫入」。

-- 移除 001 建立的舊 trigger（掛在 INSERT，時機過早）
drop trigger if exists trg_on_auth_user_created on auth.users;

-- 函式本身邏輯不變（沿用 001 的 on conflict do nothing，避免重複寫入），
-- 這裡重新建立一次以更新註解，內容與 001 相同。
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

comment on function public.handle_new_auth_user() is
  '依 Task 2 修正：只在 auth.users.email_confirmed_at 由 NULL 變為非 NULL 時觸發（即 Email Verification 成功當下），不在 auth.users 剛建立、尚未驗證時觸發。';

-- 新 trigger：只在「Email Verification 成功」那一刻觸發一次
create trigger trg_on_auth_user_email_confirmed
  after update on auth.users
  for each row
  when (old.email_confirmed_at is null and new.email_confirmed_at is not null)
  execute function public.handle_new_auth_user();
