import Image from "next/image";

export default function Challenges() {
  return (
    <section className="min-h-screen bg-[#1B2221] text-white py-16 pr-20 flex flex-col gap-12">
      
      {/* Headline: linksbündig, 60px vom linken Rand */}
      <div className="max-w-7xl w-full pl-[60px]">
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight text-left">
          Dein erster Schritt zu mehr Balance
        </h1>
      </div>

      {/* Inhalt: Text + Bild */}
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Textfeld: mindestens 100px vom linken Rand */}
        <div className="flex-1 text-left pl-[100px]">
          <p className="text-lg leading-relaxed max-w-md">
            Manchmal merken wir erst spät, wie viel wir tragen. Hier erfährst du,<br />
            warum es so wichtig ist, jetzt bewusst innezuhalten.
          </p>
        </div>

        {/* Bildfeld: rechts */}
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
    </section>
  );
}
