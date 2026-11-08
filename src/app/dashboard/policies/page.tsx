import type { Metadata } from "next";
import { Card, PageHead, Pill, Progress } from "@/components/app/ui";
import { policies } from "@/lib/demo";

export const metadata: Metadata = { title: "Policies" };

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHead
        title="Policies and procedures"
        sub="One approved version of each policy, a review date, and a record of who has read it."
      />
      <Card>
        <ul className="divide-y divide-line">
          {policies.map((p) => {
            const pct = Math.round((p.read[0] / p.read[1]) * 100);
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
                    Read by {p.read[0]} of {p.read[1]}
                  </span>
                  <Progress pct={pct} />
                </span>
                <span className="text-sm">
                  <span className="block text-xs text-ink-soft">Review</span>
                  {p.daysToReview < 0 ? <Pill tone="late">{p.review}</Pill> : p.daysToReview <= 30 ? <Pill tone="owed">{p.review}</Pill> : p.review}
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
