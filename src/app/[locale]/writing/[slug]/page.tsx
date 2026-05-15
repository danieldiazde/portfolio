import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations } from "next-intl/server";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mdxComponents } from "@/components/writing/mdx-components";
import type { Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
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
    <article className="site-container max-w-3xl py-12">
      <Button asChild variant="outline" size="sm" className="mb-6">
        <Link href="/writing">
          <ArrowLeft className="h-4 w-4" />
          {t("backHome")}
        </Link>
      </Button>

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          {formattedDate ? <time>{formattedDate}</time> : null}
          {formattedDate ? <span aria-hidden>·</span> : null}
          <span>
            {t("readingTime", { minutes: post.meta.readingTimeMinutes })}
          </span>
          {post.meta.status !== "published" ? (
            <Badge variant="secondary">{statusLabel}</Badge>
          ) : null}
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {post.meta.title}
        </h1>
        {post.meta.summary ? (
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {post.meta.summary}
          </p>
        ) : null}
      </header>

      {post.meta.status === "draft" ? (
        <div className="mb-8 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {t("draftBanner")}
        </div>
      ) : null}

      <div className="text-slate-800">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions }}
        />
      </div>
    </article>
  );
}
