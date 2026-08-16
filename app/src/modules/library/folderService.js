// MagicBook 3.0 — Folder Service
//
// 依 05_Database_Design.md §6.5（已確認規則）／Task4 實作確認稿 §9：
// Folder 只有在完全為空（沒有任何 Book 關聯、沒有 Child Folder）時才能刪除。
// 資料庫（003_book_library_draft.sql 的 guard_folder_deletion trigger）也會擋，
// 這裡先在前端檢查一次，是為了在使用者刪除失敗時給出清楚的中文錯誤訊息，
// 而不是讓 Postgres 的 raise exception 訊息直接顯示給使用者看。
//
// 依 Task4 實作確認稿 §7：name 為 null 時不寫「未命名」進資料庫。

import { supabase } from '../../shared/lib/supabaseClient'

/**
 * 取得目前登入使用者的所有 Folder，依 Folder 列表排序（sort_order）。
 * 回傳的是攤平列表，Nested 結構（parent_folder_id）由呼叫端自行組樹狀。
 */
export async function listMyFolders() {
  const { data, error } = await supabase
    .from('folders')
    .select('id, name, parent_folder_id, sort_order, created_at, updated_at')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data
}

/**
 * 建立一個新 Folder。parentFolderId 不傳即為根層級 Folder。
 * sort_order 預設放到同層最後面（目前同層最大值 + 1）。
 */
export async function createFolder({ name, parentFolderId = null } = {}) {
  const { data: auth } = await supabase.auth.getUser()
  const userId = auth?.user?.id
  if (!userId) throw new Error('尚未登入，無法建立 Folder。')

  let siblingsQuery = supabase
    .from('folders')
    .select('sort_order')
    .eq('user_id', userId)
    .order('sort_order', { ascending: false })
    .limit(1)

  siblingsQuery =
    parentFolderId === null
      ? siblingsQuery.is('parent_folder_id', null)
      : siblingsQuery.eq('parent_folder_id', parentFolderId)

  const { data: siblings, error: siblingsError } = await siblingsQuery

  if (siblingsError) throw siblingsError

  const nextSortOrder = siblings?.length ? siblings[0].sort_order + 1 : 0

  const { data, error } = await supabase
    .from('folders')
    .insert({
      user_id: userId,
      name: name?.trim() || null,
      parent_folder_id: parentFolderId,
      sort_order: nextSortOrder,
    })
    .select('id, name, parent_folder_id, sort_order, created_at, updated_at')
    .single()

  if (error) throw error
  return data
}

/**
 * 重新命名 Folder。傳入空字串／undefined 視為清除名稱（回到 null）。
 */
export async function renameFolder(folderId, name) {
  const { data, error } = await supabase
    .from('folders')
    .update({ name: name?.trim() || null })
    .eq('id', folderId)
    .select('id, name, parent_folder_id, sort_order, created_at, updated_at')
    .single()

  if (error) throw error
  return data
}

/**
 * 刪除 Folder。刪除前先檢查是否為空（沒有 Book 關聯、沒有 Child Folder），
 * 不符合就丟出清楚的中文錯誤，不送出 delete 請求。
 * 即使這裡漏檢查，資料庫的 guard_folder_deletion trigger 仍會擋下來。
 */
export async function deleteFolder(folderId) {
  const [{ count: bookCount, error: bookError }, { count: childCount, error: childError }] =
    await Promise.all([
      supabase
        .from('book_folders')
        .select('book_id', { count: 'exact', head: true })
        .eq('folder_id', folderId),
      supabase
        .from('folders')
        .select('id', { count: 'exact', head: true })
        .eq('parent_folder_id', folderId),
    ])

  if (bookError) throw bookError
  if (childError) throw childError

  if (bookCount > 0) {
    throw new Error('這個資料夾裡還有教材，請先移除裡面的教材再刪除。')
  }
  if (childCount > 0) {
    throw new Error('這個資料夾裡還有子資料夾，請先刪除子資料夾再刪除。')
  }

  const { error } = await supabase.from('folders').delete().eq('id', folderId)
  if (error) throw error
}

/**
 * 批次更新 Folder 列表的顯示順序（拖曳排序後呼叫）。
 * orderedFolderIds 是拖曳後、同一層級 Folder 的新順序。
 */
export async function reorderFolders(orderedFolderIds) {
  const updates = orderedFolderIds.map((id, index) =>
    supabase.from('folders').update({ sort_order: index }).eq('id', id)
  )

  const results = await Promise.all(updates)
  const failed = results.find((r) => r.error)
  if (failed) throw failed.error
}
