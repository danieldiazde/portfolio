import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { ProjectVisual } from "./project-visual";

export async function ProjectDetail({ project }: { project: Project }) {
  const t = await getTranslations();
  const sections = [
    {
      title: "Problem",
      body: "This project is framed around a concrete technical learning or product problem. The current copy is intentionally editable and avoids claims that need external validation.",
    },
    {
      title: "Why I built it",
      body: "The goal was to build technical judgment through implementation, not only through tutorials or notebooks. This section can be expanded with Daniel's specific motivation and context.",
    },
    {
      title: "Technical decisions",
      body: "Key decisions should document tradeoffs around architecture, tooling, data flow, evaluation, and maintainability. Replace this placeholder with implementation-specific notes as the project evolves.",
    },
    {
      title: "What I learned",
      body: "Use this area to summarize the practical lessons from debugging, modeling, system design, and user-facing constraints.",
    },
  ];

  return (
    <article className="site-container py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/projects">
          <ArrowLeft className="h-4 w-4" />
          {t("common.backToProjects")}
        </Link>
      </Button>
      <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="secondary">
              {t(`projects.${project.category}`)}
            </Badge>
            <Badge variant="outline">{t(`status.${project.status}`)}</Badge>
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {project.longDescription}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="muted">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.githubUrl ? (
              <Button asChild>
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            ) : null}
            {project.liveUrl ? (
              <Button asChild variant="outline">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  {t("common.liveDemo")}
                </a>
              </Button>
            ) : null}
          </div>
        </div>
        <ProjectVisual variant={project.image} title={project.title} />
      </div>
      <Separator className="my-12" />
      <div className="grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title} className="bg-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                {section.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-6 bg-white">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold">Current status</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            This project is currently marked as{" "}
            {t(`status.${project.status}`).toLowerCase()}. The page is
            structured as an editable case study and can be expanded with
            diagrams, metrics, screenshots, and implementation notes.
          </p>
        </CardContent>
      </Card>
    </article>
  );
}
