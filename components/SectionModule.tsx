import Image from 'next/image';
import {
  ReactNode,
  ReactElement,
  isValidElement,
  cloneElement,
  useState,
} from 'react';
import AnimatedQuestionBox from './QuestionBox';
import BlurText from '@/assets/BlurTest';
import SplitText from '@/assets/SplitText';


type SectionModuleProps = {
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

  /** Bildquelle ODER eigenes React-Element (z. B. <InteractiveFridge />) */
  imageSrc?: string;
  media?: ReactNode;
};

export default function SectionModule({
  title,
  imageSrc,
  media,
  text,
  sourceUrl,
  question,
  order = 'image-first',
  characterImg,
}: SectionModuleProps) {
  /* ───────────────────────── Tooltip-State ────────────────────────── */
  const [tip, setTip] = useState<string>(
    'Fahre über ein Produkt für einen Tipp.'
  );

  /* ───────────── Visual-Element vorbereiten (Bild ODER media) ─────── */
  let visual: ReactNode;

  if (media) {
    // falls das media-Element eine onTipChange-Prop verträgt, anhängen
    visual = isValidElement(media)
      ? cloneElement(media as ReactElement<any>, { onTipChange: setTip })
      : media;
  } else {
    visual = (
      <ImageBox
        src={imageSrc ?? '/images/placeholder.png'}
        large={order === 'big-image'}
      />
    );
  }

  const [revealQuestion, setRevealQuestion] = useState(false);

  /* ─────────────── Reihenfolge-Konfiguration ──────────────────────── */
  const renderOrder = {
    'image-first': [
      visual,
      <TextBox key="text" text={text} sourceUrl={sourceUrl} tip={tip} onRevealQuestion={() => setRevealQuestion(true)}/>,
      <AnimatedQuestionBox
        key="question"
        {...question}
        characterImg={characterImg}
        direction="right"
        trigger={revealQuestion}
      />
    ],
    'text-first': [
      <TextBox key="text" text={text} sourceUrl={sourceUrl} tip={tip} onRevealQuestion={() => setRevealQuestion(true)}/>,
      visual,
      <AnimatedQuestionBox
        key="question"
        {...question}
        characterImg={characterImg}
        direction="right"
        trigger={revealQuestion}
      />
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
      <TextBox key="text" text={text} sourceUrl={sourceUrl} tip={tip} onRevealQuestion={() => setRevealQuestion(true)}/>,
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
        <TextBox text={text} sourceUrl={sourceUrl} tip={tip} onRevealQuestion={() => setRevealQuestion(true)}/>
      </div>,
    ],
  } as const;

  /* ───────────────────────── Render ──────────────────────────────── */
  return (
    <section className="py-16 px-6 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <BlurText
              text={title}
              delay={30}
              animateBy="words"
              direction="top"
              className="text-2xl font-semibold"
        />
        <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:items-start lg:text-left">
          {(renderOrder[order] ?? []).map((el) => el)}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Hilfs-Komponenten ─────────────────────── */

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export function TextBox({
  text,
  sourceUrl,
  tip,
  onRevealQuestion,
}: {
  text: string;
  sourceUrl?: string;
  tip: string;
  onRevealQuestion: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      console.log("Text ist sichtbar, starte Frageanimation");
      onRevealQuestion();
    }
  }, [isInView, onRevealQuestion]);

  return (
    <div className="w-full text-left" ref={ref}>
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

      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-300 underline"
        >
          <SplitText
            text="Quelle ansehen"
            className=""
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

      <div className="mt-4 rounded bg-gray-800 px-2 py-1 text-[14px] text-white">
        {tip}
      </div>
    </div>
  );
}


function ImageBox({ src, large = false }: { src: string; large?: boolean }) {
  return (
    <div className="flex w-full max-w-sm flex-shrink-0 justify-center">
      <div
        className={`w-full overflow-hidden rounded-xl shadow-lg ${
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
