"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { PointerEvent } from "react";
import type { WritingItem } from "@/data/writing";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const visualStyles: Record<string, string> = {
  "building-a-tiny-autograd-engine-from-scratch":
    "from-[#244f4a] via-[#2f6f68] to-[#8d8879]",
  "gemini-powered-academic-coach": "from-[#1f2937] via-[#2f6f68] to-[#5e7f78]",
  "becoming-an-ai-engineer": "from-slate-950 via-slate-800 to-[#365f59]",
  "mlops-beyond-notebooks": "from-[#244f4a] via-[#5e7f78] to-[#c8c2b3]",
  "autograd-performance-notes": "from-[#1f2937] via-[#2f6f68] to-[#6f7f66]",
  "learning-reinforcement-learning":
    "from-[#365f59] via-slate-800 to-slate-950",
  "technical-taste-in-ai-projects": "from-slate-900 via-[#244f4a] to-[#5e7f78]",
};

const previewWidths = [
  "w-[15.5rem]",
  "w-[9.5rem]",
  "w-[4.5rem]",
  "w-[2.4rem]",
  "w-[1.45rem]",
  "w-[1.15rem]",
];

const carouselTransition = {
  type: "spring",
  stiffness: 58,
  damping: 20,
  mass: 1.18,
} as const;

function WritingVisual({
  item,
  variant = "preview",
}: {
  item: WritingItem;
  variant?: "active" | "preview" | "sliver";
}) {
  const compact = variant !== "active";
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, {
    stiffness: 90,
    damping: 24,
    mass: 0.7,
  });
  const springY = useSpring(pointerY, {
    stiffness: 90,
    damping: 24,
    mass: 0.7,
  });
  const imageX = useTransform(springX, [-1, 1], compact ? [-5, 5] : [-12, 12]);
  const imageY = useTransform(springY, [-1, 1], compact ? [-4, 4] : [-9, 9]);
  const sheenX = useTransform(
    springX,
    [-1, 1],
    compact ? [-18, 18] : [-42, 42],
  );
  const sheenY = useTransform(
    springY,
    [-1, 1],
    compact ? [-14, 14] : [-30, 30],
  );

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    pointerX.set(Math.max(-1, Math.min(1, x)));
    pointerY.set(Math.max(-1, Math.min(1, y)));
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={
        variant === "sliver"
          ? { filter: "brightness(1.08) saturate(1.08)" }
          : {
              y: -3,
              scale: compact ? 1.018 : 1.006,
              filter: "brightness(1.045) saturate(1.045)",
            }
      }
      transition={{
        type: "spring",
        stiffness: 130,
        damping: 26,
        mass: 0.8,
      }}
      className={cn(
        "relative h-full min-h-[30rem] overflow-hidden rounded-md bg-gradient-to-br shadow-[0_24px_70px_-42px_rgba(47,111,104,0.6)] will-change-transform",
        visualStyles[item.slug] ?? "from-slate-950 via-[#244f4a] to-[#5e7f78]",
      )}
    >
      <motion.div
        className="absolute inset-[-18px] bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:34px_34px] opacity-60"
        style={{ x: imageX, y: imageY }}
      />
      <motion.div
        className="absolute inset-[-22px] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.24),transparent_24%),radial-gradient(circle_at_74%_78%,rgba(200,194,179,0.26),transparent_36%)]"
        style={{ x: imageX, y: imageY }}
      />
      <motion.div
        className={cn(
          "absolute inset-[-20px] opacity-45 mix-blend-soft-light",
          item.slug.includes("autograd") &&
            "bg-[repeating-linear-gradient(112deg,transparent_0,transparent_11px,rgba(255,255,255,0.28)_12px,transparent_14px)]",
          item.slug.includes("gemini") &&
            "bg-[radial-gradient(circle_at_28%_38%,rgba(255,255,255,0.35)_0_2px,transparent_3px),radial-gradient(circle_at_60%_62%,rgba(255,255,255,0.24)_0_2px,transparent_3px)] bg-[size:72px_72px]",
          item.slug.includes("reinforcement") &&
            "bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:58px_58px]",
        )}
        style={{ x: imageX, y: imageY }}
      />
      <motion.div
        className={cn(
          "absolute -left-24 top-10 h-72 w-[42rem] rotate-[-18deg] rounded-full bg-white/10 blur-3xl",
          compact && "left-[-10rem] top-20 h-56 w-80",
        )}
        style={{ x: sheenX, y: sheenY }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          x: sheenX,
          y: sheenY,
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.16), transparent 34%)",
        }}
      />
      <div className="absolute inset-x-8 bottom-8 z-10">
        <p
          className={cn(
            "font-semibold tracking-tight text-white",
            variant === "sliver" && "sr-only",
            variant === "preview"
              ? "origin-bottom-left text-sm [writing-mode:vertical-rl]"
              : "max-w-md text-3xl",
          )}
        >
          {compact ? item.title.split(" ")[0] : item.title}
        </p>
      </div>
    </motion.div>
  );
}

