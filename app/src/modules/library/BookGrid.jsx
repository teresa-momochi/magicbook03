// MagicBook 3.0 — Book Grid
//
// root 視圖（我的魔法書）：依 books.last_opened_at 排序（Recently Used），
// 不可拖曳排序（listMyBooks 已經處理好順序，這裡只負責顯示）。
//
// Folder 視圖：依 book_folders.position 排序，可拖曳排序，拖放後呼叫
// onReorder(orderedBookIds)，只影響這個 Folder，不影響其他 Folder 或
// Recently Used 順序（依 Task4 實作確認稿 §6）。

import { useState } from 'react'
import BookCard from './BookCard'

function BookGrid({
  books,
  highlightedBookIds,
  draggable = false,
  onReorder,
  onOpen,
  onManageFolders,
  onRename,
  onDelete,
}) {
  const [draggingId, setDraggingId] = useState(null)

  function handleDragStart(e, bookId) {
    setDraggingId(bookId)
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(e) {
    e.preventDefault()
  }

  function handleDrop(e, targetBookId) {
    e.preventDefault()
    if (!draggingId || draggingId === targetBookId) {
      setDraggingId(null)
      return
    }

    const currentOrder = books.map((b) => b.id)
    const fromIndex = currentOrder.indexOf(draggingId)
    const toIndex = currentOrder.indexOf(targetBookId)
    if (fromIndex === -1 || toIndex === -1) {
      setDraggingId(null)
      return
    }

    const nextOrder = [...currentOrder]
    nextOrder.splice(fromIndex, 1)
    nextOrder.splice(toIndex, 0, draggingId)

    setDraggingId(null)
    onReorder?.(nextOrder)
  }

  if (books.length === 0) {
    return <p className="mb-onboarding-text">這裡還沒有教材。</p>
  }

  return (
    <div className="mb-book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isHighlighted={highlightedBookIds?.has(book.id)}
          draggable={draggable}
          onOpen={onOpen}
          onManageFolders={onManageFolders}
          onRename={onRename}
          onDelete={onDelete}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ))}
    </div>
  )
}

export default BookGrid
