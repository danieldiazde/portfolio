"use client";

import { useEffect, useState } from "react";
import type { HomeSection } from "@/config/navigation";
import { homeSections } from "@/config/navigation";
import { usePathname } from "@/i18n/navigation";

export function useActiveHomeSection() {
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
      const activeSection = [...homeSections].reverse().find((id) => {
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

  function isActiveSection(section: HomeSection) {
    if (section === "writing") {
      return (
        (pathname === "/" && activeHash === "#writing") ||
        pathname === "/writing"
      );
    }

    return pathname === "/" && activeHash === `#${section}`;
  }

  return {
    activeHash,
    isActiveSection,
    pathname,
    setActiveHash,
  };
}
