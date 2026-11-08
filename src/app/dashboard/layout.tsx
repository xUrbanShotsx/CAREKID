import type { Metadata } from "next";
import { CentreProvider } from "@/components/app/CentreContext";
import { AppShell } from "@/components/app/AppShell";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | CareKid" },
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <CentreProvider>
      <AppShell>{children}</AppShell>
    </CentreProvider>
  );
}
