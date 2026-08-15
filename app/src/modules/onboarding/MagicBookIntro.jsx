// MagicBook 3.0 — Task 3 / 立體 MagicBook
//
// Task 3 範圍：Micro Animation，不是影片。
// 魔法書出現 → 輕微動態 → 開書 → 左右頁展開 → 定格。
// 「體驗」「購買方案」呈現為書頁內容本身（像印在頁面上的標題與按鈕），
// 左右頁整頁可點擊，不在這裡處理 Trial 消耗或 Payment，只負責導覽。

function MagicBookIntro({ onSelectExperience, onSelectPurchase }) {
  return (
    <div className="mb-onboarding-screen mb-onboarding-screen--book">
      <div className="mb-magic-sky mb-magic-sky--book">
        <span className="mb-sparkle mb-sparkle--book1" />
        <span className="mb-sparkle mb-sparkle--book2" />
        <span className="mb-sparkle mb-sparkle--book3" />

        <div className="mb-book-heading">
          <span className="mb-book-eyebrow">歡迎來到</span>
          <h2 className="mb-book-title">MagicBook</h2>
          <p className="mb-book-subtitle">打開你的魔法書，開始創作互動教材</p>
        </div>

        <div className="mb-book-stage">
          <div className="mb-book">
            <button
              type="button"
              className="mb-book-page mb-book-page--left"
              onClick={onSelectExperience}
            >
              <span className="mb-book-page-icon" aria-hidden="true">
                📖
              </span>
              <span className="mb-book-page-label">體驗</span>
              <span className="mb-book-page-rule" aria-hidden="true" />
              <span className="mb-book-page-caption">打開魔法書，馬上體驗 MagicBook 的魔法！</span>
              <span className="mb-book-page-cta">
                進入體驗
                <span aria-hidden="true">→</span>
              </span>
            </button>

            <div className="mb-book-spine" aria-hidden="true">
              <span className="mb-book-ribbon" />
            </div>

            <button
              type="button"
              className="mb-book-page mb-book-page--right"
              onClick={onSelectPurchase}
            >
              <span className="mb-book-page-icon" aria-hidden="true">
                🎁
              </span>
              <span className="mb-book-page-label">購買方案</span>
              <span className="mb-book-page-rule" aria-hidden="true" />
              <span className="mb-book-page-caption">選擇適合你的方案，解鎖更多魔法力量！</span>
              <span className="mb-book-page-cta mb-book-page-cta--accent">
                查看方案
                <span aria-hidden="true">→</span>
              </span>
            </button>
          </div>
        </div>

        <p className="mb-book-hint">準備好了嗎？點擊任一選項開始你的旅程！</p>
      </div>
    </div>
  )
}

export default MagicBookIntro
