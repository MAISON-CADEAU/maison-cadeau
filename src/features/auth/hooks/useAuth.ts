'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '../stores/authStore'

export function useAuth() {
  const { user, isLoading, setUser, setLoading, clear } = useAuthStore()
  const supabase = createClient()

  useEffect(() => {
    // 초기 사용자 정보 가져오기
    const getInitialUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch {
        setUser(null)
      }
    }

    getInitialUser()

    // 인증 상태 변경 구독
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setUser(session?.user ?? null)
        } else if (event === 'SIGNED_OUT') {
          clear()
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, setUser, setLoading, clear])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  }
}
