"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icons";
import { useCentre } from "@/components/app/CentreContext";
import { ChildAvatar, Flags, StatusPill } from "@/components/app/ChildBits";
import { attOf, useNow, useOps } from "@/components/app/OpsStore";
import { PageHead, Pill, Stat } from "@/components/app/ui";
import { ageText, children, childrenOf, ROOMS } from "@/lib/children";
import { centres } from "@/lib/demo";

export function View() {
  const { centre } = useCentre();
  const o = useOps();
  const now = useNow();
  const [q, setQ] = useState("");
  const [room, setRoom] = useState("All");
  const [alertsOnly, setAlertsOnly] = useState(false);

  const all = centre ? childrenOf(centre.id) : children;
  const rooms = centre ? ["All", ...ROOMS[centre.id].map((r) => r.name)] : ["All"];
  const list = all.filter(
    (k) =>
      (room === "All" || k.room === room) &&
      (!alertsOnly || k.allergies.length > 0 || k.conditions.length > 0 || k.restriction) &&
      `${k.first} ${k.last} ${k.guardians.map((g) => g.name).join(" ")}`.toLowerCase().includes(q.toLowerCase()),
  );
  const severe = all.filter((k) => k.allergies.some((a) => a.severity === "Anaphylaxis")).length;
  const centreName = (id: string) => centres.find((c) => c.id === id)?.name;

  return (
    <div className="space-y-6">
      <PageHead
        title="Children"
        sub={`${centre?.name ?? "All centres"}. Every child's health, behaviour, family and consent records in one place. Access is limited to the roles you choose.`}
        right={
          <span className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-2 text-sm font-semibold text-ink-soft">
            <Icon name="lock" className="h-4 w-4" /> Restricted access
          </span>
        }
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat value={String(all.length)} label="Children enrolled" />
        <Stat value={String(severe)} label="With anaphylaxis risk" hot={severe > 0} />
        <Stat value={String(all.filter((k) => k.allergies.length).length)} label="With allergies" />
        <Stat value={String(all.filter((k) => k.restriction).length)} label="With a release restriction" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex min-w-48 flex-1 items-center gap-2 rounded-full bg-tint px-4 py-2 text-sm focus-within:ring-2 focus-within:ring-accent sm:max-w-sm">
          <Icon name="search" className="h-4 w-4 text-ink-soft" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search children or parents" aria-label="Search children or parents" className="w-full bg-transparent outline-none placeholder:text-ink-soft" />
        </label>
        <div className="no-bar flex gap-2 overflow-x-auto">
          {rooms.map((r) => (
            <button key={r} type="button" onClick={() => setRoom(r)} aria-pressed={room === r} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${room === r ? "border-ink bg-ink text-bg" : "border-line hover:bg-tint"}`}>
              {r}
            </button>
          ))}
          <button type="button" onClick={() => setAlertsOnly((a) => !a)} aria-pressed={alertsOnly} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${alertsOnly ? "border-ink bg-accent" : "border-line hover:bg-tint"}`}>
            Health alerts only
          </button>
        </div>
      </div>

      <ul className="grid gap-4 md:grid-cols-2">
        {list.map((k) => (
          <li key={k.id}>
            <Link href={`/dashboard/children/${k.id}`} className="row-hover flex h-full gap-4 rounded-2xl border border-line p-5">
              <ChildAvatar child={k} />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display text-lg font-extrabold leading-tight">
                    {k.first} {k.last}
                  </span>
                  <StatusPill status={attOf(o, k).status} />
                </span>
                <span className="mt-0.5 block text-sm text-ink-soft">
                  {ageText(k.dob, now)} · {k.room}
                  {!centre && ` · ${centreName(k.centreId)}`}
                </span>
                <span className="mt-0.5 block text-sm text-ink-soft">
                  {k.guardians.map((g) => g.name.split(" ")[0]).join(" and ")}
                </span>
                <span className="mt-2 flex flex-wrap items-center gap-1.5">
                  <Flags child={k} compact />
                  {k.days.map((d) => (
                    <Pill key={d} tone="neutral">{d}</Pill>
                  ))}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {list.length === 0 && <p className="text-ink-soft">No children match.</p>}
    </div>
  );
}
