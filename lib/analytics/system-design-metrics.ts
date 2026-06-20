// SYSTEM DESIGN ANALYTICS ENGINE
// Rubric-driven analogs of the coding-track analytics (types/index.ts,
// lib/analytics/pattern-metrics.ts). Pure functions, unit-tested with node:test.

import {
  getReadinessLevel,
  READINESS_MIN_SAMPLE_SIZE,
  READINESS_READY_THRESHOLD,
  type Confidence,
} from "@/types";
import {
  SD_RUBRIC_WEIGHTS,
  type SDRubric,
  type SDRubricKey,
  type SystemDesignReadinessScore,
  type SDTopicStats,
} from "@/types/system-design";

const RUBRIC_KEYS = Object.keys(SD_RUBRIC_WEIGHTS) as SDRubricKey[];

const round2 = (value: number): number => Math.round(value * 100) / 100;

/**
 * Weighted mean of the provided rubric dimensions (1-5). Dimensions left blank
 * (null/undefined/0) are excluded so partial self-ratings still yield a fair
 * score. Returns null when nothing was rated.
 */
export function calculateSDOverallScore(rubric: SDRubric): number | null {
  let weightedSum = 0;
  let weightTotal = 0;

  for (const key of RUBRIC_KEYS) {
    const value = rubric[key];
    if (typeof value === "number" && value > 0) {
      weightedSum += value * SD_RUBRIC_WEIGHTS[key];
      weightTotal += SD_RUBRIC_WEIGHTS[key];
    }
  }

  if (weightTotal === 0) return null;
  return round2(weightedSum / weightTotal);
}

/**
 * Confidence from rubric signal — analogous to calculatePatternConfidence but
 * driven by the average overall score and how often a reference outline was used.
 */
export function calculateSDConfidence(avgOverallScore: number, referenceUsageRate: number): Confidence {
  if (avgOverallScore < 3 || referenceUsageRate > 0.4) return "Weak";
  if (avgOverallScore >= 4 && referenceUsageRate < 0.2) return "Strong";
  return "Medium";
}

/**
 * Mastery 0-100 — mirrors calculateMasteryFromSignals (base by confidence,
 * bonus/penalty for score and reference dependence).
 */
export function calculateSDMastery(
  confidence: Confidence,
  avgOverallScore: number,
  referenceUsageRate: number
): number {
  let base = confidence === "Strong" ? 80 : confidence === "Medium" ? 55 : 30;

  if (avgOverallScore >= 4.5) base += 10;
  else if (avgOverallScore < 2.5) base -= 10;

  if (referenceUsageRate < 0.15) base += 5;
  else if (referenceUsageRate > 0.4) base -= 5;

  return Math.min(100, Math.max(0, base));
}

export interface SDAttemptLike {
  questionId: number;
  status: string;
  overallScore: number | null;
  usedReference: boolean;
  submittedAt: Date | string;
}

