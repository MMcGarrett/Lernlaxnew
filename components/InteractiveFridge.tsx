'use client';

import { useState, useEffect } from 'react';

type FridgeProps = {
  onTipChange?: (msg: string) => void;
};

export default function InteractiveFridge({ onTipChange }: FridgeProps) {
  const [doorOpen, setDoorOpen] = useState(false);

  const defaultTip = 'Fahre über ein Produkt für einen Tipp.';
  const updateTip = (msg: string) =>
    onTipChange ? onTipChange(msg) : undefined;

  const items = [
    {
      icon: '🍎',
      hint:
        'Äpfel liefern Vitamin C, Polyphenole und Ballaststoffe – stärken das Immunsystem, fördern die Verdauung und eignen sich als kalorienarmer Snack für zwischendurch.',
    },
    {
      icon: '🥦',
      hint:
        'Brokkoli enthält viel Vitamin K, C und Folsäure sowie sekundäre Pflanzenstoffe wie Sulforaphan, die antioxidativ wirken und das Krebsrisiko senken können.',
    },
    {
      icon: '🥚',
      hint:
        'Eier bieten hochwertiges Eiweiß (ca. 7 g pro Ei), Vitamin B12, A sowie Cholin – wichtig für Muskelaufbau, Nervensystem und anhaltende Sättigung.',
    },
    {
      icon: '🥛',
      hint:
        'Milch liefert Kalzium, Eiweiß und Vitamin B2/B12; unterstützt Knochen + Muskeln. Bei Laktoseintoleranz auf laktosefreie oder pflanzliche Alternativen achten.',
    },
    {
      icon: '💧',
      hint:
        'Wasser ist an allen Stoffwechsel­prozessen beteiligt; mind. 1,5 l (besser 2 l) täglich trinken, um Konzentration und Leistungsfähigkeit zu sichern.',
    },
    {
      icon: '🥣',
      hint:
        'Haferflocken punkten mit Beta-Glucanen (senken LDL-Cholesterin), komplexen Kohlenhydraten und Eisen; perfekt als lang sättigendes Frühstück.',
    },
    {
      icon: '🍌',
      hint:
        'Bananen sind reich an Kalium und Vitamin B6, liefern schnelle Energie durch Fruktose und stärken mit Tryptophan die Serotoninbildung – ideal vor dem Sport.',
    },
    {
      icon: '🍩',
      hint:
        'Donuts bestehen größtenteils aus raffiniertem Zucker und Transfetten; hoher Kalorien­dichte bei wenig Nährstoffen – besser nur als seltenes Genuss­mittel.',
    },
    {
      icon: '🥤',
      hint:
        'Softdrinks liefern pro 0,5 l bis zu 55 g Zucker (= ~18 Stück Würfelzucker); fördern Karies, Übergewicht und erhöhen das Diabetes­risiko.',
    },
    {
      icon: '🍟',
      hint:
        'Pommes enthalten viel Acrylamid (bei hohen Brattemperaturen) sowie gesättigte Fette und Salz; erhöhter Konsum kann Herz-Kreislauf-Risiken steigern.',
    },
    {
      icon: '🍕',
      hint:
        'Pizza ist oft reich an gesättigten Fetten, Salz und Kalorien (≈ 800–1000 kcal/Port.); Vollkornboden + viel Gemüse reduziert die Kalorien­dichte deutlich.',
    },
    {
      icon: '🍫',
      hint:
        'Schokolade liefert rasch Energie, enthält aber viel Zucker und gesättigte Fette; dunkle Varianten (≥ 70 % Kakao) bieten mehr Antioxidantien und weniger Zucker.',
    },
    {
      icon: '🍿',
      hint:
        'Fertige Chips/Popcorn enthalten häufig Palmöl, Salz und Geschmacks­verstärker; selbstgemachtes Popcorn mit wenig Öl ist die deutlich gesündere Alternative.',
    },
    {
      icon: '🌭',
      hint:
        'Verarbeitete Würstchen liefern Nitrit­pökelsalz, gesättigte Fette und Natrium; WHO stuft verarbeitetes Fleisch als karzinogen ein – maximal gelegentlich verzehren.',
    },
  ];

  // ✅ Richtige Lösung: onTipChange erst nach Render per useEffect
  useEffect(() => {
    updateTip(defaultTip);
  }, []);

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
