import Image from "next/image";

export default function HeaderLogo() {
  return (
    <div className="fixed top-4 right-6 z-50 w-[250px] h-[167px]">
      <div className="relative w-full h-full">
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
