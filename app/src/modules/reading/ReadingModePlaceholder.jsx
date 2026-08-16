// MagicBook 3.0 — Task 4 / Reading Mode Placeholder
//
// 依 Task4_Implementation_Plan_draft.md 第 8 節：Reading Mode 實際內容屬於
// Task 13，Task 4 不提前做。同 Task 3 BookLibraryPlaceholder 手法。
//
// Reading Mode 內原有的 Edit Button（由閱讀進入編輯）依既有已確認規則保留，
// 跟 Book Library「編輯」直接入口兩條並存，見 onEdit。

import { displayBookTitle } from '../library/BookCard'

function ReadingModePlaceholder({ book, onBack, onEdit }) {
  return (
    <div className="mb-onboarding-screen">
      <h2 className="mb-onboarding-title">{displayBookTitle(book)}</h2>
      <p className="mb-onboarding-text">閱讀功能將於下一階段開放。</p>
      <div className="mb-onboarding-actions">
        <button type="button" className="mb-onboarding-primary" onClick={onEdit}>
          編輯
        </button>
        <button type="button" className="mb-onboarding-ghost" onClick={onBack}>
          回到我的魔法書
        </button>
      </div>
    </div>
  )
}

export default ReadingModePlaceholder
