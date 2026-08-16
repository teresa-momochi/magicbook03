// MagicBook 3.0 — Book Service
//
// 依 Task4_Implementation_Plan_draft.md（PM-first Implementation Plan）：
// Book 是使用者真正擁有的教材資產，不要求一定要屬於某個 Folder
// （Amy 的「句型 5」目前沒有被任何班級 Folder 使用，仍然保留在 My MagicBooks）。
//
// 依 Task4 實作確認稿 §7：
// title 為 null 時不寫「未命名」進資料庫，由 UI 端顯示 fallback 文字，
// 見 BookCard.jsx 的 displayBookTitle()。
//
// 依 §4.4 User Data Isolation：不接受外部傳入 user_id，一律依 RLS
// （supabase/migrations/003_book_library_draft.sql）限制只能讀寫自己的資料，
// insert 時仍需帶入 auth.uid() 才能通過 RLS 的 with check。

import { supabase } from '../../shared/lib/supabaseClient'

/**
 * 取得目前登入使用者的所有 Book，依 Recently Used 慣例排序
 * （last_opened_at 新到舊；從未開啟過的排在最後，依建立時間新到舊）。
 */
export async function listMyBooks() {
  const { data, error } = await supabase
    .from('books')
    .select('id, title, last_opened_at, created_at, updated_at')
    .order('last_opened_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * 建立一本新 Book。title 可不傳（未輸入名稱），不會寫入「未命名」字樣，
 * 資料庫端保持 null，由 UI 顯示 fallback。
 */
export async function createBook({ title } = {}) {
  const { data: auth } = await supabase.auth.getUser()
  const userId = auth?.user?.id
  if (!userId) throw new Error('尚未登入，無法建立 Book。')

  const { data, error } = await supabase
    .from('books')
    .insert({ user_id: userId, title: title?.trim() || null })
    .select('id, title, last_opened_at, created_at, updated_at')
    .single()

  if (error) throw error
  return data
}

/**
 * 重新命名 Book。傳入空字串／undefined 視為清除名稱（回到 null，不是寫「未命名」）。
 */
export async function renameBook(bookId, title) {
  const { data, error } = await supabase
    .from('books')
    .update({ title: title?.trim() || null })
    .eq('id', bookId)
    .select('id, title, last_opened_at, created_at, updated_at')
    .single()

  if (error) throw error
  return data
}

/**
 * 刪除整本 Book。book_folders 關聯由資料庫 ON DELETE CASCADE 自動清除。
 * 依 Task4 確認稿 §8：Lesson/Page 尚未建立，這裡不處理那部分 cascade，
 * 等 Task 5/12 建立那些資料表時再補上。
 */
export async function deleteBook(bookId) {
  const { error } = await supabase.from('books').delete().eq('id', bookId)
  if (error) throw error
}

/**
 * 使用者實際打開一本 Book（閱讀或編輯）時呼叫，更新 last_opened_at，
 * 讓這本書在 Recently Used 排序中排到最前面。
 */
export async function touchLastOpened(bookId) {
  const { error } = await supabase
    .from('books')
    .update({ last_opened_at: new Date().toISOString() })
    .eq('id', bookId)

  if (error) throw error
}
