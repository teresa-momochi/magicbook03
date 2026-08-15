// MagicBook 3.0 — Task 3 / 立體 MagicBook
//
// Task 3 範圍：Micro Animation，不是影片。
// 魔法書出現 → 輕微動態 → 開書 → 左右頁定格。
// 左頁「體驗」、右頁「購買方案」為本畫面唯一兩個入口，
// 不在這裡處理 Trial 消耗或 Payment，只負責導覽。

function MagicBookIntro({ onSelectExperience, onSelectPurchase }) {
  return (
    <div className="mb-onboarding-screen">
      <div className="mb-book-stage">
        <div className="mb-book">
          <button
            type="button"
            className="mb-book-page mb-book-page--left"
            onClick={onSelectExperience}
          >
            <span className="mb-book-page-label">體驗</span>
          </button>
          <div className="mb-book-spine" aria-hidden="true">
            📖
          </div>
          <button
            type="button"
            className="mb-book-page mb-book-page--right"
            onClick={onSelectPurchase}
          >
            <span className="mb-book-page-label">購買方案</span>
          </button>
        </div>
      </div>
      <p className="mb-onboarding-text">打開你的 MagicBook，開始創作互動教材。</p>
    </div>
  )
}

export default MagicBookIntro
