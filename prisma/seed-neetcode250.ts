import { PrismaClient } from '@prisma/client'
import { NEETCODE_250_ALL_IDS, NEETCODE_250_CUSTOM_IDS, NEETCODE_250_EXTRA_PROBLEMS, NEETCODE_250_TAG } from './seed-data/neetcode250'

// Standalone, insert-only seeder for NeetCode 250. Unlike prisma/seed.ts it never
// updates or deletes existing rows:
//   1. creates the NeetCode 250 problems that are not in NeetCode 150 (skipping
//      any that already exist for the seed user),
//   2. adds the Neetcode250 tag to every NeetCode 250 problem that lacks it
//      (this covers the 150 problems seeded earlier),
//   3. verifies the seed user's Neetcode250-tagged problems match the official list
//      plus NEETCODE_250_CUSTOM_IDS.
//
// Dry run (default):  npx tsx prisma/seed-neetcode250.ts
// Apply:              npx tsx prisma/seed-neetcode250.ts --apply

const prisma = new PrismaClient()

const SEED_USER_ID = process.env.SEED_USER_ID ?? 'usr_nayeem1505'
const APPLY = process.argv.includes('--apply')

async function main() {
  const problems = NEETCODE_250_EXTRA_PROBLEMS
  const allIds = new Set(NEETCODE_250_ALL_IDS)

  const ids = problems.map((p) => p.problemId)
  if (new Set(ids).size !== ids.length) {
    throw new Error('Duplicate problemId in NEETCODE_250_EXTRA_PROBLEMS')
  }
  if (allIds.size !== 250 + NEETCODE_250_CUSTOM_IDS.length || ids.some((id) => !allIds.has(id))) {
    throw new Error('NEETCODE_250_ALL_IDS must hold the 250 official ids plus custom ids, including every extra problem')
  }

  // Resolve every referenced pattern/company up front so a missing reference
  // aborts before anything is written.
  const patternNames = [...new Set(problems.flatMap((p) => p.patternNames))]
  const companyNames = [...new Set(problems.flatMap((p) => p.companies))]

  const patternRows = await prisma.pattern.findMany({
    where: { userId: SEED_USER_ID, name: { in: patternNames } },
    select: { id: true, name: true },
  })
  const companyRows = await prisma.companyCard.findMany({
    where: { userId: SEED_USER_ID, name: { in: companyNames } },
    select: { id: true, name: true },
  })

  const patternIdByName = new Map(patternRows.map((row) => [row.name, row.id]))
  const companyIdByName = new Map(companyRows.map((row) => [row.name, row.id]))

  const missingPatterns = patternNames.filter((name) => !patternIdByName.has(name))
  const missingCompanies = companyNames.filter((name) => !companyIdByName.has(name))
  if (missingPatterns.length > 0 || missingCompanies.length > 0) {
    throw new Error(
      `Missing references for user ${SEED_USER_ID}. Patterns: [${missingPatterns.join(', ')}] Companies: [${missingCompanies.join(', ')}]. Run the main seed first.`,
    )
  }

  const existing = await prisma.problem.findMany({
    where: { userId: SEED_USER_ID, platform: 'leetcode', problemId: { in: ids } },
    select: { problemId: true },
  })
  const existingIds = new Set(existing.map((row) => row.problemId))
  const toCreate = problems.filter((p) => !existingIds.has(p.problemId))

  // NeetCode 250 problems already in the DB (e.g. the 150) that still need the tag.
  const toTag = await prisma.problem.findMany({
    where: {
      userId: SEED_USER_ID,
      platform: 'leetcode',
      problemId: { in: [...allIds] },
      tags: { none: { tag: NEETCODE_250_TAG } },
    },
    select: { id: true, problemId: true, title: true },
    orderBy: { id: 'asc' },
  })

  console.log(`User: ${SEED_USER_ID}`)
  console.log(`NeetCode 250 extra problems: ${problems.length}`)
  console.log(`  already present (skipped): ${existingIds.size}`)
  console.log(`  to create:                 ${toCreate.length}`)
  console.log(`Existing problems to tag ${NEETCODE_250_TAG}: ${toTag.length}`)

  if (!APPLY) {
    for (const p of toCreate) {
      console.log(`  + ${p.problemId.padStart(4)} [${p.difficulty}] ${p.title}  patterns=[${p.patternNames.join(', ')}] companies=[${p.companies.join(', ')}]`)
    }
    for (const p of toTag) {
      console.log(`  # ${p.problemId.padStart(4)} ${p.title}`)
    }
    console.log('\nDry run only. Re-run with --apply to write to the database.')
    return
  }

  let created = 0
  for (const p of toCreate) {
    // Nested create keeps each problem and its relations atomic.
    await prisma.problem.create({
      data: {
        userId: SEED_USER_ID,
        platform: p.platform,
        problemId: p.problemId,
        title: p.title,
        difficulty: p.difficulty,
        url: p.url,
        source: 'NeetCode',
        tags: {
          create: p.tags.map((tag) => ({ userId: SEED_USER_ID, tag })),
        },
        patterns: {
          create: p.patternNames.map((name) => ({ userId: SEED_USER_ID, patternId: patternIdByName.get(name)! })),
        },
        companies: {
          create: p.companies.map((name) => ({ userId: SEED_USER_ID, companyId: companyIdByName.get(name)! })),
        },
      },
    })
    created += 1
  }
  console.log(`Created ${created} problems.`)

  if (toTag.length > 0) {
    const { count } = await prisma.problemTag.createMany({
      data: toTag.map((p) => ({ userId: SEED_USER_ID, problemId: p.id, tag: NEETCODE_250_TAG })),
    })
    console.log(`Tagged ${count} existing problems with ${NEETCODE_250_TAG}.`)
  }

  // Cross-check: tagged problems must be exactly the official NeetCode 250 plus custom ids.
  const tagged = await prisma.problem.findMany({
    where: { userId: SEED_USER_ID, platform: 'leetcode', tags: { some: { tag: NEETCODE_250_TAG } } },
    select: { problemId: true },
  })
  const taggedIds = new Set(tagged.map((row) => row.problemId))
  const missing = [...allIds].filter((id) => !taggedIds.has(id))
  const extra = [...taggedIds].filter((id) => !allIds.has(id))
  console.log(`Verification: ${taggedIds.size} problems tagged ${NEETCODE_250_TAG}; missing=[${missing.join(', ')}] extra=[${extra.join(', ')}]`)
  if (missing.length > 0 || extra.length > 0) {
    process.exitCode = 1
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
