'use client';

import BlurText from '@/assets/BlurTest';
import { useEffect, useState } from 'react';

type CharacterSelectionProps = {
  onCharacterSelect: (characterName: string) => void;
};


const characters = [
  {
    id:"tom",
    name: 'Tom der Student',
    img: '/images/characters/tom.png',
    gender: 'maennlich',
    description:
      'Tom studiert im Vollzeitstudium an einer Universität. Neben den Vorlesungen arbeitet er als Werkstudent, um sich sein Studium zu finanzieren.',
  },
  {
    id:"luca",
    name: 'Luca der Azubi',
    img: '/images/characters/luca.png',
    gender: 'maennlich',
    description:
      'Luca ist in einer Ausbildung und steht täglich im Betrieb, während er regelmäßig die Berufsschule besucht.',
  },
  {
    id:"max",
    name: 'Max der Duale Student',
    img: '/images/characters/max.png',
    gender: 'maennlich',
    description:
      'Max macht ein duales Studium und wechselt zwischen Vorlesungen und intensiven Arbeitsphasen im Unternehmen.',
  },
  {
    id:"tanja",
    name: 'Tanja die Studentin',
    img: '/images/characters/tanja.png',
    gender: 'weiblich',
    description:
      'Tanja studiert im Vollzeitstudium an einer Universität. Neben den Vorlesungen arbeitet sie als Werkstudentin, um sich ihr Studium zu finanzieren.',
  },
  {
    id:"maren",
    name: 'Maren die Duale Studentin',
    img: '/images/characters/maren.png',
    gender: 'weiblich',
    description:
      'Maren macht ein duales Studium und wechselt zwischen Vorlesungen und intensiven Arbeitsphasen im Unternehmen.',
  },
  {
    id:"lisa",
    name: 'Lisa die Auszubildende',
    img: '/images/characters/lisa.png',
    gender: 'weiblich',
    description:
      'Lisa ist in einer Ausbildung und steht täglich im Betrieb, während sie regelmäßig die Berufsschule besucht.',
  },
];

export default function CharacterSelection({ onCharacterSelect }: CharacterSelectionProps) {
  const [selectedGender, setSelectedGender] = useState<'weiblich' | 'divers' | 'maennlich'>('maennlich');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [shakeStates, setShakeStates] = useState<boolean[]>(
    new Array(characters.length).fill(false)
  );

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    characters.forEach((_, index) => {
      const loop = () => {
        const delay = Math.random() * 2000 + 3000;
        timers[index] = setTimeout(() => {
          setShakeStates((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });

          setTimeout(() => {
            setShakeStates((prev) => {
              const updated = [...prev];
              updated[index] = false;
              return updated;
            });
            loop();
          }, 400);
        }, delay);
      };
      loop();
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    const selectedName = characters[index].id;
    onCharacterSelect(selectedName);
  };

  const filteredCharacters = characters.filter((char) => {
    if (selectedGender === 'divers') {
      return ['Tanja die Studentin', 'Maren die Duale Studentin', 'Luca der Azubi'].includes(char.name);
    }
    return char.gender === selectedGender;
  });

  return (
  <section className="min-h-screen w-full text-white px-6 flex items-center justify-center">
    <div className="w-full max-w-6xl mx-auto text-center">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4">
          <BlurText
            text="Wer passt am besten zu dir?"
            delay={30}
            animateBy="words"
            direction="top"
            className="text-2xl md:text-3xl font-semibold text-center md:text-left"
          />
          <div className="flex justify-center md:justify-end">
            <div className="flex bg-white/10 rounded-full p-1 space-x-2">
              {[
                { label: 'Weiblich', val: 'weiblich' },
                { label: 'Divers', val: 'divers' },
                { label: 'Männlich', val: 'maennlich' },
              ].map(({ label, val }) => (
                <button
                  key={val}
                  onClick={() => {
                    setSelectedGender(val as 'weiblich' | 'divers' | 'maennlich');
                    setSelectedIndex(null); // Reset Auswahl bei Wechsel
                  }}
                  className={`px-4 py-1 rounded-full text-sm font-medium capitalize transition-colors ${
                    selectedGender === val
                      ? 'bg-white text-[#324F4A]'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {filteredCharacters.map((char) => {
            const originalIndex = characters.findIndex(c => c.name === char.name);

            return (
              <div
                key={char.name}
                onClick={() => handleSelect(originalIndex)}
                className={`group flex flex-col items-center text-center cursor-pointer p-4 rounded-xl transition-all duration-300 ${
                  selectedIndex === originalIndex
                    ? 'bg-white/10 ring-2 ring-white scale-105'
                    : 'hover:bg-white/5'
                }`}
              >
                <img
                  src={char.img}
                  alt={char.name}
                  className={`w-28 h-28 rounded-full transition-transform duration-300 ${
                    shakeStates[originalIndex] ? 'animate-shake' : ''
                  }`}
                />
                <h3 className="text-lg font-semibold my-2">{char.name}</h3>
                <div
                  className={`transition-opacity duration-500 bg-[#BEE6FB] text-[#1f1f1f] rounded-xl px-6 py-4 max-w-xs shadow-md ${
                    selectedIndex === originalIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{char.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
