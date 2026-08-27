import { motion, useInView, useReducedMotion } from "framer-motion";
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
 * Con prefers-reduced-motion activo el contenido aparece sin movimiento.
 */
export function Reveal({ children, delay = 0, y = 16, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: DUR.slow, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
