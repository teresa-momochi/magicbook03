// MagicBook 3.0 — 共用 Layout 基礎
//
// Task 1 範圍：只建立最基本的共用外框（Layout Shell）。
// 不包含 Home 畫面內容（依 11_MVP_Task_List.md v2.3，Home 為 Task 3 範圍）。
// 不包含 Book Library / Book Editor 等畫面內容。

export default function Layout({ children }) {
  return (
    <div className="mb-app-shell">
      <main className="mb-app-content">
        {children}
      </main>
    </div>
  )
}
