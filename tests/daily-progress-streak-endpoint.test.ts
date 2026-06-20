import test from "node:test";
import assert from "node:assert/strict";

import { GET } from "../app/api/analytics/daily-progress/route";
import { prisma } from "../lib/prisma";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function startOfUtcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function toUtcDateKey(date: Date): string {
  return startOfUtcDay(date).toISOString().slice(0, 10);
}

test("daily progress endpoint uses strict current streak (requires activity today)", async () => {
  const originalDailyProgressFindMany = (prisma.dailyProgress as any).findMany;
  const originalSubmissionFindMany = (prisma.submission as any).findMany;
  (prisma.submission as any).findMany = async () => [];
  const today = startOfUtcDay(new Date());

  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);

  const twoDaysAgo = new Date(today);
  twoDaysAgo.setUTCDate(twoDaysAgo.getUTCDate() - 2);

  (prisma.dailyProgress as any).findMany = async (args: any) => {
    if (args?.where?.problemsSolved?.gt === 0) {
      return [
        { date: twoDaysAgo, problemsSolved: 1 },
        { date: yesterday, problemsSolved: 2 },
      ];
    }

    return [];
  };

  try {
    const request = {
      nextUrl: new URL("http://localhost:3000/api/analytics/daily-progress?days=7&streak=true"),
    } as any;

    const response = await GET(request);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.streak.currentStreak, 0);
    assert.equal(body.streak.longestStreak, 2);
    assert.equal(body.streak.isActiveToday, false);
  } finally {
    (prisma.dailyProgress as any).findMany = originalDailyProgressFindMany;
    (prisma.submission as any).findMany = originalSubmissionFindMany;
  }
});

test("daily progress endpoint includes today's row even when timestamp is not midnight", async () => {
  const originalDailyProgressFindMany = (prisma.dailyProgress as any).findMany;
  const originalSubmissionFindMany = (prisma.submission as any).findMany;
  (prisma.submission as any).findMany = async () => [];
  const now = new Date();
  const todayLateTimestamp = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    23,
    55,
    0,
    0,
  ));

  (prisma.dailyProgress as any).findMany = async () => [
    {
      date: todayLateTimestamp,
      problemsSolved: 1,
      totalTimeSpent: 840,
      patternsWorked: 1,
      mockInterviews: 0,
    },
  ];

  try {
    const request = {
      nextUrl: new URL("http://localhost:3000/api/analytics/daily-progress?days=1&streak=false"),
    } as any;

    const response = await GET(request);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.data.length, 1);
    assert.equal(body.data[0].problemsSolved, 1);
    assert.equal(body.data[0].totalTimeMinutes, 14);
    assert.equal(body.data[0].patternsWorked, 1);
  } finally {
    (prisma.dailyProgress as any).findMany = originalDailyProgressFindMany;
    (prisma.submission as any).findMany = originalSubmissionFindMany;
  }
});

test("daily progress endpoint does not shift late previous-day UTC row into today", async () => {
  const originalDailyProgressFindMany = (prisma.dailyProgress as any).findMany;
  const originalSubmissionFindMany = (prisma.submission as any).findMany;
  (prisma.submission as any).findMany = async () => [];
  const todayUtcStart = startOfUtcDay(new Date());
  const yesterdayLateUtc = new Date(todayUtcStart.getTime() - 5 * 60 * 1000);
  const yesterdayKey = toUtcDateKey(new Date(todayUtcStart.getTime() - DAY_IN_MS));
  const todayKey = toUtcDateKey(todayUtcStart);

  (prisma.dailyProgress as any).findMany = async () => [
    {
      date: yesterdayLateUtc,
      problemsSolved: 1,
      totalTimeSpent: 840,
      patternsWorked: 1,
      mockInterviews: 0,
    },
  ];

  try {
    const request = {
      nextUrl: new URL("http://localhost:3000/api/analytics/daily-progress?days=2&streak=false"),
    } as any;

    const response = await GET(request);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.data.length, 2);

    const yesterday = body.data.find((row: any) => row.date === yesterdayKey);
    const today = body.data.find((row: any) => row.date === todayKey);

    assert.ok(yesterday);
    assert.ok(today);
    assert.equal(yesterday.problemsSolved, 1);
    assert.equal(today.problemsSolved, 0);
  } finally {
    (prisma.dailyProgress as any).findMany = originalDailyProgressFindMany;
    (prisma.submission as any).findMany = originalSubmissionFindMany;
  }
});
