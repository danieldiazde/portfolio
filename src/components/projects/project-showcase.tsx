"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

function ShowcaseVisual({ project }: { project: Project }) {
  const initials = project.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  const variants: Record<string, string> = {
    autograd: "from-slate-950 via-slate-900 to-[#244f4a]",
    pipeline: "from-slate-950 via-[#244f4a] to-slate-900",
    academic: "from-[#1f2937] via-slate-900 to-[#5e7f78]",
    recruiting: "from-slate-950 via-[#2f6f68] to-slate-900",
    pong: "from-zinc-950 via-slate-900 to-[#6f7f66]",
    finance: "from-slate-950 via-[#365f59] to-slate-900",
  };

  return (
    <div
      className={cn(
        "relative aspect-[4/5] overflow-hidden rounded-md bg-gradient-to-br",
        variants[project.image] ?? "from-slate-950 via-slate-900 to-[#244f4a]",
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 transition-transform duration-700 ease-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(94,127,120,0.34),transparent_34%),radial-gradient(circle_at_50%_95%,rgba(200,194,179,0.3),transparent_42%)]" />
      <div className="absolute inset-x-8 top-1/2 flex -translate-y-1/2 items-center justify-center">
        <div className="flex h-32 w-32 items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 text-5xl font-semibold text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-transform duration-500 ease-out group-hover:scale-105">
          {initials}
        </div>
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-2xl font-semibold tracking-tight text-white">
          {project.title}
        </p>
      </div>
    </div>
  );
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const t = useTranslations();
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = Math.max(projects.length - visibleCount, 0);
  const canScroll = projects.length > visibleCount;

  function showNextProject() {
    setActiveIndex((index) => (index >= maxIndex ? 0 : index + 1));
  }

  function showPreviousProject() {
    setActiveIndex((index) => Math.max(index - 1, 0));
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-end gap-2">
        <AnimatePresence initial={false}>
          {canScroll && activeIndex > 0 ? (
            <motion.div
              key="previous-project"
              initial={{ opacity: 0, x: 10, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.92 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={showPreviousProject}
                aria-label="Show previous project"
                className="h-10 w-10 rounded-md bg-[#e8e5dc] text-primary hover:bg-[#d7d2c6] hover:text-[#244f4a]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>
        {canScroll ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={showNextProject}
            aria-label="Show next project"
            className="h-10 w-10 rounded-md bg-[#e8e5dc] text-primary hover:bg-[#d7d2c6] hover:text-[#244f4a]"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        ) : null}
      </div>
      <div className="overflow-hidden">
        <div
          className="project-showcase-track flex gap-5 transition-transform duration-700"
          style={{ "--project-index": activeIndex } as React.CSSProperties}
        >
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group min-w-[calc(100%-0rem)] sm:min-w-[calc(50%-0.625rem)] lg:min-w-[calc((100%-3.75rem)/3.5)]"
            >
              <Link href={`/projects/${project.slug}`} className="block">
                <ShowcaseVisual project={project} />
                <p className="mt-5 text-lg font-medium leading-7 text-slate-800">
                  {project.shortDescription}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-base font-semibold text-primary transition-colors group-hover:text-slate-800">
                  {t("common.readMore")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
