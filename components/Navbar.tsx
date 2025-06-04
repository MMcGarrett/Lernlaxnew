'use client';

import { useEffect, useState } from "react";

const steps = [
  { id: 'section-1', title: 'Start', number: '01' },
  { id: 'section-2', title: 'Herausforderungen', number: '02' },
  { id: 'section-3', title: 'Dein Weg', number: '03' },
  { id: 'section-4', title: 'Tools & Ressourcen', number: '04' },
  { id: 'section-5', title: 'Inspiration', number: '05' },
];

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = steps.findIndex((step) => step.id === entry.target.id);
          if (entry.isIntersecting && index !== -1) {
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    steps.forEach((step) => {
      const el = document.getElementById(step.id);
      if (el) observer.observe(el);
    });

    return () => {
      steps.forEach((step) => {
        const el = document.getElementById(step.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <nav className="fixed bottom-6 right-6 z-50 hidden lg:flex flex-col items-end text-white font-medium text-sm">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-end">
          <div className="flex items-center gap-3">
            <a
              href={`#${step.id}`}
              className={`hover:underline transition-opacity ${
                activeIndex === index ? "opacity-100 font-bold" : "opacity-60"
              }`}
            >
              {step.title}
            </a>
            <span className="w-6 text-right">{step.number}</span>
          </div>

          {/* Strich nur zwischen aktivem und nächstem Step */}
          {index === activeIndex && index < steps.length - 1 && (
            <div className="w-px h-6 bg-white/70 mt-2 mb-2 self-end" />
          )}
        </div>
      ))}
    </nav>
  );
}
