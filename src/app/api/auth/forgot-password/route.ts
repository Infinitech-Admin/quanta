import { NextRequest, NextResponse } from 'next/server'
import { getApiUrl } from '@/lib/api-url'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(
      `${getApiUrl()}/api/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email: body.email }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}