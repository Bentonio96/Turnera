import { cn } from "../../lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("size-7", className)}
    >
      <rect width="64" height="64" rx="14" className="fill-accent" />
      <rect
        x="15"
        y="17"
        width="34"
        height="31"
        rx="6"
        fill="none"
        strokeWidth="4"
        className="stroke-on-accent"
      />
      <line
        x1="15"
        y1="29"
        x2="49"
        y2="29"
        strokeWidth="4"
        className="stroke-on-accent"
      />
      <circle cx="39" cy="39" r="5" className="fill-on-accent" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-[1.375rem] font-semibold tracking-tight">
        Turnera
      </span>
    </span>
  );
}
