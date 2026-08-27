import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { DUR, EASE } from "../../lib/motion";

type PopProps = {
  /** Controla la aparición (típicamente un useInView del contenedor). */
  show: boolean;
  delay?: number;
  y?: number;
  scale?: number;
  className?: string;
  children: ReactNode;
};

/** Micro-entrada para piezas internas de los visuales, escalonable por delay. */
export function Pop({
  show,
  delay = 0,
  y = 8,
  scale = 1,
  className,
  children,
}: PopProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, scale }}
      animate={show ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: DUR.base, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}
