// SYSTEM DESIGN DOMAIN TYPES (FAANG-style, rubric-driven)
// Mirrors the coding-track analytics shape in types/index.ts, but the readiness
// engine is driven by an 8-dimension FAANG rubric instead of time + hint usage.

import type { Confidence, ReadinessLevel } from "@/types";

export type SDDifficulty = "medium" | "hard";

export type SDRubricKey =
  | "requirementsScore"
  | "estimationScore"
  | "highLevelDesignScore"
  | "dataModelApiScore"
  | "deepDiveScore"
  | "scalabilityScore"
  | "tradeoffScore"
  | "communicationScore";

export interface SDRubric {
  requirementsScore?: number | null;
  estimationScore?: number | null;
  highLevelDesignScore?: number | null;
  dataModelApiScore?: number | null;
  deepDiveScore?: number | null;
  scalabilityScore?: number | null;
  tradeoffScore?: number | null;
  communicationScore?: number | null;
}

// Weights emphasize the FAANG-critical phases (high-level design + deep dive).
// Sum = 12. Used to compute the weighted overall score (1-5).
export const SD_RUBRIC_WEIGHTS: Record<SDRubricKey, number> = {
  requirementsScore: 1.5,
  estimationScore: 1,
  highLevelDesignScore: 2,
  dataModelApiScore: 1.5,
  deepDiveScore: 2,
  scalabilityScore: 1.5,
  tradeoffScore: 1.5,
  communicationScore: 1,
};

export const SD_RUBRIC_DIMENSIONS: { key: SDRubricKey; label: string; description: string }[] = [
  { key: "requirementsScore", label: "Requirements", description: "Clarified functional & non-functional requirements and scoped the problem" },
  { key: "estimationScore", label: "Estimation", description: "Capacity/scale math: QPS, storage, bandwidth" },
  { key: "highLevelDesignScore", label: "High-Level Design", description: "Clear component architecture and data flow" },
  { key: "dataModelApiScore", label: "Data Model & API", description: "Schema and API/interface design" },
  { key: "deepDiveScore", label: "Deep Dive", description: "Detailed design of 1-2 critical components" },
  { key: "scalabilityScore", label: "Scalability", description: "Bottlenecks, sharding, caching, replication" },
  { key: "tradeoffScore", label: "Tradeoffs", description: "CAP, consistency vs availability, cost/performance reasoning" },
  { key: "communicationScore", label: "Communication", description: "Structure, clarity, and driving the conversation" },
];

// Benchmark durations for a full design exercise, by difficulty (seconds).
export const SD_TIME_BENCHMARKS = {
  medium: 45 * 60,
  hard: 60 * 60,
} as const;

export type SDDifficultyBenchmarkKey = keyof typeof SD_TIME_BENCHMARKS;

export const getSDBenchmarkKey = (difficulty?: string | null): SDDifficultyBenchmarkKey => {
  return difficulty?.toLowerCase() === "hard" ? "hard" : "medium";
};

export interface SystemDesignReadinessScore {
  score: number; // 0.0 - 1.0
  level: ReadinessLevel;
  breakdown: {
    totalQuestions: number;
    strongDesigns: number; // overall >= 4 and no reference used
    assistedDesigns: number; // overall >= 3 (or used reference)
    weakDesigns: number;
  };
}

export interface SDTopicStats {
  topic: string;
  category: string;
  totalQuestions: number;
  attempted: number;
  avgOverallScore: number;
  referenceUsageRate: number;
  confidence: Confidence;
  masteryPercentage: number;
  questionIds: number[];
  attemptedQuestionIds: number[];
}
