"use client";

import * as React from "react";
import { isValidTimeZone } from "@/lib/datetime/tz";

// Client-side source of truth for the user's display timezone. Seeded server-side from the `user_tz`
// cookie (read in app/layout.tsx) so SSR and the first client render agree — no hydration mismatch.
// Mirrors the ActiveThemeProvider cookie pattern.

const TimezoneContext = React.createContext<{
  timezone: string;
  setTimezone: (tz: string) => void;
}>({
  timezone: "UTC",
  setTimezone: () => {},
});

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function TimezoneProvider({
  children,
  initialTimezone,
}: {
  children: React.ReactNode;
  initialTimezone?: string;
}) {
  const [timezone, setTimezoneState] = React.useState(
    isValidTimeZone(initialTimezone) ? (initialTimezone as string) : "UTC",
  );

  const setTimezone = React.useCallback((tz: string) => {
    if (!isValidTimeZone(tz)) return;
    setTimezoneState(tz);
    document.cookie = `user_tz=${encodeURIComponent(tz)}; path=/; max-age=${ONE_YEAR_SECONDS}`;
  }, []);

  // Fallback: if the cookie was missing on first paint, seed it from the server-stored value.
  React.useEffect(() => {
    if (isValidTimeZone(initialTimezone)) return;
    let cancelled = false;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((res) => {
        if (!cancelled && res?.success && isValidTimeZone(res.data?.timezone)) {
          setTimezone(res.data.timezone);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [initialTimezone, setTimezone]);

  return (
    <TimezoneContext.Provider value={{ timezone, setTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone() {
  return React.useContext(TimezoneContext);
}
