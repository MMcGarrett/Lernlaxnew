'use client';

import Image from 'next/image';
import BlurText from '../assets/BlurTest';
import SplitText from '../assets/SplitText';

export default function Hero() {
  return (
    <section id='section-1' className="flex flex-col justify-center px-6 sm:px-16 pt-2 sm:pt-4 md:pt-6 pb-10 relative min-h-screen text-white">
      <BlurText
        text="Bekommst du Studium und Job auch nicht unter einen Hut?"
        delay={80}
        animateBy="words"
        direction="top"
        className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-2xl leading-snug text-left"
      />

      {/* Neuer Content aus Start-Komponente */}
      <div className="mt-12 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl w-full">
        {/* Textfeld */}
        <div className="flex-1 text-left pl-[100px]">
            <SplitText
              text="Manchmal merken wir erst spät, wie viel wir tragen. Hier erfährst du, warum es so wichtig ist, jetzt bewusst innezuhalten."
              className="text-lg leading-relaxed max-w-md"
              delay={50}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: -40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
        </div>

        {/* Bildfeld */}
        <div className="flex-1 flex justify-center">
          <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <Image
              src="/sunrise.png"
              alt="Sonnenaufgang"
              width={600}
              height={400}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
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
