// Round 2 logic-level validation: exercises the WRITE/calculation endpoints with a stubbed
// Prisma client (no real DB writes). Doubles as regression tests for the round-2 fixes.
import test from "node:test";
import assert from "node:assert/strict";

import { prisma } from "../lib/prisma";
import { REVISION_INTERVALS } from "../lib/spaced-repetition";

import { POST as submissionsPOST } from "../app/api/submissions/route";
import { POST as completePOST } from "../app/api/revisions/[id]/complete/route";
import { GET as historyGET } from "../app/api/revisions/[id]/history/route";
import { POST as mockPOST } from "../app/api/mock-interviews/route";
import { PUT as mockPUT } from "../app/api/mock-interviews/[id]/route";
import { DELETE as companyDELETE } from "../app/api/companies/[id]/route";
import { POST as csvPOST } from "../app/api/export/csv/route";
import { GET as goalsGET } from "../app/api/goals/route";

const DAY_MS = 86400000;

// helper to save/restore a set of stubbed prisma methods
function withStubs(stubs: Array<[any, string, any]>, run: () => Promise<void>) {
  const originals = stubs.map(([obj, key]) => [obj, key, obj[key]] as const);
  for (const [obj, key, fn] of stubs) obj[key] = fn;
  return run().finally(() => {
    for (const [obj, key, fn] of originals) obj[key] = fn;
  });
}

// ---------------------------------------------------------------------------
// Spaced repetition: shared interval constant (the fix)
// ---------------------------------------------------------------------------
test("REVISION_INTERVALS is the unified 6-level schedule", () => {
  assert.deepEqual([...REVISION_INTERVALS], [1, 3, 7, 14, 30, 60]);
});

test("submissions POST advances a level-4 revision to level 5 (no regression from the old [1,3,7,14] cap)", async () => {
  let createdRevision: any = null;
  await withStubs(
    [
      [prisma.problem as any, "findUnique", async () => ({ id: 1 })],
      [prisma.submission as any, "findFirst", async () => ({ attemptNumber: 3 })],
      [prisma.submission as any, "create", async (a: any) => ({ id: 500, ...a.data })],
      [prisma.submission as any, "findMany", async () => []],
      [prisma.dailyProgress as any, "findFirst", async () => null],
      [prisma.dailyProgress as any, "create", async () => ({})],
      [prisma.revision as any, "findFirst", async () => ({ id: 70, intervalLevel: 4 })],
      [prisma.revision as any, "update", async () => ({})],
      [prisma.revision as any, "create", async (a: any) => { createdRevision = a.data; return a.data; }],
    ],
    async () => {
      const body = {
        problemId: 1,
        timeSpentSeconds: 600,
        status: "solved",
        attemptType: "Revision",
        submittedAt: "2026-06-01T00:00:00.000Z",
      };
      const res = await submissionsPOST({ json: async () => body } as any);
      assert.equal(res.status, 201);
      assert.ok(createdRevision, "a next revision should be created");
      // Unified schedule: min(4 + 1, 5) = 5 (60-day interval). The old buggy cap produced 3.
      assert.equal(createdRevision.intervalLevel, 5);
      // No auth header -> timezone resolves to UTC, so the due date is UTC midnight + interval days.
      const expected = new Date("2026-06-01T00:00:00.000Z");
      expected.setUTCDate(expected.getUTCDate() + REVISION_INTERVALS[5]);
      expected.setUTCHours(0, 0, 0, 0);
      assert.equal(new Date(createdRevision.nextReviewDate).getTime(), expected.getTime());
    }
  );
});

test("submissions POST on a first solve schedules an initial level-0 revision (+1 day)", async () => {
  let createdRevision: any = null;
  await withStubs(
    [
      [prisma.problem as any, "findUnique", async () => ({ id: 9 })],
      [prisma.submission as any, "findFirst", async () => null],
      [prisma.submission as any, "create", async (a: any) => ({ id: 501, ...a.data })],
      [prisma.submission as any, "findMany", async () => []],
      [prisma.dailyProgress as any, "findFirst", async () => null],
      [prisma.dailyProgress as any, "create", async () => ({})],
      // existingPendingRevision lookup -> none
      [prisma.revision as any, "findFirst", async () => null],
      [prisma.revision as any, "create", async (a: any) => { createdRevision = a.data; return a.data; }],
    ],
    async () => {
      const body = { problemId: 9, timeSpentSeconds: 800, status: "solved", attemptType: "First", submittedAt: "2026-06-01T00:00:00.000Z" };
      const res = await submissionsPOST({ json: async () => body } as any);
      assert.equal(res.status, 201);
      assert.ok(createdRevision);
      assert.equal(createdRevision.intervalLevel, 0);
      // No auth header -> timezone resolves to UTC, so the due date is UTC midnight + 1 day.
      const expected = new Date("2026-06-01T00:00:00.000Z");
      expected.setUTCDate(expected.getUTCDate() + 1);
      expected.setUTCHours(0, 0, 0, 0);
      assert.equal(new Date(createdRevision.nextReviewDate).getTime(), expected.getTime());
    }
  );
});

