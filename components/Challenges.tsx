import BlurText from "@/assets/BlurTest";
import SplitText from '../assets/SplitText';

export default function ChallengesSection() {
  return (
    <section
      id="challenges"
      className="min-h-screen w-full text-white px-6 md:px-20 py-12 flex flex-col"
    >
      {/* Titel oben */}
      <h2 className="text-3xl font-bold mb-16">
        Herausforderungen – die alltäglichen Probleme
      </h2>

      {/* Inhalt zentriert */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl">
          <div>
            <BlurText
              text="Dauerstress im Alltag"
              delay={30}
              animateBy="words"
              direction="top"
              className="font-bold text-lg"
            />
            <SplitText
              text="Immer mehr Studierende leiden unter anhaltendem Stress, der zu Erschöpfung und gesundheitlichen Problemen führt. Laut einer Umfrage der Techniker Krankenkasse fühlen sich 68 Prozent der Studierenden durch Stress erschöpft."
              className="mt-2"
              delay={15}
              duration={0.8}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: -40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
            <a
              href="https://www.forschung-und-lehre.de/lehre/mehr-studierende-klagen-ueber-gesundheitliche-probleme-5729"
              className="text-blue-400 text-sm mt-1 inline-block underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SplitText
                text="Quelle"
                className=""
                delay={50}
                duration={0.8}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </a>

            <BlurText
              text="Zeitdruck durch Multitasking"
              delay={30}
              animateBy="words"
              direction="top"
              className="font-bold text-lg"
            />
            <SplitText
              text="Das gleichzeitige Erledigen mehrerer Aufgaben kann zu kognitiver Überlastung führen und die Produktivität mindern. Studien zeigen, dass Multitasking unter Zeitdruck die Effizienz beeinträchtigt."
              className="mt-2"
              delay={15}
              duration={0.8}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: -40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
            <a
              href="https://www.welt.de/wirtschaft/webwelt/article245961336/Ablenkung-im-Job-Multitasking-killt-Produktivitaet-So-arbeiten-Sie-konzentriert.html"
              className="text-blue-400 text-sm mt-1 inline-block underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SplitText
                text="Quelle"
                className=""
                delay={50}
                duration={0.8}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </a>
          </div>

          <div>
            <BlurText
              text="Fehlender Ausgleich"
              delay={30}
              animateBy="words"
              direction="top"
              className="font-bold text-lg"
            />
            <SplitText
              text="Ein Mangel an Erholungsphasen kann die Konzentration und das Wohlbefinden erheblich beeinträchtigen.
              Regelmäßige Pausen und Entspannung sind daher essenziell für die geistige Gesundheit."
              className="mt-2"
              delay={15}
              duration={0.8}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: -40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
            <a
              href="https://www.welt.de/sonderthemen/medizin-der-zukunft/article252614192/Burnout-erkennen-und-bekaempfen.html"
              className="text-blue-400 text-sm mt-1 inline-block underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SplitText
                text="Quelle"
                className=""
                delay={50}
                duration={0.8}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </a>

            <BlurText
              text="Soziale Überforderung"
              delay={30}
              animateBy="words"
              direction="top"
              className="font-bold text-lg"
            />
            <SplitText
              text="Zu viele soziale Verpflichtungen können zu Erschöpfung und einem Gefühl der Überforderung führen.
              Es ist wichtig, persönliche Grenzen zu erkennen und zu respektieren, um soziale Erschöpfung zu vermeiden."
              className="mt-2"
              delay={15}
              duration={0.8}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: -40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
            <a
              href="https://studyflix.de/biologie/ueberforderung-7622"
              className="text-blue-400 text-sm mt-1 inline-block underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SplitText
                text="Quelle"
                className=""
                delay={50}
                duration={0.8}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
