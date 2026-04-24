import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export function MarkdownBody({ children }: { children: string }) {
  return (
    <div className="book-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-12 mb-5 text-[calc(var(--book-body-font-size,16px)*1.8)] font-semibold text-foreground">
              {children}
            </h1>
          ),
          h2: ({ children, id }) => (
            <h2
              id={id}
              className="mt-12 mb-4 scroll-mt-24 border-l-4 border-brand/60 pl-4 text-[calc(var(--book-body-font-size,16px)*1.5)] font-semibold text-foreground"
            >
              {children}
            </h2>
          ),
          h3: ({ children, id }) => (
            <h3
              id={id}
              className="mt-8 mb-3 scroll-mt-24 text-[calc(var(--book-body-font-size,16px)*1.125)] font-semibold text-foreground"
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-6 mb-2 text-[length:var(--book-body-font-size,16px)] font-semibold text-foreground">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-5 text-[length:var(--book-body-font-size,16px)] leading-[1.85] text-foreground/86">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-5 list-disc space-y-2 pl-6 text-[length:var(--book-body-font-size,16px)] leading-[1.85] text-foreground/86">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5 list-decimal space-y-2 pl-6 text-[length:var(--book-body-font-size,16px)] leading-[1.85] text-foreground/86">
              {children}
            </ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-brand/60 bg-brand-soft/40 py-2 pl-4 text-[length:var(--book-body-font-size,16px)] italic text-foreground/86">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = className?.startsWith("language-");
            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded-md bg-brand-soft px-1.5 py-0.5 font-mono text-[0.9em] text-brand">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto rounded-2xl bg-slate-900 px-5 py-4 text-[calc(var(--book-body-font-size,16px)*0.875)] leading-[1.7] text-slate-100">
              {children}
            </pre>
          ),
          a: ({ href, children }) => {
            const url = href ?? "#";
            const internal = url.startsWith("/") || url.startsWith("#");
            if (internal) {
              return (
                <Link
                  href={url}
                  className="text-brand underline decoration-brand/40 underline-offset-2 transition hover:decoration-brand"
                >
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline decoration-brand/40 underline-offset-2 transition hover:decoration-brand"
              >
                {children}
              </a>
            );
          },
          img: ({ src, alt }) => {
            const url = typeof src === "string" ? src : "";
            if (!url) return null;
            return (
              <Image
                src={url}
                alt={alt ?? ""}
                width={1200}
                height={800}
                loading="lazy"
                className="my-6 mx-auto block max-w-full rounded-2xl border border-line"
                sizes="(min-width: 1024px) 768px, 100vw"
              />
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
