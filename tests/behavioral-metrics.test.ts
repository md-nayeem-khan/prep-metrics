import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateBehavioralOverallScore,
  calculateBehavioralConfidence,
  calculateBehavioralReadiness,
  calculateCompetencyCoverage,
  calculateStoryBankHealth,
  type BehavioralAttemptLike,
  type CompetencyInput,
  type StoryInput,
} from "../lib/analytics/behavioral-metrics";

test("calculateBehavioralOverallScore weights Action+Result and rewards quantified results", () => {
  // All 4s -> mean 4.
  const base = calculateBehavioralOverallScore({
    situationScore: 4,
    taskScore: 4,
    actionScore: 4,
    resultScore: 4,
    structureScore: 4,
    signalScore: 4,
  });
  assert.equal(base, 4);

  // Quantified result adds a small bonus.
  const quantified = calculateBehavioralOverallScore({
    situationScore: 4,
    taskScore: 4,
    actionScore: 4,
    resultScore: 4,
    structureScore: 4,
    signalScore: 4,
    resultQuantified: true,
  });
  assert.equal(quantified, 4.25);

  // Strong Action+Result pulls the weighted mean above a flat average.
  const actionHeavy = calculateBehavioralOverallScore({
    situationScore: 2,
    taskScore: 2,
    actionScore: 5,
    resultScore: 5,
    structureScore: 2,
    signalScore: 5,
  });
  assert.ok((actionHeavy as number) > 3.5);

  assert.equal(calculateBehavioralOverallScore({}), null);
});

test("calculateBehavioralConfidence keys off score and notes dependence", () => {
  assert.equal(calculateBehavioralConfidence(4.2, 0.1), "Strong");
  assert.equal(calculateBehavioralConfidence(2.0, 0), "Weak");
  assert.equal(calculateBehavioralConfidence(3.4, 0.3), "Medium");
});

test("calculateBehavioralReadiness caps small samples and credits assisted answers", () => {
  const strong: BehavioralAttemptLike[] = Array.from({ length: 5 }, (_, i) => ({
    questionId: i + 1,
    status: "completed",
    overallScore: 4.3,
    usedNotes: false,
    submittedAt: `2026-05-0${i + 1}T10:00:00.000Z`,
    competencyNames: ["Ownership"],
  }));

  const ready = calculateBehavioralReadiness(strong);
  assert.equal(ready.score, 1);
  assert.equal(ready.level, "Ready");

  const small = calculateBehavioralReadiness(strong.slice(0, 3));
  assert.ok(small.score < 0.8);
});

test("calculateCompetencyCoverage classifies Strong / Developing / Gap", () => {
  const competencies: CompetencyInput[] = [
    { name: "Ownership", type: "LeadershipPrinciple", company: "Amazon" },
    { name: "Dive Deep", type: "LeadershipPrinciple", company: "Amazon" },
    { name: "Bias for Action", type: "LeadershipPrinciple", company: "Amazon" },
  ];

  const stories: StoryInput[] = [
    { id: 1, strengthRating: 5, competencyNames: ["Ownership"] },
    { id: 2, strengthRating: 3, competencyNames: ["Dive Deep"] },
  ];

  const attempts: BehavioralAttemptLike[] = [
    {
      questionId: 10,
      status: "completed",
      overallScore: 4.5,
      usedNotes: false,
      submittedAt: "2026-05-05T10:00:00.000Z",
      competencyNames: ["Ownership"],
    },
  ];

  const coverage = calculateCompetencyCoverage(competencies, stories, attempts);
  const byName = Object.fromEntries(coverage.map((c) => [c.competency, c]));

  assert.equal(byName["Ownership"].status, "Strong"); // strong story + strong practice
  assert.equal(byName["Dive Deep"].status, "Developing"); // weak story, no practice
  assert.equal(byName["Bias for Action"].status, "Gap"); // nothing maps
});

test("calculateStoryBankHealth reports reuse and competency gaps", () => {
  const competencies: CompetencyInput[] = [
    { name: "Ownership", type: "LeadershipPrinciple", company: "Amazon" },
    { name: "Bias for Action", type: "LeadershipPrinciple", company: "Amazon" },
    { name: "Dive Deep", type: "LeadershipPrinciple", company: "Amazon" },
  ];

  const stories: StoryInput[] = [
    { id: 1, strengthRating: 5, competencyNames: ["Ownership", "Bias for Action"] },
    { id: 2, strengthRating: 3, competencyNames: ["Ownership"] },
  ];

  const health = calculateStoryBankHealth(competencies, stories);
  assert.equal(health.storyCount, 2);
  assert.equal(health.strongStoryCount, 1);
  assert.equal(health.avgCompetenciesPerStory, 1.5);
  assert.equal(health.coveredCompetencies, 2);
  assert.equal(health.totalCompetencies, 3);
  assert.deepEqual(health.gapCompetencies, ["Dive Deep"]);
});
