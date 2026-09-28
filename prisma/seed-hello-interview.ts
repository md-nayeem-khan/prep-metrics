import { Prisma, PrismaClient } from '@prisma/client'
import { SD_QUESTION_SEED, SD_TOPIC_SEED, type SDQuestionSeed } from './seed-data/system-design'
import {
  HELLO_INTERVIEW_LIST,
  HELLO_INTERVIEW_LLD_QUESTIONS,
  HELLO_INTERVIEW_PATTERNS,
  HELLO_INTERVIEW_SD_QUESTIONS,
  HELLO_INTERVIEW_SOURCE,
  LLD_INFERRED_TOPIC_LINKS,
  helloInterviewUrl,
} from './seed-data/hello-interview'
import { LLD_CATEGORY } from '../types/system-design'

// Standalone seeder for the system design bank: the curated questions plus the Hello
// Interview system design (32) and low-level design (9) lists, and every topic they use.
// Unlike prisma/seed.ts it never deletes rows or overwrites written content:
//   - missing topics and questions are created,
//   - existing questions only get difficulty, source, and url set,
//   - missing topic/company links are added (existing links are kept).
// All writes run in one transaction; afterwards the seed user's data is verified.
//
// Dry run (default):  npx tsx prisma/seed-hello-interview.ts
// Apply:              npx tsx prisma/seed-hello-interview.ts --apply

const prisma = new PrismaClient()

const SEED_USER_ID = process.env.SEED_USER_ID ?? 'usr_nayeem1505'
const APPLY = process.argv.includes('--apply')

const EXPECTED = { questions: 48, topics: 37, helloInterview: 41, helloInterviewSD: 32, helloInterviewLLD: 9 }
// Slugs this list renamed; if they exist the seeder leaves them alone and reports them.
const LEGACY_SLUGS = ['design-twitter-news-feed', 'design-proximity-service']

const QUESTIONS: SDQuestionSeed[] = [...SD_QUESTION_SEED, ...HELLO_INTERVIEW_SD_QUESTIONS, ...HELLO_INTERVIEW_LLD_QUESTIONS]

type Db = Prisma.TransactionClient | PrismaClient

// Validates the seed data itself before touching the database.
function checkSeedData() {
  const errors: string[] = []
  const slugs = QUESTIONS.map((q) => q.slug)
  const topicNames = new Set(SD_TOPIC_SEED.map((t) => t.name))
  const bySlug = new Map(QUESTIONS.map((q) => [q.slug, q]))

  if (new Set(slugs).size !== slugs.length) errors.push('duplicate question slug')
  if (topicNames.size !== SD_TOPIC_SEED.length) errors.push('duplicate topic name')
  if (QUESTIONS.length !== EXPECTED.questions) errors.push(`expected ${EXPECTED.questions} questions, found ${QUESTIONS.length}`)
  if (SD_TOPIC_SEED.length !== EXPECTED.topics) errors.push(`expected ${EXPECTED.topics} topics, found ${SD_TOPIC_SEED.length}`)
  for (const pattern of HELLO_INTERVIEW_PATTERNS) {
    if (!topicNames.has(pattern)) errors.push(`missing Hello Interview pattern topic: ${pattern}`)
  }

  for (const q of QUESTIONS) {
    const unknown = q.topics.filter((name) => !topicNames.has(name))
    if (unknown.length > 0) errors.push(`${q.slug} references unknown topics: ${unknown.join(', ')}`)
  }

  const listSlugs = new Set(HELLO_INTERVIEW_LIST.map((e) => e.slug))
  if (HELLO_INTERVIEW_LIST.length !== EXPECTED.helloInterview || listSlugs.size !== EXPECTED.helloInterview) {
    errors.push(`expected ${EXPECTED.helloInterview} unique Hello Interview entries`)
  }
  for (const entry of HELLO_INTERVIEW_LIST) {
    const q = bySlug.get(entry.slug)
    if (!q) { errors.push(`Hello Interview "${entry.name}" has no question (${entry.slug})`); continue }
    if (q.source !== HELLO_INTERVIEW_SOURCE) errors.push(`${q.slug} source is not ${HELLO_INTERVIEW_SOURCE}`)
    if (q.difficulty !== entry.difficulty) errors.push(`${q.slug} difficulty ${q.difficulty} != ${entry.difficulty}`)
    if (q.url !== helloInterviewUrl(entry)) errors.push(`${q.slug} url does not match hellointerview.com/${entry.hiSlug}`)
    if ((q.category === LLD_CATEGORY) !== (entry.kind === 'low-level-design')) errors.push(`${q.slug} category does not match its kind`)
    const patterns = q.topics.filter((t) => (HELLO_INTERVIEW_PATTERNS as readonly string[]).includes(t)).sort()
    if (patterns.join('|') !== [...entry.patterns].sort().join('|')) {
      errors.push(`${q.slug} pattern topics [${patterns.join(', ')}] != verified [${entry.patterns.join(', ')}]`)
    }
  }
  for (const q of QUESTIONS) {
    if (q.source === HELLO_INTERVIEW_SOURCE && !listSlugs.has(q.slug)) errors.push(`${q.slug} is marked ${HELLO_INTERVIEW_SOURCE} but not in the list`)
  }

  if (errors.length > 0) throw new Error(`Seed data check failed:\n  - ${errors.join('\n  - ')}`)
}

