'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { useSignup, useLogin } from '@/features/auth'
import { signupSchema, type SignupFormData } from '@/lib/utils/validators'
import { cn } from '@/lib/utils/cn'

export function SignupForm() {
  const { signup, isLoading, error } = useSignup()
  const { loginWithKakao, isLoading: isKakaoLoading } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      marketingAgreed: false,
    },
  })

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup({
        email: data.email,
        password: data.password,
        name: data.name,
        marketingAgreed: data.marketingAgreed,
      })
    } catch {
      // 에러는 useSignup에서 처리됨
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
        <p className="mt-2 text-gray-600">
          센스 있는 선물 큐레이터에 오신 것을 환영합니다
        </p>
      </div>

      <Button
        type="button"
        variant="kakao"
        fullWidth
        onClick={loginWithKakao}
        isLoading={isKakaoLoading}
      >
        <svg
          className="mr-2 h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.058 5.892-.178.664-.644 2.406-.738 2.783-.116.464.17.457.356.333.146-.097 2.325-1.576 3.267-2.211.35.049.706.075 1.067.075 5.523 0 10-3.477 10-7.872C20 6.477 17.523 3 12 3z" />
        </svg>
        카카오로 시작하기
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">또는 이메일로 가입</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="비밀번호"
          type="password"
          placeholder="8자 이상, 영문+숫자"
          error={errors.password?.message}
          {...register('password')}
        />

        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Input
          label="이름"
          type="text"
          placeholder="이름을 입력하세요"
          error={errors.name?.message}
          {...register('name')}
        />

        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className={cn(
                'mt-0.5 h-5 w-5 rounded border-gray-300 text-black focus:ring-black',
                errors.termsAgreed && 'border-red-500'
              )}
              {...register('termsAgreed')}
            />
            <span className="text-sm text-gray-700">
              <span className="text-red-500">*</span>{' '}
              <Link href="/terms" className="underline">
                이용약관
              </Link>
              에 동의합니다
            </span>
          </label>
          {errors.termsAgreed && (
            <p className="text-sm text-red-500 ml-8">{errors.termsAgreed.message}</p>
          )}

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className={cn(
                'mt-0.5 h-5 w-5 rounded border-gray-300 text-black focus:ring-black',
                errors.privacyAgreed && 'border-red-500'
              )}
              {...register('privacyAgreed')}
            />
            <span className="text-sm text-gray-700">
              <span className="text-red-500">*</span>{' '}
              <Link href="/privacy" className="underline">
                개인정보 처리방침
              </Link>
              에 동의합니다
            </span>
          </label>
          {errors.privacyAgreed && (
            <p className="text-sm text-red-500 ml-8">{errors.privacyAgreed.message}</p>
          )}

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-0.5 h-5 w-5 rounded border-gray-300 text-black focus:ring-black"
              {...register('marketingAgreed')}
            />
            <span className="text-sm text-gray-700">
              마케팅 정보 수신에 동의합니다 (선택)
            </span>
          </label>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          가입하기
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-600">이미 계정이 있으신가요? </span>
        <Link
          href="/login"
          className="font-medium text-black hover:underline"
        >
          로그인
        </Link>
      </div>
    </div>
  )
}
