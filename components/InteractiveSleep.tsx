/* ────────────────────────────────────────────────
   components/InteractiveGym.tsx
   ─ Responsives Bild (kein Beschnitt) + interaktive Punkte
   ─ Punkte bleiben dank %-Koordinaten exakt positioniert
   ──────────────────────────────────────────────── */

'use client';

import Image from 'next/image';
import { useEffect } from 'react';

interface InteractivesleepProp {
  onTipChange?: (tip: string) => void;
}

/* Punkte: Position in Prozent relativ zum Bild + Tipp-Text */
const points = [
  {
    top: 45,
    left: 26,
    tip: 'Ideale Schlafdauer: 7–9 Stunden. Zu wenig Schlaf stört Hormonbalance, Gedächtnis und Immunsystem; zu viel kann Antriebslosigkeit, Stoffwechselprobleme und Kopfschmerz fördern – Balance hält Körper- und Regenerationsprozesse im Optimum.'
  },
  {
    top: 84,
    left: 34,
    tip: '15 Minuten Lesen bei warmem Licht senken Puls und Cortisol, entspannen Augenmuskeln und signalisieren dem Gehirn „Schlafmodus einleiten“. Gleichmäßige Augenbewegungen helfen, von Bildschirmreizen herunterzukommen und die Melatoninausschüttung zu fördern.'
  },
  {
    top: 41,
    left: 90,
    tip: 'Bildschirmlicht (blaues Licht) unterdrückt Melatonin und hält das sympathische Nervensystem aktiv. Action-Inhalte oder Gaming pushen Dopamin & Adrenalin – das Herz schlägt schneller, die Körperkerntemperatur steigt, der Eintritt in Tiefschlafphasen verzögert sich.'
  },
  {
    top: 55,
    left: 7,
    tip: 'Ein kleines Glas Wasser vor dem Schlafen beugt nächtlicher Dehydrierung vor. Ausreichende Hydratation unterstützt Zellreparatur, Temperaturregulation und nächtliche Entgiftungsprozesse (Niere, Lymphe). Nicht übertreiben, sonst drohen nächtliche WC-Gänge.'
  }
];




export default function InteractiveSleep({ onTipChange }: InteractivesleepProp) {
  /* Grund-Tipp einmalig setzen */
  useEffect(() => {
    onTipChange?.('Fahre über einen Punkt im Bild für einen Tipp.');
  }, [onTipChange]);

  return (
    <div className="flex w-full justify-center">
      {/* Wrapper: Breite flüssig, Höhe ergibt sich automatisch aus dem Bildverhältnis */}
      <div className="relative w-full max-w-lg">
        {/* Bild in natürlichem Seitenverhältnis – object-contain vermeidet Beschnitt */}
        <Image
          src="/sleep.png"           /* Pfad ggf. anpassen */
          alt="Schlafubersicht"
          width={1600}                /* Originalbreite (wichtig fürs Verhältnis) */
          height={900}                /* Originalhöhe  (z. B. 16:9) */
          sizes="(max-width: 768px) 90vw, (max-width: 1280px) 60vw, 33vw"
          className="w-full h-auto rounded-xl object-contain shadow-lg"
          priority
        />

        {/* Interaktive Punkte (bleiben dank %-Koordinaten an der richtigen Stelle) */}
        {points.map(({ top, left, tip }, idx) => (
          <button
            key={idx}
            type="button"
            onMouseEnter={() => onTipChange?.(tip)}
            onMouseLeave={() =>
              onTipChange?.('Fahre über einen Punkt im Bild für einen Tipp.')
            }
            style={{ top: `${top}%`, left: `${left}%` }}
            className="group absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2"
          >
            {/* Pulsierender, schwarzer Punkt */}
            <span className="block h-full w-full rounded-full bg-black opacity-80 animate-pulse group-hover:scale-110 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );
}


