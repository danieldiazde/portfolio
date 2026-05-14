import { cn } from "@/lib/utils";

export function ProjectVisual({
  variant,
  title,
}: {
  variant: string;
  title: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-md border bg-white",
      )}
      aria-label={`${title} visual placeholder`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:28px_28px] transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
      <div className="absolute left-6 right-6 top-6 h-px bg-slate-200 transition-colors duration-300 group-hover:bg-slate-300" />
      <div className="absolute bottom-6 left-6 right-6 h-px bg-slate-200 transition-colors duration-300 group-hover:bg-slate-300" />
      <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-slate-200 transition-colors duration-300 group-hover:bg-slate-300" />
      <div className="absolute right-6 top-6 h-[calc(100%-3rem)] w-px bg-slate-200 transition-colors duration-300 group-hover:bg-slate-300" />
      <div className="absolute left-[18%] top-[28%] h-3 w-3 rounded-full bg-primary transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
      <div className="absolute left-[45%] top-[42%] h-3 w-3 rounded-full bg-[#5e7f78] transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:translate-y-0.5" />
      <div className="absolute right-[20%] top-[30%] h-3 w-3 rounded-full bg-slate-400 transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:translate-y-1" />
      <div className="absolute bottom-[28%] left-[34%] h-3 w-3 rounded-full bg-[#c8c2b3] transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1" />
      <svg
        className="absolute inset-0 h-full w-full opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      >
        <line
          x1="18%"
          y1="28%"
          x2="45%"
          y2="42%"
          stroke="rgb(203 213 225)"
          strokeWidth="1.5"
          className="transition-colors duration-300 group-hover:stroke-slate-400"
        />
        <line
          x1="45%"
          y1="42%"
          x2="80%"
          y2="30%"
          stroke="rgb(203 213 225)"
          strokeWidth="1.5"
          className="transition-colors duration-300 group-hover:stroke-slate-400"
        />
        <line
          x1="45%"
          y1="42%"
          x2="34%"
          y2="72%"
          stroke="rgb(203 213 225)"
          strokeWidth="1.5"
          className="transition-colors duration-300 group-hover:stroke-slate-400"
        />
      </svg>
      <div className="absolute left-6 top-6 rounded-br-md border-b border-r bg-white px-3 py-2 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:translate-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          {variant}
        </p>
      </div>
      <div className="absolute bottom-6 right-6 rounded-tl-md border-l border-t bg-white px-3 py-2 transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
        <p className="text-xs font-medium text-slate-500">case study</p>
      </div>
    </div>
  );
}
