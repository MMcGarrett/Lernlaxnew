import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function PUT(req: Request) {
  const cookieStore = await cookies()
  const sessionRaw = cookieStore.get('session_user')?.value

  if (!sessionRaw) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  }

  let userId: number
  try {
    const session = JSON.parse(sessionRaw)
    userId = session.id
  } catch {
    return NextResponse.json({ error: 'Ungültige Sitzung' }, { status: 401 })
  }

  const body = await req.json()
  const { username, firstname, lastname, avatar_url } = body

  // Nur Avatar ändern
  if (typeof avatar_url === 'string' && !username && !firstname && !lastname) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { avatar_url },
      })
      return NextResponse.json({ success: true, updated: 'avatar' })
    } catch {
      return NextResponse.json({ error: 'Avatar konnte nicht aktualisiert werden.' }, { status: 500 })
    }
  }

  // Nur Profil ändern
  if (
    typeof username === 'string' &&
    typeof firstname === 'string' &&
    typeof lastname === 'string' &&
    !avatar_url
  ) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          username,
          first_name: firstname,
          last_name: lastname,
        },
      })
      return NextResponse.json({ success: true, updated: 'profile' })
    } catch {
      return NextResponse.json({ error: 'Profil konnte nicht aktualisiert werden.' }, { status: 500 })
    }
  }

  return NextResponse.json(
    { error: 'Ungültige oder unvollständige Felder.' },
    { status: 400 }
  )
}
