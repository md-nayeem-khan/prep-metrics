// MOCK INTERVIEW ANALYTICS
// Pure aggregation over mock-interview sessions, segmented by interview type.
// Readiness itself is NOT computed here — SD/behavioral mock sessions dual-write a
// SystemDesignAttempt / BehavioralAttempt (mode='mock') and flow into the existing
// readiness engines. These helpers are just the mock-history scoreboard.

import { MOCK_TYPES, type MockType } from "@/types/mock";

const round2 = (value: number): number => Math.round(value * 100) / 100;

export interface MockSessionLike {
  type: string;
  status: string;
  solved: boolean;
  overallScore: number | null;
  timeTakenSeconds: number | null;
}

export interface MockTypeStats {
  type: MockType;
  total: number;        // all sessions of this type (incl. in-progress)
  completed: number;    // status === 'completed'
  passed: number;       // completed AND solved
  passRate: number;     // passed / completed * 100
  avgOverallScore: number;   // mean overallScore over completed scored sessions
  avgDurationSeconds: number | null; // mean timeTakenSeconds over completed sessions
}

export interface MockSummary {
  total: number;
  completed: number;
  passed: number;
  passRate: number;
  byType: MockTypeStats[];
}

function emptyStats(type: MockType): MockTypeStats {
  return { type, total: 0, completed: 0, passed: 0, passRate: 0, avgOverallScore: 0, avgDurationSeconds: null };
}

/** Per-type breakdown. Always returns one entry per known MockType (zeros if unused). */
export function calculateMockStatsByType(sessions: MockSessionLike[]): MockTypeStats[] {
  const acc = new Map<MockType, {
    total: number; completed: number; passed: number;
    scoreSum: number; scoreCount: number; durationSum: number; durationCount: number;
  }>();
  for (const t of MOCK_TYPES) {
    acc.set(t, { total: 0, completed: 0, passed: 0, scoreSum: 0, scoreCount: 0, durationSum: 0, durationCount: 0 });
  }

  for (const s of sessions) {
    if (!MOCK_TYPES.includes(s.type as MockType)) continue;
    const a = acc.get(s.type as MockType)!;
    a.total += 1;
    if (s.status === "completed") {
      a.completed += 1;
      if (s.solved) a.passed += 1;
      if (typeof s.overallScore === "number") {
        a.scoreSum += s.overallScore;
        a.scoreCount += 1;
      }
      if (typeof s.timeTakenSeconds === "number") {
        a.durationSum += s.timeTakenSeconds;
        a.durationCount += 1;
      }
    }
  }

  return MOCK_TYPES.map((type) => {
    const a = acc.get(type)!;
    if (a.total === 0) return emptyStats(type);
    return {
      type,
      total: a.total,
      completed: a.completed,
      passed: a.passed,
      passRate: a.completed > 0 ? round2((a.passed / a.completed) * 100) : 0,
      avgOverallScore: a.scoreCount > 0 ? round2(a.scoreSum / a.scoreCount) : 0,
      avgDurationSeconds: a.durationCount > 0 ? Math.round(a.durationSum / a.durationCount) : null,
    };
  });
}

/** Overall mock summary plus the per-type breakdown. */
export function calculateMockSummary(sessions: MockSessionLike[]): MockSummary {
  const byType = calculateMockStatsByType(sessions);
  const total = byType.reduce((sum, t) => sum + t.total, 0);
  const completed = byType.reduce((sum, t) => sum + t.completed, 0);
  const passed = byType.reduce((sum, t) => sum + t.passed, 0);
  return {
    total,
    completed,
    passed,
    passRate: completed > 0 ? round2((passed / completed) * 100) : 0,
    byType,
  };
}
