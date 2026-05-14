"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type SheetContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SheetContext = React.createContext<SheetContextValue | null>(null);

function useSheet() {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet components must be used inside Sheet");
  }
  return context;
}

function Sheet({
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = React.useCallback(
    (value: boolean) => {
      setUncontrolledOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange],
  );

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

function SheetTrigger({
  children,
  asChild,
}: {
  children: React.ReactElement<{ onClick?: () => void }>;
  asChild?: boolean;
}) {
  const { setOpen } = useSheet();
  if (asChild) {
    return React.cloneElement(children, { onClick: () => setOpen(true) });
  }
  return <button onClick={() => setOpen(true)}>{children}</button>;
}

function SheetContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } = useSheet();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-slate-950/30"
        onClick={() => setOpen(false)}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 h-full w-[min(88vw,22rem)] border-l bg-background p-6 shadow-soft",
          className,
        )}
      >
        <button
          aria-label="Close menu"
          className="absolute right-4 top-4 rounded-md p-2 text-muted-foreground hover:bg-muted"
          onClick={() => setOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </aside>
    </div>
  );
}

export { Sheet, SheetTrigger, SheetContent };
