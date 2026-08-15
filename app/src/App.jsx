// MagicBook 3.0 — App Root
//
// Task 2 範圍：Email Verification / User Account / Login / Logout /
// Session / Access Status / Trial Used。
//
// 不包含 Home 完整頁面、Book Library、Book Editor（依 Task 2 指令九，
// 屬於後續 Task）。已登入且 Active 時，只顯示最基本的登入後狀態確認畫面。

import { AuthProvider, useAuth } from './modules/auth/AuthContext'
import LoginForm from './modules/auth/LoginForm'
import AccessGate from './modules/auth/AccessGate'
import { signOut } from './modules/auth/authService'
import Layout from './shared/layout/Layout'
import './shared/layout/layout.css'
import './modules/auth/auth.css'

function AuthenticatedPlaceholder({ userAccount }) {
  return (
    <div className="mb-access-gate">
      <h2>MagicBook 3.0</h2>
      <p>已登入：{userAccount?.email}</p>
      <p>Access Status：{userAccount?.access_status}</p>
      <p>Trial Used：{userAccount?.trial_used ? '是' : '否'}</p>
      <p>Home / Book Library 尚未建立，屬於後續 Task 範圍。</p>
      <button type="button" onClick={() => signOut()}>
        登出
      </button>
    </div>
  )
}

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

  return <AuthenticatedPlaceholder userAccount={userAccount} />
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
