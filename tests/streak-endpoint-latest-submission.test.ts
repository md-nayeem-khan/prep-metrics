import test from "node:test";
import assert from "node:assert/strict";

import { GET } from "../app/api/analytics/streak/route";
import { prisma } from "../lib/prisma";

test("streak endpoint weekly stats use latest submission per problem", async () => {
  const originalSubmissionFindMany = (prisma.submission as any).findMany;

  (prisma.submission as any).findMany = async (args: any) => {
    // First call in GET: solved submissions for streak/calendar.
    if (args?.where?.status === "solved") {
      return [
        {
          submittedAt: new Date("2026-04-12T10:00:00.000Z"),
          timeSpentSeconds: 1000,
        },
      ];
    }

    // Second call in getWeeklyStats: all weekly submissions with problem data.
    return [
      {
        problemId: 1,
        status: "solved",
        timeSpentSeconds: 1200,
        submittedAt: new Date("2026-04-10T10:00:00.000Z"),
        problem: {
          patterns: [{ pattern: { name: "Hash Map" } }],
        },
      },
      {
        problemId: 1,
        status: "failed",
        timeSpentSeconds: 2400,
        submittedAt: new Date("2026-04-11T10:00:00.000Z"),
        problem: {
          patterns: [{ pattern: { name: "Hash Map" } }],
        },
      },
      {
        problemId: 2,
        status: "solved",
        timeSpentSeconds: 1800,
        submittedAt: new Date("2026-04-12T12:00:00.000Z"),
        problem: {
          patterns: [{ pattern: { name: "Two Pointers" } }],
        },
      },
    ];
  };

  try {
    const request = {
      url: "http://localhost:3000/api/analytics/streak?days=30",
    } as any;

    const response = await GET(request);
    const body = await response.json();

    assert.equal(response.status, 200);

    // Latest per problem keeps: problem 1 failed(2400), problem 2 solved(1800)
    assert.equal(body.weeklyStats.totalTimeSpent, 4200);
    assert.equal(body.weeklyStats.problemsSolved, 1);
    assert.equal(body.weeklyStats.avgTimePerProblem, 1800);
    assert.equal(body.weeklyStats.patternsWorked, 2);
  } finally {
    (prisma.submission as any).findMany = originalSubmissionFindMany;
  }
});
