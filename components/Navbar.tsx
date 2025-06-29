'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const steps = [
  { id: 'section-1', title: 'Start', number: '01' },
  { id: 'challenges', title: 'Herausforderungen', number: '02' },
  { id: 'deinWeg', title: 'Dein Weg', number: '03' },
  { id: 'section-4', title: 'Tools & Ressourcen', number: '04' },
  { id: 'section-5', title: 'Inspiration', number: '05' },
];

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <>
      {/* Floating Mobile Menu Button */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-[#324F4A] p-3 rounded-full shadow-lg text-white"
          aria-label="Menü"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed bottom-20 right-6 z-50 bg-[#1b2c29] text-white p-4 rounded-lg shadow-xl space-y-3 lg:hidden">
          {steps.map((step) => (
            <a
              key={step.id}
              href={`#${step.id}`}
              onClick={() => setMenuOpen(false)}
              className="block text-sm hover:underline"
            >
              {step.number} – {step.title}
            </a>
          ))}
        </div>
      )}

      {/* Desktop Sidebar Navigation */}
      <nav className="fixed bottom-6 right-6 z-50 hidden lg:flex flex-col items-end text-white font-medium text-sm">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-end">
            <div className="flex items-center gap-3">
              <a
                href={`#${step.id}`}
                className={`hover:underline transition-opacity ${
                  activeIndex === index ? 'opacity-100 font-bold' : 'opacity-60'
                }`}
              >
                {step.title}
              </a>
              <span className="w-6 text-right">{step.number}</span>
            </div>
            {index === activeIndex && index < steps.length - 1 && (
              <div className="w-px h-6 bg-white/70 mt-2 mb-2 self-end" />
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
