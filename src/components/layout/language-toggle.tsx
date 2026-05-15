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
        "inline-flex min-w-14 translate-y-0 items-center justify-center rounded-md border border-slate-800/70 bg-slate-900/85 px-3 text-xs font-semibold text-slate-200 shadow-xl shadow-slate-950/15 ring-1 ring-white/10 backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-slate-900/95 hover:text-white",
      )}
      aria-label={`Switch language to ${target === "en" ? "English" : "Spanish"}`}
    >
      {target.toUpperCase()}
    </Link>
  );
}
