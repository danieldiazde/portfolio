import type { Localized } from "@/lib/content";

export type ProjectCategory =
  | "ai-ml"
  | "software"
  | "data"
  | "research"
  | "hackathon"
  | "robotics";

export type ProjectStatus = "active" | "completed" | "private" | "in-progress";
export type ProjectImageLayout = "one" | "two" | "three";

export const PROJECT_PREVIEW_DESCRIPTION_MAX_LENGTH = 76;
export const PROJECT_SHORT_DESCRIPTION_MAX_LENGTH = 180;
export const PROJECT_TECH_STACK_LIMIT = 6;
export const PROJECT_DRAWER_IMAGE_LIMIT = 3;

export type ProjectImage = {
  id: string;
  label: Localized<string>;
  src?: string;
};

export type Project = {
  slug: string;
  category: ProjectCategory;
  featured: boolean;
  status: ProjectStatus;
  techStack: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  title: Localized<string>;
  previewDescription: Localized<string>;
  shortDescription: Localized<string>;
  imageLayout: ProjectImageLayout;
  images: ProjectImage[];
};

function assertLocalizedLength(
  project: Project,
  field: "previewDescription" | "shortDescription",
  maxLength: number,
) {
  for (const locale of ["en", "es"] as const) {
    const value = project[field][locale];

    if (value.length > maxLength) {
      throw new Error(
        `${project.slug}.${field}.${locale} must be ${maxLength} characters or fewer. Current length: ${value.length}.`,
      );
    }
  }
}

function defineProject(project: Project): Project {
  assertLocalizedLength(
    project,
    "previewDescription",
    PROJECT_PREVIEW_DESCRIPTION_MAX_LENGTH,
  );
  assertLocalizedLength(
    project,
    "shortDescription",
    PROJECT_SHORT_DESCRIPTION_MAX_LENGTH,
  );

  if (project.techStack.length > PROJECT_TECH_STACK_LIMIT) {
    throw new Error(
      `${project.slug}.techStack must include ${PROJECT_TECH_STACK_LIMIT} items or fewer.`,
    );
  }

  if (project.images.length > PROJECT_DRAWER_IMAGE_LIMIT) {
    throw new Error(
      `${project.slug}.images must include ${PROJECT_DRAWER_IMAGE_LIMIT} items or fewer.`,
    );
  }

  const expectedLayoutByImageCount: Record<number, ProjectImageLayout> = {
    1: "one",
    2: "two",
    3: "three",
  };
  const expectedLayout = expectedLayoutByImageCount[project.images.length];

  if (!expectedLayout || project.imageLayout !== expectedLayout) {
    throw new Error(
      `${project.slug}.imageLayout must be "${expectedLayout}" for ${project.images.length} image(s).`,
    );
  }

  return project;
}

