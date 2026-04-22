"use client";

import { useState, useTransition } from "react";

import { ChapterCard } from "@/components/chapter-card";
import type { ChapterCardItem, ChapterCategory } from "@/data/homepage";

type CategoryTabsProps = {
  categories: ChapterCategory[];
  cards: ChapterCardItem[];
};

export function CategoryTabs({ categories, cards }: CategoryTabsProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "hot");
  const [isPending, startTransition] = useTransition();

  const visibleCards = cards
    .filter((card) => card.featuredIn.includes(activeCategory))
    .slice(0, 5);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {categories.map((category) => {
          const isActive = category.id === activeCategory;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                startTransition(() => {
                  setActiveCategory(category.id);
                });
              }}
              className={`rounded-full px-4 py-2 text-[1rem] font-semibold transition ${
                isActive
                  ? "bg-brand text-white shadow-[0_16px_30px_rgba(31,94,255,0.22)]"
                  : "bg-white text-muted hover:bg-slate-50 hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div className={`mt-8 transition ${isPending ? "opacity-80" : "opacity-100"}`}>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {visibleCards.map((card) => (
            <ChapterCard key={card.id} item={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

