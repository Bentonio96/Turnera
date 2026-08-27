import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";

type LazySectionProps = {
  /** Import dinámico del componente de la sección. */
  cargar: () => Promise<{ default: ComponentType }>;
  /** Id ancla mientras la sección real no está montada. */
  id?: string;
  /** Alto estimado del placeholder (clase), para mantener el largo del documento. */
  altoEstimado?: string;
};

/**
 * Difiere el JS de las secciones bajo el fold: el chunk se pide cuando la
 * sección se acerca al viewport o cuando el hilo principal queda libre,
 * lo que ocurra primero. Reduce el costo de arranque sin sacrificar
 * contenido: todo termina montado aunque nadie scrollee.
 */
export function LazySection({
  cargar,
  id,
  altoEstimado = "min-h-[40rem]",
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [Seccion, setSeccion] = useState<ComponentType | null>(null);

  useEffect(() => {
    let activo = true;
    let pedido = false;

    const montar = () => {
      if (pedido) return;
      pedido = true;
      void cargar().then((mod) => {
        if (activo) setSeccion(() => mod.default);
      });
    };

    const observer = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          montar();
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    if (ref.current) observer.observe(ref.current);

    // Safari < 16.4 no tiene requestIdleCallback; setTimeout es el fallback.
    const tieneIdle = typeof window.requestIdleCallback === "function";
    const idle = tieneIdle
      ? window.requestIdleCallback(montar, { timeout: 3500 })
      : window.setTimeout(montar, 2000);

    return () => {
      activo = false;
      observer.disconnect();
      if (tieneIdle) {
        window.cancelIdleCallback(idle);
      } else {
        window.clearTimeout(idle);
      }
    };
  }, [cargar]);

  if (Seccion) return <Seccion />;

  return <div ref={ref} id={id} className={altoEstimado} aria-hidden="true" />;
}
