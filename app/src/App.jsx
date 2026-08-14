// MagicBook 3.0 — App Root
//
// Task 1 範圍：只驗證專案骨架、共用 Layout、Supabase Authentication 基礎連接是否正常運作。
// 不包含 Home 畫面內容（Task 3）、Book Library（Task 4）等功能。

import { AuthProvider, useAuth } from './modules/auth/AuthContext'
import Layout from './shared/layout/Layout'
import './shared/layout/layout.css'

function ConnectionStatus() {
  const { session, loading } = useAuth()

  return (
    <div>
      <h1>MagicBook 3.0</h1>
      <p>Project Setup（Task 1）基礎骨架</p>
      <p>
        Supabase Auth 狀態：
        {loading ? ' 檢查中…' : session ? ' 已登入' : ' 未登入（尚未建立登入畫面，屬 Task 2/3 範圍）'}
      </p>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Layout>
        <ConnectionStatus />
      </Layout>
    </AuthProvider>
  )
}

export default App
