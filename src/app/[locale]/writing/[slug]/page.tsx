import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations } from "next-intl/server";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { WritingArticleLayout } from "@/components/writing/writing-article-layout";
import { mdxComponents } from "@/components/writing/mdx-components";
import type { Locale } from "@/i18n/config";
import { createMetadata } from "@/lib/seo";
import { getPost, listAllPostParams } from "@/lib/mdx";

type PageParams = { locale: Locale; slug: string };

export function generateStaticParams() {
  return listAllPostParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);

  if (!post) {
    return {};
  }

  return createMetadata({
    locale,
    path: `/${locale}/writing/${slug}`,
    title: post.meta.title,
    description: post.meta.summary,
  });
}

const prettyCodeOptions: PrettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mdxOptions: any = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
};

export default async function WritingDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);

  if (!post) {
    notFound();
  }

  const t = await getTranslations("writing");
  const formattedDate = post.meta.date
    ? new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(post.meta.date))
    : null;

  const statusLabel =
    post.meta.status === "draft"
      ? t("statusDraft")
      : post.meta.status === "planned"
        ? t("statusPlanned")
        : t("statusPublished");

  return (
    <WritingArticleLayout
      backLabel={t("backHome")}
      draftBanner={t("draftBanner")}
      formattedDate={formattedDate}
      readingTime={t("readingTime", {
        minutes: post.meta.readingTimeMinutes,
      })}
      slug={slug}
      status={post.meta.status}
      statusLabel={statusLabel}
      summary={post.meta.summary}
      title={post.meta.title}
    >
      <MDXRemote
        source={post.content}
        components={mdxComponents}
        options={{ mdxOptions }}
      />
    </WritingArticleLayout>
  );
}
