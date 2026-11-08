"use client";

import Link from "next/link";
import { Icon } from "@/components/Icons";
import { useCentre } from "@/components/app/CentreContext";
import { Card, PageHead, Pill, Stat } from "@/components/app/ui";
import { attOf, counts, useOps } from "@/components/app/OpsStore";
import { childrenOf } from "@/lib/children";
import { centres, me } from "@/lib/demo";

export function OverviewView() {
  const { centre, setCentre } = useCentre();
  const o = useOps();
  const first = me.name.split(" ")[0];

  if (!centre) {
    const sum = (k: "overdue" | "missing" | "open") =>
      centres.reduce((n, c) => n + c.summary[k], 0);
    return (
      <div className="space-y-6">
        <PageHead
          title={`Good morning, ${first}.`}
          sub={`All ${centres.length} centres. Pick one to see its day, or compare them on one screen.`}
          right={
            <Link
              href="/dashboard/centres"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg hover:bg-ink/85"
            >
              Compare centres <Icon name="arrow" className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid grid-cols-3 gap-4">
          <Stat value={String(sum("overdue"))} label="Overdue actions" hot />
          <Stat value={String(sum("missing"))} label="Missing documents" />
          <Stat value={String(sum("open"))} label="Open issues" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {centres.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCentre(c.id)}
              className={`row-hover rounded-2xl border border-line p-5 text-left ${c.summary.overdue >= 4 ? "bg-accent/20" : ""}`}
            >
              <span className="flex items-start justify-between gap-3">
                <span>
                  <span className="block font-display text-lg font-extrabold">{c.name}</span>
                  <span className="block text-sm text-ink-soft">
                    {c.type} · {c.state}
                  </span>
                </span>
                <Pill tone={c.status === "Behind" ? "late" : c.status === "On track" ? "ok" : "owed"}>
                  {c.status}
                </Pill>
              </span>
              <span className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <span><b className="block font-display text-2xl">{c.summary.overdue}</b>overdue</span>
                <span><b className="block font-display text-2xl">{c.summary.missing}</b>missing docs</span>
                <span><b className="block font-display text-2xl">{c.summary.open}</b>open issues</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const kids = childrenOf(centre.id);
  const here = counts(o, kids);
  const severeIn = kids.filter(
    (k) => attOf(o, k).status === "in" && k.allergies.some((a) => a.severity === "Anaphylaxis"),
  ).length;
  const open = centre.incidents.filter((i) => i.status !== "Closed").length;
  const expiring = centre.staff.filter((s) =>
    [s.wwcc, s.firstAid, s.childProtection].some((d) => d <= 30),
  ).length;
  return (
    <div className="space-y-6">
      <PageHead
        title={`Good morning, ${first}.`}
        sub={`${centre.name}. Here is what needs you today.`}
        right={
          <Link
            href="/dashboard/nqs"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg hover:bg-ink/85"
          >
            <Icon name="download" className="h-4 w-4" /> Audit pack
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {centre.tiles.map((t) => (
          <Stat key={t.label} {...t} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Card
          title="Outstanding actions"
          right={<span className="text-xs text-ink-soft">{centre.actions.length} open</span>}
        >
          <ul className="divide-y divide-line">
            {centre.actions.map((a) => (
              <li key={a.task} className="row-hover flex items-center gap-4 px-5 py-3.5">
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{a.task}</span>
                  <span className="block text-sm text-ink-soft">{a.who}</span>
                </span>
                <Pill tone={a.when.includes("late") ? "late" : a.hot ? "owed" : "neutral"}>
                  {a.when}
                </Pill>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-6">
          <Card title="Director's morning briefing">
            <ul className="divide-y divide-line px-5">
              {centre.briefing.map(([n, t]) => (
                <li key={t} className="flex items-center gap-4 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent font-display text-lg font-extrabold">
                    {n}
                  </span>
                  <span className="font-semibold">{t}</span>
                </li>
              ))}
            </ul>
          </Card>

          <section className="rounded-2xl bg-tint p-5">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
              <Icon name="sparkle" className="h-4 w-4" /> CareKid AI insights
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{centre.insight}</p>
            <p className="mt-3 text-xs text-ink-soft">A prompt for review, not a compliance score.</p>
          </section>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["/dashboard/attendance", "Attendance", `${here.in} in, ${here.expected} still to arrive${severeIn ? `, ${severeIn} with anaphylaxis risk` : ""}`, "clock"],
          ["/dashboard/daily", "Daily checks", centre.tiles[0].value + " done today", "check"],
          ["/dashboard/staff", "Staff credentials", `${expiring} expiring or expired`, "users"],
          ["/dashboard/incidents", "Incidents", `${open} open`, "alert"],
        ].map(([href, t, s, icon]) => (
          <Link
            key={href}
            href={href}
            className="row-hover flex items-center gap-4 rounded-2xl border border-line p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tint">
              <Icon name={icon as "check"} className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display font-extrabold">{t}</span>
              <span className="block text-sm text-ink-soft">{s}</span>
            </span>
            <Icon name="arrow" className="h-4 w-4 text-ink-soft" />
          </Link>
        ))}
      </div>
    </div>
  );
}
