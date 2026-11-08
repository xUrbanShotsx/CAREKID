import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icons";
import { Magnetic } from "./Magnetic";
import { DemoForm } from "./DemoForm";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function H2({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`mt-5 font-display text-[clamp(2rem,4.2vw,3.5rem)] font-extrabold leading-[1.02] tracking-tight ${className}`}
    >
      {children}
    </h2>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "ink",
}: {
  href: string;
  children: ReactNode;
  variant?: "ink" | "ghost" | "light" | "accent";
}) {
  const styles = {
    ink: "bg-ink text-bg hover:bg-ink/85",
    light: "bg-bg text-ink hover:bg-tint",
    accent: "bg-accent text-ink hover:brightness-95",
    ghost: "border border-ink/30 hover:border-ink hover:bg-tint",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition-colors duration-200 ${styles}`}
    >
      {children}{" "}
      {variant !== "ghost" && <Icon name="arrow" className="h-4 w-4" />}
    </Link>
  );
}

export function CtaBand() {
  return (
    <section id="demo" className="mx-auto mt-28 max-w-6xl px-5 sm:px-8">
      <div
        data-reveal
        className="relative grid overflow-hidden rounded-[2rem] bg-accent px-7 py-14 text-ink sm:px-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"
      >
        <div>
          <p className="eyebrow">Book a demo</p>
          <h2 className="mt-5 max-w-xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[1] tracking-tight">
            Find the gaps before an assessor does.
          </h2>
          <p className="mt-5 max-w-md text-lg">
            Thirty minutes with your checklists, your staff list and your state.
            Bring one messy folder and we will sort it live.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wider">
            Now piloting with independent NSW long day care centres
          </p>
        </div>
        <div className="mt-10 lg:mt-0">
          <DemoForm />
        </div>
      </div>
    </section>
  );
}

export function PrimaryCta({ children = "Book a demo" }: { children?: ReactNode }) {
  return (
    <Magnetic>
      <ButtonLink href="#demo" variant="ink">
        {children}
      </ButtonLink>
    </Magnetic>
  );
}
