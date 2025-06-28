'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface CartoonScrollChatProps {
  className?: string;
  /** Verzögerung (ms) bis zum allerersten Zyklus */
  initialDelay?: number;
  /** Abstand (ms) zwischen zwei Prüfläufen */
  step?: number;
  /** Wie viele Bubbles dürfen maximal gleichzeitig sichtbar sein? */
  maxVisible?: number;
}

type BaseItem = {
  type: 'question' | 'answer';
  text: string;
};

type Message = BaseItem & {
  id: number;
  entering?: boolean;
  leaving?: boolean;
};

/* Demo-Dialog */
const BASE_ITEMS: BaseItem[] = [
  { type: 'question', text: 'Wie behalte ich den Überblick, wenn sich Deadlines stapeln?' },
  { type: 'answer',   text: 'Schreibe morgens 3 Kernziele auf und hake sie zuerst ab.' },
  { type: 'question', text: 'Welche 2-Minuten-Aufgaben erledige ich sofort?' },
  { type: 'answer',   text: 'Kurze Mails, Terminbestätigungen und To-Do-Einträge – weg damit.' },
  { type: 'question', text: 'Wie mache ich Pausen, ohne in Prokrastination abzurutschen?' },
  { type: 'answer',   text: 'Stell dir einen 5-Min-Timer, streck dich und trink Wasser, dann zurück an die Arbeit.' },
  { type: 'question', text: 'Wie starte ich fokussiert, wenn ich tausend Tabs offen habe?' },
  { type: 'answer',   text: 'Schließe alles Unnötige und öffne nur das, was du für die nächste Aufgabe brauchst.' },
  { type: 'question', text: 'Wie verhinderst du ständige Handy-Ablenkungen?' },
  { type: 'answer',   text: 'Nutze 30-Minuten „Nicht stören“-Phasen und checke Nachrichten gebündelt.' },
  { type: 'question', text: 'Was tust du, wenn eine Aufgabe zu groß wirkt?' },
  { type: 'answer',   text: 'Teile sie in 15-Min-Blöcke und beginne mit dem einfachsten Schritt.' }
];

const LEAVE_MS = 500; // Fade-out Dauer

export default function CartoonScrollChat({
  className = '',
  initialDelay = 900,
  step = 4000,
  maxVisible = 3
}: CartoonScrollChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const indexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const messagesRef = useRef<Message[]>([]);

  /* Snapshot aktuell halten */
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const makeId = () => Date.now() + Math.random();

  const appendMessage = () => {
    if (indexRef.current >= BASE_ITEMS.length) indexRef.current = 0;
    const item = BASE_ITEMS[indexRef.current];
    setMessages(prev => [...prev, { ...item, id: makeId(), entering: true }]);
    indexRef.current += 1;
  };

  /**
   * Ablauf:
   * 1. Wenn noch Platz da ist (< maxVisible) ⇒ einfach neue Bubble anhängen.
   * 2. Falls voll ⇒ oberste Bubble mit fadeOut weg, nach FadeOut löschen, dann neue anhängen.
   */
  const cycle = () => {
    const current = messagesRef.current;

    if (current.length < maxVisible) {
      // Noch Platz → direkt anhängen
      appendMessage();
      return;
    }

    // Voll → erst oberste entfernen
    const firstId = current[0].id;
    // Markiere als leaving (startet fadeOut)
    setMessages(prev => prev.map(m => (m.id === firstId ? { ...m, leaving: true } : m)));

    // Nach FadeOut löschen und neue Bubble anhängen
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== firstId));
      appendMessage();
    }, LEAVE_MS);
  };

  /* Start / Stop */
  useEffect(() => {
    const t0 = setTimeout(() => {
      cycle();
      intervalRef.current = setInterval(cycle, step);
    }, initialDelay);

    return () => {
      clearTimeout(t0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [initialDelay, step, maxVisible]);

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="chat">
        <div className="chat__header">📱 <span>Hotline für Zeitmanagement</span></div>
        <div className="chat__msgs">
          {messages.map(({ id, type, text, entering, leaving }) => (
            <div
              key={id}
              className={`msg ${type} ${entering ? 'entering' : ''} ${leaving ? 'leaving' : ''}`}
              onAnimationEnd={e => {
                if (entering && e.animationName === 'fadeInUp') {
                  setMessages(prev => prev.map(m => (m.id === id ? { ...m, entering: false } : m)));
                }
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');

        :root {
          --green: #05a36b;
          --blue: #b6e4ff;
          --light-green: #e5ffd7;
          --radius: 22px;
          --outline: 4px;
        }

        * { box-sizing: border-box; }

        .chat {
          width: 360px;
          height: 600px;
          display: flex;
          flex-direction: column;
          background: #fff;
          border: var(--outline) solid #000;
          border-radius: 26px;
          box-shadow: 6px 6px 0 0 #000;
          overflow: hidden;
          font-family: 'Comic Neue', cursive;
        }

        .chat__header {
          background: var(--green);
          color: #fff;
          padding: 16px 18px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 20px;
          border-bottom: var(--outline) solid #000;
          box-shadow: 0 4px 0 0 #000;
        }

        .chat__msgs {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding: 22px;
          overflow: hidden;
        }

        .msg {
          max-width: 75%;
          padding: 14px 20px;
          line-height: 1.45;
          font-size: 17px;
          border-radius: var(--radius);
          border: var(--outline) solid #000;
          position: relative;
          box-shadow: 5px 5px 0 0 #000;
          color: #000;
        }

        .question { align-self: flex-start; background: var(--blue); }
        .answer   { align-self: flex-end;   background: var(--light-green); }

        .question::after, .answer::after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          border: var(--outline) solid transparent;
        }
        .question::after {
          left: -16px; top: 16px; border-right: 16px solid var(--blue);  transform: skewX(-15deg);
        }
        .answer::after {
          right: -16px; top: 16px; border-left: 16px solid var(--light-green); transform: skewX(15deg);
        }

        @keyframes fadeOutUp {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-120%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(120%); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .leaving  { animation: fadeOutUp ${LEAVE_MS}ms forwards ease-out; }
        .entering { animation: fadeInUp ${LEAVE_MS}ms forwards ease-out; }
      `}</style>
    </div>
  );
}