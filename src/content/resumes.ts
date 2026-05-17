import type { Localized } from "@/lib/content";

export type ResumeItem = {
  href: string;
  external: boolean;
  available: boolean;
  title: Localized<string>;
  description: Localized<string>;
};

const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL;

export const resumes: ResumeItem[] = [
  {
    href: resumeUrl ?? "/resumes/resume.pdf",
    external: Boolean(resumeUrl),
    available: Boolean(resumeUrl),
    title: {
      en: "Resume",
      es: "CV",
    },
    description: {
      en: "Important info",
      es: "Información importante",
    },
  },
];
