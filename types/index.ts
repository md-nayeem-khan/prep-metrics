// BACKEND TYPE DEFINITIONS (Used by API routes)

export interface PatternConfidenceData {
  pattern: string
  category: string
  totalSolved: number
  avgTimeSeconds: number
  hintUsageRate: number
  confidence: 'Weak' | 'Medium' | 'Strong'
}

// Core enums/types
export type Source = 'NeetCode' | 'Company';
export type Company = 'Amazon' | 'Google' | 'Meta' | 'Apple' | 'Netflix' | 'Microsoft';
export type AttemptType = 'First' | 'Revision';
export type Confidence = 'Weak' | 'Medium' | 'Strong';
export type ReadinessLevel = 'Ready' | 'Almost Ready' | 'Not Ready';
export type RevisionStatus = 'pending' | 'completed' | 'skipped';

export const READINESS_READY_THRESHOLD = 0.8;
export const READINESS_ALMOST_READY_THRESHOLD = 0.6;
export const READINESS_MIN_SAMPLE_SIZE = 5;

// Enhanced existing interfaces
export interface Problem {
  id: number;
  platform: 'leetcode' | 'codeforces' | 'atcoder' | 'hackerrank' | 'other';
  problemId: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'unrated';
  url?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // NEW FIELDS
  source: Source;
  company?: Company;
}

export interface ProblemTag {
  id: number;
  problemId: number;
  tag: string;
}

export interface Pattern {
  id: number;
  name: string;
  category: string;
  description?: string;
}

export interface ProblemPattern {
  id: number;
  problemId: number;
  patternId: number;
}

export interface Submission {
  id: number;
  problemId: number;
  attemptNumber: number;
  timeSpentSeconds: number;
  status: 'solved' | 'failed' | 'partial' | 'abandoned';
  notes?: string;
  submittedAt: Date;
  createdAt: Date;
  
  // NEW FIELDS
  attemptType: AttemptType;
  wasHintUsed: boolean;
  mistakeNote?: string;
  approachNote?: string;
  patternRecognitionSeconds?: number;
}

export interface Session {
  id: number;
  problemId: number;
  startedAt: Date;
  endedAt?: Date;
  durationSeconds?: number;
  notes?: string;
}

// NEW INTERFACES

export interface Revision {
  id: number;
  problemId: number;
  scheduledDate: Date;
  completedDate?: Date;
  status: RevisionStatus;
  solvedWithoutHint?: boolean;
  timeSpentSeconds?: number;
  confidenceLevel?: number; // 1-5 scale
  difficultyRating?: number; // 1-5 scale  
  notes?: string;
}

export interface MockInterview {
  id: number;
  problemId: number;
  date: Date;
  timeLimit: number; // seconds
  timeTakenSeconds?: number;
  solved: boolean;
  explanationScore?: number; // 1-5
  codeQualityScore?: number; // 1-5
  overallScore?: number; // 1-5
  notes?: string;
}

export interface DailyProgress {
  id: number;
  date: Date;
  problemsSolved: number;
  totalTimeSpent: number; // seconds
  patternsWorked: number;
  mockInterviews: number;
  createdAt: Date;
  updatedAt: Date;
}

// NEW INTERFACES: Goals & Milestones

export type GoalType = 
  | 'problemCount' 
  | 'patternMastery' 
  | 'companyReady' 
  | 'speedImprovement' 
  | 'streakDays' 
  | 'custom';

export type GoalStatus = 'active' | 'completed' | 'paused' | 'abandoned';
export type GoalPriority = 'critical' | 'high' | 'medium' | 'low';
export type GoalUnit = 'problems' | 'patterns' | 'days' | 'minutes' | 'percentage';

export interface Goal {
  id: number;
  title: string;
  description?: string;
  type: GoalType;
  
  targetValue: number;
  currentValue: number;
  unit: GoalUnit;
  
  startDate: Date;
  deadline: Date;
  
  status: GoalStatus;
  priority: GoalPriority;
  
  targetPattern?: string;
  targetCompany?: string;
  targetDifficulty?: string;
  
  completedAt?: Date;
  lastProgressUpdate: Date;
  
