import { getTranslations } from "next-intl/server";
import { writingItems } from "@/data/writing";
import { Button } from "@/components/ui/button";
import { WritingShowcase } from "@/components/writing/writing-showcase";
import { Link } from "@/i18n/navigation";
import { Section } from "./section";

export async function WritingPreview() {
  const t = await getTranslations();

  return (
    <Section
      id="writing"
      className="scroll-mt-20 border-y border-[#e4e0d6] bg-white py-16"
    >
      <div className="site-container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              {t("home.writingTitle")}
            </h2>
            <p className="mt-3 max-w-2xl text-2xl font-medium leading-tight text-slate-500">
              See what I am learning while building.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/writing">View writing</Link>
          </Button>
        </div>
        <WritingShowcase items={writingItems} />
      </div>
    </Section>
  );
}
