import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/cn";
import { DUR, EASE } from "../lib/motion";

type Turno = {
  hora: string;
  paciente?: string;
  motivo?: string;
  profesional?: string;
  libre?: boolean;
};

const turnos: Turno[] = [
  { hora: "09:00", paciente: "Ana Ruiz", motivo: "Control de piel", profesional: "Dra. Peralta" },
  { hora: "09:30", paciente: "Bruno Casas", motivo: "Limpieza dental", profesional: "Dr. Vidal" },
  { hora: "10:15", paciente: "Camila Soto", motivo: "Primera consulta", profesional: "Dra. Peralta" },
  { hora: "11:00", libre: true },
  { hora: "11:30", paciente: "Julián Paz", motivo: "Kinesiología", profesional: "Lic. Mora" },
];

const profesionales = ["MP", "JV", "LM"];

function EstadoChip({ confirmado }: { confirmado: boolean }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={confirmado ? "ok" : "pendiente"}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: DUR.fast, ease: EASE }}
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.6875rem] font-medium",
          confirmado
            ? "bg-accent-soft text-accent"
            : "border border-line bg-surface-2 text-muted",
        )}
      >
        <span
          className={cn(
            "size-1.5 rounded-full",
            confirmado ? "bg-accent" : "bg-muted/60",
          )}
        />
        {confirmado ? "Confirmado" : "Pendiente"}
      </motion.span>
    </AnimatePresence>
  );
}

/**
 * Previsualización del producto construida solo con divs y tokens.
 * Es ilustrativa: se oculta del árbol de accesibilidad.
 */
export function AgendaMock() {
  const reduce = useReducedMotion();
  const [confirmada, setConfirmada] = useState(reduce ?? false);
  const [toast, setToast] = useState(reduce ?? false);

  useEffect(() => {
    if (reduce) return;
    const t1 = window.setTimeout(() => setToast(true), 1600);
    const t2 = window.setTimeout(() => setConfirmada(true), 2300);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduce]);

  return (
    <div aria-hidden="true" className="relative select-none">
      <div className="rounded-card border border-line bg-surface p-4 shadow-lift sm:p-5">
        {/* Encabezado */}
        <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
          <div>
            <p className="text-sm font-semibold">Miércoles 26 de agosto</p>
            <p className="text-xs text-muted">Agenda del día · Sede Centro</p>
          </div>
          <div className="flex items-center">
            {profesionales.map((iniciales, i) => (
              <span
                key={iniciales}
                className={cn(
                  "grid size-7 place-items-center rounded-full bg-accent-soft text-[0.625rem] font-semibold text-accent ring-2 ring-surface",
                  i > 0 && "-ml-2",
                )}
              >
                {iniciales}
              </span>
            ))}
          </div>
        </div>

        {/* Turnos */}
        <ul className="divide-y divide-line">
          {turnos.map((turno) => (
            <li
              key={turno.hora}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-3 py-3"
            >
              <span className="pt-0.5 text-xs font-medium text-muted tabular-nums">
                {turno.hora}
              </span>
              {turno.libre ? (
                <span className="flex items-center gap-2 rounded-[0.5rem] border border-dashed border-line px-3 py-2 text-xs text-muted">
                  <Plus className="size-3.5" />
                  Libre para reservas online
                </span>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {turno.paciente}
                      <span className="font-normal text-muted"> · {turno.motivo}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{turno.profesional}</p>
                  </div>
                  <EstadoChip
                    confirmado={turno.hora === "10:15" ? confirmada : true}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Métricas del día */}
        <div className="grid grid-cols-3 gap-3 border-t border-line pt-4">
          <div>
            <p className="text-[0.6875rem] text-muted">Ocupación</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums">86 %</p>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full w-[86%] rounded-full bg-accent" />
            </div>
          </div>
          <div>
            <p className="text-[0.6875rem] text-muted">Ausencias</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums">1</p>
          </div>
          <div>
            <p className="text-[0.6875rem] text-muted">Recordatorios</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums">12/12</p>
          </div>
        </div>
      </div>

      {/* Notificación flotante */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14, scale: 0.96 }}
        animate={toast ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: DUR.base, ease: EASE }}
        className="absolute -bottom-8 left-3 flex items-center gap-2.5 rounded-card border border-line bg-surface p-3 pr-4 shadow-pop sm:-left-6"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft">
          <MessageCircle className="size-4 text-accent" />
        </span>
        <span>
          <span className="block text-xs font-medium">
            Camila confirmó su turno
          </span>
          <span className="block text-[0.6875rem] text-muted">
            WhatsApp · recién
          </span>
        </span>
      </motion.div>
    </div>
  );
}
