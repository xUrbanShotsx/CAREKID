"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icons";
import { useCentre } from "@/components/app/CentreContext";
import { PickCentre } from "@/components/app/PickCentre";
import { Alert, ChildAvatar, Flags, StatusPill } from "@/components/app/ChildBits";
import { attOf, counts, floorOf, notesOf, ops, useNow, useOps } from "@/components/app/OpsStore";
import { Card, PageHead, Pill, Stat } from "@/components/app/ui";
import { ageText, childrenOf, NOTE_CATS, ROOMS, type Child, type NoteCat } from "@/lib/children";
import { getCentre } from "@/lib/demo";

type Filter = "all" | "expected" | "in" | "out" | "absent";
const ABSENCE = ["Sick", "Family holiday", "Appointment", "Public holiday", "No reason given"];
const QUICK: [NoteCat, string][] = [
  ["Meal", "Ate well"],
  ["Sleep", "Slept 1 hour"],
  ["Toilet", "Toilet, no issues"],
  ["Health", "Sunscreen applied"],
  ["Mood", "Happy and settled"],
];

export function View() {
  const { centre } = useCentre();
  if (!centre) return <PickCentre title="Attendance" what="Attendance rolls" />;
  return <Roll centreId={centre.id} />;
}

function Roll({ centreId }: { centreId: string }) {
  const o = useOps();
  const now = useNow();
  const centre = getCentre(centreId)!;
  const list = childrenOf(centreId);
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");
  const c = counts(o, list);
  const staff = centre.staff[0].name;

  const visible = (k: Child) =>
    (filter === "all" || attOf(o, k).status === filter) &&
    `${k.first} ${k.last}`.toLowerCase().includes(q.toLowerCase());

  return (
    <div className="space-y-6">
      <PageHead
        title="Attendance"
        sub={`${centre.name}. Sign children in and out, watch ratios, and write notes beside each child.`}
        right={
          <span className="flex flex-wrap items-center gap-2">
            <Link href="/dashboard/kiosk" className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-4 py-2.5 text-sm font-semibold hover:bg-tint">
              <Icon name="qr" className="h-4 w-4" /> Parent kiosk
            </Link>
            <span className="rounded-full bg-tint px-4 py-2.5 text-sm font-semibold text-ink-soft">
              {now.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" })}
            </span>
          </span>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat value={String(c.in)} label="In the centre now" />
        <Stat value={String(c.expected)} label="Still to arrive" hot={c.expected > 0} />
        <Stat value={String(c.out)} label="Collected" />
        <Stat value={String(c.absent)} label="Absent today" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex min-w-48 flex-1 items-center gap-2 rounded-full bg-tint px-4 py-2 text-sm focus-within:ring-2 focus-within:ring-accent sm:max-w-xs">
          <Icon name="search" className="h-4 w-4 text-ink-soft" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Find a child"
            aria-label="Find a child"
            className="w-full bg-transparent outline-none placeholder:text-ink-soft"
          />
        </label>
        <div className="no-bar flex gap-2 overflow-x-auto">
          {(["all", "expected", "in", "out", "absent"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${filter === f ? "border-ink bg-ink text-bg" : "border-line hover:bg-tint"}`}
            >
              {{ all: "Everyone", expected: "Not arrived", in: "In", out: "Collected", absent: "Absent" }[f]}
            </button>
          ))}
        </div>
      </div>

      {ROOMS[centreId].map((room) => {
        const kids = list.filter((k) => k.room === room.name);
        const present = kids.filter((k) => attOf(o, k).status === "in").length;
        const educators = floorOf(o, centreId, room.name, room.educators);
        const capacity = educators * room.limit;
        const over = present > capacity;
        const shown = kids.filter(visible);
        return (
          <Card
            key={room.name}
            title={`${room.name} · ${present} of ${kids.length} in`}
            right={
              <span className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 rounded-full border border-line px-1 py-0.5 text-xs font-semibold">
                  <button type="button" aria-label={`Fewer educators in ${room.name}`} onClick={() => ops.setFloor(`${centreId}:${room.name}`, educators - 1)} className="h-6 w-6 rounded-full hover:bg-tint">−</button>
                  <span className="px-1">{educators} on floor</span>
                  <button type="button" aria-label={`More educators in ${room.name}`} onClick={() => ops.setFloor(`${centreId}:${room.name}`, educators + 1)} className="h-6 w-6 rounded-full hover:bg-tint">+</button>
                </span>
                <Pill tone={over ? "late" : "ok"}>
                  {over ? `Over ratio, 1:${room.limit}` : `Ratio 1:${room.limit} met`}
                </Pill>
              </span>
            }
          >
            {over && (
              <div className="border-b border-line p-4">
                <Alert>
                  {present} children present but {educators} educator{educators === 1 ? "" : "s"} on the floor only covers {capacity}. Bring in another educator now.
                </Alert>
              </div>
            )}
            {shown.length === 0 ? (
              <p className="px-5 py-6 text-sm text-ink-soft">No children match.</p>
            ) : (
              <ul className="divide-y divide-line">
                {shown.map((k) => (
                  <Row key={k.id} child={k} staff={staff} now={now} />
                ))}
              </ul>
            )}
          </Card>
        );
      })}
      <p className="text-sm text-ink-soft">
        Ratios use the usual minimums for each age group and are a prompt only. Check them against your state or territory regulations and your service approval.
      </p>
    </div>
  );
}

function Row({ child, staff, now }: { child: Child; staff: string; now: Date }) {
  const o = useOps();
  const a = attOf(o, child);
  const notes = notesOf(o, child);
  const [mode, setMode] = useState<null | "in" | "out" | "absent" | "notes">(null);
  const [who, setWho] = useState("");
  const [reason, setReason] = useState(ABSENCE[0]);
  const [cat, setCat] = useState<NoteCat>("General");
  const [text, setText] = useState("");
  const [share, setShare] = useState(true);

  const signers = child.authorised.filter((p) => p.canCollect);
  const pick = who || signers[0]?.name;

  const done = () => {
    setMode(null);
    setWho("");
  };
  const save = (c: NoteCat, t: string, s: boolean) => {
    if (!t.trim()) return;
    ops.addNote(child.id, staff, c, t.trim(), s);
    setText("");
  };

  const btn = "rounded-full px-4 py-2 text-sm font-semibold transition-colors";

  return (
    <li className="px-5 py-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <ChildAvatar child={child} />
        <div className="min-w-0 flex-1 basis-56">
          <Link href={`/dashboard/children/${child.id}`} className="font-display text-lg font-extrabold leading-tight hover:underline">
            {child.first} {child.last}
          </Link>
          <p className="text-sm text-ink-soft">
            {ageText(child.dob, now)} · {child.days.join(" ")}
            {a.inAt && ` · In ${a.inAt}`}
            {a.outAt && ` · Out ${a.outAt}`}
            {a.reason && ` · ${a.reason}`}
          </p>
          <div className="mt-1.5">
            <Flags child={child} compact />
          </div>
        </div>
        <StatusPill status={a.status} />
        <div className="flex flex-wrap items-center gap-2">
          {a.status === "expected" && (
            <>
              <button type="button" onClick={() => setMode(mode === "in" ? null : "in")} className={`${btn} bg-ink text-bg hover:bg-ink/85`}>Sign in</button>
              <button type="button" onClick={() => setMode(mode === "absent" ? null : "absent")} className={`${btn} border border-line hover:bg-tint`}>Absent</button>
            </>
          )}
          {a.status === "in" && (
            <button type="button" onClick={() => setMode(mode === "out" ? null : "out")} className={`${btn} bg-accent text-ink hover:brightness-95`}>Sign out</button>
          )}
          {(a.status === "out" || a.status === "absent") && (
            <button type="button" onClick={() => ops.undo(child.id)} className={`${btn} border border-line hover:bg-tint`}>Undo</button>
          )}
          <button
            type="button"
            onClick={() => setMode(mode === "notes" ? null : "notes")}
            aria-expanded={mode === "notes"}
            className={`${btn} flex items-center gap-2 border border-line hover:bg-tint ${mode === "notes" ? "bg-tint" : ""}`}
          >
            <Icon name="file" className="h-4 w-4" /> Notes
            {notes.length > 0 && <span className="rounded-full bg-accent px-1.5 text-xs">{notes.length}</span>}
          </button>
        </div>
      </div>

      {(mode === "in" || mode === "out") && (
        <div className="mt-3 space-y-3 rounded-xl bg-tint p-4">
          {mode === "out" && child.restriction && <Alert>{child.restriction}</Alert>}
          <label className="block text-sm font-semibold">
            {mode === "in" ? "Signed in by" : "Collected by (authorised people only)"}
            <select value={pick} onChange={(e) => setWho(e.target.value)} className="mt-1.5 w-full rounded-xl border border-ink/25 bg-bg px-3 py-2.5 sm:max-w-sm">
              {signers.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} ({p.relation})
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              if (mode === "in") ops.signIn(child.id, pick);
              else ops.signOut(child, pick);
              done();
            }}
            className={`${btn} bg-ink text-bg hover:bg-ink/85`}
          >
            Confirm {mode === "in" ? "sign in" : "sign out"}
          </button>
        </div>
      )}

      {mode === "absent" && (
        <div className="mt-3 flex flex-wrap items-end gap-3 rounded-xl bg-tint p-4">
          <label className="text-sm font-semibold">
            Reason
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="mt-1.5 block rounded-xl border border-ink/25 bg-bg px-3 py-2.5">
              {ABSENCE.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <button type="button" onClick={() => { ops.absent(child.id, reason); done(); }} className={`${btn} bg-ink text-bg hover:bg-ink/85`}>
            Mark absent
          </button>
        </div>
      )}

      {mode === "notes" && (
        <div className="mt-3 space-y-4 rounded-xl border border-line p-4">
          {notes.length > 0 && (
            <ul className="space-y-2">
              {notes.slice(-4).map((n) => (
                <li key={n.id} className="flex items-start gap-3 text-sm">
                  <Pill tone={n.cat === "Behaviour" || n.cat === "Health" ? "owed" : "neutral"}>{n.cat}</Pill>
                  <span className="min-w-0 flex-1">
                    {n.text}
                    <span className="block text-xs text-ink-soft">
                      {n.at} · {n.by}
                      {n.share ? " · In family update" : " · Staff only"}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2">
            {QUICK.map(([c, t]) => (
              <button key={t} type="button" onClick={() => save(c, t, true)} className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:bg-tint">
                + {t}
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-[10rem_1fr]">
            <select value={cat} onChange={(e) => setCat(e.target.value as NoteCat)} aria-label="Note type" className="rounded-xl border border-ink/25 bg-bg px-3 py-2.5">
              {NOTE_CATS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} placeholder={`Write a note for ${child.first}`} aria-label={`Note for ${child.first}`} className="rounded-xl border border-ink/25 bg-bg px-3 py-2.5" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={share} onChange={(e) => setShare(e.target.checked)} /> Include in the family update
            </label>
            <button type="button" onClick={() => save(cat, text, share)} disabled={!text.trim()} className={`${btn} bg-ink text-bg hover:bg-ink/85 disabled:bg-tint disabled:text-ink-soft`}>
              Save note
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
