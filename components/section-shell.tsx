import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  action,
  children,
  className,
}: SectionShellProps) {
  return (
    <section id={id} className={`section-space ${className ?? ""}`}>
      <div className="page-shell">
        <div className="mb-10 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {eyebrow ? (
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand/70">
                {eyebrow}
              </div>
            ) : null}
            <h2 className="text-3xl font-semibold tracking-[-0.06em] text-foreground sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">{description}</p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

