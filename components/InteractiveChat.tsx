'use client';

import { useEffect, useRef } from 'react';

/* ---------- Typen & Default-Daten ------------------------------------ */

type Message = {
  type: 'question' | 'answer';
  text: string;
};

interface InteractiveChatProps {
  items?: Message[];
  gap?: number;           // Abstand zwischen Nachrichten (ms)
}

const defaultItems: Message[] = [
  { type: 'question', text: 'Wie behalte ich den Überblick, wenn sich Deadlines stapeln?' },
  { type: 'answer',   text: 'Schreibe morgens 3 Kernziele auf und hake sie zuerst ab.' },
  { type: 'question', text: 'Welche 2-Minuten-Aufgaben erledige ich sofort?' },
  { type: 'answer',   text: 'Kurze Mails, Terminbestätigungen und To-Do-Einträge – weg damit.' },
  { type: 'question', text: 'Wie mache ich Pausen, ohne in Prokrastination abzurutschen?' },
  { type: 'answer',   text: 'Stell dir einen 5-Min-Timer, streck dich und trink Wasser, dann zurück an die Arbeit.' },
  { type: 'question', text: 'Wie starte ich fokussiert, wenn ich tausend Tabs offen habe?' },
  { type: 'answer',   text: 'Schließe alles Unnötige und öffne nur das, was du für die nächste Aufgabe brauchst.' },
  { type: 'question', text: 'Wie verhindere ich ständige Handy-Ablenkungen?' },
  { type: 'answer',   text: 'Nutze 30-Minuten „Nicht stören“-Phasen und checke Nachrichten gebündelt.' },
  { type: 'question', text: 'Was tue ich, wenn eine Aufgabe zu groß wirkt?' },
  { type: 'answer',   text: 'Teile sie in 15-Min-Blöcke und beginne mit dem einfachsten Schritt.' },
];

/* ---------- Komponente ------------------------------------------------ */

export default function ChatTicker({
  items = defaultItems,
  gap   = 1600,
}: InteractiveChatProps) {
  // HTML-Container für die Bubbles
  const chatRef  = useRef<HTMLDivElement | null>(null);
  // Laufender Index im Array
  const idxRef   = useRef<number>(0);
  // Timeout-Handle für sauberes Aufräumen
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Nachrichten nacheinander einblenden */
  useEffect(() => {
    const chat = chatRef.current;

    function addBubble() {
      if (!chat) return;

      if (idxRef.current >= items.length) idxRef.current = 0;
      const { type, text } = items[idxRef.current++];

      const div       = document.createElement('div');
      div.className   = `msg ${type}`;
      div.textContent = text;

      // Nach Animation entfernen, damit DOM schlank bleibt
      div.addEventListener('animationend', () => div.remove());
      chat.appendChild(div);

      timerRef.current = setTimeout(addBubble, gap);
    }

    timerRef.current = setTimeout(addBubble, 800);

    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [items, gap]);

  return (
    <div className="chat">
      <header className="chat__header">
        📱 <span>Projektgruppe</span>
      </header>

      {/* Container für Bubbles */}
      <div className="chat__msgs" ref={chatRef} />

      {/* Styles per styled-jsx (bleibt lokal zur Komponente) */}
      <style jsx>{`
        :root {
          --green: #075e54;
          --blue: #e7f2ff;
          --light-green: #dcf8c6;
          --radius: 18px;
        }
        * {
          box-sizing: border-box;
        }

        .chat {
          width: 360px;
          height: 600px;
          display: flex;
          flex-direction: column;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden; /* keine Scrollleiste */
        }

        .chat__header {
          background: var(--green);
          color: #fff;
          padding: 14px 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .chat__header span {
          font-size: 18px;
        }

        .chat__msgs {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px;
          position: relative;
          overflow: hidden; /* verhindert Scrollen */
        }

        .msg {
          max-width: 75%;
          padding: 10px 14px;
          line-height: 1.4;
          border-radius: var(--radius);
          font-size: 14px;
          animation: slideUp 8s ease-in-out forwards;
        }
        .question {
          align-self: flex-start;
          background: var(--blue);
        }
        .answer {
          align-self: flex-end;
          background: var(--light-green);
        }

        @keyframes slideUp {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          10% {
            transform: translateY(0);
            opacity: 1;
          }
          80% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
