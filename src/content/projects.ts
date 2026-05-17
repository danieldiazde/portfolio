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
    techStack: ["Python", "C++17", "pybind11", "NumPy", "CMake", "pytest"],
    image: "autograd",
    githubUrl: "https://github.com/danieldiazde/irongrad",
    title: {
      en: "Irongrad",
      es: "Irongrad",
    },
    previewDescription: {
      en: "A from-scratch deep learning framework with reverse-mode autograd.",
      es: "Un framework de deep learning con autograd en modo reverso.",
    },
    shortDescription: {
      en: "A from-scratch deep learning framework in C++17 with reverse-mode autograd, NumPy broadcasting, and pybind11 bindings exposing Tensor, nn.Linear, MSE loss, and SGD.",
      es: "Un framework de deep learning desde cero en C++17 con autograd reverso, broadcasting NumPy y bindings pybind11 que exponen Tensor, nn.Linear, MSE y SGD.",
    },
    imageLayout: "one",
    images: [
      {
        id: "autograd-demo",
        label: { en: "Autograd demo", es: "Demo de autograd" },
        src: "/images/projects/autograd-demo.png",
      },
    ],
  }),
  defineProject({
    slug: "sap-threat-detector",
    category: "ai-ml",
    featured: true,
    status: "completed",
    techStack: [
      "scikit-learn",
      "FastAPI",
      "SAP BTP",
      "SAP HANA Cloud",
      "Streamlit",
      "Claude API",
    ],
    image: "pipeline",
    githubUrl: "https://github.com/danieldiazde/sap-threat-detector",
    title: {
      en: "SAP Threat Detector",
      es: "SAP Threat Detector",
    },
    previewDescription: {
      en: "A real-time SAP security operations center with anomaly detection.",
      es: "Un SOC en tiempo real para SAP con detección de anomalías.",
    },
    shortDescription: {
      en: "A real-time SOC with a Streamlit dashboard that scores live SAP security logs via Isolation Forest and a Claude-powered triage agent. TEC × SAP Hackathon semifinalist.",
      es: "Un SOC en tiempo real con dashboard en Streamlit que evalúa logs de SAP con Isolation Forest y un agente de Claude para triaje. Semifinalista, Hackathon TEC × SAP.",
    },
    imageLayout: "two",
    images: [
      {
        id: "architecture",
        label: { en: "Architecture Diagram", es: "Diagrama de Arquitectura" },
        src: "/images/projects/sap-architecture-diagram.png",
      },
      {
        id: "dashboard",
        label: { en: "Claude SOC dashboard", es: "Dashboard SOC de Claude" },
        src: "/images/projects/dashboard-sap-threat-detector.png",
      },
    ],
  }),
  defineProject({
    slug: "stelle",
    category: "ai-ml",
    featured: true,
    status: "in-progress",
    techStack: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "OpenAI",
      "SQLAlchemy",
      "TypeScript",
    ],
    image: "recruiting",
    title: {
      en: "Stelle",
      es: "Stelle",
    },
    previewDescription: {
      en: "An AI job application tracker with LLM-powered fit analysis.",
      es: "Un tracker de aplicaciones con análisis de fit potenciado por LLM.",
    },
    shortDescription: {
      en: "A full-stack job application tracker with an OpenAI-powered fit analyzer, async ETL across 6 sources, and a kanban pipeline with auto-generated career tasks.",
      es: "Un tracker full-stack de aplicaciones con analizador de fit con OpenAI, ETL asíncrono de 6 fuentes y un kanban con tareas auto-generadas.",
    },
    imageLayout: "two",
    images: [
      {
        id: "fit-analyzer",
        label: { en: "Job fit analyzer", es: "Analizador de compatibilidad" },
      },
      {
        id: "kanban",
        label: { en: "Application kanban", es: "Kanban de aplicaciones" },
      },
    ],
  }),
  defineProject({
    slug: "teccoach",
    category: "hackathon",
    featured: false,
    status: "completed",
    techStack: [
      "Next.js",
      "TypeScript",
      "Gemini API",
      "Google Calendar",
      "Tailwind CSS",
    ],
    liveUrl: "https://teccoach.vercel.app/dashboard?demo=1",
    githubUrl: "https://github.com/danieldiazde/gemini-hackdays",
    image: "academic",
    title: {
      en: "TecCoach",
      es: "TecCoach",
    },
    previewDescription: {
      en: "A Gemini-powered academic coach that suggests weekly study priorities.",
      es: "Un coach académico con Gemini que sugiere prioridades semanales.",
    },
    shortDescription: {
      en: "A Gemini-powered academic coach for Tec students that turns course context into weekly priorities and suggested Google Calendar study blocks.",
      es: "Un coach académico con Gemini para estudiantes del Tec que convierte el contexto de cursos en prioridades semanales y bloques de estudio en Calendar.",
    },
    imageLayout: "two",
    images: [
      {
        id: "Hackathon",
        label: { en: "Engering", es: "Entrando" },
        src: "/images/projects/teccoach-preview.png",
      },
      {
        id: "Hackathon",
        label: { en: "Preview", es: "Preview" },
        src: "/images/projects/teccoach-entering.png",
      },
    ],
  }),
  defineProject({
    slug: "pong-rl-agent",
    category: "ai-ml",
    featured: false,
    status: "completed",
    techStack: ["Python", "Pygame", "NumPy"],
    githubUrl: "https://github.com/danieldiazde/pong-ai",
    image: "pong",
    title: {
      en: "Pong RL Agent",
      es: "Agente RL de Pong",
    },
    previewDescription: {
      en: "A Pong agent trained from scratch with tabular Q-learning.",
      es: "Un agente de Pong entrenado con Q-learning tabular desde cero.",
    },
    shortDescription: {
      en: "A reinforcement learning Pong agent with a custom Gym-compatible Pygame environment (rigid-body physics) and a tabular Q-learning agent using epsilon-greedy exploration.",
      es: "Un agente de RL para Pong con un entorno Pygame compatible con Gym (física de cuerpo rígido) y un agente Q-learning tabular con exploración epsilon-greedy.",
    },
    imageLayout: "one",
    images: [
      {
        id: "agent",
        label: { en: "RL gameplay loop", es: "Loop de juego RL" },
        src: "/images/projects/pong-rl-agent.png",
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
