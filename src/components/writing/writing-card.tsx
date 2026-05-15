import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { PostMeta } from "@/lib/mdx";

export function WritingCard({ item }: { item: PostMeta }) {
  const t = useTranslations("writing");
  const statusLabel =
    item.status === "draft"
      ? t("statusDraft")
      : item.status === "planned"
        ? t("statusPlanned")
        : t("statusPublished");

  return (
    <Link
      href={`/writing/${item.slug}`}
      className="group block focus-visible:outline-none"
    >
      <Card className="bg-white transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-slate-300 group-hover:shadow-soft group-focus-visible:ring-2 group-focus-visible:ring-primary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
            <Badge variant="secondary">{statusLabel}</Badge>
            <span>
              {t("readingTime", { minutes: item.readingTimeMinutes })}
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold tracking-tight transition-colors group-hover:text-[#244f4a]">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {item.summary}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
