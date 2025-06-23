'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import HeaderLogo from '@/components/HeaderLogo'
import Footer from '@/components/Footer'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  // Weiterleitung, wenn bereits eingeloggt
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch('/api/session', { credentials: 'include' })
        const data = await res.json()
        if (data.authenticated) {
          router.push('/dashboard')
        }
      } catch (err) {
        console.error('Fehler beim Session-Check:', err)
      }
    }

    checkLogin()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const result = await res.json()

    if (!res.ok) {
      alert(result.error || 'Login fehlgeschlagen')
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-[#1b2c29] text-white">
      {/* Logo oben rechts */}
      <div className="absolute top-[60px] right-[60px] z-50">
        <HeaderLogo />
      </div>

      {/* Überschrift oben links */}
      <h1 className="absolute top-[30px] left-[60px] z-50 text-2xl sm:text-3xl md:text-4xl font-bold leading-none tracking-wide text-left">Login</h1>

      <main className="flex-grow flex justify-center items-center px-4">
        <div className="grid grid-cols-1 sm:grid-cols-[auto_auto_auto] items-center gap-8 w-full max-w-6xl">
          {/* Linkes Bild */}
          <div className="hidden sm:flex items-center justify-center">
            <div className="h-[420px] w-[280px] overflow-hidden rounded-2xl relative">
              <Image
                src="/maennlich.png"
                alt="Junge"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Login-Box */}
          <div className="bg-[#14313d] h-[420px] p-10 rounded-2xl w-full max-w-lg shadow-lg flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-base">E-Mail oder Benutzername</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded mt-1 text-black bg-white text-base"
                  required
                />
              </div>

              <div>
                <label className="text-base">Passwort</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded mt-1 text-black bg-white text-base"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 mt-2 rounded-full font-bold text-lg"
              >
                Login
              </button>

              <p className="text-sm text-right mt-2">
                Noch keinen Account?{' '}
                <a href="/register" className="underline">Dann registriere dich hier!</a>
              </p>
            </form>
          </div>

          {/* Rechtes Bild */}
          <div className="hidden sm:flex items-center justify-center">
            <div className="h-[420px] w-[280px] overflow-hidden rounded-2xl relative">
              <Image
                src="/weiblich.png"
                alt="Mädchen"
                fill
                className="object-contain scale-x-[-1]"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
