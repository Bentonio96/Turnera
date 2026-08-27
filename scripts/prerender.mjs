// Prerender (SSG liviano): inyecta el HTML del above-the-fold en dist/index.html.
// Corre después de `vite build` + `vite build --ssr` (ver script "build").
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const { render } = await import(
  new URL("../dist-server/entry-server.js", import.meta.url).href
);

const rutaHtml = join(raiz, "dist", "index.html");
const plantilla = readFileSync(rutaHtml, "utf8");
const marcador = '<div id="root"></div>';

if (!plantilla.includes(marcador)) {
  throw new Error("No encontré el marcador <div id=\"root\"></div> en dist/index.html");
}

const app = render();
writeFileSync(rutaHtml, plantilla.replace(marcador, `<div id="root">${app}</div>`));
rmSync(join(raiz, "dist-server"), { recursive: true, force: true });

console.log(`Prerender listo: ${(app.length / 1024).toFixed(1)} KB de HTML inyectados`);
