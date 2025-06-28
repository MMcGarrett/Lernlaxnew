'use client'

import Link from 'next/link'

export default function RetakeQuizButton() {
  return (
    <div className="mt-6">
      <Link href="/#deinWeg">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition">
          Quiz erneut starten
        </button>
      </Link>
    </div>
  );
}
