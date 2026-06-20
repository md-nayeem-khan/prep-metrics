import { calculatePatternConfidence, type Confidence } from "@/types";

export interface SubmissionMetricInput {
  status: string;
  timeSpentSeconds: number;
  wasHintUsed: boolean;
  submittedAt: Date | string;
}

export interface ProblemMetricInput {
  id: number;
  patterns: Array<{ pattern: { id: number; name: string; category: string } }>;
  submissions: SubmissionMetricInput[];
}

export interface PatternMetricResult {
  id: number;
  pattern: string;
  category: string;
  totalSolved: number;
  avgTimeSeconds: number;
  hintUsageRate: number;
  confidence: Confidence;
  problemIds: number[];
  solvedProblemIds: number[];
}

export function calculateMasteryFromSignals(
  confidence: Confidence,
  avgTimeSeconds: number,
  hintUsageRate: number
): number {
  const avgTimeMinutes = avgTimeSeconds / 60;
  let base = confidence === "Strong" ? 80 : confidence === "Medium" ? 55 : 30;

  if (avgTimeMinutes < 20) base += 10;
  else if (avgTimeMinutes > 35) base -= 10;

  if (hintUsageRate < 0.15) base += 5;
  else if (hintUsageRate > 0.4) base -= 5;

  return Math.min(100, Math.max(0, base));
}

function getLatestSubmission(submissions: SubmissionMetricInput[]): SubmissionMetricInput | null {
  if (submissions.length === 0) return null;

  return submissions.reduce((latest, current) => {
    const latestTime = new Date(latest.submittedAt).getTime();
    const currentTime = new Date(current.submittedAt).getTime();
    return currentTime > latestTime ? current : latest;
  });
}

export function calculatePatternMetrics(
  problems: ProblemMetricInput[],
  minProblems = 1
): PatternMetricResult[] {
  const patternMap = new Map<
    string,
    {
      id: number;
      name: string;
      category: string;
      problemIds: Set<number>;
      solvedProblemIds: Set<number>;
      latestSolvedSubmissions: SubmissionMetricInput[];
    }
  >();

  for (const problem of problems) {
    const latestSubmission = getLatestSubmission(problem.submissions);

    for (const relation of problem.patterns) {
      const { id, name, category } = relation.pattern;

      if (!patternMap.has(name)) {
        patternMap.set(name, {
          id,
          name,
          category,
          problemIds: new Set<number>(),
          solvedProblemIds: new Set<number>(),
          latestSolvedSubmissions: [],
        });
      }

      const data = patternMap.get(name)!;
      data.problemIds.add(problem.id);

      if (latestSubmission?.status === "solved") {
        data.solvedProblemIds.add(problem.id);
        data.latestSolvedSubmissions.push(latestSubmission);
      }
    }
  }

  const results: PatternMetricResult[] = [];

  for (const data of patternMap.values()) {
    if (data.problemIds.size < minProblems) continue;

    const totalSolved = data.solvedProblemIds.size;
    const totalTime = data.latestSolvedSubmissions.reduce(
      (sum, submission) => sum + submission.timeSpentSeconds,
      0
    );
    const avgTimeSeconds = totalSolved > 0 ? totalTime / totalSolved : 0;
    const hintedCount = data.latestSolvedSubmissions.filter((s) => s.wasHintUsed).length;
    const hintUsageRate = totalSolved > 0 ? hintedCount / totalSolved : 0;
    const confidence = totalSolved > 0 ? calculatePatternConfidence(avgTimeSeconds, hintUsageRate) : "Weak";

    results.push({
      id: data.id,
      pattern: data.name,
      category: data.category,
      totalSolved,
      avgTimeSeconds,
      hintUsageRate,
      confidence,
      problemIds: Array.from(data.problemIds),
      solvedProblemIds: Array.from(data.solvedProblemIds),
    });
  }

  return results;
}
