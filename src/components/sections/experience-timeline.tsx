"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { experienceItems } from "@/data/experience";

export function ExperienceTimeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 62%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 74,
    damping: 24,
    mass: 0.55,
  });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden py-14 text-slate-800"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.028)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)]" />

      <div className="site-container relative">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Experience
          </h2>
        </div>

        <div className="relative">
          <div className="absolute bottom-8 left-4 top-6 hidden w-px origin-top -skew-y-12 bg-[#d7d2c6] md:block" />
          <motion.div
            className="absolute bottom-8 left-4 top-6 hidden w-px origin-top -skew-y-12 bg-primary md:block"
            style={{ scaleY }}
          />

          <div className="space-y-4 md:space-y-5">
            {experienceItems.map((item, index) => (
              <motion.article
                key={`${item.kind}-${item.title}`}
                initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-14% 0px -14% 0px" }}
                transition={{
                  duration: 0.44,
                  delay: Math.min(index * 0.05, 0.2),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative md:pl-12"
              >
                <div className="absolute left-[0.8rem] top-7 z-10 hidden h-3 w-3 rounded-full border border-primary bg-[#faf9f5] shadow-[0_0_0_6px_rgba(250,249,245,0.9)] md:block" />

                <div className="relative overflow-hidden rounded-md border border-[#e4e0d6] bg-white/78 p-4 pr-24 shadow-sm shadow-slate-950/[0.035] backdrop-blur transition-all duration-300 ease-out group-hover:border-[#9eb8ae] group-hover:bg-white/90 group-hover:shadow-lg group-hover:shadow-slate-950/[0.06] md:pr-28">
                  <span className="absolute inset-y-0 left-0 w-1 origin-center scale-y-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-y-100" />
                  <span className="absolute right-4 top-4 text-xs font-medium text-slate-500 transition-colors duration-300 ease-out group-hover:text-slate-700">
                    {item.period}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-[#244f4a]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-primary">
                    {item.organization}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
