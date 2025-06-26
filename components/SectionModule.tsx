import Image from 'next/image';
import {
  ReactNode,
  ReactElement,
  isValidElement,
  cloneElement,
  useState,
} from 'react';
import QuestionBox from './QuestionBox';

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

  /* ─────────────── Reihenfolge-Konfiguration ──────────────────────── */
  const renderOrder = {
    'image-first': [
      visual,
      <TextBox key="text" text={text} sourceUrl={sourceUrl} tip={tip} />,
      <QuestionBox key="question" {...question} characterImg={characterImg} />,
    ],
    'text-first': [
      <TextBox key="text" text={text} sourceUrl={sourceUrl} tip={tip} />,
      visual,
      <QuestionBox key="question" {...question} characterImg={characterImg} />,
    ],
    'question-first': [
      <QuestionBox key="question" {...question} characterImg={characterImg} />,
      visual,
      <TextBox key="text" text={text} sourceUrl={sourceUrl} tip={tip} />,
    ],
    'big-image': [
      <div key="visual" className="flex flex-col items-center">
        {visual}
      </div>,
      <div key="stack" className="flex flex-col gap-6 flex-1 max-w-lg">
        <QuestionBox {...question} characterImg={characterImg} />
        <TextBox text={text} sourceUrl={sourceUrl} tip={tip} />
      </div>,
    ],
  } as const;

  /* ───────────────────────── Render ──────────────────────────────── */
  return (
    <section className="py-16 px-6 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <h2 className="text-2xl font-semibold">{title}</h2>

        <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:items-start lg:text-left">
          {(renderOrder[order] ?? []).map((el) => el)}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Hilfs-Komponenten ─────────────────────── */

function TextBox({
  text,
  sourceUrl,
  tip,
}: {
  text: string;
  sourceUrl?: string;
  tip: string;
}) {
  return (
    <div className="w-full text-left">
      <p className="mb-4 text-base leading-relaxed">{text}</p>

      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-300 underline"
        >
          Quelle ansehen
        </a>
      )}

      {/* Tooltip unter der Quelle */}
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
