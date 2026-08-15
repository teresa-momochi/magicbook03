// MagicBook 3.0 — Authentication Service
//
// 依 01_Product_Specification.md v3.4 §6.2 / 02_MVP_Development.md v3.0 §5.1：
// MagicBook 採 Email 驗證登入，不建立密碼系統，不建立 Workspace。
//
// 依 06_API_Design.md v2.0 §3.2：
// 「實際 Credential Format 依正式 Authentication Provider 決定」——
// 正式 Authentication Provider 為 Supabase Authentication（Task 2 指令五）。
// 這裡使用 Supabase 內建的 Email OTP（signInWithOtp + verifyOtp），
// 不自行建立密碼系統或自訂驗證碼系統。
//
// 注意（需 Teresa 確認 Supabase 端設定）：
// Supabase 預設的 Email 樣板（Confirm signup / Magic Link）需要包含
// {{ .Token }}（6 碼數字驗證碼），使用者才看得到可以輸入的驗證碼。
// 如果樣板只有 {{ .ConfirmationURL }}（連結），使用者會收到連結而不是驗證碼。
// 請至 Supabase Dashboard → Authentication → Email Templates 確認。

import { supabase } from '../../shared/lib/supabaseClient'

/**
 * 取得目前 Session（若尚未登入則為 null）。
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

/**
 * 監聽登入狀態變化（Session 建立 / 結束）。
 * 回傳 unsubscribe 函式。
 */
export function onAuthStateChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })
  return () => data.subscription.unsubscribe()
}

/**
 * Email Verification — 第一步：發送驗證碼到指定 Email。
 *
 * 依 01_Product_Specification.md §6.2：
 * Email → Email Verification → 建立 User Account → 完成登入。
 *
 * 若此 Email 尚未有帳號，Supabase 會先建立一筆尚未驗證的 auth.users 記錄；
 * 對應的 public.user_accounts 只會在 Email Verification 真正成功後才由
 * 資料庫 trigger 建立（見 supabase/migrations/002_fix_user_account_creation_timing.sql），
 * 不會在使用者只是輸入 Email、尚未驗證的階段就先建立。
 */
export async function sendEmailVerification(email) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // 只允許 Email 驗證碼登入，不自動建立密碼、不使用第三方登入。
      shouldCreateUser: true,
    },
  })
  if (error) throw error
}

/**
 * Email Verification — 第二步：驗證使用者輸入的驗證碼，完成登入。
 *
 * 對應 06_API_Design.md §3.2 POST /auth/login 的邏輯操作：
 * Request = Login Credential（Email + 驗證碼），
 * Response = Authenticated User + Session。
 */
export async function verifyEmailCode(email, token) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  })
  if (error) throw error
  return data.session
}

/**
 * 登出。
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

