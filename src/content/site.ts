export const site = {
  name: {
    en: "Daniel Diaz de Leon Morales",
    es: "Daniel Díaz de León Morales",
  },
  location: "Monterrey, México",
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "danieldiazde",
  title: {
    en: "Daniel Diaz de Leon Morales | AI/ML Builder & Data Science Student",
    es: "Daniel Díaz de León Morales | AI/ML Builder & Data Science Student",
  },
  description:
    "Portfolio of Daniel Diaz de Leon Morales, a Data Science and Math student at Tecnológico de Monterrey building AI systems, developer tools, and technically ambitious software projects.",
};

export function getDisplayName(locale: "en" | "es") {
  return site.name[locale];
}
