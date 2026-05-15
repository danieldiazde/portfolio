import { getTranslations } from "next-intl/server";
import { ProjectShowcase } from "@/components/projects/project-showcase";
import { getShowcaseProjects } from "@/content/projects";
import { Section } from "./section";

export async function FeaturedProjects() {
  const t = await getTranslations("projects");

  return (
    <Section id="projects" className="site-container scroll-mt-20 pb-20 pt-14">
      <div className="mb-6 max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
      </div>
      <ProjectShowcase projects={getShowcaseProjects()} />
    </Section>
  );
}
