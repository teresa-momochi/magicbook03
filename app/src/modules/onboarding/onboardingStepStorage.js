// MagicBook 3.0 — Onboarding Step 持久化
//
// 依 Task4 實測回饋：重新整理頁面（或離開分頁再回來）時，
// 畫面應該停留在使用者原本所在的位置（例如 Book Library），
// 不應該被打回最初的 InstallPrompt，造成「亂了流程」的體驗。
//
// 用 localStorage 記住「這個帳號」上次停留在哪個 step，key 帶入 userId，
// 避免同一台電腦以後被不同帳號登入時，看到別人上次停留的畫面。
// 這只是前端導覽狀態的記憶，不是 Supabase 資料，不影響任何後端邏輯。

const STORAGE_PREFIX = 'mb_onboarding_step:'

/**
 * 讀取這個帳號上次停留的 step。
 * validSteps 是目前合法的 step 值清單，避免程式改版後讀到舊的、
 * 已經不存在的 step 值導致畫面壞掉。
 */
export function loadOnboardingStep(userId, validSteps) {
  if (!userId) return null
  try {
    const value = window.localStorage.getItem(STORAGE_PREFIX + userId)
    if (value && validSteps.includes(value)) return value
  } catch {
    // localStorage 不可用（例如部分無痕模式情況），略過，不影響主流程，
    // 退回預設行為（從頭開始）。
  }
  return null
}

/**
 * 記住這個帳號目前停留的 step。
 */
export function saveOnboardingStep(userId, step) {
  if (!userId) return
  try {
    window.localStorage.setItem(STORAGE_PREFIX + userId, step)
  } catch {
    // 略過，不影響主流程。
  }
}
