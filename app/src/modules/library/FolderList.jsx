// MagicBook 3.0 — Folder List
//
// 依 05_Database_Design.md §6：Folder CRUD、Nested Folder、Drag & Drop Sorting。
// 這裡的拖曳排序只處理「同一層級內」的順序（folders.sort_order），
// 跟 Folder 內 Book 的排序（book_folders.position，見 BookGrid.jsx）是
// 兩個獨立機制，互不影響（依 Task4 實作確認稿 §6）。

import { useState } from 'react'

function folderDisplayName(folder) {
  return folder?.name?.trim() ? folder.name : '未命名資料夾'
}

function buildTree(folders) {
  const byParent = new Map()
  folders.forEach((folder) => {
    const key = folder.parent_folder_id || null
    if (!byParent.has(key)) byParent.set(key, [])
    byParent.get(key).push(folder)
  })
  byParent.forEach((list) => list.sort((a, b) => a.sort_order - b.sort_order))
  return byParent
}

function FolderList({
  folders,
  activeFolderId,
  onOpenFolder,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  onReorderFolders,
}) {
  const [draggingId, setDraggingId] = useState(null)
  const tree = buildTree(folders)

  function handleDrop(e, siblings, targetId) {
    e.preventDefault()
    if (!draggingId || draggingId === targetId) {
      setDraggingId(null)
      return
    }
    const ids = siblings.map((f) => f.id)
    const fromIndex = ids.indexOf(draggingId)
    const toIndex = ids.indexOf(targetId)
    if (fromIndex === -1 || toIndex === -1) {
      setDraggingId(null)
      return
    }
    const nextIds = [...ids]
    nextIds.splice(fromIndex, 1)
    nextIds.splice(toIndex, 0, draggingId)
    setDraggingId(null)
    onReorderFolders(nextIds)
  }

  function renderLevel(parentId, depth) {
    const siblings = tree.get(parentId) || []
    if (siblings.length === 0) return null

    return (
      <ul className="mb-folder-list" style={{ paddingLeft: depth > 0 ? 16 : 0 }}>
        {siblings.map((folder) => (
          <li
            key={folder.id}
            className={`mb-folder-item${activeFolderId === folder.id ? ' mb-folder-item--active' : ''}`}
            draggable
            onDragStart={(e) => {
              setDraggingId(folder.id)
              e.dataTransfer.effectAllowed = 'move'
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, siblings, folder.id)}
          >
            <button type="button" className="mb-folder-item-name" onClick={() => onOpenFolder(folder.id)}>
              📁 {folderDisplayName(folder)}
            </button>
            <div className="mb-folder-item-actions">
              <button type="button" onClick={() => onCreateFolder(folder.id)} title="新增子資料夾">
                ＋
              </button>
              <button type="button" onClick={() => onRenameFolder(folder)} title="重新命名">
                ✎
              </button>
              <button type="button" onClick={() => onDeleteFolder(folder)} title="刪除">
                🗑
              </button>
            </div>
            {renderLevel(folder.id, depth + 1)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="mb-folder-panel">
      <div className="mb-folder-panel-header">
        <h4>資料夾</h4>
        <button type="button" className="mb-folder-panel-add" onClick={() => onCreateFolder(null)}>
          ＋ 新資料夾
        </button>
      </div>
      {folders.length === 0 ? (
        <p className="mb-onboarding-text">還沒有資料夾。</p>
      ) : (
        renderLevel(null, 0)
      )}
    </div>
  )
}

export default FolderList
