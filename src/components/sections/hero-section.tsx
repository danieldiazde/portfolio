"use client";

import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { getDisplayName, site } from "@/data/site";
import { socials } from "@/data/socials";

export function HeroSection() {
  const locale = useLocale() as "en" | "es";
  const displayName = getDisplayName(locale);
  const github = socials.find(
    (social) => social.label === "GitHub" && social.href,
  );
  const linkedIn = socials.find(
    (social) => social.label === "LinkedIn" && social.href,
  );

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#e4e0d6]" />

      <div className="site-container relative min-h-[calc(100vh-3.5rem)] py-16 sm:py-20 lg:py-24">
        <div className="grid min-h-[calc(100vh-11rem)] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-xl rounded-md bg-white/92 p-6 shadow-2xl shadow-slate-950/[0.08] ring-1 ring-[#e4e0d6]/90 backdrop-blur sm:p-8 lg:-mr-24">
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-800 sm:text-6xl">
                Hi, I&apos;m <span className="text-[#2f6f68]">Daniel</span>.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
                I&apos;m a data science student building AI systems, developer
                tools, and polished software products.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {linkedIn?.href ? (
                  <Button asChild size="lg">
                    <a href={linkedIn.href} target="_blank" rel="noreferrer">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                ) : null}
                {github?.href ? (
                  <Button asChild variant="outline" size="lg">
                    <a href={github.href} target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            className="relative order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <div className="relative w-full max-w-2xl overflow-hidden rounded-md bg-[#f3f1ea] shadow-2xl shadow-slate-950/[0.1] ring-1 ring-[#e4e0d6]">
              <div className="absolute inset-0 bg-[linear-gradient(128deg,#e8e5dc_0_24%,transparent_24%_100%),linear-gradient(34deg,#2f6f68_0_22%,transparent_22%_100%),linear-gradient(57deg,transparent_0_35%,#5e7f78_35%_54%,transparent_54%_100%),linear-gradient(114deg,transparent_0_57%,#1f2937_57%_70%,transparent_70%_100%),linear-gradient(78deg,transparent_0_68%,#c8c2b3_68%_81%,transparent_81%_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_47%,rgba(255,255,255,0.52),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.16),rgba(15,23,42,0.07))]" />
              <div className="relative flex min-h-[24rem] items-center justify-center p-8 sm:min-h-[28rem] lg:min-h-[34rem]">
                <div className="absolute left-[18%] top-[18%] h-24 w-24 rounded-full bg-white/70" />
                <div className="absolute bottom-[16%] right-[18%] h-20 w-20 rounded-full bg-[#6f7f66]/75" />
                <div className="relative h-52 w-40 overflow-hidden rounded-md border border-white/75 bg-slate-100 shadow-2xl shadow-slate-950/[0.18] sm:h-64 sm:w-48">
                  {site.profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={site.profileImage}
                      alt={`Portrait of ${displayName}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl font-semibold text-[#2f6f68]">
                      DD
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
