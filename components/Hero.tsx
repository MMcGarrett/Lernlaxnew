"use client";
import Image from "next/image";
import { useState } from "react";

const characters = [
  { key: "maenlich", label: "Männlich", src: "/maenlich.png" },
  { key: "divers", label: "Divers", src: "/divers.png" },
  { key: "weiblich", label: "Weiblich", src: "/weiblich.png", flipped: true },
];

export default function Hero() {
  const [selected, setSelected] = useState<string>("divers");


  return (
    <section className="flex flex-col justify-center px-6 sm:px-16 pt-2 sm:pt-4 md:pt-6 pb-10 relative min-h-screen text-white">
      {/* Headline */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-2xl leading-snug text-left">
        Bekommst du Studium und Job auch nicht unter einen Hut?
      </h1>

      {/* Charakter-Auswahl */}
      <div className="mt-12 flex flex-col items-center text-center w-full">
        <h2 className="text-lg sm:text-xl font-medium">Wähle deinen Charakter</h2>

        <div className="mt-6 flex flex-wrap justify-center gap-6 max-w-5xl">
          {characters.map((char) => {
            const isSelected = selected === char.key;
            return (
              <div
                key={char.key}
                onClick={() => setSelected(char.key)}
                className={`cursor-pointer relative rounded-2xl overflow-hidden transition-opacity duration-300 ${
                  selected && !isSelected ? "opacity-40" : "opacity-100"
                }`}
              >
                <Image
                  src={char.src}
                  alt={char.label}
                  width={256}
                  height={384}
                  className={`rounded-2xl ${
                    char.flipped ? "transform -scale-x-100" : ""
                  }`}
                />
                {/* Band */}
                <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-black/60 text-white text-center py-1.5 text-sm font-semibold tracking-wide rounded-b-2xl">
                    {char.label}
                </div>

                {/* Border bei Auswahl */}
                {isSelected && (
                  <div className="absolute inset-0 border-4 border-white rounded-2xl pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll-Hinweis */}
      <div className="mt-12 flex flex-col items-center text-center w-full">
        <p className="text-base sm:text-lg">Scrolle um deine Reise zu beginnen</p>
        <div className="mt-4 animate-bounce">
          <Image
            src="/arrow_down.png"
            alt="Pfeil"
            width={96}
            height={96}
            className="w-16 sm:w-24"
          />
        </div>
      </div>

      {/* Login unten rechts */}
      <div className="absolute bottom-4 right-4 text-sm text-right">
        <p className="mb-1">Du warst schon mal da?</p>
        <a
          href="/login"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-full"
        >
          Login
        </a>
      </div>
    </section>
  );
}
