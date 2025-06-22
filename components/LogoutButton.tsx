'use client'

export default function LogoutButton() {
  return (
    <button
      onClick={() => (window.location.href = '/api/logout')}
      className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full shadow-lg transition-all"
    >
      Logout
    </button>
  )
}
