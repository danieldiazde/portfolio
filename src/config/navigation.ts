export const homeSections = ["experience", "projects", "writing"] as const;

export type HomeSection = (typeof homeSections)[number];

export const primaryNavItems = homeSections.map((section) => ({
  href: `/#${section}`,
  key: section,
}));
