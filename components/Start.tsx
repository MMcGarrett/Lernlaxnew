import Image from "next/image";

export default function Start() {
  return (
    <section
      id="section-1"
      className="min-h-screen bg-[#1B2221] text-white py-16 pr-20 flex flex-col gap-12"
    >
      <div className="max-w-7xl w-full pl-[60px]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-left">
          Dein erster Schritt zu mehr Balance
        </h1>
      </div>
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-left pl-[100px]">
          <p className="text-lg leading-relaxed max-w-md">
            Manchmal merken wir erst spät, wie viel wir tragen. Hier erfährst du,<br />
            warum es so wichtig ist, jetzt bewusst innezuhalten.
          </p>
        </div>
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
