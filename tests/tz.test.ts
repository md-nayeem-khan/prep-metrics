import test from "node:test";
import assert from "node:assert/strict";

import {
  isValidTimeZone,
  dayKey,
  addDayKey,
  startOfDayInstant,
  endOfDayExclusiveInstant,
  addDays,
  getDateWindow,
  calculateCurrentStreakFromSolvedDays,
  calculateLongestStreakFromSolvedDays,
  relativeDayLabel,
} from "../lib/datetime/tz";

test("isValidTimeZone accepts IANA zones and rejects junk", () => {
  assert.equal(isValidTimeZone("Asia/Kolkata"), true);
  assert.equal(isValidTimeZone("America/New_York"), true);
  assert.equal(isValidTimeZone("UTC"), true);
  assert.equal(isValidTimeZone("Mars/Phobos"), false);
  assert.equal(isValidTimeZone(""), false);
  assert.equal(isValidTimeZone(undefined as any), false);
});

test("dayKey buckets by the local day, not the UTC day", () => {
  // 2026-04-09T20:30:00Z is 2026-04-10 02:00 local in Kolkata (UTC+5:30).
  const instant = new Date("2026-04-09T20:30:00.000Z");
  assert.equal(dayKey(instant, "Asia/Kolkata"), "2026-04-10");
  assert.equal(dayKey(instant, "UTC"), "2026-04-09");
  // Same wall-clock instant is still 2026-04-09 in New York (16:30 EDT).
  assert.equal(dayKey(instant, "America/New_York"), "2026-04-09");
});

test("startOfDayInstant / endOfDayExclusiveInstant round-trip for a +5:30 zone", () => {
  const start = startOfDayInstant("2026-04-10", "Asia/Kolkata");
  // Local midnight 2026-04-10 in Kolkata = 2026-04-09T18:30:00Z.
  assert.equal(start.toISOString(), "2026-04-09T18:30:00.000Z");
  const end = endOfDayExclusiveInstant("2026-04-10", "Asia/Kolkata");
  assert.equal(end.toISOString(), "2026-04-10T18:30:00.000Z");
  // dayKey of the start instant is the same local day it was built from.
  assert.equal(dayKey(start, "Asia/Kolkata"), "2026-04-10");
});

test("startOfDayInstant for UTC matches plain UTC midnight", () => {
  const start = startOfDayInstant(new Date("2026-04-10T13:00:00.000Z"), "UTC");
  assert.equal(start.toISOString(), "2026-04-10T00:00:00.000Z");
});

test("addDays is DST-correct on spring-forward in America/New_York", () => {
  // 2025-03-09 is the US spring-forward day (clocks jump 02:00 -> 03:00), a 23-hour day.
  const d0 = startOfDayInstant("2025-03-09", "America/New_York"); // EST -5 -> 05:00Z
  const d1 = addDays("2025-03-09", 1, "America/New_York"); // EDT -4 -> 04:00Z next day
  assert.equal(d0.toISOString(), "2025-03-09T05:00:00.000Z");
  assert.equal(d1.toISOString(), "2025-03-10T04:00:00.000Z");
  // Consecutive local midnights are 23 hours apart across spring-forward, NOT 24.
  assert.equal((d1.getTime() - d0.getTime()) / 3_600_000, 23);
});

test("addDays is DST-correct on fall-back in America/New_York", () => {
  // 2025-11-02 is the US fall-back day (clocks fall 02:00 -> 01:00), a 25-hour day.
  const d0 = startOfDayInstant("2025-11-02", "America/New_York"); // EDT -4 -> 04:00Z
  const d1 = addDays("2025-11-02", 1, "America/New_York"); // EST -5 -> 05:00Z next day
  assert.equal(d0.toISOString(), "2025-11-02T04:00:00.000Z");
  assert.equal(d1.toISOString(), "2025-11-03T05:00:00.000Z");
  assert.equal((d1.getTime() - d0.getTime()) / 3_600_000, 25);
});

test("addDayKey does pure Gregorian month/year rollover", () => {
  assert.equal(addDayKey("2026-01-31", 1), "2026-02-01");
  assert.equal(addDayKey("2026-12-31", 1), "2027-01-01");
  assert.equal(addDayKey("2026-03-01", -1), "2026-02-28");
  assert.equal(addDayKey("2024-03-01", -1), "2024-02-29"); // leap year
});

test("getDateWindow spans the requested number of local days inclusive of today", () => {
  const w = getDateWindow(7, "Asia/Kolkata", new Date("2026-04-12T20:00:00.000Z"));
  // 2026-04-12T20:00Z = 2026-04-13 01:30 local, so 'today' is 2026-04-13 in Kolkata.
  assert.equal(w.endKey, "2026-04-13");
  assert.equal(w.startKey, "2026-04-07");
  assert.equal(dayKey(w.startDate, "Asia/Kolkata"), "2026-04-07");
  assert.equal(dayKey(w.endExclusive, "Asia/Kolkata"), "2026-04-14");
});

test("current streak counts consecutive solved local days ending today", () => {
  const solved = new Set(["2026-04-07", "2026-04-08", "2026-04-10", "2026-04-11", "2026-04-12"]);
  const now = new Date("2026-04-12T12:00:00.000Z");
  assert.equal(calculateCurrentStreakFromSolvedDays(solved, "UTC", now), 3);
});

test("longest streak survives a DST transition (computed on day keys)", () => {
  // Days spanning the 2025-03-09 spring-forward: a contiguous 4-day run.
  const solved = new Set(["2025-03-08", "2025-03-09", "2025-03-10", "2025-03-11", "2025-03-13"]);
  assert.equal(calculateLongestStreakFromSolvedDays(solved), 4);
});

test("a 2am-Kolkata submission counts on the correct local day for streaks", () => {
  // Two submissions: one late on the UTC day, one 'next' UTC day but same Kolkata local day.
  const a = new Date("2026-04-09T19:00:00.000Z"); // Kolkata 2026-04-10 00:30
  const b = new Date("2026-04-09T20:30:00.000Z"); // Kolkata 2026-04-10 02:00
  const keys = new Set([dayKey(a, "Asia/Kolkata"), dayKey(b, "Asia/Kolkata")]);
  assert.deepEqual([...keys], ["2026-04-10"]); // same local day -> single bucket
});

test("relativeDayLabel returns Today/Tomorrow/Yesterday by local day", () => {
  const now = new Date("2026-04-12T12:00:00.000Z");
  assert.equal(relativeDayLabel(new Date("2026-04-12T23:00:00.000Z"), "UTC", now), "Today");
  assert.equal(relativeDayLabel(new Date("2026-04-13T06:00:00.000Z"), "UTC", now), "Tomorrow");
  assert.equal(relativeDayLabel(new Date("2026-04-11T06:00:00.000Z"), "UTC", now), "Yesterday");
  assert.equal(relativeDayLabel(new Date("2026-04-20T06:00:00.000Z"), "UTC", now), null);
});
