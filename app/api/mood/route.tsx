import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

function getGermanMidnightDate(): Date {
  const now = new Date()
  const germanDateString = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)

  const [day, month, year] = germanDateString.split('.')
  const localMidnight = new Date(`${year}-${month}-${day}T00:00:00`)
  const timezoneOffset = localMidnight.getTimezoneOffset()
  const utcMidnight = new Date(localMidnight.getTime() - timezoneOffset * 60 * 1000)

  return utcMidnight
}

export async function POST(req: Request) {
  const { rating, note } = await req.json()
  const cookieStore = await cookies()
  const session = cookieStore.get('session_user')

  if (!session) {
    return NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 })
  }

  let userId: number
  try {
    const parsed = JSON.parse(session.value)
    userId = parsed.id
  } catch (err) {
    return NextResponse.json({ error: 'Session ungültig' }, { status: 400 })
  }

  const today = getGermanMidnightDate()

  const existing = await prisma.moodEntry.findFirst({
    where: {
      user_id: userId,
      date: today,
    },
  })

  if (existing) {
    return NextResponse.json(
      { error: 'Du hast heute schon eine Stimmung eingetragen.' },
      { status: 400 }
    )
  }

  const entry = await prisma.moodEntry.create({
    data: {
      user_id: userId,
      rating,
      note: note || null,
      date: today,
    },
  })

  return NextResponse.json(entry)
}

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session_user')

  if (!session) {
    return NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 })
  }

  let userId: number
  try {
    const parsed = JSON.parse(session.value)
    userId = parsed.id
  } catch (err) {
    return NextResponse.json({ error: 'Session ungültig' }, { status: 400 })
  }

  const moods = await prisma.moodEntry.findMany({
    where: { user_id: userId },
    orderBy: { date: 'desc' },
    take: 30,
  })

  return NextResponse.json(moods)
}
