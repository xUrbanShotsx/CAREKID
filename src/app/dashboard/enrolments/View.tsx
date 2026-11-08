"use client";

import Link from "next/link";
import { useState } from "react";
import { useCentre } from "@/components/app/CentreContext";
import { ChildForm } from "@/components/app/ChildForm";
import { enquiriesOf, ops, useOps } from "@/components/app/OpsStore";
import { Card, PageHead, Pill, Progress, Stat } from "@/components/app/ui";
import { ALL_DAYS } from "@/lib/children";
import { centres } from "@/lib/demo";
import { STAGES, type Enquiry } from "@/lib/enrol";

const field = "mt-1.5 w-full rounded-xl border border-ink/25 bg-bg px-3 py-2.5";
const SOURCES = ["Website", "Referral", "Google", "School newsletter", "Walk-in", "Staff family"];

/** Turns "Mon to Fri" or "Tue, Thu" into a list of days. */
function parseDays(s: string): string[] {
  const m = s.match(/(Mon|Tue|Wed|Thu|Fri)\s+to\s+(Mon|Tue|Wed|Thu|Fri)/);
  if (m) return ALL_DAYS.slice(ALL_DAYS.indexOf(m[1]), ALL_DAYS.indexOf(m[2]) + 1);
  const found = ALL_DAYS.filter((d) => s.includes(d));
  return found.length ? found : ["Mon", "Tue", "Wed"];
}

