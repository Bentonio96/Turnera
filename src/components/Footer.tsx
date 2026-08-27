import { Mail } from "lucide-react";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";

const columnas = [
  {
    titulo: "Producto",
    enlaces: [
      { texto: "Funcionalidades", href: "#producto" },
      { texto: "Planes", href: "#planes" },
      { texto: "Opiniones", href: "#opiniones" },
      { texto: "Preguntas frecuentes", href: "#faq" },
    ],
  },
  {
    titulo: "Recursos",
    enlaces: [
      { texto: "Centro de ayuda", href: "#" },
      { texto: "Guía para clínicas", href: "#" },
      { texto: "Estado del servicio", href: "#" },
      { texto: "API para desarrolladores", href: "#" },
    ],
  },
  {
    titulo: "Legal",
    enlaces: [
      { texto: "Privacidad", href: "#" },
      { texto: "Términos y condiciones", href: "#" },
      { texto: "Protección de datos de salud", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Turnos online, recordatorios automáticos y reportes claros para
              clínicas pequeñas.
            </p>
            <a
              href="mailto:hola@turnera.app"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted transition-colors duration-200 ease-brand hover:text-ink"
            >
              <Mail className="size-3.5" aria-hidden="true" />
              hola@turnera.app
            </a>
          </div>

          {columnas.map((columna) => (
            <nav key={columna.titulo} aria-label={columna.titulo}>
              <h3 className="text-sm font-semibold">{columna.titulo}</h3>
              <ul className="mt-3.5 flex flex-col gap-2.5">
                {columna.enlaces.map((enlace) => (
                  <li key={enlace.texto}>
                    <a
                      href={enlace.href}
                      className="text-sm text-muted transition-colors duration-200 ease-brand hover:text-ink"
                    >
                      {enlace.texto}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © 2026 Turnera. Producto ficticio, diseñado y construido como pieza
            de portafolio.
          </p>
          <p>Hecho con React, Tailwind CSS y Framer Motion.</p>
        </div>
      </Container>
    </footer>
  );
}
