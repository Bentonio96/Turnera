import { useCallback, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "turnera-theme";

/**
 * El tema inicial lo resuelve el script inline de index.html antes del primer
 * paint; este hook solo lee la clase resultante y persiste los cambios.
 * El guard de document permite ejecutarlo durante el prerender (SSG).
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light",
  );

  const toggle = useCallback(() => {
    // El DOM es la fuente de verdad; los efectos viven en el handler (no en el
    // updater de estado, que StrictMode puede invocar más de una vez).
    const next: Theme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sin almacenamiento disponible: el tema vive solo en la sesión.
    }
    setTheme(next);
  }, []);

  return { theme, toggle };
}
