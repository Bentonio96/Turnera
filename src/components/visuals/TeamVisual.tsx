import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { EASE } from "../../lib/motion";
import { Pop } from "../ui/Pop";

const ocupacion = [
  { nombre: "Dra. Peralta", pct: 92 },
  { nombre: "Dr. Vidal", pct: 78 },
  { nombre: "Lic. Mora", pct: 63 },
];

const semana = [
  { dia: "Lu", turnos: 18 },
  { dia: "Ma", turnos: 21 },
  { dia: "Mi", turnos: 17 },
  { dia: "Ju", turnos: 22 },
  { dia: "Vi", turnos: 12 },
];

/** Mock del reporte de ocupación. Ilustrativo, oculto para lectores. */
export function TeamVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="select-none rounded-card border border-line bg-surface p-5 shadow-lift sm:p-6"
    >
      <div className="flex items-center justify-between border-b border-line pb-4">
        <p className="text-sm font-semibold">Ocupación por profesional</p>
        <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.6875rem] text-muted">
          Esta semana
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        {ocupacion.map((fila, i) => (
          <Pop key={fila.nombre} show={inView} delay={i * 0.1} y={6}>
            <div className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-xs font-medium">
                {fila.nombre}
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                <m.span
                  className="block h-full rounded-full bg-accent origin-left"
                  style={{ width: `${fila.pct}%` }}
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : undefined}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.15 + i * 0.1 }}
                />
              </span>
              <span className="w-10 shrink-0 text-right text-xs font-semibold tabular-nums">
                {fila.pct} %
              </span>
            </div>
          </Pop>
        ))}
      </div>

      <Pop show={inView} delay={0.45} className="mt-6">
        <div className="grid grid-cols-5 gap-2">
          {semana.map((d) => (
            <div
              key={d.dia}
              className="flex flex-col items-center rounded-[0.5rem] bg-surface-2 py-2.5"
            >
              <span className="text-[0.625rem] text-muted">{d.dia}</span>
              <span className="mt-0.5 text-sm font-semibold tabular-nums">
                {d.turnos}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[0.6875rem] text-muted">
          90 turnos esta semana · Exportás el reporte completo en un clic
        </p>
      </Pop>
    </div>
  );
}
