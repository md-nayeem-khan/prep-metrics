// BEHAVIORAL DOMAIN TYPES (FAANG-style, STAR + competency-driven)
// Readiness is driven by a 6-dimension STAR rubric; the signature analytic is
// competency / leadership-principle coverage backed by a reusable STAR story bank.

import type { Confidence, ReadinessLevel } from "@/types";

export type STARRubricKey =
  | "situationScore"
  | "taskScore"
  | "actionScore"
  | "resultScore"
  | "structureScore"
  | "signalScore";

export interface STARRubric {
  situationScore?: number | null;
  taskScore?: number | null;
  actionScore?: number | null;
  resultScore?: number | null;
  structureScore?: number | null;
  signalScore?: number | null;
  resultQuantified?: boolean | null;
}

// Weights emphasize Action + Result (the heart of STAR) plus competency signal.
// Sum = 10. Used to compute the weighted overall score (1-5).
export const STAR_RUBRIC_WEIGHTS: Record<STARRubricKey, number> = {
  situationScore: 1,
  taskScore: 1,
  actionScore: 2.5,
  resultScore: 2.5,
  structureScore: 1,
  signalScore: 2,
};

// Bonus added to the overall score when the result was quantified with metrics.
export const RESULT_QUANTIFIED_BONUS = 0.25;

export const STAR_RUBRIC_DIMENSIONS: { key: STARRubricKey; label: string; description: string }[] = [
  { key: "situationScore", label: "Situation", description: "Context is clear, concise, and relevant" },
  { key: "taskScore", label: "Task", description: "Your specific role / responsibility is clear" },
  { key: "actionScore", label: "Action", description: "Specific actions with ownership ('I', not 'we')" },
  { key: "resultScore", label: "Result", description: "Concrete outcome and impact" },
  { key: "structureScore", label: "Structure", description: "Concise, structured, easy to follow" },
  { key: "signalScore", label: "Signal", description: "Strong competency / leadership-principle signal" },
];

export type CoverageStatus = "Strong" | "Developing" | "Gap";

export interface CompetencyCoverage {
  competency: string;
  type: string; // "LeadershipPrinciple" | "Competency"
  company: string | null;
  status: CoverageStatus;
  storyCount: number;
  strongStoryCount: number;
  bestStoryStrength: number;
  practiceCount: number;
  avgOverallScore: number;
}

export interface StoryBankHealth {
  storyCount: number;
  strongStoryCount: number;
  avgCompetenciesPerStory: number;
  coveredCompetencies: number;
  totalCompetencies: number;
  gapCompetencies: string[];
}

export interface BehavioralReadinessScore {
  score: number; // 0.0 - 1.0
  level: ReadinessLevel;
  breakdown: {
    totalQuestions: number;
    strongAnswers: number; // overall >= 4 and no notes used
    assistedAnswers: number; // overall >= 3 (or used notes)
    weakAnswers: number;
  };
}

// A story is "strong" at this self-rated strength or above.
export const STORY_STRENGTH_STRONG = 4;
// An answer demonstrates strong competency signal at this overall score or above.
export const BEHAVIORAL_STRONG_SCORE = 4;

export type { Confidence };
