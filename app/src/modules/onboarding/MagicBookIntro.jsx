// MagicBook 3.0 — Task 3 / 立體 MagicBook
//
// Task 3 範圍：Micro Animation，不是影片。
// 魔法書出現 → 輕微動態 → 開書 → 左右頁定格。
// 「體驗」「購買方案」直接呈現為書頁內容本身（像印在頁面上的文字），
// 左右頁整頁可點擊，不在這裡處理 Trial 消耗或 Payment，只負責導覽。

function MagicBookIntro({ onSelectExperience, onSelectPurchase }) {
  return (
    <div className="mb-onboarding-screen mb-onboarding-screen--book">
      <div className="mb-book-stage">
        <div className="mb-book">
          <button
            type="button"
            className="mb-book-page mb-book-page--left"
            onClick={onSelectExperience}
          >
            <span className="mb-book-page-rule" aria-hidden="true" />
            <span className="mb-book-page-label">體驗</span>
            <span className="mb-book-page-caption">打開書，馬上開始</span>
          </button>
          <div className="mb-book-spine" aria-hidden="true" />
          <button
            type="button"
            className="mb-book-page mb-book-page--right"
            onClick={onSelectPurchase}
          >
            <span className="mb-book-page-rule" aria-hidden="true" />
            <span className="mb-book-page-label">購買方案</span>
            <span className="mb-book-page-caption">選擇適合你的方案</span>
          </button>
        </div>
      </div>
      <p className="mb-onboarding-text">打開你的 MagicBook，開始創作互動教材。</p>
    </div>
  )
}

export default MagicBookIntro
