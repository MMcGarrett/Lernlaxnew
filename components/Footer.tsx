import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="w-full py-4 px-6 flex flex-col sm:flex-row justify-between items-center font-light text-lg">
      {/* Logo links */}
      <div className="mb-4 sm:mb-0 sm:w-1/3 flex justify-start">
        <div className="max-w-[150px] w-full">
          <Image
            src="/logo.png"
            alt="LERNLAX Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Navigation mittig */}
      <nav className="mb-4 sm:mb-0 sm:w-1/3 flex justify-center gap-6 text-white flex-wrap text-center">
        <a href="#top" className="hover:underline">Zurück zum Anfang</a>
        <a href="/dashboard" className="hover:underline">Mein Account</a>
        <a href="/impressum" className="hover:underline">Impressum</a>
      </nav>

      {/* Rechte Spalte leer (für Symmetrie oder zukünftige Inhalte) */}
      <div className="hidden sm:block sm:w-1/3" />
    </footer>
  )
}
