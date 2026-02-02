import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // 일단 모든 요청 통과 - Supabase 인증은 나중에 활성화
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
