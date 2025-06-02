import HeaderLogo from "@/components/HeaderLogo";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#1c1f20] text-white">
      <HeaderLogo />
      <Hero />
    </main>
  );
}
