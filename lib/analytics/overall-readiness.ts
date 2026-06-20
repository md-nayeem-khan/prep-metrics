// OVERALL INTERVIEW READINESS
// Blends the three track readiness scores (coding, system design, behavioral)
// into a single number for the top of the dashboard. Tracks with no data yet
// are excluded so the blend reflects only what has been practiced.

import { getReadinessLevel, type ReadinessLevel } from "@/types";

export type TrackKey = "coding" | "systemDesign" | "behavioral";

export interface TrackReadinessInput {
  coding: number | null;
  systemDesign: number | null;
  behavioral: number | null;
}

export const DEFAULT_TRACK_WEIGHTS: Record<TrackKey, number> = {
  coding: 0.5,
  systemDesign: 0.3,
  behavioral: 0.2,
};

export interface OverallReadiness {
  score: number; // 0.0 - 1.0
  level: ReadinessLevel;
  included: TrackKey[];
}

export function calculateOverallReadiness(
  scores: TrackReadinessInput,
  weights: Record<TrackKey, number> = DEFAULT_TRACK_WEIGHTS
): OverallReadiness {
  const keys: TrackKey[] = ["coding", "systemDesign", "behavioral"];

  let weighted = 0;
  let weightTotal = 0;
  const included: TrackKey[] = [];

  for (const key of keys) {
    const score = scores[key];
    if (typeof score === "number") {
      weighted += score * weights[key];
      weightTotal += weights[key];
      included.push(key);
    }
  }

  const score = weightTotal === 0 ? 0 : weighted / weightTotal;
  return { score, level: getReadinessLevel(score), included };
}
