// MagicBook 3.0 — Book Card
//
// 依 Task4 實作確認稿 §7：title 為 null／空字串時顯示「未命名」，
// 這只是 UI 顯示層的 fallback，不會被寫回資料庫。
//
// 依確認稿 §11：Search 命中時卡片本身發亮（isHighlighted），
// 不是跳出一個獨立的搜尋結果清單。
//
// 支援拖曳排序（Folder 內 Book 排序 / 未來可延伸），draggable 由呼叫端決定
// 是否啟用（root 視圖用 Recently Used 排序，不可拖曳；Folder 視圖可拖曳）。

function displayBookTitle(book) {
  return book?.title?.trim() ? book.title : '未命名'
}

function BookCard({
  book,
  isHighlighted = false,
  draggable = false,
  onOpen,
  onManageFolders,
  onRename,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  return (
    <div
      className={`mb-book-card${isHighlighted ? ' mb-book-card--highlight' : ''}`}
      draggable={draggable}
      onDragStart={draggable ? (e) => onDragStart?.(e, book.id) : undefined}
      onDragOver={draggable ? (e) => onDragOver?.(e, book.id) : undefined}
      onDrop={draggable ? (e) => onDrop?.(e, book.id) : undefined}
    >
      <button type="button" className="mb-book-card-main" onClick={() => onOpen(book)}>
        <span className="mb-book-card-icon" aria-hidden="true">
          📖
        </span>
        <span className="mb-book-card-title">{displayBookTitle(book)}</span>
      </button>

      <div className="mb-book-card-actions">
        <button type="button" className="mb-book-card-action" onClick={() => onManageFolders(book)}>
          分類
        </button>
        <button type="button" className="mb-book-card-action" onClick={() => onRename(book)}>
          重新命名
        </button>
        <button
          type="button"
          className="mb-book-card-action mb-book-card-action--danger"
          onClick={() => onDelete(book)}
        >
          刪除
        </button>
      </div>
    </div>
  )
}

export default BookCard
export { displayBookTitle }
