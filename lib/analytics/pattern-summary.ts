export interface PatternSummaryInput {
  masteryPercentage: number;
  solved: number;
  solvedProblemIds?: number[];
}

export function calculatePatternSummary(patterns: PatternSummaryInput[]) {
  const total = patterns.length;

  const uniqueSolvedProblemIds = new Set<number>();
  for (const pattern of patterns) {
    if (Array.isArray(pattern.solvedProblemIds) && pattern.solvedProblemIds.length > 0) {
      for (const problemId of pattern.solvedProblemIds) {
        uniqueSolvedProblemIds.add(problemId);
      }
    }
  }

  const totalSolved = uniqueSolvedProblemIds.size;
  const activePatterns = patterns.filter((pattern) => pattern.solved > 0);
  const avgMastery =
    activePatterns.length > 0
      ? Math.round(
          activePatterns.reduce((sum, pattern) => sum + pattern.masteryPercentage, 0) /
            activePatterns.length
        )
      : 0;

  return { total, totalSolved, avgMastery };
}
