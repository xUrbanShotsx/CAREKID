import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icons";
import { LogoMark } from "./Logo";

/* ---------- window frame ---------- */

const NAV: { icon: IconName; id: string }[] = [
  { icon: "grid", id: "overview" },
  { icon: "check", id: "daily" },
  { icon: "users", id: "staff" },
  { icon: "file", id: "docs" },
  { icon: "shield", id: "safety" },
];

function AppWindow({
  url,
  tab,
  active,
  children,
}: {
  url: string;
  tab: string;
  active: string;
  children: ReactNode;
}) {
  return (
    <div className="lift relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(140deg,oklch(0.2_0.045_195),oklch(0.34_0.07_190))] pl-4 pt-5 shadow-[0_40px_90px_-40px_oklch(0.25_0.045_195/0.7)] sm:pl-8 sm:pt-8">
      <div
        aria-hidden="true"
        className="glow pointer-events-none absolute h-56 w-56 rounded-full bg-accent/70 blur-3xl"
      />
      <div className="relative -mr-4 overflow-hidden rounded-tl-2xl bg-surface text-ink ring-1 ring-white/20">
        <div className="bg-[oklch(0.94_0.012_110)] px-3 pt-2.5">
          <div className="flex items-end gap-3">
            <span className="mb-2 flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.18_25)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.82_0.15_85)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.75_0.16_150)]" />
            </span>
            <span className="flex min-w-0 items-center gap-2 rounded-t-lg bg-surface px-3 py-1.5 text-[11px] font-medium">
              <LogoMark className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{tab}</span>
              <Icon name="close" className="h-3 w-3 shrink-0 text-ink-soft" />
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 border-b border-line bg-surface px-3 py-2 text-ink-soft">
          <Icon name="arrow" className="h-3.5 w-3.5 rotate-180" />
          <Icon name="arrow" className="h-3.5 w-3.5" />
          <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-bg px-3 py-1 text-[11px]">
            <Icon name="lock" className="h-3 w-3 shrink-0" />
            <span className="truncate">{url}</span>
          </span>
        </div>
        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
          <span className="font-display text-[13px] font-extrabold tracking-tight">
            carekid<span className="text-accent">.</span>
          </span>
          <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-bg px-3 py-1 text-[11px] text-ink-soft sm:flex">
            <Icon name="search" className="h-3 w-3" /> Search
          </span>
          <span className="rounded-full bg-tint px-2.5 py-1 text-[10px] font-semibold text-ink-soft">
            Sample data
          </span>
        </div>
        <div className="flex">
          <nav
            aria-hidden="true"
            className="hidden w-12 shrink-0 flex-col items-center gap-1 border-r border-line bg-bg py-3 sm:flex"
          >
            {NAV.map((n) => (
              <span
                key={n.id}
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  n.id === active ? "bg-accent text-ink" : "text-ink-soft"
                }`}
              >
                <Icon name={n.icon} className="h-4 w-4" />
              </span>
            ))}
          </nav>
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- small parts ---------- */

type Tone = "ok" | "owed" | "late" | "neutral" | "solid";

function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  const styles: Record<Tone, string> = {
    ok: "bg-ink/[0.06] text-ink",
    owed: "bg-accent/35 text-ink",
    late: "bg-ink text-bg",
    neutral: "bg-tint text-ink-soft",
    solid: "bg-ink text-bg",
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles[tone]}`}
    >
      {tone === "ok" && <Icon name="check" className="h-3 w-3" />}
      {tone === "owed" && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
      {tone === "late" && <Icon name="alert" className="h-3 w-3 text-accent" />}
      {children}
    </span>
  );
}

function Progress({ pct }: { pct: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-tint">
      <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
    </div>
  );
}

function Tile({ value, label, hot }: { value: string; label: string; hot?: boolean }) {
  return (
    <div className={`rounded-xl border border-line p-3 ${hot ? "bg-accent/30" : "bg-bg"}`}>
      <p className="font-display text-2xl font-extrabold leading-none tracking-tight">{value}</p>
      <p className="mt-1.5 text-[11px] leading-tight text-ink-soft">{label}</p>
    </div>
  );
}

function Title({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-5 pt-5">
      <h3 className="font-display text-lg font-extrabold leading-tight tracking-tight">{title}</h3>
      {sub && <p className="mt-0.5 text-[13px] text-ink-soft">{sub}</p>}
    </div>
  );
}

/* ---------- hero: centre overview ---------- */

export function CentreMock() {
  const actions: [string, string, string, Tone][] = [
    ["Outdoor playground inspection", "Room Leader", "Today", "owed"],
    ["First aid certificate review", "Centre Director", "This week", "neutral"],
    ["Policy acknowledgement pending", "2 staff", "This week", "neutral"],
  ];
  return (
    <AppWindow url="app.carekid.com.au/little-steps" tab="Centre overview" active="overview">
      <Title title="Centre overview" sub="Little Steps Early Learning" />
      <div className="grid grid-cols-2 gap-2.5 px-5 pt-4 sm:grid-cols-4">
        <Tile value="18/22" label="Tasks completed today" />
        <Tile value="3" label="Records expiring soon" hot />
        <Tile value="5" label="Outstanding actions" hot />
        <Tile value="2" label="Policies due for review" />
      </div>
      <div className="px-5 pt-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
          Outstanding actions
        </p>
        <ul className="mt-2 divide-y divide-line border-y border-line">
          {actions.map(([t, who, when, tone], i) => (
            <li
              key={t}
              className="board-row flex items-center gap-3 py-2.5"
              style={{ animationDelay: `${0.5 + i * 0.12}s` }}
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold">{t}</span>
                <span className="block text-[11px] text-ink-soft">{who}</span>
              </span>
              <Pill tone={tone}>{when}</Pill>
            </li>
          ))}
        </ul>
      </div>
      <div className="m-5 rounded-xl bg-tint p-4">
        <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest">
          <Icon name="sparkle" className="h-3.5 w-3.5" /> CareKid AI insights
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
          Two policies are approaching their scheduled review dates. One
          educator&apos;s training record is missing an uploaded completion
          certificate. Review these records before marking the associated tasks
          complete.
        </p>
      </div>
    </AppWindow>
  );
}

/* ---------- 01 auditor ---------- */

export function AuditorMock() {
  const findings: [string, string, string, string][] = [
    [
      "Required",
      "Policy does not say how sleeping children are supervised.",
      "Education and Care Services National Regulations, reg 81 (sleep and rest)",
      "Add a supervision section",
    ],
    [
      "Guidance",
      "No mention of cot and bedding safety checks.",
      "Red Nose safe sleeping guidance",
      "Consider adding a daily check",
    ],
    [
      "Yours",
      "Last review was 14 months ago. Your centre sets a 12 month cycle.",
      "Centre procedure CP-04",
      "Schedule a review",
    ],
  ];
  return (
    <AppWindow url="app.carekid.com.au/documents/sleep-policy" tab="Document auditor" active="docs">
      <Title title="Sleep and Rest Policy.pdf" sub="Version 2, uploaded for review" />
      <ul className="space-y-2.5 p-5">
        {findings.map(([tag, finding, source, action], i) => (
          <li
            key={finding}
            className="board-row rounded-xl border border-line p-3.5"
            style={{ animationDelay: `${0.3 + i * 0.15}s` }}
          >
            <div className="flex items-center gap-2">
              <Pill tone={tag === "Required" ? "solid" : tag === "Guidance" ? "owed" : "neutral"}>
                {tag}
              </Pill>
              <span className="text-[11px] font-semibold text-ink-soft">Possible gap</span>
            </div>
            <p className="mt-2 text-[13px] font-semibold leading-snug">{finding}</p>
            <p className="mt-1.5 flex items-start gap-1.5 text-[11px] leading-snug text-ink-soft">
              <Icon name="book" className="mt-0.5 h-3 w-3 shrink-0" />
              {source}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest">{action}</p>
          </li>
        ))}
      </ul>
      <p className="border-t border-line px-5 py-3 text-[11px] text-ink-soft">
        Findings are prompts for review, not a compliance score.
      </p>
    </AppWindow>
  );
}

/* ---------- 02 calendar ---------- */

export function CalendarMock() {
  const groups: { label: string; rows: [string, string, Tone, string][] }[] = [
    {
      label: "Daily",
      rows: [
        ["Opening checklist", "Room leaders", "ok", "Done 6:42am"],
        ["Playground check", "Toddler room", "owed", "Due today"],
        ["Sleep room checks", "Babies room", "owed", "Every 10 min"],
      ],
    },
    {
      label: "Weekly",
      rows: [["Fire equipment visual check", "Centre Director", "neutral", "Fri"]],
    },
    {
      label: "Monthly",
      rows: [["Evacuation drill", "Centre Director", "late", "3 days late"]],
    },
    {
      label: "Yearly",
      rows: [["Fire extinguisher service", "Contractor", "neutral", "In 41 days"]],
    },
  ];
  return (
    <AppWindow url="app.carekid.com.au/calendar" tab="Compliance calendar" active="daily">
      <Title title="Compliance calendar" sub="Built for long day care, NSW" />
      <div className="space-y-4 p-5">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
              {g.label}
            </p>
            <ul className="mt-1.5 divide-y divide-line border-y border-line">
              {g.rows.map(([t, who, tone, when]) => (
                <li key={t} className="flex items-center gap-3 py-2.5">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold">{t}</span>
                    <span className="block text-[11px] text-ink-soft">{who}</span>
                  </span>
                  <Pill tone={tone as Tone}>{when}</Pill>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="flex items-center gap-2 rounded-xl bg-accent/30 px-3 py-2 text-[12px] font-semibold">
          <Icon name="bell" className="h-4 w-4 shrink-0" />
          Evacuation drill escalated to the owner after 3 days.
        </p>
      </div>
    </AppWindow>
  );
}

/* ---------- 03 NQS ---------- */

export function NqsMock() {
  const areas: [string, string, number, number][] = [
    ["Educational program and practice", "QA1", 82, 2],
    ["Children's health and safety", "QA2", 74, 4],
    ["Physical environment", "QA3", 90, 1],
    ["Staffing arrangements", "QA4", 66, 5],
    ["Relationships with children", "QA5", 88, 1],
    ["Collaborative partnerships with families and communities", "QA6", 71, 3],
    ["Governance and leadership", "QA7", 58, 6],
  ];
  return (
    <AppWindow url="app.carekid.com.au/nqs" tab="Assessment preparation" active="safety">
      <Title title="Assessment preparation" sub="Evidence by Quality Area" />
      <ul className="space-y-3.5 p-5">
        {areas.map(([name, qa, pct, gaps]) => (
          <li key={qa}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="min-w-0 truncate text-[13px] font-semibold">
                <span className="mr-2 font-mono text-[11px] text-ink-soft">{qa}</span>
                {name}
              </p>
              <span className="shrink-0 text-[11px] text-ink-soft">
                {gaps} possible gaps
              </span>
            </div>
            <div className="mt-1.5">
              <Progress pct={pct} />
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3.5">
        <span className="text-[11px] text-ink-soft">Evidence tagged: 214 documents</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold text-bg">
          <Icon name="download" className="h-3 w-3" /> Export evidence pack
        </span>
      </div>
    </AppWindow>
  );
}

/* ---------- 04 briefing ---------- */

export function BriefingMock() {
  const lines: [string, string][] = [
    ["2", "inspections not yet started"],
    ["3", "staff records incomplete"],
    ["1", "unresolved risk, due Thursday"],
    ["4", "deadlines this fortnight"],
  ];
  return (
    <div className="lift mx-auto max-w-md rounded-[1.75rem] border border-line bg-surface p-6 shadow-[0_30px_70px_-40px_oklch(0.25_0.045_195/0.55)]">
      <div className="flex items-center justify-between">
        <p className="eyebrow">7:00am briefing</p>
        <span className="rounded-full bg-tint px-2.5 py-1 text-[10px] font-semibold text-ink-soft">
          Sample data
        </span>
      </div>
      <p className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight">
        Good morning, Priya.
      </p>
      <p className="mt-1 text-sm text-ink-soft">Here is what needs you today.</p>
      <ul className="mt-5 divide-y divide-line border-y border-line">
        {lines.map(([n, t]) => (
          <li key={t} className="flex items-center gap-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent font-display text-lg font-extrabold">
              {n}
            </span>
            <span className="text-[15px] font-semibold">{t}</span>
            <Icon name="arrow" className="ml-auto h-4 w-4 text-ink-soft" />
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm leading-relaxed text-ink-soft">
        Start with the playground inspection. It is due before outdoor play
        <span className="caret" aria-hidden="true" />
      </p>
    </div>
  );
}

/* ---------- 05 command centre ---------- */

export function CommandMock() {
  const rows: [string, string, number, number, number][] = [
    ["Little Steps Early Learning", "Long day care", 2, 1, 3],
    ["Maple Street OSHC", "Before and after school", 0, 0, 1],
    ["Harbour Kids Preschool", "Preschool", 5, 4, 7],
    ["Wattle Grove Early Learning", "Long day care", 1, 2, 2],
  ];
  const cell = (n: number) =>
    n === 0 ? (
      <Pill tone="ok">0</Pill>
    ) : n >= 4 ? (
      <Pill tone="late">{n}</Pill>
    ) : (
      <Pill tone="owed">{n}</Pill>
    );
  return (
    <AppWindow url="app.carekid.com.au/group" tab="Command centre" active="overview">
      <Title title="All centres" sub="Today, across the group" />
      <div className="overflow-x-auto p-5">
        <table className="w-full min-w-[420px] text-left text-[13px]">
          <thead>
            <tr className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
              <th className="pb-2 font-normal">Centre</th>
              <th className="pb-2 text-center font-normal">Overdue</th>
              <th className="pb-2 text-center font-normal">Missing docs</th>
              <th className="pb-2 text-center font-normal">Open issues</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line border-y border-line">
            {rows.map(([name, type, a, b, c]) => (
              <tr key={name} className={a >= 4 ? "bg-accent/20" : ""}>
                <td className="py-2.5 pr-3">
                  <span className="block font-semibold">{name}</span>
                  <span className="block text-[11px] text-ink-soft">{type}</span>
                </td>
                <td className="text-center">{cell(a)}</td>
                <td className="text-center">{cell(b)}</td>
                <td className="text-center">{cell(c)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppWindow>
  );
}

/* ---------- educator phone ---------- */

export function PhoneMock() {
  const checks: [string, boolean][] = [
    ["Gate latched and locked", true],
    ["Sandpit covered", true],
    ["Climbing frame, no loose bolts", true],
    ["Shade sails undamaged", false],
    ["Bark depth under swings", false],
  ];
  return (
    <div className="lift mx-auto w-full max-w-[17rem] rounded-[2.4rem] border-[7px] border-ink bg-surface shadow-[0_30px_70px_-35px_oklch(0.25_0.045_195/0.7)]">
      <div className="mx-auto mt-2 h-1.5 w-14 rounded-full bg-ink/15" />
      <div className="px-4 pb-5 pt-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-tint">
            <Icon name="qr" className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-[15px] font-extrabold leading-tight">Playground check</p>
            <p className="text-[11px] text-ink-soft">Toddler room, 3 of 5 done</p>
          </div>
        </div>
        <div className="mt-3">
          <Progress pct={60} />
        </div>
        <ul className="mt-3 divide-y divide-line">
          {checks.map(([t, done]) => (
            <li key={t} className="flex items-center gap-3 py-2.5">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${done ? "border-ink bg-ink text-bg" : "border-ink/30"}`}
              >
                {done && <Icon name="check" className="h-3.5 w-3.5" />}
              </span>
              <span className={`text-[13px] ${done ? "text-ink-soft line-through" : "font-semibold"}`}>
                {t}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex gap-2">
          <span className="flex-1 rounded-full border border-ink/25 py-2 text-center text-[12px] font-semibold">
            Add photo
          </span>
          <span className="flex-1 rounded-full bg-accent py-2 text-center text-[12px] font-semibold">
            Submit
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- audit trail ---------- */

export function TrailMock() {
  const rows: [string, string, string][] = [
    ["Priya N.", "Approved Sleep and Rest Policy v3", "Tue 7:12am"],
    ["Sam K.", "Uploaded first aid certificate for Jo L.", "Tue 8:03am"],
    ["Jo L.", "Read and acknowledged Child Safe Policy", "Tue 8:40am"],
    ["System", "Reminder sent: WWCC expires in 30 days", "Tue 9:00am"],
    ["Priya N.", "Closed incident INC-0142, 2 actions done", "Tue 1:25pm"],
  ];
  return (
    <div className="rounded-[1.75rem] border border-bg/20 bg-bg/[0.06] p-5 text-bg backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-bg/70">Activity history</p>
        <span className="rounded-full bg-bg/10 px-2.5 py-1 text-[10px] font-semibold text-bg/80">
          Sample data
        </span>
      </div>
      <ul className="mt-3 divide-y divide-bg/15">
        {rows.map(([who, what, when]) => (
          <li key={what} className="flex items-start gap-3 py-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-ink">
              {who[0]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{what}</span>
              <span className="block text-xs text-bg/60">{who}</span>
            </span>
            <span className="shrink-0 text-xs text-bg/60">{when}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
