"use client";

import { useState } from "react";

const field =
  "mt-1.5 w-full rounded-xl border border-ink/25 bg-bg px-4 py-3 text-ink placeholder:text-ink-soft/70";

export function DemoForm() {
  const [done, setDone] = useState(false);

  if (done)
    return (
      <div className="rounded-3xl bg-bg p-7" role="status">
        <p className="font-display text-2xl font-extrabold">Thanks, we have your details.</p>
        <p className="mt-2 text-ink-soft">
          We will be in touch to find a time that suits the centre.
        </p>
      </div>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: send to the CareKid inbox or CRM once one exists.
        setDone(true);
      }}
      className="space-y-4 rounded-3xl bg-bg p-6 sm:p-7"
    >
      <label className="block text-sm font-semibold">
        Your name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="block text-sm font-semibold">
        Work email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={field}
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Centre or group
          <input name="centre" required className={field} />
        </label>
        <label className="block text-sm font-semibold">
          State
          <select name="state" defaultValue="NSW" className={field}>
            {["NSW", "VIC", "QLD", "SA", "WA", "TAS", "ACT", "NT"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm font-semibold">
        Service type
        <select name="service" defaultValue="Long day care" className={field}>
          {[
            "Long day care",
            "Preschool or kindergarten",
            "Before school care",
            "After school care",
            "Vacation care",
            "Several types",
          ].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-ink px-7 py-3.5 font-semibold text-bg transition-colors hover:bg-ink/85"
      >
        Book a demo
      </button>
    </form>
  );
}
