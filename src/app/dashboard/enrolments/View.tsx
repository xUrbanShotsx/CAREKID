"use client";

import { useCentre } from "@/components/app/CentreContext";
import { ops, useOps } from "@/components/app/OpsStore";
import { Card, PageHead, Pill, Progress, Stat } from "@/components/app/ui";
import { enquiries, STAGES } from "@/lib/enrol";
import { centres } from "@/lib/demo";

export function View() {
  const { centre } = useCentre();
  const o = useOps();
  const list = (centre ? enquiries.filter((e) => e.centreId === centre.id) : enquiries)
    .map((e) => ({ ...e, stage: (o.stage[e.id] ?? e.stage) as (typeof STAGES)[number] }))
    .sort((a, b) => b.score - a.score);
  const n = (s: string) => list.filter((e) => e.stage === s).length;

  return (
    <div className="space-y-6">
      <PageHead
        title="Enrolments and waitlist"
        sub={`${centre?.name ?? "All centres"}. Track every enquiry from first contact to an enrolled child. Ranked by your own priority rules.`}
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat value={String(list.length)} label="Open enquiries" />
        <Stat value={String(n("Tour booked"))} label="Tours booked" />
        <Stat value={String(n("Offered a place") + n("Enrolment form sent"))} label="Offers out" hot />
        <Stat value={String(n("Enrolled"))} label="Enrolled" />
      </div>
      <Card title="Waitlist">
        <ul className="divide-y divide-line">
          {list.map((e, i) => (
            <li key={e.id} className="grid gap-3 px-5 py-4 lg:grid-cols-[2rem_1.3fr_1fr_1fr_auto] lg:items-center lg:gap-5">
              <span className="font-mono text-sm text-ink-soft">{i + 1}</span>
              <span className="min-w-0">
                <span className="block font-display text-lg font-extrabold">{e.child} <span className="text-sm font-normal text-ink-soft">{e.age}</span></span>
                <span className="block text-sm text-ink-soft">
                  {e.parent} · {e.days} · from {e.start}
                  {!centre && ` · ${centres.find((c) => c.id === e.centreId)?.name}`}
                </span>
                {e.note && <span className="block text-sm font-semibold">{e.note}</span>}
              </span>
              <span>
                <span className="mb-1 block text-xs text-ink-soft">Enrolment form {e.form}%</span>
                <Progress pct={e.form} />
              </span>
              <span className="text-sm">
                <span className="block text-xs text-ink-soft">Priority {e.score} · {e.source}</span>
                <Pill tone={e.stage === "Enrolled" ? "ok" : e.stage === "Declined" ? "neutral" : "owed"}>{e.stage}</Pill>
              </span>
              <select
                value={e.stage}
                onChange={(ev) => ops.setStage(e.id, ev.target.value)}
                aria-label={`Stage for ${e.child}`}
                className="rounded-xl border border-ink/25 bg-bg px-3 py-2 text-sm"
              >
                {STAGES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
