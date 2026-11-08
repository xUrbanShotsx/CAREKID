import type { Metadata } from "next";
import { DailyChecks } from "./DailyChecks";

export const metadata: Metadata = { title: "Daily checks" };

export default function Page() {
  return <DailyChecks />;
}
