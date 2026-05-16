import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex translate-y-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-200 ease-out active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:bg-slate-900",
        outline:
          "border bg-white text-foreground hover:border-[#9eb8ae] hover:bg-[#e8e5dc] hover:text-[#244f4a] [&_.lucide-arrow-left]:transition-transform [&_.lucide-arrow-left]:duration-300 [&_.lucide-arrow-left]:ease-out [&_.lucide-arrow-right]:transition-transform [&_.lucide-arrow-right]:duration-300 [&_.lucide-arrow-right]:ease-out hover:[&_.lucide-arrow-left]:-translate-x-1 hover:[&_.lucide-arrow-right]:translate-x-1",
        ghost:
          "text-slate-600 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-foreground",
        secondary:
          "bg-slate-100 text-foreground hover:-translate-y-0.5 hover:bg-slate-200",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
