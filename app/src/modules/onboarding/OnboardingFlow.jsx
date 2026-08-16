// MagicBook 3.0 — Task 3 / OnboardingFlow
//
// 登入成功後的入口體驗流程（Task 3 正式範圍）：
// InstallPrompt → WelcomeScene → MagicBookIntro → 體驗 / 購買方案
//
// 這裡只管理「目前顯示哪一個畫面」的前端導覽狀態，不寫入 Supabase，
// 不做 Trial 消耗、不做 Billing / Payment。
// 「體驗」導向 Book Library（Task 4 起為正式功能，取代原本的 Placeholder）。
//
// 依 Task4 實測回饋修正：畫面位置（step）會存進 localStorage（依帳號 ID），
// 重新整理頁面或離開分頁再回來時，會停留在原本的位置，不會被打回
// InstallPrompt 重新跑一次入口流程。見 onboardingStepStorage.js。

import { useEffect, useState } from 'react'
import InstallPrompt from './InstallPrompt'
import WelcomeScene from './WelcomeScene'
import MagicBookIntro from './MagicBookIntro'
import PlanSelection from './PlanSelection'
import BookLibraryScreen from '../library/BookLibraryScreen'
import { signOut } from '../auth/authService'
import { loadOnboardingStep, saveOnboardingStep } from './onboardingStepStorage'

const STEPS = {
  INSTALL: 'install',
  WELCOME: 'welcome',
  INTRO: 'intro',
  LIBRARY: 'library',
  PLANS: 'plans',
}

const VALID_STEPS = Object.values(STEPS)

function OnboardingFlow({ userAccount }) {
  const [step, setStep] = useState(
    () => loadOnboardingStep(userAccount?.id, VALID_STEPS) || STEPS.INSTALL
  )

  useEffect(() => {
    saveOnboardingStep(userAccount?.id, step)
  }, [userAccount?.id, step])

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
