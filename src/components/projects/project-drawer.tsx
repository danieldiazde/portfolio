"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Github, X } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getProjectGradient } from "@/components/projects/project-visuals";
import {
  PROJECT_TECH_STACK_LIMIT,
  type Project,
  type ProjectImage,
} from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { pick } from "@/lib/content";
import { cn } from "@/lib/utils";

const backdropMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25, ease: "easeOut" },
} as const;

const sheetMotion = {
  initial: { opacity: 0, y: "100%" },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "100%" },
  transition: { type: "spring", stiffness: 220, damping: 32, mass: 0.95 },
} as const;

const visualMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: 0.12, ease: "easeOut" },
} as const;

function getInitials(title: string) {
  return title
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2);
}

function ProjectImagePanel({
  image,
  project,
  title,
  locale,
  delay,
  className,
  featured = false,
}: {
  image: ProjectImage;
  project: Project;
  title: string;
  locale: Locale;
  delay: number;
  className?: string;
  featured?: boolean;
}) {
  const label = pick(image.label, locale);

  return (
    <motion.div
      aria-hidden="true"
      {...visualMotion}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className={cn(
        "relative min-h-[145px] overflow-hidden rounded-lg bg-gradient-to-br shadow-lg shadow-slate-950/[0.08]",
        featured ? "min-h-[300px]" : "min-h-[145px]",
        getProjectGradient(project.image),
        className,
      )}
    >
      {image.src ? (
        <Image
          src={image.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 50vw, 88vw"
          className="object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:34px_34px] opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.18),transparent_34%),radial-gradient(circle_at_72%_82%,rgba(200,194,179,0.26),transparent_42%)]" />
          {featured ? (
            <div className="absolute inset-x-8 top-1/2 flex -translate-y-1/2 justify-center">
              <div className="flex h-36 w-36 items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 text-5xl font-semibold text-white shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-sm">
                {getInitials(title)}
              </div>
            </div>
          ) : null}
        </>
      )}
      {!image.src ? (
        <div className="absolute bottom-7 left-7 right-7">
          <p className="max-w-md break-words text-2xl font-semibold tracking-tight text-white">
            {featured ? title : label}
          </p>
          {featured ? (
            <p className="mt-2 max-w-md break-words text-sm font-medium text-white/72">
              {label}
            </p>
          ) : null}
        </div>
      ) : null}
    </motion.div>
  );
}

function ProjectImageLayout({
  project,
  title,
  locale,
}: {
  project: Project;
  title: string;
  locale: Locale;
}) {
  const [firstImage, secondImage, thirdImage] = project.images;

  if (project.imageLayout === "one") {
    return (
      <div className="mt-12 min-w-0 pb-8">
        <ProjectImagePanel
          image={firstImage}
          project={project}
          title={title}
          locale={locale}
          delay={0.12}
          featured
          className="min-h-[380px]"
        />
      </div>
    );
  }

  if (project.imageLayout === "two") {
    return (
      <div className="mt-12 grid min-w-0 gap-5 pb-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <ProjectImagePanel
          image={firstImage}
          project={project}
          title={title}
          locale={locale}
          delay={0.12}
          featured
          className="min-h-[380px]"
        />
        <ProjectImagePanel
          image={secondImage}
          project={project}
          title={title}
          locale={locale}
          delay={0.18}
          className="min-h-[380px]"
        />
      </div>
    );
  }

  return (
    <div className="mt-12 grid min-w-0 gap-5 pb-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <ProjectImagePanel
        image={firstImage}
        project={project}
        title={title}
        locale={locale}
        delay={0.12}
        featured
        className="min-h-[380px]"
      />
      <div className="grid min-w-0 gap-5">
        <ProjectImagePanel
          image={secondImage}
          project={project}
          title={title}
          locale={locale}
          delay={0.18}
        />
        <ProjectImagePanel
          image={thirdImage}
          project={project}
          title={title}
          locale={locale}
          delay={0.24}
          className="bg-gradient-to-br from-[#fff5ef] via-white to-[#e4efed]"
        />
      </div>
    </div>
  );
}

export function ProjectDrawer({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("projects");
  const tCommon = useTranslations("common");
  const title = project ? pick(project.title, locale) : "";
  const shortDescription = project
    ? pick(project.shortDescription, locale)
    : "";

  useEffect(() => {
    if (!project) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <div className="fixed inset-0 z-50">
          <motion.button
            type="button"
            aria-label={tCommon("close")}
            onClick={onClose}
            {...backdropMotion}
            className="absolute inset-0 cursor-default bg-slate-950/35 backdrop-blur-[2px]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t("dialogLabel", { title })}
            {...sheetMotion}
            style={{ width: "min(88vw, 1180px)" }}
            className="absolute bottom-0 left-0 right-0 mx-auto max-h-[86vh] overflow-y-auto overflow-x-hidden rounded-t-[1.75rem] bg-white shadow-2xl shadow-slate-950/25"
          >
            <div className="relative px-6 py-10 sm:px-12 sm:py-12 lg:px-14">
              <button
                type="button"
                onClick={onClose}
                aria-label={tCommon("close")}
                className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#d7d2c6] bg-[#f3f1ea] text-[#244f4a] transition-colors duration-200 ease-out hover:bg-[#e8e5dc] hover:text-[#1b3d39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:right-7 sm:top-7"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid min-w-0 gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] xl:gap-14">
                <div className="min-w-0 pt-6 pr-12 sm:pt-8 sm:pr-16 xl:pr-0">
                  <h2 className="max-w-2xl break-words text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                    {title}
                  </h2>
                  <p className="mt-5 max-w-2xl break-words text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                    {shortDescription}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {project.githubUrl ? (
                      <Button
                        asChild
                        className="h-11 bg-[#244f4a] px-5 text-white shadow-sm shadow-slate-950/10 hover:bg-[#1b3d39]"
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Github className="h-4 w-4" />
                          {t("ctaGithub")}
                        </a>
                      </Button>
                    ) : null}
                    {project.liveUrl ? (
                      <Button asChild variant="outline" className="h-11 px-5">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t("ctaSite")}
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </div>

                <div className="min-w-0 pt-3 sm:pt-8 xl:pt-10">
                  <ul className="grid gap-3">
                    {project.techStack
                      .slice(0, PROJECT_TECH_STACK_LIMIT)
                      .map((tech) => (
                        <li
                          key={tech}
                          className="flex min-w-0 items-start gap-3 text-base font-medium leading-6 text-slate-600"
                        >
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#244f4a]/10 text-[#244f4a]">
                            <Check className="h-3.5 w-3.5" strokeWidth={2.8} />
                          </span>
                          <span className="break-words">{tech}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <ProjectImageLayout
                project={project}
                title={title}
                locale={locale}
              />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
