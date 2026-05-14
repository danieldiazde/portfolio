"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#experience", key: "experience" },
  { href: "/#projects", key: "projects" },
  { href: "/#writing", key: "writing" },
  { href: "/#resume", key: "resume" },
] as const;

const sectionIds = ["experience", "projects", "writing", "resume"] as const;

export function MobileNav() {
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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t("menu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mt-12 flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-[#e8e5dc] hover:text-foreground",
                isActive(item) && "bg-[#e8e5dc] text-primary",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
