import test from "node:test";
import assert from "node:assert/strict";

import { PUT } from "../app/api/analytics/daily-progress/route";
import { prisma } from "../lib/prisma";

test("daily progress recalculation deduplicates solved problems by problemId", async () => {
  const originalSubmissionFindMany = (prisma.submission as any).findMany;
  const originalDailyProgressFindFirst = (prisma.dailyProgress as any).findFirst;
  const originalDailyProgressCreate = (prisma.dailyProgress as any).create;
  const originalDailyProgressUpdate = (prisma.dailyProgress as any).update;

  const createCalls: any[] = [];
  const updateCalls: any[] = [];

  (prisma.submission as any).findMany = async () => [
    {
      submittedAt: new Date("2026-04-12T09:00:00.000Z"),
      problemId: 7,
      status: "solved",
      timeSpentSeconds: 1000,
      problem: {
        patterns: [{ pattern: { name: "BFS" } }],
      },
    },
    {
      submittedAt: new Date("2026-04-12T11:00:00.000Z"),
      problemId: 7,
      status: "solved",
      timeSpentSeconds: 900,
      problem: {
        patterns: [{ pattern: { name: "BFS" } }],
      },
    },
    {
      submittedAt: new Date("2026-04-12T13:00:00.000Z"),
      problemId: 9,
      status: "failed",
      timeSpentSeconds: 600,
      problem: {
        patterns: [{ pattern: { name: "Graph" } }],
      },
    },
  ];

  (prisma.dailyProgress as any).findFirst = async () => null;
  (prisma.dailyProgress as any).create = async (args: any) => {
    createCalls.push(args);
    return { id: 1, ...args.data };
  };
  (prisma.dailyProgress as any).update = async (args: any) => {
    updateCalls.push(args);
    return { id: args.where.id, ...args.data };
  };

  try {
    const request = {
      nextUrl: new URL("http://localhost:3000/api/analytics/daily-progress?days=30"),
    } as any;

    const response = await PUT(request);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.updatedDays, 1);
    assert.equal(createCalls.length, 1);
    assert.equal(updateCalls.length, 0);

    const first = createCalls[0];
    assert.equal(first.data.problemsSolved, 1);
    assert.equal(first.data.totalTimeSpent, 2500);
    assert.equal(first.data.patternsWorked, 2);
  } finally {
    (prisma.submission as any).findMany = originalSubmissionFindMany;
    (prisma.dailyProgress as any).findFirst = originalDailyProgressFindFirst;
    (prisma.dailyProgress as any).create = originalDailyProgressCreate;
    (prisma.dailyProgress as any).update = originalDailyProgressUpdate;
  }
});
