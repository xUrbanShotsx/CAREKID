/** The CareKid wordmark. It is yellow, so it always sits on a dark tile to stay readable. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-xl bg-ink px-3.5 py-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="CareKid" width={292} height={58} className="h-[1.8em] w-auto" />
    </span>
  );
}

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="16" className="fill-ink" />
      <circle cx="32" cy="32" r="17" className="fill-accent" />
      <circle cx="26" cy="29" r="2.6" className="fill-ink" />
      <circle cx="38" cy="29" r="2.6" className="fill-ink" />
      <path d="M24 37c3 4.5 13 4.5 16 0" fill="none" strokeWidth="3" strokeLinecap="round" className="stroke-ink" />
    </svg>
  );
}
