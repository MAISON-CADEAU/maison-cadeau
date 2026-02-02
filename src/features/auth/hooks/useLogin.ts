'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi, type LoginData } from '../api/authApi'

export function useLogin() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (data: LoginData) => {
    setIsLoading(true)
    setError(null)

    try {
      await authApi.login(data)
      router.push('/')
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : '로그인에 실패했습니다.'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithKakao = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await authApi.loginWithKakao()
    } catch (err) {
      const message = err instanceof Error ? err.message : '카카오 로그인에 실패했습니다.'
      setError(message)
      setIsLoading(false)
      throw err
    }
  }

  return {
    login,
    loginWithKakao,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
