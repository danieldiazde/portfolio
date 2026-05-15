import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { WritingShowcase } from "@/components/writing/writing-showcase";
import type { Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import { listPosts } from "@/lib/mdx";
import { Section } from "./section";

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
          <Button asChild variant="outline">
            <Link href="/writing">{t("view")}</Link>
          </Button>
        </div>
        <WritingShowcase items={posts} />
      </div>
    </Section>
  );
}
