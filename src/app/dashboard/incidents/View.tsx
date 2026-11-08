"use client";

import { Icon } from "@/components/Icons";
import { Card, PageHead, Pill } from "@/components/app/ui";
import { useCentre } from "@/components/app/CentreContext";
import { centres } from "@/lib/demo";

export function View() {
  const { centre } = useCentre();
  const incidents = (centre ? [centre] : centres).flatMap((c) =>
    c.incidents.map((i) => ({ ...i, centre: c.name })),
  );
  return (
    <div className="space-y-6">
      <PageHead
        title="Incident and risk"
        sub={`${centre?.name ?? "All centres"}. Every report has an owner, corrective actions and a trail. Access is limited to the roles you choose.`}
        right={
          <span className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-2 text-sm font-semibold text-ink-soft">
            <Icon name="lock" className="h-4 w-4" /> Restricted access
          </span>
        }
      />
      <Card>
        <ul className="divide-y divide-line">
          {incidents.map((i) => (
            <li key={i.centre + i.id} className="row-hover flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4">
              <span className="w-24 shrink-0 font-mono text-xs text-ink-soft">{i.id}</span>
              <span className="min-w-0 flex-1 basis-64">
                <span className="block font-semibold">{i.title}</span>
                <span className="block text-sm text-ink-soft">
                  {!centre && `${i.centre} · `}{i.kind} · {i.room} · {i.when} · Owner {i.owner}
                </span>
              </span>
              <span className="text-sm text-ink-soft">
                {i.actions[0]} of {i.actions[1]} actions done
              </span>
              <Pill tone={i.status === "Closed" ? "ok" : i.status === "Open" ? "late" : "owed"}>
                {i.status}
              </Pill>
            </li>
          ))}
        </ul>
      </Card>
      <p className="rounded-2xl bg-tint p-5 text-sm text-ink-soft">
        <strong className="text-ink">Serious incidents.</strong> CareKid prompts you when a report may need to
        be notified to the regulator. Whether and when to notify is always a decision for the approved
        provider or nominated supervisor.
      </p>
    </div>
  );
}
