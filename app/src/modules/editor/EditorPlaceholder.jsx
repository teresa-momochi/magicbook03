// MagicBook 3.0 — Task 4 / Editor Placeholder
//
// 依 Task4_Implementation_Plan_draft.md 第 8 節：Book Editor 實際內容屬於
// Task 5，Task 4 不提前做。三條入口共用同一個 Placeholder：
// 新書建立（選圖片／文字）、既有教材「編輯」直接入口、Reading Mode 的
// Edit Button（由閱讀進入編輯）。同 Task 3 BookLibraryPlaceholder 手法。

import { displayBookTitle } from '../library/BookCard'

function EditorPlaceholder({ book, onBack }) {
  return (
    <div className="mb-onboarding-screen">
      <h2 className="mb-onboarding-title">{displayBookTitle(book)}</h2>
      <p className="mb-onboarding-text">編輯功能將於下一階段開放。</p>
      <div className="mb-onboarding-actions">
        <button type="button" className="mb-onboarding-ghost" onClick={onBack}>
          回到我的魔法書
        </button>
      </div>
    </div>
  )
}

export default EditorPlaceholder
