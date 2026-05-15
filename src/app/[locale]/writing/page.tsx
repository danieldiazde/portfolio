import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { WritingPageContent } from "@/components/writing/writing-page-content";
import type { Locale } from "@/i18n/config";
import { listPosts } from "@/lib/mdx";
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

export default async function WritingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("writing");
  const posts = listPosts(locale);

  return (
    <WritingPageContent
      backHome={t("backHome")}
      description={t("description")}
      empty={t("empty")}
      posts={posts}
      title={t("title")}
    />
  );
}
