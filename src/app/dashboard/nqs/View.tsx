"use client";

import { Icon } from "@/components/Icons";
import { Card, PageHead, Pill, Progress } from "@/components/app/ui";
import { useCentre } from "@/components/app/CentreContext";
import { PickCentre } from "@/components/app/PickCentre";
import { qaNames } from "@/lib/demo";

export function View() {
  const { centre } = useCentre();
  if (!centre) return <PickCentre title="Assessment preparation" what="Assessment evidence packs" />;
  const qas = qaNames.map(([qa, name], i) => ({ qa, name, pct: centre.qas[i][0], gaps: centre.qas[i][1], evidence: centre.qas[i][2] }));
  const docs = qas.reduce((n, q) => n + q.evidence, 0);
  return (
    <div className="space-y-6">
      <PageHead
        title="Assessment preparation"
        sub={`${centre.name}. Evidence and possible gaps for each of the seven National Quality Standard Quality Areas.`}
        right={
          <span className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg">
            <Icon name="download" className="h-4 w-4" /> Export evidence pack
          </span>
        }
      />
      <Card title="Quality Areas" right={<span className="text-xs text-ink-soft">{docs} documents tagged</span>}>
        <ul className="divide-y divide-line">
          {qas.map((q) => (
            <li key={q.qa} className="grid gap-3 px-5 py-4 md:grid-cols-[1.6fr_1fr_auto] md:items-center md:gap-6">
              <span className="min-w-0 font-semibold">
                <span className="mr-3 font-mono text-xs text-ink-soft">{q.qa}</span>
                {q.name}
              </span>
              <span>
                <span className="mb-1 block text-xs text-ink-soft">
                  {q.evidence} pieces of evidence
                </span>
                <Progress pct={q.pct} />
              </span>
              <Pill tone={q.gaps >= 5 ? "late" : q.gaps >= 3 ? "owed" : "neutral"}>
                {q.gaps} possible gaps
              </Pill>
            </li>
          ))}
        </ul>
      </Card>
      <p className="text-sm text-ink-soft">
        Gaps are prompts to check your evidence. They are not a rating and do not predict an assessment outcome.
      </p>
    </div>
  );
}