async function main() {
  checkSeedData()

  const user = await prisma.user.findUnique({ where: { id: SEED_USER_ID }, select: { id: true } })
  if (!user) throw new Error(`Seed user ${SEED_USER_ID} not found.`)

  const companyNames = [...new Set(QUESTIONS.flatMap((q) => q.companies))]
  const companyRows = await prisma.companyCard.findMany({
    where: { userId: SEED_USER_ID, name: { in: companyNames } },
    select: { id: true, name: true },
  })
  const companyIdByName = new Map(companyRows.map((row) => [row.name, row.id]))
  const missingCompanies = companyNames.filter((name) => !companyIdByName.has(name))
  if (missingCompanies.length > 0) {
    throw new Error(`Missing company cards for ${SEED_USER_ID}: [${missingCompanies.join(', ')}]. Run the main seed first.`)
  }

  const existingTopics = await prisma.systemDesignTopic.findMany({
    where: { userId: SEED_USER_ID, name: { in: SD_TOPIC_SEED.map((t) => t.name) } },
    select: { name: true },
  })
  const existingTopicNames = new Set(existingTopics.map((t) => t.name))
  const topicsToCreate = SD_TOPIC_SEED.filter((t) => !existingTopicNames.has(t.name))

  const existingQuestions = await prisma.systemDesignQuestion.findMany({
    where: { userId: SEED_USER_ID, slug: { in: [...QUESTIONS.map((q) => q.slug), ...LEGACY_SLUGS] } },
    select: {
      id: true, slug: true, difficulty: true, source: true, url: true,
      topics: { select: { topic: { select: { name: true } } } },
      companies: { select: { company: { select: { name: true } } } },
    },
  })
  const existingBySlug = new Map(existingQuestions.map((q) => [q.slug, q]))
  const legacyPresent = LEGACY_SLUGS.filter((slug) => existingBySlug.has(slug))

  const toCreate = QUESTIONS.filter((q) => !existingBySlug.has(q.slug))
  const toUpdate: { question: SDQuestionSeed; id: number; changes: Record<string, string | null> }[] = []
  const linksToAdd: { question: SDQuestionSeed; id: number; topics: string[]; companies: string[] }[] = []
  for (const q of QUESTIONS) {
    const row = existingBySlug.get(q.slug)
    if (!row) continue
    const wanted = { difficulty: q.difficulty, source: q.source ?? 'Curated', url: q.url ?? null }
    const changes: Record<string, string | null> = {}
    for (const [key, value] of Object.entries(wanted)) {
      if (row[key as keyof typeof wanted] !== value) changes[key] = value
    }
    if (Object.keys(changes).length > 0) toUpdate.push({ question: q, id: row.id, changes })
    const haveTopics = new Set(row.topics.map((t) => t.topic.name))
    const haveCompanies = new Set(row.companies.map((c) => c.company.name))
    const topics = q.topics.filter((name) => !haveTopics.has(name))
    const companies = q.companies.filter((name) => !haveCompanies.has(name))
    if (topics.length > 0 || companies.length > 0) linksToAdd.push({ question: q, id: row.id, topics, companies })
  }

  console.log(`User: ${SEED_USER_ID}`)
  console.log(`Topics:    ${SD_TOPIC_SEED.length} in seed, ${existingTopicNames.size} present, ${topicsToCreate.length} to create`)
  console.log(`Questions: ${QUESTIONS.length} in seed, ${existingBySlug.size - legacyPresent.length} present, ${toCreate.length} to create, ${toUpdate.length} to update, ${linksToAdd.length} to link`)
  if (legacyPresent.length > 0) {
    console.log(`WARNING: renamed slugs still in the database (left untouched, review manually): ${legacyPresent.join(', ')}`)
  }

  if (!APPLY) {
    const hiNames = new Map(HELLO_INTERVIEW_LIST.map((e) => [e.slug, e.name]))
    for (const t of topicsToCreate) console.log(`  + topic  [${t.category}] ${t.name}`)
    for (const q of toCreate) {
      const hi = hiNames.has(q.slug) ? ` (HI: ${hiNames.get(q.slug)})` : ''
      console.log(`  + ${q.slug.padEnd(34)} [${q.difficulty}] ${q.category} · ${q.source ?? 'Curated'}${hi}`)
      console.log(`      topics=[${q.topics.join(', ')}] companies=[${q.companies.join(', ')}]`)
    }
    for (const u of toUpdate) console.log(`  ~ ${u.question.slug} ${JSON.stringify(u.changes)}`)
    for (const l of linksToAdd) console.log(`  # ${l.question.slug} topics+=[${l.topics.join(', ')}] companies+=[${l.companies.join(', ')}]`)
    console.log('\nLLD topic links inferred from public requirements (not stated on the page):')
    for (const [slug, topics] of Object.entries(LLD_INFERRED_TOPIC_LINKS)) console.log(`  ? ${slug}: ${topics.join(', ')}`)
    console.log('\nDry run only. Re-run with --apply to write to the database.')
    return
  }

  const write = async (db: Db) => {
    if (topicsToCreate.length > 0) {
      await db.systemDesignTopic.createMany({
        data: topicsToCreate.map((t) => ({ userId: SEED_USER_ID, name: t.name, category: t.category, description: t.description })),
        skipDuplicates: true,
      })
    }
    const topicRows = await db.systemDesignTopic.findMany({ where: { userId: SEED_USER_ID }, select: { id: true, name: true } })
    const topicIdByName = new Map(topicRows.map((row) => [row.name, row.id]))

    for (const q of toCreate) {
      // Nested create keeps each question and its links atomic even outside a transaction.
      await db.systemDesignQuestion.create({
        data: {
          userId: SEED_USER_ID,
          slug: q.slug,
          title: q.title,
          difficulty: q.difficulty,
          category: q.category,
          prompt: q.prompt,
          functionalRequirements: q.functionalRequirements,
          nonFunctionalRequirements: q.nonFunctionalRequirements,
          estimationNotes: q.estimationNotes ?? null,
          referenceSolution: q.referenceSolution,
          commonPitfalls: q.commonPitfalls,
          source: q.source ?? 'Curated',
          url: q.url ?? null,
          topics: { create: q.topics.map((name) => ({ userId: SEED_USER_ID, topicId: topicIdByName.get(name)! })) },
          companies: { create: q.companies.map((name) => ({ userId: SEED_USER_ID, companyId: companyIdByName.get(name)! })) },
        },
      })
    }
    for (const u of toUpdate) {
      await db.systemDesignQuestion.update({ where: { id: u.id }, data: u.changes })
    }
    for (const l of linksToAdd) {
      await db.sDQuestionTopic.createMany({
        data: l.topics.map((name) => ({ userId: SEED_USER_ID, questionId: l.id, topicId: topicIdByName.get(name)! })),
        skipDuplicates: true,
      })
      await db.sDQuestionCompany.createMany({
        data: l.companies.map((name) => ({ userId: SEED_USER_ID, questionId: l.id, companyId: companyIdByName.get(name)! })),
        skipDuplicates: true,
      })
    }
  }

  try {
    await prisma.$transaction(write, { maxWait: 20_000, timeout: 180_000 })
    console.log('Applied in one transaction.')
  } catch (error) {
    // P2028: the transaction timed out or could not start (e.g. through a connection pooler).
    // Nothing was committed, so replaying the same idempotent writes without it is safe.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2028') {
      console.warn('Transaction unavailable (P2028); applying question by question instead.')
      await write(prisma)
    } else {
      throw error
    }
  }
  console.log(`Created ${topicsToCreate.length} topics and ${toCreate.length} questions; updated ${toUpdate.length}; linked ${linksToAdd.length}.`)

  await verify()
}

