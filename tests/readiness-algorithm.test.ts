import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateReadinessScore,
  getLatestSubmissionsPerProblem,
  getReadinessLevel,
  READINESS_READY_THRESHOLD,
} from "../types";

test("getLatestSubmissionsPerProblem keeps only latest submission per problem", () => {
  const latest = getLatestSubmissionsPerProblem([
    {
      problemId: 101,
      status: "solved",
      timeSpentSeconds: 600,
      wasHintUsed: false,
      submittedAt: new Date("2026-04-10T10:00:00.000Z"),
    },
    {
      problemId: 101,
      status: "failed",
      timeSpentSeconds: 900,
      wasHintUsed: true,
      submittedAt: new Date("2026-04-11T10:00:00.000Z"),
    },
    {
      problemId: 202,
      status: "solved",
      timeSpentSeconds: 1200,
      wasHintUsed: false,
      submittedAt: new Date("2026-04-09T10:00:00.000Z"),
    },
  ] as any);

  assert.equal(latest.length, 2);
  assert.equal(latest[0].problemId, 101);
  assert.equal(latest[0].status, "failed");
  assert.equal(latest[1].problemId, 202);
});

test("getLatestSubmissionsPerProblem ignores submissions without a problem identity", () => {
  const latest = getLatestSubmissionsPerProblem([
    {
      status: "solved",
      timeSpentSeconds: 600,
      wasHintUsed: false,
      submittedAt: new Date("2026-04-10T10:00:00.000Z"),
    },
    {
      status: "failed",
      timeSpentSeconds: 900,
      wasHintUsed: true,
      submittedAt: new Date("2026-04-11T10:00:00.000Z"),
    },
    {
      problemId: 303,
      status: "solved",
      timeSpentSeconds: 1200,
      wasHintUsed: false,
      submittedAt: new Date("2026-04-09T10:00:00.000Z"),
    },
  ] as any);

  assert.equal(latest.length, 1);
  assert.equal(latest[0].problemId, 303);
});

test("calculateReadinessScore uses latest submission and difficulty-aware pace", () => {
  const score = calculateReadinessScore([
    {
      problemId: 1,
      status: "solved",
      timeSpentSeconds: 14 * 60,
      wasHintUsed: false,
      submittedAt: new Date("2026-04-10T10:00:00.000Z"),
      problem: { difficulty: "easy" },
    },
    {
      problemId: 1,
      status: "solved",
      timeSpentSeconds: 20 * 60,
      wasHintUsed: false,
      submittedAt: new Date("2026-04-12T10:00:00.000Z"),
      problem: { difficulty: "easy" },
    },
    {
      problemId: 2,
      status: "solved",
      timeSpentSeconds: 35 * 60,
      wasHintUsed: false,
      submittedAt: new Date("2026-04-12T11:00:00.000Z"),
      problem: { difficulty: "hard" },
    },
    {
      problemId: 3,
      status: "failed",
      timeSpentSeconds: 30 * 60,
      wasHintUsed: true,
      submittedAt: new Date("2026-04-12T12:00:00.000Z"),
      problem: { difficulty: "medium" },
    },
  ] as any);

  assert.equal(score.breakdown.totalProblems, 3);
  assert.equal(score.breakdown.perfectSolves, 1);
  assert.equal(score.breakdown.hintedSolves, 1);
  assert.equal(score.breakdown.failed, 1);
  assert.equal(score.score, 0.5);
  assert.equal(score.level, "Not Ready");
});

test("calculateReadinessScore caps ready status for very small samples", () => {
  const score = calculateReadinessScore([
    {
      problemId: 99,
      status: "solved",
      timeSpentSeconds: 10 * 60,
      wasHintUsed: false,
      submittedAt: new Date("2026-04-12T10:00:00.000Z"),
      problem: { difficulty: "easy" },
    },
  ] as any);

  assert.ok(score.score < READINESS_READY_THRESHOLD);
  assert.equal(score.level, "Almost Ready");
  assert.equal(getReadinessLevel(score.score), "Almost Ready");
});
