import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateMockStatsByType,
  calculateMockSummary,
  type MockSessionLike,
} from "../lib/analytics/mock-metrics";

import {
  calculateSDReadiness,
  type SDAttemptLike,
} from "../lib/analytics/system-design-metrics";
import {
  calculateBehavioralReadiness,
  type BehavioralAttemptLike,
} from "../lib/analytics/behavioral-metrics";

const session = (over: Partial<MockSessionLike>): MockSessionLike => ({
  type: "coding",
  status: "completed",
  solved: true,
  overallScore: null,
  timeTakenSeconds: null,
  ...over,
});

test("calculateMockStatsByType groups by type and counts only completed sessions", () => {
  const sessions: MockSessionLike[] = [
    session({ type: "coding", status: "completed", solved: true, overallScore: 4, timeTakenSeconds: 1800 }),
    session({ type: "coding", status: "completed", solved: false, overallScore: 2, timeTakenSeconds: 3000 }),
    session({ type: "coding", status: "inProgress" }), // ignored from completed/passed
    session({ type: "systemDesign", status: "completed", solved: true, overallScore: 5, timeTakenSeconds: 2700 }),
    session({ type: "behavioral", status: "completed", solved: true, overallScore: 3.5, timeTakenSeconds: 240 }),
  ];

  const byType = calculateMockStatsByType(sessions);
  // Always one entry per known type.
  assert.equal(byType.length, 3);

  const coding = byType.find((t) => t.type === "coding")!;
  assert.equal(coding.total, 3);
  assert.equal(coding.completed, 2);
  assert.equal(coding.passed, 1);
  assert.equal(coding.passRate, 50);
  assert.equal(coding.avgOverallScore, 3); // (4 + 2) / 2
  assert.equal(coding.avgDurationSeconds, 2400); // (1800 + 3000) / 2

  const sd = byType.find((t) => t.type === "systemDesign")!;
  assert.equal(sd.completed, 1);
  assert.equal(sd.passed, 1);
  assert.equal(sd.passRate, 100);
  assert.equal(sd.avgOverallScore, 5);

  const beh = byType.find((t) => t.type === "behavioral")!;
  assert.equal(beh.completed, 1);
  assert.equal(beh.avgOverallScore, 3.5);
});

test("empty input yields zeroed per-type stats with no divide-by-zero", () => {
  const byType = calculateMockStatsByType([]);
  assert.equal(byType.length, 3);
  for (const t of byType) {
    assert.equal(t.total, 0);
    assert.equal(t.completed, 0);
    assert.equal(t.passRate, 0);
    assert.equal(t.avgOverallScore, 0);
    assert.equal(t.avgDurationSeconds, null);
  }

  const summary = calculateMockSummary([]);
  assert.equal(summary.total, 0);
  assert.equal(summary.completed, 0);
  assert.equal(summary.passRate, 0);
});

test("calculateMockSummary aggregates across types", () => {
  const sessions: MockSessionLike[] = [
    session({ type: "coding", status: "completed", solved: true }),
    session({ type: "systemDesign", status: "completed", solved: false }),
    session({ type: "behavioral", status: "inProgress" }),
  ];
  const summary = calculateMockSummary(sessions);
  assert.equal(summary.total, 3);
  assert.equal(summary.completed, 2);
  assert.equal(summary.passed, 1);
  assert.equal(summary.passRate, 50);
});

// Invariant: mock attempts feed readiness. The readiness inputs have no `mode`
// field at all, so a mock attempt is indistinguishable from a practice attempt
// at the analytics layer — dual-writing a mode='mock' attempt moves readiness.
test("SD readiness scores attempts regardless of mode (mock feeds readiness)", () => {
  const attempts: SDAttemptLike[] = Array.from({ length: 5 }, (_, i) => ({
    questionId: i + 1,
    status: "completed",
    overallScore: 4.5,
    usedReference: false,
    submittedAt: new Date(2026, 0, i + 1),
  }));
  const readiness = calculateSDReadiness(attempts);
  assert.equal(readiness.breakdown.strongDesigns, 5);
  assert.ok(readiness.score > 0);
});

test("Behavioral readiness scores attempts regardless of mode (mock feeds readiness)", () => {
  const attempts: BehavioralAttemptLike[] = Array.from({ length: 5 }, (_, i) => ({
    questionId: i + 1,
    status: "completed",
    overallScore: 4.5,
    usedNotes: false,
    submittedAt: new Date(2026, 0, i + 1),
    competencyNames: [],
  }));
  const readiness = calculateBehavioralReadiness(attempts);
  assert.equal(readiness.breakdown.strongAnswers, 5);
  assert.ok(readiness.score > 0);
});
