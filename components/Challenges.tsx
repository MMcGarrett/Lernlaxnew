export default function ChallengesSection() {
  return (
    <section
      id="challenges"
      className="min-h-screen w-full bg-[#2F403D] text-white px-6 md:px-20 py-12 flex flex-col"
    >
      {/* Titel oben */}
      <h2 className="text-3xl font-bold mb-16">
        Herausforderungen – die alltäglichen Probleme
      </h2>

      {/* Inhalt zentriert */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl">
          <div>
            <h3 className="font-bold text-lg">Dauerstress im Alltag</h3>
            <p className="mt-2">
              Immer mehr Studierende leiden unter anhaltendem Stress, der zu Erschöpfung und gesundheitlichen Problemen führt.
              Laut einer Umfrage der Techniker Krankenkasse fühlen sich 68 Prozent der Studierenden durch Stress erschöpft.
            </p>
            <a
              href="https://www.forschung-und-lehre.de/lehre/mehr-studierende-klagen-ueber-gesundheitliche-probleme-5729"
              className="text-blue-400 text-sm mt-1 inline-block underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quelle
            </a>

            <h3 className="font-bold text-lg mt-6">Zeitdruck durch Multitasking</h3>
            <p className="mt-2">
              Das gleichzeitige Erledigen mehrerer Aufgaben kann zu kognitiver Überlastung führen und die Produktivität mindern.
              Studien zeigen, dass Multitasking unter Zeitdruck die Effizienz beeinträchtigt.
            </p>
            <a
              href="https://www.welt.de/wirtschaft/webwelt/article245961336/Ablenkung-im-Job-Multitasking-killt-Produktivitaet-So-arbeiten-Sie-konzentriert.html"
              className="text-blue-400 text-sm mt-1 inline-block underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quelle
            </a>
          </div>

          <div>
            <h3 className="font-bold text-lg">Fehlender Ausgleich</h3>
            <p className="mt-2">
              Ein Mangel an Erholungsphasen kann die Konzentration und das Wohlbefinden erheblich beeinträchtigen.
              Regelmäßige Pausen und Entspannung sind daher essenziell für die geistige Gesundheit.
            </p>
            <a
              href="https://www.welt.de/sonderthemen/medizin-der-zukunft/article252614192/Burnout-erkennen-und-bekaempfen.html"
              className="text-blue-400 text-sm mt-1 inline-block underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quelle
            </a>

            <h3 className="font-bold text-lg mt-6">Soziale Überforderung</h3>
            <p className="mt-2">
              Zu viele soziale Verpflichtungen können zu Erschöpfung und einem Gefühl der Überforderung führen.
              Es ist wichtig, persönliche Grenzen zu erkennen und zu respektieren, um soziale Erschöpfung zu vermeiden.
            </p>
            <a
              href="https://studyflix.de/biologie/ueberforderung-7622"
              className="text-blue-400 text-sm mt-1 inline-block underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quelle
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
