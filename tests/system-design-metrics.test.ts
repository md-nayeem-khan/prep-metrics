import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateSDOverallScore,
  calculateSDConfidence,
  calculateSDMastery,
  calculateSDReadiness,
  calculateSDTopicMetrics,
  getLatestAttemptsPerQuestion,
  type SDAttemptLike,
  type SDQuestionMetricInput,
} from "../lib/analytics/system-design-metrics";

test("calculateSDOverallScore returns the weighted mean and ignores blank dimensions", () => {
  // All dimensions equal -> weighted mean equals that value.
  assert.equal(
    calculateSDOverallScore({
      requirementsScore: 4,
      estimationScore: 4,
      highLevelDesignScore: 4,
      dataModelApiScore: 4,
      deepDiveScore: 4,
      scalabilityScore: 4,
      tradeoffScore: 4,
      communicationScore: 4,
    }),
    4
  );

  // Only weighted dimensions rated -> still a fair mean over what was rated.
  assert.equal(
    calculateSDOverallScore({ highLevelDesignScore: 5, deepDiveScore: 5 }),
    5
  );

  assert.equal(calculateSDOverallScore({}), null);
});

test("calculateSDConfidence keys off avg score and reference dependence", () => {
  assert.equal(calculateSDConfidence(4.2, 0.1), "Strong");
  assert.equal(calculateSDConfidence(2.5, 0), "Weak");
  assert.equal(calculateSDConfidence(4.5, 0.5), "Weak"); // high reference usage caps it
  assert.equal(calculateSDConfidence(3.5, 0.3), "Medium");
});

test("calculateSDMastery stays bounded and rewards strong, reference-free designs", () => {
  assert.equal(calculateSDMastery("Strong", 4.8, 0.0), 95);
  assert.equal(calculateSDMastery("Weak", 2.0, 0.8), 15);
  assert.equal(calculateSDMastery("Medium", 3.5, 0.3), 55);
});

test("getLatestAttemptsPerQuestion keeps only the most recent attempt per question", () => {
  const attempts: SDAttemptLike[] = [
    { questionId: 1, status: "completed", overallScore: 2, usedReference: true, submittedAt: "2026-05-01T10:00:00.000Z" },
    { questionId: 1, status: "completed", overallScore: 4.5, usedReference: false, submittedAt: "2026-05-10T10:00:00.000Z" },
    { questionId: 2, status: "completed", overallScore: 3, usedReference: false, submittedAt: "2026-05-02T10:00:00.000Z" },
  ];

  const latest = getLatestAttemptsPerQuestion(attempts);
  assert.equal(latest.length, 2);
  const q1 = latest.find((a) => a.questionId === 1)!;
  assert.equal(q1.overallScore, 4.5);
});

test("calculateSDReadiness scores strong/assisted/weak designs and caps small samples", () => {
  const strongAttempts: SDAttemptLike[] = Array.from({ length: 5 }, (_, i) => ({
    questionId: i + 1,
    status: "completed",
    overallScore: 4.4,
    usedReference: false,
    submittedAt: `2026-05-0${i + 1}T10:00:00.000Z`,
  }));

  const ready = calculateSDReadiness(strongAttempts);
  assert.equal(ready.score, 1);
  assert.equal(ready.level, "Ready");
  assert.equal(ready.breakdown.strongDesigns, 5);

  // Fewer than the min sample size is capped below the "Ready" threshold.
  const small = calculateSDReadiness(strongAttempts.slice(0, 3));
  assert.ok(small.score < 0.8);
  assert.equal(small.level, "Almost Ready");

  // Assisted (used reference) earns partial credit; weak/abandoned earns none.
  const mixed: SDAttemptLike[] = [
    { questionId: 1, status: "completed", overallScore: 4.5, usedReference: true, submittedAt: "2026-05-01T10:00:00.000Z" },
    { questionId: 2, status: "abandoned", overallScore: null, usedReference: false, submittedAt: "2026-05-02T10:00:00.000Z" },
  ];
  const mixedScore = calculateSDReadiness(mixed);
  assert.equal(mixedScore.breakdown.assistedDesigns, 1);
  assert.equal(mixedScore.breakdown.weakDesigns, 1);
  assert.equal(mixedScore.score, 0.25); // (1 + 0) / 4
});

test("calculateSDTopicMetrics aggregates latest attempts per topic", () => {
  const questions: SDQuestionMetricInput[] = [
    {
      id: 1,
      topics: [
        { topic: { name: "Caching", category: "Storage" } },
        { topic: { name: "Sharding", category: "Storage" } },
      ],
      attempts: [
        { status: "completed", overallScore: 2, usedReference: true, submittedAt: "2026-05-01T10:00:00.000Z" },
        { status: "completed", overallScore: 4.5, usedReference: false, submittedAt: "2026-05-09T10:00:00.000Z" },
      ],
    },
    {
      id: 2,
      topics: [{ topic: { name: "Caching", category: "Storage" } }],
      attempts: [], // never attempted -> counts toward total, not attempted
    },
  ];

  const metrics = calculateSDTopicMetrics(questions);
  const caching = metrics.find((m) => m.topic === "Caching")!;
  assert.equal(caching.totalQuestions, 2);
  assert.equal(caching.attempted, 1);
  assert.equal(caching.avgOverallScore, 4.5);
  assert.equal(caching.referenceUsageRate, 0);
  assert.equal(caching.confidence, "Strong");
});
