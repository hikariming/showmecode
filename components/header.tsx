"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { ArrowRightIcon, SearchIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { navItems } from "@/data/homepage";

export function Header() {
  const [activeHash, setActiveHash] = useState<string>(navItems[0]?.href ?? "#top");

  const observedIds = useMemo(
    () =>
      Array.from(
        new Set(
          navItems
            .map((item) => item.href)
            .filter((href) => href.startsWith("#"))
            .map((href) => href.slice(1)),
        ),
      ),
    [],
  );

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash) {
        setActiveHash(window.location.hash);
      }
    };

    syncFromHash();

    const sections = observedIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) {
      window.addEventListener("hashchange", syncFromHash);
      return () => window.removeEventListener("hashchange", syncFromHash);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const nextEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (nextEntry?.target.id) {
          setActiveHash(`#${nextEntry.target.id}`);
        }
      },
      {
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0.22, 0.4, 0.68],
      },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [observedIds]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/86 backdrop-blur-xl">
      <div className="page-shell flex h-14 items-center gap-4">
        <div className="shrink-0">
          <Logo />
        </div>

        <nav className="ml-6 hidden items-center gap-3 lg:flex">
          {navItems.map((item) => {
            const isActive = item.href === activeHash;

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                onClick={() => setActiveHash(item.href)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  isActive ? "bg-brand-soft text-brand" : "text-foreground/86 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-4 md:flex">
          <button
            type="button"
            aria-label="搜索教程、项目和工具"
            className="glass-surface soft-ring flex h-9 min-w-[280px] items-center gap-2.5 rounded-xl px-3 text-left text-xs text-muted transition hover:border-brand/30 hover:text-foreground"
          >
            <SearchIcon className="h-3.5 w-3.5 text-brand/60" />
            <span className="flex-1">搜索教程、项目、工具...</span>
            <span className="rounded-md border border-line bg-white px-1.5 py-0.5 text-[11px] font-semibold text-muted">
              Ctrl K
            </span>
          </button>

          <Link
            href="#chapters"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-brand px-4 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-strong"
          >
            开始学习
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        <Link
          href="#chapters"
          className="ml-auto inline-flex h-9 items-center rounded-xl bg-brand px-3.5 text-xs font-semibold text-white transition hover:bg-brand-strong md:hidden"
        >
          开始学习
        </Link>
      </div>
    </header>
  );
}

