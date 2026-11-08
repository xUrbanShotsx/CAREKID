import { Icon } from "../Icons";
import { initials, type AttStatus, type Child } from "@/lib/children";
import { Pill } from "./ui";

export function ChildAvatar({ child, size = "md" }: { child: Child; size?: "md" | "lg" }) {
  const tones = ["bg-accent text-ink", "bg-tint text-ink", "bg-ink/10 text-ink"];
  const tone = tones[(child.first.charCodeAt(0) + child.last.length) % 3];
  const dim = size === "lg" ? "h-16 w-16 text-xl" : "h-10 w-10 text-sm";
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-bold ${dim} ${tone}`}
    >
      {initials(child)}
    </span>
  );
}

/** Allergy, medical and restriction flags, in order of how urgent they are. */
export function Flags({ child, compact = false }: { child: Child; compact?: boolean }) {
  const severe = child.allergies.filter((a) => a.severity === "Anaphylaxis");
  const other = child.allergies.filter((a) => a.severity !== "Anaphylaxis");
  const asthma = child.conditions.some((c) => c.startsWith("Asthma"));
  return (
    <span className="flex flex-wrap gap-1.5">
      {child.restriction && <Pill tone="late">Do not release</Pill>}
      {severe.map((a) => (
        <Pill key={a.name} tone="late">
          Anaphylaxis: {a.name}
        </Pill>
      ))}
      {!compact &&
        other.map((a) => (
          <Pill key={a.name} tone="owed">
            {a.name}
          </Pill>
        ))}
      {compact && other.length > 0 && <Pill tone="owed">{other.length} allerg{other.length > 1 ? "ies" : "y"}</Pill>}
      {asthma && <Pill tone="neutral">Asthma</Pill>}
    </span>
  );
}

const LABEL: Record<AttStatus, string> = {
  expected: "Not arrived",
  in: "In",
  out: "Collected",
  absent: "Absent",
};

export function StatusPill({ status }: { status: AttStatus }) {
  return (
    <Pill tone={status === "in" ? "ok" : status === "absent" ? "late" : status === "out" ? "neutral" : "owed"}>
      {LABEL[status]}
    </Pill>
  );
}

export function Alert({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-bg">
      <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <span>{children}</span>
    </p>
  );
}
