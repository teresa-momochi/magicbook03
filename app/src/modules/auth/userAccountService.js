// MagicBook 3.0 — User Account Service
//
// 依 06_API_Design.md v2.0 §3.4 GET /auth/session：
// Response 至少需要讓系統知道 User Identity、Access Status、Trial Used。
//
// 依 §4.4 User Data Isolation：
// 不能信任前端自行傳入的 User ID，一律依已驗證的 Session 取得自己的資料。
// RLS（supabase/migrations/001_user_accounts.sql）已限制只能讀到自己那一列。

import { supabase } from '../../shared/lib/supabaseClient'

/**
 * 取得目前已登入使用者的 User Account 資料（Access Status / Trial Used）。
 * 不接受外部傳入 User ID —— 一律使用 Supabase 目前 Session 的使用者身分。
 */
export async function getMyUserAccount() {
  const { data, error } = await supabase
    .from('user_accounts')
    .select('id, email, access_status, trial_used, created_at')
    .single()

  if (error) throw error
  return data
}
