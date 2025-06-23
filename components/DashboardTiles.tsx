'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function DashboardTiles({ avatarUrl }: { avatarUrl: string }) {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Accounteinstellungen */}
      <Link href="/dashboard/editAcc">
        <div className="cursor-pointer bg-emerald-500 rounded-3xl flex flex-col items-center justify-center text-center p-6 shadow-lg transition-transform hover:scale-105">
          <p className="text-lg font-medium mb-4">Accounteinstellungen</p>
          <Image src={avatarUrl} alt="Avatar" width={100} height={100} className="rounded-full object-cover" />
        </div>
      </Link>

      {/* Gefühlstracker */}
      <div className="bg-emerald-500 rounded-3xl flex flex-col items-center justify-center text-center p-6 shadow-lg">
        <p className="text-lg font-medium mb-4">Gefühlstracker</p>
        <Image src="/tracker.png" alt="Tracker" width={100} height={100} />
      </div>

      {/* Persönlicher Tipp */}
      <div className="bg-emerald-500 rounded-3xl flex flex-col items-center justify-center text-center p-6 shadow-lg">
        <p className="text-lg font-medium mb-4">Dein persönlicher Tipp</p>
        <Image src="/innovation.png" alt="Tipp" width={100} height={100} />
      </div>
    </div>
  )
}
