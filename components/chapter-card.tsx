import { BookIcon } from "@/components/icons";
import type { ChapterCardItem } from "@/data/homepage";

function CardArtwork({ art }: { art: ChapterCardItem["art"] }) {
  switch (art) {
    case "clock":
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full text-brand/90" fill="none">
          <circle cx="100" cy="62" r="42" stroke="currentColor" strokeWidth="3" strokeDasharray="2 4" />
          <path d="M100 62V38m0 24h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <rect x="28" y="78" width="144" height="26" rx="13" fill="url(#clockGlow)" opacity=".18" />
          <defs>
            <linearGradient id="clockGlow" x1="28" x2="172" y1="91" y2="91">
              <stop stopColor="currentColor" />
              <stop offset="1" stopColor="currentColor" stopOpacity=".1" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "cursor":
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full text-brand/90" fill="none">
          <rect x="20" y="18" width="120" height="78" rx="16" stroke="currentColor" strokeWidth="3" />
          <path d="M40 42h46M40 58h58M40 74h34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="m140 44 20 42-12-5-8 13-10-5 8-12-10-33 12 0Z" fill="currentColor" opacity=".85" />
        </svg>
      );
    case "flow":
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full text-brand/90" fill="none">
          <rect x="74" y="12" width="52" height="18" rx="6" stroke="currentColor" strokeWidth="3" />
          <rect x="20" y="76" width="42" height="18" rx="6" stroke="currentColor" strokeWidth="3" />
          <rect x="80" y="76" width="42" height="18" rx="6" fill="currentColor" opacity=".88" />
          <rect x="138" y="76" width="42" height="18" rx="6" stroke="currentColor" strokeWidth="3" />
          <path d="M100 30v24M100 54H41v22M100 54h59v22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "cube":
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full text-brand/90" fill="none">
          <path d="m100 24 34 18v36l-34 18-34-18V42l34-18Z" fill="currentColor" opacity=".9" />
          <path d="M100 24v72M66 42l34 18 34-18" stroke="white" strokeOpacity=".6" strokeWidth="2" />
          <path d="M52 20h16M44 28V12m104 8h16m8-8v16M52 100h16m-24-8v16m104-8h16m8-8v16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "bulb":
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full text-brand/90" fill="none">
          <path d="M100 26a28 28 0 0 1 18 50c-4 3.6-6 7-7 12H89c-1-5-3-8.4-7-12a28 28 0 0 1 18-50Z" stroke="currentColor" strokeWidth="3" />
          <path d="M92 92h16M94 100h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M100 12v10M60 28l8 8M140 28l-8 8M50 58h10M140 58h10M73 18l5 9M127 18l-5 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
  }
}

export function ChapterCard({ item }: { item: ChapterCardItem }) {
  return (
    <article className="group flex h-full flex-col rounded-[28px] border border-line bg-white/88 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1.5 hover:border-brand/24 hover:shadow-[0_24px_60px_rgba(31,94,255,0.12)] sm:p-5">
      <div className="relative overflow-hidden rounded-[24px] border border-brand/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,248,255,0.98))] p-4">
        <div className="dot-field absolute inset-0 opacity-80" />
        <span className="relative inline-flex rounded-full border border-line bg-white/92 px-3 py-1 text-xs font-semibold text-foreground/72">
          {item.badge}
        </span>
        <div className="relative mt-4 h-36 transition duration-300 group-hover:scale-[1.03]">
          <CardArtwork art={item.art} />
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="whitespace-pre-line text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.06em] text-foreground">
          {item.title}
        </h3>
        <p className="mt-4 flex-1 text-[1rem] leading-7 text-muted">{item.description}</p>
        <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm text-muted">
          <span className="inline-flex items-center gap-2">
            <BookIcon className="h-4 w-4 text-brand/70" />
            {item.meta}
          </span>
          <span>阅读 {item.readCount}</span>
        </div>
      </div>
    </article>
  );
}

