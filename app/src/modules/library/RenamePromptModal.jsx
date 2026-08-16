// MagicBook 3.0 — Rename Prompt Modal
//
// Book 跟 Folder 共用同一套 Rename 輸入介面。
// 依 Task4 實作確認稿 §7：留空存檔＝清除名稱（回到 null），
// 不會把「未命名」寫進資料庫，UI 端下次顯示時走 fallback。

import { useState } from 'react'

function RenamePromptModal({ title, initialValue, onClose, onSubmit }) {
  const [value, setValue] = useState(initialValue || '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit(value)
      onClose()
    } catch (err) {
      setError(err.message || '儲存失敗，請稍後再試。')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mb-modal-overlay" onClick={onClose}>
      <div className="mb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="mb-modal-header">
          <h3 className="mb-modal-title">{title}</h3>
          <button type="button" className="mb-modal-close" aria-label="關閉" onClick={onClose}>
            ✕
          </button>
        </div>
        <form className="mb-modal-body" onSubmit={handleSubmit}>
          <input
            type="text"
            className="mb-search-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            disabled={submitting}
          />
          {error && (
            <p role="alert" className="mb-onboarding-text">
              {error}
            </p>
          )}
          <div className="mb-onboarding-actions">
            <button type="submit" className="mb-onboarding-primary" disabled={submitting}>
              {submitting ? '儲存中…' : '儲存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RenamePromptModal
