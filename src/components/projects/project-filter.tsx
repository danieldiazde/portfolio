"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { projectCategories, type Project, type ProjectCategory } from "@/data/projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectGrid } from "./project-grid";

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const t = useTranslations("projects");
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const filtered = useMemo(
    () =>
      category === "all"
        ? projects
        : projects.filter((project) => project.category === category),
    [category, projects],
  );

  return (
    <Tabs value={category} onValueChange={(value) => setCategory(value as ProjectCategory | "all")}>
      <TabsList>
        <TabsTrigger value="all">{t("all")}</TabsTrigger>
        {projectCategories.map((item) => (
          <TabsTrigger key={item} value={item}>
            {t(item)}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={category}>
        <ProjectGrid projects={filtered} />
      </TabsContent>
    </Tabs>
  );
}
