import test from "node:test";
import assert from "node:assert/strict";

import { GET as getRevisions, POST as createRevision } from "../app/api/revisions/route";
import { POST as completeRevision } from "../app/api/revisions/[id]/complete/route";
import { prisma } from "../lib/prisma";

test("completing a failed revision creates the next pending revision at a regressed level", async () => {
  const originalFindUnique = (prisma.revision as any).findUnique;
  const originalUpdate = (prisma.revision as any).update;
  const originalCreate = (prisma.revision as any).create;

  let capturedCreateData: any = null;

  (prisma.revision as any).findUnique = async () => ({
    id: 42,
    submissionId: 7,
    intervalLevel: 2,
    completed: false,
    submission: {
      timeSpentSeconds: 1800,
      problem: { id: 99, title: "Test Problem" },
    },
  });

  (prisma.revision as any).update = async () => ({
    id: 42,
    submissionId: 7,
    intervalLevel: 2,
    completed: true,
    submission: {
      timeSpentSeconds: 1800,
      problem: { id: 99, title: "Test Problem", patterns: [] },
    },
  });

  (prisma.revision as any).create = async ({ data }: any) => {
    capturedCreateData = data;
    return {
      id: 43,
      ...data,
      completed: false,
      submission: {
        problem: { id: 99, title: "Test Problem", patterns: [] },
      },
    };
  };

  try {
    const request = {
      json: async () => ({
        wasSuccessful: false,
        solvedWithoutHint: false,
      }),
    } as any;

    const response = await completeRevision(request, {
      params: Promise.resolve({ id: "42" }),
    });

    const body = await response.json();

    assert.equal(response.status, 200);
    assert.ok(body.nextRevision, "Expected nextRevision to be created on failure");
    assert.equal(capturedCreateData.intervalLevel, 1);
    assert.equal(capturedCreateData.previousRevisionId, 42);

    const scheduled = new Date(capturedCreateData.nextReviewDate);
    assert.equal(scheduled.getHours(), 0);
    assert.equal(scheduled.getMinutes(), 0);
    assert.equal(scheduled.getSeconds(), 0);
    assert.equal(scheduled.getMilliseconds(), 0);
  } finally {
    (prisma.revision as any).findUnique = originalFindUnique;
    (prisma.revision as any).update = originalUpdate;
    (prisma.revision as any).create = originalCreate;
  }
});

test("revisions API buckets due and upcoming using stable day boundaries", async () => {
  const originalFindMany = (prisma.revision as any).findMany;
  const originalGroupBy = (prisma.revision as any).groupBy;
  const originalCount = (prisma.revision as any).count;

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const endOfUpcomingWindow = new Date(startOfToday);
  endOfUpcomingWindow.setDate(endOfUpcomingWindow.getDate() + 8);

  const revisions = [
    { id: 1, nextReviewDate: new Date(startOfToday.getTime() - 1), completed: false, intervalLevel: 0 },
    { id: 2, nextReviewDate: new Date(startOfToday.getTime() + 60 * 60 * 1000), completed: false, intervalLevel: 0 },
    { id: 3, nextReviewDate: new Date(startOfTomorrow), completed: false, intervalLevel: 1 },
    { id: 4, nextReviewDate: new Date(endOfUpcomingWindow.getTime() - 1), completed: false, intervalLevel: 2 },
    { id: 5, nextReviewDate: new Date(endOfUpcomingWindow), completed: false, intervalLevel: 2 },
  ];

  (prisma.revision as any).findMany = async (args: any) => {
    const where = args?.where ?? {};
    const nextReviewDate = where.nextReviewDate ?? {};

    return revisions
      .filter((rev) => {
        const matchesCompleted = where.completed === undefined ? true : rev.completed === where.completed;
        const matchesGte = nextReviewDate.gte === undefined ? true : rev.nextReviewDate >= nextReviewDate.gte;
        const matchesLt = nextReviewDate.lt === undefined ? true : rev.nextReviewDate < nextReviewDate.lt;
        return matchesCompleted && matchesGte && matchesLt;
      })
      .sort((a, b) => a.nextReviewDate.getTime() - b.nextReviewDate.getTime());
  };

  (prisma.revision as any).groupBy = async () => [];

  let countCall = 0;
  (prisma.revision as any).count = async () => {
    countCall += 1;
    return countCall === 1 ? revisions.length : 0;
  };

  try {
    const response = await getRevisions({ nextUrl: new URL("http://localhost:3000/api/revisions") } as any);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(
      body.dueToday.map((r: any) => r.id),
      [1, 2]
    );
    assert.deepEqual(
      body.upcoming.map((r: any) => r.id),
      [3, 4]
    );
    assert.equal(body.statistics.overdue, 1);

    // Ensure boundary item at exactly endOfUpcomingWindow is excluded.
    assert.ok(!body.upcoming.some((r: any) => r.id === 5));
  } finally {
    (prisma.revision as any).findMany = originalFindMany;
    (prisma.revision as any).groupBy = originalGroupBy;
    (prisma.revision as any).count = originalCount;
  }
});

test("creating a revision without explicit date schedules at local midnight", async () => {
  const originalFindUnique = (prisma.submission as any).findUnique;
  const originalCreate = (prisma.revision as any).create;

  let capturedCreateData: any = null;

  (prisma.submission as any).findUnique = async () => ({
    id: 123,
    problem: { title: "Two Sum" },
  });

  (prisma.revision as any).create = async ({ data }: any) => {
    capturedCreateData = data;
    return {
      id: 456,
      ...data,
      submission: {
        problem: { id: 1, title: "Two Sum", difficulty: "Easy" },
      },
    };
  };

  try {
    const request = {
      json: async () => ({
        submissionId: 123,
        intervalLevel: 1,
      }),
    } as any;

    const response = await createRevision(request);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.success, true);

    const scheduled = new Date(capturedCreateData.nextReviewDate);
    assert.equal(scheduled.getHours(), 0);
    assert.equal(scheduled.getMinutes(), 0);
    assert.equal(scheduled.getSeconds(), 0);
    assert.equal(scheduled.getMilliseconds(), 0);
  } finally {
    (prisma.submission as any).findUnique = originalFindUnique;
    (prisma.revision as any).create = originalCreate;
  }
});
