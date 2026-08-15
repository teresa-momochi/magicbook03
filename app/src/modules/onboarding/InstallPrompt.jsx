// MagicBook 3.0 — Task 3 / 裝置加入引導（InstallPrompt）
//
// Task 3 範圍：只負責顯示適用的加入方式提示，並提供「完成」／「略過」。
// 不阻擋使用者繼續使用 MagicBook：任何裝置／瀏覽器狀態下都可以直接略過。
// 不寫入任何 Supabase 資料，這一步的完成／略過狀態只存在於當次畫面流程。

import { useEffect, useState } from 'react'

function detectPlatform() {
  if (typeof navigator === 'undefined') {
    return 'unknown'
  }

  const ua = navigator.userAgent || ''
  const isIOS = /iphone|ipad|ipod/i.test(ua) && !window.MSStream
  const isStandalone =
    (typeof window.matchMedia === 'function' &&
      window.matchMedia('(display-mode: standalone)').matches) ||
    window.navigator.standalone === true

  if (isStandalone) {
    return 'standalone'
  }

  if (isIOS) {
    return 'ios'
  }

  return 'other'
}

function InstallPrompt({ onDone }) {
  const [platform, setPlatform] = useState('other')
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installing, setInstalling] = useState(false)

  useEffect(() => {
    setPlatform(detectPlatform())

    function handleBeforeInstallPrompt(event) {
      event.preventDefault()
      setDeferredPrompt(event)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  async function handleInstallClick() {
    if (!deferredPrompt) {
      return
    }

    setInstalling(true)
    try {
      await deferredPrompt.prompt()
      await deferredPrompt.userChoice
    } finally {
      setDeferredPrompt(null)
      setInstalling(false)
      onDone()
    }
  }

  function renderGuidance() {
    if (platform === 'standalone') {
      return <p className="mb-onboarding-text">MagicBook 已經加入你的裝置了。</p>
    }

    if (deferredPrompt) {
      return (
        <>
          <p className="mb-onboarding-text">把 MagicBook 加入主畫面，下次一鍵開啟。</p>
          <button
            type="button"
            className="mb-onboarding-primary"
            onClick={handleInstallClick}
            disabled={installing}
          >
            {installing ? '處理中…' : '加入主畫面'}
          </button>
        </>
      )
    }

    if (platform === 'ios') {
      return (
        <p className="mb-onboarding-text">
          點選瀏覽器的「分享」按鈕，再選擇「加入主畫面」，下次就能像 App 一樣開啟 MagicBook。
        </p>
      )
    }

    return (
      <p className="mb-onboarding-text">
        你可以把 MagicBook 加入書籤（Ctrl / Cmd + D），方便之後快速回來。
      </p>
    )
  }

  return (
    <div className="mb-onboarding-screen">
      <h2 className="mb-onboarding-title">加入 MagicBook</h2>
      {renderGuidance()}
      <div className="mb-onboarding-actions">
        <button type="button" className="mb-onboarding-primary" onClick={onDone}>
          完成
        </button>
        <button type="button" className="mb-onboarding-ghost" onClick={onDone}>
          略過 / 稍後再說
        </button>
      </div>
    </div>
  )
}

export default InstallPrompt
