import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";

export function Hero() {
  return (
    <section id="top" className="overflow-hidden px-0 pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-10">
      <div className="page-shell hero-grid">
        <div className="grid items-center gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-8">
          <div className="max-w-[40rem]">
            <div className="fade-up inline-flex items-center gap-2 rounded-full border border-brand/12 bg-white/88 px-4 py-2 text-sm font-medium text-brand/78 shadow-[0_10px_30px_rgba(31,94,255,0.08)]">
              <span className="h-2 w-2 rounded-full bg-brand" />
              免费文档教程网站
            </div>

            <h1 className="fade-up mt-7 text-[2.9rem] font-semibold leading-[0.96] tracking-[-0.07em] text-foreground sm:text-[3.9rem] lg:text-[4.6rem]">
              <span className="block lg:whitespace-nowrap">
                学习 <span className="text-brand">VibeCoding</span>
              </span>
              <span className="block">设计你自己的产品</span>
            </h1>

            <p
              className="fade-up mt-7 max-w-[38rem] text-[1.05rem] leading-8 text-muted sm:text-[1.26rem]"
              style={{ animationDelay: "120ms" }}
            >
              一个免费的文档教程网站，帮你从零基础出入门 VibeCoding，
              掌握 AI 编程与产品设计，快速将想法变成可用的产品。
            </p>

            <div
              className="fade-up mt-9 flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: "220ms" }}
            >
              <Link
                href="/book/intro"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-[20px] bg-brand px-8 text-[1.05rem] font-semibold text-white shadow-[0_20px_40px_rgba(31,94,255,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-strong"
              >
                免费开始学习
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#chapters"
                className="inline-flex h-14 items-center justify-center rounded-[20px] border border-line-strong bg-white/90 px-8 text-[1.05rem] font-semibold text-foreground transition hover:border-brand/40 hover:text-brand"
              >
                浏览全部教程
              </Link>
            </div>
          </div>

          <div className="relative fade-up lg:pl-2" style={{ animationDelay: "140ms" }}>
            <div className="absolute inset-0 -z-10 translate-x-4 translate-y-6 dot-field opacity-75 [mask-image:radial-gradient(circle_at_center,black_46%,transparent_92%)]" />
            <div className="absolute -bottom-10 right-6 -z-10 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />

            <div className="float-gentle relative mx-auto w-full max-w-[760px]">
              <Image
                src="/hero-illustration-transparent-v2.png"
                alt="showmecode 首页首屏插画"
                width={1610}
                height={977}
                priority
                className="h-auto w-full select-none object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
