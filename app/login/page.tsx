'use client'

import Image from 'next/image'
import { useState } from 'react'
import HeaderLogo from '@/components/HeaderLogo'
import Footer from '@/components/Footer'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Login-Logik
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1b2c29] text-white">
        <div className="absolute top-4 right-4 z-50">
            <HeaderLogo />
        </div>

      <main className="flex-grow flex justify-center items-center px-4">
        <div className="grid grid-cols-1 sm:grid-cols-[auto_auto_auto] items-center gap-8 w-full max-w-6xl">
          
          {/* Linkes Bild */}
          <div className="hidden sm:flex items-center justify-center">
            <div className="h-[420px] w-[280px] overflow-hidden rounded-2xl bg-white relative">
                <Image
                    src="/maennlich.png"
                    alt="Junge"
                    fill
                    className="object-contain"
                />
            </div>
          </div>

          {/* Login-Box mit fester Höhe */}
          <div className="bg-[#14313d] h-[420px] p-10 rounded-2xl w-full max-w-lg shadow-lg flex flex-col justify-center">
            <h1 className="text-3xl font-semibold text-center mb-8">Login</h1>
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
                className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 mt-4 rounded-full font-bold text-lg"
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
            <div className="h-[420px] w-[280px] overflow-hidden rounded-2xl bg-white relative">
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

      {/* Footer */}
      <Footer />
    </div>
  )
}
