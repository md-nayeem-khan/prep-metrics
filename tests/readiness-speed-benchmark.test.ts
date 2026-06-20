import test from "node:test";
import assert from "node:assert/strict";

import { GET } from "../app/api/analytics/readiness/route";
import { prisma } from "../lib/prisma";

test("readiness endpoint matches speed benchmark with case-insensitive difficulty", async () => {
  const originalSubmissionFindMany = (prisma.submission as any).findMany;

  (prisma.submission as any).findMany = async () => [
    {
      id: 1,
      status: "solved",
      attemptType: "First",
      wasHintUsed: false,
      timeSpentSeconds: 1200,
      patternRecognitionSeconds: 50,
      notes: null,
      mistakeNote: null,
      approachNote: null,
      submittedAt: new Date("2026-04-12T10:00:00.000Z"),
      problem: {
        difficulty: "Medium",
        source: "neetcode150",
        title: "Sample",
        platform: "leetcode",
        problemId: "123",
      },
    },
  ];

  try {
    const request = {
      nextUrl: new URL("http://localhost:3000/api/analytics/readiness"),
    } as any;

    const response = await GET(request);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.breakdown.onPace, 1);
    assert.equal(body.metrics.speedScore, 1);
  } finally {
    (prisma.submission as any).findMany = originalSubmissionFindMany;
  }
});
