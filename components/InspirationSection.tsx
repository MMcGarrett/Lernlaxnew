import React from "react";

export default function InspirationSection() {
  return (
    <>
      {/* Marker für Navbar */}
      <div id="section-5" className="h-48 -mt-48 invisible" />

      <section className="min-h-screen w-full bg-[#226c52] text-white px-6 md:px-20 py-12 flex flex-col">
        {/* Titel oben links */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-16">
          Inspiration – Weitere Möglichkeiten auf der Seite
        </h2>

        {/* Zentrierte Kacheln im Screen */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            {/* Mein Account */}
            <a
              href="/dashboard"
              className="bg-[#00c07c] w-60 h-60 rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center text-center hover:scale-105 transition-transform"
            >
              <p className="text-base font-semibold mb-4">Mein Account</p>
              <img
                src="/Avatare_M/Luca.png"
                alt="Mein Account"
                className="w-20 h-20 object-contain rounded-full"
              />
            </a>

            {/* Gefühlstracker */}
            <a
              href="/dashboard"
              className="bg-[#00c07c] w-60 h-60 rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center text-center hover:scale-105 transition-transform"
            >
              <p className="text-base font-semibold mb-4">Gefühlstracker</p>
              <img
                src="/tracker.png"
                alt="Gefühlstracker"
                className="w-20 h-20 object-contain"
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
