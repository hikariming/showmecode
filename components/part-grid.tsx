import { PartCard } from "@/components/part-card";
import { SectionShell } from "@/components/section-shell";
import { bookParts } from "@/data/book";

export function PartGrid() {
  const parts = [...bookParts].sort((a, b) => a.number - b.number);

  return (
    <SectionShell
      id="chapters"
      eyebrow="Chapters"
      title="九篇章节，覆盖从想法到上线全过程"
      description="每一篇都聚焦一个真实痛点，配套可执行的关键行动。点开任意一篇即可阅读详情。"
      className="border-t border-line/60 bg-white/55"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {parts.map((part) => (
          <PartCard key={part.slug} part={part} />
        ))}
      </div>
    </SectionShell>
  );
}
