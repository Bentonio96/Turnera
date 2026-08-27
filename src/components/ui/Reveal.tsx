import { m, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { DUR, EASE } from "../../lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Retardo en segundos; para escalonar hermanos usar i * STAGGER. */
  delay?: number;
  /** Desplazamiento vertical inicial en px. */
  y?: number;
  className?: string;
};

/**
 * Entrada al hacer scroll: fade + rise corto, una sola vez.
 * Con prefers-reduced-motion activo, MotionConfig (reducedMotion="user")
 * anula el desplazamiento y deja solo un fundido breve: el contenido
 * aparece sin movimiento. El markup inicial es idéntico en SSG y cliente,
 * condición necesaria para que la hidratación conserve el DOM.
 */
export function Reveal({ children, delay = 0, y = 16, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <m.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: DUR.slow, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}
