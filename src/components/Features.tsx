import { Check } from "lucide-react";
import type { ComponentType } from "react";
import { cn } from "../lib/cn";
import { STAGGER } from "../lib/motion";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { BookingVisual } from "./visuals/BookingVisual";
import { RemindersVisual } from "./visuals/RemindersVisual";
import { TeamVisual } from "./visuals/TeamVisual";

type Feature = {
  numero: string;
  eyebrow: string;
  titulo: string;
  lead: string;
  bullets: string[];
  Visual: ComponentType;
};

const features: Feature[] = [
  {
    numero: "01",
    eyebrow: "Reservas online",
    titulo: "Tus pacientes reservan solos, a cualquier hora",
    lead:
      "Compartís un link —o lo ponés en Instagram y Google— y cada paciente elige profesional, motivo y horario entre los espacios reales de tu agenda. Sin llamadas, sin idas y vueltas.",
    bullets: [
      "Disponibilidad siempre actualizada, sin sobreturnos accidentales",
      "Duración y preparación configuradas por práctica, no genéricas",
      "Confirmación instantánea para el paciente y para tu equipo",
    ],
    Visual: BookingVisual,
  },
  {
    numero: "02",
    eyebrow: "Recordatorios automáticos",
    titulo: "Las ausencias bajan sin que persigas a nadie",
    lead:
      "Turnera manda el recordatorio por WhatsApp o email en el momento justo, y el paciente confirma o reprograma con un toque. Los huecos se liberan a tiempo para otra persona.",
    bullets: [
      "Recordatorio 24 horas y 2 horas antes, configurable",
      "Reprogramación sin llamadas: el paciente elige otro horario solo",
      "Lista de espera automática que llena las cancelaciones",
    ],
    Visual: RemindersVisual,
  },
  {
    numero: "03",
    eyebrow: "Equipo y reportes",
    titulo: "Toda la clínica en una sola agenda",
    lead:
      "Vista por profesional, por consultorio o por día. Bloqueos, francos y sobreturnos con reglas claras, y reportes que muestran dónde se pierde tiempo y dónde hay lugar para crecer.",
    bullets: [
      "Agenda compartida con permisos por rol",
      "Ocupación, ausencias e ingresos por profesional",
      "Exportás todo cuando quieras: tus datos son tuyos",
    ],
    Visual: TeamVisual,
  },
];

export function Features() {
  return (
    <section id="producto" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="El producto"
          title="Tres cosas, muy bien hechas"
          lead="Turnera no intenta ser el sistema que hace todo. Ordena la agenda, baja las ausencias y te muestra cómo trabaja tu equipo."
        />

        <div className="mt-16 flex flex-col gap-20 sm:mt-20 sm:gap-28">
          {features.map((feature, i) => {
            const invertido = i % 2 === 1;
            return (
              <div
                key={feature.numero}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20"
              >
                <div className={cn(invertido && "lg:order-2")}>
                  <Reveal>
                    <p
                      aria-hidden="true"
                      className="font-display text-6xl leading-none font-medium italic text-line select-none"
                    >
                      {feature.numero}
                    </p>
                    <p className="mt-4 text-[0.8125rem] font-semibold tracking-[0.14em] uppercase text-accent">
                      {feature.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-title font-semibold text-balance">
                      {feature.titulo}
                    </h3>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted sm:text-base text-pretty">
                      {feature.lead}
                    </p>
                  </Reveal>
                  <ul className="mt-6 flex flex-col gap-3">
                    {feature.bullets.map((bullet, j) => (
                      <Reveal key={bullet} delay={STAGGER * (j + 1)}>
                        <li className="flex items-start gap-3">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft">
                            <Check
                              className="size-3 text-accent"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="text-sm text-ink sm:text-[0.9375rem]">
                            {bullet}
                          </span>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                </div>

                <Reveal
                  delay={STAGGER}
                  y={24}
                  className={cn(invertido && "lg:order-1")}
                >
                  <feature.Visual />
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
