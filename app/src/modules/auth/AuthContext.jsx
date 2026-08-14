// MagicBook 3.0 — Auth Context（基礎設定）
//
// Task 1 範圍：只提供 Session 狀態的基礎共用機制，供後續 Task（尤其 Task 2）擴充。
// 不在此建立 User Account 資料、Access Status、Trial Used（依 11_MVP_Task_List.md Task 2 範圍）。

import { createContext, useContext, useEffect, useState } from 'react'
import { getSession, onAuthStateChange } from './authService'

const AuthContext = createContext({
  session: null,
  loading: true,
})

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

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

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
