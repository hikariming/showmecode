import Link from "next/link";

import { SectionShell } from "@/components/section-shell";
import { authors, bookParts } from "@/data/book";

export function AboutBook() {
  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="赤脚程序员，自己解决自己的问题"
      description="上世纪农村的'赤脚医生'用最少的训练守护邻里健康。今天，借助 AI 编程工具，每个非科班的人也能动手解决身边的麻烦。这本手册由 6 位一线作者协作完成，带你走完从想法到上线的完整路径。"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {authors.map((author) => {
          const parts = bookParts.filter((p) => author.partSlugs.includes(p.slug));
          return (
            <article
              key={author.id}
              className="rounded-[24px] border border-line bg-white/88 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-lg font-semibold text-brand">
                  {author.initials}
                </span>
                <div>
                  <div className="text-[1.1rem] font-semibold text-foreground">{author.name}</div>
                  <div className="text-sm text-muted">{author.title}</div>
                </div>
              </div>
              <ul className="mt-5 space-y-2">
                {parts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/book/${p.slug}`}
                      className="flex items-center justify-between rounded-xl border border-line bg-white px-3 py-2 text-sm text-foreground/85 transition hover:border-brand/30 hover:text-brand"
                    >
                      <span>第 {p.number} 篇 · {p.name}</span>
                      <span className="text-xs text-muted">{p.fullTitle}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
