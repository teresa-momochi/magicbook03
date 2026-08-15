// MagicBook 3.0 — Task 3 / Book Library Placeholder
//
// Task 3 範圍：只提供「體驗」入口的暫時畫面，不實作真正 Book Library。
// 等 Task 4 完成後，直接把這個元件替換成正式 Book Library。

function BookLibraryPlaceholder({ onBack }) {
  return (
    <div className="mb-onboarding-screen">
      <h2 className="mb-onboarding-title">Book Library</h2>
      <p className="mb-onboarding-text">Book Library 將於下一階段開放。</p>
      <div className="mb-onboarding-actions">
        <button type="button" className="mb-onboarding-ghost" onClick={onBack}>
          回到入口
        </button>
      </div>
    </div>
  )
}

export default BookLibraryPlaceholder
