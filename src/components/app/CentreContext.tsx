"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { ALL, centres, getCentre, type Centre } from "@/lib/demo";

type Ctx = {
  /** A centre id, or ALL for the whole group. */
  centreId: string;
  /** The selected centre, or undefined when viewing the whole group. */
  centre: Centre | undefined;
  setCentre: (id: string) => void;
};

const KEY = "carekid.centre";
const CentreCtx = createContext<Ctx | null>(null);

const DEFAULT = centres[0].id;
const listeners = new Set<() => void>();

function read(): string {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && (saved === ALL || getCentre(saved))) return saved;
  } catch {
    /* storage can be blocked; the default is fine */
  }
  return DEFAULT;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function CentreProvider({ children }: { children: ReactNode }) {
  // the server and first client render use the default, then the saved choice takes over
  const centreId = useSyncExternalStore(subscribe, read, () => DEFAULT);

  const setCentre = useCallback((id: string) => {
    try {
      localStorage.setItem(KEY, id);
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l());
  }, []);

  const value = useMemo(
    () => ({ centreId, centre: getCentre(centreId), setCentre }),
    [centreId, setCentre],
  );
  return <CentreCtx.Provider value={value}>{children}</CentreCtx.Provider>;
}

export function useCentre() {
  const c = useContext(CentreCtx);
  if (!c) throw new Error("useCentre must be used inside CentreProvider");
  return c;
}
