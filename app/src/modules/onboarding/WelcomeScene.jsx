// MagicBook 3.0 — Task 3 / MagicBook Welcome Scene
//
// Task 3 範圍：Micro Animation，不是影片。
// 魔法棒揮舞（弧線＋旋轉）+ 沿路徑出現的星光粒子 + 「歡迎創作魔法書」文字。
// 動畫本身輕量、不阻塞：使用者可以隨時點擊繼續，不需要等動畫播完。

function WelcomeScene({ onDone }) {
  return (
    <div className="mb-onboarding-screen">
      <div className="mb-magic-sky">
        <div className="mb-welcome-stage" aria-hidden="true">
          <span className="mb-welcome-wand">🪄</span>
          <span className="mb-sparkle mb-sparkle--1" />
          <span className="mb-sparkle mb-sparkle--2" />
          <span className="mb-sparkle mb-sparkle--3" />
          <span className="mb-welcome-star mb-welcome-star--1">✨</span>
          <span className="mb-welcome-star mb-welcome-star--2">✨</span>
          <span className="mb-welcome-star mb-welcome-star--3">✨</span>
        </div>
        <h2 className="mb-onboarding-title mb-onboarding-title--magic">歡迎創作魔法書</h2>
        <div className="mb-onboarding-actions">
          <button type="button" className="mb-onboarding-primary" onClick={onDone}>
            繼續
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScene
