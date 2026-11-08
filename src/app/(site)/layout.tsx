import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

/** Marketing pages get the navbar and footer. The dashboard brings its own shell. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 sm:pt-24">{children}</main>
      <Footer />
    </>
  );
}