export const projects: Project[] = [
  defineProject({
    slug: "irongrad",
    category: "ai-ml",
    featured: true,
    status: "active",
    techStack: ["Python", "C++20", "pybind11", "CMake", "uv", "pytest"],
    image: "autograd",
    githubUrl: "https://github.com/danieldiazde/irongrad",
    title: {
      en: "Irongrad",
      es: "Irongrad",
    },
    previewDescription: {
      en: "A homemade autograd framework built from first principles.",
      es: "Un framework casero de autograd construido desde primeros principios.",
    },
    shortDescription: {
      en: "A homemade autograd and deep learning framework built to understand tensor operations, reverse-mode autodiff, and neural network internals.",
      es: "Un framework casero de autograd y deep learning para entender tensores, autodiferenciación reversa e internals de redes neuronales.",
    },
    imageLayout: "three",
    images: [
      {
        id: "engine",
        label: { en: "Autograd engine", es: "Motor de autograd" },
      },
      {
        id: "tensors",
        label: { en: "Tensor operations", es: "Operaciones tensoriales" },
      },
      {
        id: "training",
        label: { en: "Training internals", es: "Internals de entrenamiento" },
      },
    ],
  }),
  defineProject({
    slug: "sap-threat-detector",
    category: "ai-ml",
    featured: true,
    status: "in-progress",
    techStack: [
      "Python",
      "Machine Learning",
      "MLOps",
      "FastAPI",
      "Docker",
      "CI/CD",
    ],
    githubUrl: "https://github.com/danieldiazde/sap-threat-detector",
    image: "pipeline",
    title: {
      en: "SAP Threat Detector",
      es: "SAP Threat Detector",
    },
    previewDescription: {
      en: "An MLOps threat detection project for security-style ML workflows.",
      es: "Un proyecto MLOps de detección de amenazas para flujos de ML en seguridad.",
    },
    shortDescription: {
      en: "An MLOps-oriented threat detection project for building, evaluating, and operationalizing security-style machine learning workflows.",
      es: "Un proyecto de detección con enfoque MLOps para construir, evaluar y operar flujos de machine learning en seguridad.",
    },
    imageLayout: "two",
    images: [
      {
        id: "pipeline",
        label: { en: "Detection pipeline", es: "Pipeline de detección" },
      },
      {
        id: "evaluation",
        label: { en: "Model evaluation", es: "Evaluación del modelo" },
      }
    ],
  }),
  defineProject({
    slug: "teccoach",
    category: "hackathon",
    featured: true,
    status: "completed",
    techStack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Gemini API",
      "Google Calendar",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/danieldiazde/gemini-hackdays",
    image: "academic",
    title: {
      en: "TecCoach",
      es: "TecCoach",
    },
    previewDescription: {
      en: "A Gemini-powered academic coach for weekly study priorities.",
      es: "Un coach académico con Gemini para prioridades semanales de estudio.",
    },
    shortDescription: {
      en: "A Gemini-powered academic coach for Tec students that turns academic context into weekly study priorities and suggested calendar blocks.",
      es: "Un coach académico para estudiantes del Tec que convierte contexto académico en prioridades semanales y bloques sugeridos de calendario.",
    },
    imageLayout: "one",
    images: [
      {
        id: "priorities",
        label: { en: "Study priorities", es: "Prioridades de estudio" },
      }
    ],
  }),
  defineProject({
    slug: "stelle",
    category: "software",
    featured: false,
    status: "private",
    techStack: ["FastAPI", "PostgreSQL", "OAuth2", "Python", "TypeScript"],
    image: "recruiting",
    title: {
      en: "Stelle",
      es: "Stelle",
    },
    previewDescription: {
      en: "A full-stack platform for recruiting prep and tech-stack learning.",
      es: "Una plataforma full-stack para recruiting y aprendizaje técnico.",
    },
    shortDescription: {
      en: "A full-stack platform helping students navigate recruiting, prepare for interviews, and learn relevant technology stacks.",
      es: "Una plataforma full-stack que ayuda a estudiantes con recruiting, entrevistas y aprendizaje de stacks tecnológicos relevantes.",
    },
    imageLayout: "two",
    images: [
      {
        id: "recruiting",
        label: { en: "Recruiting tracker", es: "Seguimiento de recruiting" },
      },
      {
        id: "interviews",
        label: { en: "Interview prep", es: "Preparación de entrevistas" },
      },
    ],
  }),
  defineProject({
    slug: "pong-rl-agent",
    category: "ai-ml",
    githubUrl : "https://github.com/danieldiazde/pong-ai",
    featured: false,
    status: "completed",
    techStack: ["Python", "Pygame", "Reinforcement Learning", "Q-learning"],
    image: "pong",
    title: {
      en: "Pong RL Agent",
      es: "Agente RL de Pong",
    },
    previewDescription: {
      en: "A Pong agent trained with a custom environment and Q-learning.",
      es: "Un agente de Pong entrenado con un entorno propio y Q-learning.",
    },
    shortDescription: {
      en: "A reinforcement learning Pong agent built with a custom Pygame environment and tabular Q-learning.",
      es: "Un agente de reinforcement learning para Pong construido con un entorno propio en Pygame y Q-learning tabular.",
    },
    imageLayout: "one",
    images: [
      {
        id: "agent",
        label: { en: "RL gameplay loop", es: "Loop de juego RL" },
      },
    ],
  }),
  defineProject({
    slug: "fledge",
    category: "software",
    featured: false,
    status: "completed",
    techStack: ["Swift", "SwiftUI", "SQLite", "Data Visualization"],
    image: "finance",
    title: {
      en: "Fledge",
      es: "Fledge",
    },
    previewDescription: {
      en: "A local finance dashboard for budgeting, tracking, and alerts.",
      es: "Un dashboard local para presupuesto, seguimiento y alertas.",
    },
    githubUrl: "https://github.com/danieldiazde/fledge",
    shortDescription: {
      en: "A local personal finance dashboard for budgeting, category tracking, and rule-based alerts.",
      es: "Un dashboard local de finanzas personales para presupuestos, seguimiento por categoría y alertas basadas en reglas.",
    },
    imageLayout: "two",
    images: [
      {
        id: "budgeting",
        label: { en: "Budget overview", es: "Vista de presupuesto" },
      },
      {
        id: "alerts",
        label: { en: "Rule-based alerts", es: "Alertas con reglas" },
      },
    ],
  }),
];


export function getShowcaseProjects() {
  return [
    ...projects.filter((project) => project.featured),
    ...projects.filter((project) => !project.featured),
  ];
}
