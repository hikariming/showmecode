import { SectionShell } from "@/components/section-shell";
import { stages } from "@/data/book";

export function StageBand() {
  return (
    <SectionShell
      id="path"
      eyebrow="Learning Path"
      title="一本书的四个阶段"
      description="把 9 篇内容串成一条创作流程：先想清楚，再写出来，把它做好看，最后让世界看到。"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, idx) => (
          <article
            key={stage.id}
            className="rounded-[24px] border border-line bg-white/88 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-brand/24"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-sm font-semibold text-white">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand/72">
                {stage.partRange}
              </span>
            </div>
            <h3 className="mt-4 text-[1.5rem] font-semibold tracking-[-0.04em] text-foreground">
              {stage.label}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">{stage.description}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