// ---------------------------------------------------------------------------
// revision complete: progression / regression / performance
// ---------------------------------------------------------------------------
test("revision complete: success advances level 3 -> 4 (30 days) and computes improvement", async () => {
  let nextData: any = null;
  await withStubs(
    [
      [prisma.revision as any, "findUnique", async () => ({ id: 10, intervalLevel: 3, completed: false, submissionId: 77, submission: { timeSpentSeconds: 1000, problem: {} } })],
      [prisma.revision as any, "update", async (a: any) => ({ id: 10, ...a.data, submission: { timeSpentSeconds: 1000, problem: { patterns: [] } } })],
      [prisma.revision as any, "create", async (a: any) => { nextData = a.data; return { id: 11, ...a.data }; }],
    ],
    async () => {
      const res = await completePOST({ json: async () => ({ wasSuccessful: true, timeSpentSeconds: 600 }) } as any, { params: Promise.resolve({ id: "10" }) } as any);
      const body = await res.json();
      assert.equal(nextData.intervalLevel, 4);
      assert.equal(body.performanceAnalysis.improvementSeconds, 400);
      assert.equal(body.performanceAnalysis.improvementPercentage, 40);
      assert.equal(body.performanceAnalysis.wasImprovement, true);
    }
  );
});

test("revision complete: failure regresses level 2 -> 1", async () => {
  let nextData: any = null;
  await withStubs(
    [
      [prisma.revision as any, "findUnique", async () => ({ id: 20, intervalLevel: 2, completed: false, submissionId: 88, submission: { timeSpentSeconds: 900, problem: {} } })],
      [prisma.revision as any, "update", async (a: any) => ({ id: 20, ...a.data, submission: { timeSpentSeconds: 900, problem: { patterns: [] } } })],
      [prisma.revision as any, "create", async (a: any) => { nextData = a.data; return { id: 21, ...a.data }; }],
    ],
    async () => {
      const res = await completePOST({ json: async () => ({ wasSuccessful: false }) } as any, { params: Promise.resolve({ id: "20" }) } as any);
      await res.json();
      assert.equal(nextData.intervalLevel, 1);
    }
  );
});

// ---------------------------------------------------------------------------
// revision history: null-safety (the fix)
// ---------------------------------------------------------------------------
test("revision history returns null (not NaN) when completed revisions have no recorded time/confidence", async () => {
  await withStubs(
    [
      [prisma.revision as any, "findUnique", async () => ({ id: 1, submissionId: 5, submission: { problem: { patterns: [] } } })],
      [prisma.revision as any, "findMany", async () => [
        { id: 1, intervalLevel: 0, completedAt: new Date(), wasSuccessful: true, timeSpentSeconds: null, solvedWithoutHint: null, confidenceLevel: null, difficultyRating: null, notes: null },
        { id: 2, intervalLevel: 1, completedAt: new Date(), wasSuccessful: false, timeSpentSeconds: null, solvedWithoutHint: null, confidenceLevel: null, difficultyRating: null, notes: null },
      ]],
    ],
    async () => {
      const res = await historyGET({} as any, { params: Promise.resolve({ id: "1" }) } as any);
      const body = await res.json();
      assert.equal(body.statistics.averageTimeSeconds, null);
      assert.equal(body.statistics.confidenceTrend, null);
      assert.equal(body.statistics.successRate, 50);
    }
  );
});

test("revision history computes averageTime and confidenceTrend when data is present", async () => {
  await withStubs(
    [
      [prisma.revision as any, "findUnique", async () => ({ id: 1, submissionId: 5, submission: { problem: { patterns: [] } } })],
      [prisma.revision as any, "findMany", async () => [
        { id: 1, intervalLevel: 0, completedAt: new Date("2026-04-01"), wasSuccessful: true, timeSpentSeconds: 1000, solvedWithoutHint: true, confidenceLevel: 3, difficultyRating: 3, notes: null },
        { id: 2, intervalLevel: 1, completedAt: new Date("2026-04-05"), wasSuccessful: true, timeSpentSeconds: 600, solvedWithoutHint: true, confidenceLevel: 5, difficultyRating: 2, notes: null },
      ]],
    ],
    async () => {
      const res = await historyGET({} as any, { params: Promise.resolve({ id: "1" }) } as any);
      const body = await res.json();
      assert.equal(body.statistics.averageTimeSeconds, 800);
      assert.equal(body.statistics.confidenceTrend, 2);
      assert.equal(body.revisionHistory[1].performance.improvementPercentage, 40);
    }
  );
});