export function WritingShowcase({ items }: { items: WritingItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const activeItem = items[activeIndex];
  const orderedItems = useMemo(
    () =>
      Array.from({ length: items.length }).map(
        (_, offset) => items[(activeIndex + offset) % items.length],
      ),
    [activeIndex, items],
  );
  const outgoingItem = outgoingIndex === null ? null : items[outgoingIndex];
  const visualItems =
    outgoingItem && direction === 1
      ? [
          outgoingItem,
          ...orderedItems.filter((item) => item.slug !== outgoingItem.slug),
        ]
      : orderedItems;

  useEffect(() => {
    if (outgoingIndex === null) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setOutgoingIndex(null);
    }, 880);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [outgoingIndex]);

  function goNext() {
    if (outgoingIndex !== null) {
      return;
    }

    setDirection(1);
    setOutgoingIndex(activeIndex);
    setActiveIndex((index) => (index + 1) % items.length);
  }

  function goPrevious() {
    if (outgoingIndex !== null) {
      return;
    }

    setDirection(-1);
    setOutgoingIndex(activeIndex);
    setActiveIndex((index) => (index - 1 + items.length) % items.length);
  }

  return (
    <div>
      <div className="mb-7 flex justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={goPrevious}
          aria-label="Show previous writing item"
          className="h-10 w-10 rounded-md bg-[#e8e5dc] text-primary hover:bg-[#d7d2c6] hover:text-[#244f4a]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goNext}
          aria-label="Show next writing item"
          className="h-10 w-10 rounded-md bg-[#e8e5dc] text-primary hover:bg-[#d7d2c6] hover:text-[#244f4a]"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="hidden min-h-[30rem] min-w-0 items-stretch gap-4 overflow-hidden lg:flex">
        <AnimatePresence initial={false} mode="popLayout">
          {visualItems.map((item, index) => {
            const isOutgoing =
              outgoingItem?.slug === item.slug && direction === 1;
            const isActive =
              outgoingItem && direction === 1 ? index === 1 : index === 0;
            const previewIndex =
              outgoingItem && direction === 1 ? index - 2 : index - 1;
            const isSliver = index >= 4;

            return (
              <motion.div
                key={item.slug}
                layout
                initial={false}
                animate={{
                  x: isOutgoing ? "-108%" : 0,
                  opacity: 1,
                  flexGrow: isActive ? 1 : 0,
                  flexBasis: isOutgoing
                    ? "0rem"
                    : isActive
                      ? "0rem"
                      : undefined,
                }}
                exit={{
                  x: direction === 1 ? "-108%" : "108%",
                  opacity: 1,
                  flexBasis: "0rem",
                  flexGrow: 0,
                }}
                transition={carouselTransition}
                style={{
                  originX: direction === 1 ? 0 : 1,
                }}
                className={cn(
                  "group overflow-hidden rounded-md will-change-transform",
                  isActive
                    ? "min-w-0"
                    : isOutgoing
                      ? "min-w-0 flex-1"
                      : previewWidths[Math.max(0, previewIndex)],
                )}
              >
                <Link
                  href={`/writing/${item.slug}`}
                  className="block h-full"
                  aria-label={item.title}
                  tabIndex={isOutgoing ? -1 : undefined}
                >
                  <WritingVisual
                    item={item}
                    variant={
                      isActive ? "active" : isSliver ? "sliver" : "preview"
                    }
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
              <WritingVisual item={activeItem} variant="active" />
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
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between"
          >
            <div className="max-w-4xl text-xl leading-8">
              <h3 className="inline font-semibold tracking-tight text-slate-800">
                {activeItem.title}.
              </h3>{" "}
              <p className="inline font-medium text-slate-500">
                {activeItem.description}
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link href={`/writing/${activeItem.slug}`}>
                Read more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
