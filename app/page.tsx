'use client';

import { useEffect, useState } from "react";
import ScrollEffect from "@/components/ScrollEffect";
import HeaderLogo from "@/components/HeaderLogo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChallengesSection from "@/components/Challenges";
import CharacterSelection from "@/components/CharacterSelection";
import SectionModule from "@/components/SectionModule";
import ToolsResourcesSection from "@/components/ToolsResourcesSection";
import InspirationSection from "@/components/InspirationSection";
import WaySection from "@/components/WaySection";

import Footer from "@/components/Footer";
import ScrollSection from "@/components/ScrollDeck";

export default function HomePage() {
  const [showNavbar, setShowNavbar] = useState(false);

  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  useEffect(() => {
    const heroEl = document.getElementById("section-1");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNavbar(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);



  return (
    <main className="relative min-h-screen bg-[#1c1f20] text-white">
      <ScrollEffect>
        <HeaderLogo />
        {showNavbar && <Navbar />}
        <ScrollSection>
          <Hero />
        </ScrollSection>
        <ScrollSection>
          <ChallengesSection />
        </ScrollSection>
          <WaySection
            selectedCharacter={selectedCharacter}
            onCharacterSelect={(name) => setSelectedCharacter(name)}
          />
          <ToolsResourcesSection />
          <InspirationSection />
        <Footer />
      </ScrollEffect>
    </main>
  );
}
