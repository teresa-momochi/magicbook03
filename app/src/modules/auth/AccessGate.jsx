// MagicBook 3.0 — Access Gate（Task 2 最基本 UI）
//
// 依 05_Database_Design.md v2.0 §4.3 / 02_MVP_Development.md v3.0 §5.1：
// Access Status = Inactive 時，使用者不能使用 MagicBook。
// 不建立 Read Only / Archive Mode / Temporary Access。
//
// Task 2 範圍：只做「不能使用」的最基本提示畫面，
// 不建立購買流程或 Billing UI（那屬於後續 Task）。

import { signOut } from './authService'

export default function AccessGate() {
  return (
    <div className="mb-access-gate">
      <h2>目前無法使用 MagicBook</h2>
      <p>這個帳號目前的使用權狀態為 Inactive。</p>
      <button type="button" onClick={() => signOut()}>
        登出
      </button>
    </div>
  )
}
