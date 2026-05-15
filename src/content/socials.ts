import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "./site";

export type SocialLink = {
  label: "GitHub" | "LinkedIn" | "Email";
  href?: string;
  icon: typeof Github;
  visible: boolean;
};

export type VisibleSocialLink = SocialLink & { href: string };

const email = process.env.NEXT_PUBLIC_EMAIL;
const linkedInUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ||
  "https://www.linkedin.com/in/danieldiazdeleonmorales/";
const githubUrl = `https://github.com/${site.githubUsername}`;

function toAbsoluteUrl(href: string | undefined) {
  if (!href) {
    return undefined;
  }

  if (/^https?:\/\//i.test(href) || href.startsWith("mailto:")) {
    return href;
  }

  return `https://${href}`;
}

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: githubUrl,
    icon: Github,
    visible: true,
  },
  {
    label: "LinkedIn",
    href: toAbsoluteUrl(linkedInUrl),
    icon: Linkedin,
    visible: Boolean(linkedInUrl),
  },
  {
    label: "Email",
    href: email ? `mailto:${email}` : undefined,
    icon: Mail,
    visible: Boolean(email),
  },
];

export function getVisibleSocials(): VisibleSocialLink[] {
  return socials.filter(
    (social): social is VisibleSocialLink =>
      social.visible && Boolean(social.href),
  );
}

export function getSocial(label: SocialLink["label"]) {
  return getVisibleSocials().find((social) => social.label === label);
}