// ---------------------------------------------------------------------------
// mock interview: create (no scoring) + submit-time scoring
// ---------------------------------------------------------------------------
test("mock POST creates an in-progress coding session from a bank question and converts timeLimit minutes->seconds", async () => {
  let created: any = null;
  await withStubs(
    [
      [prisma.problem as any, "findUnique", async () => ({ id: 5 })],
      [prisma.mockInterview as any, "create", async (a: any) => { created = a.data; return { id: 1, ...a.data }; }],
    ],
    async () => {
      const res = await mockPOST({ json: async () => ({ type: "coding", questionSource: "bank", questionId: 5, timeLimit: 30 }) } as any);
      assert.equal(res.status, 201);
      assert.equal(created.type, "coding");
      assert.equal(created.status, "inProgress");
      assert.equal(created.problemId, 5);
      assert.equal(created.timeLimit, 1800);
      // Scoring no longer happens at create time.
      assert.equal(created.overallScore, undefined);
    }
  );
});

test("mock POST defaults timeLimit to 2700 when not provided", async () => {
  let created: any = null;
  await withStubs(
    [
      [prisma.problem as any, "findUnique", async () => ({ id: 5 })],
      [prisma.mockInterview as any, "create", async (a: any) => { created = a.data; return { id: 2, ...a.data }; }],
    ],
    async () => {
      const res = await mockPOST({ json: async () => ({ type: "coding", questionSource: "bank", questionId: 5 }) } as any);
      assert.equal(res.status, 201);
      assert.equal(created.timeLimit, 2700);
    }
  );
});

test("mock PUT (coding submit) computes overallScore = avg(explanation, codeQuality) and completes the session", async () => {
  let updated: any = null;
  await withStubs(
    [
      [prisma.mockInterview as any, "findUnique", async () => ({ id: 1, type: "coding", date: new Date("2026-06-01T00:00:00.000Z") })],
      [prisma.mockInterview as any, "update", async (a: any) => { updated = a.data; return { id: 1, ...a.data }; }],
      [prisma.mockInterview as any, "count", async () => 1],
      [prisma.dailyProgress as any, "findFirst", async () => null],
      [prisma.dailyProgress as any, "create", async () => ({})],
    ],
    async () => {
      const res = await mockPUT(
        { json: async () => ({ explanationScore: 4, codeQualityScore: 2, timeTakenSeconds: 600, solved: true }) } as any,
        { params: Promise.resolve({ id: "1" }) } as any,
      );
      assert.equal(res.status, 200);
      assert.equal(updated.overallScore, 3);
      assert.equal(updated.status, "completed");
      assert.equal(updated.solved, true);
    }
  );
});

// ---------------------------------------------------------------------------
// company delete-guard
// ---------------------------------------------------------------------------
test("company DELETE is blocked (409) when problems are linked, allowed otherwise", async () => {
  let deleted = false;
  await withStubs(
    [
      [prisma.companyCard as any, "findUnique", async () => ({ id: 1 })],
      [prisma.problemCompany as any, "count", async () => 3],
      [prisma.companyCard as any, "delete", async () => { deleted = true; return {}; }],
    ],
    async () => {
      const res = await companyDELETE({} as any, { params: Promise.resolve({ id: "1" }) } as any);
      assert.equal(res.status, 409);
      assert.equal(deleted, false);
    }
  );
  await withStubs(
    [
      [prisma.companyCard as any, "findUnique", async () => ({ id: 2 })],
      [prisma.problemCompany as any, "count", async () => 0],
      [prisma.companyCard as any, "delete", async () => { deleted = true; return {}; }],
    ],
    async () => {
      const res = await companyDELETE({} as any, { params: Promise.resolve({ id: "2" }) } as any);
      assert.equal(res.status, 200);
      assert.equal(deleted, true);
    }
  );
});

// ---------------------------------------------------------------------------
// CSV import
// ---------------------------------------------------------------------------
test("CSV import creates new problems with pattern links and skips duplicates", async () => {
  const csv = [
    "Platform,Problem ID,Title,Difficulty,URL,Tags,Patterns",
    "leetcode,1,Two Sum,Easy,,Blind75,Hashing",
    "leetcode,2,Existing,Medium,,,",
  ].join("\n");
  let problemPatternCreates = 0;
  let problemCreates = 0;
  await withStubs(
    [
      [prisma.problem as any, "findUnique", async (a: any) => (a.where.platform_problemId.problemId === "2" ? { id: 99 } : null)],
      [prisma.problem as any, "create", async () => { problemCreates++; return { id: 1000 + problemCreates }; }],
      [prisma.problemTag as any, "create", async () => ({})],
      [prisma.pattern as any, "findFirst", async () => ({ id: 7, name: "Hashing" })],
      [prisma.problemPattern as any, "create", async () => { problemPatternCreates++; return {}; }],
    ],
    async () => {
      const file = { text: async () => csv };
      const req = { formData: async () => ({ get: () => file }) };
      const res = await csvPOST(req as any);
      const body = await res.json();
      assert.equal(body.imported, 1);
      assert.equal(body.skipped, 1);
      assert.equal(problemCreates, 1);
      assert.equal(problemPatternCreates, 1);
    }
  );
});

