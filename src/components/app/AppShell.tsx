"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { centres, me } from "@/lib/demo";
import { Icon, type IconName } from "../Icons";
import { Logo } from "../Logo";
import { useCentre } from "./CentreContext";
import { CentreSwitcher } from "./CentreSwitcher";
import { Avatar } from "./ui";

const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: "/dashboard", label: "Dashboard", icon: "grid" },
  { href: "/dashboard/attendance", label: "Attendance", icon: "clock" },
  { href: "/dashboard/children", label: "Children", icon: "user" },
  { href: "/dashboard/health", label: "Health register", icon: "heart" },
  { href: "/dashboard/updates", label: "Family updates", icon: "send" },
  { href: "/dashboard/enrolments", label: "Enrolments", icon: "list" },
  { href: "/dashboard/daily", label: "Daily checks", icon: "check" },
  { href: "/dashboard/staff", label: "Staff", icon: "users" },
  { href: "/dashboard/policies", label: "Policies", icon: "file" },
  { href: "/dashboard/incidents", label: "Incidents", icon: "alert" },
  { href: "/dashboard/nqs", label: "NQS preparation", icon: "shield" },
  { href: "/dashboard/centres", label: "All centres", icon: "building" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { centre } = useCentre();
  const current = NAV.find((n) =>
    n.href === "/dashboard" ? pathname === n.href : pathname.startsWith(n.href),
  );

  const sidebar = (
    <div className="flex h-full min-h-0 flex-col">
      <Link
        href="/dashboard"
        className="flex h-16 shrink-0 items-center px-5 text-[0.7rem]"
        onClick={() => setOpen(false)}
        aria-label="CareKid dashboard"
      >
        <Logo />
      </Link>

      <div className="mx-3 shrink-0 rounded-xl border border-line bg-surface px-3 py-2.5">
        <p className="truncate text-sm font-bold">{centre?.name ?? "All centres"}</p>
        <p className="text-xs text-ink-soft">
          {centre ? `${centre.type} · ${centre.state}` : `${centres.length} centres in the group`}
        </p>
      </div>

      <nav
        aria-label="App"
        data-lenis-prevent
        className="mt-5 min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain px-3"
      >
        {NAV.map((n) => {
          const active = n === current;
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                active ? "bg-accent text-ink" : "text-ink-soft hover:bg-tint hover:text-ink"
              }`}
            >
              <Icon name={n.icon} className="h-[18px] w-[18px]" />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 shrink-0 rounded-xl border border-line bg-surface p-3">
        <div className="flex items-center gap-3">
          <Avatar initials={me.initials} />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{me.name}</p>
            <p className="truncate text-xs text-ink-soft">{me.role}</p>
          </div>
        </div>
        <Link
          href="/"
          className="mt-3 flex items-center gap-2 text-xs font-semibold text-ink-soft hover:text-ink"
        >
          <Icon name="logout" className="h-3.5 w-3.5" /> Sign out
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg text-ink lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-dvh border-r border-line bg-bg lg:block">
        {sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-bg shadow-2xl">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-surface/90 px-4 backdrop-blur sm:px-8">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" className="h-6 w-6" />
          </button>
          <CentreSwitcher />
          <label className="hidden max-w-sm flex-1 items-center gap-2 rounded-full bg-tint px-4 py-2 text-sm text-ink-soft focus-within:ring-2 focus-within:ring-accent sm:flex">
            <Icon name="search" className="h-4 w-4" />
            <input
              type="search"
              placeholder="Search staff, policies, incidents"
              className="w-full bg-transparent text-ink outline-none placeholder:text-ink-soft"
              aria-label="Search"
            />
          </label>
          <span className="ml-auto flex items-center gap-3">
            <span className="hidden rounded-full bg-tint px-3 py-1 text-[11px] font-semibold text-ink-soft sm:inline">
              Sample data
            </span>
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-tint">
              <Icon name="bell" className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-surface" />
            </span>
            <Avatar initials={me.initials} />
          </span>
        </header>

        <div className="border-b border-line bg-tint/60 px-4 py-2 text-center text-xs text-ink-soft sm:px-8">
          You are viewing a demo workspace with fictional sample data.
        </div>

        <div className="mx-auto max-w-6xl p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
