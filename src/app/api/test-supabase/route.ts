import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()

    // 간단한 연결 테스트
    const { data, error } = await supabase
      .from('gifts')
      .select('id')
      .limit(1)

    if (error) {
      return NextResponse.json({
        success: false,
        message: 'Supabase 연결 실패',
        error: error.message,
        code: error.code
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase 연결 성공!',
      data: data
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '예상치 못한 오류 발생',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
