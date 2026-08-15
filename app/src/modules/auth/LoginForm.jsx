// MagicBook 3.0 — Login Form（Task 2 最基本 UI）
//
// 依 01_Product_Specification.md v3.4 §6.2 / 09_UI_Design.md v2.0 §4.2：
// 第一次使用流程：Email → Email Verification → 建立 User Account → 登入。
//
// Task 2 範圍：只做 Authentication 需要的最基本輸入畫面。
// 不包含 Home、Trial 商品頁、Purchase UI（依 Task 2 指令九，屬於後續 Task）。

import { useState } from 'react'
import { sendEmailVerification, verifyEmailCode } from './authService'

const STEP_EMAIL = 'email'
const STEP_CODE = 'code'

export default function LoginForm() {
  const [step, setStep] = useState(STEP_EMAIL)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSendCode(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await sendEmailVerification(email.trim())
      setStep(STEP_CODE)
    } catch (err) {
      setError(err.message || '發送驗證碼失敗，請稍後再試。')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleVerifyCode(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await verifyEmailCode(email.trim(), code.trim())
      // 登入成功後，AuthContext 會透過 onAuthStateChange 自動更新 session。
    } catch (err) {
      setError(err.message || '驗證碼錯誤或已過期，請重新輸入。')
    } finally {
      setSubmitting(false)
    }
  }

  function handleUseAnotherEmail() {
    setStep(STEP_EMAIL)
    setCode('')
    setError(null)
  }

  return (
    <div className="mb-login">
      <h2>登入 MagicBook</h2>

      {step === STEP_EMAIL && (
        <form onSubmit={handleSendCode}>
          <label htmlFor="mb-login-email">Email</label>
          <input
            id="mb-login-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
          />
          <button type="submit" disabled={submitting || !email}>
            {submitting ? '發送中…' : '發送驗證碼'}
          </button>
        </form>
      )}

      {step === STEP_CODE && (
        <form onSubmit={handleVerifyCode}>
          <p>驗證碼已發送到 {email}</p>
          <label htmlFor="mb-login-code">驗證碼</label>
          <input
            id="mb-login-code"
            type="text"
            inputMode="numeric"
            required
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={submitting}
          />
          <button type="submit" disabled={submitting || !code}>
            {submitting ? '驗證中…' : '登入'}
          </button>
          <button
            type="button"
            onClick={handleUseAnotherEmail}
            disabled={submitting}
          >
            使用其他 Email
          </button>
        </form>
      )}

      {error && <p role="alert">{error}</p>}
    </div>
  )
}
