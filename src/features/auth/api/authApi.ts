import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export interface SignUpData {
  email: string
  password: string
  name: string
  marketingAgreed?: boolean
}

export interface LoginData {
  email: string
  password: string
}

export const authApi = {
  // 이메일 회원가입
  async signUp({ email, password, name, marketingAgreed = false }: SignUpData) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          marketing_agreed: marketingAgreed,
        },
      },
    })

    if (error) throw error
    return data
  },

  // 이메일 로그인
  async login({ email, password }: LoginData) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  // 카카오 로그인
  async loginWithKakao() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) throw error
    return data
  },

  // 로그아웃
  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // 현재 사용자 조회
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // 세션 조회
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  },

  // 비밀번호 재설정 이메일 발송
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) throw error
    return data
  },

  // 비밀번호 업데이트
  async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error
    return data
  },

  // 사용자 정보 업데이트
  async updateProfile(updates: { name?: string; avatar_url?: string }) {
    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    })

    if (error) throw error
    return data
  },
}
