"use client";

import * as React from "react";

/**
 * Warns the user before they leave the page (refresh, tab close, or external
 * navigation) while there are unsaved changes. Registers a `beforeunload`
 * handler only while `isDirty` is true, and tears it down otherwise.
 *
 * In-app navigation between settings sections is guarded separately by a
 * `confirm()` in the settings shell — this covers browser-level unloads.
 */
export function useUnsavedChanges(isDirty: boolean): void {
  React.useEffect(() => {
    if (!isDirty) return;

    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      // Required for the prompt to show in some browsers.
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);
}
