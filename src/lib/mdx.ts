import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { locales, type Locale } from "@/i18n/config";

const WRITING_DIR = join(process.cwd(), "src", "content", "writing");
const WORDS_PER_MINUTE = 220;

export type PostStatus = "draft" | "planned" | "published";

export type PostMeta = {
  slug: string;
  locale: Locale;
  title: string;
  summary: string;
  date: string;
  status: PostStatus;
  tags: string[];
  readingTimeMinutes: number;
};

export type Post = {
  meta: PostMeta;
  content: string;
};

function postFilePath(slug: string, locale: Locale) {
  return join(WRITING_DIR, slug, `${locale}.mdx`);
}

function listSlugs(): string[] {
  if (!existsSync(WRITING_DIR)) {
    return [];
  }

  return readdirSync(WRITING_DIR).filter((entry) => {
    const fullPath = join(WRITING_DIR, entry);
    return statSync(fullPath).isDirectory();
  });
}

function countWords(content: string): number {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

function readingTime(content: string): number {
  return Math.max(1, Math.round(countWords(content) / WORDS_PER_MINUTE));
}

function parseStatus(value: unknown): PostStatus {
  if (value === "draft" || value === "planned" || value === "published") {
    return value;
  }
  return "draft";
}

function parseTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((tag): tag is string => typeof tag === "string");
  }
  return [];
}

function parseFrontmatter(
  slug: string,
  locale: Locale,
  raw: matter.GrayMatterFile<string>,
): PostMeta {
  const data = raw.data as Record<string, unknown>;
  const title = typeof data.title === "string" ? data.title : slug;
  const summary = typeof data.summary === "string" ? data.summary : "";
  const date =
    typeof data.date === "string"
      ? data.date
      : data.date instanceof Date
        ? data.date.toISOString()
        : "";

  return {
    slug,
    locale,
    title,
    summary,
    date,
    status: parseStatus(data.status),
    tags: parseTags(data.tags),
    readingTimeMinutes: readingTime(raw.content),
  };
}

export function postExists(slug: string, locale: Locale): boolean {
  return existsSync(postFilePath(slug, locale));
}

export function getPost(slug: string, locale: Locale): Post | null {
  const filePath = postFilePath(slug, locale);
  if (!existsSync(filePath)) {
    return null;
  }

  const source = readFileSync(filePath, "utf8");
  const parsed = matter(source);

  return {
    meta: parseFrontmatter(slug, locale, parsed),
    content: parsed.content,
  };
}

export function listPosts(locale: Locale): PostMeta[] {
  return listSlugs()
    .map((slug) => {
      const filePath = postFilePath(slug, locale);
      if (!existsSync(filePath)) {
        return null;
      }
      const source = readFileSync(filePath, "utf8");
      const parsed = matter(source);
      return parseFrontmatter(slug, locale, parsed);
    })
    .filter((meta): meta is PostMeta => meta !== null)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function listAllPostParams(): Array<{ slug: string; locale: Locale }> {
  const params: Array<{ slug: string; locale: Locale }> = [];
  for (const slug of listSlugs()) {
    for (const locale of locales) {
      if (postExists(slug, locale)) {
        params.push({ slug, locale });
      }
    }
  }
  return params;
}
