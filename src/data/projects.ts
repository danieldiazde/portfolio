export type ProjectCategory =
  | "ai-ml"
  | "software"
  | "data"
  | "research"
  | "hackathon"
  | "robotics";

export type ProjectStatus = "active" | "completed" | "private" | "in-progress";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  featured: boolean;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudyAvailable: boolean;
  status: ProjectStatus;
};

export const projects: Project[] = [
  {
    title: "Irongrad",
    slug: "irongrad",
    category: "ai-ml",
    featured: true,
    status: "active",
    shortDescription:
      "A homemade autograd and deep learning framework built to understand tensor operations, reverse-mode autodiff, and neural network internals from first principles.",
    longDescription:
      "Irongrad is a personal framework project focused on building a small but increasingly capable deep learning system. The project explores tensors, vectorized operations, broadcasting, reductions, reverse-mode autodiff, and the boundary between Python ergonomics and C++ performance.",
    techStack: ["Python", "C++20", "pybind11", "CMake", "uv", "pytest"],
    githubUrl: "https://github.com/danieldiazde/irongrad",
    image: "autograd",
    caseStudyAvailable: true,
  },
  {
    title: "SAP Threat Detector",
    slug: "sap-threat-detector",
    category: "ai-ml",
    featured: true,
    status: "in-progress",
    shortDescription:
      "An MLOps-oriented threat detection project focused on building, evaluating, and operationalizing machine learning for security-style detection workflows.",
    longDescription:
      "SAP Threat Detector explores how machine learning systems can be structured beyond notebooks, with attention to pipelines, model evaluation, reproducibility, and deployment-oriented thinking.",
    techStack: ["Python", "Machine Learning", "MLOps", "FastAPI", "Docker", "CI/CD"],
    image: "pipeline",
    caseStudyAvailable: true,
  },
  {
    title: "TecCoach",
    slug: "teccoach",
    category: "hackathon",
    featured: true,
    status: "completed",
    shortDescription:
      "A Gemini-powered academic coach for Tec students that turns academic context into weekly study priorities and suggested calendar blocks.",
    longDescription:
      "TecCoach was built during a hackathon sprint to help students decide what to prioritize each week. It connects academic context such as semester, classes, deadlines, study plans, and calendar availability to generate study recommendations. Calendar events are not created automatically; the student reviews and approves suggestions first.",
    techStack: ["Next.js", "TypeScript", "FastAPI", "Gemini API", "Google Calendar", "Tailwind CSS"],
    image: "academic",
    caseStudyAvailable: true,
  },
  {
    title: "Stelle",
    slug: "stelle",
    category: "software",
    featured: false,
    status: "private",
    shortDescription:
      "A full-stack platform helping students navigate recruiting, prepare for interviews, and learn relevant technology stacks.",
    longDescription:
      "STEL is a private full-stack product project focused on recruiting preparation, interview learning, and technical growth. The project emphasizes backend architecture, evolving product requirements, API design, and long-term maintainability.",
    techStack: ["FastAPI", "PostgreSQL", "OAuth2", "Python", "TypeScript"],
    image: "recruiting",
    caseStudyAvailable: true,
  },
  {
    title: "Pong RL Agent",
    slug: "pong-rl-agent",
    category: "ai-ml",
    featured: false,
    status: "completed",
    shortDescription:
      "A reinforcement learning Pong agent built with a custom Pygame environment and tabular Q-learning.",
    longDescription:
      "This project implements a custom game environment with physics and a Gym-like API, then trains an agent using tabular Q-learning and epsilon-greedy exploration. It focuses on understanding reinforcement learning fundamentals without relying on high-level ML libraries.",
    techStack: ["Python", "Pygame", "Reinforcement Learning", "Q-learning"],
    image: "pong",
    caseStudyAvailable: true,
  },
  {
    title: "Finance Dashboard",
    slug: "finance-dashboard",
    category: "data",
    featured: false,
    status: "completed",
    shortDescription:
      "A local personal finance dashboard for budgeting, category tracking, and rule-based alerts.",
    longDescription:
      "A Streamlit and SQLite dashboard built to practice full-stack-style thinking through local data persistence, budget categories, monthly planning, and configurable alerts.",
    techStack: ["Python", "Streamlit", "SQLite", "Data Visualization"],
    image: "finance",
    caseStudyAvailable: true,
  },
];

export const projectCategories: ProjectCategory[] = [
  "ai-ml",
  "software",
  "data",
  "research",
  "hackathon",
  "robotics",
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
