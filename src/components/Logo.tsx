export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="16" className="fill-ink" />
      <circle cx="32" cy="32" r="17" className="fill-accent" />
      <circle cx="26" cy="29" r="2.6" className="fill-ink" />
      <circle cx="38" cy="29" r="2.6" className="fill-ink" />
      <path
        d="M24 37c3 4.5 13 4.5 16 0"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        className="stroke-ink"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-[1.9em] w-[1.9em]" />
      <span
        className={`font-display text-[1.45em] font-extrabold leading-none tracking-tight ${light ? "text-bg" : "text-ink"}`}
      >
        carekid<span className="text-accent">.</span>
      </span>
    </span>
  );
}
