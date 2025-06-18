'use client'

import { useEffect, useState } from 'react'

interface MoodEntry {
  id: number
  date: string
  rating: number
  note?: string | null
}

export default function MoodTracker({ firstName }: { firstName: string }) {
  const [moods, setMoods] = useState<MoodEntry[]>([])
  const [rating, setRating] = useState(5)
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [alreadySubmittedToday, setAlreadySubmittedToday] = useState(false)

  const getTodayISO = () => {
    const now = new Date()
    const germanDateString = new Intl.DateTimeFormat('de-DE', {
      timeZone: 'Europe/Berlin',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(now)

    const [day, month, year] = germanDateString.split('.')
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    fetch('/api/mood')
      .then((res) => res.json())
      .then((data: MoodEntry[]) => {
        setMoods(data || [])

        const todayISO = getTodayISO()
        const alreadyToday = data.some((m) => {
          const entryISO = m.date.split('T')[0]
          return entryISO === todayISO
        })

        setAlreadySubmittedToday(alreadyToday)
      })
  }, [submitted])

  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    date.setHours(0, 0, 0, 0)
    return {
      date,
      label:
        i === 29
          ? 'Heute'
          : date.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
            }),
      iso: date.toISOString().split('T')[0],
    }
  })

  const handleSubmit = async () => {
    const res = await fetch('/api/mood', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, note }),
    })

    const result = await res.json()
    if (res.ok) {
      setNote('')
      setRating(5)
      setError(null)
      setSubmitted(prev => !prev) // <- Trigger useEffect erneut
    } else {
      setError(result.error || 'Fehler beim Speichern')
    }
  }

  return (
    <div className="bg-[#4DB7FF] text-white p-6 rounded-[3rem] w-full">
      <h2 className="text-2xl font-bold mb-4">Gefühlstracker von {firstName}!</h2>

      <div className="overflow-x-auto mb-6">
        <div className="grid grid-cols-30 gap-[1px] bg-[#1B2C29] p-4 rounded-xl">
          {days.map((day) => {
            const mood = moods.find((m) => {
              const moodDate = new Date(m.date)
              const moodGerman = new Intl.DateTimeFormat('de-DE', {
                timeZone: 'Europe/Berlin',
              }).format(moodDate)

              const dayGerman = new Intl.DateTimeFormat('de-DE', {
                timeZone: 'Europe/Berlin',
              }).format(day.date)

              return moodGerman === dayGerman
            })

            let topOffset = 0
            if (mood) {
              const maxHeight = 100
              const scale = (10 - mood.rating) / 9
              topOffset = scale * maxHeight
            }

            return (
              <div
                key={day.iso}
                className="relative h-[150px] w-full flex flex-col items-center"
              >
                <span className="text-xs font-semibold absolute top-0">{day.label}</span>

                {mood && (
                  <div
                    title={mood.note || ''}
                    className="text-green-400 text-xl cursor-pointer absolute left-1/2 -translate-x-1/2"
                    style={{ top: `${topOffset + 20}px` }}
                  >
                    ★
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {!alreadySubmittedToday && (
        <>
          <label className="block mb-2 text-white font-semibold">
            Wie fühlst du dich heute {firstName}?
          </label>
          <div className="flex items-center gap-4">
            <span>1</span>
            <input
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="flex-1 appearance-none h-4 bg-gray-300 rounded-full outline-none"
            />
            <span>10</span>
          </div>

          <textarea
            placeholder="Optionaler Kommentar"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-4 w-full p-2 rounded bg-white text-black"
          />

          <button
            onClick={handleSubmit}
            className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-full"
          >
            Speichern
          </button>
        </>
      )}

      {error && <p className="text-red-200 mt-2">{error}</p>}
    </div>
  )
}
