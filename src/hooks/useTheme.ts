import { useCallback, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "turnera-theme";

/**
 * El tema inicial lo resuelve el script inline de index.html antes del primer
 * paint; este hook solo lee la clase resultante y persiste los cambios.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Sin almacenamiento disponible: el tema vive solo en la sesión.
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
