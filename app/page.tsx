'use client';

import { useEffect, useState } from "react";
import ScrollEffect from "@/components/ScrollEffect";
import HeaderLogo from "@/components/HeaderLogo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChallengesSection from "@/components/Challenges";
import ToolsResourcesSection from "@/components/ToolsResourcesSection";
import InspirationSection from "@/components/InspirationSection";
import WaySection from "@/components/WaySection";

import Footer from "@/components/Footer";
import ScrollFreeze from "@/components/ScrollDeck";

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
    <main className="relative min-h-screen text-white hide-scrollbar">
      <ScrollEffect>
        <HeaderLogo />
        {showNavbar && <Navbar />}

        <ScrollFreeze backgroundColor="#1B201F">
          <Hero />
        </ScrollFreeze>

        <ScrollFreeze backgroundColor="#2F403D">
          <ChallengesSection />
        </ScrollFreeze>

        <WaySection/>

        <ScrollFreeze backgroundColor="#275C53">
          <ToolsResourcesSection />
        </ScrollFreeze>

        <ScrollFreeze backgroundColor="#287056">
          <InspirationSection />
        </ScrollFreeze>
        
        <Footer />

      </ScrollEffect>
    </main>
  );
}
