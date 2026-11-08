"use client";

import { useState } from "react";
import { Icon } from "@/components/Icons";
import { useCentre } from "@/components/app/CentreContext";
import { Alert } from "@/components/app/ChildBits";
import { incidentsOf, kidsOf, ops, useOps } from "@/components/app/OpsStore";
import { Card, PageHead, Pill, Stat } from "@/components/app/ui";
import { centres, type Incident } from "@/lib/demo";

const field = "mt-1.5 w-full rounded-xl border border-ink/25 bg-bg px-3 py-2.5";
const KINDS: Incident["kind"][] = ["Injury", "Near miss", "Hazard", "Illness"];

export function View() {
  const { centre } = useCentre();
  const o = useOps();
  const [adding, setAdding] = useState(false);
  const [justAdded, setJustAdded] = useState<Incident["kind"] | null>(null);
  const incidents = incidentsOf(o, centre?.id);
  const name = (id: string) => centres.find((c) => c.id === id)?.name;
  const open = incidents.filter((i) => i.status !== "Closed").length;

  return (
    <div className="space-y-6">
      <PageHead
        title="Incident and risk"
        sub={`${centre?.name ?? "All centres"}. Every report has an owner, corrective actions and a trail. Access is limited to the roles you choose.`}
        right={
          <span className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-2 text-sm font-semibold text-ink-soft">
              <Icon name="lock" className="h-4 w-4" /> Restricted access
            </span>
            <button type="button" onClick={() => setAdding((a) => !a)} className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg hover:bg-ink/85">
              {adding ? "Close" : "Report an incident"}
            </button>
          </span>
        }
      />
      {justAdded === "Injury" || justAdded === "Illness" ? (
        <Alert>
          Check whether this needs to be notified to the regulator and to the family. CareKid prompts you, but whether and when to notify is a decision for the approved provider or nominated supervisor.
        </Alert>
      ) : null}
      {adding && (
        <ReportForm
          centreId={centre?.id}
          onDone={(kind) => {
            setAdding(false);
            if (kind) setJustAdded(kind);
          }}
        />
      )}
      <div className="grid grid-cols-3 gap-4">
        <Stat value={String(incidents.length)} label="Reports" />
        <Stat value={String(open)} label="Still open" hot={open > 0} />
        <Stat value={String(incidents.filter((i) => i.status === "Closed").length)} label="Closed" />
      </div>
      <Card>
        <ul className="divide-y divide-line">
          {incidents.map((i) => (
            <li key={i.centreId + i.id} className="row-hover flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4">
              <span className="w-24 shrink-0 font-mono text-xs text-ink-soft">{i.id}</span>
              <span className="min-w-0 flex-1 basis-64">
                <span className="block font-semibold">{i.title}</span>
                <span className="block text-sm text-ink-soft">
                  {!centre && `${name(i.centreId)} · `}{i.kind} · {i.room} · {i.when} · Owner {i.owner}
                </span>
              </span>
              <span className="text-sm text-ink-soft">{i.actions[0]} of {i.actions[1]} actions done</span>
              <Pill tone={i.status === "Closed" ? "ok" : i.status === "Open" ? "late" : "owed"}>{i.status}</Pill>
            </li>
          ))}
        </ul>
      </Card>
      <p className="rounded-2xl bg-tint p-5 text-sm text-ink-soft">
        <strong className="text-ink">Serious incidents.</strong> CareKid prompts you when a report may need to be notified to the regulator. Whether and when to notify is always a decision for the approved provider or nominated supervisor.
      </p>
    </div>
  );
}

function ReportForm({ centreId, onDone }: { centreId?: string; onDone: (kind?: Incident["kind"]) => void }) {
  const o = useOps();
  const [centre, setCentre] = useState(centreId ?? centres[0].id);
  const kids = kidsOf(o, centre);
  const staff = centres.find((c) => c.id === centre)!.staff;
  const [v, setV] = useState({ kind: "Injury" as Incident["kind"], title: "", room: "", owner: staff[0].name, child: "" });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const all = incidentsOf(o);
        const next = Math.max(...all.map((i) => Number(i.id.replace(/\D/g, "")) || 0)) + 1;
        const id = `INC-${String(next).padStart(4, "0")}`;
        const kid = kids.find((k) => k.id === v.child);
        ops.addIncident({
          id, centreId: centre, title: v.title.trim(), kind: v.kind,
          room: v.room.trim() || kid?.room || "Not recorded",
          status: "Open", actions: [0, 1], owner: v.owner, when: "Today",
        });
        if (kid) ops.addNote(kid.id, v.owner, "Health", `Incident ${id} reported: ${v.title.trim()}`, false);
        onDone(v.kind);
      }}
      className="space-y-4 rounded-2xl border border-ink bg-surface p-5 sm:p-6"
    >
      <h2 className="font-display text-lg font-extrabold">New incident report</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {!centreId && (
          <label className="block text-sm font-semibold">Centre
            <select value={centre} onChange={(e) => setCentre(e.target.value)} className={field}>
              {centres.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
        )}
        <label className="block text-sm font-semibold">Type
          <select value={v.kind} onChange={(e) => setV({ ...v, kind: e.target.value as Incident["kind"] })} className={field}>
            {KINDS.map((k) => <option key={k}>{k}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold sm:col-span-2">What happened
          <input required value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} className={field} />
        </label>
        <label className="block text-sm font-semibold">Child involved (optional)
          <select value={v.child} onChange={(e) => setV({ ...v, child: e.target.value })} className={field}>
            <option value="">None</option>
            {kids.map((k) => <option key={k.id} value={k.id}>{k.first} {k.last}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold">Location<input value={v.room} onChange={(e) => setV({ ...v, room: e.target.value })} placeholder="Defaults to the child's room" className={field} /></label>
        <label className="block text-sm font-semibold">Owner
          <select value={v.owner} onChange={(e) => setV({ ...v, owner: e.target.value })} className={field}>
            {staff.map((s) => <option key={s.name}>{s.name}</option>)}
          </select>
        </label>
      </div>
      <p className="text-sm text-ink-soft">If a child is selected, a staff-only note is added to their profile.</p>
      <div className="flex gap-3">
        <button type="submit" disabled={!v.title.trim()} className="rounded-full bg-ink px-6 py-2.5 font-semibold text-bg hover:bg-ink/85 disabled:bg-tint disabled:text-ink-soft">Submit report</button>
        <button type="button" onClick={() => onDone()} className="rounded-full border border-line px-6 py-2.5 font-semibold hover:bg-tint">Cancel</button>
      </div>
    </form>
  );
}
