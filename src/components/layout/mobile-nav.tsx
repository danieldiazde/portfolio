"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { primaryNavItems } from "@/config/navigation";
import { useActiveHomeSection } from "@/hooks/use-active-home-section";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const t = useTranslations("nav");
  const { isActiveSection } = useActiveHomeSection();

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
          {primaryNavItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-[#e8e5dc] hover:text-foreground",
                isActiveSection(item.key) && "bg-[#e8e5dc] text-primary",
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
