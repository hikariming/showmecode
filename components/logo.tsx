import Link from "next/link";

import { LogoMark } from "@/components/icons";

export function Logo() {
  return (
    <Link href="#top" className="inline-flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center text-brand">
        <LogoMark className="h-5 w-5" />
      </span>
      <span className="text-[1.25rem] font-semibold tracking-[-0.04em] text-foreground">
        show<span className="text-brand">me</span>code
      </span>
    </Link>
  );
}
