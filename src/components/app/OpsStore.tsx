"use client";

import { useSyncExternalStore } from "react";
import {
  children as seedKids,
  type Att,
  type Child,
  type Note,
  type NoteCat,
} from "@/lib/children";
import { centres, type Incident, type Staff } from "@/lib/demo";
import { enquiries as seedEnquiries, type Enquiry } from "@/lib/enrol";

/** Everything staff change in the demo. Saved in this browser only. */
export type Ops = {
  att: Record<string, Att>;
  notes: Record<string, Note[]>;
  /** Educators on the floor, keyed by centre and room. */
  floor: Record<string, number>;
  /** Children whose family update has been sent today. */
  sent: Record<string, string>;
  /** Children added by staff or enrolled from the waitlist. */
  kids: Child[];
  /** Changes to any child, seeded or added. */
  edits: Record<string, Partial<Child>>;
  /** Enquiries added by staff. */
  enquiries: Enquiry[];
  /** Changes to any enquiry, seeded or added. */
  enqEdits: Record<string, Partial<Enquiry>>;
  /** Incidents reported by staff, newest first. */
  incidents: (Incident & { centreId: string })[];
  /** Staff added by the director. */
  staff: (Staff & { centreId: string })[];
};

const KEY = "carekid.ops.v2";
const EMPTY: Ops = {
  att: {}, notes: {}, floor: {}, sent: {}, kids: [], edits: {}, enquiries: [], enqEdits: {}, incidents: [], staff: [],
};

let cache: Ops | null = null;
const listeners = new Set<() => void>();

function load(): Ops {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    /* storage blocked or corrupt: start clean */
  }
  return EMPTY;
}

function snapshot(): Ops {
  if (!cache) cache = load();
  return cache;
}

function commit(next: Ops) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export const nowLabel = () =>
  new Date().toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" }).replace(/\s/g, " ");

export const ops = {
  signIn(id: string, by: string) {
    const s = snapshot();
    commit({ ...s, att: { ...s.att, [id]: { status: "in", inAt: nowLabel(), inBy: by } } });
  },
  signOut(child: Child, by: string) {
    const s = snapshot();
    const cur = s.att[child.id] ?? child.today;
    commit({ ...s, att: { ...s.att, [child.id]: { ...cur, status: "out", outAt: nowLabel(), outBy: by } } });
  },
  absent(id: string, reason: string) {
    const s = snapshot();
    commit({ ...s, att: { ...s.att, [id]: { status: "absent", reason } } });
  },
  undo(id: string) {
    const s = snapshot();
    commit({ ...s, att: { ...s.att, [id]: { status: "expected" } } });
  },
  addNote(id: string, by: string, cat: NoteCat, text: string, share: boolean) {
    const s = snapshot();
    const note: Note = { id: `${id}-${Date.now()}`, at: nowLabel(), by, cat, text, share };
    commit({ ...s, notes: { ...s.notes, [id]: [...(s.notes[id] ?? []), note] } });
  },
  setFloor(key: string, n: number) {
    const s = snapshot();
    commit({ ...s, floor: { ...s.floor, [key]: Math.max(0, n) } });
  },
  sendUpdate(id: string) {
    const s = snapshot();
    commit({ ...s, sent: { ...s.sent, [id]: nowLabel() } });
  },
  addKid(child: Child) {
    const s = snapshot();
    commit({ ...s, kids: [...s.kids, child] });
  },
  editKid(id: string, patch: Partial<Child>) {
    const s = snapshot();
    commit({ ...s, edits: { ...s.edits, [id]: { ...s.edits[id], ...patch } } });
  },
  addEnquiry(e: Enquiry) {
    const s = snapshot();
    commit({ ...s, enquiries: [e, ...s.enquiries] });
  },
  patchEnquiry(id: string, patch: Partial<Enquiry>) {
    const s = snapshot();
    commit({ ...s, enqEdits: { ...s.enqEdits, [id]: { ...s.enqEdits[id], ...patch } } });
  },
  addIncident(i: Incident & { centreId: string }) {
    const s = snapshot();
    commit({ ...s, incidents: [i, ...s.incidents] });
  },
  addStaff(st: Staff & { centreId: string }) {
    const s = snapshot();
    commit({ ...s, staff: [...s.staff, st] });
  },
  reset() {
    commit(EMPTY);
  },
};

export function useOps(): Ops {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}

/** False on the server and the first client render, true once saved changes have loaded. */
export function useReady(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

/* ---------- merged views of the data ---------- */

const withEdits = (o: Ops, c: Child): Child => (o.edits[c.id] ? { ...c, ...o.edits[c.id] } : c);

/** Every child in the workspace, seeded or added, with edits applied. Archived children are left out. */
export function kidsOf(o: Ops, centreId?: string, includeArchived = false): Child[] {
  return [...seedKids, ...o.kids]
    .filter((c) => !centreId || c.centreId === centreId)
    .map((c) => withEdits(o, c))
    .filter((c) => includeArchived || !c.archived);
}

export function findKid(o: Ops, id: string): Child | undefined {
  const c = [...seedKids, ...o.kids].find((k) => k.id === id);
  return c ? withEdits(o, c) : undefined;
}

export function enquiriesOf(o: Ops, centreId?: string): Enquiry[] {
  return [...o.enquiries, ...seedEnquiries]
    .filter((e) => !centreId || e.centreId === centreId)
    .map((e) => (o.enqEdits[e.id] ? { ...e, ...o.enqEdits[e.id] } : e));
}

export function incidentsOf(o: Ops, centreId?: string): (Incident & { centreId: string })[] {
  const seeded = centres.flatMap((c) => c.incidents.map((i) => ({ ...i, centreId: c.id })));
  return [...o.incidents, ...seeded].filter((i) => !centreId || i.centreId === centreId);
}

export function staffOf(o: Ops, centreId?: string): (Staff & { centreId: string })[] {
  const seeded = centres.flatMap((c) => c.staff.map((s) => ({ ...s, centreId: c.id })));
  return [...seeded, ...o.staff].filter((s) => !centreId || s.centreId === centreId);
}

export const attOf = (o: Ops, c: Child): Att => o.att[c.id] ?? c.today;
export const notesOf = (o: Ops, c: Child): Note[] => [...c.notes, ...(o.notes[c.id] ?? [])];
export const floorOf = (o: Ops, centreId: string, room: string, fallback: number) =>
  o.floor[`${centreId}:${room}`] ?? fallback;

export function counts(o: Ops, list: Child[]) {
  const c = { in: 0, out: 0, absent: 0, expected: 0 };
  for (const k of list) c[attOf(o, k).status]++;
  return c;
}

/* ---------- the current time, safe for prerendering ---------- */

// The server and first render use a fixed date; the browser then swaps in the real one.
const SERVER_NOW = Date.UTC(2026, 10, 8, 0, 0, 0);
let clientNow: number | null = null;
const noop = () => () => {};

export function useNow(): Date {
  const ms = useSyncExternalStore(
    noop,
    () => (clientNow ??= Date.now()),
    () => SERVER_NOW,
  );
  return new Date(ms);
}
