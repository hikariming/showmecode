"use client";

import type { CSSProperties, ReactNode } from "react";
import { useMemo, useSyncExternalStore } from "react";

import { MarkdownBody } from "@/components/markdown-body";

const STORAGE_KEY = "showmecode-book-font-size";
const STORAGE_EVENT = "showmecode-book-font-size-change";
const DEFAULT_INDEX = 1;
const FONT_OPTIONS = [
  { label: "较小", value: 15 },
  { label: "默认", value: 16 },
  { label: "较大", value: 18 },
] as const;

type ReaderStyle = CSSProperties & {
  "--book-body-font-size": string;
};

function normalizeSizeIndex(value: number) {
  return Math.min(FONT_OPTIONS.length - 1, Math.max(0, value));
}

function parseSizeIndex(value: string | null) {
  const parsed = value ? Number(value) : DEFAULT_INDEX;

  return Number.isInteger(parsed) && parsed >= 0 && parsed < FONT_OPTIONS.length
    ? parsed
    : DEFAULT_INDEX;
}

function getStoredSizeIndex() {
  return parseSizeIndex(window.localStorage.getItem(STORAGE_KEY));
}

function getServerSizeIndex() {
  return DEFAULT_INDEX;
}

function subscribeToSizeIndex(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(STORAGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
}

function setStoredSizeIndex(value: number) {
  window.localStorage.setItem(STORAGE_KEY, String(normalizeSizeIndex(value)));
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function BookReader({ children }: { children: ReactNode }) {
  const sizeIndex = useSyncExternalStore(
    subscribeToSizeIndex,
    getStoredSizeIndex,
    getServerSizeIndex,
  );
  const current = FONT_OPTIONS[sizeIndex] ?? FONT_OPTIONS[DEFAULT_INDEX];
  const canDecrease = sizeIndex > 0;
  const canIncrease = sizeIndex < FONT_OPTIONS.length - 1;

  const readerStyle = useMemo<ReaderStyle>(
    () => ({ "--book-body-font-size": `${current.value}px` }),
    [current.value],
  );

  return (
    <div className="book-reader" style={readerStyle}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white/88 px-4 py-3 shadow-[0_14px_40px_rgba(17,39,120,0.08)] backdrop-blur">
        <div>
          <div className="text-sm font-semibold text-foreground">字体大小</div>
          <div className="mt-0.5 text-xs text-muted">{current.label}</div>
        </div>
        <div className="inline-flex items-center rounded-full border border-line bg-white p-1">
          <button
            type="button"
            aria-label="减小字体大小"
            disabled={!canDecrease}
            onClick={() => setStoredSizeIndex(sizeIndex - 1)}
            className="inline-flex h-9 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold text-foreground transition hover:bg-brand-soft hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground"
          >
            A-
          </button>
          <button
            type="button"
            aria-label="恢复默认字体大小"
            aria-pressed={sizeIndex === DEFAULT_INDEX}
            onClick={() => setStoredSizeIndex(DEFAULT_INDEX)}
            className="inline-flex h-9 min-w-12 items-center justify-center rounded-full px-3 text-sm font-semibold text-brand transition hover:bg-brand-soft"
          >
            A
          </button>
          <button
            type="button"
            aria-label="增大字体大小"
            disabled={!canIncrease}
            onClick={() => setStoredSizeIndex(sizeIndex + 1)}
            className="inline-flex h-9 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold text-foreground transition hover:bg-brand-soft hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground"
          >
            A+
          </button>
        </div>
      </div>

      <MarkdownBody>{String(children ?? "")}</MarkdownBody>
    </div>
  );
}
