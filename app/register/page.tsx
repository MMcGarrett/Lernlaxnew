'use client'

import Image from 'next/image'
import { useState } from 'react'
import HeaderLogo from '@/components/HeaderLogo'
import Footer from '@/components/Footer'

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Registrierung absenden
    console.log(form)
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-[#1b2c29] text-white">
      {/* Logo oben rechts – 60px Abstand */}
      <div className="absolute top-[60px] right-[60px] z-50">
        <HeaderLogo />
      </div>

      {/* Überschrift oben links – 60px Abstand */}
      <h1 className="absolute top-[30px] left-[60px] z-50 text-2xl sm:text-3xl md:text-4xl font-bold leading-none tracking-wide text-left">
        Registrieren
      </h1>

      <main className="flex-grow flex justify-center items-center px-4">
        <div className="grid grid-cols-1 sm:grid-cols-[auto_auto_auto] items-center gap-8 w-full max-w-6xl">

          {/* Linkes Bild */}
          <div className="hidden sm:flex items-center justify-center">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/maennlich.png"
                alt="Junge"
                width={280}
                height={500}
                className="object-contain rounded-2xl"
              />
            </div>
          </div>

          {/* Register-Box */}
          <div className="bg-[#14313d] h-[500px] p-10 rounded-2xl w-full max-w-lg shadow-lg flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                name="email"
                placeholder="E-Mail"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded text-black bg-white"
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Benutzername"
                value={form.username}
                onChange={handleChange}
                className="w-full p-3 rounded text-black bg-white"
                required
              />
              <input
                type="text"
                name="firstname"
                placeholder="Vorname"
                value={form.firstname}
                onChange={handleChange}
                className="w-full p-3 rounded text-black bg-white"
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Nachname"
                value={form.lastname}
                onChange={handleChange}
                className="w-full p-3 rounded text-black bg-white"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Passwort"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 rounded text-black bg-white"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Passwort wiederholen"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded text-black bg-white"
                required
              />

              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 mt-2 rounded-full font-bold text-lg"
              >
                Registrieren
              </button>

              <p className="text-sm text-right mt-2">
                Du hast bereits einen Account?{' '}
                <a href="/login" className="underline">Dann logge dich hier ein!</a>
              </p>
            </form>
          </div>

          {/* Rechtes Bild */}
          <div className="hidden sm:flex items-center justify-center">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/weiblich.png"
                alt="Mädchen"
                width={280}
                height={500}
                className="object-contain rounded-2xl scale-x-[-1]"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
