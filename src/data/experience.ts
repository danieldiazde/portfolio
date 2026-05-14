export type ExperienceKind =
  | "education"
  | "experience"
  | "hackathon"
  | "research"
  | "leadership";

export type ExperienceItem = {
  kind: ExperienceKind;
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string;
};

export const experienceItems: ExperienceItem[] = [
  {
    kind: "education",
    title: "Data Science student",
    organization: "Tecnológico de Monterrey",
    location: "Monterrey, México",
    period: "Current",
    description:
      "Focused on data science, machine learning, software engineering, and building technically ambitious projects.",
  },
  {
    kind: "experience",
    title: "Campus / internship experience",
    organization: "Editable placeholder",
    period: "Add dates",
    description:
      "Replace this with relevant internship, campus work, or technical experience when available.",
  },
  {
    kind: "hackathon",
    title: "Hackathon participation",
    organization: "Editable placeholder",
    period: "Add dates",
    description:
      "Use this section to describe sprint-based projects, product decisions, and technical outcomes.",
  },
  {
    kind: "research",
    title: "Research or academic work",
    organization: "Editable placeholder",
    period: "Add dates",
    description:
      "Add coursework, research direction, papers, labs, or academic projects related to AI, ML, and data.",
  },
  {
    kind: "leadership",
    title: "Student leadership",
    organization: "Editable placeholder",
    period: "Add dates",
    description:
      "Add student organizations, mentoring, teaching, outreach, or technical leadership experience.",
  },
];
