'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi, type SignUpData } from '../api/authApi'

export function useSignup() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [needsEmailConfirm, setNeedsEmailConfirm] = useState(false)

  const signup = async (data: SignUpData) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authApi.signUp(data)

      if (result.user && !result.session) {
        setNeedsEmailConfirm(true)
      } else {
        router.push('/')
        router.refresh()
      }

      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : '회원가입에 실패했습니다.'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    signup,
    isLoading,
    error,
    needsEmailConfirm,
    clearError: () => setError(null),
  }
}