export function View() {
  const { centre } = useCentre();
  const o = useOps();
  const [adding, setAdding] = useState(false);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const list = enquiriesOf(o, centre?.id).sort((a, b) => b.score - a.score);
  const n = (s: string) => list.filter((e) => e.stage === s).length;
  const open = list.filter((e) => e.stage !== "Enrolled" && e.stage !== "Declined");
  const centreName = (id: string) => centres.find((c) => c.id === id)?.name;

  return (
    <div className="space-y-6">
      <PageHead
        title="Enrolments and waitlist"
        sub={`${centre?.name ?? "All centres"}. Track every enquiry from first contact to an enrolled child. Enrolling creates the child's profile, roll entry and health record.`}
        right={
          <button type="button" onClick={() => setAdding((a) => !a)} className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg hover:bg-ink/85">
            {adding ? "Close" : "Add enquiry"}
          </button>
        }
      />
      {adding && <AddEnquiry centreId={centre?.id} onDone={() => setAdding(false)} />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat value={String(open.length)} label="Open enquiries" />
        <Stat value={String(n("Tour booked"))} label="Tours booked" />
        <Stat value={String(n("Offered a place") + n("Enrolment form sent"))} label="Offers out" hot />
        <Stat value={String(n("Enrolled"))} label="Enrolled" />
      </div>
      <Card title="Waitlist">
        <ul className="divide-y divide-line">
          {list.map((e, i) => (
            <li key={e.id} className="px-5 py-4">
              <div className="grid gap-3 xl:grid-cols-[2rem_1.3fr_1fr_1fr_auto] xl:items-center xl:gap-5">
                <span className="font-mono text-sm text-ink-soft">{i + 1}</span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-extrabold">{e.child} <span className="text-sm font-normal text-ink-soft">{e.age}</span></span>
                  <span className="block text-sm text-ink-soft">
                    {e.parent} · {e.days} · from {e.start}
                    {!centre && ` · ${centreName(e.centreId)}`}
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
                <span className="flex flex-wrap items-center gap-2">
                  {e.childId ? (
                    <Link href={`/dashboard/children/${e.childId}`} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold hover:brightness-95">View profile</Link>
                  ) : (
                    <>
                      {e.form < 100 && (e.stage === "Offered a place" || e.stage === "Enrolment form sent") && (
                        <button type="button" onClick={() => ops.patchEnquiry(e.id, { form: 100, stage: "Enrolment form sent" })} className="rounded-full border border-line px-4 py-2 text-sm font-semibold hover:bg-tint">Form received</button>
                      )}
                      {(e.stage === "Offered a place" || e.stage === "Enrolment form sent") && (
                        <button type="button" onClick={() => setEnrolling(enrolling === e.id ? null : e.id)} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg hover:bg-ink/85">Enrol as child</button>
                      )}
                      <select
                        value={e.stage}
                        onChange={(ev) => {
                          if (ev.target.value === "Enrolled") setEnrolling(e.id);
                          else ops.patchEnquiry(e.id, { stage: ev.target.value as Enquiry["stage"] });
                        }}
                        aria-label={`Stage for ${e.child}`}
                        className="rounded-xl border border-ink/25 bg-bg px-3 py-2 text-sm"
                      >
                        {STAGES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </>
                  )}
                </span>
              </div>
              {enrolling === e.id && (
                <div className="mt-4">
                  <ChildForm
                    centreId={e.centreId}
                    submitLabel="Enrol child"
                    initial={{
                      first: e.child.split(" ")[0],
                      last: e.child.split(" ").slice(1).join(" "),
                      guardianName: e.parent,
                      guardianPhone: e.phone ?? "",
                      guardianEmail: e.email ?? "",
                      days: parseDays(e.days),
                    }}
                    onCancel={() => setEnrolling(null)}
                    onSubmit={(child) => {
                      ops.addKid(child);
                      ops.patchEnquiry(e.id, { stage: "Enrolled", childId: child.id, form: 100 });
                      setEnrolling(null);
                    }}
                  />
                </div>
              )}
            </li>
          ))}
          {list.length === 0 && <li className="px-5 py-6 text-ink-soft">No enquiries yet.</li>}
        </ul>
      </Card>
    </div>
  );
}

function AddEnquiry({ centreId, onDone }: { centreId?: string; onDone: () => void }) {
  const [centre, setCentre] = useState(centreId ?? centres[0].id);
  const [v, setV] = useState({ child: "", age: "", parent: "", phone: "", email: "", start: "", source: SOURCES[0], note: "", days: ["Mon", "Tue", "Wed"] });
  const toggle = (d: string) => setV((p) => ({ ...p, days: p.days.includes(d) ? p.days.filter((x) => x !== d) : [...p.days, d] }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        ops.addEnquiry({
          id: `new-${Date.now().toString(36)}`,
          centreId: centre,
          child: v.child.trim(),
          age: v.age.trim(),
          parent: v.parent.trim(),
          phone: v.phone.trim(),
          email: v.email.trim(),
          days: ALL_DAYS.filter((d) => v.days.includes(d)).join(", "),
          start: v.start.trim() || "To be confirmed",
          source: v.source,
          score: 50 + (v.note.toLowerCase().includes("sibling") ? 20 : 0),
          stage: "Enquiry",
          form: 0,
          note: v.note.trim() || undefined,
        });
        onDone();
      }}
      className="space-y-4 rounded-2xl border border-ink bg-surface p-5 sm:p-6"
    >
      <h2 className="font-display text-lg font-extrabold">New enquiry</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {!centreId && (
          <label className="block text-sm font-semibold">Centre
            <select value={centre} onChange={(e) => setCentre(e.target.value)} className={field}>
              {centres.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
        )}
        <label className="block text-sm font-semibold">Child&apos;s full name<input required value={v.child} onChange={(e) => setV({ ...v, child: e.target.value })} className={field} /></label>
        <label className="block text-sm font-semibold">Child&apos;s age<input required value={v.age} onChange={(e) => setV({ ...v, age: e.target.value })} placeholder="For example 18 months" className={field} /></label>
        <label className="block text-sm font-semibold">Parent&apos;s full name<input required value={v.parent} onChange={(e) => setV({ ...v, parent: e.target.value })} className={field} /></label>
        <label className="block text-sm font-semibold">Mobile<input type="tel" value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} className={field} /></label>
        <label className="block text-sm font-semibold">Email<input type="email" value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} className={field} /></label>
        <label className="block text-sm font-semibold">Wanted start<input value={v.start} onChange={(e) => setV({ ...v, start: e.target.value })} placeholder="For example Feb 2027" className={field} /></label>
        <label className="block text-sm font-semibold">How they heard
          <select value={v.source} onChange={(e) => setV({ ...v, source: e.target.value })} className={field}>
            {SOURCES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold">Note<input value={v.note} onChange={(e) => setV({ ...v, note: e.target.value })} placeholder="For example sibling already enrolled" className={field} /></label>
      </div>
      <div>
        <p className="text-sm font-semibold">Days wanted</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {ALL_DAYS.map((d) => (
            <button key={d} type="button" aria-pressed={v.days.includes(d)} onClick={() => toggle(d)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${v.days.includes(d) ? "border-ink bg-ink text-bg" : "border-line hover:bg-tint"}`}>{d}</button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="rounded-full bg-ink px-6 py-2.5 font-semibold text-bg hover:bg-ink/85">Add enquiry</button>
        <button type="button" onClick={onDone} className="rounded-full border border-line px-6 py-2.5 font-semibold hover:bg-tint">Cancel</button>
      </div>
    </form>
  );
}
