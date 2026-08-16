// MagicBook 3.0 — Task 3 / OnboardingFlow
//
// 登入成功後的入口體驗流程（Task 3 正式範圍）：
// InstallPrompt → WelcomeScene → MagicBookIntro → 體驗 / 購買方案
//
// 這裡只管理「目前顯示哪一個畫面」的前端導覽狀態，不寫入 Supabase，
// 不做 Trial 消耗、不做 Billing / Payment。
// 「體驗」導向 Book Library（Task 4 起為正式功能，取代原本的 Placeholder）。

import { useState } from 'react'
import InstallPrompt from './InstallPrompt'
import WelcomeScene from './WelcomeScene'
import MagicBookIntro from './MagicBookIntro'
import PlanSelection from './PlanSelection'
import BookLibraryScreen from '../library/BookLibraryScreen'
import { signOut } from '../auth/authService'

const STEPS = {
  INSTALL: 'install',
  WELCOME: 'welcome',
  INTRO: 'intro',
  LIBRARY: 'library',
  PLANS: 'plans',
}

function OnboardingFlow({ userAccount }) {
  const [step, setStep] = useState(STEPS.INSTALL)

  function renderStep() {
    switch (step) {
      case STEPS.INSTALL:
        return <InstallPrompt onDone={() => setStep(STEPS.WELCOME)} />
      case STEPS.WELCOME:
        return <WelcomeScene onDone={() => setStep(STEPS.INTRO)} />
      case STEPS.INTRO:
        return (
          <MagicBookIntro
            onSelectExperience={() => setStep(STEPS.LIBRARY)}
            onSelectPurchase={() => setStep(STEPS.PLANS)}
          />
        )
      case STEPS.LIBRARY:
        return <BookLibraryScreen onBack={() => setStep(STEPS.INTRO)} />
      case STEPS.PLANS:
        return <PlanSelection onBack={() => setStep(STEPS.INTRO)} />
      default:
        return null
    }
  }

  return (
    <div className="mb-onboarding-wrap">
      {renderStep()}
      <div className="mb-onboarding-footer">
        <span className="mb-onboarding-footer-email">{userAccount?.email}</span>
        <button type="button" className="mb-onboarding-footer-signout" onClick={() => signOut()}>
          登出
        </button>
      </div>
    </div>
  )
}

export default OnboardingFlow
