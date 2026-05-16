import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { WritingShowcase } from "@/components/writing/writing-showcase";
import type { Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import { listPosts } from "@/lib/mdx";
import { Section } from "./section";

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

export async function WritingPreview() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("writing");
  const posts = listPosts(locale);

  if (posts.length === 0) {
    return null;
  }

  return (
    <Section
      id="writing"
      className="scroll-mt-20 bg-white pb-16 pt-14"
    >
      <div className="site-container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              {t("title")}
            </h2>
            <p className="mt-3 max-w-2xl text-2xl font-medium leading-tight text-slate-500">
              {t("subtitle")}
            </p>
          </div>
          <Button asChild className="group hover:translate-y-0">
            <Link href="/writing">
              {t("viewAll")}
              <span className="inline-flex h-4 w-4 items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-1">
                <CtaArrowIcon />
              </span>
            </Link>
          </Button>
        </div>
        <WritingShowcase items={posts} />
      </div>
    </Section>
  );
}
