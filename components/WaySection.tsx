'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import CharacterSelection from '@/components/CharacterSelection';
import SectionModule from '@/components/SectionModule';
import ScrollFreeze from './ScrollDeck';
import InteractiveGym from '@/components/InteractiveGym';
import InteractiveFridge from '@/components/InteractiveFridge';
import InteractiveSleep from '@/components/InteractiveSleep';
import InteractiveTodo from '@/components/InteractiveTodo';
import CartoonScrollChat from '@/components/CartoonScrollChat';

type SelectedCharacter = {
  id: string;
  gender: string;
  job: string;
};

type EvaluationItem = {
  questionId: string;
  questionText: string;
  selected: number;
};

export default function WaySection() {
  const [selectedCharacter, setSelectedCharacter] = useState<SelectedCharacter | null>(null);
  const [answers, setAnswers] = useState<{ [id: string]: number }>({});

  const handleAnswer = ({ questionId, selectedIndex }: { questionId: string; selectedIndex: number }) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedIndex }));
    console.log("Aktuelle Antworten:", answers);
  };

  const [result, setResult] = useState<EvaluationItem[] | null>(null);

  useEffect(() => {
    const sessionId = Cookies.get('quizSessionId');
    if (!sessionId) return;

    fetch(`/api/quiz/results?sessionId=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setResult(data.result);
      })
      .catch(console.error);
  }, []);


  
  return (
    <section>
      {/* ────────── Sprungmarke ────────── */}
      <div id="deinWeg" className="h-48 -mt-48 invisible" />

      {/* ────────── Charakterwahl ────────── */}
      <ScrollFreeze backgroundColor="#324F4A">
        <CharacterSelection onCharacterSelect={setSelectedCharacter} />
      </ScrollFreeze >
      
      {selectedCharacter && (
        <>
        <ScrollFreeze backgroundColor="#324F4A">
          <SectionModule
            title="Dein Weg – Schlaf"
            imageSrc="/images/placeholders/schlaf.png"
            text="Ausreichender Schlaf ist entscheidend für deine Konzentration, dein Gedächtnis und dein allgemeines Wohlbefinden. Studien zeigen, dass Schlafmangel die kognitive Leistungsfähigkeit beeinträchtigt und das Risiko für gesundheitliche Probleme erhöht. Achte darauf, regelmäßig 6 bis 8 Stunden pro Nacht zu schlafen, um fit und leistungsfähig zu bleiben."
            sourceUrl="https://www.spiegel.de/start/besser-schlafen-im-studium-warum-studierende-viel-schlafen-sollten-a-1f993392-c762-4fbe-b96c-e1f1cd300c3a"
            question={{
              id: "sleep",
              questionText: "Wie viel schläfst du?",
              options: ["unter 6 Stunden", "6 – 8 Stunden", "mehr als 8 Stunden"],
            }}
            order="big-image"
            characterImg={`/images/characters/${selectedCharacter.id}.png`}
            media={<InteractiveSleep />}
            onAnswer={handleAnswer}

          />
        </ScrollFreeze>

        {selectedCharacter.gender === "maennlich" && (
            <ScrollFreeze backgroundColor="#324F4A">
          <SectionModule
            title="Dein Weg – Erholung für Männer"
            imageSrc="/images/deinWeg/Mann.png"
            text="Viele Männer stehen unter Druck, Leistung zu bringen, im Job, beim Sport, im Studium. Anerkennung, Kontrolle und Erfolg sind oft zentrale Stressfaktoren. Wenn jedoch eine stressige Phase die nächste ablöst, fehlt dem Körper die Chance, sich zu regenerieren. Um langfristig leistungsfähig und gesund zu bleiben, sind bewusste Erholungsphasen entscheidend. Nutze deine freie Zeit gezielt, um abzuschalten, mit Hobbys, Bewegung oder einfach Ruhe. So findest du zurück in dein Gleichgewicht und schützt dich vor Überlastung."
            sourceUrl="https://www.maennergesundheitsportal.de/themen/psychische-gesundheit/"
            question={{
              id: "erholung_maenner",
              questionText: "Wie gut gelingt es dir, im Alltag zu entspannen?",
              options: [
                "Kaum",
                "Gelegentlich",
                "Regelmäßig"
              ],
            }}
            order="text-first"
            characterImg={`/images/characters/${selectedCharacter.id}.png`}
            onAnswer={handleAnswer}

            />
          </ScrollFreeze>
          )}
          {selectedCharacter.gender === "weiblich" && (
            <ScrollFreeze backgroundColor="#324F4A">
            <SectionModule
              title="Dein Weg – Erholung für Frauen"
              imageSrc="/images/deinWeg/Frau.png"
              text="Zwischen Job, Studium und gesellschaftlichen Erwartungen bleibt die eigene Erholung bei vielen Frauen oft auf der Strecke. Dauerhafte Mehrfachbelastung erhöht jedoch das Risiko für Erschöpfung, Angststörungen oder Burnout. Um langfristig gesund und leistungsfähig zu bleiben, ist es wichtig, sich Freiräume für Entspannung und Selbstfürsorge zu schaffen. Achte bewusst auf deine Bedürfnisse, nicht als Luxus, sondern als Voraussetzung für psychisches Wohlbefinden und innere Stabilität."
              sourceUrl="https://www.generali.at/blog/im-fokus/frauen-und-versicherungen/mentale-gesundheit-staerken-selbstfuersorge-fuer-frauen-in-einem-anspruchsvollen-alltag/"
              question={{
                id: "erholung_frauen",
                questionText: "Wie oft nimmst du dir bewusst Zeit für dich selbst?",
                options: [
                  "Fast nie",
                  "Ab und zu",
                  "Regelmäßig"
                ],
              }}
              order="big-image"
              characterImg={`/images/characters/${selectedCharacter.id}.png`}
              onAnswer={handleAnswer}
              />
            </ScrollFreeze>
          )}

          {selectedCharacter.gender === "divers" && (
            <ScrollFreeze backgroundColor="#324F4A">
            <SectionModule
              title="Dein Weg – Erholung für Diverse"
              imageSrc="/images/deinWeg/Divers.png"
              text="Menschen mit diverser Identität stehen oft vor besonderen Herausforderungen: gesellschaftliche Stigmata, fehlende Akzeptanz oder Diskriminierung können zu anhaltendem Stress führen, dem sogenannten Minderheitenstress. Umso wichtiger ist es, sich selbst Räume zu schaffen, in denen man zur Ruhe kommen und sich sicher fühlen kann. Ob Rückzug, kreative Entfaltung oder der Austausch mit vertrauten Personen, bewusste Erholungsphasen helfen, das emotionale Gleichgewicht zu bewahren und die eigene Identität zu stärken."
              sourceUrl="https://www.psychotherapie-rotter.at/2024/06/18/unterschiede-in-der-therapie-mit-m%C3%A4nnern-frauen-und-diversen-personen/"
              question={{
                id: "werkstudent",
                questionText: "Wie gut bekommst du alles unter einen Hut?",
                options: [
                  "Ich bin oft überfordert",
                  "Meistens klappt’s ganz gut",
                  "Es läuft gut bei mir"
                ],
              }}
              order="big-image"
              characterImg={`/images/characters/${selectedCharacter.id}.png`}
              onAnswer={handleAnswer}
              />
            </ScrollFreeze>
          )}

        <ScrollFreeze backgroundColor="#324F4A">
          <SectionModule
            title="Dein Weg – Ernährung"
            text="Eine ausgewogene Ernährung ist entscheidend für deine Konzentration, dein Energielevel und dein allgemeines Wohlbefinden. Studien zeigen, dass der regelmäßige Verzehr von Obst, Gemüse, Vollkornprodukten und Hülsenfrüchten die kognitive Leistungsfähigkeit unterstützt und das Risiko für gesundheitliche Probleme reduziert. Achte darauf, täglich mehrere Portionen dieser Lebensmittel in deinen Speiseplan zu integrieren, um fit und leistungsfähig zu bleiben."
            sourceUrl="https://www.iu.de/magazin/gesunde-ernaehrung-fuer-studierende/"
            question={{
              id: 'food',
              questionText: 'Wie viel Gemüse isst du?',
              options: ['3 Hände voll', '5 Hände voll', '7 Hände voll'],
            }}
            order="text-first"
            characterImg={`/images/characters/${selectedCharacter.id}.png`}
            media={<InteractiveFridge />} 
            onAnswer={handleAnswer}

            />
        </ScrollFreeze>

        <ScrollFreeze backgroundColor="#324F4A">
          <SectionModule
            title="Dein Weg – Bewegung/Sport"
            imageSrc="/images/placeholders/yoga.png"
            text="Regelmäßige körperliche Aktivität ist entscheidend für deine Konzentration, dein Energielevel und dein allgemeines Wohlbefinden. Studien zeigen, dass Bewegung die kognitive Leistungsfähigkeit verbessert und das Risiko für gesundheitliche Probleme reduziert. Achte darauf, regelmäßig Sport in deinen Alltag zu integrieren, um fit und leistungsfähig zu bleiben."
            sourceUrl="https://www.tum.de/aktuelles/alle-meldungen/pressemitteilungen/details/sport-verbessert-konzentration-und-lebensqualitaet"
            question={{
              id: "sport",
              questionText: "Wie oft machst du Sport?",
              options: ["nie", "unter 5 mal die Woche", "öfter als 5 mal die Woche"],
            }}
            order="big-image"
            characterImg={`/images/characters/${selectedCharacter.id}.png`}
            media={<InteractiveGym />}
            onAnswer={handleAnswer}

            />
          </ScrollFreeze>

          <ScrollFreeze backgroundColor="#324F4A">
          <SectionModule
            title="Dein Weg – Zeitmanagement"
            imageSrc="/images/placeholders/zeitmanagement.png"
            text="Ein effektives Zeitmanagement ist entscheidend, um Studium, Arbeit und Freizeit in Einklang zu bringen. Durch den Einsatz von Methoden wie der Eisenhower-Matrix oder der Pomodoro-Technik kannst du deine Aufgaben besser priorisieren und konzentrierter arbeiten. Regelmäßige Pausen und realistische Zielsetzungen helfen dabei, Überforderung zu vermeiden und die Produktivität zu steigern. So behältst du den Überblick und erreichst deine Ziele effizienter."
            sourceUrl="https://www.studiwork.com/studium/effektives-zeitmanagement-im-studium-tipps-und-strategien-fuer-einen-ausgewogenen-alltag/"
            question={{
              id: "zeitmanagement",
              questionText: "Wie organisiert bist du?",
              options: ["Schlecht", "Mittelmäßig", "Gut"],
            }}
            order="question-first"
            characterImg={`/images/characters/${selectedCharacter.id}.png`}
            media={<InteractiveTodo />}
            onAnswer={handleAnswer}

            />
          </ScrollFreeze>
          
          <ScrollFreeze backgroundColor="#324F4A">
          <SectionModule
            title="Dein Weg – Freunde & Familie"
            imageSrc="/images/placeholders/family.png"
            text="Ein stabiles soziales Umfeld mit Freunden und Familie ist entscheidend für dein Wohlbefinden und deine psychische Gesundheit. Der Austausch mit vertrauten Personen bietet emotionalen Rückhalt, hilft beim Stressabbau und fördert die Motivation im Studium. Regelmäßige Treffen oder Gespräche mit deinen Liebsten können dir helfen, den Kopf freizubekommen und neue Energie zu tanken. Eine ausgewogene Balance zwischen Studium und sozialen Kontakten trägt dazu bei, dass du dich gelassener fühlst und den Studienalltag entspannter angehen kannst."
            sourceUrl="https://www.phwt.de/study-life-balance/15555/"
            question={{
              id: "family",
              questionText: "Wie viel Zeit nimmst du dir für Freunde und Familie?",
              options: ["Weniger als 6h die Woche", "Zwischen 6 - 12h die Woche", "Über 12h Stunden die Woche"],
            }}
            order="text-first"
            characterImg={`/images/characters/${selectedCharacter.id}.png`}
            media={<CartoonScrollChat className="mx-auto" />}
            hideTipBox 
            onAnswer={handleAnswer}
            

            />
          </ScrollFreeze>

          {selectedCharacter.job === "werkstudent" && (
            <ScrollFreeze backgroundColor="#324F4A">
            <SectionModule
              title="Dein Weg – Werkstudenten und das Studium"
              imageSrc="/images/deinWeg/Werkstudent.png"
              text="Studieren und gleichzeitig arbeiten, dass kann herausfordernd sein, bringt dir aber auch wertvolle Erfahrungen. Ein Werkstudierendenjob hilft dir, dein theoretisches Wissen praktisch anzuwenden, Eigenverantwortung zu übernehmen und neue Fähigkeiten zu entwickeln. Achte auf gute Organisation und Kommunikation: Ein flexibler Arbeitgeber, klare Prioritäten und regelmäßiges Feedback machen es leichter, Uni und Job in Balance zu bringen. So wächst du mit deinen Aufgaben, fachlich und persönlich."
              sourceUrl="https://www.inform-software.com/de/blog/karriere/tipps-und-tricks-fuer-deinen-werkstudent-innen-job"
              question={{
                id: "werkstudent",
                questionText: "Wie gut bekommst du Studium und Werkstudierendenjob unter einen Hut?",
                options: [
                  "Garnicht gut",
                  "So naja",
                  "Ganz gut"
                ],
              }}
              order="big-image"
              characterImg={`/images/characters/${selectedCharacter.id}.png`}
              onAnswer={handleAnswer}
              />
                <div className="flex justify-center py-10">
                <button
                  className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition"
                  onClick={async () => {
                    const payload = Object.entries(answers).map(([questionId, selectedIndex]) => ({
                      questionId,
                      selectedIndex,
                    }));

                    const res = await fetch('/api/quiz/save', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ answers: payload }),
                    });

                    if (res.ok) {
                      const data = await res.json();
                      Cookies.set('quizSessionId', data.session.id); // falls du’s auch im Client brauchst
                      alert('Antworten erfolgreich gespeichert!');

                      const resultRes = await fetch(`/api/quiz/results?sessionId=${data.session.id}`);
                      const resultData = await resultRes.json();
                      if (resultData.result) setResult(resultData.result);
                    } else {
                      alert('Fehler beim Speichern');
                    }
                  }}
                >
                  Antworten speichern
                </button>
              </div>
            </ScrollFreeze>
          )}

          {selectedCharacter.job === "dual" && (
            <ScrollFreeze backgroundColor="#324F4A">
            <SectionModule
              title="Dein Weg – Duales Studium"
              imageSrc="/images/deinWeg/Dualesstudium.png"
              text="Ein duales Studium bringt Theorie und Praxis perfekt zusammen, aber auch eine hohe Doppelbelastung mit sich. Umso wichtiger ist eine gute Organisation. Lernpläne, klare Prioritäten und der Austausch mit anderen helfen dir, den Überblick zu behalten. Nutze Lerngruppen, um motiviert zu bleiben, und sprich offen mit deinem Praxisbetrieb über stressige Phasen. So findest du deinen Rhythmus und meisterst Studium und Job erfolgreich im Team."
              sourceUrl="https://karriereblog.tk.de/dual-studierende/lerntipps-fuer-dual-studierende-so-rockst-du-studium-und-job/"
              question={{
                id: "duales_studium",
                questionText: "Wie gut gelingt es dir, dein duales Studium zu strukturieren?",
                options: [
                  "Ich bin oft gestresst",
                  "Es klappt ganz okay",
                  "Ich bin gut strukturiert"
                ],
              }}
              order="big-image"
              characterImg={`/images/characters/${selectedCharacter.id}.png`}
              onAnswer={handleAnswer}
              />
                <div className="flex justify-center py-10">
                <button
                  className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition"
                  onClick={async () => {
                    const payload = Object.entries(answers).map(([questionId, selectedIndex]) => ({
                      questionId,
                      selectedIndex,
                    }));

                    const res = await fetch('/api/quiz/save', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ answers: payload }),
                    });

                    if (res.ok) {
                      const data = await res.json();
                      Cookies.set('quizSessionId', data.session.id); // falls du’s auch im Client brauchst
                      alert('Antworten erfolgreich gespeichert!');

                      const resultRes = await fetch(`/api/quiz/results?sessionId=${data.session.id}`);
                      const resultData = await resultRes.json();
                      if (resultData.result) setResult(resultData.result);
                    } else {
                      alert('Fehler beim Speichern');
                    }
                  }}
                >
                  Antworten speichern
                </button>
              </div>
            </ScrollFreeze>
          )}

          {selectedCharacter.job === "azubi" && (
            <ScrollFreeze backgroundColor="#324F4A">
            <SectionModule
              title="Dein Weg – Ausbildung"
              imageSrc="/images/deinWeg/Azubi.png"
              text="Gerade in der Anfangszeit kann die Ausbildung ganz schön herausfordernd sein: neue Aufgaben, viele Anweisungen und ein volles Tagespensum. Gute Selbstorganisation ist deshalb der Schlüssel. Setze klare Prioritäten, arbeite mit To-do-Listen und sprich offen an, wenn dir etwas zu viel wird. Plane deine Aufgaben realistisch, frage rechtzeitig nach und arbeite Schritt für Schritt. So behältst du den Überblick und gewinnst an Selbstvertrauen und Struktur im Berufsalltag."
              sourceUrl="https://www.deutsche-handwerks-zeitung.de/selbstorganisation-sieben-tipps-fuer-azubis-145921/"
              question={{
                id: "ausbildung",
                questionText: "Wie gut kommst du mit den Aufgaben in deiner Ausbildung zurecht?",
                options: [
                  "Ich bin oft überfordert",
                  "Ich komme klar",
                  "Alles easy"
                ],
              }}
              order="big-image"
              characterImg={`/images/characters/${selectedCharacter.id}.png`}
              onAnswer={handleAnswer}
              />
                <div className="flex justify-center py-10">
                <button
                  className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition"
                  onClick={async () => {
                    const payload = Object.entries(answers).map(([questionId, selectedIndex]) => ({
                      questionId,
                      selectedIndex,
                    }));

                    const res = await fetch('/api/quiz/save', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ answers: payload }),
                    });

                    if (res.ok) {
                      const data = await res.json();
                      Cookies.set('quizSessionId', data.session.id); // falls du’s auch im Client brauchst
                      alert('Antworten erfolgreich gespeichert!');

                      const resultRes = await fetch(`/api/quiz/results?sessionId=${data.session.id}`);
                      const resultData = await resultRes.json();
                      if (resultData.result) setResult(resultData.result);
                    } else {
                      alert('Fehler beim Speichern');
                    }
                  }}
                >
                  Antworten speichern
                </button>
              </div>
            </ScrollFreeze>
          )}
        </>
      )}
      {result && (
        <ScrollFreeze>
          <div className="bg-[#324F4A] py-20 px-6 text-white">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Dein Weg – Auswertung</h2>

              {/* Balken-Auswertung */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {result.map(({ questionText, selected }, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{questionText}</span>
                      <span>
                        {selected === 0
                          ? 'Schwach'
                          : selected === 1
                          ? 'Okay'
                          : 'Gut'}
                      </span>
                    </div>
                    <div className="w-full bg-white/30 h-4 rounded-full overflow-hidden">
                      <div
                        className={`h-4 ${
                          selected === 0
                            ? 'bg-red-500 w-1/3'
                            : selected === 1
                            ? 'bg-yellow-500 w-2/3'
                            : 'bg-green-500 w-full'
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nachricht an dich */}
              <div className="text-white space-y-6 text-left text-sm leading-relaxed max-w-3xl mx-auto">
                <h3 className="text-xl font-semibold">Unsere Nachricht an Dich</h3>
                <p>
                  Mit 6 bis 8 Stunden Schlaf pro Nacht liegst du im empfohlenen Bereich für Erwachsene. Diese Schlafdauer unterstützt deine kognitive Leistungsfähigkeit, fördert die Kreativität und hilft deinem Gehirn, neue Informationen effektiv zu verarbeiten. Ein regelmäßiger Schlafrhythmus ist dabei besonders wichtig.
                  Wenn du täglich sieben Hände voll Gemüse zu dir nimmst, versorgst du deinen Körper optimal mit essenziellen Nährstoffen. Diese hohe Gemüsezufuhr kann deine Konzentration, dein Gedächtnis und dein allgemeines Wohlbefinden erheblich verbessern.
                  Wenn du keinen Sport treibst, verpasst du die zahlreichen gesundheitlichen Vorteile regelmäßiger körperlicher Aktivität. Bewegungsmangel erhöht das Risiko für verschiedene Erkrankungen und kann sich negativ auf dein Wohlbefinden auswirken.
                  Wenn du dich schlecht organisiert fühlst, kann das zu Stress, verpassten Deadlines und einem Ungleichgewicht zwischen Studium, Arbeit und Freizeit führen. Digitale Tools wie Kalender-Apps und To-do-Listen unterstützen dich dabei, deine Aufgaben effizient zu verwalten.
                  Wenn du wenig Kontakt zu Freunden oder Familie hast, kann das zu einem Gefühl der Isolation führen und deine Study Life Balance beeinträchtigen. Es ist wichtig, bewusst Zeit für soziale Kontakte einzuplanen.
                </p>
              </div>
            </div>
          </div>
        </ScrollFreeze>
      )}

    </section>
  );
}
