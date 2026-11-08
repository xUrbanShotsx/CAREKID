"use client";

import { useState } from "react";
import { useCentre } from "@/components/app/CentreContext";
import { ops, staffOf, useNow, useOps } from "@/components/app/OpsStore";
import { Avatar, Card, Expiry, PageHead, Pill, Stat } from "@/components/app/ui";
import { centres } from "@/lib/demo";

const initials = (n: string) => n.split(" ").map((p) => p[0]).join("");
const field = "mt-1.5 w-full rounded-xl border border-ink/25 bg-bg px-3 py-2.5";

export function View() {
  const { centre } = useCentre();
  const o = useOps();
  const [adding, setAdding] = useState(false);
  const staff = staffOf(o, centre?.id);
  const name = (id: string) => centres.find((c) => c.id === id)?.name;
  const expiring = staff.filter((s) => [s.wwcc, s.firstAid, s.childProtection].some((d) => d <= 30)).length;
  const missing = staff.filter((s) => s.missing.length).length;

  return (
    <div className="space-y-6">
      <PageHead
        title="Staff and qualifications"
        sub={`${centre?.name ?? "All centres"}. Working with Children Check, first aid and child protection training for every educator, with expiry dates.`}
        right={
          <button type="button" onClick={() => setAdding((a) => !a)} className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg hover:bg-ink/85">
            {adding ? "Close" : "Add staff member"}
          </button>
        }
      />
      {adding && <AddStaff centreId={centre?.id} onDone={() => setAdding(false)} />}
      <div className="grid grid-cols-3 gap-4">
        <Stat value={String(staff.length)} label="Staff on file" />
        <Stat value={String(expiring)} label="With a credential expiring or expired" hot />
        <Stat value={String(missing)} label="With records missing" hot />
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-line font-mono text-xs uppercase tracking-widest text-ink-soft">
                <th className="px-5 py-3 font-normal">Educator</th>
                <th className="px-3 py-3 font-normal">WWCC</th>
                <th className="px-3 py-3 font-normal">First aid</th>
                <th className="px-3 py-3 font-normal">Child protection</th>
                <th className="px-5 py-3 font-normal">Missing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {staff.map((s) => (
                <tr key={s.centreId + s.name} className={s.firstAid < 0 ? "bg-accent/15" : ""}>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-3">
                      <Avatar initials={initials(s.name)} />
                      <span>
                        <span className="block font-semibold">{s.name}</span>
                        <span className="block text-sm text-ink-soft">{s.role}{!centre && ` · ${name(s.centreId)}`}</span>
                      </span>
                    </span>
                  </td>
                  <td className="px-3">{s.missing.includes("WWCC") ? <Pill tone="owed">Missing</Pill> : <Expiry days={s.wwcc} />}</td>
                  <td className="px-3">{s.missing.includes("First aid certificate") ? <Pill tone="owed">Missing</Pill> : <Expiry days={s.firstAid} />}</td>
                  <td className="px-3">{s.missing.includes("Child protection certificate") ? <Pill tone="owed">Missing</Pill> : <Expiry days={s.childProtection} />}</td>
                  <td className="px-5">
                    {s.missing.length ? <Pill tone="owed">{s.missing.join(", ")}</Pill> : <span className="text-sm text-ink-soft">None</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <p className="text-sm text-ink-soft">
        Reminders go to the educator and the director at 90, 60, 30 and 7 days before a credential expires.
      </p>
    </div>
  );
}

function AddStaff({ centreId, onDone }: { centreId?: string; onDone: () => void }) {
  const now = useNow();
  const [centre, setCentre] = useState(centreId ?? centres[0].id);
  const [v, setV] = useState({ name: "", role: "Educator", wwcc: "", firstAid: "", cp: "" });
  const days = (d: string) => (d ? Math.round((new Date(d).getTime() - now.getTime()) / 86400000) : 0);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const missing: string[] = [];
        if (!v.wwcc) missing.push("WWCC");
        if (!v.firstAid) missing.push("First aid certificate");
        if (!v.cp) missing.push("Child protection certificate");
        ops.addStaff({
          centreId: centre,
          name: v.name.trim(),
          role: v.role.trim(),
          wwcc: days(v.wwcc),
          firstAid: days(v.firstAid),
          childProtection: days(v.cp),
          missing,
        });
        onDone();
      }}
      className="space-y-4 rounded-2xl border border-ink bg-surface p-5 sm:p-6"
    >
      <h2 className="font-display text-lg font-extrabold">New staff member</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {!centreId && (
          <label className="block text-sm font-semibold">Centre
            <select value={centre} onChange={(e) => setCentre(e.target.value)} className={field}>
              {centres.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
        )}
        <label className="block text-sm font-semibold">Full name<input required value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} className={field} /></label>
        <label className="block text-sm font-semibold">Role<input required value={v.role} onChange={(e) => setV({ ...v, role: e.target.value })} className={field} /></label>
        <label className="block text-sm font-semibold">WWCC expiry<input type="date" value={v.wwcc} onChange={(e) => setV({ ...v, wwcc: e.target.value })} className={field} /></label>
        <label className="block text-sm font-semibold">First aid expiry<input type="date" value={v.firstAid} onChange={(e) => setV({ ...v, firstAid: e.target.value })} className={field} /></label>
        <label className="block text-sm font-semibold">Child protection training expiry<input type="date" value={v.cp} onChange={(e) => setV({ ...v, cp: e.target.value })} className={field} /></label>
      </div>
      <p className="text-sm text-ink-soft">Leave a date blank if the certificate has not been supplied. It will show as missing.</p>
      <div className="flex gap-3">
        <button type="submit" className="rounded-full bg-ink px-6 py-2.5 font-semibold text-bg hover:bg-ink/85">Add staff member</button>
        <button type="button" onClick={onDone} className="rounded-full border border-line px-6 py-2.5 font-semibold hover:bg-tint">Cancel</button>
      </div>
    </form>
  );
}
