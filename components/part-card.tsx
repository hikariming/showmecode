import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { authors, type BookPart } from "@/data/book";

export function PartCard({ part }: { part: BookPart }) {
  const author = authors.find((a) => a.id === part.authorId);

  return (
    <Link
      href={`/book/${part.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-white/88 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1.5 hover:border-brand/28 hover:shadow-[0_24px_60px_rgba(31,94,255,0.12)]"
    >
      <div className="relative overflow-hidden border-b border-line/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,248,255,0.98))] p-5">
        <div className="dot-field absolute inset-0 opacity-70" />
        <div className="relative flex items-baseline justify-between">
          <span className="text-[2.6rem] font-semibold leading-none tabular-nums tracking-[-0.06em] text-brand/85">
            {String(part.number).padStart(2, "0")}
          </span>
          <span className="rounded-full border border-line bg-white/92 px-3 py-1 text-xs font-semibold text-foreground/72">
            约 {part.pageCount} 页
          </span>
        </div>
        <div className="relative mt-5">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-brand/70">
            {part.name}
          </div>
          <h3 className="mt-2 text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.04em] text-foreground">
            {part.fullTitle}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-6 text-muted line-clamp-3">{part.pain}</p>
        {part.actions.length ? (
          <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/82">
            {part.actions.slice(0, 2).map((action, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70" />
                <span className="line-clamp-2">{action}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-sm">
          <span className="text-muted">{author?.name ?? "—"}</span>
          <span className="inline-flex items-center gap-1 font-medium text-brand transition group-hover:gap-2">
            阅读这篇
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
