'use client'

import { useState } from 'react'

type Props = {
  initialData: {
    username: string
    first_name: string
    last_name: string
    avatar_url: string
  }
  avatarOptions: string[]
}

export default function EditAccountForm({ initialData, avatarOptions }: Props) {
  const [form, setForm] = useState(initialData)
  const [showAvatars, setShowAvatars] = useState(false)
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })
  const [status, setStatus] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswords(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarSelect = (src: string) => {
    setForm(prev => ({ ...prev, avatar_url: src }))
    setShowAvatars(false)
  }

  const saveProfile = async () => {
    const res = await fetch('/api/account', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.username,
        firstname: form.first_name,
        lastname: form.last_name,
      }),
    })
    const data = await res.json()
    setStatus(res.ok ? 'Profil gespeichert' : `Fehler: ${data.error}`)
  }

  const saveAvatar = async () => {
    const res = await fetch('/api/account', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatar_url: form.avatar_url }),
    })
    const data = await res.json()
    setStatus(res.ok ? 'Avatar gespeichert' : `Fehler: ${data.error}`)
  }

  const handlePasswordSubmit = async () => {
    if (passwords.new.length < 6) {
      setStatus('Passwort muss mindestens 6 Zeichen haben.')
      return
    }
    if (passwords.new !== passwords.confirm) {
      setStatus('Passwörter stimmen nicht überein.')
      return
    }

    const res = await fetch('/api/account/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword: passwords.current,
        newPassword: passwords.new,
      }),
    })

    const data = await res.json()
    setStatus(res.ok ? 'Passwort geändert' : `Fehler: ${data.error}`)
    if (res.ok) {
      setPasswords({ current: '', new: '', confirm: '' })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Profilfelder */}
      <div className="space-y-4">
        <label className="block text-sm">Benutzername</label>
        <input name="username" value={form.username} onChange={handleChange} className="w-full p-2 rounded bg-gray-300 text-black" />
        <label className="block text-sm">Vorname</label>
        <input name="first_name" value={form.first_name} onChange={handleChange} className="w-full p-2 rounded bg-gray-300 text-black" />
        <label className="block text-sm">Nachname</label>
        <input name="last_name" value={form.last_name} onChange={handleChange} className="w-full p-2 rounded bg-gray-300 text-black" />
        <button onClick={saveProfile} type="button" className="bg-green-500 text-white px-6 py-2 rounded-full mt-4 w-full">
          Speichern
        </button>
      </div>

      {/* Avatarwahl */}
      <div className="flex flex-col items-center space-y-4">
        <label className="text-sm">Profilbild</label>
        <div className="relative w-40 h-40 rounded-2xl overflow-hidden cursor-pointer" onClick={() => setShowAvatars(!showAvatars)}>
          <img src={form.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center hover:bg-black/30 transition">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
        </div>

        {showAvatars && (
          <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-scroll p-2 bg-gray-800 rounded-xl w-full">
            {avatarOptions.map((src) => (
              <img
                key={src}
                src={src}
                alt="avatar"
                onClick={() => handleAvatarSelect(src)}
                className="h-20 w-full object-cover rounded cursor-pointer hover:ring-2 hover:ring-white"
              />
            ))}
          </div>
        )}

        <button onClick={saveAvatar} type="button" className="bg-green-500 text-white px-6 py-2 rounded-full w-full">
          Speichern
        </button>
      </div>

      {/* Passwort ändern */}
      <div className="space-y-4">
        <label className="text-sm">Aktuelles Passwort</label>
        <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} className="w-full p-2 rounded bg-gray-300 text-black" />
        <label className="text-sm">Neues Passwort</label>
        <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} className="w-full p-2 rounded bg-gray-300 text-black" />
        <label className="text-sm">Neues Passwort wiederholen</label>
        <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} className="w-full p-2 rounded bg-gray-300 text-black" />
        <button type="button" onClick={handlePasswordSubmit} className="bg-red-600 text-white px-6 py-2 rounded-full w-full">
          Ändern
        </button>
      </div>

      {status && (
        <div className="col-span-3 text-center text-yellow-300 mt-6">
          {status}
        </div>
      )}
    </div>
  )
}