  milestones?: Milestone[];
  
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: number;
  goalId: number;
  title: string;
  description?: string;
  targetValue: number;
  dueDate: Date;
  completed: boolean;
  completedDate?: Date;
  completionNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GoalProgress {
  // All Goal fields
  id: number;
  title: string;
  description?: string;
  type: GoalType;
  targetValue: number;
  currentValue: number;
  unit: GoalUnit;
  startDate: Date;
  deadline: Date;
  status: GoalStatus;
  priority: GoalPriority;
  targetPattern?: string;
  targetCompany?: string;
  targetDifficulty?: string;
  completedAt?: Date;
  lastProgressUpdate: Date;
  milestones?: Milestone[];
  createdAt: Date;
  updatedAt: Date;
  
  // Calculated progress fields
  progressPercentage: number;
  daysRemaining: number;
  isOnTrack: boolean;
  velocity: number; // Progress per day
  projectedCompletionDate: Date;
  nextMilestone?: Milestone;
}

// ANALYTICS INTERFACES

export interface PatternStats {
  pattern: string;
  category: string;
  totalSolved: number;
  avgTimeSeconds: number;
  hintUsageRate: number;
  confidence: Confidence;
  problemIds: number[];
  solvedProblemIds?: number[];
}

export interface ReadinessScore {
  score: number;           // 0.0 - 1.0
  level: ReadinessLevel;
  breakdown: {
    totalProblems: number;
    perfectSolves: number;  // <25min, no hint
    hintedSolves: number;
    failed: number;
  };
}

export interface CompanyReadiness {
  company: Company;
  problemsSolved: number;
  totalProblems: number;
  avgTimeSeconds: number;
  readinessScore: number;
  isReady: boolean;
}

export interface WeeklyProgress {
  problemsSolved: number;
  patternsImproved: number;
  totalTimeSpent: number;
  avgTimePerProblem: number;
  streakDays: number;
}

export interface WeaknessAnalysis {
  weakPatterns: PatternStats[];
  slowPatterns: PatternStats[];
  hintDependentPatterns: PatternStats[];
  recommendations: string[];
}

export interface TimelineData {
  date: string;
  problemsSolved: number;
  totalTime: number;
  avgTime: number;
}

export interface Recommendation {
  id: string;
  type: 'pattern' | 'company' | 'difficulty' | 'revision';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action?: string;
}

// TIME BENCHMARKS
export const TIME_BENCHMARKS = {
  easy: 15 * 60,    // 15 minutes in seconds
  medium: 25 * 60,  // 25 minutes
  hard: 40 * 60     // 40 minutes
} as const;

export type DifficultyBenchmarkKey = keyof typeof TIME_BENCHMARKS;

export const getDifficultyBenchmarkKey = (difficulty?: string | null): DifficultyBenchmarkKey => {
  const normalized = difficulty?.toLowerCase();

  if (normalized === 'easy' || normalized === 'medium' || normalized === 'hard') {
    return normalized;
  }

  return 'medium';
};

// COMPANIES LIST
export const COMPANIES: Company[] = [
  'Amazon',
  'Google', 
  'Meta',
  'Apple',
  'Netflix',
  'Microsoft'
];

// CONFIDENCE CALCULATION HELPERS
export const calculatePatternConfidence = (avgTimeSeconds: number, hintUsageRate: number): Confidence => {
  const avgTimeMinutes = avgTimeSeconds / 60;
  
  if (avgTimeMinutes > 35 || hintUsageRate > 0.4) {
    return 'Weak';
  } else if (avgTimeMinutes < 25 && hintUsageRate < 0.2) {
    return 'Strong';
  }
  return 'Medium';
};

type SubmissionWithDifficulty = Submission & {
  problem?: {
    id?: number | string;
    problemId?: number | string;
    difficulty?: string;
  };
};

const getSubmissionProblemKey = (submission: SubmissionWithDifficulty): string | null => {
  if (typeof submission.problemId === 'number' || typeof submission.problemId === 'string') {
    return String(submission.problemId);
  }

  if (submission.problem?.id !== undefined && submission.problem?.id !== null) {
    return String(submission.problem.id);
  }

  if (submission.problem?.problemId !== undefined && submission.problem?.problemId !== null) {
    return String(submission.problem.problemId);
  }

  return null;
};

export const getReadinessLevel = (score: number): ReadinessLevel => {
  if (score >= READINESS_READY_THRESHOLD) return 'Ready';
  if (score >= READINESS_ALMOST_READY_THRESHOLD) return 'Almost Ready';
  return 'Not Ready';
};

export const getLatestSubmissionsPerProblem = <T extends SubmissionWithDifficulty>(submissions: T[]): T[] => {
  const latestByProblem = new Map<string, T>();

  submissions.forEach((submission) => {
    const key = getSubmissionProblemKey(submission);
    if (!key) {
      return;
    }

    const existing = latestByProblem.get(key);

    if (!existing) {
      latestByProblem.set(key, submission);
      return;
    }

    const existingTime = new Date(existing.submittedAt).getTime();
    const currentTime = new Date(submission.submittedAt).getTime();

    if (currentTime > existingTime) {
      latestByProblem.set(key, submission);
    }
  });

  return Array.from(latestByProblem.values()).sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
};

const getDifficultyBenchmarkSeconds = (submission: SubmissionWithDifficulty): number => {
  const key = getDifficultyBenchmarkKey(submission.problem?.difficulty);
  return TIME_BENCHMARKS[key];
};

export const calculateReadinessScoreFromLatestSubmissions = (latestSubmissions: Submission[]): ReadinessScore => {
  let totalScore = 0;
  const maxScore = latestSubmissions.length * 2;

  let perfectSolves = 0;
  let hintedSolves = 0;
  let failed = 0;

  for (const sub of latestSubmissions) {
    if (sub.status === 'solved') {
      const benchmarkSeconds = getDifficultyBenchmarkSeconds(sub as SubmissionWithDifficulty);
      const isOnPace = sub.timeSpentSeconds <= benchmarkSeconds;

      if (isOnPace && !sub.wasHintUsed) {
        totalScore += 2; // Perfect solve
        perfectSolves++;
      } else {
        totalScore += 1; // Solved with hint or slow
        hintedSolves++;
      }
    } else {
      failed++;
    }
  }

  const rawScore = maxScore === 0 ? 0 : totalScore / maxScore;
  const score = latestSubmissions.length < READINESS_MIN_SAMPLE_SIZE
    ? Math.min(rawScore, READINESS_READY_THRESHOLD - 0.01)
    : rawScore;

  return {
    score,
    level: getReadinessLevel(score),
    breakdown: {
      totalProblems: latestSubmissions.length,
      perfectSolves,
      hintedSolves,
      failed
    }
  };
};

export const calculateReadinessScore = (submissions: Submission[]): ReadinessScore => {
  const latestSubmissions = getLatestSubmissionsPerProblem(submissions as SubmissionWithDifficulty[]);
  return calculateReadinessScoreFromLatestSubmissions(latestSubmissions);
};
