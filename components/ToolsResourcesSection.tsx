import BlurText from "@/assets/BlurTest";
import React from "react";
import SplitText from '../assets/SplitText';


export default function ToolsResourcesSection() {
  return (
    <>
      {/* Navbar Marker für „Tools & Ressourcen“ */}
      <div id="section-4" className="h-48 -mt-48 invisible" />

      <section className="min-h-screen w-full text-white px-6 md:px-20 py-12 flex flex-col">
        {/* Titel oben links */}
        <BlurText
          text="Tools & Ressourcen – Weitere Links und Quellen"
          delay={30}
          animateBy="words"
          direction="top"
          className="text-3xl font-bold mb-16"
        />

        {/* Inhalt zentriert im Bereich */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-16 max-w-6xl">
            {/* Eisenhower-Matrix */}
            <div>
              <BlurText
                text="Eisenhower–Matrix"
                delay={30}
                animateBy="words"
                direction="top"
                className="font-bold text-lg mb-2"
              />
              <SplitText
                text="Die Eisenhower-Matrix ist eine Methode des Selbst- und Zeitmanagements zur effizienten Priorisierung von Aufgaben. Sie unterteilt Aufgaben anhand der Kriterien Wichtigkeit (wichtig/nicht wichtig) und Dringlichkeit (dringend/nicht dringend)."
                className="mb-2"
                delay={50}
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: -40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
              <a
                href="https://www.orghandbuch.de/Webs/OHB/DE/OrganisationshandbuchNEU/4_MethodenUndTechniken/Methoden_A_bis_Z/Eisenhower_Matrix/Eisenhower_Matrix_node.html"
                className="text-green-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SplitText
                  text="Link zu einer Erklärung"
                  className=""
                  delay={50}
                  duration={0.6}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, y: -40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                />
              </a>
            </div>

            {/* Pomodoro-Technik */}
            <div>
              <BlurText
                text="Pomodoro–Technik"
                delay={30}
                animateBy="words"
                direction="top"
                className="font-bold text-lg mb-2"
              />
              <SplitText
                text="Dies ist eine Zeitmanagement-Methode, bei der du 25 Minuten konzentriert arbeitest, gefolgt von einer 5-minütigen Pause. Nach vier solcher Intervalle machst du eine längere Pause von 15 bis 30 Minuten. Diese Struktur hilft dir, fokussiert zu bleiben und deine Produktivität zu steigern."
                className="mb-2"
                delay={50}
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: -40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
              <a
                href="https://studyflix.de/jobs/karriere-tipps/pomodoro-technik-6190"
                className="text-green-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SplitText
                  text="Link zu einer Erklärung"
                  className=""
                  delay={50}
                  duration={0.6}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, y: -40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                />
              </a>
            </div>

            {/* Sport-Tipps */}
            <div>
              <BlurText
                text="Tipps um mehr Sport zu machen"
                delay={30}
                animateBy="words"
                direction="top"
                className="font-bold text-lg mb-2"
              />
              <SplitText
                text="Setze dir erreichbare Ziele, dokumentiere deine Fortschritte, höre motivierende Musik beim Training und belohne dich nach dem Sport, so bleibst du motiviert und machst Bewegung zur Gewohnheit."
                className="mb-2"
                delay={50}
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: -40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
              <a
                href="https://jonasisstgesund.de/tipps-fur-sport-motivation/"
                className="text-green-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SplitText
                  text="Link zu weiteren Tipps"
                  className=""
                  delay={50}
                  duration={0.6}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, y: -40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                />
              </a>
            </div>

            {/* Ernährung-Tipps */}
            <div>
              <BlurText
                text="Tipps zu gesunder Ernährung"
                delay={30}
                animateBy="words"
                direction="top"
                className="font-bold text-lg mb-2"
              />
              <SplitText
                text="Plane deine Mahlzeiten, integriere regelmäßig Gemüse und Vollkornprodukte, und achte auf saisonale Lebensmittel, so gelingt gesunde Ernährung auch im stressigen Studienalltag."
                className="mb-2"
                delay={50}
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: -40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
              <a
                href="https://hochschulinitiative-deutschland.de/blog/tipps-fuer-ein-healthylife-guenstige-und-gesunde-ernaehrung-fuer-studenten"
                className="text-green-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SplitText
                  text="Link zu weiteren Tipps"
                  className=""
                  delay={50}
                  duration={0.6}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, y: -40 }}
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
    </>
  );
}
