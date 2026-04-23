import Link from "next/link";

import { authors, type BookPart } from "@/data/book";

function authorOf(part: BookPart) {
  return authors.find((a) => a.id === part.authorId);
}

export function PartCover({ part }: { part: BookPart }) {
  const author = authorOf(part);

  return (
    <section className="section-space">
      <div className="page-shell max-w-4xl">
        <Link
          href="/#chapters"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-brand"
        >
          ← 返回全部篇章
        </Link>

        <div className="mt-8 flex items-baseline gap-5">
          <span className="text-[3.6rem] font-semibold leading-none tabular-nums tracking-[-0.06em] text-brand/85">
            {String(part.number).padStart(2, "0")}
          </span>
          <span className="rounded-full bg-brand-soft px-4 py-1.5 text-sm font-semibold text-brand">
            {part.name}
          </span>
        </div>

        <h1 className="mt-5 text-[2.8rem] font-semibold leading-[1.05] tracking-[-0.06em] text-foreground sm:text-[3.6rem]">
          {part.fullTitle}
        </h1>

        {author ? (
          <div className="mt-6 flex items-center gap-3 text-sm text-muted">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-base font-semibold text-brand">
              {author.initials}
            </span>
            <span className="font-medium text-foreground">{author.name}</span>
            <span>·</span>
            <span>{author.title}</span>
            <span>·</span>
            <span>约 {part.pageCount} 页</span>
          </div>
        ) : null}

        <div className="mt-12 rounded-[24px] border-l-4 border-brand/60 bg-white/85 p-6 text-[1.05rem] leading-8 text-foreground/92 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand/70">
            核心痛点
          </div>
          {part.pain}
        </div>

        <div className="mt-8">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand/70">
            解决方案
          </div>
          <p className="text-[1.05rem] leading-8 text-foreground/92">{part.solution}</p>
        </div>

        <div className="mt-8">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand/70">
            关键行动
          </div>
          <ul className="space-y-3">
            {part.actions.map((action, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-[18px] border border-line bg-white/85 p-4 text-[1rem] leading-7 text-foreground/90"
              >
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand">
                  {i + 1}
                </span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
