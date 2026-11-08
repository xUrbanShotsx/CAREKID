import type { ReactNode } from "react";
import {
  AuditorMock,
  BriefingMock,
  CalendarMock,
  CentreMock,
  CommandMock,
  NqsMock,
  PhoneMock,
  TrailMock,
} from "@/components/Mocks";
import { ButtonLink, CtaBand, Eyebrow, H2, PrimaryCta } from "@/components/Sections";
import { ModuleExplorer } from "@/components/ModuleExplorer";
import { FaqList } from "@/components/Faq";
import { Icon } from "@/components/Icons";
import {
  differentiators,
  faqs,
  featureCount,
  kinds,
  modules,
  pains,
  plans,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  steps,
} from "@/lib/content";

const services = [
  "Long day care",
  "Preschools and kindergartens",
  "Before school care",
  "After school care",
  "Vacation care",
];

const visuals: Record<string, ReactNode> = {
  auditor: <AuditorMock />,
  calendar: <CalendarMock />,
  assessment: <NqsMock />,
  briefing: <BriefingMock />,
  command: <CommandMock />,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  areaServed: { "@type": "Country", name: "Australia" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div data-load>
              <Eyebrow>Compliance and operations for Australian childcare</Eyebrow>
            </div>
            <h1
              data-load
              className="mt-6 font-display text-[clamp(2.7rem,6.4vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight"
            >
              Every room checked, every record <span className="tape">current</span>{" "}
              before the visit.
            </h1>
            <p data-load className="mt-7 max-w-lg text-lg text-ink-soft">
              CareKid keeps long day care, preschool, before school and after
              school care centres audit-ready: daily checklists, staff
              credentials, policies and incidents in one place, with a calendar
              that flags what is due while there is still time to do it.
            </p>
            <div data-load className="mt-9 flex flex-wrap items-center gap-4">
              <PrimaryCta />
              <ButtonLink href="#platform" variant="ghost">
                See what is inside
              </ButtonLink>
            </div>
          </div>
          <div data-load>
            <div data-parallax="6">
              <div className="float">
                <CentreMock />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* scope strip */}
      <div className="relative overflow-hidden bg-[linear-gradient(110deg,oklch(0.2_0.045_195),oklch(0.33_0.075_190)_55%,oklch(0.21_0.045_195))] py-5 font-mono text-xs uppercase tracking-[0.18em] text-bg shadow-[inset_0_1px_0_oklch(1_0_0/0.18),inset_0_-1px_0_oklch(0_0_0/0.4)]">
        <div
          aria-hidden="true"
          className="glow-x pointer-events-none absolute h-24 w-72 rounded-full bg-accent/60 blur-3xl"
        />
        <ul className="marquee flex w-max gap-10 whitespace-nowrap" aria-label="What CareKid covers">
          {[0, 1, 2, 3].flatMap((k) =>
            [
              "Daily checklists",
              "Staff credentials",
              "Policy library",
              "Incident reporting",
              "NQS evidence",
              "Child safety",
              "Audit trail",
            ].map((t) => (
              <li key={`${k}-${t}`} className="flex items-center gap-10" aria-hidden={k > 0}>
                {t}
                <span className="text-accent">/</span>
              </li>
            )),
          )}
        </ul>
      </div>

      {/* problem */}
      <section className="mx-auto mt-28 grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div data-reveal>
          <Eyebrow>The problem</Eyebrow>
          <H2>Compliance slips in the gaps between the clipboard, the inbox and the folder.</H2>
          <p className="mt-6 max-w-md text-ink-soft">
            Each tool holds a piece. Nobody holds the whole picture, so the
            lapsed certificate or the missing policy version is found by the
            assessor instead of by you.
          </p>
        </div>
        <div data-reveal className="relative min-h-72 sm:min-h-80">
          {[
            ["Fridge temps.xlsx", "last edited by someone in March", "left-0 top-2 -rotate-3"],
            ["Re: Re: WWCC for the new casual?", "11 unread replies", "right-0 top-24 rotate-2"],
            ["Policies / old / FINAL v3", "not sure which one is current", "left-6 bottom-0 -rotate-1"],
          ].map(([t, s, pos]) => (
            <div
              key={t}
              className={`absolute w-64 max-w-[80%] border border-line bg-surface p-4 shadow-md ${pos}`}
            >
              <p className="font-mono text-xs uppercase tracking-wider">{t}</p>
              <p className="mt-1 text-sm text-ink-soft">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* who + pains */}
      <section className="mx-auto mt-28 max-w-6xl px-5 sm:px-8">
        <div
          data-reveal
          className="flex flex-col gap-4 border-y border-line py-6 lg:flex-row lg:items-center lg:gap-10"
        >
          <p className="shrink-0 font-mono text-xs uppercase tracking-widest text-ink-soft">
            Built for
          </p>
          <ul className="flex flex-wrap gap-2">
            {services.map((c) => (
              <li key={c} className="rounded-full bg-tint px-4 py-2 text-sm font-semibold">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Where it goes wrong</Eyebrow>
            <H2 className="!text-[clamp(2rem,4vw,3.2rem)]">Six places centres lose the record.</H2>
            <p className="mt-5 max-w-sm text-ink-soft">
              Each one has a fix that does not depend on someone remembering.
            </p>
          </div>
          <ol data-stagger className="border-t border-ink">
            {pains.map(([pain, fix], i) => (
              <li
                key={pain}
                className="row-hover grid gap-3 border-b border-line py-6 md:grid-cols-[2.5rem_1fr_1fr] md:gap-6"
              >
                <span className="font-mono text-sm text-ink-soft">0{i + 1}</span>
                <p className="font-display text-xl font-bold leading-snug">{pain}</p>
                <p className="text-ink-soft">
                  <span className="mb-1 block font-mono text-[0.7rem] uppercase tracking-widest text-ink">
                    With CareKid
                  </span>
                  {fix}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* daily operations on the phone */}
      <section className="mx-auto mt-28 grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-reveal className="lg:order-2">
          <Eyebrow>On the floor</Eyebrow>
          <H2>Educators tick it off in the room, on a phone.</H2>
          <p className="mt-6 max-w-lg text-ink-soft">
            Scan the QR code on the door, work down the checks, add a photo if
            something is wrong and submit. Opening and closing checklists,
            playground and sleep checks, cleaning and food safety records all
            work the same way, and each one is stamped with who and when.
          </p>
          <ul className="mt-7 space-y-3">
            {[
              "QR-code room inspection forms",
              "Custom checklists you build yourself",
              "A missed check shows up the same day",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 font-semibold">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="lg:order-1">
          <PhoneMock />
        </div>
      </section>

      {/* platform */}
      <section id="platform" className="mx-auto mt-28 max-w-6xl px-5 sm:px-8">
        <div data-reveal>
          <Eyebrow>The platform</Eyebrow>
          <H2 className="max-w-3xl">
            {modules.length} modules and {featureCount} features, one login.
          </H2>
          <p className="mt-5 max-w-xl text-ink-soft">
            Start with the daily work and the staff records, and add the rest as
            the centre grows into it. Pick a module to see what is in it.
          </p>
        </div>
        <ModuleExplorer />
      </section>

      {/* why: five differentiators */}
      <section id="why" className="mx-auto mt-28 max-w-6xl px-5 sm:px-8">
        <div data-reveal>
          <Eyebrow>Why CareKid</Eyebrow>
          <H2 className="max-w-3xl">
            More than a checklist app and a folder of PDFs.
          </H2>
          <p className="mt-5 max-w-xl text-ink-soft">
            Five things that turn compliance into something the director can
            see and act on every morning.
          </p>
        </div>
        <div className="mt-14 space-y-24">
          {differentiators.map((d, i) => (
            <div
              key={d.id}
              data-reveal
              className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 border-t border-ink pt-8 lg:grid-cols-2 lg:gap-16"
            >
              <div className={i % 2 ? "lg:order-2" : ""}>
                <span className="font-mono text-sm text-ink-soft">{d.n}</span>
                <h3 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold leading-[1.05] tracking-tight">
                  {d.title}
                </h3>
                <p className="mt-4 max-w-lg text-ink-soft">{d.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {d.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 font-semibold">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                        <Icon name="check" className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={i % 2 ? "lg:order-1" : ""}>{visuals[d.id]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* regulation: dark */}
      <section id="rules" className="mt-28 bg-ink py-24 text-bg">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div data-reveal className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>Regulation</Eyebrow>
              <H2>Built on the National Quality Framework, kept honest.</H2>
            </div>
            <p className="self-end text-bg/75">
              CareKid maintains a versioned rules library covering the National
              Quality Framework and state and territory obligations, including
              the recent child safety reforms on digital device policies, child
              protection training, staff screening and incident notifications.
              It never blurs what the law requires with what is only a good
              idea.
            </p>
          </div>
          <ul data-stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-bg/15 md:grid-cols-3">
            {kinds.map((k) => (
              <li key={k.tag} className="bg-ink p-7">
                <span
                  className={`inline-block rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${
                    k.tag === "Required" ? "bg-accent text-ink" : "border border-bg/30 text-bg"
                  }`}
                >
                  {k.tag}
                </span>
                <h3 className="mt-5 font-display text-2xl font-extrabold">{k.title}</h3>
                <p className="mt-3 text-bg/70">{k.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
            <div data-reveal>
              <h3 className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.05] tracking-tight">
                The assessor asks. The history is already there.
              </h3>
              <p className="mt-5 max-w-md text-bg/75">
                Every change keeps who, what and when. Incident, child safety
                and sensitive staff records sit behind restricted roles, with
                retention settings you control. Escalation stays a human
                decision.
              </p>
              <p className="mt-5 max-w-md text-sm text-bg/60">
                AI findings are prompts for review with their source attached.
                A score or a finding never proves a centre is legally compliant.
              </p>
            </div>
            <div data-reveal>
              <TrailMock />
            </div>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="mx-auto mt-28 max-w-6xl px-5 sm:px-8">
        <div data-reveal>
          <Eyebrow>How it works</Eyebrow>
          <H2 className="max-w-2xl">Three steps from sign-up to evidence pack.</H2>
        </div>
        <ol data-stagger className="mt-12 grid gap-10 border-t border-ink pt-8 md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li key={t}>
              <span className="font-mono text-sm text-ink-soft">Step {i + 1}</span>
              <h3 className="mt-2 font-display text-3xl font-extrabold">{t}</h3>
              <p className="mt-3 max-w-xs text-ink-soft">{d}</p>
            </li>
          ))}
        </ol>
        <p data-reveal className="mt-14 max-w-2xl border-l-4 border-accent pl-5 text-ink-soft">
          <strong className="text-ink">What CareKid leaves alone.</strong>{" "}
          Childcare subsidy billing, enrolments, parent messaging and full
          rostering stay in your existing childcare management system. CareKid
          sits beside it.
        </p>
      </section>

      {/* pricing */}
      <section id="pricing" className="mx-auto mt-28 max-w-6xl px-5 sm:px-8">
        <div data-reveal>
          <Eyebrow>Pricing</Eyebrow>
          <H2 className="max-w-3xl">One price per centre. No per-educator fees.</H2>
          <p className="mt-5 max-w-xl text-ink-soft">
            Pilot pricing for independent centres. Final plans will be confirmed
            with the first group of centres.
          </p>
        </div>
        <ul data-stagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <li
              key={p.name}
              className={`flex flex-col rounded-[1.75rem] border p-7 ${
                p.featured ? "border-ink bg-accent" : "border-line bg-surface"
              }`}
            >
              <p className="eyebrow">{p.name}</p>
              <p className="mt-4 font-display text-5xl font-extrabold tracking-tight">
                {p.price}
              </p>
              <p className="mt-1 text-sm opacity-70">{p.note}</p>
              <p className="mt-5 text-[15px]">{p.blurb}</p>
              <ul className="mt-6 flex-1 space-y-2.5 border-t border-ink/15 pt-6">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-[15px] font-medium">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href="#demo" variant={p.featured ? "ink" : "ghost"}>
                  Book a demo
                </ButtonLink>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* faq */}
      <section id="faq" className="mx-auto mt-28 grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Questions</Eyebrow>
          <H2 className="!text-[clamp(2rem,4vw,3.2rem)]">Straight answers.</H2>
        </div>
        <div data-reveal>
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
