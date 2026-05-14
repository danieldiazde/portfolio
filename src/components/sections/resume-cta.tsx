import { getTranslations } from "next-intl/server";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resumes } from "@/data/resumes";
import { socials } from "@/data/socials";
import { Section } from "./section";

const resumeVisuals = [
  {
    background:
      "linear-gradient(128deg, #334155 0 24%, transparent 24% 100%), linear-gradient(35deg, #2f6f68 0 22%, transparent 22% 100%), linear-gradient(55deg, transparent 0 38%, #5e7f78 38% 58%, transparent 58% 100%), linear-gradient(120deg, transparent 0 62%, #1f2937 62% 74%, transparent 74% 100%), #f3f1ea",
    overlay:
      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.34), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.08), rgba(15,23,42,0.08))",
  },
  {
    background:
      "repeating-linear-gradient(112deg, transparent 0 34px, rgba(255,255,255,0.22) 34px 38px), radial-gradient(circle at 76% 28%, #8d8879 0 14%, transparent 14% 100%), radial-gradient(circle at 24% 72%, #2f6f68 0 24%, transparent 24% 100%), linear-gradient(42deg, #1e293b 0 36%, transparent 36% 100%), linear-gradient(132deg, transparent 0 54%, #6f7f66 54% 76%, transparent 76% 100%), #f3f1ea",
    overlay:
      "linear-gradient(90deg, rgba(15,23,42,0.1), transparent 46%, rgba(255,255,255,0.22)), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.24), transparent 38%)",
  },
  {
    background:
      "linear-gradient(90deg, transparent 0 14%, #2f6f68 14% 28%, transparent 28% 100%), linear-gradient(0deg, transparent 0 20%, #334155 20% 44%, transparent 44% 100%), linear-gradient(135deg, transparent 0 40%, #5e7f78 40% 58%, transparent 58% 100%), linear-gradient(45deg, transparent 0 60%, #111827 60% 76%, transparent 76% 100%), radial-gradient(circle at 70% 68%, #8d8879 0 14%, transparent 14% 100%), #faf9f5",
    overlay:
      "linear-gradient(135deg, rgba(255,255,255,0.28), transparent 34%, rgba(15,23,42,0.08)), radial-gradient(circle at 32% 34%, rgba(255,255,255,0.28), transparent 30%)",
  },
];

export async function ResumeCTA() {
  const t = await getTranslations();
  const visibleSocials = socials.filter(
    (social): social is typeof social & { href: string } =>
      social.visible && Boolean(social.href),
  );

  return (
    <Section id="resume" className="scroll-mt-20 bg-white pb-24 pt-14">
      <div className="site-container">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl">
            Resume
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

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {resumes.map((resume, index) => (
            <article
              key={resume.title}
              className="group relative flex min-h-[21rem] flex-col overflow-hidden rounded-md bg-white/72 p-4 shadow-sm shadow-slate-950/[0.03] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/88 hover:shadow-xl hover:shadow-slate-950/[0.07]"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-slate-400/70" />
              <span className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />

              <div className="flex flex-1 flex-col pt-2">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="max-w-[14rem] text-xl font-semibold tracking-tight text-slate-800 transition-colors group-hover:text-[#244f4a]">
                    {resume.title}
                  </h3>
                  {resume.available ? (
                    <Button
                      asChild
                      size="icon"
                      aria-label={`Download ${resume.title}`}
                    >
                      <a href={resume.href} download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button
                      size="icon"
                      disabled
                      aria-label={t("common.unavailable")}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {resume.description}
                </p>
              </div>

              <div
                className="-mx-4 -mb-4 mt-5 h-28 overflow-hidden rounded-b-md bg-slate-100 shadow-sm shadow-slate-950/[0.05] transition-transform duration-300 ease-out group-hover:scale-[1.01]"
                style={{ background: resumeVisuals[index].background }}
              >
                <div
                  className="h-full w-full"
                  style={{ background: resumeVisuals[index].overlay }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
