import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const host = request.headers.get('host')
  const protocol = host?.startsWith('localhost') ? 'http' : 'https'
  const redirectUrl = `${protocol}://${host}/login`

  const response = NextResponse.redirect(redirectUrl)

  response.cookies.set('session_user', '', {
    path: '/',
    maxAge: 0,
  })

  return response
}
