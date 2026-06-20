// Server-side helpers for resolving the question behind a mock-interview session.
// Shared by POST /api/mock-interviews and POST /api/mock-interviews/start.

import { prisma } from "@/lib/prisma";
import { type MockType } from "@/types/mock";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// The MockInterview FK field that holds the question for a given type.
export function questionLink(type: MockType, id: number): Record<string, number> {
  if (type === "coding") return { problemId: id };
  if (type === "systemDesign") return { systemDesignQuestionId: id };
  return { behavioralQuestionId: id };
}

function pickRandom(rows: { id: number }[]): number | null {
  if (rows.length === 0) return null;
  return rows[Math.floor(Math.random() * rows.length)].id;
}

/** Pick a random question of the given type, excluding ones used in a mock in the last 7 days. */
export async function selectRandomQuestionId(type: MockType, difficulty?: string | null): Promise<number | null> {
  const recent = { mockInterviews: { none: { date: { gte: new Date(Date.now() - SEVEN_DAYS_MS) } } } };

  if (type === "coding") {
    const where: Record<string, unknown> = { ...recent };
    if (difficulty) where.difficulty = difficulty;
    return pickRandom(await prisma.problem.findMany({ where, select: { id: true } }));
  }
  if (type === "systemDesign") {
    const where: Record<string, unknown> = { ...recent };
    if (difficulty) where.difficulty = difficulty;
    return pickRandom(await prisma.systemDesignQuestion.findMany({ where, select: { id: true } }));
  }
  return pickRandom(await prisma.behavioralQuestion.findMany({ where: recent, select: { id: true } }));
}

/** Create a throwaway question for a manual mock entry (mirrors the legacy coding 'mock' Problem). */
export async function createManualQuestionId(
  type: MockType,
  input: { title?: string; prompt?: string; difficulty?: string | null },
): Promise<number> {
  const stamp = Date.now();

  if (type === "coding") {
    const created = await prisma.problem.create({
      data: {
        platform: "mock",
        problemId: `mock-${stamp}`,
        title: (input.title || "Untitled mock problem").trim(),
        difficulty: input.difficulty || "medium",
        source: "NeetCode",
      },
    });
    return created.id;
  }

  if (type === "systemDesign") {
    const title = (input.title || "Untitled mock design").trim();
    const created = await prisma.systemDesignQuestion.create({
      data: {
        slug: `mock-${stamp}`,
        title,
        difficulty: input.difficulty || "medium",
        category: "Mock",
        prompt: (input.prompt || title).trim(),
        source: "Company",
      },
    });
    return created.id;
  }

  const prompt = (input.prompt || input.title || "Untitled mock question").trim();
  const created = await prisma.behavioralQuestion.create({
    data: { slug: `mock-${stamp}`, prompt, category: "Mock", source: "Company" },
  });
  return created.id;
}

/** Validate that a bank question of the given type exists. Returns true if found. */
export async function bankQuestionExists(type: MockType, id: number): Promise<boolean> {
  if (type === "coding") return !!(await prisma.problem.findUnique({ where: { id }, select: { id: true } }));
  if (type === "systemDesign") return !!(await prisma.systemDesignQuestion.findUnique({ where: { id }, select: { id: true } }));
  return !!(await prisma.behavioralQuestion.findUnique({ where: { id }, select: { id: true } }));
}
