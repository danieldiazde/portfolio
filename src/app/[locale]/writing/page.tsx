import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { WritingCard } from "@/components/writing/writing-card";
import { writingItems } from "@/data/writing";
import type { Locale } from "@/i18n/config";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "writing" });
  return createMetadata({
    locale,
    path: `/${locale}/writing`,
    title: t("title"),
    description: t("description"),
  });
}

export default async function WritingPage() {
  const t = await getTranslations("writing");

  return (
    <div className="site-container py-12">
      <div className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          {t("description")}
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {writingItems.map((item) => (
          <WritingCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
