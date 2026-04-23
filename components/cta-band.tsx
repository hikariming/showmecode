import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";

export function CtaBand() {
  return (
    <section className="section-space">
      <div className="page-shell">
        <div className="relative overflow-hidden rounded-[32px] border border-brand/20 bg-[linear-gradient(135deg,rgba(31,94,255,0.06),rgba(255,255,255,0.95))] p-10 text-center shadow-[0_30px_80px_rgba(31,94,255,0.1)] sm:p-14">
          <div className="dot-field absolute inset-0 opacity-50" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-[2.2rem] font-semibold leading-[1.1] tracking-[-0.05em] text-foreground sm:text-[2.8rem]">
              准备好开始你的第一篇了吗？
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
              从认知篇出发，了解 AI 时代'赤脚程序员'到底是怎么思考问题的。
            </p>
            <Link
              href="/book/cognition"
              className="mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-[20px] bg-brand px-8 text-[1.05rem] font-semibold text-white shadow-[0_20px_40px_rgba(31,94,255,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-strong"
            >
              开始阅读第 1 篇
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
