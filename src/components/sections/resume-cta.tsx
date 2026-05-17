import { getLocale, getTranslations } from "next-intl/server";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resumes } from "@/content/resumes";
import { getVisibleSocials } from "@/content/socials";
import type { Locale } from "@/i18n/config";
import { pick } from "@/lib/content";
import { Section } from "./section";

const resumeVisual = {
  background:
    "linear-gradient(128deg, #334155 0 24%, transparent 24% 100%), linear-gradient(35deg, #2f6f68 0 22%, transparent 22% 100%), linear-gradient(55deg, transparent 0 38%, #5e7f78 38% 58%, transparent 58% 100%), linear-gradient(120deg, transparent 0 62%, #1f2937 62% 74%, transparent 74% 100%), #f3f1ea",
  overlay:
    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.34), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.08), rgba(15,23,42,0.08))",
};

export async function ResumeCTA() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const visibleSocials = getVisibleSocials();
  const resume = resumes[0];
  const title = pick(resume.title, locale);
  const description = pick(resume.description, locale);

  return (
    <Section id="resume" className="scroll-mt-20 bg-white pb-24 pt-14">
      <div className="site-container">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl">
            {t("resume.title")}
          </h2>
        </div>

        <div className="mt-6 flex flex-wrap justify-start gap-2 sm:justify-end">
          {visibleSocials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.label === "Email" ? undefined : "_blank"}
              rel={social.label === "Email" ? undefined : "noreferrer"}
              className="group inline-flex max-w-full items-center gap-2 rounded-full border border-[#d7d2c6] bg-white/62 px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-950/[0.025] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9eb8ae] hover:bg-white/88 hover:text-[#244f4a] hover:shadow-md hover:shadow-slate-950/[0.04]"
            >
              <social.icon className="h-4 w-4 shrink-0 text-primary" />
              <span>{social.label}</span>
            </a>
          ))}
        </div>

        <article className="group relative mt-8 grid min-h-[20rem] overflow-hidden rounded-md bg-white/72 shadow-sm shadow-slate-950/[0.03] transition-all duration-300 ease-out hover:bg-white/88 hover:shadow-xl hover:shadow-slate-950/[0.07] lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)]">
          <span className="absolute inset-x-0 top-0 h-px bg-slate-400/70" />
          <span className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />

          <div className="flex flex-col justify-between gap-10 p-5 sm:p-6 lg:p-7">
            <div>
              <h3 className="text-3xl font-semibold tracking-tight text-slate-800 transition-colors group-hover:text-[#244f4a] sm:text-4xl">
                {title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                {description}
              </p>
            </div>

            <div>
              {resume.available ? (
                <Button
                  asChild
                  aria-label={t("resume.downloadAria", { title })}
                  className="hover:translate-y-0"
                >
                  <a
                    href={resume.href}
                    target={resume.external ? "_blank" : undefined}
                    rel={resume.external ? "noreferrer" : undefined}
                  >
                    <Download className="h-4 w-4" />
                    {t("common.downloadResume")}
                  </a>
                </Button>
              ) : (
                <Button disabled aria-label={t("common.unavailable")}>
                  <Download className="h-4 w-4" />
                  {t("common.unavailable")}
                </Button>
              )}
            </div>
          </div>

          <div
            className="min-h-40 overflow-hidden bg-slate-100 shadow-sm shadow-slate-950/[0.05] transition-transform duration-300 ease-out group-hover:scale-[1.01] lg:min-h-full"
            style={{ background: resumeVisual.background }}
          >
            <div
              className="h-full min-h-40 w-full lg:min-h-full"
              style={{ background: resumeVisual.overlay }}
            />
          </div>
        </article>
      </div>
    </Section>
  );
}
