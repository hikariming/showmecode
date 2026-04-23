import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PartCover } from "@/components/part-cover";
import { bookParts } from "@/data/book";

export function generateStaticParams() {
  return bookParts.map((part) => ({ slug: part.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const part = bookParts.find((p) => p.slug === slug);
  if (!part) return {};
  return {
    title: `第 ${part.number} 篇 ${part.name} - ${part.fullTitle} | 赤脚程序员实战手册`,
    description: part.solution,
  };
}

export default async function BookPartPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const part = bookParts.find((p) => p.slug === slug);
  if (!part) notFound();
  return (
    <>
      <Header />
      <main>
        <PartCover part={part} />
      </main>
      <Footer />
    </>
  );
}
