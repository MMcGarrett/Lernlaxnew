'use client';

import { useEffect, useState } from "react";
import ScrollEffect from "@/components/ScrollEffect";
import HeaderLogo from "@/components/HeaderLogo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Start from "@/components/Start";
import ChallengesSection from "@/components/Challanges";

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

    const startSection = document.getElementById("section-1");
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
        <Start />
        <ChallengesSection />
      </ScrollEffect>
    </main>
  );
}
