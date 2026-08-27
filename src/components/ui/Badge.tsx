import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type Tone = "neutral" | "accent";

const tones: Record<Tone, string> = {
  neutral: "border-line bg-surface text-muted",
  accent: "border-accent/25 bg-accent-soft text-accent",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
