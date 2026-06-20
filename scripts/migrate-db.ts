/**
 * Database migration script: copies all data from old Supabase DB to new Supabase DB.
 * Run AFTER deploying Prisma schema to the new DB.
 *
 * Usage:
 *   npx ts-node scripts/migrate-db.ts
 *   (or: npx tsx scripts/migrate-db.ts)
 */

import { PrismaClient } from "@prisma/client";

// Source DB (old)
const SOURCE_URL =
  "postgresql://postgres.gteqllhqlhlzdbhdodhi:2026%40AlgoMetric%24@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres";

// Target DB (new) — direct connection for migrations
const TARGET_URL =
  "postgresql://postgres.pdbdtijcadwbtzpzhebz:2026%40NuCleu%24@aws-1-ap-south-1.pooler.supabase.com:5432/algometrics_db";

const src = new PrismaClient({ datasources: { db: { url: SOURCE_URL } } });
const dst = new PrismaClient({ datasources: { db: { url: TARGET_URL } } });

async function migrate() {
  console.log("Connecting to source and target databases...");
  await src.$connect();
  await dst.$connect();

  try {
    // ── 1. Users ────────────────────────────────────────────────────────────
    const users = await src.user.findMany();
    console.log(`Migrating ${users.length} users...`);
    for (const u of users) {
      await dst.user.upsert({ where: { id: u.id }, update: u, create: u });
    }

    // ── 2. Problems (no FK deps except userId) ──────────────────────────────
    const problems = await src.problem.findMany();
    console.log(`Migrating ${problems.length} problems...`);
    for (const p of problems) {
      await dst.problem.upsert({
        where: { id: p.id },
        update: p,
        create: p,
      });
    }
    // Reset sequence so auto-increment continues correctly
    const maxProblemId = problems.reduce((m, p) => Math.max(m, p.id), 0);
    if (maxProblemId > 0) {
      await dst.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"problems"', 'id'), ${maxProblemId})`
      );
    }

    // ── 3. Patterns ─────────────────────────────────────────────────────────
    const patterns = await src.pattern.findMany();
    console.log(`Migrating ${patterns.length} patterns...`);
    for (const p of patterns) {
      await dst.pattern.upsert({ where: { id: p.id }, update: p, create: p });
    }
    const maxPatternId = patterns.reduce((m, p) => Math.max(m, p.id), 0);
    if (maxPatternId > 0) {
      await dst.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"patterns"', 'id'), ${maxPatternId})`
      );
    }

    // ── 4. CompanyCards ─────────────────────────────────────────────────────
    const companies = await src.companyCard.findMany();
    console.log(`Migrating ${companies.length} company cards...`);
    for (const c of companies) {
      await dst.companyCard.upsert({
        where: { id: c.id },
        update: c,
        create: c,
      });
    }
    const maxCompanyId = companies.reduce((m, c) => Math.max(m, c.id), 0);
    if (maxCompanyId > 0) {
      await dst.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"company_cards"', 'id'), ${maxCompanyId})`
      );
    }

    // ── 5. ProblemTags ──────────────────────────────────────────────────────
    const tags = await src.problemTag.findMany();
    console.log(`Migrating ${tags.length} problem tags...`);
    for (const t of tags) {
      await dst.problemTag.upsert({ where: { id: t.id }, update: t, create: t });
    }
    const maxTagId = tags.reduce((m, t) => Math.max(m, t.id), 0);
    if (maxTagId > 0) {
      await dst.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"problem_tags"', 'id'), ${maxTagId})`
      );
    }

    // ── 6. ProblemCompanies ─────────────────────────────────────────────────
    const problemCompanies = await src.problemCompany.findMany();
    console.log(`Migrating ${problemCompanies.length} problem-company links...`);
    for (const pc of problemCompanies) {
      await dst.problemCompany.upsert({
        where: { id: pc.id },
        update: pc,
        create: pc,
      });
    }
    const maxPcId = problemCompanies.reduce((m, pc) => Math.max(m, pc.id), 0);
    if (maxPcId > 0) {
      await dst.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"problem_companies"', 'id'), ${maxPcId})`
      );
    }

    // ── 7. ProblemPatterns ──────────────────────────────────────────────────
    const problemPatterns = await src.problemPattern.findMany();
    console.log(`Migrating ${problemPatterns.length} problem-pattern links...`);
    for (const pp of problemPatterns) {
      await dst.problemPattern.upsert({
        where: { id: pp.id },
        update: pp,
        create: pp,
      });
    }
    const maxPpId = problemPatterns.reduce((m, pp) => Math.max(m, pp.id), 0);
    if (maxPpId > 0) {
      await dst.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"problem_patterns"', 'id'), ${maxPpId})`
      );
    }

    // ── 8. Submissions ──────────────────────────────────────────────────────
    const submissions = await src.submission.findMany();
    console.log(`Migrating ${submissions.length} submissions...`);
    for (const s of submissions) {
      await dst.submission.upsert({
        where: { id: s.id },
        update: s,
        create: s,
      });
    }
    const maxSubId = submissions.reduce((m, s) => Math.max(m, s.id), 0);
    if (maxSubId > 0) {
      await dst.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"submissions"', 'id'), ${maxSubId})`
      );
    }

    // ── 9. Revisions (depends on submissions) ──────────────────────────────
    const revisions = await src.revision.findMany();
    console.log(`Migrating ${revisions.length} revisions...`);
    for (const r of revisions) {
      await dst.revision.upsert({ where: { id: r.id }, update: r, create: r });
    }
    const maxRevId = revisions.reduce((m, r) => Math.max(m, r.id), 0);
    if (maxRevId > 0) {
      await dst.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"revisions"', 'id'), ${maxRevId})`
      );
    }

    // ── 10. Sessions ────────────────────────────────────────────────────────
    const sessions = await src.session.findMany();
    console.log(`Migrating ${sessions.length} sessions...`);
    for (const s of sessions) {
      await dst.session.upsert({ where: { id: s.id }, update: s, create: s });
    }
    const maxSessionId = sessions.reduce((m, s) => Math.max(m, s.id), 0);
    if (maxSessionId > 0) {
      await dst.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"sessions"', 'id'), ${maxSessionId})`
      );
    }

    // ── 11. MockInterviews ──────────────────────────────────────────────────
    const mocks = await src.mockInterview.findMany();
    console.log(`Migrating ${mocks.length} mock interviews...`);
    for (const m of mocks) {
      await dst.mockInterview.upsert({ where: { id: m.id }, update: m, create: m });
    }
    const maxMockId = mocks.reduce((m, mi) => Math.max(m, mi.id), 0);
    if (maxMockId > 0) {
      await dst.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"mock_interviews"', 'id'), ${maxMockId})`
      );
    }

    // ── 12. DailyProgress ──────────────────────────────────────────────────
    const dailyProgress = await src.dailyProgress.findMany();
    console.log(`Migrating ${dailyProgress.length} daily progress records...`);
    for (const dp of dailyProgress) {
      await dst.dailyProgress.upsert({
        where: { id: dp.id },
        update: dp,
        create: dp,
      });
    }
    const maxDpId = dailyProgress.reduce((m, dp) => Math.max(m, dp.id), 0);
    if (maxDpId > 0) {
      await dst.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"daily_progress"', 'id'), ${maxDpId})`
      );
    }

    // ── 13. Goals ───────────────────────────────────────────────────────────
    const goals = await src.goal.findMany();
    console.log(`Migrating ${goals.length} goals...`);
    for (const g of goals) {
      await dst.goal.upsert({ where: { id: g.id }, update: g, create: g });
    }
    const maxGoalId = goals.reduce((m, g) => Math.max(m, g.id), 0);
    if (maxGoalId > 0) {
      await dst.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"goals"', 'id'), ${maxGoalId})`
      );
    }

    // ── 14. Milestones (depends on goals) ──────────────────────────────────
    const milestones = await src.milestone.findMany();
    console.log(`Migrating ${milestones.length} milestones...`);
    for (const m of milestones) {
      await dst.milestone.upsert({ where: { id: m.id }, update: m, create: m });
    }
    const maxMilestoneId = milestones.reduce((m, ms) => Math.max(m, ms.id), 0);
    if (maxMilestoneId > 0) {
      await dst.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"milestones"', 'id'), ${maxMilestoneId})`
      );
    }

    console.log("\n✓ Migration complete!");
  } finally {
    await src.$disconnect();
    await dst.$disconnect();
  }
}

migrate().catch((e) => {
  console.error("Migration failed:", e);
  process.exit(1);
});
