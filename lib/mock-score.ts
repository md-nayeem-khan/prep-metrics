// Client-safe overall-score preview for the mock Submit dialog. Picks the right
// scoring function by interview type (reuses the existing pure rubric calculators).

import { calculateSDOverallScore } from "@/lib/analytics/system-design-metrics";
import { calculateBehavioralOverallScore } from "@/lib/analytics/behavioral-metrics";
import type { MockType } from "@/types/mock";

export function previewMockOverall(
  type: MockType,
  rubric: Record<string, number>,
  extras?: { resultQuantified?: boolean },
): number | null {
  if (type === "systemDesign") {
    return calculateSDOverallScore(rubric);
  }
  if (type === "behavioral") {
    return calculateBehavioralOverallScore({ ...rubric, resultQuantified: extras?.resultQuantified });
  }
  // coding: simple mean of the two filled dimensions
  const exp = rubric.explanationScore;
  const code = rubric.codeQualityScore;
  if (exp > 0 && code > 0) return Math.round(((exp + code) / 2) * 100) / 100;
  return null;
}
