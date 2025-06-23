import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  const sessionRaw = (await cookies()).get('session_user')?.value
  if (!sessionRaw) {
    return NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 })
  }

  let userId: number
  try {
    const session = JSON.parse(sessionRaw)
    userId = session.id
  } catch {
    return NextResponse.json({ error: 'Ungültige Sitzung' }, { status: 400 })
  }

  const body = await req.json()
  const currentPassword = body.currentPassword
  const newPassword = body.newPassword

  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: 'Ungültige Eingaben' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    return NextResponse.json({ error: 'Benutzer nicht gefunden' }, { status: 404 })
  }

  const isValid = await bcrypt.compare(currentPassword, user.password_hash)
  if (!isValid) {
    return NextResponse.json({ error: 'Aktuelles Passwort ist falsch' }, { status: 401 })
  }

  const password_hash = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { id: userId },
    data: { password_hash },
  })

  return NextResponse.json({ success: true })
}
