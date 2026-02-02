'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '@/features/auth'
import { loginSchema, type LoginFormData } from '@/lib/utils/validators'
import { cn } from '@/lib/utils/cn'

export function LoginForm() {
  const { login, loginWithKakao, isLoading, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data)
    } catch {
      // 에러는 useLogin에서 처리됨
    }
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-wide">LOGIN</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            type="email"
            placeholder="메일"
            className={cn(
              'w-full px-4 py-3 border rounded-md text-sm',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-1 focus:ring-black focus:border-black',
              errors.email ? 'border-red-500' : 'border-gray-300'
            )}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="비밀번호"
            className={cn(
              'w-full px-4 py-3 border rounded-md text-sm',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-1 focus:ring-black focus:border-black',
              errors.password ? 'border-red-500' : 'border-gray-300'
            )}
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'w-full py-3 bg-black text-white text-sm font-medium rounded-md',
            'hover:bg-gray-800 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {isLoading ? '로그인 중...' : '로그인하기'}
        </button>
      </form>

      <button
        type="button"
        onClick={loginWithKakao}
        disabled={isLoading}
        className={cn(
          'w-full py-3 bg-[#FEE500] text-black text-sm font-medium rounded-md',
          'hover:bg-[#FDD835] transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'flex items-center justify-center gap-2'
        )}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.058 5.892-.178.664-.644 2.406-.738 2.783-.116.464.17.457.356.333.146-.097 2.325-1.576 3.267-2.211.35.049.706.075 1.067.075 5.523 0 10-3.477 10-7.872C20 6.477 17.523 3 12 3z" />
        </svg>
        카카오 로그인
      </button>
    </div>
  )
}
