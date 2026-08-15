// MagicBook 3.0 — Auth Context
//
// 依 06_API_Design.md v2.0 §3.4 GET /auth/session：
// 系統至少需要知道 User Identity、Access Status、Trial Used。
//
// 這裡把 Session（Supabase Auth）與 User Account 資料（Access Status /
// Trial Used，來自 public.user_accounts）合併成單一 Auth 狀態，
// 供整個 App 使用。

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getSession, onAuthStateChange } from './authService'
import { getMyUserAccount } from './userAccountService'

const AuthContext = createContext({
  session: null,
  userAccount: null,
  loading: true,
  accountLoading: false,
  refreshUserAccount: async () => {},
})

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [userAccount, setUserAccount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [accountLoading, setAccountLoading] = useState(false)

  const loadUserAccount = useCallback(async () => {
    setAccountLoading(true)
    try {
      const account = await getMyUserAccount()
      setUserAccount(account)
    } catch {
      // 尚未有對應 User Account（例如剛完成驗證、資料庫 trigger 尚未同步）
      // 或未登入時，維持 null，不視為致命錯誤。
      setUserAccount(null)
    } finally {
      setAccountLoading(false)
    }
  }, [])

  useEffect(() => {
    let unsubscribe

    getSession()
      .then((s) => setSession(s))
      .catch(() => setSession(null))
      .finally(() => setLoading(false))

    unsubscribe = onAuthStateChange((s) => {
      setSession(s)
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (session) {
      loadUserAccount()
    } else {
      setUserAccount(null)
    }
  }, [session, loadUserAccount])

  return (
    <AuthContext.Provider
      value={{
        session,
        userAccount,
        loading,
        accountLoading,
        refreshUserAccount: loadUserAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

