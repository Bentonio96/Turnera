import { AnimatePresence, m, useInView } from "framer-motion";
import { Check, CircleCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { DUR, EASE } from "../../lib/motion";
import { Pop } from "../ui/Pop";

const profesionales = ["Dra. Peralta", "Dr. Vidal"];

const dias = [
  { corto: "Lu", num: "24", nombre: "lunes" },
  { corto: "Ma", num: "25", nombre: "martes" },
  { corto: "Mi", num: "26", nombre: "miércoles" },
  { corto: "Ju", num: "27", nombre: "jueves" },
  { corto: "Vi", num: "28", nombre: "viernes" },
];

const horarios = ["09:00", "09:30", "10:15", "10:45", "11:30", "12:00", "16:00", "16:30"];

/**
 * Disponibilidad simulada, determinística por (profesional, día): siempre hay
 * exactamente dos horarios ocupados y cambian al cambiar la combinación.
 */
function estaOcupado(prof: number, dia: number, slot: number): boolean {
  return (slot * 7 + prof * 3 + dia * 5) % 8 >= 6;
}

function primerLibre(prof: number, dia: number): number {
  return horarios.findIndex((_, i) => !estaOcupado(prof, dia, i));
}

/** Demo interactiva del flujo público de reservas. */
export function BookingVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const [prof, setProf] = useState(0);
  const [dia, setDia] = useState(2);
  const [hora, setHora] = useState(2);
  const [confirmado, setConfirmado] = useState(false);

  useEffect(() => {
    if (!confirmado) return;
    const t = window.setTimeout(() => setConfirmado(false), 2800);
    return () => window.clearTimeout(t);
  }, [confirmado]);

  const elegirProf = (p: number) => {
    setProf(p);
    setConfirmado(false);
    if (estaOcupado(p, dia, hora)) setHora(primerLibre(p, dia));
  };

  const elegirDia = (d: number) => {
    setDia(d);
    setConfirmado(false);
    if (estaOcupado(prof, d, hora)) setHora(primerLibre(prof, d));
  };

  const elegirHora = (i: number) => {
    setHora(i);
    setConfirmado(false);
  };

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Demo interactiva del flujo de reservas"
      className="rounded-card border border-line bg-surface p-5 shadow-lift sm:p-6"
    >
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold">
            Reservá tu turno
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[0.625rem] font-medium text-accent">
              Demo · probalo
            </span>
          </p>
          <p className="text-xs text-muted">Dermalia · Piel y estética</p>
        </div>
        <span
          aria-hidden="true"
          className="grid size-8 place-items-center rounded-full bg-accent-soft text-xs font-semibold text-accent"
        >
          D
        </span>
      </div>

      <Pop show={inView} className="mt-4">
        <p
          id="demo-prof"
          className="text-[0.6875rem] font-medium tracking-wide text-muted uppercase"
        >
          Profesional
        </p>
        <div role="group" aria-labelledby="demo-prof" className="mt-2 flex gap-2">
          {profesionales.map((nombre, p) => {
            const activo = p === prof;
            return (
              <button
                key={nombre}
                type="button"
                aria-pressed={activo}
                onClick={() => elegirProf(p)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition-colors duration-200 ease-brand",
                  activo
                    ? "border-accent/40 bg-accent-soft font-medium text-accent"
                    : "border-line text-muted hover:border-muted/50 hover:text-ink",
                )}
              >
                {nombre}
              </button>
            );
          })}
        </div>
      </Pop>

      <Pop show={inView} delay={0.12} className="mt-4">
        <p
          id="demo-dia"
          className="text-[0.6875rem] font-medium tracking-wide text-muted uppercase"
        >
          Día
        </p>
        <div
          role="group"
          aria-labelledby="demo-dia"
          className="mt-2 grid grid-cols-5 gap-2"
        >
          {dias.map((d, i) => {
            const activo = i === dia;
            return (
              <button
                key={d.corto}
                type="button"
                aria-pressed={activo}
                aria-label={`${d.nombre} ${d.num}`}
                onClick={() => elegirDia(i)}
                className={cn(
                  "flex flex-col items-center rounded-[0.5rem] border py-2 text-xs transition-colors duration-200 ease-brand",
                  activo
                    ? "border-accent/40 bg-accent-soft font-medium text-accent"
                    : "border-line text-muted hover:border-muted/50 hover:text-ink",
                )}
              >
                <span className="text-[0.625rem]">{d.corto}</span>
                <span className="mt-0.5 font-semibold tabular-nums">{d.num}</span>
              </button>
            );
          })}
        </div>
      </Pop>

      <div className="mt-4">
        <p
          id="demo-hora"
          className="text-[0.6875rem] font-medium tracking-wide text-muted uppercase"
        >
          Horario
        </p>
        <div
          role="group"
          aria-labelledby="demo-hora"
          className="mt-2 grid grid-cols-4 gap-2"
        >
          {horarios.map((horario, i) => {
            const ocupado = estaOcupado(prof, dia, i);
            const activo = i === hora && !ocupado;
            return (
              <Pop key={horario} show={inView} delay={0.2 + i * 0.05} scale={0.92}>
                <button
                  type="button"
                  disabled={ocupado}
                  aria-pressed={activo}
                  aria-label={ocupado ? `${horario}, ocupado` : horario}
                  onClick={() => elegirHora(i)}
                  className={cn(
                    "flex w-full items-center justify-center rounded-[0.5rem] border py-2 text-xs font-medium tabular-nums transition-colors duration-200 ease-brand",
                    activo && "border-accent bg-accent text-on-accent",
                    !activo &&
                      !ocupado &&
                      "border-line text-ink hover:border-muted/50 hover:bg-surface-2",
                    ocupado &&
                      "cursor-not-allowed border-line/60 text-muted/50 line-through",
                  )}
                >
                  {horario}
                </button>
              </Pop>
            );
          })}
        </div>
      </div>

      <Pop show={inView} delay={0.68} className="mt-5">
        <button
          type="button"
          onClick={() => setConfirmado(true)}
          className={cn(
            "flex h-11 w-full items-center justify-center gap-2 rounded-btn text-sm font-medium text-on-accent shadow-lift transition-colors duration-200 ease-brand active:scale-[0.985]",
            confirmado ? "bg-accent-strong" : "bg-accent hover:bg-accent-strong",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {confirmado ? (
              <m.span
                key="listo"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: DUR.fast, ease: EASE }}
                className="flex items-center gap-2"
              >
                <CircleCheck className="size-4" aria-hidden="true" />
                ¡Turno confirmado!
              </m.span>
            ) : (
              <m.span
                key={`${dia}-${hora}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: DUR.fast, ease: EASE }}
                className="flex items-center gap-2"
              >
                <Check className="size-4" aria-hidden="true" />
                Confirmar {dias[dia].nombre} {horarios[hora]}
              </m.span>
            )}
          </AnimatePresence>
        </button>

        <div className="mt-2 h-4 text-center">
          <AnimatePresence>
            {confirmado && (
              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DUR.fast, ease: EASE }}
                className="text-[0.6875rem] text-muted"
              >
                El paciente recibe la confirmación por WhatsApp · La demo se
                reinicia sola
              </m.p>
            )}
          </AnimatePresence>
        </div>

        <span aria-live="polite" className="sr-only">
          {confirmado
            ? `Turno confirmado para el ${dias[dia].nombre} a las ${horarios[hora]} con ${profesionales[prof]}.`
            : ""}
        </span>
      </Pop>
    </div>
  );
}
