"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { getWritingGradient } from "./writing-visuals";

const entranceTransition = {
  duration: 0.78,
  ease: [0.22, 1, 0.36, 1],
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: entranceTransition,
  },
};

type WritingArticleLayoutProps = {
  backLabel: string;
  children: React.ReactNode;
  draftBanner?: string;
  formattedDate: string | null;
  readingTime: string;
  slug: string;
  status: "draft" | "planned" | "published";
  statusLabel: string;
  summary?: string;
  title: string;
};

export function WritingArticleLayout({
  backLabel,
  children,
  draftBanner,
  formattedDate,
  readingTime,
  slug,
  status,
  statusLabel,
  summary,
  title,
}: WritingArticleLayoutProps) {
  return (
    <motion.article
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="site-container py-12"
    >
      <motion.div variants={itemVariants}>
        <Button asChild variant="outline" size="sm" className="mb-7">
          <Link href="/writing">
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </Button>
      </motion.div>

      <header className="mx-auto max-w-4xl">
        <motion.div
          variants={itemVariants}
          className={cn(
            "relative mb-8 min-h-[15rem] overflow-hidden rounded-md bg-gradient-to-br shadow-2xl shadow-slate-950/[0.12]",
            getWritingGradient(slug),
          )}
        >
          <div className="absolute inset-[-20px] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-65" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_78%_80%,rgba(200,194,179,0.24),transparent_38%)]" />
          <div className="absolute -left-24 top-8 h-56 w-[38rem] rotate-[-16deg] rounded-full bg-white/10 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/28 to-transparent" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-3 text-sm text-slate-500"
        >
          {formattedDate ? <time>{formattedDate}</time> : null}
          {formattedDate ? <span aria-hidden>·</span> : null}
          <span>{readingTime}</span>
          {status !== "published" ? (
            <Badge variant="secondary">{statusLabel}</Badge>
          ) : null}
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
        >
          {title}
        </motion.h1>
        {summary ? (
          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-3xl text-lg leading-8 text-slate-600"
          >
            {summary}
          </motion.p>
        ) : null}
      </header>

      <motion.div
        variants={itemVariants}
        className="mx-auto mt-10 max-w-3xl border-t border-slate-200 pt-9"
      >
        {status === "draft" && draftBanner ? (
          <div className="mb-8 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {draftBanner}
          </div>
        ) : null}

        <div className="article-content text-slate-800">{children}</div>
      </motion.div>
    </motion.article>
  );
}
