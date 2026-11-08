"use client";

import { useState } from "react";
import { modules } from "@/lib/content";
import { Icon } from "./Icons";

export function ModuleExplorer() {
  const [active, setActive] = useState(modules[0].id);
  const m = modules.find((x) => x.id === active) ?? modules[0];

  return (
    <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 border-t border-ink pt-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
      <div
        role="tablist"
        aria-label="Platform modules"
        className="no-bar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {modules.map((x, i) => {
          const on = x.id === active;
          return (
            <button
              key={x.id}
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={on}
              aria-controls="module-panel"
              onClick={() => setActive(x.id)}
              className={`group flex shrink-0 items-center gap-3 rounded-full border px-4 py-2.5 text-left text-sm font-semibold transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:bg-transparent lg:px-0 lg:py-3.5 lg:text-base ${
                on
                  ? "border-ink bg-ink text-bg lg:text-ink"
                  : "border-line hover:bg-tint lg:hover:bg-transparent"
              }`}
            >
              <span
                className={`hidden font-mono text-xs lg:inline ${on ? "text-ink" : "text-ink-soft"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="whitespace-nowrap lg:whitespace-normal">{x.name}</span>
              <span
                className={`ml-auto hidden rounded-full px-2 py-0.5 font-mono text-[11px] lg:inline ${
                  on ? "bg-accent text-ink" : "bg-tint text-ink-soft"
                }`}
              >
                {x.features.length}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="module-panel"
        role="tabpanel"
        aria-labelledby={`tab-${m.id}`}
        className="lg:sticky lg:top-28 lg:self-start"
      >
        <div key={m.id} className="board-row">
          <p className="eyebrow">{m.features.length} features</p>
          <h3 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-extrabold leading-[1.05] tracking-tight">
            {m.name}
          </h3>
          <p className="mt-3 max-w-lg text-ink-soft">{m.blurb}</p>
          <ul className="mt-7 grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
            {m.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 border-b border-line py-3 text-[15px] font-medium"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Icon name="check" className="h-3 w-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