// ---------------------------------------------------------------------------
// goals: computed types (the fixes)
// ---------------------------------------------------------------------------
function goalReq() {
  return { nextUrl: new URL("http://localhost/api/goals") } as any;
}

test("goal companyReady now honors targetDifficulty in the query", async () => {
  let capturedWhere: any = null;
  await withStubs(
    [
      [prisma.goal as any, "findMany", async () => [
        { id: 4, type: "companyReady", title: "g", targetValue: 40, targetCompany: "Google", targetDifficulty: "medium", startDate: new Date("2026-04-11"), deadline: new Date("2026-05-11"), milestones: [] },
      ]],
      [prisma.submission as any, "count", async (a: any) => { capturedWhere = a.where; return 32; }],
    ],
    async () => {
      const res = await goalsGET(goalReq());
      const body = await res.json();
      assert.equal(body.goals[0].currentValue, 32);
      assert.equal(capturedWhere.problem.is.difficulty, "medium");
    }
  );
});

test("goal patternMastery counts Strong-confidence patterns", async () => {
  await withStubs(
    [
      [prisma.goal as any, "findMany", async () => [
        { id: 3, type: "patternMastery", title: "g", targetValue: 12, startDate: new Date("2026-04-11"), deadline: new Date("2026-05-11"), milestones: [] },
      ]],
      [prisma.problem as any, "findMany", async () => [
        // Strong: fast, no hints
        { id: 1, patterns: [{ pattern: { id: 1, name: "Hashing", category: "C" } }], submissions: [{ status: "solved", timeSpentSeconds: 600, wasHintUsed: false, submittedAt: new Date("2026-04-12") }] },
        // Weak: slow
        { id: 2, patterns: [{ pattern: { id: 2, name: "DP", category: "C" } }], submissions: [{ status: "solved", timeSpentSeconds: 3000, wasHintUsed: false, submittedAt: new Date("2026-04-12") }] },
      ]],
    ],
    async () => {
      const res = await goalsGET(goalReq());
      const body = await res.json();
      assert.equal(body.goals[0].currentValue, 1); // only "Hashing" is Strong
    }
  );
});

test("goal patternMastery scopes by targetPattern tokens and caps progress at 100%", async () => {
  await withStubs(
    [
      [prisma.goal as any, "findMany", async () => [
        { id: 3, type: "patternMastery", title: "g", targetValue: 1, targetPattern: "Core Fundamentals", startDate: new Date("2026-04-11"), deadline: new Date("2026-05-11"), milestones: [] },
      ]],
      [prisma.problem as any, "findMany", async () => [
        // Strong + in a "Core -" category -> matches the "core" token
        { id: 1, patterns: [{ pattern: { id: 1, name: "Hashing", category: "Core - Arrays & strings" } }], submissions: [{ status: "solved", timeSpentSeconds: 600, wasHintUsed: false, submittedAt: new Date("2026-04-12") }] },
        // Strong but NOT a core category -> excluded by scoping
        { id: 2, patterns: [{ pattern: { id: 2, name: "Sorting", category: "Standard" } }], submissions: [{ status: "solved", timeSpentSeconds: 600, wasHintUsed: false, submittedAt: new Date("2026-04-12") }] },
      ]],
    ],
    async () => {
      const res = await goalsGET(goalReq());
      const body = await res.json();
      assert.equal(body.goals[0].currentValue, 1); // only the Core-category Strong pattern counts
      assert.equal(body.goals[0].progressPercentage, 100); // capped (1/1 = 100, never >100)
    }
  );
});

test("goal speedImprovement computes avg minutes for target difficulty with lower-is-better progress", async () => {
  await withStubs(
    [
      [prisma.goal as any, "findMany", async () => [
        { id: 5, type: "speedImprovement", title: "g", targetValue: 25, targetDifficulty: "medium", startDate: new Date("2026-04-11"), deadline: new Date("2026-05-11"), milestones: [] },
      ]],
      [prisma.submission as any, "aggregate", async () => ({ _avg: { timeSpentSeconds: 1200 } })],
    ],
    async () => {
      const res = await goalsGET(goalReq());
      const body = await res.json();
      assert.equal(body.goals[0].currentValue, 20); // 1200s -> 20 min
      assert.equal(body.goals[0].progressPercentage, 100); // 20 <= 25 target -> achieved
    }
  );
});
