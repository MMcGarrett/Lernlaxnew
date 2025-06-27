/* ────────────────────────────────────────────────
   components/InteractiveGym.tsx
   ─ Responsives Bild (kein Beschnitt) + interaktive Punkte
   ─ Punkte bleiben dank %-Koordinaten exakt positioniert
   ──────────────────────────────────────────────── */

'use client';

import Image from 'next/image';
import { useEffect } from 'react';

interface InteractiveTodoProp {
  onTipChange?: (tip: string) => void;
}

/* Punkte: Position in Prozent relativ zum Bild + Tipp-Text */
const points = [
  {
    top: 24.5,
    left: 20.5,
    tip: 'Setze Prioritäten nach Wirkung, nicht nach Reihenfolge. Überlege dir: Welche Aufgabe bringt dich heute konkret weiter? So verlierst du dich nicht in Kleinkram.'
  },
  {
    top: 36.2,
    left: 20.5,
    tip: 'Trenne Wichtiges von Dringendem. Nur weil etwas schnell erledigt werden muss, heißt das nicht, dass es auch den größten Nutzen hat. Plane mit Weitblick.'
  },
  {
    top: 47.2,
    left: 20.5,
    tip: 'Plane deinen Tag realistisch: 3–5 Aufgaben reichen oft völlig. Berücksichtige auch Pausen und spontane Unterbrechungen, damit du nicht unter Druck gerätst.'
  },
  {
    top: 56,
    left: 20.5,
    tip: 'Beende deinen Tag mit einem kurzen Rückblick: Was hast du geschafft? Was bleibt offen? Das hilft, fokussiert und mit klarem Kopf in den nächsten Tag zu starten.'
  }
];





export default function InteractiveTodo({ onTipChange }: InteractiveTodoProp) {
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
          src="/todo.png"           /* Pfad ggf. anpassen */
          alt="ToDo-Übersicht"
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


