import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MarkdownBody } from "@/components/markdown-body";
import { bookParts } from "@/data/book";
import { getPartBody } from "@/lib/book-content";

export const metadata = {
  title: "引言 | 赤脚程序员实战手册",
  description: "新兴群体：“赤脚程序员”——用自然语言指挥 AI，把想法变成能用的产品。",
};

export default function IntroPage() {
  const body = getPartBody("intro");
  const first = [...bookParts].sort((a, b) => a.number - b.number)[0];

  return (
    <>
      <Header />
      <main>
        <section className="section-space">
          <div className="page-shell max-w-4xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-brand"
            >
              ← 返回首页
            </Link>
            <article className="mt-8 min-w-0">
              <MarkdownBody>{body}</MarkdownBody>
            </article>
            {first ? (
              <nav className="mt-16 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-end">
                <Link
                  href={`/book/${first.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-brand"
                >
                  第 {first.number} 篇 {first.name} {first.fullTitle}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </nav>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
