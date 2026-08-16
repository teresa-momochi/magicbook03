// MagicBook 3.0 — App Root
//
// Task 2 範圍：Email Verification / User Account / Login / Logout /
// Session / Access Status / Trial Used（不在本次 Task 3 變動）。
//
// Task 3 範圍：登入且 Active 後，進入入口體驗流程（OnboardingFlow）：
// InstallPrompt → WelcomeScene → MagicBookIntro → 體驗 / 購買方案。
//
// Task 4 範圍：「體驗」導向正式 Book Library（modules/library），
// Book Editor 實際內容／Billing 仍屬於後續 Task（Editor/Reading Mode
// 目前為 Placeholder，見 modules/editor、modules/reading）。

import { AuthProvider, useAuth } from './modules/auth/AuthContext'
import LoginForm from './modules/auth/LoginForm'
import AccessGate from './modules/auth/AccessGate'
import OnboardingFlow from './modules/onboarding/OnboardingFlow'
import Layout from './shared/layout/Layout'
import './shared/layout/layout.css'
import './modules/auth/auth.css'
import './modules/onboarding/onboarding.css'
import './modules/library/library.css'

function AppContent() {
  const { session, userAccount, loading, accountLoading } = useAuth()

  if (loading) {
    return <p>檢查登入狀態中…</p>
  }

  if (!session) {
    return <LoginForm />
  }

  if (accountLoading || !userAccount) {
    return <p>載入使用者資料中…</p>
  }

  if (userAccount.access_status === 'Inactive') {
    return <AccessGate />
  }

  return <OnboardingFlow userAccount={userAccount} />
}

function App() {
  return (
    <AuthProvider>
      <Layout>
        <AppContent />
      </Layout>
    </AuthProvider>
  )
}

export default App
