"use client";
import { useEffect } from "react";

export default function ScrollEffect({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        document.body.classList.add("blur-bg-active");
      } else {
        document.body.classList.remove("blur-bg-active");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <>{children}</>;
}
