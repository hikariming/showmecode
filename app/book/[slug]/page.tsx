import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MarkdownBody } from "@/components/markdown-body";
import { PartCover } from "@/components/part-cover";
import { PartNav } from "@/components/part-nav";
import { PartToc } from "@/components/part-toc";
import { bookParts } from "@/data/book";
import { extractToc, getPartBody } from "@/lib/book-content";

const TOC_MIN_HEADINGS = 4;

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

  const body = getPartBody(part.slug);
  const toc = extractToc(body);
  const showToc = toc.length >= TOC_MIN_HEADINGS;

  return (
    <>
      <Header />
      <main>
        <PartCover part={part} />
        <section className="section-space pt-0">
          <div className="page-shell max-w-4xl">
            <div className="xl:flex xl:gap-8">
              <article className="min-w-0 flex-1">
                <MarkdownBody>{body}</MarkdownBody>
              </article>
              {showToc ? <PartToc items={toc} /> : null}
            </div>
          </div>
        </section>
        <PartNav part={part} />
      </main>
      <Footer />
    </>
  );
}
