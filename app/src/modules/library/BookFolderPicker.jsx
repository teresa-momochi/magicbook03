// MagicBook 3.0 — Book ↔ Folder Picker
//
// 依 Task4 實作確認稿 §5：Book 要出現在哪些 Folder，用勾選，不是拖曳搬移。
// 例如「故事」勾選 B班／C班／E班，儲存後同一本書會出現在這三個 Folder。

import { useEffect, useState } from 'react'
import Modal from './Modal'
import { displayBookTitle } from './BookCard'
import { getFoldersForBook, setBookFolders } from './bookFolderService'

function folderDisplayName(folder) {
  return folder?.name?.trim() ? folder.name : '未命名資料夾'
}

function BookFolderPicker({ book, folders, onClose, onSaved }) {
  const [checkedIds, setCheckedIds] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getFoldersForBook(book.id)
      .then((folderIds) => {
        if (!cancelled) setCheckedIds(new Set(folderIds))
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || '載入目前分類失敗。')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [book.id])

  function toggleFolder(folderId) {
    setCheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(folderId)) {
        next.delete(folderId)
      } else {
        next.add(folderId)
      }
      return next
    })
  }

  async function handleSave() {
    setSaving(true)
    setError(null)
    try {
      await setBookFolders(book.id, [...checkedIds])
      onSaved?.()
      onClose()
    } catch (err) {
      setError(err.message || '儲存失敗，請稍後再試。')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal title={`${displayBookTitle(book)} — 分類到`} onClose={onClose}>
      {loading && <p className="mb-onboarding-text">載入中…</p>}

      {!loading && folders.length === 0 && (
        <p className="mb-onboarding-text">還沒有任何資料夾，可以先建立一個資料夾再分類。</p>
      )}

      {!loading && folders.length > 0 && (
        <ul className="mb-folder-picker-list">
          {folders.map((folder) => (
            <li key={folder.id} className="mb-folder-picker-item">
              <label>
                <input
                  type="checkbox"
                  checked={checkedIds.has(folder.id)}
                  onChange={() => toggleFolder(folder.id)}
                  disabled={saving}
                />
                {folderDisplayName(folder)}
              </label>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p role="alert" className="mb-onboarding-text">
          {error}
        </p>
      )}

      <div className="mb-onboarding-actions">
        <button
          type="button"
          className="mb-onboarding-primary"
          onClick={handleSave}
          disabled={loading || saving}
        >
          {saving ? '儲存中…' : '儲存'}
        </button>
      </div>
    </Modal>
  )
}

export default BookFolderPicker
