"use client";

import Link from "next/link";
import { useState } from "react";
import { useCentre } from "@/components/app/CentreContext";
import { PickCentre } from "@/components/app/PickCentre";
import { ChildAvatar } from "@/components/app/ChildBits";
import { attOf, ops, useOps } from "@/components/app/OpsStore";
import { PageHead } from "@/components/app/ui";
import { childrenOf, type Child } from "@/lib/children";

type Mode = "arriving" | "leaving";

export function View() {
  const { centre } = useCentre();
  if (!centre) return <PickCentre title="Parent kiosk" what="The kiosk" />;
  return <Kiosk centreId={centre.id} />;
}

function Kiosk({ centreId }: { centreId: string }) {
  const o = useOps();
  const [mode, setMode] = useState<Mode>("arriving");
  const [child, setChild] = useState<Child | null>(null);
  const [who, setWho] = useState("");
  const [pin, setPin] = useState("");
  const [done, setDone] = useState("");

  const list = childrenOf(centreId).filter((k) => attOf(o, k).status === (mode === "arriving" ? "expected" : "in"));
  const reset = () => { setChild(null); setWho(""); setPin(""); };

  const finish = (k: Child, by: string) => {
    if (mode === "arriving") ops.signIn(k.id, by);
    else ops.signOut(k, by);
    setDone(`${k.first} is ${mode === "arriving" ? "signed in" : "signed out"}. ${mode === "arriving" ? "Have a lovely day." : "See you next time."}`);
    reset();
    setTimeout(() => setDone(""), 4000);
  };

  const press = (d: string) => {
    if (!child || !who) return;
    const next = (pin + d).slice(0, 4);
    setPin(next);
    if (next.length === 4) finish(child, who);
  };

  return (
    <div className="space-y-6">
      <PageHead
        title="Parent kiosk"
        sub="A tablet at the front door for families. In this demo any four digits work as the PIN."
        right={<Link href="/dashboard/attendance" className="rounded-full border border-ink/30 px-5 py-2.5 text-sm font-semibold hover:bg-tint">Back to the roll</Link>}
      />
      <div className="flex gap-2">
        {(["arriving", "leaving"] as Mode[]).map((m) => (
          <button key={m} type="button" onClick={() => { setMode(m); reset(); }} aria-pressed={mode === m} className={`rounded-full px-6 py-3 font-semibold ${mode === m ? "bg-ink text-bg" : "border border-line hover:bg-tint"}`}>
            {m === "arriving" ? "Arriving" : "Leaving"}
          </button>
        ))}
      </div>

      {done && <p role="status" className="rounded-2xl bg-accent p-5 font-display text-xl font-extrabold">{done}</p>}

      {!child && (
        <>
          <p className="font-semibold">Tap your child</p>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {list.map((k) => (
              <li key={k.id}>
                <button type="button" onClick={() => setChild(k)} className="row-hover flex w-full items-center gap-4 rounded-2xl border border-line p-5 text-left">
                  <ChildAvatar child={k} />
                  <span className="font-display text-lg font-extrabold">{k.first}</span>
                </button>
              </li>
            ))}
            {list.length === 0 && <li className="col-span-full text-ink-soft">{mode === "arriving" ? "Everyone expected is in." : "Nobody is left to collect."}</li>}
          </ul>
        </>
      )}

      {child && !who && (
        <div className="space-y-4">
          <p className="font-semibold">Who is {mode === "arriving" ? "dropping off" : "collecting"} {child.first}?</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {child.authorised.filter((p) => p.canCollect).map((p) => (
              <li key={p.name}>
                <button type="button" onClick={() => setWho(p.name)} className="row-hover w-full rounded-2xl border border-line p-5 text-left">
                  <span className="block font-display text-lg font-extrabold">{p.name}</span>
                  <span className="text-sm text-ink-soft">{p.relation}</span>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={reset} className="font-semibold underline">Cancel</button>
        </div>
      )}

      {child && who && (
        <div className="mx-auto max-w-xs space-y-4 text-center">
          <p className="font-semibold">Enter your PIN, {who.split(" ")[0]}</p>
          <p aria-live="polite" className="font-display text-4xl font-extrabold tracking-[0.5em]">{"•".repeat(pin.length) || " "}</p>
          <div className="grid grid-cols-3 gap-3">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
              <button key={d} type="button" onClick={() => press(d)} className="rounded-2xl border border-line py-5 font-display text-2xl font-extrabold hover:bg-tint">{d}</button>
            ))}
            <button type="button" onClick={reset} className="rounded-2xl py-5 text-sm font-semibold hover:bg-tint">Cancel</button>
            <button type="button" onClick={() => press("0")} className="rounded-2xl border border-line py-5 font-display text-2xl font-extrabold hover:bg-tint">0</button>
            <button type="button" onClick={() => setPin((p) => p.slice(0, -1))} className="rounded-2xl py-5 text-sm font-semibold hover:bg-tint">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
