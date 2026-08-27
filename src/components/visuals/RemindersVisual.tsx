import { AnimatePresence, m, useInView } from "framer-motion";
import { CalendarClock, CircleCheck } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { DUR, EASE } from "../../lib/motion";
import { Pop } from "../ui/Pop";

type Respuesta = "confirmado" | "reprogramado";

/**
 * Demo interactiva del recordatorio: el visitante responde por la paciente
 * con un toque, que es exactamente lo que promete el copy de la sección.
 */
export function RemindersVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [respuesta, setRespuesta] = useState<Respuesta | null>(null);

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Demo interactiva del recordatorio por WhatsApp"
      className="rounded-card border border-line bg-surface p-5 shadow-lift sm:p-6"
    >
      <div className="flex items-center gap-2.5 border-b border-line pb-4">
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-semibold text-accent"
        >
          CS
        </span>
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold">
            Camila Soto
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[0.625rem] font-medium text-accent">
              Demo · probalo
            </span>
          </p>
          <p className="text-xs text-muted">WhatsApp · automático</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <Pop show={inView} className="max-w-[88%]">
          <div className="rounded-card rounded-bl-[0.25rem] bg-surface-2 p-3.5">
            <p className="text-xs leading-relaxed">
              Hola, Camila 👋 Mañana a las <strong>10:15</strong> tenés turno
              con la Dra. Peralta en Dermalia. ¿Lo confirmás?
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                aria-pressed={respuesta === "confirmado"}
                onClick={() => setRespuesta("confirmado")}
                className={cn(
                  "rounded-full px-3 py-1 text-[0.6875rem] font-medium transition-colors duration-200 ease-brand active:scale-[0.97]",
                  respuesta === "confirmado"
                    ? "bg-accent text-on-accent"
                    : "bg-accent-soft text-accent hover:bg-accent hover:text-on-accent",
                )}
              >
                Confirmar
              </button>
              <button
                type="button"
                aria-pressed={respuesta === "reprogramado"}
                onClick={() => setRespuesta("reprogramado")}
                className={cn(
                  "rounded-full border px-3 py-1 text-[0.6875rem] transition-colors duration-200 ease-brand active:scale-[0.97]",
                  respuesta === "reprogramado"
                    ? "border-accent/40 bg-accent-soft font-medium text-accent"
                    : "border-line text-muted hover:border-muted/50 hover:text-ink",
                )}
              >
                Reprogramar
              </button>
            </div>
          </div>
        </Pop>

        <div className="flex min-h-10 flex-col justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {respuesta === "confirmado" && (
              <m.div
                key="confirmado"
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: DUR.fast, ease: EASE }}
                className="ml-auto flex items-center gap-1.5 rounded-card rounded-br-[0.25rem] bg-accent-soft px-3.5 py-2.5"
              >
                <CircleCheck className="size-3.5 text-accent" aria-hidden="true" />
                <p className="text-xs font-medium text-accent">
                  Turno confirmado
                </p>
              </m.div>
            )}
            {respuesta === "reprogramado" && (
              <m.div
                key="reprogramado"
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: DUR.fast, ease: EASE }}
                className="ml-auto flex items-center gap-1.5 rounded-card rounded-br-[0.25rem] bg-accent-soft px-3.5 py-2.5"
              >
                <CalendarClock className="size-3.5 text-accent" aria-hidden="true" />
                <p className="text-xs font-medium text-accent">
                  Reprogramado para el jueves 11:30
                </p>
              </m.div>
            )}
            {respuesta === null && (
              <m.p
                key="pista"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DUR.fast, ease: EASE }}
                className="text-center text-[0.6875rem] text-muted"
              >
                Respondé por Camila con un toque 👆
              </m.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Pop show={inView} delay={0.3} className="mt-4">
        <div className="flex items-center justify-between rounded-[0.625rem] bg-surface-2 p-3.5">
          <div>
            <p className="text-[0.6875rem] text-muted">Ausencias este mes</p>
            <p className="mt-0.5 text-xl font-semibold tabular-nums">2</p>
          </div>
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent tabular-nums">
            −64 % en 3 meses
          </span>
        </div>
      </Pop>

      <span aria-live="polite" className="sr-only">
        {respuesta === "confirmado"
          ? "Camila confirmó el turno."
          : respuesta === "reprogramado"
            ? "Camila reprogramó el turno para el jueves a las 11:30."
            : ""}
      </span>
    </div>
  );
}
