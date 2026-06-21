// Rebuilds a user's cached daily_progress rows from raw events, bucketed by the user's timezone.
//
// Needed because daily_progress.date stores the start-of-local-day as a UTC instant. When the day
// boundary changes — the one-time UTC->timezone migration, or a user later changing their timezone —
// the cached rows are keyed to the OLD boundary and must be regenerated from the source events
// (submissions, completed mock interviews, system-design/behavioral attempts).
//
// The @@unique([userId, date]) constraint makes an in-place upsert unsafe across the semantic change
// (old UTC-midnight instants vs new local-midnight instants are different rows), so we delete the
// user's rows and recreate them in a single transaction.

// Relative imports (not @/ alias) so this module also resolves when run via `tsx` in the CLI script.
import { calculateDailyProgressSnapshot } from "../analytics/daily-progress-metrics";
import { dayKey, startOfDayInstant } from "../datetime/tz";

interface RebuiltRow {
  userId: string;
  date: Date;
  problemsSolved: number;
  totalTimeSpent: number;
  patternsWorked: number;
  mockInterviews: number;
  systemDesignAttempts: number;
  behavioralAttempts: number;
}

// `db` is an un-scoped PrismaClient (authPrisma in the app, or a raw client in the CLI script). All
// queries filter by userId explicitly since the user-scoping extension is not in play here.
export async function rebuildDailyProgressForUser(
  db: any,
  userId: string,
  tz: string,
): Promise<number> {
  const [submissions, mockInterviews, sdAttempts, bhAttempts] = await Promise.all([
    db.submission.findMany({
      where: { userId },
      include: { problem: { include: { patterns: { include: { pattern: true } } } } },
    }),
    db.mockInterview.findMany({
      where: { userId, status: "completed" },
      select: { date: true },
    }),
    db.systemDesignAttempt.findMany({ where: { userId }, select: { submittedAt: true } }),
    db.behavioralAttempt.findMany({ where: { userId }, select: { submittedAt: true } }),
  ]);

  // Accumulate per local-day buckets.
  const submissionsByDay = new Map<string, any[]>();
  for (const sub of submissions) {
    const key = dayKey(new Date(sub.submittedAt), tz);
    (submissionsByDay.get(key) ?? submissionsByDay.set(key, []).get(key)!).push(sub);
  }

  const mockCountByDay = new Map<string, number>();
  for (const mock of mockInterviews) {
    const key = dayKey(new Date(mock.date), tz);
    mockCountByDay.set(key, (mockCountByDay.get(key) ?? 0) + 1);
  }

  const sdCountByDay = new Map<string, number>();
  for (const a of sdAttempts) {
    const key = dayKey(new Date(a.submittedAt), tz);
    sdCountByDay.set(key, (sdCountByDay.get(key) ?? 0) + 1);
  }

  const bhCountByDay = new Map<string, number>();
  for (const a of bhAttempts) {
    const key = dayKey(new Date(a.submittedAt), tz);
    bhCountByDay.set(key, (bhCountByDay.get(key) ?? 0) + 1);
  }

  // The set of all local days that have any activity.
  const allKeys = new Set<string>([
    ...submissionsByDay.keys(),
    ...mockCountByDay.keys(),
    ...sdCountByDay.keys(),
    ...bhCountByDay.keys(),
  ]);

  const rows: RebuiltRow[] = [];
  for (const key of allKeys) {
    const snapshot = calculateDailyProgressSnapshot(submissionsByDay.get(key) ?? []);
    rows.push({
      userId,
      date: startOfDayInstant(key, tz),
      problemsSolved: snapshot.problemsSolved,
      totalTimeSpent: snapshot.totalTimeSpent,
      patternsWorked: snapshot.patternsWorked,
      mockInterviews: mockCountByDay.get(key) ?? 0,
      systemDesignAttempts: sdCountByDay.get(key) ?? 0,
      behavioralAttempts: bhCountByDay.get(key) ?? 0,
    });
  }

  // Wipe then recreate — the table is empty for this user inside the transaction, so the
  // (userId, date) unique constraint can never collide with stale rows.
  await db.$transaction([
    db.dailyProgress.deleteMany({ where: { userId } }),
    ...(rows.length > 0 ? [db.dailyProgress.createMany({ data: rows })] : []),
  ]);

  return rows.length;
}
