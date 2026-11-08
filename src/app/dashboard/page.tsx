import Link from "next/link";
import { Icon } from "@/components/Icons";
import { Card, PageHead, Pill, Stat } from "@/components/app/ui";
import { actions, aiInsight, briefing, centre, incidents, me, tiles } from "@/lib/demo";

export default function Overview() {
  const open = incidents.filter((i) => i.status !== "Closed").length;
  return (
    <div className="space-y-6">
      <PageHead
        title={`Good morning, ${me.name.split(" ")[0]}.`}
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
        {tiles.map((t) => (
          <Stat key={t.label} {...t} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Card
          title="Outstanding actions"
          right={<span className="text-xs text-ink-soft">{actions.length} open</span>}
        >
          <ul className="divide-y divide-line">
            {actions.map((a) => (
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
              {briefing.map(([n, t]) => (
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
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{aiInsight}</p>
            <p className="mt-3 text-xs text-ink-soft">
              A prompt for review, not a compliance score.
            </p>
          </section>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["/dashboard/daily", "Daily checks", "18 of 22 done today", "check"],
          ["/dashboard/staff", "Staff credentials", "3 expiring or missing", "users"],
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
