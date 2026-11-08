"use client";

import { useState } from "react";
import { Icon } from "@/components/Icons";
import { Card, PageHead, Pill, Progress } from "@/components/app/ui";
import { useCentre } from "@/components/app/CentreContext";
import { PickCentre } from "@/components/app/PickCentre";
import { checklists, type Centre } from "@/lib/demo";

export function View() {
  const { centre } = useCentre();
  if (!centre) return <PickCentre title="Daily checks" what="Daily checks" />;
  return <Checks key={centre.id} centre={centre} />;
}

function Checks({ centre }: { centre: Centre }) {
  const lists = checklists.filter((c) => c.id in centre.lists);
  const [done, setDone] = useState<Record<string, string[]>>(
    Object.fromEntries(lists.map((c) => [c.id, c.checks.slice(0, centre.lists[c.id]).map((k) => k.id)])),
  );
  const [signed, setSigned] = useState<Record<string, string>>({});

  const toggle = (list: string, id: string) =>
    setDone((d) => ({
      ...d,
      [list]: d[list].includes(id) ? d[list].filter((x) => x !== id) : [...d[list], id],
    }));

  const total = lists.reduce((n, c) => n + c.checks.length, 0);
  const complete = Object.values(done).reduce((n, l) => n + l.length, 0);

  return (
    <div className="space-y-6">
      <PageHead
        title="Daily checks"
        sub={`${centre.name}. Tick the checks as they are done. Each submitted checklist is stamped with who and when.`}
        right={<Pill tone="neutral">{complete} of {total} checks done</Pill>}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {lists.map((c) => {
          const d = done[c.id];
          const pct = Math.round((d.length / c.checks.length) * 100);
          const all = d.length === c.checks.length;
          return (
            <Card
              key={c.id}
              title={c.title}
              right={
                signed[c.id] ? <Pill tone="ok">Submitted {signed[c.id]}</Pill> : <Pill tone={all ? "ok" : "owed"}>{pct}%</Pill>
              }
            >
              <div className="px-5 pt-4">
                <p className="text-sm text-ink-soft">
                  {c.room} · {c.owner}
                </p>
                <div className="mt-3">
                  <Progress pct={pct} />
                </div>
              </div>
              <ul className="mt-2 divide-y divide-line px-5">
                {c.checks.map((k) => {
                  const on = d.includes(k.id);
                  return (
                    <li key={k.id}>
                      <button
                        type="button"
                        disabled={!!signed[c.id]}
                        onClick={() => toggle(c.id, k.id)}
                        aria-pressed={on}
                        className="flex w-full items-center gap-3 py-3 text-left disabled:cursor-default"
                      >
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${on ? "border-ink bg-ink text-bg" : "border-ink/30"}`}
                        >
                          {on && <Icon name="check" className="h-3.5 w-3.5" />}
                        </span>
                        <span className={on ? "text-ink-soft line-through" : "font-medium"}>{k.text}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="px-5 pb-5 pt-3">
                <button
                  type="button"
                  disabled={!all || !!signed[c.id]}
                  onClick={() =>
                    setSigned((s) => ({
                      ...s,
                      [c.id]: new Date().toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" }),
                    }))
                  }
                  className="w-full rounded-full bg-ink py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-ink/85 disabled:bg-tint disabled:text-ink-soft"
                >
                  {signed[c.id] ? "Submitted" : all ? "Submit checklist" : "Finish all checks to submit"}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
