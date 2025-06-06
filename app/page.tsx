'use client';

import { useEffect, useState } from "react";
import ScrollEffect from "@/components/ScrollEffect";
import HeaderLogo from "@/components/HeaderLogo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChallengesSection from "@/components/Challanges";
import CharacterSelection from "@/components/CharacterSelection";

import Footer from "@/components/Footer";

export default function HomePage() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNavbar(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    const startSection = document.getElementById("challenges");
    if (startSection) observer.observe(startSection);

    return () => {
      if (startSection) observer.unobserve(startSection);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#1c1f20] text-white">
      <ScrollEffect>
        <HeaderLogo />
        {showNavbar && <Navbar />}
        <Hero />
        <ChallengesSection />
        <CharacterSelection />
        <Footer />
      </ScrollEffect>
    </main>
  );
}
