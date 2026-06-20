import test from "node:test";
import assert from "node:assert/strict";

import { GET } from "../app/api/analytics/company/[companyId]/route";
import { prisma } from "../lib/prisma";

test("company analytics endpoint uses latest submission per problem and returns confidence/mastery", async () => {
  const originalCompanyFindUnique = (prisma.companyCard as any).findUnique;
  const originalProblemFindMany = (prisma.problem as any).findMany;

  (prisma.companyCard as any).findUnique = async () => ({
    id: 1,
    name: "Acme",
  });

  (prisma.problem as any).findMany = async () => [
    {
      id: 101,
      title: "Two Sum",
      difficulty: "Easy",
      submissions: [
        {
          status: "solved",
          timeSpentSeconds: 1500,
          wasHintUsed: true,
          submittedAt: new Date("2026-04-01T10:00:00.000Z"),
        },
        {
          status: "failed",
          timeSpentSeconds: 1400,
          wasHintUsed: false,
          submittedAt: new Date("2026-04-04T10:00:00.000Z"),
        },
        {
          status: "solved",
          timeSpentSeconds: 900,
          wasHintUsed: false,
          submittedAt: new Date("2026-04-02T10:00:00.000Z"),
        },
      ],
      patterns: [{ pattern: { name: "Hash Map" } }],
    },
    {
      id: 102,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      submissions: [
        {
          status: "failed",
          timeSpentSeconds: 1800,
          wasHintUsed: true,
          submittedAt: new Date("2026-04-01T11:00:00.000Z"),
        },
        {
          status: "solved",
          timeSpentSeconds: 1200,
          wasHintUsed: false,
          submittedAt: new Date("2026-04-03T11:00:00.000Z"),
        },
      ],
      patterns: [{ pattern: { name: "Sliding Window" } }],
    },
    {
      id: 103,
      title: "Word Search",
      difficulty: "Medium",
      submissions: [
        {
          status: "failed",
          timeSpentSeconds: 2100,
          wasHintUsed: true,
          submittedAt: new Date("2026-04-03T12:00:00.000Z"),
        },
      ],
      patterns: [{ pattern: { name: "Backtracking" } }],
    },
  ];

  try {
    const response = await GET({} as any, {
      params: Promise.resolve({ companyId: "1" }),
    });

    const body = await response.json();

    assert.equal(response.status, 200);

    assert.equal(body.summary.totalProblems, 3);
    assert.equal(body.summary.solvedProblems, 1);
    assert.deepEqual(body.summary.solvedProblemIds, [102]);
    assert.equal(body.summary.completionRate, 33);

    // Latest submission per problem; only problem 102 latest is solved.
    assert.equal(body.summary.avgTimeSeconds, 1200);
    assert.equal(body.summary.hintPercentage, 0);
    assert.equal(body.summary.confidence, "Strong");
    assert.equal(body.summary.masteryPercentage, 85);

    assert.equal(body.byDifficulty.Easy.total, 1);
    assert.equal(body.byDifficulty.Easy.solved, 0);
    assert.equal(body.byDifficulty.Medium.total, 2);
    assert.equal(body.byDifficulty.Medium.solved, 1);

    const hashMap = body.patternCoverage.find((item: any) => item.pattern === "Hash Map");
    const backtracking = body.patternCoverage.find((item: any) => item.pattern === "Backtracking");
    assert.ok(hashMap);
    assert.ok(backtracking);
    assert.equal(hashMap.solved, 0);
    assert.equal(backtracking.solved, 0);
  } finally {
    (prisma.companyCard as any).findUnique = originalCompanyFindUnique;
    (prisma.problem as any).findMany = originalProblemFindMany;
  }
});
