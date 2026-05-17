"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import { pick } from "@/lib/content";
import { ProjectDrawer } from "./project-drawer";
import { ProjectVisual } from "./project-visuals";

function CornerBracketsIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M15 3h6v6"
        className="translate-x-[-4px] translate-y-[4px] transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
      />
      <path
        d="M9 21H3v-6"
        className="translate-x-[4px] translate-y-[-4px] transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
      />
    </svg>
  );
}

function ExpandButton({
  ariaLabel,
  onClick,
}: {
  ariaLabel: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 origin-bottom-left items-center justify-center rounded-lg border border-white/60 bg-white/95 text-[#244f4a] shadow-lg shadow-slate-950/[0.18] backdrop-blur-sm transition-all duration-300 ease-out group-hover:scale-[1.08] group-hover:border-[#244f4a] group-hover:bg-[#244f4a] group-hover:text-white group-hover:shadow-xl group-hover:shadow-slate-950/[0.22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <CornerBracketsIcon />
    </button>
  );
}

function CtaArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M15 12H5"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={1}
        className="transition-[stroke-dashoffset] duration-300 ease-out group-hover:[stroke-dashoffset:0]"
      />
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function ProjectCtaLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-0.5 text-base font-semibold text-primary transition-colors duration-300 ease-out group-hover:text-[#1b3d39]"
    >
      {label}
      <span className="inline-flex h-4 w-4 items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-1">
        <CtaArrowIcon />
      </span>
    </a>
  );
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("projects");
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [endOffset, setEndOffset] = useState(0);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const visibleCount = 3;
  const maxIndex = Math.max(projects.length - visibleCount, 0);
  const canScroll = projects.length > visibleCount;
  const isAtEnd = canScroll && activeIndex >= maxIndex;

  useEffect(() => {
    const updateEndOffset = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;

      if (!viewport || !track) {
        return;
      }

      setEndOffset(Math.max(track.scrollWidth - viewport.clientWidth, 0));
    };

    updateEndOffset();

    const resizeObserver = new ResizeObserver(updateEndOffset);
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (viewport) {
      resizeObserver.observe(viewport);
    }

    if (track) {
      resizeObserver.observe(track);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [projects.length]);

  function showNextProject() {
    setActiveIndex((index) => Math.min(index + 1, maxIndex));
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
                aria-label={t("showPrevious")}
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
            disabled={isAtEnd}
            aria-label={t("showNext")}
            className="h-10 w-10 rounded-md bg-[#e8e5dc] text-primary hover:bg-[#d7d2c6] hover:text-[#244f4a]"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        ) : null}
      </div>
      <div ref={viewportRef} className="overflow-hidden">
        <div
          ref={trackRef}
          className="project-showcase-track flex gap-5 transition-transform duration-700"
          data-align={isAtEnd ? "end" : "index"}
          style={
            {
              "--project-end-offset": `${endOffset}px`,
              "--project-index": activeIndex,
            } as React.CSSProperties
          }
        >
          {projects.map((project) => {
            const title = pick(project.title, locale);
            const previewDescription = pick(project.previewDescription, locale);

            return (
              <article
                key={project.slug}
                className="group relative min-w-[calc(100%-0rem)] sm:min-w-[calc(50%-0.625rem)] lg:min-w-[calc((100%-3.75rem)/3.5)]"
              >
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  aria-label={t("expandLabel", { title })}
                  className="block w-full rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <ProjectVisual project={project} title={title} />
                  <p className="mt-5 min-h-[84px] text-lg font-medium leading-7 text-slate-800">
                    {previewDescription}
                  </p>
                </button>
                <ExpandButton
                  ariaLabel={t("expandLabel", { title })}
                  onClick={() => setActiveProject(project)}
                />
                <div className="mt-5 flex items-center justify-start gap-3">
                  {project.githubUrl ? (
                    <ProjectCtaLink
                      href={project.githubUrl}
                      label={t("ctaGithub")}
                    />
                  ) : project.liveUrl ? (
                    <ProjectCtaLink
                      href={project.liveUrl}
                      label={t("ctaSite")}
                    />
                  ) : (
                    <span aria-hidden />
                  )}
                  {project.githubUrl && project.liveUrl ? (
                    <ProjectCtaLink
                      href={project.liveUrl}
                      label={t("ctaSite")}
                    />
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <ProjectDrawer
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}
