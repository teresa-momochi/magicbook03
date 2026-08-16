// MagicBook 3.0 — Task 4 / Book Library Screen
//
// 取代 Task 3 的 BookLibraryPlaceholder.jsx，依 Task4_Implementation_Plan_draft.md
// 與 Task4 實作確認稿實作第一版可操作的 Book Library。
//
// 依既有交接文件第二節「兩種進入情境」：
// - 尚未建立教材：EmptyLibraryScreen →「創作魔法書」→ 選圖片／文字 → Editor Placeholder
// - 已有教材：BookGrid 點選 → 打開魔法書 →「閱讀」／「編輯」→ 對應 Placeholder
//
// Reading Mode 內既有的 Edit Button（由閱讀進入編輯）依既有已確認規則保留，
// 跟 Book Library「編輯」直接入口兩條並存（見 handleEditFromReading）。

import { useCallback, useEffect, useState } from 'react'
import TopNavigation from './TopNavigation'
import FolderList from './FolderList'
import BookGrid from './BookGrid'
import EmptyLibraryScreen from './EmptyLibraryScreen'
import BookOpenChoiceModal from './BookOpenChoiceModal'
import NewBookTypeModal from './NewBookTypeModal'
import BookFolderPicker from './BookFolderPicker'
import RenamePromptModal from './RenamePromptModal'
import EditorPlaceholder from '../editor/EditorPlaceholder'
import ReadingModePlaceholder from '../reading/ReadingModePlaceholder'
import { listMyBooks, createBook, renameBook, deleteBook, touchLastOpened } from './bookService'
import { listMyFolders, createFolder, renameFolder, deleteFolder, reorderFolders } from './folderService'
import { listBooksInFolder, reorderBooksInFolder } from './bookFolderService'

const SCREEN = {
  LIBRARY: 'library',
  EDITOR: 'editor',
  READING: 'reading',
}

