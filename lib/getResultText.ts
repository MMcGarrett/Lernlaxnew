export function getResultText(questionId: string, selected: number): string {
  const texts: Record<string, string[]> = {
    sleep: [
      "Wenig Schlaf kann deine Konzentration und dein Wohlbefinden stark beeinträchtigen.",
      "Mit 6 bis 8 Stunden Schlaf pro Nacht liegst du im empfohlenen Bereich für Erwachsene. Diese Schlafdauer unterstützt deine kognitive Leistungsfähigkeit, fördert die Kreativität und hilft deinem Gehirn, neue Informationen effektiv zu verarbeiten.",
      "Mehr als 8 Stunden Schlaf können zwar erholsam sein, aber auf Dauer auch ein Zeichen von Erschöpfung oder Dysbalance sein. Achte auf einen regelmäßigen Rhythmus."
    ],
    food: [
      "Wenig Gemüse bedeutet, dass deinem Körper wichtige Nährstoffe fehlen, was Konzentration und Energielevel beeinträchtigen kann.",
      "5 Hände voll Gemüse täglich helfen dir, gesund und leistungsfähig zu bleiben – dein Körper wird es dir danken!",
      "Top! Mit 7 Händen Gemüse täglich versorgst du dich optimal mit Nährstoffen – weiter so!"
    ],
    sport: [
      "Bewegungsmangel erhöht das Risiko für Erkrankungen und mindert dein Wohlbefinden deutlich.",
      "Schon ab und zu Bewegung ist ein guter Anfang – bleib dran und integriere sie weiter in deinen Alltag.",
      "Super! Du bewegst dich regelmäßig und stärkst damit deinen Körper und Geist. Das verbessert nachweislich die Konzentrationsfähigkeit."
    ],
    zeitmanagement: [
      "Wenn du dich schlecht organisiert fühlst, kann das zu Stress, verpassten Deadlines und einem Ungleichgewicht führen.",
      "Du kommst ganz okay zurecht – es gibt vielleicht noch Verbesserungspotenzial mit Tools oder Routinen.",
      "Sehr gut! Du wirkst gut strukturiert und scheinst Studium und Alltag im Griff zu haben."
    ],
    family: [
      "Wenig Kontakt zu Freunden oder Familie kann auf Dauer dein Wohlbefinden stark beeinträchtigen.",
      "Du nimmst dir hin und wieder Zeit für dein soziales Umfeld – das ist wichtig!",
      "Toll! Du pflegst regelmäßig soziale Kontakte – das stärkt dich emotional und mental."
    ],
    werkstudent: [
      "Wenn du Job und Studium kaum unter einen Hut bekommst, kann das auf Dauer sehr belastend sein.",
      "Du meisterst beides meistens ganz gut – mit etwas Struktur kannst du es weiter verbessern.",
      "Super! Du scheinst Job und Studium souverän zu balancieren."
    ],
    duales_studium: [
      "Oft gestresst im dualen Studium? Vielleicht hilft dir ein klarer Plan oder Austausch mit Kommilitonen.",
      "Du strukturierst dein Studium ganz okay – kleine Optimierungen könnten helfen.",
      "Sehr gut! Du bist gut organisiert und scheinst Studium und Praxis unter Kontrolle zu haben."
    ],
    ausbildung: [
      "Du fühlst dich häufig überfordert – sprich offen mit Ausbilder:innen und nutze kleine Planungshilfen.",
      "Du kommst klar – das ist eine solide Basis für weiteres Wachstum.",
      "Alles easy – du scheinst deine Ausbildung souverän zu meistern."
    ],
    erholung_maenner: [
      "Wenn du dich kaum entspannen kannst, steigt das Risiko für Überlastung und Erschöpfung.",
      "Gelegentlich zur Ruhe kommen ist gut – versuche bewusster zu regenerieren.",
      "Regelmäßige Entspannung? Sehr gut! Damit schützt du dich aktiv vor Stress."
    ],
    erholung_frauen: [
      "Fast nie Zeit für dich selbst? Das kann auf Dauer zu innerer Erschöpfung führen.",
      "Ab und zu Momente der Selbstfürsorge – du bist auf einem guten Weg.",
      "Regelmäßige Selbstfürsorge – stark! Du gehst achtsam mit deinen Ressourcen um."
    ],
    erholung_divers: [
      "Oft überfordert? Dann sind bewusste Rückzugsräume besonders wichtig für dein inneres Gleichgewicht.",
      "Du bringst meist alles ganz gut unter einen Hut – achte auf regelmäßige Pausen.",
      "Läuft gut? Klasse! Du scheinst deinen Alltag gesund zu gestalten und dich zu stärken."
    ]
  };

  return texts[questionId]?.[selected] || '';
}
