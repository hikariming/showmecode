import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { bookParts, type BookPart } from "@/data/book";

export function PartNav({ part }: { part: BookPart }) {
  const sorted = [...bookParts].sort((a, b) => a.number - b.number);
  const idx = sorted.findIndex((p) => p.slug === part.slug);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  return (
    <nav className="page-shell max-w-4xl mt-16 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
      {prev ? (
        <Link
          href={`/book/${prev.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-brand"
        >
          ← 第 {prev.number} 篇 {prev.name} {prev.fullTitle}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/book/${next.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-brand sm:justify-end"
        >
          第 {next.number} 篇 {next.name} {next.fullTitle}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      ) : null}
    </nav>
  );
}
