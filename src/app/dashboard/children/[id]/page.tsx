import type { Metadata } from "next";
import { children } from "@/lib/children";
import { Profile } from "./Profile";

export const metadata: Metadata = { title: "Child profile" };

/** Every child in the demo workspace has a prerendered profile page. */
export function generateStaticParams() {
  return children.map((c) => ({ id: c.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Profile id={id} />;
}
