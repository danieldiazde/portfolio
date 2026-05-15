"use client";

import { useTranslations } from "next-intl";
import { primaryNavItems } from "@/config/navigation";
import { useActiveHomeSection } from "@/hooks/use-active-home-section";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const t = useTranslations("nav");
  const { isActiveSection, pathname, setActiveHash } = useActiveHomeSection();

  function handleHomeClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    window.history.pushState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
    setActiveHash("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header className="sticky top-4 z-40">
      <div className="site-container grid min-h-14 grid-cols-[auto_1fr_auto] items-stretch gap-1">
        <Link
          href="/"
          onClick={handleHomeClick}
          className="inline-flex flex-col justify-center rounded-md border border-slate-800/70 bg-slate-900/85 px-3 text-sm font-semibold leading-none text-white shadow-xl shadow-slate-950/15 ring-1 ring-white/10 backdrop-blur-md transition hover:bg-slate-900/95"
        >
          <span>Daniel</span>
          <span>Portfolio</span>
        </Link>
        <nav
          className="hidden items-center justify-center gap-8 rounded-md border border-slate-800/70 bg-slate-900/85 px-8 shadow-xl shadow-slate-950/15 ring-1 ring-white/10 backdrop-blur-md lg:flex"
          aria-label="Primary"
        >
          {primaryNavItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "relative px-1 py-4 text-sm font-medium text-slate-300 transition hover:text-white",
                isActiveSection(item.key) && "text-white",
              )}
            >
              {t(item.key)}
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white transition-transform duration-200 ease-out",
                  isActiveSection(item.key) && "scale-x-100",
                )}
              />
            </Link>
          ))}
        </nav>
        <div className="hidden items-stretch lg:flex">
          <LanguageToggle />
        </div>
        <div className="flex items-stretch justify-end gap-1 lg:hidden">
          <LanguageToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
