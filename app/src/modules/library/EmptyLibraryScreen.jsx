// MagicBook 3.0 — Empty Library Screen
//
// 依既有交接文件第二節「兩種進入情境」：
// 尚未建立教材 → 我的魔法書 →「尚未建立魔法書」提示 → 創作魔法書（快捷入口）。

function EmptyLibraryScreen({ onCreateBook }) {
  return (
    <div className="mb-library-empty">
      <p className="mb-library-empty-icon" aria-hidden="true">
        🪄
      </p>
      <h3 className="mb-library-empty-title">尚未建立魔法書</h3>
      <p className="mb-library-empty-text">點擊下方按鈕，開始創作你的第一本魔法書。</p>
      <button type="button" className="mb-onboarding-primary" onClick={onCreateBook}>
        創作魔法書
      </button>
    </div>
  )
}

export default EmptyLibraryScreen
