import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { SectionShell } from "@/components/section-shell";
import { valueItems } from "@/data/homepage";

export function ValueGrid() {
  return (
    <SectionShell
      id="values"
      eyebrow="Why Showmecode"
      title="为什么用这套方式学习更容易做出东西"
      description="我们把教程、工具和案例放在同一条路径里，让学习目标始终围绕真实产品输出。"
      action={
        <Link
          href="#about"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand/35 hover:text-brand"
        >
          了解 showmecode
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
        {valueItems.map((item) => (
          <article
            key={item.stat}
            className="group rounded-[30px] border border-line bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,255,0.94))] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-brand/28"
          >
            <div className="flex items-start justify-between gap-6">
              <h3 className="max-w-[24ch] text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.06em] text-foreground">
                {item.title}
              </h3>
              <span className="rounded-full bg-brand-soft px-4 py-2 text-sm font-semibold text-brand">
                {item.stat}
              </span>
            </div>
            <div className="mt-8 h-px bg-gradient-to-r from-brand/35 to-brand/0" />
            <p className="mt-6 max-w-[46ch] text-[1rem] leading-8 text-muted">{item.description}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

