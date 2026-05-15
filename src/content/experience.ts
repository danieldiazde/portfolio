import type { Localized } from "@/lib/content";

export type ExperienceItem = {
  period: Localized<string>;
  title: Localized<string>;
  organization: Localized<string>;
  description: Localized<string>;
};

export const experienceItems: ExperienceItem[] = [
  {
    period: {
      en: "Current",
      es: "Actual",
    },
    title: {
      en: "Data Science and Mathematics student",
      es: "Estudiante de Ciencia de Datos y Matemáticas",
    },
    organization: {
      en: "Tecnológico de Monterrey",
      es: "Tecnológico de Monterrey",
    },
    description: {
      en: "Focused on data science, machine learning, software engineering, and building technically ambitious projects.",
      es: "Enfocado en ciencia de datos, machine learning, ingeniería de software y la construcción de proyectos técnicamente ambiciosos.",
    },
  },
  {
    period: {
      en: "May 2026 - Current",
      es: "Mayo 2026 - Actual",
    },
    title: {
      en: "Technology Coordinator",
      es: "Coordinador de Tecnología",
    },
    organization: {
      en: "TEC Association for Computing Machinery (ACM)",
      es: "TEC Association for Computing Machinery (ACM)",
    },
    description: {
      en: "Replace this with relevant internship, campus work, or technical experience when available.",
      es: "Reemplaza esto con prácticas, trabajo en campus o experiencia técnica relevante cuando esté disponible.",
    },
  },
  {
    period: {
      en: "February 2026 - Current",
      es: "Febrero 2026 - Actual",
    },
    title: {
      en: "Competitive Programming Member",
      es: "Miembro de equipo de programación competitiva",
    },
    organization: {
      en: "TEC - RamCPP",
      es: "TEC - RamCPP",
    },
    description: {
      en: "Use this section to describe sprint-based projects, product decisions, and technical outcomes.",
      es: "Usa esta sección para describir proyectos sprint, decisiones de producto y resultados técnicos.",
    },
  },
  {
    period: {
      en: "February 2026 - Current",
      es: "Febrero 2026 - Actual",
    },
    title: {
      en: "Academic Mentor of Excellence",
      es: "Mentor académico de excelencia",
    },
    organization: {
      en: "MAE",
      es: "MAE",
    },
    description: {
      en: "Add coursework, research direction, papers, labs, or academic projects related to AI, ML, and data.",
      es: "Agrega cursos, dirección de investigación, papers, laboratorios o proyectos académicos relacionados con IA, ML y datos.",
    },
  },
  {
    period: {
      en: "2017 - 2025",
      es: "2017 - 2025",
    },
    title: {
      en: "Mathematics Olympiad Competitor",
      es: "Competidor en Olimpiadas de Matemáticas",
    },
    organization: {
      en: "ONMAPS, OMMEB, Frederich Gauss, Alexander Groetendick",
      es: "ONMAPS, OMMEB, Frederich Gauss, Alexander Groetendick",
    },
    description: {
      en: "Add student organizations, mentoring, teaching, outreach, or technical leadership experience.",
      es: "Agrega organizaciones estudiantiles, mentoría, docencia, divulgación o experiencia de liderazgo técnico.",
    },
  },
];
