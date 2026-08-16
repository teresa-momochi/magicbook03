// MagicBook 3.0 — Search Bar
//
// 依 Task4 實作確認稿 §11、§12：
// 🔍、【圖片】【文字】切換、關鍵字輸入。現階段搜尋任何關鍵字都會是空結果
// （searchService.js 是介面層 stub），這是正常狀態，這裡不需要特別處理
// 「查不到」的錯誤，單純呈現查詢結果（可能是空陣列）。

import { useState } from 'react'
import { searchContent, SEARCH_SCOPE } from './searchService'

function SearchBar({ onResultsChange }) {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [scope, setScope] = useState(SEARCH_SCOPE.TEXT)
  const [searching, setSearching] = useState(false)

  async function runSearch(nextKeyword, nextScope) {
    if (!nextKeyword.trim()) {
      onResultsChange([])
      return
    }
    setSearching(true)
    try {
      const matchedBookIds = await searchContent(nextKeyword.trim(), nextScope)
      onResultsChange(matchedBookIds)
    } finally {
      setSearching(false)
    }
  }

  function handleKeywordChange(e) {
    const value = e.target.value
    setKeyword(value)
    runSearch(value, scope)
  }

  function handleScopeChange(nextScope) {
    setScope(nextScope)
    runSearch(keyword, nextScope)
  }

  function handleClose() {
    setOpen(false)
    setKeyword('')
    onResultsChange([])
  }

  if (!open) {
    return (
      <button
        type="button"
        className="mb-search-icon"
        aria-label="搜尋教材"
        onClick={() => setOpen(true)}
      >
        🔍
      </button>
    )
  }

  return (
    <div className="mb-search-bar">
      <div className="mb-search-bar-scope">
        <button
          type="button"
          className={`mb-search-scope-btn${scope === SEARCH_SCOPE.IMAGE ? ' mb-search-scope-btn--active' : ''}`}
          onClick={() => handleScopeChange(SEARCH_SCOPE.IMAGE)}
        >
          圖片
        </button>
        <button
          type="button"
          className={`mb-search-scope-btn${scope === SEARCH_SCOPE.TEXT ? ' mb-search-scope-btn--active' : ''}`}
          onClick={() => handleScopeChange(SEARCH_SCOPE.TEXT)}
        >
          文字
        </button>
      </div>
      <input
        type="text"
        className="mb-search-input"
        placeholder="搜尋教材內容…"
        value={keyword}
        onChange={handleKeywordChange}
        autoFocus
      />
      {searching && <span className="mb-search-status">搜尋中…</span>}
      <button type="button" className="mb-search-close" aria-label="關閉搜尋" onClick={handleClose}>
        ✕
      </button>
    </div>
  )
}

export default SearchBar
