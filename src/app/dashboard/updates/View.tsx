"use client";

import { Icon } from "@/components/Icons";
import { useCentre } from "@/components/app/CentreContext";
import { PickCentre } from "@/components/app/PickCentre";
import { ChildAvatar, StatusPill } from "@/components/app/ChildBits";
import { attOf, kidsOf, notesOf, ops, useOps } from "@/components/app/OpsStore";
import { Card, PageHead, Pill, Stat } from "@/components/app/ui";

export function View() {
  const { centre } = useCentre();
  const o = useOps();
  if (!centre) return <PickCentre title="Family updates" what="Family updates" />;
  const list = kidsOf(o, centre.id).filter((k) => attOf(o, k).status !== "absent");
  const ready = list.filter((k) => notesOf(o, k).some((n) => n.share) && !o.sent[k.id]);

  return (
    <div className="space-y-6">
      <PageHead
        title="Family updates"
        sub={`${centre.name}. Notes marked "include in the family update" are gathered into one message per child. Staff-only notes are never included.`}
        right={
          <button
            type="button"
            disabled={ready.length === 0}
            onClick={() => ready.forEach((k) => ops.sendUpdate(k.id))}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg hover:bg-ink/85 disabled:bg-tint disabled:text-ink-soft"
          >
            <Icon name="send" className="h-4 w-4" /> Send all ({ready.length})
          </button>
        }
      />
      <div className="grid grid-cols-3 gap-4">
        <Stat value={String(ready.length)} label="Ready to send" hot={ready.length > 0} />
        <Stat value={String(Object.keys(o.sent).length)} label="Sent today" />
        <Stat value={String(list.filter((k) => !notesOf(o, k).some((n) => n.share)).length)} label="Nothing to share yet" />
      </div>
      <p className="text-sm text-ink-soft">This demo marks updates as sent. It does not message anyone.</p>
      <ul className="space-y-4">
        {list.map((k) => {
          const shared = notesOf(o, k).filter((n) => n.share);
          const sent = o.sent[k.id];
          return (
            <li key={k.id}>
              <Card>
                <div className="flex flex-wrap items-center gap-4 px-5 py-4">
                  <ChildAvatar child={k} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-extrabold">{k.first} {k.last}</span>
                    <span className="block text-sm text-ink-soft">To {k.guardians.map((g) => g.name.split(" ")[0]).join(" and ")}</span>
                  </span>
                  <StatusPill status={attOf(o, k).status} />
                  {sent ? (
                    <Pill tone="ok">Sent {sent}</Pill>
                  ) : (
                    <button type="button" disabled={shared.length === 0} onClick={() => ops.sendUpdate(k.id)} className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-4 py-2 text-sm font-semibold hover:bg-tint disabled:opacity-40">
                      <Icon name="send" className="h-4 w-4" /> Send
                    </button>
                  )}
                </div>
                <div className="border-t border-line bg-tint/50 px-5 py-4 text-sm">
                  {shared.length ? (
                    <>
                      <p className="font-semibold">Hi {k.guardians.map((g) => g.name.split(" ")[0]).join(" and ")}, here is {k.first}&apos;s day.</p>
                      <ul className="mt-2 space-y-1.5">
                        {shared.map((n) => (
                          <li key={n.id}><span className="font-semibold">{n.at}</span> · {n.text}</li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-ink-soft">Nothing marked to share yet.</p>
                  )}
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
