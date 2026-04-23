"use client";

import { useEffect, useState } from "react";

import type { TocItem } from "@/lib/book-content";

export function PartToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;
    const ids = items.map((i) => i.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: [0.1, 0.4, 0.7] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="本篇目录"
      className="hidden xl:block sticky top-20 self-start w-56 max-h-[calc(100vh-6rem)] overflow-y-auto pl-6 text-sm"
    >
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand/70">
        本篇目录
      </div>
      <ul className="space-y-1 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block -ml-px border-l py-1.5 pl-4 transition ${
                item.id === activeId
                  ? "border-brand text-brand font-medium"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
