// Timezone-aware day bucketing — the single source of truth for "what day is it".
//
// Every day-boundary calculation in the app (streaks, daily-progress, the calendar heatmap,
// "today's revisions", spaced-repetition due dates, weekly/monthly windows) must agree on where a
// day starts and ends. That boundary is the user's chosen IANA timezone, NOT the server's local zone
// and NOT UTC. Timestamps are still stored as UTC instants; only the bucketing boundaries live here.
//
// Why hand-rolled Intl instead of a library: the only two primitives needed are (a) the local
// calendar day of an instant and (b) the UTC instant of a local midnight. Both are expressible with
// Intl.DateTimeFormat plus a tiny offset solve, and they work identically on the server, the browser,
// and the `tsx --test` runner.
//
// Why NOT fixed `days * 24h` math: adding a constant 24h across a DST transition is wrong (a
// spring-forward day is 23h, a fall-back day is 25h). We do calendar arithmetic on the local Y-M-D
// string and then resolve back to a UTC instant, which is DST-correct.

export type DateKey = string; // "YYYY-MM-DD" in the target timezone's local calendar

export function isValidTimeZone(tz: unknown): tz is string {
  if (typeof tz !== "string" || tz.length === 0) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

// Offset of `tz` from UTC at `instant`, in milliseconds (e.g. +5:30 -> +19_800_000).
function tzOffsetMs(instant: Date, tz: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = Object.fromEntries(
    dtf
      .formatToParts(instant)
      .filter((p) => p.type !== "literal")
      .map((p) => [p.type, p.value]),
  ) as Record<string, string>;
  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  // Drop sub-second precision on the instant so the difference is a whole-minute offset.
  return asUTC - Math.floor(instant.getTime() / 1000) * 1000;
}

// The local calendar day of an instant, as "YYYY-MM-DD". en-CA formats as ISO date order.
export function dayKey(instant: Date, tz: string): DateKey {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(instant);
}

// Pure Gregorian arithmetic on a date key. Keys carry no timezone meaning, so UTC math is safe here.
export function addDayKey(key: DateKey, n: number): DateKey {
  const [y, m, d] = key.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + n));
  return next.toISOString().slice(0, 10);
}

// The UTC instant of local midnight for the given day (Date instant or date key) in `tz`.
export function startOfDayInstant(input: Date | DateKey, tz: string): Date {
  const key = typeof input === "string" ? input : dayKey(input, tz);
  const [y, m, d] = key.split("-").map(Number);
  const guess = Date.UTC(y, m - 1, d);
  // Solve, then refine once: near a DST edge the offset used in the first solve may differ from the
  // offset that actually applies at the resolved instant.
  let inst = guess - tzOffsetMs(new Date(guess), tz);
  inst = guess - tzOffsetMs(new Date(inst), tz);
  return new Date(inst);
}

// The UTC instant of the start of the NEXT local day — i.e. an exclusive upper bound for "this day".
export function endOfDayExclusiveInstant(input: Date | DateKey, tz: string): Date {
  const key = typeof input === "string" ? input : dayKey(input, tz);
  return startOfDayInstant(addDayKey(key, 1), tz);
}

// +N local days from the given day, returned as the resulting local-midnight UTC instant. DST-correct.
export function addDays(input: Date | DateKey, n: number, tz: string): Date {
  const key = typeof input === "string" ? input : dayKey(input, tz);
  return startOfDayInstant(addDayKey(key, n), tz);
}

export interface DateWindow {
  startDate: Date; // local midnight of the first day in the window (UTC instant)
  endDate: Date; // local midnight of the last (most recent) day (UTC instant)
  endExclusive: Date; // local midnight of the day after endDate (UTC instant)
  startKey: DateKey;
  endKey: DateKey;
}

// A trailing window of `days` local days ending on the local day of `now` (inclusive).
export function getDateWindow(days: number, tz: string, now: Date = new Date()): DateWindow {
  const safeDays = Number.isFinite(days) && days > 0 ? Math.floor(days) : 30;
  const endKey = dayKey(now, tz);
  const startKey = addDayKey(endKey, -(safeDays - 1));
  return {
    startDate: startOfDayInstant(startKey, tz),
    endDate: startOfDayInstant(endKey, tz),
    endExclusive: startOfDayInstant(addDayKey(endKey, 1), tz),
    startKey,
    endKey,
  };
}

// Consecutive solved days ending today (in the user's tz).
export function calculateCurrentStreakFromSolvedDays(
  solvedDayKeys: Set<DateKey>,
  tz: string,
  now: Date = new Date(),
): number {
  let streak = 0;
  let cursor = dayKey(now, tz);
  while (solvedDayKeys.has(cursor)) {
    streak += 1;
    cursor = addDayKey(cursor, -1);
  }
  return streak;
}

// ── Display helpers (used by client components, given the user's display timezone) ──────────────

// Format an instant in the target timezone, e.g. formatInTimeZone(d, tz, { month: "short", day: "numeric" }).
export function formatInTimeZone(
  instant: Date,
  tz: string,
  options: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: tz }).format(instant);
}

// "Today" / "Tomorrow" / "Yesterday" when the instant falls on one of those local days, else null.
export function relativeDayLabel(instant: Date, tz: string, now: Date = new Date()): string | null {
  const key = dayKey(instant, tz);
  const today = dayKey(now, tz);
  if (key === today) return "Today";
  if (key === addDayKey(today, 1)) return "Tomorrow";
  if (key === addDayKey(today, -1)) return "Yesterday";
  return null;
}

// Longest run of consecutive solved days. Adjacency is computed via key arithmetic, not ms deltas,
// so it is immune to DST-length days.
export function calculateLongestStreakFromSolvedDays(solvedDayKeys: Set<DateKey>): number {
  const sortedKeys = Array.from(solvedDayKeys).sort();
  if (sortedKeys.length === 0) return 0;

  let longest = 1;
  let running = 1;
  for (let i = 1; i < sortedKeys.length; i += 1) {
    if (addDayKey(sortedKeys[i - 1], 1) === sortedKeys[i]) {
      running += 1;
      if (running > longest) longest = running;
    } else {
      running = 1;
    }
  }
  return longest;
}
