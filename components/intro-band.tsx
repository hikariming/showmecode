import Link from "next/link";
import Image from "next/image";

import { ArrowRightIcon, QuoteMarkIcon } from "@/components/icons";

export function IntroBand() {
  return (
    <section id="intro" className="section-space scroll-mt-24 pt-0">
      <div className="page-shell">
        <Link
          href="/book/intro"
          className="group preface-card relative block overflow-hidden rounded-[34px] border border-line-strong bg-white/88 px-6 py-8 shadow-[0_24px_70px_rgba(17,39,120,0.07)] transition duration-300 hover:-translate-y-1 hover:border-brand/42 sm:px-9 sm:py-10 lg:grid lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:gap-10 lg:px-12 lg:py-12"
        >
          <div className="absolute -left-7 bottom-0 h-44 w-44 dot-field-sm opacity-75 [mask-image:radial-gradient(circle_at_center,black_46%,transparent_86%)]" />
          <div className="absolute right-7 top-7 h-48 w-48 rounded-full border border-dashed border-brand/20" />
          <div className="absolute right-[-2rem] top-12 h-40 w-40 rounded-full bg-brand/[0.05] blur-3xl" />

          <div className="relative z-[1] flex-1">
            <div className="text-sm font-semibold uppercase tracking-[0.32em] text-brand">
              Preface · 引言
            </div>

            <div className="mt-6 text-brand">
              <QuoteMarkIcon className="h-12 w-12 sm:h-14 sm:w-14" />
            </div>

            <h2 className="mt-3 max-w-[26rem] text-[2.4rem] font-semibold leading-[1.12] tracking-[-0.08em] text-foreground sm:text-[3.35rem]">
              新兴群体：
              <br />
              “赤脚程序员”
            </h2>

            <div className="mt-6 h-1 w-20 rounded-full bg-brand/85" />

            <p className="mt-7 max-w-[34rem] text-[1rem] leading-8 text-muted sm:text-[1.04rem]">
              他们大多没有计算机科班的背景，却更懂生活、更懂业务、更懂痛点。
              在开始九篇章节之前，先读一读这本书为谁而写。
            </p>
          </div>

          <div className="relative z-[1] mt-10 flex flex-col items-center lg:mt-0 lg:items-end">
            <Image
              src="/home/illustrations/preface-book-v2.png"
              alt="打开的书本插画"
              width={1536}
              height={1024}
              className="h-auto w-full max-w-[22rem] object-contain sm:max-w-[25rem] lg:max-w-[28rem]"
            />

            <div className="mt-4 inline-flex items-center gap-3 rounded-[20px] bg-brand px-8 py-4 text-[1rem] font-semibold text-white shadow-[0_18px_38px_rgba(31,94,255,0.24)] transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand-strong sm:px-9">
              阅读引言
              <ArrowRightIcon className="h-5 w-5" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
