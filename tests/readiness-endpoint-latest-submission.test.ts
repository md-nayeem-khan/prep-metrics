import test from "node:test";
import assert from "node:assert/strict";

import { GET } from "../app/api/analytics/readiness/route";
import { prisma } from "../lib/prisma";

test("readiness endpoint uses latest submission per problem for score and metrics", async () => {
  const originalSubmissionFindMany = (prisma.submission as any).findMany;

  (prisma.submission as any).findMany = async () => [
    {
      id: 1,
      problemId: 11,
      status: "solved",
      attemptType: "First",
      wasHintUsed: false,
      timeSpentSeconds: 12 * 60,
      patternRecognitionSeconds: 45,
      notes: null,
      mistakeNote: null,
      approachNote: null,
      submittedAt: new Date("2026-04-10T10:00:00.000Z"),
      problem: {
        difficulty: "Easy",
        source: "neetcode150",
        title: "Problem A",
        platform: "leetcode",
        problemId: "11",
      },
    },
    {
      id: 2,
      problemId: 11,
      status: "failed",
      attemptType: "Revision",
      wasHintUsed: true,
      timeSpentSeconds: 20 * 60,
      patternRecognitionSeconds: 70,
      notes: null,
      mistakeNote: null,
      approachNote: null,
      submittedAt: new Date("2026-04-12T10:00:00.000Z"),
      problem: {
        difficulty: "Easy",
        source: "neetcode150",
        title: "Problem A",
        platform: "leetcode",
        problemId: "11",
      },
    },
    {
      id: 3,
      problemId: 22,
      status: "solved",
      attemptType: "First",
      wasHintUsed: false,
      timeSpentSeconds: 35 * 60,
      patternRecognitionSeconds: 80,
      notes: null,
      mistakeNote: null,
      approachNote: null,
      submittedAt: new Date("2026-04-12T11:00:00.000Z"),
      problem: {
        difficulty: "Hard",
        source: "neetcode150",
        title: "Problem B",
        platform: "leetcode",
        problemId: "22",
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
    assert.equal(body.metrics.totalProblems, 2);
    assert.equal(body.metrics.solvedProblems, 1);
    assert.equal(body.metrics.failedProblems, 1);
    assert.equal(body.readinessScore.breakdown.totalProblems, 2);
    assert.equal(body.readinessScore.score, 0.5);
    assert.equal(body.readinessScore.level, "Not Ready");
  } finally {
    (prisma.submission as any).findMany = originalSubmissionFindMany;
  }
});

test("readiness endpoint treats unknown difficulty as medium for speed and bucket stats", async () => {
  const originalSubmissionFindMany = (prisma.submission as any).findMany;

  (prisma.submission as any).findMany = async () => [
    {
      id: 1,
      problemId: 99,
      status: "solved",
      attemptType: "First",
      wasHintUsed: false,
      timeSpentSeconds: 20 * 60,
      patternRecognitionSeconds: 50,
      notes: null,
      mistakeNote: null,
      approachNote: null,
      submittedAt: new Date("2026-04-12T10:00:00.000Z"),
      problem: {
        difficulty: "Expert",
        source: "neetcode150",
        title: "Problem X",
        platform: "leetcode",
        problemId: "99",
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
    assert.equal(body.byDifficulty.medium.total, 1);
    assert.equal(body.byDifficulty.medium.solved, 1);
    assert.equal(body.byDifficulty.medium.avgTimeMinutes, 20);
    assert.equal(body.breakdown.onPace, 1);
    assert.equal(body.metrics.speedScore, 1);
  } finally {
    (prisma.submission as any).findMany = originalSubmissionFindMany;
  }
});
