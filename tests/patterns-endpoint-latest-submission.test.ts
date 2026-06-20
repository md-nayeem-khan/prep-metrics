import test from "node:test";
import assert from "node:assert/strict";

import { GET } from "../app/api/analytics/patterns/route";
import { prisma } from "../lib/prisma";

test("patterns endpoint uses latest submission per problem and counts solved only when latest is solved", async () => {
  const originalPatternFindMany = (prisma.pattern as any).findMany;

  (prisma.pattern as any).findMany = async () => [
    {
      id: 10,
      name: "Sliding Window",
      category: "Array",
      problems: [
        {
          problem: {
            submissions: [
              {
                status: "solved",
                timeSpentSeconds: 1200,
                submittedAt: new Date("2026-04-01T10:00:00.000Z"),
              },
              {
                status: "failed",
                timeSpentSeconds: 1500,
                submittedAt: new Date("2026-04-02T10:00:00.000Z"),
              },
            ],
          },
        },
        {
          problem: {
            submissions: [
              {
                status: "failed",
                timeSpentSeconds: 1700,
                submittedAt: new Date("2026-04-02T09:00:00.000Z"),
              },
              {
                status: "solved",
                timeSpentSeconds: 1800,
                submittedAt: new Date("2026-04-03T09:00:00.000Z"),
              },
            ],
          },
        },
        {
          problem: {
            submissions: [
              {
                status: "partial",
                timeSpentSeconds: 900,
                submittedAt: new Date("2026-04-04T09:00:00.000Z"),
              },
            ],
          },
        },
      ],
    },
  ];

  try {
    const response = await GET();
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(body.patterns));
    assert.equal(body.patterns.length, 1);

    const pattern = body.patterns[0];
    assert.equal(pattern.name, "Sliding Window");
    assert.equal(pattern.problemCount, 3);

    // Only problem 2 has latest status = solved.
    assert.equal(pattern.totalTimeSeconds, 1800);
    assert.equal(pattern.avgTimeSeconds, 1800);
  } finally {
    (prisma.pattern as any).findMany = originalPatternFindMany;
  }
});
