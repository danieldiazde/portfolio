import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const staticRoutes = ["", "/projects", "/writing"];
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`);

  return locales.flatMap((locale) =>
    [...staticRoutes, ...projectRoutes].map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
  );
}
