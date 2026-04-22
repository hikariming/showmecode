import { SectionShell } from "@/components/section-shell";
import { learningSteps } from "@/data/homepage";

export function LearningPath() {
  return (
    <SectionShell
      id="path"
      eyebrow="Learning Path"
      title="从零基础到做出产品的学习路径"
      description="按照一条更接近真实创作流程的路径来学，而不是在零散教程之间反复切换。"
    >
      <div className="relative grid gap-5 lg:grid-cols-3">
        <div className="pointer-events-none absolute left-[18%] right-[18%] top-12 hidden h-px bg-gradient-to-r from-brand/0 via-brand/28 to-brand/0 lg:block" />
        {learningSteps.map((item, index) => (
          <article
            key={item.step}
            className="relative rounded-[30px] border border-line bg-white/88 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
          >
            <div className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl bg-brand text-sm font-semibold text-white">
              {item.step}
            </div>
            <div className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-brand/72">
              {item.accent}
            </div>
            <h3 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.06em] text-foreground">
              {item.title}
            </h3>
            <p className="mt-4 max-w-[34ch] text-[1rem] leading-7 text-muted">{item.description}</p>

            <div className="mt-8 flex items-center gap-3 text-sm font-medium text-brand/78">
              <span className="h-2 w-2 rounded-full bg-brand" />
              {index < learningSteps.length - 1 ? "继续向下一个阶段推进" : "开始构建自己的产品"}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

