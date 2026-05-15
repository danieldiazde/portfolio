export const homeSections = [
  "experience",
  "projects",
  "writing",
  "resume",
] as const;

export type HomeSection = (typeof homeSections)[number];

export const primaryNavItems = homeSections.map((section) => ({
  href: `/#${section}`,
  key: section,
}));
