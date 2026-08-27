import { ArrowRight } from "lucide-react";
import { STAGGER } from "../lib/motion";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

export function FinalCTA() {
  return (
    <section className="pb-24 pt-4 sm:pb-32">
      <Container className="max-w-4xl">
        <div className="relative overflow-hidden rounded-card border border-line bg-surface px-6 py-14 text-center shadow-lift sm:px-14 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-x-16 -top-24 h-48 rounded-full bg-accent-soft opacity-80 blur-3xl dark:opacity-40"
          />

          <Reveal>
            <h2 className="font-display text-display font-semibold text-balance">
              Ordená tu agenda <em>esta semana.</em>
            </h2>
          </Reveal>
          <Reveal delay={STAGGER}>
            <p className="mx-auto mt-5 max-w-xl text-lead text-muted text-pretty">
              Configurala en una tarde y probá Turnera 14 días con tu equipo y
              tus turnos reales. Sin tarjeta, sin permanencia, sin caos.
            </p>
          </Reveal>
          <Reveal delay={STAGGER * 2}>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="#planes" size="lg" className="group">
                Empezá gratis
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5"
                />
              </Button>
              <Button href="#producto" variant="secondary" size="lg">
                Ver el producto
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
