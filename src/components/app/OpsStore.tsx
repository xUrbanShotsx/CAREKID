"use client";

import { useSyncExternalStore } from "react";
import {
  children,
  type Att,
  type Child,
  type Note,
  type NoteCat,
} from "@/lib/children";

/** Everything staff change during the day. Saved in this browser only. */
export type Ops = {
  att: Record<string, Att>;
  notes: Record<string, Note[]>;
  /** Educators on the floor, keyed by centre and room. */
  floor: Record<string, number>;
  /** Children whose family update has been sent today. */
  sent: Record<string, string>;
  /** Waitlist stage changes by enquiry id. */
  stage: Record<string, string>;
};

const KEY = "carekid.ops.v1";
const EMPTY: Ops = { att: {}, notes: {}, floor: {}, sent: {}, stage: {} };

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
    const rest = { ...s.att };
    delete rest[id];
    commit({ ...s, att: { ...rest, [id]: { status: "expected" } } });
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
  setStage(id: string, stage: string) {
    const s = snapshot();
    commit({ ...s, stage: { ...s.stage, [id]: stage } });
  },
  reset() {
    commit(EMPTY);
  },
};

export function useOps(): Ops {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}

/* ---------- derived helpers ---------- */

export const attOf = (o: Ops, c: Child): Att => o.att[c.id] ?? c.today;
export const notesOf = (o: Ops, c: Child): Note[] => [...c.notes, ...(o.notes[c.id] ?? [])];
export const floorOf = (o: Ops, centreId: string, room: string, fallback: number) =>
  o.floor[`${centreId}:${room}`] ?? fallback;

export function counts(o: Ops, list: Child[]) {
  const c = { in: 0, out: 0, absent: 0, expected: 0 };
  for (const k of list) c[attOf(o, k).status]++;
  return c;
}

export const allChildren = children;

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
