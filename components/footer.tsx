import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { footerGroups } from "@/data/homepage";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer id="about" className="border-t border-line/70 bg-white/72 pb-10 pt-16">
      <div className="page-shell">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="max-w-2xl">
            <Logo />
            <p className="mt-6 text-lg leading-8 text-muted">
              showmecode 是一个面向中文创作者的 VibeCoding 学习网站，
              帮助你把 AI 编程、产品设计和真实项目实践串成一条可执行的路径。
            </p>
            <Link
              href="#top"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong"
            >
              回到顶部
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand/70">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-base text-muted transition hover:text-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6 text-sm text-muted">
          © 2026 showmecode. Learning VibeCoding, shipping real products.
        </div>
      </div>
    </footer>
  );
}
