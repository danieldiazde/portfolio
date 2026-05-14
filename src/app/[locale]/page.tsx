import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { HeroSection } from "@/components/sections/hero-section";
import { ResumeCTA } from "@/components/sections/resume-cta";
import { WritingPreview } from "@/components/sections/writing-preview";
import { createMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/config";
import { site } from "@/data/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata({
    locale,
    path: `/${locale}`,
    title: site.title[locale],
    description:
      "Portfolio of Daniel Diaz de Leon Morales, a Data Science student at Tecnológico de Monterrey building AI systems, developer tools, and technically ambitious software projects.",
  });
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExperienceTimeline />
      <FeaturedProjects />
      <WritingPreview />
      <ResumeCTA />
    </>
  );
}
