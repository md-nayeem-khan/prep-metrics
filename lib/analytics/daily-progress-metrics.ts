export interface DailyProgressSubmission {
  problemId: number;
  status: string;
  timeSpentSeconds: number;
  problem?: {
    patterns?: Array<{
      pattern?: {
        name?: string;
      };
    }>;
  };
}

export interface DailyProgressSnapshot {
  problemsSolved: number;
  totalTimeSpent: number;
  patternsWorked: number;
}

export function calculateDailyProgressSnapshot(
  submissions: DailyProgressSubmission[]
): DailyProgressSnapshot {
  const solvedProblemIds = new Set<number>();
  const patterns = new Set<string>();

  let totalTimeSpent = 0;

  for (const submission of submissions) {
    totalTimeSpent += submission.timeSpentSeconds || 0;

    if (submission.status === 'solved') {
      solvedProblemIds.add(submission.problemId);
    }

    const problemPatterns = submission.problem?.patterns || [];
    for (const patternLink of problemPatterns) {
      const name = patternLink.pattern?.name;
      if (name) {
        patterns.add(name);
      }
    }
  }

  return {
    problemsSolved: solvedProblemIds.size,
    totalTimeSpent,
    patternsWorked: patterns.size,
  };
}