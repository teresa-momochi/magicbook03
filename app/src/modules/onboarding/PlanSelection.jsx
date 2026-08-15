// MagicBook 3.0 — Task 3 / 方案選擇頁骨架（PlanSelection）
//
// Task 3 範圍：只建立四個方案入口的畫面結構與導覽。
// 不寫死價格、不決定計價公式、不接 Payment / Billing / Webhook、
// 不實作揪團邀請機制。實際購買流程屬於後續 Billing Task。

const PLANS = [
  { id: 'personal', label: '個人使用' },
  { id: 'group-2-10', label: '2–10 人［揪團］' },
  { id: 'group-11-20', label: '11–20 人［揪團］' },
  { id: 'group-21-plus', label: '21 人以上［揪團］' },
]

function PlanSelection({ onBack }) {
  return (
    <div className="mb-onboarding-screen">
      <h2 className="mb-onboarding-title">購買方案</h2>
      <p className="mb-onboarding-text">選擇適合你的方案，價格與付款流程將於後續開放。</p>
      <div className="mb-plan-list">
        {PLANS.map((plan) => (
          <div key={plan.id} className="mb-plan-card">
            <span className="mb-plan-card-label">{plan.label}</span>
            <span className="mb-plan-card-note">購買流程即將開放</span>
          </div>
        ))}
      </div>
      <div className="mb-onboarding-actions">
        <button type="button" className="mb-onboarding-ghost" onClick={onBack}>
          返回
        </button>
      </div>
    </div>
  )
}

export default PlanSelection
