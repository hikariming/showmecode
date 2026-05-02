"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import MiniSearch, { type SearchResult } from "minisearch";

import { SearchIcon } from "@/components/icons";

type IndexDoc = {
  id: number;
  slug: string;
  chapter: string;
  heading: string;
  level: number;
  anchor: string;
  body: string;
};

type Hit = SearchResult & IndexDoc;

const MAX_RESULTS = 20;
const SNIPPET_RADIUS = 50;

/** Bigram tokenizer — splits CJK runs into overlapping pairs so Chinese matches. */
function tokenize(text: string): string[] {
  const out: string[] = [];
  const ascii = /[A-Za-z0-9_]/;
  let buf = "";
  const flushAscii = () => {
    if (buf) {
      out.push(buf.toLowerCase());
      buf = "";
    }
  };
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (ascii.test(c)) {
      buf += c;
      continue;
    }
    flushAscii();
    if (/\s/.test(c)) continue;
    // CJK / punctuation: emit single char + bigram with previous CJK char
    if (/[\u3400-\u9fff\u3040-\u30ff]/.test(c)) {
      out.push(c);
      const prev = chars[i - 1];
      if (prev && /[\u3400-\u9fff\u3040-\u30ff]/.test(prev)) {
        out.push(prev + c);
      }
    }
  }
  flushAscii();
  return out;
}

function highlight(text: string, terms: string[]): React.ReactNode {
  if (!terms.length || !text) return text;
  const lowered = text.toLowerCase();
  const ranges: Array<[number, number]> = [];
  for (const term of terms) {
    const t = term.toLowerCase();
    if (!t) continue;
    let from = 0;
    while (from < lowered.length) {
      const i = lowered.indexOf(t, from);
      if (i < 0) break;
      ranges.push([i, i + t.length]);
      from = i + t.length;
    }
  }
  if (!ranges.length) return text;
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [];
  for (const r of ranges) {
    const tail = merged[merged.length - 1];
    if (tail && r[0] <= tail[1]) tail[1] = Math.max(tail[1], r[1]);
    else merged.push([r[0], r[1]]);
  }
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const [a, b] of merged) {
    if (a > cursor) parts.push(text.slice(cursor, a));
    parts.push(
      <mark key={`${a}-${b}`} className="rounded bg-brand/15 px-0.5 text-brand">
        {text.slice(a, b)}
      </mark>,
    );
    cursor = b;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

function makeSnippet(body: string, terms: string[]): string {
  if (!body) return "";
  const lowered = body.toLowerCase();
  let earliest = -1;
  for (const term of terms) {
    const t = term.toLowerCase();
    if (!t) continue;
    const i = lowered.indexOf(t);
    if (i >= 0 && (earliest < 0 || i < earliest)) earliest = i;
  }
  if (earliest < 0) {
    return body.length > 140 ? body.slice(0, 140) + "…" : body;
  }
  const start = Math.max(0, earliest - SNIPPET_RADIUS);
  const end = Math.min(body.length, earliest + SNIPPET_RADIUS * 2);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < body.length ? "…" : "";
  return prefix + body.slice(start, end) + suffix;
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<IndexDoc[] | null>(null);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Lazy-fetch index on first open.
  useEffect(() => {
    if (!open || docs) return;
    let cancelled = false;
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: IndexDoc[]) => {
        if (!cancelled) setDocs(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [open, docs]);

  const engine = useMemo(() => {
    if (!docs) return null;
    const ms = new MiniSearch<IndexDoc>({
      idField: "id",
      fields: ["heading", "body", "chapter"],
      storeFields: ["slug", "chapter", "heading", "level", "anchor", "body"],
      tokenize,
      processTerm: (t) => t.toLowerCase(),
      searchOptions: {
        boost: { heading: 4, chapter: 2, body: 1 },
        prefix: true,
        fuzzy: 0.15,
        combineWith: "AND",
      },
    });
    ms.addAll(docs);
    return ms;
  }, [docs]);

  const trimmed = query.trim();
  const hits: Hit[] = useMemo(() => {
    if (!engine || !trimmed) return [];
    const raw = engine.search(trimmed) as Hit[];
    return raw.slice(0, MAX_RESULTS);
  }, [engine, trimmed]);

  const terms = useMemo(() => tokenize(trimmed), [trimmed]);

  // Focus + body scroll lock + ESC handling while open.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Scroll active row into view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const handleNavigate = () => {
    onClose();
    setQuery("");
    setActive(0);
  };

  const hrefFor = (hit: Hit) =>
    hit.anchor ? `/book/${hit.slug}#${hit.anchor}` : `/book/${hit.slug}`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-slate-900/40 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="搜索教程"
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_70px_rgba(15,23,42,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <SearchIcon className="h-4 w-4 text-brand/70" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => Math.min(i + 1, Math.max(0, hits.length - 1)));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter") {
                const hit = hits[active];
                if (hit) {
                  e.preventDefault();
                  router.push(hrefFor(hit));
                  handleNavigate();
                }
              }
            }}
            placeholder="搜索章节、关键字..."
            className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted/70"
          />
          <kbd className="rounded-md border border-line bg-slate-50 px-1.5 py-0.5 text-[11px] font-semibold text-muted">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!docs ? (
            <div className="px-5 py-10 text-center text-sm text-muted">索引加载中...</div>
          ) : !trimmed ? (
            <div className="px-5 py-10 text-center text-sm text-muted">
              输入关键字搜索 · 支持中英文 · ↑↓ 选择 · Enter 跳转
            </div>
          ) : hits.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-muted">
              没有匹配项 · 试试更短的关键字
            </div>
          ) : (
            <ul ref={listRef} className="divide-y divide-line/70">
              {hits.map((hit, idx) => {
                const isActive = idx === active;
                return (
                  <li key={hit.id} data-idx={idx}>
                    <Link
                      href={hrefFor(hit)}
                      onClick={() => handleNavigate()}
                      onMouseEnter={() => setActive(idx)}
                      className={`block px-5 py-3 transition ${
                        isActive ? "bg-brand-soft/60" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-baseline gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand/70">
                        {hit.chapter}
                        {hit.level > 0 ? (
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium tracking-normal text-muted">
                            H{hit.level}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-1 text-[0.95rem] font-medium text-foreground">
                        {highlight(hit.heading, terms)}
                      </div>
                      {hit.body ? (
                        <div className="mt-1 line-clamp-2 text-sm leading-6 text-muted">
                          {highlight(makeSnippet(hit.body, terms), terms)}
                        </div>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
