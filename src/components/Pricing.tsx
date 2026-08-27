import { AnimatePresence, m } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/cn";
import { DUR, EASE, STAGGER } from "../lib/motion";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

type Billing = "mensual" | "anual";

type Plan = {
  id: string;
  nombre: string;
  descripcion: string;
  mensual: number;
  destacado?: boolean;
  items: string[];
};

const planes: Plan[] = [
  {
    id: "consultorio",
    nombre: "Consultorio",
    descripcion: "Para profesionales que atienden solos.",
    mensual: 19,
    items: [
      "1 profesional",
      "Reservas online ilimitadas",
      "Recordatorios por email",
      "Agenda diaria y semanal",
      "Soporte por email",
    ],
  },
  {
    id: "clinica",
    nombre: "Clínica",
    descripcion: "Para equipos de hasta 8 profesionales.",
    mensual: 49,
    destacado: true,
    items: [
      "Hasta 8 profesionales",
      "Todo lo del plan Consultorio",
      "Recordatorios por WhatsApp",
      "Confirmación y reprogramación con un toque",
      "Lista de espera automática",
      "Reportes de ocupación y ausencias",
    ],
  },
  {
    id: "red",
    nombre: "Red",
    descripcion: "Para redes con varias sedes.",
    mensual: 99,
    items: [
      "Profesionales ilimitados",
      "Múltiples sedes",
      "Roles y permisos por equipo",
      "API y exportación de datos",
      "Onboarding asistido",
    ],
  },
];

const DESCUENTO_ANUAL = 0.2;

function precioDe(plan: Plan, billing: Billing): number {
  return billing === "anual"
    ? Math.round(plan.mensual * (1 - DESCUENTO_ANUAL))
    : plan.mensual;
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("mensual");

  return (
    <section id="planes" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Planes"
          title="Precios simples, sin sorpresas"
          lead="Todos los planes empiezan con 14 días gratis y con todas las funciones activadas. Sin tarjeta y sin permanencia."
        />

        <Reveal delay={STAGGER * 2}>
          <fieldset className="mt-10 flex justify-center">
            <legend className="sr-only">Frecuencia de facturación</legend>
            <div className="inline-flex rounded-full border border-line bg-surface p-1">
              {(
                [
                  { valor: "mensual", texto: "Mensual" },
                  { valor: "anual", texto: "Anual" },
                ] as const
              ).map((opcion) => {
                const activa = billing === opcion.valor;
                return (
                  <label
                    key={opcion.valor}
                    className={cn(
                      "cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ease-brand select-none",
                      "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent",
                      activa
                        ? "bg-ink text-bg"
                        : "text-muted hover:text-ink",
                    )}
                  >
                    <input
                      type="radio"
                      name="facturacion"
                      value={opcion.valor}
                      checked={activa}
                      onChange={() => setBilling(opcion.valor)}
                      className="sr-only"
                    />
                    {opcion.texto}
                    {opcion.valor === "anual" && (
                      <span
                        className={cn(
                          "ml-1.5 font-semibold",
                          activa ? "opacity-80" : "text-accent",
                        )}
                      >
                        −20 %
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-5 md:max-w-none md:grid-cols-3 md:items-start">
          {planes.map((plan, i) => {
            const precio = precioDe(plan, billing);
            return (
              <Reveal key={plan.id} delay={STAGGER * i} className="h-full">
                <article
                  aria-label={`Plan ${plan.nombre}`}
                  className={cn(
                    "relative flex h-full flex-col rounded-card border bg-surface p-6 transition-shadow duration-300 ease-brand sm:p-7",
                    plan.destacado
                      ? "border-accent shadow-pop md:-translate-y-2"
                      : "border-line shadow-lift hover:shadow-pop",
                  )}
                >
                  {plan.destacado && (
                    <Badge
                      tone="accent"
                      className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    >
                      <Sparkles className="size-3" aria-hidden="true" />
                      Más elegido
                    </Badge>
                  )}

                  <h3 className="font-display text-xl font-semibold">
                    {plan.nombre}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{plan.descripcion}</p>

                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span className="text-sm text-muted">US$</span>
                    <span className="inline-grid overflow-hidden">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <m.span
                          key={`${plan.id}-${billing}`}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: DUR.fast, ease: EASE }}
                          className="font-display text-5xl font-semibold tabular-nums"
                        >
                          {precio}
                        </m.span>
                      </AnimatePresence>
                    </span>
                    <span className="text-sm text-muted">/ mes</span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted">
                    {billing === "anual"
                      ? `Facturado por año: US$ ${precio * 12}`
                      : "Facturado mes a mes"}
                  </p>

                  <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-accent-soft">
                          <Check
                            className="size-2.5 text-accent"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    href="#"
                    variant={plan.destacado ? "primary" : "secondary"}
                    className="mt-7"
                  >
                    Empezá gratis
                  </Button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={STAGGER * 2}>
          <p className="mt-8 text-center text-xs text-muted">
            Precios en dólares, sin impuestos incluidos. ¿Más de 20
            profesionales?{" "}
            <a
              href="#"
              className="font-medium text-accent underline-offset-2 hover:underline"
            >
              Hablemos
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
