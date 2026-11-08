import type { Metadata } from "next";
import { Card, PageHead, Pill, Stat } from "@/components/app/ui";
import { centres } from "@/lib/demo";

export const metadata: Metadata = { title: "All centres" };

const cell = (n: number) => (n === 0 ? <Pill tone="ok">0</Pill> : n >= 4 ? <Pill tone="late">{n}</Pill> : <Pill tone="owed">{n}</Pill>);

export default function Page() {
  const sum = (k: "overdue" | "missing" | "open") => centres.reduce((n, c) => n + c[k], 0);
  return (
    <div className="space-y-6">
      <PageHead
        title="All centres"
        sub="Overdue actions, outstanding documents and unresolved issues at every location, without asking for a report."
      />
      <div className="grid grid-cols-3 gap-4">
        <Stat value={String(sum("overdue"))} label="Overdue actions" hot />
        <Stat value={String(sum("missing"))} label="Missing documents" />
        <Stat value={String(sum("open"))} label="Open issues" />
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="border-b border-line font-mono text-xs uppercase tracking-widest text-ink-soft">
                <th className="px-5 py-3 font-normal">Centre</th>
                <th className="px-3 py-3 text-center font-normal">Overdue</th>
                <th className="px-3 py-3 text-center font-normal">Missing docs</th>
                <th className="px-5 py-3 text-center font-normal">Open issues</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {centres.map((c) => (
                <tr key={c.name} className={c.overdue >= 4 ? "bg-accent/15" : ""}>
                  <td className="px-5 py-3.5">
                    <span className="block font-semibold">{c.name}</span>
                    <span className="block text-sm text-ink-soft">
                      {c.type} · {c.state}
                    </span>
                  </td>
                  <td className="px-3 text-center">{cell(c.overdue)}</td>
                  <td className="px-3 text-center">{cell(c.missing)}</td>
                  <td className="px-5 text-center">{cell(c.open)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
