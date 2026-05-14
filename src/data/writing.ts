export type WritingItem = {
  slug: string;
  title: string;
  description: string;
  status: "draft" | "planned";
};

export const writingItems: WritingItem[] = [
  {
    slug: "building-a-tiny-autograd-engine-from-scratch",
    title: "Building a tiny autograd engine from scratch",
    description:
      "Notes on tensors, computation graphs, gradients, and the design decisions behind a small learning framework.",
    status: "planned",
  },
  {
    slug: "gemini-powered-academic-coach",
    title: "What I learned building a Gemini-powered academic coach",
    description:
      "A future write-up on turning academic context into useful study recommendations during a hackathon sprint.",
    status: "planned",
  },
  {
    slug: "becoming-an-ai-engineer",
    title: "How I think about becoming an AI engineer",
    description:
      "A working reflection on fundamentals, systems thinking, research taste, and building from scratch.",
    status: "draft",
  },
  {
    slug: "mlops-beyond-notebooks",
    title: "MLOps beyond notebooks",
    description:
      "Planned notes on reproducible pipelines, model evaluation, and turning ML experiments into reliable systems.",
    status: "planned",
  },
  {
    slug: "autograd-performance-notes",
    title: "Autograd performance notes",
    description:
      "Draft ideas on where Python ergonomics stop being enough and where lower-level tensor kernels start to matter.",
    status: "planned",
  },
  {
    slug: "learning-reinforcement-learning",
    title: "Learning reinforcement learning by building Pong",
    description:
      "A future reflection on environments, rewards, exploration, and the value of implementing a small RL loop directly.",
    status: "planned",
  },
  {
    slug: "technical-taste-in-ai-projects",
    title: "Technical taste in AI projects",
    description:
      "Working notes on choosing projects that build real engineering judgment instead of only producing demos.",
    status: "draft",
  },
];
