// MagicBook 3.0 — Supabase Client (base connection)
//
// 依 05_Database_Design.md v2.0 / 04_Development_Guidelines.md v4.6：
// - Supabase 只負責 User Account / Authentication / Session / User ID / 個人教材資料 / Access Status。
// - 不在此檔案或任何前端程式碼中寫入 Service Role Key 或其他 Secret。
// - 連線資訊一律透過環境變數提供，不寫死於程式碼、不 commit 進 GitHub。
//
// Task 1 範圍：只建立可重複使用的連線基礎（base connection）。
// 不在 Task 1 建立 Database Schema / Table（依 05_Database_Design.md，Schema 建立為後續 Task 範圍）。

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // 開發階段提醒：尚未設定 Supabase 連線資訊。
  // 正式運作前必須在 .env.local（本機）或 GitHub Actions Secrets（部署）中設定：
  //   VITE_SUPABASE_URL
  //   VITE_SUPABASE_ANON_KEY
  console.warn(
    '[MagicBook] Supabase 連線資訊尚未設定（VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY）。' +
    '請確認 .env.local 或部署環境變數已正確設定。'
  )
}

// 只使用 anon key（公開金鑰），不得在前端使用 Service Role Key。
//
// 若尚未設定連線資訊，仍建立 client（使用 placeholder URL）以避免整個 App 無法啟動，
// 但實際 Auth / Data 呼叫會失敗，這是預期行為，直到 Supabase 連線資訊正式提供為止。
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
)
