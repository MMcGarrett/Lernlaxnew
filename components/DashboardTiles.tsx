'use client'

import Image from 'next/image'

export default function DashboardTiles() {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-emerald-500 rounded-3xl flex flex-col items-center justify-center text-center p-6 shadow-lg">
        <p className="text-lg font-medium mb-4">Accounteinstellungen</p>
        <Image src="/Avatare_M/Luca.png" alt="Avatar" width={100} height={100} className="rounded-full" />
      </div>

      <div className="bg-emerald-500 rounded-3xl flex flex-col items-center justify-center text-center p-6 shadow-lg">
        <p className="text-lg font-medium mb-4">Gefühlstracker</p>
        <Image src="/tracker.png" alt="Tracker" width={100} height={100} />
      </div>

      <div className="bg-emerald-500 rounded-3xl flex flex-col items-center justify-center text-center p-6 shadow-lg">
        <p className="text-lg font-medium mb-4">Dein persönlicher Tipp</p>
        <Image src="/innovation.png" alt="Tipp" width={100} height={100} />
      </div>
    </div>
  )
}
