import test from "node:test";
import assert from "node:assert/strict";

import { GET } from "../app/api/analytics/patterns/confidence/route";
import { prisma } from "../lib/prisma";

test("confidence endpoint returns stable response shape with solvedProblemIds", async () => {
  const originalProblemFindMany = (prisma.problem as any).findMany;
  const originalPatternFindMany = (prisma.pattern as any).findMany;

  (prisma.problem as any).findMany = async () => [
    {
      id: 1,
      patterns: [{ pattern: { id: 101, name: "Sliding Window", category: "Array" } }],
      submissions: [
        {
          status: "solved",
          timeSpentSeconds: 1200,
          wasHintUsed: true,
          submittedAt: new Date("2026-04-01T10:00:00.000Z"),
        },
        {
          status: "failed",
          timeSpentSeconds: 1400,
          wasHintUsed: false,
          submittedAt: new Date("2026-04-02T10:00:00.000Z"),
        },
      ],
    },
    {
      id: 2,
      patterns: [
        { pattern: { id: 101, name: "Sliding Window", category: "Array" } },
        { pattern: { id: 102, name: "Hashing", category: "Array" } },
      ],
      submissions: [
        {
          status: "solved",
          timeSpentSeconds: 1500,
          wasHintUsed: true,
          submittedAt: new Date("2026-04-03T10:00:00.000Z"),
        },
      ],
    },
    {
      id: 3,
      patterns: [{ pattern: { id: 102, name: "Hashing", category: "Array" } }],
      submissions: [
        {
          status: "partial",
          timeSpentSeconds: 2000,
          wasHintUsed: false,
          submittedAt: new Date("2026-04-04T10:00:00.000Z"),
        },
      ],
    },
  ];

  (prisma.pattern as any).findMany = async () => [
    { id: 101, name: "Sliding Window", category: "Array" },
    { id: 102, name: "Hashing", category: "Array" },
  ];

  try {
    const request = {
      nextUrl: new URL("http://localhost:3000/api/analytics/patterns/confidence?minProblems=1"),
    } as any;

    const response = await GET(request);
    const body = await response.json();

    assert.equal(response.status, 200);

    assert.ok(Array.isArray(body.patterns));
    assert.ok(body.summary);
    assert.ok(body.categories);
    assert.ok(Array.isArray(body.recommendations));

    const firstPattern = body.patterns[0];
    assert.equal(typeof firstPattern.pattern, "string");
    assert.equal(typeof firstPattern.category, "string");
    assert.equal(typeof firstPattern.totalSolved, "number");
    assert.equal(typeof firstPattern.avgTimeSeconds, "number");
    assert.equal(typeof firstPattern.hintUsageRate, "number");
    assert.ok(["Weak", "Medium", "Strong"].includes(firstPattern.confidence));
    assert.ok(Array.isArray(firstPattern.problemIds));
    assert.ok(Array.isArray(firstPattern.solvedProblemIds));

    assert.equal(body.patterns.length, 2);
    assert.deepEqual(body.patterns[0].solvedProblemIds, [2]);
    assert.deepEqual(body.patterns[1].solvedProblemIds, [2]);

    assert.equal(typeof body.summary.totalPatterns, "number");
    assert.equal(typeof body.summary.weakCount, "number");
    assert.equal(typeof body.summary.mediumCount, "number");
    assert.equal(typeof body.summary.strongCount, "number");
    assert.ok(Array.isArray(body.summary.weakestPatterns));
    assert.ok(Array.isArray(body.summary.strongestPatterns));

    assert.ok(body.categories.Array);
    assert.equal(typeof body.categories.Array.total, "number");
    assert.equal(typeof body.categories.Array.avgTime, "number");
    assert.equal(typeof body.categories.Array.avgHintRate, "number");
  } finally {
    (prisma.problem as any).findMany = originalProblemFindMany;
    (prisma.pattern as any).findMany = originalPatternFindMany;
  }
});
