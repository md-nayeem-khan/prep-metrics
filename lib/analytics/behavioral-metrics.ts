// BEHAVIORAL ANALYTICS ENGINE
// STAR-rubric scoring plus the signature behavioral analytic: competency /
// leadership-principle coverage backed by a reusable STAR story bank.
// Pure functions, unit-tested with node:test.

import {
  getReadinessLevel,
  READINESS_MIN_SAMPLE_SIZE,
  READINESS_READY_THRESHOLD,
  type Confidence,
} from "@/types";
import {
  STAR_RUBRIC_WEIGHTS,
  RESULT_QUANTIFIED_BONUS,
  STORY_STRENGTH_STRONG,
  BEHAVIORAL_STRONG_SCORE,
  type STARRubric,
  type STARRubricKey,
  type CoverageStatus,
  type CompetencyCoverage,
  type StoryBankHealth,
  type BehavioralReadinessScore,
} from "@/types/behavioral";

const STAR_KEYS = Object.keys(STAR_RUBRIC_WEIGHTS) as STARRubricKey[];

const round2 = (value: number): number => Math.round(value * 100) / 100;

/**
 * Weighted mean of the STAR rubric (1-5), with a small bonus when the result
 * was quantified. Blank dimensions are excluded. Returns null when nothing rated.
 */
export function calculateBehavioralOverallScore(rubric: STARRubric): number | null {
  let weightedSum = 0;
  let weightTotal = 0;

  for (const key of STAR_KEYS) {
    const value = rubric[key];
    if (typeof value === "number" && value > 0) {
      weightedSum += value * STAR_RUBRIC_WEIGHTS[key];
      weightTotal += STAR_RUBRIC_WEIGHTS[key];
    }
  }

  if (weightTotal === 0) return null;

  let score = weightedSum / weightTotal;
  if (rubric.resultQuantified) {
    score = Math.min(5, score + RESULT_QUANTIFIED_BONUS);
  }

  return round2(score);
}

export function calculateBehavioralConfidence(avgOverallScore: number, notesUsageRate: number): Confidence {
  if (avgOverallScore < 3 || notesUsageRate > 0.4) return "Weak";
  if (avgOverallScore >= 4 && notesUsageRate < 0.2) return "Strong";
  return "Medium";
}

export function calculateBehavioralMastery(
  confidence: Confidence,
  avgOverallScore: number,
  notesUsageRate: number
): number {
  let base = confidence === "Strong" ? 80 : confidence === "Medium" ? 55 : 30;

  if (avgOverallScore >= 4.5) base += 10;
  else if (avgOverallScore < 2.5) base -= 10;

  if (notesUsageRate < 0.15) base += 5;
  else if (notesUsageRate > 0.4) base -= 5;

  return Math.min(100, Math.max(0, base));
}

export interface BehavioralAttemptLike {
  questionId: number;
  status: string;
  overallScore: number | null;
  usedNotes: boolean;
  submittedAt: Date | string;
  competencyNames: string[];
}

export function getLatestBehavioralAttemptsPerQuestion<
  T extends { questionId: number; submittedAt: Date | string }
