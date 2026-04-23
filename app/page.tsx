import { AboutBook } from "@/components/about-book";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PartGrid } from "@/components/part-grid";
import { StageBand } from "@/components/stage-band";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StageBand />
        <PartGrid />
        <AboutBook />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
