import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

/** Wordmarks tipográficos ficticios: sin imágenes, solo tokens. */
const clientes = [
  { nombre: "Dermalia", clase: "font-display font-semibold tracking-tight" },
  { nombre: "ODONTO NORTE", clase: "text-sm font-bold tracking-[0.18em]" },
  { nombre: "Kinesia", clase: "font-display italic font-medium" },
  { nombre: "Vita Pediatría", clase: "font-semibold tracking-tight" },
  { nombre: "Centro Aluminé", clase: "font-display font-medium" },
  { nombre: "FISIO CENTRAL", clase: "text-sm font-semibold tracking-[0.22em]" },
  { nombre: "Clínica del Parque", clase: "font-display italic font-semibold" },
  { nombre: "PSIQUE", clase: "text-sm font-bold tracking-[0.3em]" },
];

export function LogoMarquee() {
  return (
    <section aria-label="Clínicas que usan Turnera" className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-medium tracking-[0.08em] text-muted uppercase">
            Más de 400 consultorios ordenaron su agenda con Turnera
          </p>
        </Reveal>
      </Container>

      <Reveal delay={0.1}>
        <div
          className="relative mt-8 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="flex w-max gap-14 pr-14 animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0">
            {[false, true].map((duplicado) => (
              <ul
                key={String(duplicado)}
                aria-hidden={duplicado || undefined}
                className="flex shrink-0 items-center gap-14 motion-reduce:flex-wrap motion-reduce:justify-center"
              >
                {clientes.map((cliente) => (
                  <li
                    key={cliente.nombre}
                    className={`whitespace-nowrap text-lg text-muted/80 ${cliente.clase}`}
                  >
                    {cliente.nombre}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
