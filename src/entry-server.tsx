import { LazyMotion } from "framer-motion";
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

/**
 * Entrada del prerender (SSG): produce el mismo árbol que main.tsx para que
 * hydrateRoot conserve el DOM sin re-renderizar. Las features de motion se
 * resuelven en cliente; acá alcanza con el placeholder.
 */
const cargarMotionFeatures = () =>
  import("./lib/motion-features").then((mod) => mod.default);

export function render(): string {
  return renderToString(
    <StrictMode>
      <LazyMotion features={cargarMotionFeatures} strict>
        <App />
      </LazyMotion>
    </StrictMode>,
  );
}
