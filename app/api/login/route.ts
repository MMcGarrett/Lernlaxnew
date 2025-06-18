import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: 'E-Mail oder Benutzername und Passwort erforderlich.' },
      { status: 400 }
    )
  }

  // Benutzer finden
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username: email },
      ],
    },
  })

  if (!user) {
    return NextResponse.json(
      { error: 'Benutzer nicht gefunden.' },
      { status: 401 }
    )
  }

  const isValid = await bcrypt.compare(password, user.password_hash)

  if (!isValid) {
    return NextResponse.json(
      { error: 'Falsches Passwort.' },
      { status: 401 }
    )
  }

  // ✅ Cookie mit userId + firstName
  const sessionData = {
    id: user.id,
    firstName: user.first_name,
  }

  const response = NextResponse.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  })

  response.cookies.set('session_user', JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 Tag
  })

  return response
}
