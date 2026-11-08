import type { ReactNode } from "react";
import { Icon } from "../Icons";

export function PageHead({
  title,
  sub,
  right,
}: {
  title: string;
  sub?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {sub && <p className="mt-1.5 max-w-xl text-ink-soft">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function Card({
  title,
  right,
  children,
  className = "",
}: {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-line bg-surface ${className}`}>
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <h2 className="font-display text-base font-extrabold tracking-tight">{title}</h2>
          {right}
        </div>
      )}
      {children}
    </section>
  );
}

type Tone = "ok" | "owed" | "late" | "neutral";

export function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  const styles: Record<Tone, string> = {
    ok: "bg-ink/[0.06] text-ink",
    owed: "bg-accent/40 text-ink",
    late: "bg-ink text-bg",
    neutral: "bg-tint text-ink-soft",
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${styles[tone]}`}
    >
      {tone === "ok" && <Icon name="check" className="h-3 w-3" />}
      {tone === "owed" && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
      {tone === "late" && <Icon name="alert" className="h-3 w-3 text-accent" />}
      {children}
    </span>
  );
}

export function Progress({ pct }: { pct: number }) {
  return (
    <div
      className="h-2 overflow-hidden rounded-full bg-tint"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Avatar({ initials }: { initials: string }) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-ink"
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function Stat({ value, label, hot }: { value: string; label: string; hot?: boolean }) {
  return (
    <div className={`rounded-2xl border border-line p-5 ${hot ? "bg-accent/30" : "bg-surface"}`}>
      <p className="font-display text-4xl font-extrabold leading-none tracking-tight">{value}</p>
      <p className="mt-2 text-sm text-ink-soft">{label}</p>
    </div>
  );
}

/** Days until expiry as a pill. */
export function Expiry({ days }: { days: number }) {
  if (days < 0) return <Pill tone="late">Expired</Pill>;
  if (days <= 30) return <Pill tone="owed">{days} days</Pill>;
  if (days <= 90) return <Pill tone="neutral">{days} days</Pill>;
  return <Pill tone="ok">Current</Pill>;
}
