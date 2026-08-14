// MagicBook 3.0 — Authentication Service（基礎設定）
//
// Task 1 範圍：只建立 Supabase Authentication 的基礎連接能力。
//
// 不包含（屬於 Task 2 — User Account / Authentication 範圍）：
// - Email Verification 完整流程
// - User Account 建立
// - Trial Used
// - Access Status
// - 帳號重新註冊 / 帳號不自動合併規則
//
// 依 01_Product_Specification.md v3.4 §6.2 / 02_MVP_Development.md v3.0 §5.1：
// MagicBook 採 Email 驗證登入，不建立密碼系統，不建立 Workspace。

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
 * 登出。
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
