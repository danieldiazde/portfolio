import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/project-detail";
import { getProject, projects } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.flatMap((project) => [
    { locale: "en", slug: project.slug },
    { locale: "es", slug: project.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return createMetadata({
    locale,
    path: `/${locale}/projects/${project.slug}`,
    title: project.title,
    description: project.shortDescription,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
