"use client";

import { centres } from "@/lib/demo";
import { useCentre } from "./CentreContext";
import { PageHead } from "./ui";

/** Shown on pages that only make sense for one centre while the whole group is selected. */
export function PickCentre({ title, what }: { title: string; what: string }) {
  const { setCentre } = useCentre();
  return (
    <div className="space-y-6">
      <PageHead title={title} sub={`${what} belong to a single centre. Choose one to continue.`} />
      <ul className="grid gap-3 sm:grid-cols-2">
        {centres.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => setCentre(c.id)}
              className="row-hover w-full rounded-2xl border border-line p-5 text-left"
            >
              <span className="block font-display font-extrabold">{c.name}</span>
              <span className="block text-sm text-ink-soft">
                {c.type} · {c.state}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
