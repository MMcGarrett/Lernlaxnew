import Image from "next/image";
import QuestionBox from "./QuestionBox";

type SectionModuleProps = {
  title: string;
  imageSrc: string;
  text: string;
  sourceUrl?: string;
  question: {
    id: string;
    questionText: string;
    options: string[];
  };
  order?: "image-first" | "text-first" | "question-first" | "big-image";
  characterImg?: string;
};


export default function SectionModule({
  title,
  imageSrc,
  text,
  sourceUrl,
  question,
  order = "image-first",
  characterImg,
}: SectionModuleProps) {
  const renderOrder = {
    "image-first": [
      <ImageBox key="image" src={imageSrc} />,
      <TextBox key="text" text={text} sourceUrl={sourceUrl} />,
      <QuestionBox key="question" {...question} characterImg={characterImg} />,
    ],
    "text-first": [
      <TextBox key="text" text={text} sourceUrl={sourceUrl} />,
      <ImageBox key="image" src={imageSrc} />,
      <QuestionBox key="question" {...question} characterImg={characterImg} />,
    ],
    "question-first": [
      <QuestionBox key="question" {...question} characterImg={characterImg} />,
      <ImageBox key="image" src={imageSrc} />,
      <TextBox key="text" text={text} sourceUrl={sourceUrl} />,
    ],
    "big-image": [
      <ImageBox key="image" src={imageSrc} large />,
      <div key="stack" className="flex flex-col gap-6 flex-1 max-w-lg">
        <QuestionBox {...question} characterImg={characterImg} />
        <TextBox text={text} sourceUrl={sourceUrl} />
      </div>,
    ],
  };

  return (
    <section className="py-16 px-6 text-white bg-[#324F4A]">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="flex flex-col lg:flex-row gap-10 lg:items-start items-center text-center lg:text-left">
          {(renderOrder[order] ?? []).map((element) => element)}
        </div>
      </div>
    </section>
  );
}

function TextBox({
  text,
  sourceUrl,
}: {
  text: string;
  sourceUrl?: string;
}) {
  return (
    <div className="text-left w-full">
      <p className="text-base leading-relaxed mb-4">{text}</p>
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
    </div>
  );
}

function ImageBox({
  src,
  large = false,
}: {
  src: string;
  large?: boolean;
}) {
  return (
    <div className="flex flex-shrink-0 w-full max-w-sm justify-center">

      <div
        className={`rounded-xl overflow-hidden shadow-lg w-full ${
          large ? "max-w-lg" : "max-w-sm"
        }`}
      >
        <Image
          src={src}
          alt="Thema Bild"
          width={large ? 600 : 400}
          height={large ? 400 : 300}
          className="object-cover w-full h-auto"
        />
      </div>
    </div>
  );
}
