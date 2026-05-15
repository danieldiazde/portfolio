import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const gradientByImageKey: Record<string, string> = {
  autograd: "from-slate-950 via-slate-900 to-[#244f4a]",
  pipeline: "from-slate-950 via-[#244f4a] to-slate-900",
  academic: "from-[#1f2937] via-slate-900 to-[#5e7f78]",
  recruiting: "from-slate-950 via-[#2f6f68] to-slate-900",
  pong: "from-zinc-950 via-slate-900 to-[#6f7f66]",
  finance: "from-slate-950 via-[#365f59] to-slate-900",
};

const fallbackGradient = "from-slate-950 via-slate-900 to-[#244f4a]";

export function getProjectGradient(imageKey: string) {
  return gradientByImageKey[imageKey] ?? fallbackGradient;
}

export function ProjectVisual({
  project,
  title,
}: {
  project: Project;
  title: string;
}) {
  const initials = title
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2);

  return (
    <div
      className={cn(
        "relative aspect-[4/5] overflow-hidden rounded-md bg-gradient-to-br",
        getProjectGradient(project.image),
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 transition-transform duration-700 ease-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(94,127,120,0.34),transparent_34%),radial-gradient(circle_at_50%_95%,rgba(200,194,179,0.3),transparent_42%)]" />
      <div className="absolute inset-x-8 top-1/2 flex -translate-y-1/2 items-center justify-center">
        <div className="flex h-32 w-32 items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 text-5xl font-semibold text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-transform duration-500 ease-out group-hover:scale-105">
          {initials}
        </div>
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-2xl font-semibold tracking-tight text-white">
          {title}
        </p>
      </div>
    </div>
  );
}
