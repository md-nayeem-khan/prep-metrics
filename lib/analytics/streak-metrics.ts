// Streak / activity-calendar helpers.
//
// Day bucketing is delegated to lib/datetime/tz.ts so every feature agrees on day boundaries, using
// the user's chosen timezone (passed in as `tz`). Pass tz="UTC" for timezone-independent behaviour.

import {
  dayKey,
  addDays,
  getDateWindow as getTzDateWindow,
  calculateCurrentStreakFromSolvedDays as currentStreak,
  calculateLongestStreakFromSolvedDays as longestStreak,
  type DateWindow,
} from "@/lib/datetime/tz";

export type { DateWindow };

export interface SubmissionPoint {
  submittedAt: Date;
  timeSpentSeconds: number;
}

export interface CalendarDay {
  date: string;
  count: number;
  totalTime: number;
  level: number;
}

export function getActivityLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  return 4;
}

export function toDateKey(date: Date, tz: string): string {
  return dayKey(date, tz);
}

export function getDateWindow(days: number, tz: string, now = new Date()): DateWindow {
  return getTzDateWindow(days, tz, now);
}

export function calculateCurrentStreakFromSolvedDays(
  solvedDayKeys: Set<string>,
  tz: string,
  now = new Date(),
): number {
  return currentStreak(solvedDayKeys, tz, now);
}

export function calculateLongestStreakFromSolvedDays(solvedDayKeys: Set<string>): number {
  return longestStreak(solvedDayKeys);
}

export function buildDailyMap(
  submissions: SubmissionPoint[],
  tz: string,
): Map<string, { count: number; totalTime: number }> {
  const dayMap = new Map<string, { count: number; totalTime: number }>();

  for (const submission of submissions) {
    const key = dayKey(submission.submittedAt, tz);
    const existing = dayMap.get(key) ?? { count: 0, totalTime: 0 };
    existing.count += 1;
    existing.totalTime += submission.timeSpentSeconds || 0;
    dayMap.set(key, existing);
  }

  return dayMap;
}

export function buildCalendarData(
  days: number,
  now: Date,
  dayMap: Map<string, { count: number; totalTime: number }>,
  tz: string,
): CalendarDay[] {
  const { endDate } = getTzDateWindow(days, tz, now);
  const calendarData: CalendarDay[] = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = addDays(endDate, -i, tz);
    const key = dayKey(date, tz);
    const values = dayMap.get(key) ?? { count: 0, totalTime: 0 };

    calendarData.push({
      date: key,
      count: values.count,
      totalTime: values.totalTime,
      level: getActivityLevel(values.count),
    });
  }

  return calendarData;
}
