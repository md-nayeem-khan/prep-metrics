"use client";

import * as React from "react";
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
  useRegisterActions,
  type Action,
} from "kbar";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { navGroups, type NavItem } from "@/config/nav";
import { useActiveTheme } from "@/components/themes/active-theme-provider";
import { THEMES } from "@/components/themes/theme.config";

// ─── Inner component that registers nav actions ──────────────────────────────
function flattenNavItems(
  items: NavItem[],
  section: string,
): Array<{ item: NavItem; section: string }> {
  return items.flatMap((item) =>
    item.items?.length
      ? flattenNavItems(item.items, section)
      : [{ item, section }],
  );
}

function NavActions() {
  const router = useRouter();

  const actions: Action[] = navGroups.flatMap((group) =>
    flattenNavItems(group.items, group.label).map(({ item, section }) => ({
      id: item.url,
      name: item.title,
      shortcut: item.shortcut ?? [],
      keywords: item.title.toLowerCase(),
      section,
      icon: item.icon
        ? React.createElement(item.icon, { className: "size-4" })
        : undefined,
      perform: () => router.push(item.url),
    })),
  );

  useRegisterActions(actions, []);

  return null;
}

// ─── Double-key shortcut handler (D D = dark mode, T T = cycle theme) ────────
function useDoubleKeyShortcuts() {
  const { resolvedTheme, setTheme } = useTheme();
  const { activeTheme, setActiveTheme } = useActiveTheme();
  const lastKey = React.useRef<{ key: string; time: number } | null>(null);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const now = Date.now();
      const prev = lastKey.current;

      if (prev && prev.key === e.key && now - prev.time < 500) {
        if (e.key === "d") {
          const next = resolvedTheme === "dark" ? "light" : "dark";
          const root = document.documentElement;
          const svt = (document as Document & { startViewTransition?: (cb: () => void) => void }).startViewTransition;
          if (svt) {
            root.style.setProperty("--x", "50%");
            root.style.setProperty("--y", "50%");
            svt.call(document, () => setTheme(next));
          } else {
            setTheme(next);
          }
        }
        if (e.key === "t") {
          const idx = THEMES.findIndex((th) => th.value === activeTheme);
          const next = THEMES[(idx + 1) % THEMES.length];
          setActiveTheme(next.value);
        }
        lastKey.current = null;
      } else {
        lastKey.current = { key: e.key, time: now };
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [resolvedTheme, setTheme, activeTheme, setActiveTheme]);
}

function ShortcutProvider() {
  useDoubleKeyShortcuts();
  return null;
}

// ─── Results renderer ─────────────────────────────────────────────────────────
function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        if (typeof item === "string") {
          return (
            <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {item}
            </div>
          );
        }

        return (
          <div
            className={`flex cursor-pointer items-center gap-3 rounded-sm px-4 py-2 text-sm transition-colors ${
              active
                ? "bg-accent text-accent-foreground"
                : "text-foreground"
            }`}
          >
            {item.icon && (
              <span className="text-muted-foreground">{item.icon as React.ReactNode}</span>
            )}
            <span className="flex-1">{item.name}</span>
            {item.shortcut?.length ? (
              <span className="flex gap-1">
                {item.shortcut.map((sc) => (
                  <kbd
                    key={sc}
                    className="inline-flex h-5 items-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground"
                  >
                    {sc}
                  </kbd>
                ))}
              </span>
            ) : null}
          </div>
        );
      }}
    />
  );
}

// ─── KBar wrapper component ───────────────────────────────────────────────────
export default function KBar({ children }: { children: React.ReactNode }) {
  return (
    <KBarProvider>
      <NavActions />
      <ShortcutProvider />
      <KBarPortal>
        <KBarPositioner className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-24 backdrop-blur-sm">
          <KBarAnimator className="w-full max-w-xl overflow-hidden rounded-xl border bg-popover shadow-2xl">
            <KBarSearch
              className="w-full border-b bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
              defaultPlaceholder="Type a command or search…"
            />
            <div className="max-h-72 overflow-y-auto py-1">
              <RenderResults />
            </div>
            <div className="border-t px-4 py-2 flex items-center gap-4 text-xs text-muted-foreground">
              <span>
                <kbd className="mr-1 rounded border bg-muted px-1 font-mono">↵</kbd>
                to select
              </span>
              <span>
                <kbd className="mr-1 rounded border bg-muted px-1 font-mono">↑↓</kbd>
                to navigate
              </span>
              <span>
                <kbd className="mr-1 rounded border bg-muted px-1 font-mono">esc</kbd>
                to close
              </span>
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
}
