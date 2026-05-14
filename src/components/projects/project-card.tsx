"use client";

import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations();

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.22, ease: "easeOut" }}>
      <Card className="group h-full overflow-hidden border-slate-200 bg-white transition-all duration-300 ease-out hover:border-slate-300 hover:shadow-soft">
        <ProjectVisual variant={project.image} title={project.title} />
        <CardContent className="flex h-full flex-col p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="secondary">{t(`projects.${project.category}`)}</Badge>
            <Badge variant="outline">{t(`status.${project.status}`)}</Badge>
          </div>
          <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
            {project.shortDescription}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="muted">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link href={`/projects/${project.slug}`}>{t("common.readMore")}</Link>
            </Button>
            {project.githubUrl ? (
              <Button asChild variant="outline" size="sm">
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            ) : null}
            {project.liveUrl ? (
              <Button asChild variant="outline" size="sm">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  {t("common.liveDemo")}
                </a>
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
