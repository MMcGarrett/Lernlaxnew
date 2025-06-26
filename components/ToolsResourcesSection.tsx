import React from "react";

export default function ToolsResourcesSection() {
  return (
    <>
      {/* Navbar Marker für „Tools & Ressourcen“ */}
      <div id="section-4" className="h-48 -mt-48 invisible" />

      <section className="min-h-screen w-full text-white px-6 md:px-20 py-12 flex flex-col">
        {/* Titel oben links */}
        <h2 className="text-3xl font-bold mb-16">
          Tools & Ressourcen – Weitere Links und Quellen
        </h2>

        {/* Inhalt zentriert im Bereich */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-16 max-w-6xl">
            {/* Eisenhower-Matrix */}
            <div>
              <h3 className="font-bold text-lg mb-2">Eisenhower–Matrix</h3>
              <p className="mb-2">
                Die Eisenhower-Matrix ist eine Methode des Selbst- und Zeitmanagements zur effizienten Priorisierung von Aufgaben.
                Sie unterteilt Aufgaben anhand der Kriterien Wichtigkeit (wichtig/nicht wichtig) und Dringlichkeit (dringend/nicht dringend).
              </p>
              <a
                href="https://www.orghandbuch.de/Webs/OHB/DE/OrganisationshandbuchNEU/4_MethodenUndTechniken/Methoden_A_bis_Z/Eisenhower_Matrix/Eisenhower_Matrix_node.html"
                className="text-green-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link zu einer Erklärung
              </a>
            </div>

            {/* Pomodoro-Technik */}
            <div>
              <h3 className="font-bold text-lg mb-2">Pomodoro–Technik</h3>
              <p className="mb-2">
                Dies ist eine Zeitmanagement-Methode, bei der du 25 Minuten konzentriert arbeitest, gefolgt von einer 5-minütigen Pause.
                Nach vier solcher Intervalle machst du eine längere Pause von 15 bis 30 Minuten. Diese Struktur hilft dir, fokussiert zu bleiben
                und deine Produktivität zu steigern.
              </p>
              <a
                href="https://studyflix.de/jobs/karriere-tipps/pomodoro-technik-6190"
                className="text-green-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link zu einer Erklärung
              </a>
            </div>

            {/* Sport-Tipps */}
            <div>
              <h3 className="font-bold text-lg mb-2">Tipps um mehr Sport zu machen</h3>
              <p className="mb-2">
                Setze dir erreichbare Ziele, dokumentiere deine Fortschritte, höre motivierende Musik beim Training und belohne dich nach dem Sport,
                so bleibst du motiviert und machst Bewegung zur Gewohnheit.
              </p>
              <a
                href="https://jonasisstgesund.de/tipps-fur-sport-motivation/"
                className="text-green-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link zu weiteren Tipps
              </a>
            </div>

            {/* Ernährung-Tipps */}
            <div>
              <h3 className="font-bold text-lg mb-2">Tipps zu gesunder Ernährung</h3>
              <p className="mb-2">
                Plane deine Mahlzeiten, integriere regelmäßig Gemüse und Vollkornprodukte, und achte auf saisonale Lebensmittel –
                so gelingt gesunde Ernährung auch im stressigen Studienalltag.
              </p>
              <a
                href="https://hochschulinitiative-deutschland.de/blog/tipps-fuer-ein-healthylife-guenstige-und-gesunde-ernaehrung-fuer-studenten"
                className="text-green-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link zu weiteren Tipps
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
