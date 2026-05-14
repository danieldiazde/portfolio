import { projects } from "@/data/projects";
import { ProjectShowcase } from "@/components/projects/project-showcase";
import { Section } from "./section";

export async function FeaturedProjects() {
  const showcaseProjects = [
    ...projects.filter((project) => project.featured),
    ...projects.filter((project) => !project.featured),
  ];

  return (
    <Section id="projects" className="site-container scroll-mt-20 py-20">
      <div className="mb-6 max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Projects
        </h2>
      </div>
      <ProjectShowcase projects={showcaseProjects} />
    </Section>
  );
}
