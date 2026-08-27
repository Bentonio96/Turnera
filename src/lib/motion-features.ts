/**
 * Features completas de Framer Motion (incluye proyección de layout para
 * AnimatePresence popLayout). Se cargan en un chunk aparte vía LazyMotion
 * para que el bundle inicial solo lleve el runtime liviano de `m.*`.
 */
export { domMax as default } from "framer-motion";
