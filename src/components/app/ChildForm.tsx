"use client";

import { useState } from "react";
import { ALL_DAYS, ALLERGY, makeChild, ROOMS, type Child, type NewChild } from "@/lib/children";
import { centres } from "@/lib/demo";

const field = "mt-1.5 w-full rounded-xl border border-ink/25 bg-bg px-3 py-2.5";
const label = "block text-sm font-semibold";

/** Enrols a child. Used for a new child and when an enquiry is enrolled from the waitlist. */
export function ChildForm({
  centreId,
  initial,
  submitLabel = "Add child",
  onSubmit,
  onCancel,
}: {
  /** Fixed centre, or undefined to let the user choose one. */
  centreId?: string;
  initial?: Partial<NewChild>;
  submitLabel?: string;
  onSubmit: (child: Child) => void;
  onCancel: () => void;
}) {
  const [centre, setCentre] = useState(centreId ?? initial?.centreId ?? centres[0].id);
  const rooms = ROOMS[centre];
  const [v, setV] = useState({
    first: initial?.first ?? "",
    last: initial?.last ?? "",
    dob: initial?.dob ?? "",
    room: initial?.room ?? rooms[0].name,
    days: initial?.days ?? ["Mon", "Tue", "Wed"],
    language: initial?.language ?? "",
    guardianName: initial?.guardianName ?? "",
    guardianRelation: initial?.guardianRelation ?? "Mother",
    guardianPhone: initial?.guardianPhone ?? "",
    guardianEmail: initial?.guardianEmail ?? "",
    secondGuardian: "",
    secondPhone: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "Grandparent",
    allergies: [] as string[],
    condition: "",
    dietary: "",
    doctorName: "",
    doctorPhone: "",
    photoConsent: true,
  });
  const set = <K extends keyof typeof v>(k: K, val: (typeof v)[K]) => setV((p) => ({ ...p, [k]: val }));
  const toggle = (list: string[], x: string) => (list.includes(x) ? list.filter((i) => i !== x) : [...list, x]);
  const room = rooms.some((r) => r.name === v.room) ? v.room : rooms[0].name;

  const valid =
    v.first.trim() && v.last.trim() && v.dob && v.guardianName.trim() && v.guardianPhone.trim() &&
    v.emergencyName.trim() && v.emergencyPhone.trim() && v.days.length > 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid) return;
        onSubmit(makeChild({ ...v, room, centreId: centre }));
      }}
      className="space-y-6 rounded-2xl border border-ink bg-surface p-5 sm:p-6"
    >
      <fieldset className="space-y-4">
        <legend className="font-display text-lg font-extrabold">Child</legend>
        {!centreId && (
          <label className={label}>
            Centre
            <select value={centre} onChange={(e) => setCentre(e.target.value)} className={field}>
              {centres.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>First name<input required value={v.first} onChange={(e) => set("first", e.target.value)} className={field} /></label>
          <label className={label}>Last name<input required value={v.last} onChange={(e) => set("last", e.target.value)} className={field} /></label>
          <label className={label}>Date of birth<input required type="date" value={v.dob} onChange={(e) => set("dob", e.target.value)} className={field} /></label>
          <label className={label}>Room
            <select value={room} onChange={(e) => set("room", e.target.value)} className={field}>
              {rooms.map((r) => <option key={r.name}>{r.name}</option>)}
            </select>
          </label>
          <label className={label}>Language at home<input value={v.language} onChange={(e) => set("language", e.target.value)} placeholder="English" className={field} /></label>
        </div>
        <div>
          <p className={label}>Booked days</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ALL_DAYS.map((d) => (
              <button key={d} type="button" aria-pressed={v.days.includes(d)} onClick={() => set("days", toggle(v.days, d))}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${v.days.includes(d) ? "border-ink bg-ink text-bg" : "border-line hover:bg-tint"}`}>{d}</button>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-lg font-extrabold">Parent or guardian</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>Full name<input required value={v.guardianName} onChange={(e) => set("guardianName", e.target.value)} className={field} /></label>
          <label className={label}>Relationship
            <select value={v.guardianRelation} onChange={(e) => set("guardianRelation", e.target.value)} className={field}>
              {["Mother", "Father", "Guardian", "Carer"].map((r) => <option key={r}>{r}</option>)}
            </select>
          </label>
          <label className={label}>Mobile<input required type="tel" value={v.guardianPhone} onChange={(e) => set("guardianPhone", e.target.value)} className={field} /></label>
          <label className={label}>Email<input type="email" value={v.guardianEmail} onChange={(e) => set("guardianEmail", e.target.value)} className={field} /></label>
          <label className={label}>Second parent (optional)<input value={v.secondGuardian} onChange={(e) => set("secondGuardian", e.target.value)} className={field} /></label>
          <label className={label}>Second parent mobile<input type="tel" value={v.secondPhone} onChange={(e) => set("secondPhone", e.target.value)} className={field} /></label>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-lg font-extrabold">Emergency contact</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className={label}>Name<input required value={v.emergencyName} onChange={(e) => set("emergencyName", e.target.value)} className={field} /></label>
          <label className={label}>Relationship<input value={v.emergencyRelation} onChange={(e) => set("emergencyRelation", e.target.value)} className={field} /></label>
          <label className={label}>Mobile<input required type="tel" value={v.emergencyPhone} onChange={(e) => set("emergencyPhone", e.target.value)} className={field} /></label>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-lg font-extrabold">Health</legend>
        <div>
          <p className={label}>Allergies</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.entries(ALLERGY).map(([k, a]) => (
              <button key={k} type="button" aria-pressed={v.allergies.includes(k)} onClick={() => set("allergies", toggle(v.allergies, k))}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${v.allergies.includes(k) ? "border-ink bg-accent" : "border-line hover:bg-tint"}`}>
                {a.name}{a.severity === "Anaphylaxis" ? " (anaphylaxis)" : ""}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>Medical conditions<input value={v.condition} onChange={(e) => set("condition", e.target.value)} placeholder="For example asthma, with action plan" className={field} /></label>
          <label className={label}>Dietary needs<input value={v.dietary} onChange={(e) => set("dietary", e.target.value)} className={field} /></label>
          <label className={label}>Doctor<input value={v.doctorName} onChange={(e) => set("doctorName", e.target.value)} className={field} /></label>
          <label className={label}>Doctor phone<input type="tel" value={v.doctorPhone} onChange={(e) => set("doctorPhone", e.target.value)} className={field} /></label>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={v.photoConsent} onChange={(e) => set("photoConsent", e.target.checked)} /> Family consents to photos and video for learning records
        </label>
      </fieldset>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={!valid} className="rounded-full bg-ink px-7 py-3 font-semibold text-bg hover:bg-ink/85 disabled:bg-tint disabled:text-ink-soft">{submitLabel}</button>
        <button type="button" onClick={onCancel} className="rounded-full border border-line px-6 py-3 font-semibold hover:bg-tint">Cancel</button>
      </div>
    </form>
  );
}
