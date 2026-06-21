/**
 * One-time backfill: rebuild every user's daily_progress rows from raw events, bucketed by each
 * user's timezone. Run AFTER deploying the add_user_timezone migration.
 *
 * daily_progress.date previously stored UTC-midnight; it now stores the user's local-midnight as a
 * UTC instant. This script wipes and regenerates the cached rows so historical streaks and the
 * calendar heatmap are correct for non-UTC users.
 *
 * Usage:
 *   npx tsx scripts/backfill-daily-progress.ts            # all users
 *   npx tsx scripts/backfill-daily-progress.ts --user <userId>
 *   npx tsx scripts/backfill-daily-progress.ts --dry-run  # report only, no writes
 */

import { PrismaClient } from "@prisma/client";
import { rebuildDailyProgressForUser } from "../lib/server/daily-progress-backfill";
import { isValidTimeZone } from "../lib/datetime/tz";

function parseArgs(argv: string[]) {
  const args = { userId: null as string | null, dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--user") {
      args.userId = argv[i + 1] ?? null;
      i += 1;
    } else if (argv[i] === "--dry-run") {
      args.dryRun = true;
    }
  }
  return args;
}

async function main() {
  const { userId, dryRun } = parseArgs(process.argv.slice(2));
  const db = new PrismaClient();

  try {
    const users = await db.user.findMany({
      where: userId ? { id: userId } : undefined,
      select: { id: true, email: true, timezone: true },
    });

    console.log(
      `Backfilling daily_progress for ${users.length} user(s)${dryRun ? " (dry run)" : ""}...`,
    );

    for (const user of users) {
      const tz = isValidTimeZone(user.timezone) ? user.timezone : "UTC";

      if (dryRun) {
        const existing = await db.dailyProgress.count({ where: { userId: user.id } });
        console.log(`  [dry-run] ${user.email} (tz=${tz}): ${existing} existing rows would be rebuilt`);
        continue;
      }

      const count = await rebuildDailyProgressForUser(db, user.id, tz);
      console.log(`  ${user.email} (tz=${tz}): rebuilt ${count} day rows`);
    }

    console.log("\n✓ Backfill complete!");
  } finally {
    await db.$disconnect();
  }
}

main().catch((e) => {
  console.error("Backfill failed:", e);
  process.exit(1);
});
