import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDisplayName } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function absoluteUrl(path = "") {
  return `${siteUrl}${path}`;
}

type SeoInput = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
};

export function createMetadata({
  locale,
  title,
  description,
  path,
}: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const displayName = getDisplayName(locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(path.replace(/^\/es/, "/en")),
        es: absoluteUrl(path.replace(/^\/en/, "/es")),
      },
    },
    openGraph: {
      type: "website",
      locale,
      url,
      title,
      description,
      siteName: displayName,
      images: [
        {
          url: absoluteUrl("/images/og/default-og.png"),
          width: 1200,
          height: 630,
          alt: `${displayName} portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/images/og/default-og.png")],
    },
  };
}
