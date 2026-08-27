import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/cn";
import { DUR, EASE } from "../lib/motion";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const faqs = [
  {
    pregunta: "¿Cuánto tarda la puesta en marcha?",
    respuesta:
      "Una tarde. Cargás profesionales, horarios y prácticas, y el link de reservas queda activo. Si venís de Excel o de Google Calendar, importamos tu agenda actual para que no arranques de cero.",
  },
  {
    pregunta: "¿Mis pacientes tienen que instalar una app?",
    respuesta:
      "No. Reservan desde un link que podés compartir por WhatsApp o poner en Instagram y en tu ficha de Google. Eligen profesional, motivo y horario, y reciben la confirmación al instante.",
  },
  {
    pregunta: "¿Los recordatorios por WhatsApp tienen costo extra?",
    respuesta:
      "Están incluidos en los planes Clínica y Red, con un uso razonable por paciente. En el plan Consultorio los recordatorios salen por email, que también reduce las ausencias de forma notable.",
  },
  {
    pregunta: "¿Qué pasa con los datos de mis pacientes?",
    respuesta:
      "Son tuyos y solo tuyos. La información viaja y se guarda cifrada, hacemos copias de seguridad diarias y podés exportar todo en cualquier momento, sin pedir permiso ni esperar a nadie.",
  },
  {
    pregunta: "¿Sirve para mi especialidad?",
    respuesta:
      "Turnera se usa en odontología, dermatología, kinesiología, psicología, pediatría y más. Las duraciones, preparaciones y reglas de agenda se configuran por práctica: no vienen fijas.",
  },
  {
    pregunta: "¿Puedo cancelar cuando quiera?",
    respuesta:
      "Sí. Los planes son mensuales y sin permanencia: si Turnera no ordena tu clínica, te vas con tus datos incluidos. También podés cambiar de plan en cualquier momento.",
  },
];

function FaqItem({
  indice,
  pregunta,
  respuesta,
  abierta,
  onToggle,
}: {
  indice: number;
  pregunta: string;
  respuesta: string;
  abierta: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const idBoton = `faq-pregunta-${indice}`;
  const idPanel = `faq-respuesta-${indice}`;

  const panel = (
    <div className="max-w-[62ch] pb-6 pr-10">
      <p className="text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
        {respuesta}
      </p>
    </div>
  );

  return (
    <div>
      <h3>
        <button
          type="button"
          id={idBoton}
          aria-expanded={abierta}
          aria-controls={idPanel}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-4 py-5 text-left text-[0.9375rem] font-medium transition-colors duration-200 ease-brand hover:text-accent sm:text-base"
        >
          {pregunta}
          <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-200 ease-brand group-hover:border-accent/40 group-hover:text-accent">
            <Plus
              aria-hidden="true"
              className={cn(
                "size-4 transition-transform duration-300 ease-brand",
                abierta && "rotate-45",
              )}
            />
          </span>
        </button>
      </h3>

      {reduce ? (
        abierta && (
          <div id={idPanel} role="region" aria-labelledby={idBoton}>
            {panel}
          </div>
        )
      ) : (
        <AnimatePresence initial={false}>
          {abierta && (
            <m.div
              id={idPanel}
              role="region"
              aria-labelledby={idBoton}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: DUR.base, ease: EASE }}
              className="overflow-hidden"
            >
              {panel}
            </m.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export function FAQ() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Lo que todos preguntan antes de empezar"
        />

        <Reveal delay={0.1}>
          <div className="mt-12 divide-y divide-line border-y border-line">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.pregunta}
                indice={i}
                pregunta={faq.pregunta}
                respuesta={faq.respuesta}
                abierta={abierta === i}
                onToggle={() => setAbierta(abierta === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
