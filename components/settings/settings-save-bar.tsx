"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SettingsSaveBarProps {
  /** Whether there are unsaved changes (controls visibility). */
  visible: boolean;
  /** True while a save request is in flight. */
  saving: boolean;
  onSave: () => void;
  onDiscard: () => void;
  /** Optional override for the save button label. */
  saveLabel?: string;
}

/**
 * Sticky "unsaved changes" bar that pins to the bottom of the settings content
 * column. Stays mounted (so it can animate) but slides out of view and disables
 * pointer events when there are no pending changes.
 */
export function SettingsSaveBar({
  visible,
  saving,
  onSave,
  onDiscard,
  saveLabel = "Save changes",
}: SettingsSaveBarProps) {
  return (
    <div
      className={cn(
        "pointer-events-none sticky bottom-4 z-10 mt-2 transition-all duration-200",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3 rounded-xl border bg-card/95 px-4 py-3 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/80",
          visible && "pointer-events-auto",
        )}
      >
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <AlertCircle className="size-4 shrink-0 text-amber-500" />
          <span>You have unsaved changes</span>
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDiscard}
            disabled={saving}
          >
            Discard
          </Button>
          <Button size="sm" onClick={onSave} disabled={saving}>
            {saving ? "Saving…" : saveLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
