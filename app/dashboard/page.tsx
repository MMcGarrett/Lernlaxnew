import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import HeaderLogo from '@/components/HeaderLogo'
import Footer from '@/components/Footer'
import Image from 'next/image'
import DashboardTiles from '@/components/DashboardTiles'
import MoodTracker from '@/components/MoodTracker'

export default async function DashboardPage() {
  const cookieStore = cookies()
  const sessionRaw = (await cookieStore).get('session_user')?.value

  if (!sessionRaw) {
    redirect('/login')
  }

  let user: { id: number; firstName: string }

  try {
    user = JSON.parse(sessionRaw)
    if (!user?.id || !user?.firstName) throw new Error()
  } catch {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1b2c29] text-white relative px-6 pt-8 pb-24">
      {/* Logo oben rechts */}
      <div className="absolute top-8 right-8 z-50">
        <HeaderLogo />
      </div>

      <main className="w-full max-w-7xl mx-auto">
        {/* Begrüßung */}
        <h2 className="text-xl font-semibold">Mein Account – Dashboard</h2>
        <h1 className="text-2xl font-bold mt-4">
          Hallo {user.firstName}, viel Spaß heute im Dashboard!
        </h1>

        <DashboardTiles />
        <div className="h-16" /> {/* 2rem Platz */}
        <MoodTracker firstName={user.firstName} />

        {/* Tipp-Bereich */}
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
    </div>
  )
}
