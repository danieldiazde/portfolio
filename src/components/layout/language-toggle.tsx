"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const target = locale === "en" ? "es" : "en";

  return (
    <Link
      href={pathname}
      locale={target}
      className={cn(
        "inline-flex translate-y-0 rounded-md border border-slate-200/80 bg-white/50 px-2.5 py-1.5 text-xs font-medium text-slate-500 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:text-slate-800",
      )}
    >
      {target.toUpperCase()}
    </Link>
  );
}
