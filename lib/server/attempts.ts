// Shared server-side helpers for creating rubric-scored attempts.
//
// Both the standalone practice routes (/api/system-design/attempts,
// /api/behavioral/attempts) AND the mock-interview submit path
// (/api/mock-interviews/[id]) create attempts the exact same way — the only
// difference is `mode` ('practice' vs 'mock'). Centralizing here keeps one code
// path so a mock SD/behavioral session is a real attempt that feeds the existing
// readiness/topic/competency analytics (which never filter on `mode`).

import { prisma } from "@/lib/prisma";
import { calculateSDOverallScore } from "@/lib/analytics/system-design-metrics";
import { calculateBehavioralOverallScore } from "@/lib/analytics/behavioral-metrics";
import type { SDRubricKey } from "@/types/system-design";
import type { STARRubricKey } from "@/types/behavioral";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
export const startOfUtcDay = (date: Date) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
export const addUtcDays = (date: Date, days: number) => new Date(date.getTime() + days * DAY_IN_MS);

export const SD_RUBRIC_KEYS: SDRubricKey[] = [
  "requirementsScore", "estimationScore", "highLevelDesignScore", "dataModelApiScore",
  "deepDiveScore", "scalabilityScore", "tradeoffScore", "communicationScore",
];

export const STAR_RUBRIC_KEYS: STARRubricKey[] = [
  "situationScore", "taskScore", "actionScore", "resultScore", "structureScore", "signalScore",
];

export type AttemptStatus = "completed" | "partial" | "abandoned";
export const VALID_ATTEMPT_STATUSES: AttemptStatus[] = ["completed", "partial", "abandoned"];

/**
 * Count-and-set the given DailyProgress counter to the number of matching rows for
 * the attempt's UTC day. Idempotent — resubmitting does not inflate the count.
 * Non-fatal: logs and swallows errors so a progress hiccup never fails the attempt.
 */
async function setDailyProgressCount(
  submittedAt: Date,
  field: "systemDesignAttempts" | "behavioralAttempts",
  count: () => Promise<number>,
) {
  try {
    const normalizedDate = startOfUtcDay(submittedAt);
    const endOfDayExclusive = addUtcDays(normalizedDate, 1);
    const todayCount = await count();
    const existing = await prisma.dailyProgress.findFirst({
      where: { date: { gte: normalizedDate, lt: endOfDayExclusive } },
    });
    if (existing) {
      await prisma.dailyProgress.update({ where: { id: existing.id }, data: { [field]: todayCount } });
    } else {
      await prisma.dailyProgress.create({ data: { date: normalizedDate, [field]: todayCount } as never });
    }
  } catch (progressError) {
    console.error(`Error updating daily progress (${field}):`, progressError);
  }
}

export interface CreateSDAttemptInput {
  questionId: number;
  timeSpentSeconds: number;
  status?: AttemptStatus;
  submittedAt?: string | Date;
  mode?: "practice" | "mock";
  attemptType?: string;
  usedReference?: boolean;
  approachNote?: string | null;
  mistakeNote?: string | null;
  rubric: Partial<Record<SDRubricKey, number>>;
}

export async function createSystemDesignAttempt(input: CreateSDAttemptInput) {
  const {
    questionId, timeSpentSeconds, status = "completed", submittedAt,
    mode = "practice", attemptType = "First", usedReference = false,
    approachNote = null, mistakeNote = null, rubric,
  } = input;

  const overallScore = calculateSDOverallScore(rubric);

  const lastAttempt = await prisma.systemDesignAttempt.findFirst({
    where: { questionId },
    orderBy: { attemptNumber: "desc" },
  });

  const submittedAtDate = submittedAt ? new Date(submittedAt) : new Date();

  const attempt = await prisma.systemDesignAttempt.create({
    data: {
      questionId,
      attemptNumber: (lastAttempt?.attemptNumber || 0) + 1,
      attemptType,
      mode,
      timeSpentSeconds,
      status,
      submittedAt: submittedAtDate,
      requirementsScore: rubric.requirementsScore ?? null,
      estimationScore: rubric.estimationScore ?? null,
      highLevelDesignScore: rubric.highLevelDesignScore ?? null,
      dataModelApiScore: rubric.dataModelApiScore ?? null,
      deepDiveScore: rubric.deepDiveScore ?? null,
      scalabilityScore: rubric.scalabilityScore ?? null,
      tradeoffScore: rubric.tradeoffScore ?? null,
      communicationScore: rubric.communicationScore ?? null,
      overallScore,
      usedReference,
      approachNote: approachNote || null,
      mistakeNote: mistakeNote || null,
    },
  });

  await setDailyProgressCount(new Date(attempt.submittedAt), "systemDesignAttempts", () => {
    const normalizedDate = startOfUtcDay(new Date(attempt.submittedAt));
    return prisma.systemDesignAttempt.count({
      where: { submittedAt: { gte: normalizedDate, lt: addUtcDays(normalizedDate, 1) } },
    });
  });

  return attempt;
}

export interface CreateBehavioralAttemptInput {
  questionId: number;
  storyId?: number | null;
  timeSpentSeconds: number;
  status?: AttemptStatus;
  submittedAt?: string | Date;
  mode?: "practice" | "mock";
  attemptType?: string;
  resultQuantified?: boolean;
  usedNotes?: boolean;
  reflectionNote?: string | null;
  rubric: Partial<Record<STARRubricKey, number>>;
}

export async function createBehavioralAttempt(input: CreateBehavioralAttemptInput) {
  const {
    questionId, storyId = null, timeSpentSeconds, status = "completed", submittedAt,
    mode = "practice", attemptType = "First", resultQuantified = false,
    usedNotes = false, reflectionNote = null, rubric,
  } = input;

  const overallScore = calculateBehavioralOverallScore({ ...rubric, resultQuantified });

  const lastAttempt = await prisma.behavioralAttempt.findFirst({
    where: { questionId },
    orderBy: { attemptNumber: "desc" },
  });

  const submittedAtDate = submittedAt ? new Date(submittedAt) : new Date();

  const attempt = await prisma.behavioralAttempt.create({
    data: {
      questionId,
      storyId: storyId || null,
      attemptNumber: (lastAttempt?.attemptNumber || 0) + 1,
      attemptType,
      mode,
      timeSpentSeconds,
      status,
      submittedAt: submittedAtDate,
      situationScore: rubric.situationScore ?? null,
      taskScore: rubric.taskScore ?? null,
      actionScore: rubric.actionScore ?? null,
      resultScore: rubric.resultScore ?? null,
      structureScore: rubric.structureScore ?? null,
      signalScore: rubric.signalScore ?? null,
      resultQuantified: !!resultQuantified,
      overallScore,
      usedNotes,
      reflectionNote: reflectionNote || null,
    },
  });

  await setDailyProgressCount(new Date(attempt.submittedAt), "behavioralAttempts", () => {
    const normalizedDate = startOfUtcDay(new Date(attempt.submittedAt));
    return prisma.behavioralAttempt.count({
      where: { submittedAt: { gte: normalizedDate, lt: addUtcDays(normalizedDate, 1) } },
    });
  });

  return attempt;
}
