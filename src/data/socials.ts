import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "./site";

export type SocialLink = {
  label: "GitHub" | "LinkedIn" | "Email";
  href?: string;
  icon: typeof Github;
  visible: boolean;
};

const email = process.env.NEXT_PUBLIC_EMAIL;
const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL;
const githubUrl = `https://github.com/${site.githubUsername}`;

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: githubUrl,
    icon: Github,
    visible: true,
  },
  {
    label: "LinkedIn",
    href: linkedInUrl || undefined,
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
