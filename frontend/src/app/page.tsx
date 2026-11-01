import { HeroSection } from "@/components/hero-section";
import { SiteHeader } from "@/components/site-header";
import { ValueStrip } from "@/components/value-strip";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ValueStrip />
      </main>
    </>
  );
}
