"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { WritingVisual } from "@/components/writing/writing-visuals";
import { Link } from "@/i18n/navigation";
import type { PostMeta } from "@/lib/mdx";
import { cn } from "@/lib/utils";

const previewWidths = [
  "w-[14rem]",
  "w-[10rem]",
  "w-[7rem]",
];

const carouselTransition = {
  type: "spring",
  stiffness: 96,
  damping: 24,
  mass: 0.82,
} as const;

export function WritingShowcase({ items }: { items: PostMeta[] }) {
  const t = useTranslations("writing");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const orderedItems = useMemo(
    () =>
      items.length === 0
        ? []
        : Array.from({ length: items.length }).map(
            (_, offset) => items[(activeIndex + offset) % items.length],
          ),
    [activeIndex, items],
  );

  if (items.length === 0) {
    return <p className="text-base text-slate-500">{t("empty")}</p>;
  }

  const activeItem = items[activeIndex];
  const visualItems = orderedItems.slice(0, Math.min(items.length, 4));

  function goNext() {
    setDirection(1);
    setActiveIndex((index) => (index + 1) % items.length);
  }

  function goPrevious() {
    setDirection(-1);
    setActiveIndex((index) => (index - 1 + items.length) % items.length);
  }

  return (
    <div>
      <div className="mb-7 flex justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={goPrevious}
          aria-label={t("showPrevious")}
          className="h-10 w-10 rounded-md bg-[#e8e5dc] text-primary hover:bg-[#d7d2c6] hover:text-[#244f4a]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goNext}
          aria-label={t("showNext")}
          className="h-10 w-10 rounded-md bg-[#e8e5dc] text-primary hover:bg-[#d7d2c6] hover:text-[#244f4a]"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="hidden min-h-[30rem] min-w-0 items-stretch gap-4 overflow-hidden lg:flex">
        <AnimatePresence initial={false}>
          {visualItems.map((item, index) => {
            const isActive = index === 0;
            const previewIndex = index - 1;

            return (
              <motion.div
                key={item.slug}
                layout
                initial={{ opacity: 0, x: direction * 34, scale: 0.985 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: direction * -34,
                  scale: 0.985,
                }}
                transition={carouselTransition}
                className={cn(
                  "group shrink-0 overflow-hidden rounded-md will-change-transform",
                  isActive
                    ? "min-w-0 flex-1"
                    : previewWidths[Math.max(0, previewIndex)],
                )}
              >
                <Link
                  href={`/writing/${item.slug}`}
                  className="block h-full"
                  aria-label={item.title}
                >
                  <WritingVisual
                    slug={item.slug}
                    title={item.title}
                    variant={isActive ? "active" : "preview"}
                  />
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="min-h-[30rem] lg:hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={activeItem.slug}
            initial={{ opacity: 0, x: direction * 80, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -80, scale: 0.985 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <Link
              href={`/writing/${activeItem.slug}`}
              className="group block h-full"
              aria-label={activeItem.title}
            >
              <WritingVisual
                slug={activeItem.slug}
                title={activeItem.title}
                variant="active"
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative mt-7 min-h-[8rem] overflow-hidden border-t border-slate-200 pt-6">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeItem.slug}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={{ duration: 0.60, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between"
          >
            <div className="max-w-4xl text-xl leading-8">
              <h3 className="inline font-semibold tracking-tight text-slate-800">
                {activeItem.title}.
              </h3>{" "}
              <p className="inline font-medium text-slate-500">
                {activeItem.summary}
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link href={`/writing/${activeItem.slug}`}>
                {t("view")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
