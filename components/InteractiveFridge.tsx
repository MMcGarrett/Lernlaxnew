// components/InteractiveFridge.tsx
'use client';

import { useState } from 'react';

type FridgeProps = {
  onTipChange?: (msg: string) => void;
};

export default function InteractiveFridge({ onTipChange }: FridgeProps) {
  const [doorOpen, setDoorOpen] = useState(false);

  // Standard-Hinweis, falls Parent nichts vorgibt
  const defaultTip = 'Fahre über ein Produkt für einen Tipp.';
  const updateTip = (msg: string) =>
    onTipChange ? onTipChange(msg) : undefined;

  const items = [
    { icon: '🍎', hint: 'Frisches Obst wie Äpfel liefert viele Vitamine …' },
    { icon: '🥦', hint: 'Brokkoli enthält viel Vitamin C & K …' },
    { icon: '🥚', hint: 'Eier sind eine hervorragende Eiweißquelle …' },
    { icon: '🥛', hint: 'Milch liefert Kalzium und Vitamin B12 …' },
    { icon: '💧', hint: 'Mindestens 1,5 l Wasser pro Tag trinken.' },
    { icon: '🥣', hint: 'Haferflocken halten lange satt …' },
    { icon: '🍌', hint: 'Bananen sind reich an Kalium – idealer Snack.' },

    { icon: '🍩', hint: 'Donuts: viel Zucker & Fett – lieber selten.' },
    { icon: '🥤', hint: 'Softdrinks fördern Übergewicht und Karies.' },
    { icon: '🍟', hint: 'Pommes enthalten viel Fett & Salz.' },
    { icon: '🍕', hint: 'Pizza ist meist sehr energiereich.' },
    { icon: '🍫', hint: 'Schokolade – besser nur in Maßen.' },
    { icon: '🍿', hint: 'Chips: viel Salz, Fett und Zusatzstoffe.' },
    { icon: '🌭', hint: 'Würstchen sind stark verarbeitet.' },
  ];

  // Beim ersten Mount Grundtext schicken
  useState(() => {
    updateTip(defaultTip);
  });

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-2 h-[370px] w-[200px] overflow-hidden rounded-lg bg-gray-300 p-2 shadow">
        {/* Tür */}
        <div
          onClick={() => setDoorOpen(!doorOpen)}
          className="absolute inset-0 flex cursor-pointer flex-col items-end justify-center rounded-lg bg-gray-400 transition-transform duration-500 ease-in-out"
          style={{
            transform: doorOpen ? 'translateX(-190px)' : 'translateX(0)',
          }}
        >
          <span className="absolute left-1/2 top-2 -translate-x-1/2 text-[14px] font-bold text-white">
            Kühlschrank
          </span>
          <span className="mr-0 h-8 w-1 rounded bg-gray-600" />
        </div>

        {/* Inhalt */}
        <div className="z-0 grid h-full w-full grid-cols-2 grid-rows-7 gap-1">
          {items.map(({ icon, hint }) => (
            <div
              key={hint}
              className="flex cursor-pointer items-center justify-center rounded bg-white text-xl shadow"
              onMouseEnter={() => updateTip(hint)}
              onMouseLeave={() => updateTip(defaultTip)}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
