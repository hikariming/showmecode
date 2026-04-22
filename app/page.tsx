import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HotChapters } from "@/components/hot-chapters";
import { LearningPath } from "@/components/learning-path";
import { ValueGrid } from "@/components/value-grid";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HotChapters />
        <LearningPath />
        <ValueGrid />
      </main>
      <Footer />
    </>
  );
}

