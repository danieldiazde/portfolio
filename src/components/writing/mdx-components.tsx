import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function H1({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "mt-10 scroll-mt-24 text-4xl font-semibold tracking-tight text-slate-900",
        className,
      )}
      {...props}
    />
  );
}

function H2({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight text-slate-900",
        className,
      )}
      {...props}
    />
  );
}

function H3({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-slate-900",
        className,
      )}
      {...props}
    />
  );
}

function Paragraph({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("mt-5 text-base leading-7 text-slate-700", className)}
      {...props}
    />
  );
}

function Anchor({ className, ...props }: ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary",
        className,
      )}
      {...props}
    />
  );
}

function UnorderedList({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "mt-5 list-disc space-y-2 pl-6 text-base leading-7 text-slate-700 marker:text-slate-400",
        className,
      )}
      {...props}
    />
  );
}

function OrderedList({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "mt-5 list-decimal space-y-2 pl-6 text-base leading-7 text-slate-700 marker:text-slate-400",
        className,
      )}
      {...props}
    />
  );
}

function ListItem({ className, ...props }: ComponentProps<"li">) {
  return <li className={cn("pl-1", className)} {...props} />;
}

function Blockquote({ className, ...props }: ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-primary/40 pl-4 text-base italic text-slate-600",
        className,
      )}
      {...props}
    />
  );
}

function InlineCode({ className, ...props }: ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.875em] text-slate-800",
        className,
      )}
      {...props}
    />
  );
}

function Pre({ className, ...props }: ComponentProps<"pre">) {
  return (
    <pre
      className={cn(
        "mt-6 overflow-x-auto rounded-md border border-slate-200 bg-slate-950 p-4 text-sm leading-6 text-slate-100",
        className,
      )}
      {...props}
    />
  );
}

function HorizontalRule({ className, ...props }: ComponentProps<"hr">) {
  return <hr className={cn("my-10 border-slate-200", className)} {...props} />;
}

export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: Paragraph,
  a: Anchor,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  code: InlineCode,
  pre: Pre,
  hr: HorizontalRule,
};
