import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import HeaderLogo from '@/components/HeaderLogo'
import Footer from '@/components/Footer'
import DashboardTiles from '@/components/DashboardTiles'
import MoodTracker from '@/components/MoodTracker'
import LogoutButton from '@/components/LogoutButton'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const sessionRaw = cookieStore.get('session_user')?.value

  if (!sessionRaw) {
    redirect('/login')
  }

  let sessionUser: { id: number }
  try {
    sessionUser = JSON.parse(sessionRaw)
    if (!sessionUser?.id) throw new Error()
  } catch {
    redirect('/login')
  }

  //Benutzer live aus der Datenbank holen
  const dbUser = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      first_name: true,
      avatar_url: true,
    },
  })

  if (!dbUser) redirect('/login')

  const avatarUrl = `/${(dbUser.avatar_url || 'Avatare_M/Luca.png').replace(/^\/+/, '')}`

  return (
    <div className="min-h-screen flex flex-col bg-[#1b2c29] text-white relative px-6 pt-8 pb-24">
      {/* Logo oben rechts */}
      <div className="absolute top-8 right-8 z-50">
        <HeaderLogo />
      </div>

      <main className="w-full max-w-7xl mx-auto">
        {/* <h2 className="text-xl font-semibold">Mein Account – Dashboard</h2> */}
        <h1 className="text-3xl font-bold mb-12">Mein Account – Dashboard</h1>
        <h2 className="text-2xl font-bold mt-4">
          Hallo {dbUser.first_name}, viel Spaß heute im Dashboard!
        </h2>

        <DashboardTiles avatarUrl={avatarUrl} />
        <div className="h-16" />
        <MoodTracker firstName={dbUser.first_name} />

        <section className="mt-16">
          <h3 className="text-lg font-bold mb-4">Dein persönlicher Tipp!</h3>
          <div className="text-sm space-y-4 text-gray-100">
            <p>Mit 6 bis 8 Stunden Schlaf pro Nacht liegst du im empfohlenen Bereich für Erwachsene...</p>
            <p>Mit fünf Händen voll Gemüse täglich liegst du im empfohlenen Bereich...</p>
            <p>Mit einer mittelmäßigen Organisation meisterst du viele Herausforderungen...</p>
            <p>Mit ein bis vier Trainingseinheiten pro Woche bist du auf einem guten Weg...</p>
          </div>
        </section>
      </main>

      <div className="mt-auto">
        <Footer />
      </div>

      {/* Schwebender Logout-Button */}
      <LogoutButton />
    </div>
  )
}
