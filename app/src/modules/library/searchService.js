// MagicBook 3.0 — Search Service
//
// 依 06_API_Design.md §20 Global Search API：Search 的正式產品語意是
// Content Search（搜尋 Text／Image／PDF／Hotspot／Dictionary 等教材內容），
// 不是 Book Title Search。
//
// 依 Task4 實作確認稿 §11、§12：
// Task 4 階段 Editor 還是 Placeholder，系統裡沒有任何真正的 Lesson / Page /
// Text / Image Content，所以現在搜尋任何關鍵字都應該回傳空結果 —— 這是開發
// 階段正常狀態，不是 bug。不可以拿 books.title 去湊一個假的比對結果，
// 否則之後容易把這個臨時資料來源誤認成正式 Content Search 規格。
//
// 這個檔案現在只是介面層 stub。等 Task 5 有真正的教材內容之後，把
// searchContent() 內部實作換成真正查詢 Lesson/Page/Text/Image 內容，
// 呼叫端（SearchBar.jsx／BookLibraryScreen.jsx）完全不用改。

export const SEARCH_SCOPE = {
  TEXT: 'text',
  IMAGE: 'image',
}

/**
 * 搜尋教材內容，回傳符合條件的 Book id 陣列（供 BookCard 發亮使用）。
 *
 * @param {string} keyword 使用者輸入的關鍵字
 * @param {'text' | 'image'} scope 搜尋範圍（【文字】或【圖片】）
 * @returns {Promise<string[]>} 符合的 book id 陣列
 *
 * 現階段固定回傳空陣列：系統裡還沒有可搜尋的教材內容，這是正常狀態。
 */
export async function searchContent(keyword, scope = SEARCH_SCOPE.TEXT) {
  void keyword
  void scope
  return []
}
