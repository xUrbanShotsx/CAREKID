"use client";

import { Card, PageHead, Pill, Progress } from "@/components/app/ui";
import { useCentre } from "@/components/app/CentreContext";
import { PickCentre } from "@/components/app/PickCentre";
import { policies } from "@/lib/demo";

export function View() {
  const { centre } = useCentre();
  if (!centre) return <PickCentre title="Policies and procedures" what="Policies" />;
  const headcount = centre.staff.length;
  return (
    <div className="space-y-6">
      <PageHead
        title="Policies and procedures"
        sub={`${centre.name}. One approved version of each policy, a review date, and a record of who has read it.`}
      />
      <Card>
        <ul className="divide-y divide-line">
          {policies.map((p, i) => {
            const read = centre.policyRead[i];
            const days = centre.policyDays[i];
            const review = days < 0 ? "Review overdue" : days >= 999 ? "Not scheduled" : days < 60 ? `In ${days} days` : `In ${Math.round(days / 30)} months`;
            const pct = Math.min(100, Math.round((read / headcount) * 100));
            return (
              <li key={p.name} className="grid gap-3 px-5 py-4 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center md:gap-6">
                <span className="min-w-0">
                  <span className="block font-semibold">{p.name}</span>
                  <span className="block text-sm text-ink-soft">
                    {p.version} · {p.ref}
                  </span>
                </span>
                <span>
                  <span className="mb-1 block text-xs text-ink-soft">
                    Read by {Math.min(read, headcount)} of {headcount}
                  </span>
                  <Progress pct={pct} />
                </span>
                <span className="text-sm">
                  <span className="block text-xs text-ink-soft">Review</span>
                  {days < 0 ? <Pill tone="late">{review}</Pill> : days <= 30 ? <Pill tone="owed">{review}</Pill> : review}
                </span>
                <Pill tone={p.status === "Approved" ? "ok" : p.status === "In review" ? "owed" : "neutral"}>
                  {p.status}
                </Pill>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
