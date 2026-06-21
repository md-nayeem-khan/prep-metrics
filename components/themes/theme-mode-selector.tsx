"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const MODES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeModeSelector() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = React.useCallback(
    (mode: string, e: React.MouseEvent) => {
      if (mode === theme) return;

      // The appearance only actually changes if the resolved theme differs
      // (e.g. switching to/from "system" when system already matches is a no-op visually).
      const nextResolved = mode === "system" ? systemTheme : mode;
      const willChange = nextResolved !== resolvedTheme;

      const startViewTransition = (
        document as Document & {
          startViewTransition?: (cb: () => void) => void;
        }
      ).startViewTransition;

      if (!startViewTransition || !willChange) {
        setTheme(mode);
        return;
      }

      const root = document.documentElement;
      root.style.setProperty("--x", `${e.clientX}px`);
      root.style.setProperty("--y", `${e.clientY}px`);

      startViewTransition.call(document, () => {
        setTheme(mode);
      });
    },
    [theme, systemTheme, resolvedTheme, setTheme],
  );

  return (
    <div
      role="radiogroup"
      aria-label="Display mode"
      className="inline-grid grid-cols-3 gap-1.5 rounded-xl border bg-muted/30 p-1.5"
    >
      {MODES.map(({ value, label, icon: Icon }) => {
        const isActive = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            onClick={(e) => handleSelect(value, e)}
            className={cn(
              "flex flex-col items-center justify-center gap-1.5 rounded-lg border px-3 py-3 text-sm font-medium transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              isActive
                ? "border-primary bg-primary/5 text-foreground ring-2 ring-primary/30"
                : "border-transparent text-muted-foreground hover:border-border hover:bg-background hover:text-foreground",
            )}
          >
            <Icon className="size-5" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
