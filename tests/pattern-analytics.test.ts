import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateMasteryFromSignals,
  calculatePatternMetrics,
  type ProblemMetricInput,
} from "../lib/analytics/pattern-metrics";
import { calculatePatternSummary } from "../lib/analytics/pattern-summary";

test("calculatePatternMetrics uses latest submission per problem and counts solved only when latest is solved", () => {
  const problems: ProblemMetricInput[] = [
    {
      id: 1,
      patterns: [{ pattern: { id: 11, name: "Sliding Window", category: "Array" } }],
      submissions: [
        {
          status: "solved",
          timeSpentSeconds: 1200,
          wasHintUsed: true,
          submittedAt: "2026-04-01T10:00:00.000Z",
        },
        {
          status: "failed",
          timeSpentSeconds: 1500,
          wasHintUsed: false,
          submittedAt: "2026-04-02T10:00:00.000Z",
        },
      ],
    },
    {
      id: 2,
      patterns: [{ pattern: { id: 11, name: "Sliding Window", category: "Array" } }],
      submissions: [
        {
          status: "failed",
          timeSpentSeconds: 1600,
          wasHintUsed: false,
          submittedAt: "2026-04-02T11:00:00.000Z",
        },
        {
          status: "solved",
          timeSpentSeconds: 1800,
          wasHintUsed: true,
          submittedAt: "2026-04-03T11:00:00.000Z",
        },
      ],
    },
  ];

  const stats = calculatePatternMetrics(problems);
  assert.equal(stats.length, 1);

  const slidingWindow = stats[0];
  assert.equal(slidingWindow.pattern, "Sliding Window");
  assert.equal(slidingWindow.totalSolved, 1);
  assert.equal(slidingWindow.avgTimeSeconds, 1800);
  assert.equal(slidingWindow.hintUsageRate, 1);
  assert.equal(slidingWindow.confidence, "Weak");
  assert.deepEqual(slidingWindow.solvedProblemIds, [2]);
});

test("calculatePatternMetrics tracks solves per pattern without counting unsolved problems", () => {
  const problems: ProblemMetricInput[] = [
    {
      id: 1,
      patterns: [
        { pattern: { id: 21, name: "Graphs", category: "Graph" } },
        { pattern: { id: 22, name: "BFS", category: "Graph" } },
      ],
      submissions: [
        {
          status: "solved",
          timeSpentSeconds: 1400,
          wasHintUsed: false,
          submittedAt: "2026-04-01T09:00:00.000Z",
        },
      ],
    },
    {
      id: 2,
      patterns: [{ pattern: { id: 22, name: "BFS", category: "Graph" } }],
      submissions: [
        {
          status: "failed",
          timeSpentSeconds: 2000,
          wasHintUsed: true,
          submittedAt: "2026-04-01T10:00:00.000Z",
        },
      ],
    },
  ];

  const stats = calculatePatternMetrics(problems);
  const graphs = stats.find((item) => item.pattern === "Graphs");
  const bfs = stats.find((item) => item.pattern === "BFS");

  assert.ok(graphs);
  assert.ok(bfs);
  assert.equal(graphs.totalSolved, 1);
  assert.equal(bfs.totalSolved, 1);
  assert.deepEqual(bfs.solvedProblemIds, [1]);
});

test("calculatePatternSummary deduplicates solved totals and averages only active mastery", () => {
  const summary = calculatePatternSummary([
    { solved: 2, masteryPercentage: 80, solvedProblemIds: [1, 2] },
    { solved: 1, masteryPercentage: 60, solvedProblemIds: [1] },
    { solved: 0, masteryPercentage: 0, solvedProblemIds: [] },
  ]);

  assert.equal(summary.total, 3);
  assert.equal(summary.totalSolved, 2);
  assert.equal(summary.avgMastery, 70);
});

test("calculateMasteryFromSignals remains bounded and rewards speed with low hints", () => {
  assert.equal(calculateMasteryFromSignals("Strong", 15 * 60, 0.1), 95);
  assert.equal(calculateMasteryFromSignals("Weak", 45 * 60, 0.8), 15);
  assert.equal(calculateMasteryFromSignals("Medium", 25 * 60, 0.2), 55);
});
