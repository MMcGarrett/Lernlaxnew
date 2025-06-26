'use client';

import { useState } from "react";
import CharacterSelection from "@/components/CharacterSelection";
import SectionModule from "@/components/SectionModule";
import ScrollSection from "./ScrollDeck";

interface WaySectionProps {
  selectedCharacter: string | null;
  onCharacterSelect: (character: string) => void;
}

export default function WaySection({ selectedCharacter, onCharacterSelect }: WaySectionProps) {
  return (
    <section>
      <div id="deinWeg" className="h-48 -mt-48 invisible" />
      <ScrollSection>
        <CharacterSelection onCharacterSelect={onCharacterSelect} />
      </ScrollSection>
      
      {selectedCharacter && (
        <>
        <ScrollSection>
          <SectionModule
            title="Dein Weg – Schlaf"
            imageSrc="/images/placeholders/schlaf.png"
            text="Ausreichender Schlaf ist entscheidend für deine Konzentration, dein Gedächtnis und dein allgemeines Wohlbefinden..."
            sourceUrl="https://www.spiegel.de/start/besser-schlafen-im-studium-warum-studierende-viel-schlafen-sollten-a-1f993392-c762-4fbe-b96c-e1f1cd300c3a"
            question={{
              id: "sleep",
              questionText: "Wie viel schläfst du?",
              options: ["unter 6 Stunden", "6 – 8 Stunden", "mehr als 8 Stunden"],
            }}
            order="big-image"
            characterImg={`/images/characters/${selectedCharacter}.png`}
          />
        </ScrollSection>

          <SectionModule
            title="Dein Weg – Ernährung"
            imageSrc="/images/placeholders/ernaehrung.png"
            text="Eine ausgewogene Ernährung ist entscheidend für deine Konzentration..."
            sourceUrl="https://www.iu.de/magazin/gesunde-ernaehrung-fuer-studierende/"
            question={{
              id: "food",
              questionText: "Wie viel Gemüse isst du?",
              options: ["3 Hände voll", "5 Hände voll", "7 Hände voll"],
            }}
            order="text-first"
            characterImg={`/images/characters/${selectedCharacter}.png`}
          />

          <SectionModule
            title="Dein Weg – Bewegung/Sport"
            imageSrc="/images/placeholders/yoga.png"
            text="Regelmäßige körperliche Aktivität ist entscheidend..."
            sourceUrl="https://www.tum.de/aktuelles/alle-meldungen/pressemitteilungen/details/sport-verbessert-konzentration-und-lebensqualitaet"
            question={{
              id: "sport",
              questionText: "Wie oft machst du Sport?",
              options: ["nie", "unter 5 mal die Woche", "öfter als 5 mal die Woche"],
            }}
            order="big-image"
            characterImg={`/images/characters/${selectedCharacter}.png`}
          />

          <SectionModule
            title="Dein Weg – Zeitmanagement"
            imageSrc="/images/placeholders/zeitmanagement.png"
            text="Ein effektives Zeitmanagement ist entscheidend..."
            sourceUrl="https://www.studiwork.com/studium/effektives-zeitmanagement-im-studium-tipps-und-strategien-fuer-einen-ausgewogenen-alltag/"
            question={{
              id: "zeitmanagement",
              questionText: "Wie organisiert bist du?",
              options: ["Schlecht", "Mittelmäßig", "Gut"],
            }}
            order="question-first"
            characterImg={`/images/characters/${selectedCharacter}.png`}
          />

          <SectionModule
            title="Dein Weg – Freunde & Familie"
            imageSrc="/images/placeholders/family.png"
            text="Ein stabiles soziales Umfeld mit Freunden und Familie ist entscheidend..."
            sourceUrl="https://www.phwt.de/study-life-balance/15555/"
            question={{
              id: "family",
              questionText: "Wie viel Zeit nimmst du dir für Freunde und Familie?",
              options: ["Weniger als 6h die Woche", "Zwischen 6 - 12h die Woche", "Über 12h Stunden die Woche"],
            }}
            order="text-first"
            characterImg={`/images/characters/${selectedCharacter}.png`}
          />
        </>
      )}
    </section>
  );
}
