import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { stages } from "@/data/book";

const stageArt = {
  think: { src: "/home/illustrations/stage-think-v2.png", width: 1086, height: 1448 },
  build: { src: "/home/illustrations/stage-build-v2.png", width: 1122, height: 1402 },
  polish: { src: "/home/illustrations/stage-polish-v2.png", width: 1168, height: 1346 },
  ship: { src: "/home/illustrations/stage-ship-v2.png", width: 1088, height: 1445 },
} as const;

export function StageBand() {
  return (
    <section id="path" className="section-space pt-0">
      <div className="page-shell">
        <div className="relative overflow-hidden rounded-[36px] px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(31,94,255,0.22),transparent)]" />
          <div className="absolute -left-16 top-16 h-48 w-48 rounded-full bg-brand/[0.05] blur-3xl" />
          <div className="absolute -right-8 top-2 h-56 w-56 rounded-full bg-brand/[0.07] blur-3xl" />
          <div className="absolute left-[-2rem] top-[18rem] h-40 w-40 dot-field-sm opacity-70 [mask-image:radial-gradient(circle_at_center,black_46%,transparent_84%)]" />
          <div className="absolute right-0 top-0 h-40 w-72 dot-field-sm opacity-55 [mask-image:linear-gradient(180deg,black,transparent)]" />

          <div className="relative max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.34em] text-brand">
              Learning Path
            </div>
            <h2 className="mt-5 text-[2.4rem] font-semibold tracking-[-0.07em] text-foreground sm:text-[3.2rem]">
              一本书的四个阶段
            </h2>
            <p className="mt-5 max-w-[44rem] text-base leading-8 text-muted sm:text-[1.08rem]">
              把 9 篇内容串成一条创作流程：先想清楚，再写出来，把它做好看，最后让世界看到。
            </p>
          </div>

          <div className="relative mt-14 hidden lg:block">
            <div className="absolute left-[8%] right-[2.5%] top-4 h-px border-t border-dashed border-brand/35" />
            <div className="absolute right-[1.2%] top-[10px] h-0 w-0 border-y-[5px] border-l-[10px] border-y-transparent border-l-brand/35" />

            <div className="grid grid-cols-4 gap-10 pt-1">
              {stages.map((stage, idx) => (
                <div key={stage.id} className="relative pt-9">
                  <div className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center">
                    <span className="h-5 w-5 rounded-full border-2 border-brand bg-white shadow-[0_0_0_4px_rgba(31,94,255,0.14)]" />
                    <span className="mt-1 h-5 w-px bg-brand/18" />
                  </div>

                  <Link
                    href={stage.href}
                    aria-label={`阅读${stage.label}阶段：${stage.partRange}`}
                    className="group stage-card relative flex h-full flex-col rounded-[28px] border border-line bg-white/90 px-5 pb-5 pt-5 shadow-[0_22px_60px_rgba(17,39,120,0.07)] transition duration-300 hover:-translate-y-1.5 hover:border-brand/36"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-[14px] bg-brand text-[1.02rem] font-semibold text-white shadow-[0_10px_22px_rgba(31,94,255,0.24)]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[1.05rem] font-semibold tracking-[0.12em] text-brand">
                        {stage.partRange}
                      </span>
                    </div>

                    <div className="mt-7 flex h-[180px] items-center justify-center text-brand">
                      <Image
                        src={stageArt[stage.id].src}
                        alt={`${stage.label} 插画`}
                        width={stageArt[stage.id].width}
                        height={stageArt[stage.id].height}
                        className="mx-auto h-full w-auto max-w-full object-contain"
                      />
                    </div>

                    <h3 className="mt-2 text-[2rem] font-semibold tracking-[-0.07em] text-foreground">
                      {stage.label}
                    </h3>
                    <p className="mt-3 max-w-[18rem] text-[1rem] leading-8 text-muted">
                      {stage.description}
                    </p>

                    <div className="mt-auto flex justify-end pt-7 text-brand transition duration-300 group-hover:translate-x-1">
                      <ArrowRightIcon className="h-5 w-5" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-12 lg:hidden">
            <div className="absolute bottom-4 left-[18px] top-4 border-l border-dashed border-brand/35" />

            <div className="space-y-6">
              {stages.map((stage, idx) => (
                <div key={stage.id} className="relative pl-12">
                  <span className="absolute left-[9px] top-8 h-5 w-5 rounded-full border-2 border-brand bg-white shadow-[0_0_0_4px_rgba(31,94,255,0.14)]" />

                  <Link
                    href={stage.href}
                    aria-label={`阅读${stage.label}阶段：${stage.partRange}`}
                    className="stage-card group relative block rounded-[26px] border border-line bg-white/92 px-5 pb-5 pt-5 shadow-[0_18px_44px_rgba(17,39,120,0.06)] transition duration-300 hover:border-brand/32"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-[13px] bg-brand text-sm font-semibold text-white">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-semibold tracking-[0.14em] text-brand">
                        {stage.partRange}
                      </span>
                    </div>

                    <div className="mt-6 flex h-[168px] items-center justify-center text-brand">
                      <Image
                        src={stageArt[stage.id].src}
                        alt={`${stage.label} 插画`}
                        width={stageArt[stage.id].width}
                        height={stageArt[stage.id].height}
                        className="mx-auto h-full w-auto max-w-full object-contain"
                      />
                    </div>

                    <h3 className="mt-2 text-[1.7rem] font-semibold tracking-[-0.06em] text-foreground">
                      {stage.label}
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-7 text-muted">{stage.description}</p>

                    <div className="mt-5 flex justify-end text-brand transition duration-300 group-hover:translate-x-1">
                      <ArrowRightIcon className="h-5 w-5" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
