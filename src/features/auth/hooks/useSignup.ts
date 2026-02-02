'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi, type SignUpData } from '../api/authApi'

export function useSignup() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signup = async (data: SignUpData) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authApi.signUp(data)

      // 이메일 확인이 필요한 경우
      if (result.user && !result.session) {
        router.push('/login?message=이메일을 확인해주세요.')
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
    clearError: () => setError(null),
  }
}
