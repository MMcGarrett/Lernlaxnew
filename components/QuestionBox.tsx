'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type QuestionBoxProps = {
  id: string;
  questionText: string;
  options: string[];
  characterImg?: string;
  onAnswer?: (answer: { questionId: string; selectedIndex: number }) => void;
};

type Props = {
  id: string;
  questionText: string;
  options: string[];
  characterImg?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  trigger?: boolean;
  onAnswer?: (answer: { questionId: string; selectedIndex: number }) => void;
};

function QuestionBox({
  id,
  questionText,
  options,
  characterImg,
  onAnswer,
}: QuestionBoxProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelected(index);
    if (onAnswer) {
      onAnswer({ questionId: id, selectedIndex: index });
    }
  };

  return (
    <div className="relative bg-[#1B1B1B] rounded-[2rem] p-6 pr-16 w-full max-w-sm shadow-lg">
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
              onClick={() => handleClick(index)}
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

export default function AnimatedQuestionBox({
  id,
  questionText,
  options,
  characterImg,
  direction = 'bottom',
  trigger = false,
  onAnswer,
}: Props) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    const off =
      direction === 'left'
        ? { x: -screenWidth, y: 0 }
        : direction === 'right'
        ? { x: screenWidth, y: 0 }
        : direction === 'top'
        ? { x: 0, y: -screenHeight }
        : { x: 0, y: screenHeight };

    setOffset(off);
  }, [direction]);

  const variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 1.3,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={trigger ? 'visible' : 'hidden'}
      variants={variants}
      className="relative w-full max-w-sm"
    >
      <QuestionBox
        id={id}
        questionText={questionText}
        options={options}
        characterImg={characterImg}
        onAnswer={onAnswer}
      />
    </motion.div>
  );
}
