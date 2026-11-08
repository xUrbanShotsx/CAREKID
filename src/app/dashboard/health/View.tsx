"use client";

import Link from "next/link";
import { useCentre } from "@/components/app/CentreContext";
import { Card, Expiry, PageHead, Pill, Stat } from "@/components/app/ui";
import { children, childrenOf } from "@/lib/children";
import { centres } from "@/lib/demo";

export function View() {
  const { centre } = useCentre();
  const list = centre ? childrenOf(centre.id) : children;
  const name = (id: string) => centres.find((c) => c.id === id)?.name;
  const withAllergy = list.filter((k) => k.allergies.length);
  const meds = list
    .flatMap((k) => k.medications.map((m) => ({ k, m })))
    .sort((a, b) => a.m.expiresIn - b.m.expiresIn);
  const allergens = new Map<string, number>();
  withAllergy.forEach((k) => k.allergies.forEach((a) => allergens.set(a.name, (allergens.get(a.name) ?? 0) + 1)));
  const expiring = meds.filter((x) => x.m.expiresIn <= 30).length;

  return (
    <div className="space-y-6">
      <PageHead
        title="Health register"
        sub={`${centre?.name ?? "All centres"}. Allergies, medical conditions and medication in one list the whole room can check before a meal.`}
        right={
          <button type="button" onClick={() => window.print()} className="rounded-full border border-ink/30 px-5 py-2.5 text-sm font-semibold hover:bg-tint">
            Print allergy list
          </button>
        }
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat value={String(withAllergy.length)} label="Children with allergies" />
        <Stat value={String(list.filter((k) => k.allergies.some((a) => a.severity === "Anaphylaxis")).length)} label="Anaphylaxis risk" hot />
        <Stat value={String(meds.length)} label="Medications held" />
        <Stat value={String(expiring)} label="Expiring in 30 days" hot={expiring > 0} />
      </div>

      <Card title="Allergens to keep out of the menu">
        <ul className="flex flex-wrap gap-2 p-5">
          {[...allergens].sort((a, b) => b[1] - a[1]).map(([a, n]) => (
            <li key={a}><Pill tone="owed">{a} · {n} child{n > 1 ? "ren" : ""}</Pill></li>
          ))}
          {allergens.size === 0 && <li className="text-ink-soft">None recorded.</li>}
        </ul>
      </Card>

      <Card title="Allergy and medical register">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-line font-mono text-xs uppercase tracking-widest text-ink-soft">
                <th className="px-5 py-3 font-normal">Child</th>
                <th className="px-3 py-3 font-normal">Allergies</th>
                <th className="px-3 py-3 font-normal">Conditions</th>
                <th className="px-5 py-3 font-normal">Diet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {list.filter((k) => k.allergies.length || k.conditions.length).map((k) => (
                <tr key={k.id} className={k.allergies.some((a) => a.severity === "Anaphylaxis") ? "bg-accent/15" : ""}>
                  <td className="px-5 py-3.5">
                    <Link href={`/dashboard/children/${k.id}`} className="font-semibold hover:underline">{k.first} {k.last}</Link>
                    <span className="block text-sm text-ink-soft">{k.room}{!centre && ` · ${name(k.centreId)}`}</span>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="flex flex-wrap gap-1.5">
                      {k.allergies.map((a) => (
                        <Pill key={a.name} tone={a.severity === "Anaphylaxis" ? "late" : "owed"}>{a.name}</Pill>
                      ))}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-sm">{k.conditions.map((c) => c.split(".")[0]).join(", ") || "None"}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-soft">{k.dietary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Medication and expiry">
        <ul className="divide-y divide-line">
          {meds.length ? meds.map(({ k, m }) => (
            <li key={k.id + m.name} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3.5">
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{m.name} <span className="font-normal text-ink-soft">for {k.first} {k.last}</span></span>
                <span className="block text-sm text-ink-soft">{m.dose} · {m.when}</span>
              </span>
              <Expiry days={m.expiresIn} />
            </li>
          )) : <li className="px-5 py-6 text-ink-soft">No medication held.</li>}
        </ul>
      </Card>
    </div>
  );
}
