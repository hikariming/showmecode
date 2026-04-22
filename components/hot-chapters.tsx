import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { SectionShell } from "@/components/section-shell";
import { CategoryTabs } from "@/components/category-tabs";
import { chapterCards, chapterCategories } from "@/data/homepage";

export function HotChapters() {
  return (
    <SectionShell
      id="chapters"
      title="热门章节"
      action={
        <Link
          href="#values"
          className="inline-flex items-center gap-2 text-base font-semibold text-muted transition hover:text-brand"
        >
          查看全部教程
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      }
      className="border-t border-line/60 bg-white/55"
    >
      <CategoryTabs categories={chapterCategories} cards={chapterCards} />
    </SectionShell>
  );
}

