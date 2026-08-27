import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

/**
 * Los íconos se resuelven por CSS (variante dark:) y no por estado de React:
 * así el markup es idéntico en SSG y en cliente, y la hidratación no falla.
 */
export function ThemeToggle() {
  const { toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Cambiar entre modo claro y oscuro"
      className="relative grid size-10 place-items-center rounded-btn border border-line bg-surface text-ink transition-colors duration-200 ease-brand hover:bg-surface-2"
    >
      <Sun
        aria-hidden="true"
        className="col-start-1 row-start-1 size-[1.125rem] rotate-0 scale-100 opacity-100 transition-[opacity,transform] duration-300 ease-brand dark:-rotate-90 dark:scale-50 dark:opacity-0"
      />
      <Moon
        aria-hidden="true"
        className="col-start-1 row-start-1 size-[1.125rem] rotate-90 scale-50 opacity-0 transition-[opacity,transform] duration-300 ease-brand dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  );
}
