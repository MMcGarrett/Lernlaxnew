import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session_user')

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 200 })
  }

  try {
    const user = JSON.parse(session.value)
    return NextResponse.json({ authenticated: true, user }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ authenticated: false }, { status: 200 })
  }
}
