"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent } from "react";
import { cn } from "@/lib/utils";

const gradientBySlug: Record<string, string> = {
  "fake-it-until-you-make-it": "from-[#1f2937] via-[#2f6f68] to-[#8d8879]",
  "lessons-from-building-a-complete-mlops-project":
    "from-[#244f4a] via-[#5e7f78] to-[#c8c2b3]",
  "what-reading-research-papers-is-teaching-me-about-engineering":
    "from-slate-950 via-slate-800 to-[#365f59]",
};

const fallbackGradient = "from-slate-950 via-[#244f4a] to-[#5e7f78]";

export function getWritingGradient(slug: string) {
  return gradientBySlug[slug] ?? fallbackGradient;
}

export function WritingVisual({
  slug,
  title,
  variant = "preview",
}: {
  slug: string;
  title: string;
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
        getWritingGradient(slug),
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
          slug.includes("ai") &&
            "bg-[radial-gradient(circle_at_26%_34%,rgba(255,255,255,0.35)_0_2px,transparent_3px),radial-gradient(circle_at_62%_58%,rgba(255,255,255,0.24)_0_2px,transparent_3px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:70px_70px,70px_70px,46px_46px]",
          slug.includes("research") &&
            "bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.18)_0_1px,transparent_1px_22px),repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0_1px,transparent_1px_34px)]",
          slug.includes("mlops") &&
            "bg-[linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),repeating-linear-gradient(135deg,transparent_0_16px,rgba(255,255,255,0.2)_16px_18px)] bg-[size:56px_56px,56px_56px,42px_42px]",
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
        {compact ? (
          <span className="sr-only">{title}</span>
        ) : (
          <AnimatePresence mode="wait">
            <motion.p
              key={title}
              initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 8, filter: "blur(3px)" }}
              transition={{
                duration: 0.72,
                delay: 0.58,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-md text-3xl font-semibold tracking-tight text-white"
            >
              {title}
            </motion.p>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
