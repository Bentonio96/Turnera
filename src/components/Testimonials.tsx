import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { cn } from "../lib/cn";
import { DUR, EASE, STAGGER } from "../lib/motion";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

type Testimonio = {
  cita: string;
  nombre: string;
  rol: string;
  clinica: string;
  iniciales: string;
};

const testimonios: Testimonio[] = [
  {
    cita:
      "Antes teníamos a una persona casi todo el día al teléfono. Hoy el 80 % de los turnos entra solo por el link, y las ausencias bajaron a la mitad en dos meses.",
    nombre: "Dra. Carolina Funes",
    rol: "Directora médica",
    clinica: "Dermalia · Córdoba",
    iniciales: "CF",
  },
  {
    cita:
      "Lo que más valoro es la lista de espera: se cancela un turno y el hueco se llena solo con alguien que estaba esperando. Antes, ese espacio era plata perdida.",
    nombre: "Lic. Martín Ocampo",
    rol: "Kinesiólogo",
    clinica: "Kinesia · Rosario",
    iniciales: "MO",
  },
  {
    cita:
      "La migración fue una tarde, en serio. Cargamos los horarios de los seis odontólogos y al día siguiente ya estaban entrando reservas desde Instagram.",
    nombre: "Andrea Vitale",
    rol: "Administradora",
    clinica: "Odonto Norte · Buenos Aires",
    iniciales: "AV",
  },
  {
    cita:
      "Los recordatorios por WhatsApp pagaron el sistema solos. Mis pacientes son papás y mamás ocupados: confirman el turno desde el colectivo, sin llamar.",
    nombre: "Dr. Pablo Herrera",
    rol: "Pediatra",
    clinica: "Vita Pediatría · Mendoza",
    iniciales: "PH",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direccion, setDireccion] = useState(1);
  const total = testimonios.length;
  const actual = testimonios[index];

  const irA = (destino: number, dir: number) => {
    setDireccion(dir);
    setIndex((destino + total) % total);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      irA(index - 1, -1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      irA(index + 1, 1);
    }
  };

  return (
    <section id="opiniones" className="py-20 sm:py-28">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="Opiniones"
          title="El teléfono dejó de sonar. Para bien."
          lead="Historias de consultorios que cambiaron el papel y las llamadas por una agenda que se maneja sola."
        />

        <Reveal delay={STAGGER * 2}>
          <div
            role="region"
            aria-roledescription="carrusel"
            aria-label="Testimonios de clínicas"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="relative mt-12 overflow-hidden rounded-card border border-line bg-surface p-6 shadow-lift sm:p-10"
          >
            <p className="sr-only">
              Carrusel de {total} testimonios. Usá las flechas izquierda y
              derecha del teclado para navegar.
            </p>

            <div aria-live="polite" className="min-h-52 sm:min-h-44">
              <AnimatePresence mode="wait" initial={false}>
                <m.figure
                  key={index}
                  role="group"
                  aria-roledescription="diapositiva"
                  aria-label={`Testimonio ${index + 1} de ${total}`}
                  initial={{ opacity: 0, x: 28 * direccion }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 * direccion }}
                  transition={{ duration: DUR.base, ease: EASE }}
                >
                  <blockquote className="font-display text-title font-medium leading-snug text-pretty">
                    “{actual.cita}”
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3.5">
                    <span
                      aria-hidden="true"
                      className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent"
                    >
                      {actual.iniciales}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">
                        {actual.nombre}
                      </span>
                      <span className="block text-xs text-muted">
                        {actual.rol} · {actual.clinica}
                      </span>
                    </span>
                  </figcaption>
                </m.figure>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
              <div className="flex items-center gap-1">
                {testimonios.map((t, i) => (
                  <button
                    key={t.iniciales}
                    type="button"
                    aria-label={`Ir al testimonio ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => irA(i, i > index ? 1 : -1)}
                    className="group rounded-full p-1.5"
                  >
                    <span
                      className={cn(
                        "block h-2 rounded-full transition-all duration-300 ease-brand",
                        i === index
                          ? "w-6 bg-accent"
                          : "w-2 bg-line group-hover:bg-muted/50",
                      )}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-muted tabular-nums">
                  {index + 1} / {total}
                </span>
                <button
                  type="button"
                  aria-label="Testimonio anterior"
                  onClick={() => irA(index - 1, -1)}
                  className="grid size-10 place-items-center rounded-full border border-line transition-colors duration-200 ease-brand hover:bg-surface-2"
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Testimonio siguiente"
                  onClick={() => irA(index + 1, 1)}
                  className="grid size-10 place-items-center rounded-full border border-line transition-colors duration-200 ease-brand hover:bg-surface-2"
                >
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
