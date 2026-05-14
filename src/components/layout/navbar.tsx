"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";

const navItems = [
  { href: "/#experience", key: "experience" },
  { href: "/#projects", key: "projects" },
  { href: "/#writing", key: "writing" },
  { href: "/#resume", key: "resume" },
] as const;

const sectionIds = ["experience", "projects", "writing", "resume"] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    let frame = 0;

    function updateActiveHash() {
      if (window.scrollY < 80) {
        setActiveHash("");
        return;
      }

      const activationLine = window.innerHeight * 0.4;
      const activeSection = [...sectionIds].reverse().find((id) => {
        const section = document.getElementById(id);
        if (!section) {
          return false;
        }

        const rect = section.getBoundingClientRect();
        return rect.top <= activationLine && rect.bottom >= 0;
      });

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      setActiveHash(
        activeSection ? `#${activeSection}` : isAtBottom ? "#resume" : "",
      );
    }

    function scheduleUpdate() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveHash);
    }

    updateActiveHash();
    window.addEventListener("hashchange", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [pathname]);

  function isActive(item: (typeof navItems)[number]) {
    if (item.key === "experience") {
      return pathname === "/" && activeHash === "#experience";
    }

    if (item.key === "projects") {
      return (
        (pathname === "/" && activeHash === "#projects") ||
        pathname === "/projects"
      );
    }

    if (item.key === "writing") {
      return (
        (pathname === "/" && activeHash === "#writing") ||
        pathname === "/writing"
      );
    }

    if (item.key === "resume") {
      return pathname === "/" && activeHash === "#resume";
    }

    return false;
  }

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
      <div className="site-container grid min-h-14 grid-cols-[auto_1fr] items-stretch gap-1">
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
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "relative px-1 py-4 text-sm font-medium text-slate-300 transition hover:text-white",
                isActive(item) && "text-white",
              )}
            >
              {t(item.key)}
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white transition-transform duration-200 ease-out",
                  isActive(item) && "scale-x-100",
                )}
              />
            </Link>
          ))}
        </nav>
        <div className="flex justify-end lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
