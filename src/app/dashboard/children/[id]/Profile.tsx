"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icons";
import { Alert, ChildAvatar, Flags, StatusPill } from "@/components/app/ChildBits";
import { attOf, notesOf, ops, useNow, useOps } from "@/components/app/OpsStore";
import { Card, Expiry, Pill } from "@/components/app/ui";
import { ageText, getChild, NOTE_CATS, type Child, type NoteCat } from "@/lib/children";
import { centres } from "@/lib/demo";

const TABS = ["Overview", "Health", "Behaviour", "Family", "Notes", "Consents"] as const;
type Tab = (typeof TABS)[number];

export function Profile({ id }: { id: string }) {
  const child = getChild(id);
  if (!child)
    return (
      <div className="space-y-4">
        <p className="font-display text-2xl font-extrabold">Child not found</p>
        <Link href="/dashboard/children" className="font-semibold underline">Back to children</Link>
      </div>
    );
  return <Body child={child} />;
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-line py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
      <dt className="text-sm text-ink-soft">{k}</dt>
      <dd className="font-medium">{v}</dd>
    </div>
  );
}

function Body({ child }: { child: Child }) {
  const o = useOps();
  const now = useNow();
  const [tab, setTab] = useState<Tab>("Overview");
  const a = attOf(o, child);
  const centre = centres.find((c) => c.id === child.centreId)!;
  const severe = child.allergies.filter((x) => x.severity === "Anaphylaxis");
  const notes = notesOf(o, child);

  return (
    <div className="space-y-6">
      <Link href="/dashboard/children" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink">
        <Icon name="arrow" className="h-4 w-4 rotate-180" /> All children
      </Link>

      <div className="flex flex-wrap items-center gap-5">
        <ChildAvatar child={child} size="lg" />
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            {child.first} {child.last}
          </h1>
          <p className="mt-1 text-ink-soft">
            {ageText(child.dob, now)} · Born {new Date(child.dob).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })} · {child.room} · {centre.name}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusPill status={a.status} />
            <Flags child={child} />
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-2 text-sm font-semibold text-ink-soft">
          <Icon name="lock" className="h-4 w-4" /> Restricted
        </span>
      </div>

      {(severe.length > 0 || child.restriction) && (
        <div className="space-y-2">
          {severe.map((x) => (
            <Alert key={x.name}>
              Anaphylaxis risk: {x.name}. {x.plan}
            </Alert>
          ))}
          {child.restriction && <Alert>{child.restriction}</Alert>}
        </div>
      )}

      <div role="tablist" aria-label="Profile sections" className="no-bar flex gap-2 overflow-x-auto border-b border-line pb-3">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${tab === t ? "bg-ink text-bg" : "hover:bg-tint"}`}>
            {t}
            {t === "Notes" && <span className="ml-2 rounded-full bg-accent px-1.5 text-xs text-ink">{notes.length}</span>}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Enrolment">
            <dl className="px-5">
              <Row k="Room" v={child.room} />
              <Row k="Booked days" v={child.days.join(", ")} />
              <Row k="Language at home" v={child.language} />
              <Row k="Primary contact" v={`${child.guardians[0].name}, ${child.guardians[0].phone}`} />
              <Row k="Doctor" v={`${child.doctor.name}, ${child.doctor.phone}`} />
              <Row k="Immunisation" v={child.immunisation} />
            </dl>
          </Card>
          <Card title="Today">
            <dl className="px-5">
              <Row k="Status" v={<StatusPill status={a.status} />} />
              <Row k="Signed in" v={a.inAt ? `${a.inAt} by ${a.inBy}` : "Not yet"} />
              <Row k="Collected" v={a.outAt ? `${a.outAt} by ${a.outBy}` : "Not yet"} />
              {a.reason && <Row k="Absence" v={a.reason} />}
              <Row k="Notes today" v={`${notes.length}`} />
            </dl>
            <p className="px-5 pb-4 text-sm">
              <Link href="/dashboard/attendance" className="font-semibold underline">Go to the roll</Link>
            </p>
          </Card>
          <Card title="At a glance" className="lg:col-span-2">
            <div className="grid gap-px bg-line sm:grid-cols-3">
              {[
                ["Allergies", child.allergies.length ? child.allergies.map((x) => x.name).join(", ") : "None recorded"],
                ["Medication on site", child.medications.length ? child.medications.map((m) => m.name).join(", ") : "None"],
                ["Comfort", child.behaviour.comfort],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface p-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">{k}</p>
                  <p className="mt-1.5 font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "Health" && (
        <div className="space-y-6">
          <Card title="Allergies and action plans">
            {child.allergies.length === 0 ? (
              <p className="px-5 py-5 text-ink-soft">No allergies recorded.</p>
            ) : (
              <ul className="divide-y divide-line">
                {child.allergies.map((x) => (
                  <li key={x.name} className="grid gap-2 px-5 py-4 md:grid-cols-[12rem_1fr]">
                    <span>
                      <span className="block font-display text-lg font-extrabold">{x.name}</span>
                      <Pill tone={x.severity === "Anaphylaxis" ? "late" : x.severity === "Moderate" ? "owed" : "neutral"}>{x.severity}</Pill>
                    </span>
                    <span className="text-sm">
                      <span className="block"><b>Reaction:</b> {x.reaction}</span>
                      <span className="mt-1 block"><b>Response:</b> {x.plan}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Medical conditions">
              <ul className="divide-y divide-line px-5">
                {child.conditions.length ? child.conditions.map((c) => <li key={c} className="py-3">{c}</li>) : <li className="py-4 text-ink-soft">None recorded.</li>}
              </ul>
            </Card>
            <Card title="Medication held at the centre">
              <ul className="divide-y divide-line">
                {child.medications.length ? (
                  child.medications.map((m) => (
                    <li key={m.name} className="flex items-center gap-3 px-5 py-3">
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{m.name}</span>
                        <span className="block text-sm text-ink-soft">{m.dose} · {m.when}</span>
                      </span>
                      <Expiry days={m.expiresIn} />
                    </li>
                  ))
                ) : (
                  <li className="px-5 py-4 text-ink-soft">None held.</li>
                )}
              </ul>
            </Card>
          </div>
          <Card title="Dietary and immunisation">
            <dl className="px-5">
              <Row k="Dietary needs" v={child.dietary} />
              <Row k="Immunisation" v={child.immunisation} />
              <Row k="Doctor" v={`${child.doctor.name}, ${child.doctor.phone}`} />
            </dl>
          </Card>
        </div>
      )}

      {tab === "Behaviour" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            ["Strengths", child.behaviour.strengths],
            ["Known triggers", child.behaviour.triggers],
            ["What helps", child.behaviour.strategies],
          ].map(([t, items]) => (
            <Card key={t as string} title={t as string}>
              <ul className="divide-y divide-line px-5">
                {(items as string[]).length ? (items as string[]).map((i) => <li key={i} className="py-3">{i}</li>) : <li className="py-4 text-ink-soft">Nothing recorded.</li>}
              </ul>
            </Card>
          ))}
          <Card title="Comfort and support">
            <dl className="px-5">
              <Row k="Comfort" v={child.behaviour.comfort} />
              <Row k="Support plan" v={child.behaviour.support ?? "None"} />
            </dl>
          </Card>
          <Card title="Recent behaviour notes" className="lg:col-span-2">
            <ul className="divide-y divide-line">
              {notes.filter((n) => n.cat === "Behaviour").length ? (
                notes.filter((n) => n.cat === "Behaviour").map((n) => (
                  <li key={n.id} className="px-5 py-3 text-sm">
                    {n.text}
                    <span className="block text-xs text-ink-soft">{n.at} · {n.by}</span>
                  </li>
                ))
              ) : (
                <li className="px-5 py-4 text-ink-soft">No behaviour notes today.</li>
              )}
            </ul>
          </Card>
        </div>
      )}

      {tab === "Family" && (
        <div className="space-y-6">
          <Card title="Parents and guardians">
            <ContactList list={child.guardians} />
          </Card>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Authorised to collect">
              <ContactList list={child.authorised} />
            </Card>
            <Card title="Emergency contacts">
              <ContactList list={child.emergency} />
            </Card>
          </div>
        </div>
      )}

      {tab === "Notes" && <NoteLog child={child} />}

      {tab === "Consents" && (
        <Card title="Consents and permissions">
          <ul className="divide-y divide-line">
            {child.consents.map(([name, ok]) => (
              <li key={name} className="flex items-center gap-4 px-5 py-3.5">
                <span className="min-w-0 flex-1 font-medium">{name}</span>
                <Pill tone={ok ? "ok" : "owed"}>{ok ? "Given" : "Not given"}</Pill>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

function ContactList({ list }: { list: Child["guardians"] }) {
  return (
    <ul className="divide-y divide-line">
      {list.map((p) => (
        <li key={p.name + p.relation} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3.5">
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">
              {p.name} {p.primary && <Pill tone="neutral">Primary</Pill>}
            </span>
            <span className="block text-sm text-ink-soft">
              {p.relation}
              {p.phone && ` · ${p.phone}`}
              {p.email && ` · ${p.email}`}
            </span>
            {p.note && <span className="block text-sm font-semibold">{p.note}</span>}
          </span>
          <Pill tone={p.canCollect ? "ok" : "late"}>{p.canCollect ? "Can collect" : "Cannot collect"}</Pill>
        </li>
      ))}
    </ul>
  );
}

function NoteLog({ child }: { child: Child }) {
  const o = useOps();
  const notes = notesOf(o, child);
  const [cat, setCat] = useState<NoteCat>("General");
  const [text, setText] = useState("");
  const [share, setShare] = useState(true);
  const [filter, setFilter] = useState<NoteCat | "All">("All");
  const shown = notes.filter((n) => filter === "All" || n.cat === filter);
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <Card title={`Write a note for ${child.first}`}>
        <div className="space-y-3 p-5">
          <select value={cat} onChange={(e) => setCat(e.target.value as NoteCat)} aria-label="Note type" className="w-full rounded-xl border border-ink/25 bg-bg px-3 py-2.5">
            {NOTE_CATS.map((c) => <option key={c}>{c}</option>)}
          </select>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="What happened, what you did, and anything the family should know" aria-label="Note" className="w-full rounded-xl border border-ink/25 bg-bg px-3 py-2.5" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={share} onChange={(e) => setShare(e.target.checked)} /> Include in the family update
          </label>
          <button
            type="button"
            disabled={!text.trim()}
            onClick={() => { ops.addNote(child.id, "Priya Nair", cat, text.trim(), share); setText(""); }}
            className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-bg hover:bg-ink/85 disabled:bg-tint disabled:text-ink-soft"
          >
            Save note
          </button>
        </div>
      </Card>
      <Card title="Today's log">
        <div className="no-bar flex gap-2 overflow-x-auto px-5 pt-4">
          {(["All", ...NOTE_CATS] as (NoteCat | "All")[]).map((c) => (
            <button key={c} type="button" onClick={() => setFilter(c)} aria-pressed={filter === c} className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${filter === c ? "border-ink bg-ink text-bg" : "border-line hover:bg-tint"}`}>{c}</button>
          ))}
        </div>
        <ul className="divide-y divide-line">
          {shown.length ? shown.map((n) => (
            <li key={n.id} className="flex items-start gap-3 px-5 py-3.5">
              <Pill tone={n.cat === "Behaviour" || n.cat === "Health" ? "owed" : "neutral"}>{n.cat}</Pill>
              <span className="min-w-0 flex-1 text-sm">
                {n.text}
                <span className="block text-xs text-ink-soft">{n.at} · {n.by} · {n.share ? "In family update" : "Staff only"}</span>
              </span>
            </li>
          )) : <li className="px-5 py-6 text-ink-soft">No notes yet.</li>}
        </ul>
      </Card>
    </div>
  );
}
