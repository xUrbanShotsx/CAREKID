"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "./Icons";
import { Logo } from "./Logo";

const links = [
  { href: "#platform", label: "Platform" },
  { href: "#why", label: "Why CareKid" },
  { href: "#rules", label: "Regulation" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pill = scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-out ${scrolled ? "px-3" : "px-0"}`}
    >
      <div
        className={`mx-auto transition-all duration-500 ease-out ${
          pill
            ? "mt-3 max-w-4xl rounded-full border border-line bg-surface/80 shadow-[0_12px_40px_-12px_oklch(0.25_0.045_195/0.28)] backdrop-blur-md"
            : "mt-0 max-w-[100vw] rounded-none border border-transparent border-b-line bg-surface shadow-none"
        }`}
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-6xl items-center justify-between transition-all duration-500 ${
            pill ? "h-16 px-6" : "h-20 px-3 sm:h-24 sm:px-8"
          }`}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="CareKid home"
            className={`transition-all duration-500 ${pill ? "text-[0.8rem]" : "text-[0.85rem] sm:text-[1rem]"}`}
          >
            <Logo />
          </Link>

          <ul className="hidden items-center gap-8 whitespace-nowrap lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="relative py-1 font-medium after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className={`hidden rounded-full border border-line font-semibold transition-all duration-500 hover:bg-tint sm:inline-block ${pill ? "px-5 py-2 text-sm" : "px-6 py-2.5 text-base"}`}
            >
              Login
            </Link>
            <Link
              href="#demo"
              className={`hidden rounded-full bg-ink font-semibold text-bg transition-all duration-500 hover:bg-ink/85 sm:inline-block ${pill ? "px-5 py-2 text-sm" : "px-6 py-2.5 text-base"}`}
            >
              Book a demo
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-3 top-full mt-2 rounded-3xl border border-line bg-surface p-5 shadow-xl lg:hidden"
        >
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 font-display text-2xl font-extrabold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="rounded-full border border-line py-3 text-center font-semibold"
            >
              Login
            </Link>
            <Link
              href="#demo"
              onClick={() => setOpen(false)}
              className="rounded-full bg-ink py-3 text-center font-semibold text-bg"
            >
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
