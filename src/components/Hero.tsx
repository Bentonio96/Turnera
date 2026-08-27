import { ArrowRight, Check, Stethoscope } from "lucide-react";
import { AgendaMock } from "./AgendaMock";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";

const garantias = ["14 días gratis", "Sin tarjeta", "Configuración en una tarde"];

/** Escalona la entrada CSS del hero (múltiplos del stagger de 70 ms). */
const entrada = (paso: number) => ({ animationDelay: `${paso * 70}ms` });

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div>
            <div className="entrada-hero">
              <Badge tone="accent">
                <Stethoscope className="size-3.5" aria-hidden="true" />
                Para clínicas de 1 a 20 profesionales
              </Badge>
            </div>

            <h1
              className="entrada-hero mt-6 font-display text-hero font-semibold text-balance"
              style={entrada(1)}
            >
              La agenda de tu clínica, <em>por fin en calma.</em>
            </h1>

            <p
              className="entrada-hero mt-6 max-w-xl text-lead text-muted text-pretty"
              style={entrada(2)}
            >
              Turnera junta reservas online, recordatorios automáticos y la
              agenda de todo tu equipo en un solo lugar. Menos teléfono, menos
              ausencias, más tiempo para atender.
            </p>

            <div
              className="entrada-hero mt-8 flex flex-col gap-3 sm:flex-row"
              style={entrada(3)}
            >
              <Button href="#planes" size="lg" className="group">
                Empezá gratis
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5"
                />
              </Button>
              <Button href="#producto" variant="secondary" size="lg">
                Ver cómo funciona
              </Button>
            </div>

            <ul
              className="entrada-hero mt-8 flex flex-wrap gap-x-5 gap-y-2"
              style={entrada(4)}
            >
              {garantias.map((texto) => (
                <li
                  key={texto}
                  className="flex items-center gap-1.5 text-sm text-muted"
                >
                  <Check className="size-4 text-accent" aria-hidden="true" />
                  {texto}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative pb-8 lg:pb-0">
            <div
              aria-hidden="true"
              className="absolute -top-16 right-[-12%] -z-10 size-[24rem] rounded-full bg-accent-soft opacity-70 blur-3xl dark:opacity-35"
            />
            <div className="entrada-hero" style={entrada(2)}>
              <AgendaMock />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
