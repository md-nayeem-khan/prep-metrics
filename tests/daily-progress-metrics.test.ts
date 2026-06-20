import test from "node:test";
import assert from "node:assert/strict";

import { calculateDailyProgressSnapshot } from "../lib/analytics/daily-progress-metrics";

test("calculateDailyProgressSnapshot counts unique solved problems and unique patterns", () => {
  const snapshot = calculateDailyProgressSnapshot([
    {
      problemId: 10,
      status: "solved",
      timeSpentSeconds: 1200,
      problem: {
        patterns: [
          { pattern: { name: "Sliding Window" } },
          { pattern: { name: "Hash Map" } },
        ],
      },
    },
    {
      problemId: 10,
      status: "solved",
      timeSpentSeconds: 900,
      problem: {
        patterns: [{ pattern: { name: "Sliding Window" } }],
      },
    },
    {
      problemId: 20,
      status: "failed",
      timeSpentSeconds: 600,
      problem: {
        patterns: [{ pattern: { name: "Two Pointers" } }],
      },
    },
    {
      problemId: 30,
      status: "solved",
      timeSpentSeconds: 1500,
      problem: {
        patterns: [{ pattern: { name: "Two Pointers" } }],
      },
    },
  ]);

  assert.equal(snapshot.problemsSolved, 2);
  assert.equal(snapshot.totalTimeSpent, 4200);
  assert.equal(snapshot.patternsWorked, 3);
});
