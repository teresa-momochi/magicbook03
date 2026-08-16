// MagicBook 3.0 — Book ↔ Folder Service
//
// 依 Task4 實作確認稿 §5：Book 要出現在哪些 Folder，用勾選（多選），
// 不是拖曳搬移。同一本 Book 可以同時被多個 Folder 使用（Amy 的「故事」
// 同時給 B班／C班／E班用），這裡的 book_folders 是多對多關聯表。
//
// 依確認稿 §6：Folder 內 Book 排序（book_folders.position）跟
// Folder 列表本身排序（folders.sort_order，見 folderService.js）是兩個
// 獨立機制，同一本書在不同 Folder 的 position 互相獨立。

import { supabase } from '../../shared/lib/supabaseClient'

/**
 * 取得某本 Book 目前被勾選在哪些 Folder（BookFolderPicker.jsx 開啟時用來
 * 預先勾好目前已經指派的 Folder）。回傳 folder_id 陣列。
 */
export async function getFoldersForBook(bookId) {
  const { data, error } = await supabase
    .from('book_folders')
    .select('folder_id')
    .eq('book_id', bookId)

  if (error) throw error
  return data.map((row) => row.folder_id)
}

/**
 * 依勾選介面存檔用：把一本 Book 的 Folder 歸屬整批換成 folderIds。
 * 做法：查出目前已有的關聯，跟新的 folderIds 比對差異，
 * 只新增/刪除有變動的部分，沒被動到的 Folder 裡 position 不會被打亂。
 */
export async function setBookFolders(bookId, folderIds) {
  const { data: existingRows, error: existingError } = await supabase
    .from('book_folders')
    .select('folder_id')
    .eq('book_id', bookId)

  if (existingError) throw existingError

  const existingIds = new Set(existingRows.map((row) => row.folder_id))
  const nextIds = new Set(folderIds)

  const toRemove = [...existingIds].filter((id) => !nextIds.has(id))
  const toAdd = [...nextIds].filter((id) => !existingIds.has(id))

  if (toRemove.length > 0) {
    const { error } = await supabase
      .from('book_folders')
      .delete()
      .eq('book_id', bookId)
      .in('folder_id', toRemove)
    if (error) throw error
  }

  if (toAdd.length > 0) {
    // 新加入的 Folder，position 放在該 Folder 目前最後面。
    const positions = await Promise.all(
      toAdd.map(async (folderId) => {
        const { data: last, error } = await supabase
          .from('book_folders')
          .select('position')
          .eq('folder_id', folderId)
          .order('position', { ascending: false })
          .limit(1)
        if (error) throw error
        const nextPosition = last?.length ? last[0].position + 1 : 0
        return { book_id: bookId, folder_id: folderId, position: nextPosition }
      })
    )

    const { error } = await supabase.from('book_folders').insert(positions)
    if (error) throw error
  }
}

/**
 * 取得某個 Folder 裡的 Book 列表，依這個 Folder 自己的 position 排序
 * （不是 Recently Used，也不是其他 Folder 的順序）。
 */
export async function listBooksInFolder(folderId) {
  const { data, error } = await supabase
    .from('book_folders')
    .select('position, book:books(id, title, last_opened_at, created_at, updated_at)')
    .eq('folder_id', folderId)
    .order('position', { ascending: true })

  if (error) throw error
  return data.map((row) => row.book)
}

/**
 * 拖曳排序某個 Folder 內的 Book 後呼叫，批次更新這個 Folder 底下的 position。
 * 只影響這個 Folder，不影響同一本書在其他 Folder 裡的順序。
 */
export async function reorderBooksInFolder(folderId, orderedBookIds) {
  const updates = orderedBookIds.map((bookId, index) =>
    supabase
      .from('book_folders')
      .update({ position: index })
      .eq('folder_id', folderId)
      .eq('book_id', bookId)
  )

  const results = await Promise.all(updates)
  const failed = results.find((r) => r.error)
  if (failed) throw failed.error
}
