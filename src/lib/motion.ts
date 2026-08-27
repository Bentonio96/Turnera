/**
 * Tokens de motion. Un solo easing y duraciones cortas en todo el sitio;
 * el token CSS equivalente es --ease-brand (utilidad `ease-brand`).
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DUR = {
  fast: 0.2,
  base: 0.3,
  slow: 0.4,
} as const;

/** Paso de escalonado entre elementos hermanos, en segundos. */
export const STAGGER = 0.07;
