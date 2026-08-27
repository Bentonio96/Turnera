import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="relative grid size-10 place-items-center rounded-btn border border-line bg-surface text-ink transition-colors duration-200 ease-brand hover:bg-surface-2"
    >
      <Sun
        aria-hidden="true"
        className={`col-start-1 row-start-1 size-[1.125rem] transition-[opacity,transform] duration-300 ease-brand ${
          dark ? "-rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        aria-hidden="true"
        className={`col-start-1 row-start-1 size-[1.125rem] transition-[opacity,transform] duration-300 ease-brand ${
          dark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0"
        }`}
      />
    </button>
  );
}
