'use client';

import { useState } from "react";
import Image from "next/image";

type QuestionBoxProps = {
  id: string;
  questionText: string;
  options: string[];
  characterImg?: string;
};


export default function QuestionBox({
  id,
  questionText,
  options,
  characterImg,
}: QuestionBoxProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="relative bg-[#1B1B1B] rounded-[2rem] p-6 pr-16 w-full max-w-sm shadow-lg">
      {/* Character Bild oben rechts */}
      {characterImg && (
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={characterImg}
            alt="Charakter"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      )}

      <p className="mb-4 font-medium text-lg">{questionText}</p>
      <ul className="space-y-2">
        {options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => setSelected(index)}
              className={`w-full text-left px-4 py-2 rounded-full border transition-colors ${
                selected === index
                  ? "bg-white text-[#2F403D] font-semibold"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