function BookLibraryScreen({ onBack }) {
  const [screen, setScreen] = useState(SCREEN.LIBRARY)
  const [activeBook, setActiveBook] = useState(null)

  const [books, setBooks] = useState([])
  const [folders, setFolders] = useState([])
  const [activeFolderId, setActiveFolderId] = useState(null)
  const [folderBooks, setFolderBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [highlightedBookIds, setHighlightedBookIds] = useState(new Set())

  const [openChoiceBook, setOpenChoiceBook] = useState(null)
  const [showNewBookType, setShowNewBookType] = useState(false)
  const [folderPickerBook, setFolderPickerBook] = useState(null)
  const [renameTarget, setRenameTarget] = useState(null) // { kind: 'book' | 'folder', item }
  const [createFolderParentId, setCreateFolderParentId] = useState(undefined) // undefined = 不顯示

  const loadLibrary = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [bookList, folderList] = await Promise.all([listMyBooks(), listMyFolders()])
      setBooks(bookList)
      setFolders(folderList)
    } catch (err) {
      setError(err.message || '載入教材庫失敗，請稍後再試。')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadLibrary()
  }, [loadLibrary])

  const loadFolderBooks = useCallback(async (folderId) => {
    setLoading(true)
    setError(null)
    try {
      const list = await listBooksInFolder(folderId)
      setFolderBooks(list)
    } catch (err) {
      setError(err.message || '載入資料夾內容失敗，請稍後再試。')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (activeFolderId) {
      loadFolderBooks(activeFolderId)
    }
  }, [activeFolderId, loadFolderBooks])

  function handleGoRoot() {
    setActiveFolderId(null)
    setHighlightedBookIds(new Set())
  }

  function handleOpenFolder(folderId) {
    setActiveFolderId(folderId)
    setHighlightedBookIds(new Set())
  }

  function handleSearchResultsChange(matchedBookIds) {
    setHighlightedBookIds(new Set(matchedBookIds))
  }

  // ---------- Book 開啟流程 ----------

  function handleOpenBook(book) {
    setOpenChoiceBook(book)
  }

  async function handleConfirmRead() {
    const book = openChoiceBook
    setOpenChoiceBook(null)
    await touchLastOpened(book.id)
    setActiveBook(book)
    setScreen(SCREEN.READING)
  }

  async function handleConfirmEdit() {
    const book = openChoiceBook
    setOpenChoiceBook(null)
    await touchLastOpened(book.id)
    setActiveBook(book)
    setScreen(SCREEN.EDITOR)
  }

  function handleEditFromReading() {
    // Reading Mode 的 Edit Button，跟 Book Library「編輯」直接入口並存。
    setScreen(SCREEN.EDITOR)
  }

  function handleBackToLibrary() {
    setScreen(SCREEN.LIBRARY)
    setActiveBook(null)
    loadLibrary()
    if (activeFolderId) loadFolderBooks(activeFolderId)
  }

  // ---------- 新書建立流程 ----------

  function handleStartCreateBook() {
    setShowNewBookType(true)
  }

  async function handleSelectNewBookType() {
    setShowNewBookType(false)
    try {
      const book = await createBook({})
      // 依 Teresa 確認：Amy 剛建立的 Book 已經是「剛剛使用的 Book」，
      // 建立成功當下就視為開啟過，讓它立即出現在 Recently Used 最前面。
      await touchLastOpened(book.id)
      setActiveBook({ ...book, last_opened_at: new Date().toISOString() })
      setScreen(SCREEN.EDITOR)
    } catch (err) {
      setError(err.message || '建立教材失敗，請稍後再試。')
    }
  }

  // ---------- Book 操作 ----------

  async function handleDeleteBook(book) {
    const ok = window.confirm(`確定要刪除「${book.title || '未命名'}」嗎？此動作無法復原。`)
    if (!ok) return
    try {
      await deleteBook(book.id)
      await loadLibrary()
      if (activeFolderId) await loadFolderBooks(activeFolderId)
    } catch (err) {
      setError(err.message || '刪除失敗，請稍後再試。')
    }
  }

  function handleRenameBook(book) {
    setRenameTarget({ kind: 'book', item: book })
  }

  async function handleManageFolders(book) {
    setFolderPickerBook(book)
  }

  async function handleReorderRootBooks() {
    // 根目錄視圖依 Recently Used 排序，不支援手動拖曳排序，這裡不會被觸發
    // （BookGrid 的 draggable 在根目錄視圖為 false）。
  }

  async function handleReorderFolderBooks(orderedBookIds) {
    if (!activeFolderId) return
    const previous = folderBooks
    setFolderBooks(orderedBookIds.map((id) => previous.find((b) => b.id === id)).filter(Boolean))
    try {
      await reorderBooksInFolder(activeFolderId, orderedBookIds)
    } catch (err) {
      setError(err.message || '排序儲存失敗，請稍後再試。')
      loadFolderBooks(activeFolderId)
    }
  }

  // ---------- Folder 操作 ----------

  function handleRequestCreateFolder(parentFolderId) {
    setCreateFolderParentId(parentFolderId)
  }

  async function handleCreateFolderSubmit(name) {
    await createFolder({ name, parentFolderId: createFolderParentId })
    setCreateFolderParentId(undefined)
    await loadLibrary()
  }

  function handleRenameFolder(folder) {
    setRenameTarget({ kind: 'folder', item: folder })
  }

  async function handleDeleteFolder(folder) {
    const ok = window.confirm(`確定要刪除資料夾「${folder.name || '未命名資料夾'}」嗎？`)
    if (!ok) return
    try {
      await deleteFolder(folder.id)
      if (activeFolderId === folder.id) setActiveFolderId(null)
      await loadLibrary()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleReorderFolders(orderedFolderIds) {
    try {
      await reorderFolders(orderedFolderIds)
      await loadLibrary()
    } catch (err) {
      setError(err.message || '資料夾排序儲存失敗，請稍後再試。')
    }
  }

  // ---------- Rename Modal（Book / Folder 共用） ----------

  async function handleRenameSubmit(value) {
    if (!renameTarget) return
    if (renameTarget.kind === 'book') {
      await renameBook(renameTarget.item.id, value)
      await loadLibrary()
      if (activeFolderId) await loadFolderBooks(activeFolderId)
    } else {
      await renameFolder(renameTarget.item.id, value)
      await loadLibrary()
    }
  }

  // ---------- Render ----------

  if (screen === SCREEN.EDITOR) {
    return <EditorPlaceholder book={activeBook} onBack={handleBackToLibrary} />
  }

  if (screen === SCREEN.READING) {
    return (
      <ReadingModePlaceholder
        book={activeBook}
        onBack={handleBackToLibrary}
        onEdit={handleEditFromReading}
      />
    )
  }

  const visibleBooks = activeFolderId ? folderBooks : books
  const activeFolder = folders.find((f) => f.id === activeFolderId)

  return (
    <div className="mb-library-screen">
      <TopNavigation
        onGoRoot={handleGoRoot}
        onCreateBook={handleStartCreateBook}
        onSearchResultsChange={handleSearchResultsChange}
      />

      <div className="mb-library-body">
        <FolderList
          folders={folders}
          activeFolderId={activeFolderId}
          onOpenFolder={handleOpenFolder}
          onCreateFolder={handleRequestCreateFolder}
          onRenameFolder={handleRenameFolder}
          onDeleteFolder={handleDeleteFolder}
          onReorderFolders={handleReorderFolders}
        />

        <div className="mb-library-main">
          <h3 className="mb-library-main-title">
            {activeFolderId ? `📁 ${activeFolder?.name || '未命名資料夾'}` : '我的魔法書'}
          </h3>

          {error && (
            <p role="alert" className="mb-onboarding-text">
              {error}
            </p>
          )}

          {loading && <p className="mb-onboarding-text">載入中…</p>}

          {!loading && !activeFolderId && books.length === 0 && (
            <EmptyLibraryScreen onCreateBook={handleStartCreateBook} />
          )}

          {!loading && (activeFolderId || books.length > 0) && (
            <BookGrid
              books={visibleBooks}
              highlightedBookIds={highlightedBookIds}
              draggable={Boolean(activeFolderId)}
              onReorder={activeFolderId ? handleReorderFolderBooks : handleReorderRootBooks}
              onOpen={handleOpenBook}
              onManageFolders={handleManageFolders}
              onRename={handleRenameBook}
              onDelete={handleDeleteBook}
            />
          )}
        </div>
      </div>

      <button type="button" className="mb-onboarding-ghost" onClick={onBack}>
        回到入口
      </button>

      {openChoiceBook && (
        <BookOpenChoiceModal
          book={openChoiceBook}
          onClose={() => setOpenChoiceBook(null)}
          onRead={handleConfirmRead}
          onEdit={handleConfirmEdit}
        />
      )}

      {showNewBookType && (
        <NewBookTypeModal
          onClose={() => setShowNewBookType(false)}
          onSelectImage={handleSelectNewBookType}
          onSelectText={handleSelectNewBookType}
        />
      )}

      {folderPickerBook && (
        <BookFolderPicker
          book={folderPickerBook}
          folders={folders}
          onClose={() => setFolderPickerBook(null)}
          onSaved={() => {
            loadLibrary()
            if (activeFolderId) loadFolderBooks(activeFolderId)
          }}
        />
      )}

      {renameTarget && (
        <RenamePromptModal
          title={renameTarget.kind === 'book' ? '重新命名教材' : '重新命名資料夾'}
          initialValue={renameTarget.item.title || renameTarget.item.name || ''}
          onClose={() => setRenameTarget(null)}
          onSubmit={handleRenameSubmit}
        />
      )}

      {createFolderParentId !== undefined && (
        <RenamePromptModal
          title="新資料夾"
          initialValue=""
          onClose={() => setCreateFolderParentId(undefined)}
          onSubmit={handleCreateFolderSubmit}
        />
      )}
    </div>
  )
}

export default BookLibraryScreen
