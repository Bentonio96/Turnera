import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { STAGGER } from "../../lib/motion";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn(centered && "text-center", className)}>
      <Reveal>
        <p className="text-[0.8125rem] font-semibold tracking-[0.14em] uppercase text-accent">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={STAGGER}>
        <h2 className="mt-3 font-display text-display font-semibold text-balance">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={STAGGER * 2}>
          <p
            className={cn(
              "mt-4 max-w-2xl text-lead text-muted text-pretty",
              centered && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