export function getLatestAttemptsPerQuestion<T extends { questionId: number; submittedAt: Date | string }>(
  attempts: T[]
): T[] {
  const latest = new Map<number, T>();

  for (const attempt of attempts) {
    const existing = latest.get(attempt.questionId);
    if (
      !existing ||
      new Date(attempt.submittedAt).getTime() > new Date(existing.submittedAt).getTime()
    ) {
      latest.set(attempt.questionId, attempt);
    }
  }

  return Array.from(latest.values()).sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

/**
 * Readiness from the latest attempt per question — reuses the coding-track
 * thresholds and small-sample cap. A "strong design" (overall >= 4, no
 * reference) is worth 2 points; an assisted design (overall >= 3) 1 point.
 */
export function calculateSDReadinessFromLatestAttempts(
  latestAttempts: SDAttemptLike[]
): SystemDesignReadinessScore {
  let totalScore = 0;
  const maxScore = latestAttempts.length * 2;

  let strongDesigns = 0;
  let assistedDesigns = 0;
  let weakDesigns = 0;

  for (const attempt of latestAttempts) {
    const overall = attempt.overallScore ?? 0;
    // Only fully completed designs earn readiness credit (mirrors coding's solved-only credit);
    // partial/abandoned attempts count as weak regardless of partial rubric scores.
    const completed = attempt.status === "completed";

    if (completed && overall >= 4 && !attempt.usedReference) {
      totalScore += 2;
      strongDesigns++;
    } else if (completed && overall >= 3) {
      totalScore += 1;
      assistedDesigns++;
    } else {
      weakDesigns++;
    }
  }

  const rawScore = maxScore === 0 ? 0 : totalScore / maxScore;
  const score =
    latestAttempts.length < READINESS_MIN_SAMPLE_SIZE
      ? Math.min(rawScore, READINESS_READY_THRESHOLD - 0.01)
      : rawScore;

  return {
    score,
    level: getReadinessLevel(score),
    breakdown: {
      totalQuestions: latestAttempts.length,
      strongDesigns,
      assistedDesigns,
      weakDesigns,
    },
  };
}

export function calculateSDReadiness(attempts: SDAttemptLike[]): SystemDesignReadinessScore {
  return calculateSDReadinessFromLatestAttempts(getLatestAttemptsPerQuestion(attempts));
}

export interface SDQuestionMetricInput {
  id: number;
  topics: Array<{ topic: { name: string; category: string } }>;
  attempts: Array<{
    status: string;
    overallScore: number | null;
    usedReference: boolean;
    submittedAt: Date | string;
  }>;
}

function getLatestScoredAttempt(
  attempts: SDQuestionMetricInput["attempts"]
): SDQuestionMetricInput["attempts"][number] | null {
  if (attempts.length === 0) return null;
  return attempts.reduce((latest, current) =>
    new Date(current.submittedAt).getTime() > new Date(latest.submittedAt).getTime() ? current : latest
  );
}

/**
 * Per building-block topic metrics — analogous to calculatePatternMetrics.
 * Uses the latest attempt per question; a question counts as "attempted" for a
 * topic only when its latest attempt was scored and not abandoned.
 */
export function calculateSDTopicMetrics(
  questions: SDQuestionMetricInput[],
  minQuestions = 1
): SDTopicStats[] {
  const topicMap = new Map<
    string,
    {
      name: string;
      category: string;
      questionIds: Set<number>;
      attemptedQuestionIds: Set<number>;
      scored: Array<{ overallScore: number; usedReference: boolean }>;
    }
  >();

  for (const question of questions) {
    const latest = getLatestScoredAttempt(question.attempts);

    for (const relation of question.topics) {
      const { name, category } = relation.topic;

      if (!topicMap.has(name)) {
        topicMap.set(name, {
          name,
          category,
          questionIds: new Set<number>(),
          attemptedQuestionIds: new Set<number>(),
          scored: [],
        });
      }

      const data = topicMap.get(name)!;
      data.questionIds.add(question.id);

      if (latest && latest.overallScore != null && latest.status !== "abandoned") {
        data.attemptedQuestionIds.add(question.id);
        data.scored.push({ overallScore: latest.overallScore, usedReference: latest.usedReference });
      }
    }
  }

  const results: SDTopicStats[] = [];

  for (const data of topicMap.values()) {
    if (data.questionIds.size < minQuestions) continue;

    const attempted = data.attemptedQuestionIds.size;
    const avgOverallScore =
      attempted > 0 ? data.scored.reduce((sum, s) => sum + s.overallScore, 0) / attempted : 0;
    const referenceUsageRate =
      attempted > 0 ? data.scored.filter((s) => s.usedReference).length / attempted : 0;
    const confidence =
      attempted > 0 ? calculateSDConfidence(avgOverallScore, referenceUsageRate) : "Weak";
    const masteryPercentage =
      attempted > 0 ? calculateSDMastery(confidence, avgOverallScore, referenceUsageRate) : 0;

    results.push({
      topic: data.name,
      category: data.category,
      totalQuestions: data.questionIds.size,
      attempted,
      avgOverallScore: round2(avgOverallScore),
      referenceUsageRate,
      confidence,
      masteryPercentage,
      questionIds: Array.from(data.questionIds),
      attemptedQuestionIds: Array.from(data.attemptedQuestionIds),
    });
  }

  return results.sort((a, b) => b.masteryPercentage - a.masteryPercentage || a.topic.localeCompare(b.topic));
}
