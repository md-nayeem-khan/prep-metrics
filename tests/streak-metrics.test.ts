import test from "node:test";
import assert from "node:assert/strict";

import {
  buildCalendarData,
  buildDailyMap,
  calculateCurrentStreakFromSolvedDays,
  calculateLongestStreakFromSolvedDays,
  getDateWindow,
  toDateKey,
} from "../lib/analytics/streak-metrics";

test("buildDailyMap aggregates multiple solved submissions on the same day", () => {
  const submissions = [
    { submittedAt: new Date("2026-04-10T09:00:00.000Z"), timeSpentSeconds: 1200 },
    { submittedAt: new Date("2026-04-10T12:00:00.000Z"), timeSpentSeconds: 1800 },
    { submittedAt: new Date("2026-04-09T08:00:00.000Z"), timeSpentSeconds: 900 },
  ];

  const dailyMap = buildDailyMap(submissions);

  assert.deepEqual(dailyMap.get("2026-04-10"), { count: 2, totalTime: 3000 });
  assert.deepEqual(dailyMap.get("2026-04-09"), { count: 1, totalTime: 900 });
});

test("buildCalendarData returns full window with counts and total time", () => {
  const now = new Date("2026-04-12T15:00:00.000Z");
  const dayMap = new Map<string, { count: number; totalTime: number }>([
    ["2026-04-10", { count: 2, totalTime: 2400 }],
    ["2026-04-11", { count: 1, totalTime: 900 }],
  ]);

  const data = buildCalendarData(3, now, dayMap);

  assert.equal(data.length, 3);
  assert.deepEqual(data[0], { date: "2026-04-10", count: 2, totalTime: 2400, level: 1 });
  assert.deepEqual(data[1], { date: "2026-04-11", count: 1, totalTime: 900, level: 1 });
  assert.deepEqual(data[2], { date: "2026-04-12", count: 0, totalTime: 0, level: 0 });
});

test("streak helpers compute current and longest streak from solved day keys", () => {
  const solvedDayKeys = new Set([
    "2026-04-07",
    "2026-04-08",
    "2026-04-10",
    "2026-04-11",
    "2026-04-12",
  ]);

  const current = calculateCurrentStreakFromSolvedDays(solvedDayKeys, new Date("2026-04-12T12:00:00"));
  const longest = calculateLongestStreakFromSolvedDays(solvedDayKeys);

  assert.equal(current, 3);
  assert.equal(longest, 3);
});

test("getDateWindow uses end-exclusive next day boundary to include full current day", () => {
  const window = getDateWindow(7, new Date("2026-04-12T12:10:00"));

  assert.equal(toDateKey(window.startDate), "2026-04-06");
  assert.equal(toDateKey(window.endDate), "2026-04-12");
  assert.equal(toDateKey(window.endExclusive), "2026-04-13");
  assert.equal(window.endExclusive.getTime() - window.endDate.getTime(), 24 * 60 * 60 * 1000);
});
