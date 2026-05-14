import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { writingItems } from "@/data/writing";
import type { Locale } from "@/i18n/config";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return writingItems.flatMap((item) => [
    { locale: "en", slug: item.slug },
    { locale: "es", slug: item.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = writingItems.find((post) => post.slug === slug);

  if (!item) {
    return {};
  }

  return createMetadata({
    locale,
    path: `/${locale}/writing/${item.slug}`,
    title: item.title,
    description: item.description,
  });
}

export default async function WritingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = writingItems.find((post) => post.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <article className="container max-w-3xl py-12">
      <Badge variant="secondary">{item.status === "draft" ? "Draft" : "Coming soon"}</Badge>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
        {item.title}
      </h1>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">{item.description}</p>
      <div className="mt-10 rounded-md border bg-white p-6">
        <p className="leading-7 text-muted-foreground">
          This writing page is intentionally prepared for future MDX content. It is not presented
          as a published article yet.
        </p>
      </div>
    </article>
  );
}
