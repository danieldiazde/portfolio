import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { listPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const staticRoutes = ["", "/writing"];

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
  );

  const postEntries = locales.flatMap((locale) =>
    listPosts(locale).map((post) => ({
      url: `${siteUrl}/${locale}/writing/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...staticEntries, ...postEntries];
}
