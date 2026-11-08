"use client";

import { Avatar, Card, Expiry, PageHead, Pill, Stat } from "@/components/app/ui";
import { useCentre } from "@/components/app/CentreContext";
import { centres } from "@/lib/demo";

const initials = (n: string) => n.split(" ").map((p) => p[0]).join("");

export function View() {
  const { centre } = useCentre();
  const staff = (centre ? [centre] : centres).flatMap((c) =>
    c.staff.map((s) => ({ ...s, centre: c.name })),
  );
  const expiring = staff.filter((s) =>
    [s.wwcc, s.firstAid, s.childProtection].some((d) => d <= 30),
  ).length;
  const missing = staff.filter((s) => s.missing.length).length;
  return (
    <div className="space-y-6">
      <PageHead
        title="Staff and qualifications"
        sub={`${centre?.name ?? "All centres"}. Working with Children Check, first aid and child protection training for every educator, with expiry dates.`}
      />
      <div className="grid grid-cols-3 gap-4">
        <Stat value={String(staff.length)} label="Staff on file" />
        <Stat value={String(expiring)} label="With a credential expiring or expired" hot />
        <Stat value={String(missing)} label="With records missing" hot />
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-line font-mono text-xs uppercase tracking-widest text-ink-soft">
                <th className="px-5 py-3 font-normal">Educator</th>
                <th className="px-3 py-3 font-normal">WWCC</th>
                <th className="px-3 py-3 font-normal">First aid</th>
                <th className="px-3 py-3 font-normal">Child protection</th>
                <th className="px-5 py-3 font-normal">Missing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {staff.map((s) => (
                <tr key={s.centre + s.name} className={s.firstAid < 0 ? "bg-accent/15" : ""}>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-3">
                      <Avatar initials={initials(s.name)} />
                      <span>
                        <span className="block font-semibold">{s.name}</span>
                        <span className="block text-sm text-ink-soft">{s.role}{!centre && ` · ${s.centre}`}</span>
                      </span>
                    </span>
                  </td>
                  <td className="px-3"><Expiry days={s.wwcc} /></td>
                  <td className="px-3"><Expiry days={s.firstAid} /></td>
                  <td className="px-3"><Expiry days={s.childProtection} /></td>
                  <td className="px-5">
                    {s.missing.length ? (
                      <Pill tone="owed">{s.missing.join(", ")}</Pill>
                    ) : (
                      <span className="text-sm text-ink-soft">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <p className="text-sm text-ink-soft">
        Reminders go to the educator and the director at 90, 60, 30 and 7 days before a credential expires.
      </p>
    </div>
  );
}
