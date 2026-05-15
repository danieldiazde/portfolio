import type { Localized } from "@/lib/content";

export type ResumeItem = {
  href: string;
  available: boolean;
  title: Localized<string>;
  description: Localized<string>;
};

export const resumes: ResumeItem[] = [
  {
    href: "/resumes/resume-ai-ml.pdf",
    // TODO: Add public/resumes/resume-ai-ml.pdf and switch available to true.
    available: false,
    title: {
      en: "Machine Learning / AI Focus",
      es: "Enfoque en Machine Learning / IA",
    },
    description: {
      en: "Highlights machine learning projects, data science work, research interests, and deep learning foundations.",
      es: "Destaca proyectos de machine learning, trabajo en ciencia de datos, intereses de investigación y fundamentos de deep learning.",
    },
  },
  {
    href: "/resumes/resume-data-science.pdf",
    // TODO: Add public/resumes/resume-data-science.pdf and switch available to true.
    available: false,
    title: {
      en: "Data Science / Analytics Focus",
      es: "Enfoque en Ciencia de Datos / Analítica",
    },
    description: {
      en: "Highlights statistical modeling, data analysis, experimentation, visualization, and applied decision-making work.",
      es: "Destaca modelado estadístico, análisis de datos, experimentación, visualización y trabajo aplicado a la toma de decisiones.",
    },
  },
  {
    href: "/resumes/resume-software.pdf",
    // TODO: Add public/resumes/resume-software.pdf and switch available to true.
    available: false,
    title: {
      en: "Software Development Focus",
      es: "Enfoque en Desarrollo de Software",
    },
    description: {
      en: "Highlights full-stack projects, APIs, product engineering, and software development experience.",
      es: "Destaca proyectos full-stack, APIs, ingeniería de producto y experiencia en desarrollo de software.",
    },
  },
];
