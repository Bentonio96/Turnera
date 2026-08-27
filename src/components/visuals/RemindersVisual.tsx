import { useInView } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { useRef } from "react";
import { Pop } from "../ui/Pop";

/** Mock de la conversación de recordatorio. Ilustrativo, oculto para lectores. */
export function RemindersVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="select-none rounded-card border border-line bg-surface p-5 shadow-lift sm:p-6"
    >
      <div className="flex items-center gap-2.5 border-b border-line pb-4">
        <span className="grid size-8 place-items-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
          CS
        </span>
        <div>
          <p className="text-sm font-semibold">Camila Soto</p>
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
              <span className="rounded-full bg-accent-soft px-3 py-1 text-[0.6875rem] font-medium text-accent">
                Confirmar
              </span>
              <span className="rounded-full border border-line px-3 py-1 text-[0.6875rem] text-muted">
                Reprogramar
              </span>
            </div>
          </div>
        </Pop>

        <Pop show={inView} delay={0.3} className="self-end">
          <div className="flex items-center gap-1.5 rounded-card rounded-br-[0.25rem] bg-accent-soft px-3.5 py-2.5">
            <CircleCheck className="size-3.5 text-accent" />
            <p className="text-xs font-medium text-accent">Turno confirmado</p>
          </div>
        </Pop>
      </div>

      <Pop show={inView} delay={0.55} className="mt-5">
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
    </div>
  );
}
