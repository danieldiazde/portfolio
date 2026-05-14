export type ResumeItem = {
  title: string;
  description: string;
  href: string;
  available: boolean;
};

export const resumes: ResumeItem[] = [
  {
    title: "Machine Learning / AI Focus",
    description:
      "Highlights machine learning projects, data science work, research interests, and deep learning foundations.",
    href: "/resumes/resume-ai-ml.pdf",
    // TODO: Add public/resumes/resume-ai-ml.pdf and switch available to true.
    available: false,
  },
  {
    title: "Data Science / Analytics Focus",
    description:
      "Highlights statistical modeling, data analysis, experimentation, visualization, and applied decision-making work.",
    href: "/resumes/resume-data-science.pdf",
    // TODO: Add public/resumes/resume-data-science.pdf and switch available to true.
    available: false,
  },
  {
    title: "Software Development Focus",
    description:
      "Highlights full-stack projects, APIs, product engineering, and software development experience.",
    href: "/resumes/resume-software.pdf",
    // TODO: Add public/resumes/resume-software.pdf and switch available to true.
    available: false,
  },
];
