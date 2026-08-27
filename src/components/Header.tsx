import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/cn";
import { DUR, EASE } from "../lib/motion";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { ThemeToggle } from "./ui/ThemeToggle";

const links = [
  { href: "#producto", label: "Producto" },
  { href: "#planes", label: "Planes" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ease-brand",
        scrolled || open
          ? "border-line bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 md:h-18">
        <a
          href="#inicio"
          aria-label="Turnera, ir al inicio"
          className="rounded-btn"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-btn px-3 py-2 text-sm font-medium text-muted transition-colors duration-200 ease-brand hover:bg-surface-2 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Button href="#planes" size="sm" className="max-sm:hidden">
            Empezá gratis
          </Button>
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-btn border border-line bg-surface transition-colors duration-200 ease-brand hover:bg-surface-2 md:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-movil"
            aria-label="Principal"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DUR.fast, ease: EASE }}
            className="absolute inset-x-0 top-full border-b border-line bg-bg/95 backdrop-blur-md md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-btn px-3 py-2.5 text-[0.9375rem] font-medium text-ink transition-colors duration-200 ease-brand hover:bg-surface-2"
                >
                  {link.label}
                </a>
              ))}
              <Button href="#planes" className="mt-2" onClick={() => setOpen(false)}>
                Empezá gratis
              </Button>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
