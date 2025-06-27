/* ────────────────────────────────────────────────
   components/SectionModule.tsx
   ─ Komplettes Modul mit Bild-, Text- und Fragen-Logik
   ──────────────────────────────────────────────── */

'use client';

import Image from 'next/image';
import {
  ReactNode,
  ReactElement,
  isValidElement,
  cloneElement,
  useState,
  useEffect,
  useRef,
} from 'react';
import AnimatedQuestionBox from './QuestionBox';
import BlurText from '@/assets/BlurTest';
import SplitText from '@/assets/SplitText';
import { useInView } from 'framer-motion';

/* ───────────── Typen ───────────── */

export type SectionModuleProps = {
  title: string;
  text: string;
  sourceUrl?: string;
  question: {
    id: string;
    questionText: string;
    options: string[];
  };
  order?: 'image-first' | 'text-first' | 'question-first' | 'big-image';
  characterImg?: string;
  imageSrc?: string;
  media?: ReactNode;
};

/* ───────────── Haupt-Komponente ───────────── */

export default function SectionModule({
  title,
  text,
  sourceUrl,
  question,
  order = 'image-first',
  characterImg,
  imageSrc,
  media,
}: SectionModuleProps) {
  /* Default-Tipp – verallgemeinert */
  const [tip, setTip] = useState('Fahre über einen Punkt für einen Tipp.');
  const [revealQuestion, setRevealQuestion] = useState(false);

  /* Prüfen, ob eine Interaktiv-Komponente übergeben wurde */
  const hasMedia = !!media;

  /* Visual (Bild oder interaktives Media-Element) bestimmen */
  let visual: ReactNode;
  if (media && isValidElement(media)) {
    /* Interaktives Element bekommt den Callback mit */
    visual = cloneElement(media as ReactElement<any>, { onTipChange: setTip });
  } else {
    /* Fallback = einfaches Bild */
    visual = (
      <ImageBox
        src={imageSrc ?? '/images/placeholder.png'}
        large={order === 'big-image'}
      />
    );
  }

  /* Reihenfolge-Abbildung, je nach Prop 'order' */
  const renderOrder = {
    'image-first': [
      visual,
      <TextBox
        key="text"
        text={text}
        sourceUrl={sourceUrl}
        tip={tip}
        showTipBox={hasMedia}
        onRevealQuestion={() => setRevealQuestion(true)}
      />,
      <AnimatedQuestionBox
        key="question"
        {...question}
        characterImg={characterImg}
        direction="right"
        trigger={revealQuestion}
      />,
    ],
    'text-first': [
      <TextBox
        key="text"
        text={text}
        sourceUrl={sourceUrl}
        tip={tip}
        showTipBox={hasMedia}
        onRevealQuestion={() => setRevealQuestion(true)}
      />,
      visual,
      <AnimatedQuestionBox
        key="question"
        {...question}
        characterImg={characterImg}
        direction="right"
        trigger={revealQuestion}
      />,
    ],
    'question-first': [
      <AnimatedQuestionBox
        key="question"
        {...question}
        characterImg={characterImg}
        direction="left"
        trigger={revealQuestion}
      />,
      visual,
      <TextBox
        key="text"
        text={text}
        sourceUrl={sourceUrl}
        tip={tip}
        showTipBox={hasMedia}
        onRevealQuestion={() => setRevealQuestion(true)}
      />,
    ],
    'big-image': [
      <div key="visual" className="flex flex-col items-center">
        {visual}
      </div>,
      <div key="stack" className="flex flex-col gap-6 flex-1 max-w-lg">
        <AnimatedQuestionBox
          key="question"
          {...question}
          characterImg={characterImg}
          direction="top"
          trigger={revealQuestion}
        />
        <TextBox
          text={text}
          sourceUrl={sourceUrl}
          tip={tip}
          showTipBox={hasMedia}
          onRevealQuestion={() => setRevealQuestion(true)}
        />
      </div>,
    ],
  } as const;

  return (
    <section className="py-16 px-6 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        {/* Überschrift mit Blur-Animation */}
        <BlurText
          text={title}
          delay={30}
          animateBy="words"
          direction="top"
          className="text-2xl font-semibold"
        />

        {/* Flex-Container, Reihenfolge gem. order */}
        <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:items-start lg:text-left">
          {(renderOrder[order] ?? []).map((el) => el)}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Hilfs-Komponenten ───────────── */

/**
 * Text + Quelle + (optionale) Tipp-Infobox
 */
function TextBox({
  text,
  sourceUrl,
  tip,
  showTipBox,
  onRevealQuestion,
}: {
  text: string;
  sourceUrl?: string;
  tip?: string;
  showTipBox?: boolean;
  onRevealQuestion: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  /* Wenn Text in Sicht kommt, Frage animiert einblenden */
  useEffect(() => {
    if (isInView) onRevealQuestion();
  }, [isInView, onRevealQuestion]);

  return (
    <div className="w-full text-left" ref={ref}>
      {/* Fließtext mit Split-Animation */}
      <SplitText
        text={text}
        className="mb-4 text-base leading-relaxed"
        delay={25}
        duration={0.6}
        ease="power3.out"
        splitType="words"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="left"
      />

      {/* Quellenlink */}
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-300 underline"
        >
          <SplitText
            text="Quelle ansehen"
            delay={50}
            duration={0.6}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: -40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
          />
        </a>
      )}

      {/* Tipp-Infobox, wenn Media vorhanden */}
      {showTipBox && tip && (
        <div className="mt-6 rounded-lg bg-white/5 px-4 py-3 text-sm text-white shadow-inner border border-white/10 backdrop-blur">
          {tip}
        </div>
      )}
    </div>
  );
}

/**
 * Bildcontainer mit Shadow & Rounded-Corners
 */
function ImageBox({ src, large = false }: { src: string; large?: boolean }) {
  return (
    <div className="flex w-full max-w-sm flex-shrink-0 justify-center">
      <div
        className={`w-full overflow-hidden ${
          large ? 'max-w-lg' : 'max-w-sm'
        }`}
      >
        <Image
          src={src}
          alt="Thema Bild"
          width={large ? 600 : 400}
          height={large ? 400 : 300}
          className="h-auto w-full object-cover"
        />
      </div>
    </div>
  );
}
