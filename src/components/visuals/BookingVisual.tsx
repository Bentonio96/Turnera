import { useInView } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import { cn } from "../../lib/cn";
import { Pop } from "../ui/Pop";

const dias = [
  { dia: "Lu", num: "24" },
  { dia: "Ma", num: "25" },
  { dia: "Mi", num: "26" },
  { dia: "Ju", num: "27" },
  { dia: "Vi", num: "28" },
];

const horarios = ["09:00", "09:30", "10:15", "10:45", "11:30", "12:00", "16:00", "16:30"];
const seleccionado = "10:15";

/** Mock del flujo público de reservas. Ilustrativo, oculto para lectores. */
export function BookingVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="select-none rounded-card border border-line bg-surface p-5 shadow-lift sm:p-6"
    >
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <p className="text-sm font-semibold">Reservá tu turno</p>
          <p className="text-xs text-muted">Dermalia · Piel y estética</p>
        </div>
        <span className="grid size-8 place-items-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
          D
        </span>
      </div>

      <Pop show={inView} className="mt-4">
        <p className="text-[0.6875rem] font-medium tracking-wide text-muted uppercase">
          Profesional
        </p>
        <div className="mt-2 flex gap-2">
          <span className="rounded-full border border-accent/40 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent">
            Dra. Peralta
          </span>
          <span className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">
            Dr. Vidal
          </span>
        </div>
      </Pop>

      <Pop show={inView} delay={0.12} className="mt-4">
        <p className="text-[0.6875rem] font-medium tracking-wide text-muted uppercase">
          Día
        </p>
        <div className="mt-2 grid grid-cols-5 gap-2">
          {dias.map((d) => (
            <span
              key={d.dia}
              className={cn(
                "flex flex-col items-center rounded-[0.5rem] border py-2 text-xs",
                d.dia === "Mi"
                  ? "border-accent/40 bg-accent-soft font-medium text-accent"
                  : "border-line text-muted",
              )}
            >
              <span className="text-[0.625rem]">{d.dia}</span>
              <span className="mt-0.5 font-semibold tabular-nums">{d.num}</span>
            </span>
          ))}
        </div>
      </Pop>

      <div className="mt-4">
        <p className="text-[0.6875rem] font-medium tracking-wide text-muted uppercase">
          Horario
        </p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {horarios.map((hora, i) => {
            const activo = hora === seleccionado;
            return (
              <Pop key={hora} show={inView} delay={0.2 + i * 0.05} scale={0.92}>
                <span
                  className={cn(
                    "flex items-center justify-center rounded-[0.5rem] border py-2 text-xs font-medium tabular-nums",
                    activo
                      ? "border-accent bg-accent text-on-accent"
                      : "border-line text-ink",
                  )}
                >
                  {hora}
                </span>
              </Pop>
            );
          })}
        </div>
      </div>

      <Pop show={inView} delay={0.68} className="mt-5">
        <span className="flex h-11 items-center justify-center gap-2 rounded-btn bg-accent text-sm font-medium text-on-accent shadow-lift">
          <Check className="size-4" />
          Confirmar miércoles 10:15
        </span>
      </Pop>
    </div>
  );
}