async function verify() {
  const problems: string[] = []
  const rows = await prisma.systemDesignQuestion.findMany({
    where: { userId: SEED_USER_ID, slug: { in: QUESTIONS.map((q) => q.slug) } },
    select: {
      slug: true, difficulty: true, category: true, source: true, url: true,
      topics: { select: { topic: { select: { name: true } } } },
      companies: { select: { company: { select: { name: true } } } },
    },
  })
  const bySlug = new Map(rows.map((r) => [r.slug, r]))
  for (const q of QUESTIONS) {
    const row = bySlug.get(q.slug)
    if (!row) { problems.push(`missing question ${q.slug}`); continue }
    if (row.difficulty !== q.difficulty) problems.push(`${q.slug} difficulty ${row.difficulty}`)
    if (row.source !== (q.source ?? 'Curated')) problems.push(`${q.slug} source ${row.source}`)
    if (row.url !== (q.url ?? null)) problems.push(`${q.slug} url ${row.url}`)
    const topics = new Set(row.topics.map((t) => t.topic.name))
    const companies = new Set(row.companies.map((c) => c.company.name))
    const missingTopics = q.topics.filter((name) => !topics.has(name))
    const missingCompanies = q.companies.filter((name) => !companies.has(name))
    if (missingTopics.length > 0) problems.push(`${q.slug} missing topics [${missingTopics.join(', ')}]`)
    if (missingCompanies.length > 0) problems.push(`${q.slug} missing companies [${missingCompanies.join(', ')}]`)
  }

  const hiSlugs = new Set(HELLO_INTERVIEW_LIST.map((e) => e.slug))
  const hiRows = rows.filter((r) => hiSlugs.has(r.slug) && r.source === HELLO_INTERVIEW_SOURCE)
  const hiLLD = hiRows.filter((r) => r.category === LLD_CATEGORY).length
  const topicCount = await prisma.systemDesignTopic.count({
    where: { userId: SEED_USER_ID, name: { in: SD_TOPIC_SEED.map((t) => t.name) } },
  })
  const totalHI = await prisma.systemDesignQuestion.count({ where: { userId: SEED_USER_ID, source: HELLO_INTERVIEW_SOURCE } })

  if (rows.length !== EXPECTED.questions) problems.push(`questions ${rows.length}/${EXPECTED.questions}`)
  if (topicCount !== EXPECTED.topics) problems.push(`topics ${topicCount}/${EXPECTED.topics}`)
  if (hiRows.length - hiLLD !== EXPECTED.helloInterviewSD) problems.push(`Hello Interview SD ${hiRows.length - hiLLD}/${EXPECTED.helloInterviewSD}`)
  if (hiLLD !== EXPECTED.helloInterviewLLD) problems.push(`Hello Interview LLD ${hiLLD}/${EXPECTED.helloInterviewLLD}`)

  console.log(
    `Verification: ${rows.length} questions, ${topicCount} topics, ${hiRows.length - hiLLD} Hello Interview SD + ${hiLLD} LLD ` +
      `(${totalHI} rows with source ${HELLO_INTERVIEW_SOURCE} in total)`,
  )
  if (problems.length > 0) {
    console.error(`Verification failed:\n  - ${problems.join('\n  - ')}`)
    process.exitCode = 1
  } else {
    console.log('Verification passed.')
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
