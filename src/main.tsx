import { LazyMotion } from "framer-motion";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const cargarMotionFeatures = () =>
  import("./lib/motion-features").then((mod) => mod.default);

const arbol = (
  <StrictMode>
    <LazyMotion features={cargarMotionFeatures} strict>
      <App />
    </LazyMotion>
  </StrictMode>
);

const root = document.getElementById("root")!;

// En producción el HTML llega prerenderizado (SSG): hidratamos para conservar
// el DOM ya pintado. En dev el root llega vacío y montamos normalmente.
if (root.hasChildNodes()) {
  hydrateRoot(root, arbol);
} else {
  createRoot(root).render(arbol);
}
