import { AboutBook } from "@/components/about-book";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { IntroBand } from "@/components/intro-band";
import { PartGrid } from "@/components/part-grid";
import { StageBand } from "@/components/stage-band";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StageBand />
        <IntroBand />
        <PartGrid />
        <AboutBook />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
