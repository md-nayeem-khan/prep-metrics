"use client";

import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeModeSelector } from "@/components/themes/theme-mode-selector";
import { useActiveTheme } from "@/components/themes/active-theme-provider";
import { THEMES } from "@/components/themes/theme.config";
import { cn } from "@/lib/utils";

// Representative swatch colors for each theme's preview tile.
const THEME_SWATCHES: Record<string, [string, string, string]> = {
  vercel: ["#000000", "#ededed", "#666666"],
  claude: ["#d4813e", "#f0e6d3", "#7c4a1e"],
  supabase: ["#3ecf8e", "#1c1c1c", "#0a0a0a"],
  mono: ["#71717a", "#f4f4f5", "#3f3f46"],
  notebook: ["#6366f1", "#fffbeb", "#4338ca"],
  neobrutualism: ["#eab308", "#ffffff", "#1a1a1a"],
  "light-green": ["#22c55e", "#f0fdf4", "#166534"],
  zen: ["#a855f7", "#faf5ff", "#6b21a8"],
  "astro-vista": ["#818cf8", "#0f0a1e", "#4f46e5"],
  whatsapp: ["#25d366", "#111b21", "#128c7e"],
};

export function AppearanceSection() {
  const { activeTheme, setActiveTheme } = useActiveTheme();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Color Theme</CardTitle>
          <CardDescription>Choose a color palette for the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {THEMES.map((theme) => {
              const swatches =
                THEME_SWATCHES[theme.value] ?? ["#888888", "#cccccc", "#444444"];
              const isActive = activeTheme === theme.value;
              return (
                <button
                  key={theme.value}
                  onClick={() => setActiveTheme(theme.value)}
                  aria-pressed={isActive}
                  className={cn(
                    "group relative flex flex-col gap-2 rounded-lg border p-3 text-left transition-all",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                    isActive
                      ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                      : "border-border hover:border-primary/40 hover:bg-accent/50",
                  )}
                >
                  <div className="flex h-6 gap-0.5 overflow-hidden rounded">
                    {swatches.map((color, i) => (
                      <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="truncate text-xs font-medium leading-tight">
                      {theme.name}
                    </span>
                    {isActive && <Check className="size-3 shrink-0 text-primary" />}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Display Mode</CardTitle>
          <CardDescription>
            Choose light, dark, or match your system settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeModeSelector />
        </CardContent>
      </Card>

      <p className="px-1 text-xs text-muted-foreground">
        Appearance preferences are saved to this browser.
      </p>
    </div>
  );
}
