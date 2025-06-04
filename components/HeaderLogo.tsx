import Image from "next/image";

export default function HeaderLogo() {
  return (
    <div className="fixed top-4 right-6 z-50 w-[245px] h-[77px] pointer-events-none">
      <div className="absolute inset-0 backdrop-blur-sm" />
      <div className="relative w-full h-full pointer-events-auto">
        <Image
          src="/logo.png"
          alt="Lernlax Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
