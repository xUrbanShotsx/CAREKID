import Link from "next/link";
import { modules } from "@/lib/content";
import { Logo } from "./Logo";

const items = [
  ["Platform", "#platform"],
  ["Why CareKid", "#why"],
  ["Regulation", "#rules"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
  ["Book a demo", "#demo"],
];

export function Footer() {
  return (
    <footer className="mt-28 overflow-hidden bg-ink text-bg">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Logo light className="text-[1rem]" />
            <p className="mt-6 max-w-sm font-display text-2xl font-semibold leading-snug">
              The compliance and operations hub for Australian childcare
              centres.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
            {items.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-bg/75 transition-colors hover:text-accent"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Platform modules" className="mt-12 border-t border-bg/15 pt-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-bg/60">
            Platform
          </h2>
          <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <li key={m.id} className="text-bg/75">
                {m.name}
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-bg/55">
          CareKid supports record keeping and review. It does not provide legal
          advice and does not certify that a service meets the National Law,
          the Regulations or the National Quality Standard. AI findings are
          prompts for a person to check against the source.
        </p>

        <p
          aria-hidden="true"
          className="mt-14 select-none font-display text-[clamp(4rem,19vw,16rem)] font-extrabold leading-[0.8] tracking-tighter text-bg/10"
        >
          carekid.
        </p>
      </div>
      <div className="border-t border-bg/15 py-5 text-center font-mono text-xs uppercase tracking-widest text-bg/60">
        © 2026 CareKid. Made for Australian childcare.
      </div>
    </footer>
  );
}
