import { calculatePatternConfidence, type Confidence } from "@/types";
import { calculateMasteryFromSignals } from "@/lib/analytics/pattern-metrics";

export interface CompanySubmissionMetricInput {
  status: string;
  timeSpentSeconds: number;
  wasHintUsed: boolean;
  submittedAt: Date | string;
}

export interface CompanyProblemMetricInput {
  id: number;
  difficulty: string;
  patterns: Array<{ pattern: { name: string } }>;
  submissions: CompanySubmissionMetricInput[];
}

export interface CompanySummaryMetrics {
  solvedProblemIds: number[];
  solvedProblems: number;
  avgTimeSeconds: number;
  hintPercentage: number;
  hintUsageRate: number;
  confidence: Confidence;
  masteryPercentage: number;
}

export interface PatternCoverageMetric {
  pattern: string;
  total: number;
  solved: number;
  percentage: number;
}

export function getLatestSubmission(
  submissions: CompanySubmissionMetricInput[]
): CompanySubmissionMetricInput | null {
  if (submissions.length === 0) return null;

  return submissions.reduce((latest, current) => {
    const latestTime = new Date(latest.submittedAt).getTime();
    const currentTime = new Date(current.submittedAt).getTime();
    return currentTime > latestTime ? current : latest;
  });
}

export function calculateCompanySummaryMetrics(
  problems: CompanyProblemMetricInput[]
): CompanySummaryMetrics {
  const latestSolvedByProblemId = new Map<number, CompanySubmissionMetricInput>();

  for (const problem of problems) {
    const latestSubmission = getLatestSubmission(problem.submissions);
    if (latestSubmission?.status === "solved") {
      latestSolvedByProblemId.set(problem.id, latestSubmission);
    }
  }

  const solvedProblemIds = Array.from(latestSolvedByProblemId.keys()).sort((a, b) => a - b);
  const solvedSubmissions = Array.from(latestSolvedByProblemId.values());
  const solvedProblems = solvedProblemIds.length;

  const avgTimeSeconds = solvedProblems > 0
    ? Math.round(
        solvedSubmissions.reduce((sum, submission) => sum + submission.timeSpentSeconds, 0) /
          solvedProblems
      )
    : 0;

  const hintedSolves = solvedSubmissions.filter((submission) => submission.wasHintUsed).length;
  const hintUsageRate = solvedProblems > 0 ? hintedSolves / solvedProblems : 0;
  const hintPercentage = Math.round(hintUsageRate * 100);

  const confidence = solvedProblems > 0
    ? calculatePatternConfidence(avgTimeSeconds, hintUsageRate)
    : "Weak";

  const masteryPercentage = solvedProblems > 0
    ? calculateMasteryFromSignals(confidence, avgTimeSeconds, hintUsageRate)
    : 0;

  return {
    solvedProblemIds,
    solvedProblems,
    avgTimeSeconds,
    hintPercentage,
    hintUsageRate,
    confidence,
    masteryPercentage,
  };
}

export function calculatePatternCoverageMetrics(
  problems: CompanyProblemMetricInput[],
  solvedProblemIds: number[]
): PatternCoverageMetric[] {
  const solvedSet = new Set<number>(solvedProblemIds);
  const patternCounts: Record<string, { total: number; solved: number }> = {};

  for (const problem of problems) {
    const isSolved = solvedSet.has(problem.id);

    for (const relation of problem.patterns) {
      const patternName = relation.pattern.name;
      if (!patternCounts[patternName]) {
        patternCounts[patternName] = { total: 0, solved: 0 };
      }

      patternCounts[patternName].total++;
      if (isSolved) {
        patternCounts[patternName].solved++;
      }
    }
  }

  return Object.entries(patternCounts)
    .map(([name, data]) => ({
      pattern: name,
      total: data.total,
      solved: data.solved,
      percentage: data.total > 0 ? Math.round((data.solved / data.total) * 100) : 0,
    }))
    .sort((a, b) => {
      if (b.solved !== a.solved) return b.solved - a.solved;
      if (b.percentage !== a.percentage) return b.percentage - a.percentage;
      if (b.total !== a.total) return b.total - a.total;
      return a.pattern.localeCompare(b.pattern);
    });
}