>(attempts: T[]): T[] {
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

export function calculateBehavioralReadinessFromLatestAttempts(
  latestAttempts: BehavioralAttemptLike[]
): BehavioralReadinessScore {
  let totalScore = 0;
  const maxScore = latestAttempts.length * 2;

  let strongAnswers = 0;
  let assistedAnswers = 0;
  let weakAnswers = 0;

  for (const attempt of latestAttempts) {
    const overall = attempt.overallScore ?? 0;
    // Only fully completed answers earn readiness credit (mirrors coding's solved-only credit);
    // partial/abandoned attempts count as weak regardless of partial rubric scores.
    const completed = attempt.status === "completed";

    if (completed && overall >= 4 && !attempt.usedNotes) {
      totalScore += 2;
      strongAnswers++;
    } else if (completed && overall >= 3) {
      totalScore += 1;
      assistedAnswers++;
    } else {
      weakAnswers++;
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
      strongAnswers,
      assistedAnswers,
      weakAnswers,
    },
  };
}

export function calculateBehavioralReadiness(
  attempts: BehavioralAttemptLike[]
): BehavioralReadinessScore {
  return calculateBehavioralReadinessFromLatestAttempts(
    getLatestBehavioralAttemptsPerQuestion(attempts)
  );
}

export interface CompetencyInput {
  name: string;
  type: string;
  company: string | null;
}

export interface StoryInput {
  id: number;
  strengthRating: number | null;
  competencyNames: string[];
}

/**
 * Competency / leadership-principle coverage — the signature behavioral analytic.
 * A competency is:
 *  - "Strong"     when a strong story (strength >= 4) maps to it AND it has been
 *                 practiced to a strong average score (overall >= 4),
 *  - "Developing" when there is some story or practice evidence below that bar,
 *  - "Gap"        when no story maps to it.
 */
export function calculateCompetencyCoverage(
  competencies: CompetencyInput[],
  stories: StoryInput[],
  attempts: BehavioralAttemptLike[]
): CompetencyCoverage[] {
  const latestAttempts = getLatestBehavioralAttemptsPerQuestion(attempts);

  return competencies.map((competency) => {
    const mappedStories = stories.filter((story) =>
      story.competencyNames.includes(competency.name)
    );
    const storyCount = mappedStories.length;
    const strongStoryCount = mappedStories.filter(
      (story) => (story.strengthRating ?? 0) >= STORY_STRENGTH_STRONG
    ).length;
    const bestStoryStrength = mappedStories.reduce(
      (max, story) => Math.max(max, story.strengthRating ?? 0),
      0
    );

    const relevantAttempts = latestAttempts.filter(
      (attempt) =>
        attempt.competencyNames.includes(competency.name) &&
        attempt.overallScore != null &&
        attempt.status !== "abandoned"
    );
    const practiceCount = relevantAttempts.length;
    const avgOverallScore =
      practiceCount > 0
        ? round2(
            relevantAttempts.reduce((sum, a) => sum + (a.overallScore as number), 0) / practiceCount
          )
        : 0;

    let status: CoverageStatus;
    if (strongStoryCount >= 1 && practiceCount >= 1 && avgOverallScore >= BEHAVIORAL_STRONG_SCORE) {
      status = "Strong";
    } else if (storyCount >= 1 || practiceCount >= 1) {
      status = "Developing";
    } else {
      status = "Gap";
    }

    return {
      competency: competency.name,
      type: competency.type,
      company: competency.company,
      status,
      storyCount,
      strongStoryCount,
      bestStoryStrength,
      practiceCount,
      avgOverallScore,
    };
  });
}

/**
 * Story-bank health: size, strength, reusability (competencies per story), and
 * which competencies have no story mapped (the gaps to write next).
 */
export function calculateStoryBankHealth(
  competencies: CompetencyInput[],
  stories: StoryInput[]
): StoryBankHealth {
  const storyCount = stories.length;
  const strongStoryCount = stories.filter(
    (story) => (story.strengthRating ?? 0) >= STORY_STRENGTH_STRONG
  ).length;

  const totalMappings = stories.reduce((sum, story) => sum + story.competencyNames.length, 0);
  const avgCompetenciesPerStory = storyCount > 0 ? round2(totalMappings / storyCount) : 0;

  const coveredSet = new Set<string>();
  stories.forEach((story) => story.competencyNames.forEach((name) => coveredSet.add(name)));

  const coveredCompetencies = competencies.filter((c) => coveredSet.has(c.name)).length;
  const gapCompetencies = competencies.filter((c) => !coveredSet.has(c.name)).map((c) => c.name);

  return {
    storyCount,
    strongStoryCount,
    avgCompetenciesPerStory,
    coveredCompetencies,
    totalCompetencies: competencies.length,
    gapCompetencies,
  };
}
