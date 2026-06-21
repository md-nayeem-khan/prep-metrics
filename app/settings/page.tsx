"use client";

import * as React from "react";
import { parseAsString, useQueryState } from "nuqs";
import { PageContainer } from "@/components/layout/page-container";
import {
  asSectionId,
  NAV_ITEMS,
  type SectionId,
} from "@/components/settings/settings-nav";
import { ProfileSection } from "@/components/settings/sections/profile-section";
import { AppearanceSection } from "@/components/settings/sections/appearance-section";
import { SecuritySection } from "@/components/settings/sections/security-section";
import { DataSection } from "@/components/settings/sections/data-section";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  // URL-synced active section (?tab=…). `history: "push"` lets back/forward step through tabs.
  const [tab, setTab] = useQueryState(
    "tab",
    parseAsString.withDefault("profile").withOptions({ history: "push" }),
  );
  const section = asSectionId(tab);

  // The active section reports its unsaved-changes state here so we can guard tab switches.
  const dirtyRef = React.useRef(false);
  const handleDirtyChange = React.useCallback((dirty: boolean) => {
    dirtyRef.current = dirty;
  }, []);

  const handleSelect = (id: SectionId) => {
    if (id === section) return;
    if (
      dirtyRef.current &&
      !window.confirm("You have unsaved changes. Discard them?")
    ) {
      return;
    }
    dirtyRef.current = false;
    void setTab(id);
  };

  return (
    <PageContainer
      pageTitle="Settings"
      pageDescription="Manage your profile, preferences, and account"
    >
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {/* ── Sidebar Nav ─────────────────────────────────── */}
        <aside className="w-full shrink-0 md:w-56">
          {/* Mobile: horizontal scroll */}
          <div className="flex gap-1 overflow-x-auto pb-1 md:hidden">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleSelect(id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  section === id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Desktop: vertical */}
          <nav className="hidden flex-col gap-0.5 md:flex">
            {NAV_ITEMS.map(({ id, label, description, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleSelect(id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                  section === id
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors",
                    section === id
                      ? "border-primary/20 bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground",
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-sm leading-tight",
                      section === id ? "font-semibold text-foreground" : "font-medium",
                    )}
                  >
                    {label}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{description}</p>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Content Area ────────────────────────────────── */}
        <div className="min-w-0 flex-1">
          {section === "profile" && (
            <ProfileSection onDirtyChange={handleDirtyChange} />
          )}
          {section === "appearance" && <AppearanceSection />}
          {section === "security" && <SecuritySection />}
          {section === "data" && <DataSection />}
        </div>
      </div>
    </PageContainer>
  );
}
