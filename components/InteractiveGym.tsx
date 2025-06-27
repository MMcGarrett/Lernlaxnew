/* ────────────────────────────────────────────────
   components/InteractiveGym.tsx
   ─ Responsives Bild (kein Beschnitt) + interaktive Punkte
   ─ Punkte bleiben dank %-Koordinaten exakt positioniert
   ──────────────────────────────────────────────── */

'use client';

import Image from 'next/image';
import { useEffect } from 'react';

interface InteractiveGymProps {
  onTipChange?: (tip: string) => void;
}

/* Punkte: Position in Prozent relativ zum Bild + Tipp-Text */
const points = [
  {
    top: 33,
    left: 18,
    tip: 'Joggen hilft, nach langen Lern- oder Arbeitssessions mental abzuschalten. Die gleichmäßige Bewegung reduziert Stress, fördert die Durchblutung des Gehirns und schafft einen klaren Kopf.',
  },
  {
    top: 33,
    left: 45,
    tip: 'Radfahren eignet sich perfekt als aktive Pause oder täglicher Weg zur Uni oder Arbeit. Es verbindet Bewegung mit frischer Luft und hilft, zwischen Aufgaben in den Fokus zurückzufinden.',
  },
  {
    top: 33,
    left: 82,
    tip: 'Tanzen bringt Körper und Geist in Einklang. Es löst Verspannungen, baut Stresshormone ab und bringt neue Energie – ideal, um nach einem vollen Tag durchzuschütteln und abzuschalten.',
  },
  {
    top: 66,
    left: 13,
    tip: 'Ballsport verbindet körperliche Aktivität mit sozialem Ausgleich. Gemeinsames Spielen schafft Verbindung, stärkt das Teamgefühl und hilft, den Kopf nach Arbeit oder Studium freizubekommen.',
  },
  {
    top: 58,
    left: 70,
    tip: 'Krafttraining stabilisiert den Körper für langes Sitzen am Schreibtisch, verbessert die Haltung und gibt durch sichtbare Fortschritte ein Gefühl von Kontrolle – ein idealer mentaler Ausgleich.',
  },
  {
    top: 73,
    left: 45,
    tip: 'Yoga und Gymnastik helfen, nach langen Bildschirmzeiten wieder in den Körper zu kommen. Sie fördern Beweglichkeit, Konzentration und Entspannung – perfekt zum Runterkommen und Auftanken.',
  },
];


export default function InteractiveGym({ onTipChange }: InteractiveGymProps) {
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
          src="/sports.png"           /* Pfad ggf. anpassen */
          alt="Sportarten Übersicht"
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

/* ───────── Tailwind-Animation (falls nicht vorhanden) ─────────
@layer utilities {
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1);   opacity: 0.8; }
    50%      { transform: scale(1.3); opacity: 0.4; }
  }
  .animate-pulse {
    animation: pulse-slow 1.6s ease-in-out infinite;
  }
}
──────────────────────────────────────────────────── */
