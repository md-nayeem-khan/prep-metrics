import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { SD_TOPIC_SEED, SD_QUESTION_SEED } from "../prisma/seed-data/system-design";
import { COMPETENCY_SEED, BEHAVIORAL_QUESTION_SEED } from "../prisma/seed-data/behavioral";
import { NEETCODE_250_ALL_IDS, NEETCODE_250_EXTRA_PROBLEMS, NEETCODE_250_TAG } from "../prisma/seed-data/neetcode250";
import {
  HELLO_INTERVIEW_LIST,
  HELLO_INTERVIEW_LLD_QUESTIONS,
  HELLO_INTERVIEW_PATTERNS,
  HELLO_INTERVIEW_SD_QUESTIONS,
  LLD_INFERRED_TOPIC_LINKS,
  helloInterviewUrl,
} from "../prisma/seed-data/hello-interview";
import { LLD_CATEGORY, LLD_TOPIC_CATEGORY } from "../types/system-design";

const ALL_SD_QUESTIONS = [...SD_QUESTION_SEED, ...HELLO_INTERVIEW_SD_QUESTIONS, ...HELLO_INTERVIEW_LLD_QUESTIONS];

// Mirrors COMPANY_SEED in prisma/seed.ts (kept in sync intentionally).
const VALID_COMPANIES = new Set([
  "Amazon", "Apple", "Facebook", "Google", "Microsoft", "Netflix", "Bytedance", "Grab", "Agoda",
]);

test("every system design question references known topics and companies", () => {
  const topicNames = new Set(SD_TOPIC_SEED.map((t) => t.name));
  for (const q of ALL_SD_QUESTIONS) {
    for (const topic of q.topics) {
      assert.ok(topicNames.has(topic), `SD question ${q.slug} references unknown topic: ${topic}`);
    }
    for (const company of q.companies) {
      assert.ok(VALID_COMPANIES.has(company), `SD question ${q.slug} references unknown company: ${company}`);
    }
    assert.ok(["easy", "medium", "hard"].includes(q.difficulty), `SD question ${q.slug} has invalid difficulty`);
  }
});

test("system design slugs and topic names are unique", () => {
  const slugs = ALL_SD_QUESTIONS.map((q) => q.slug);
  assert.equal(new Set(slugs).size, slugs.length, "duplicate SD question slug");
  const topics = SD_TOPIC_SEED.map((t) => t.name);
  assert.equal(new Set(topics).size, topics.length, "duplicate SD topic name");
});

test("every behavioral question references known competencies and companies", () => {
  const competencyNames = new Set(COMPETENCY_SEED.map((c) => c.name));
  for (const q of BEHAVIORAL_QUESTION_SEED) {
    assert.ok(q.competencies.length > 0, `behavioral question ${q.slug} has no competencies`);
    for (const competency of q.competencies) {
      assert.ok(competencyNames.has(competency), `behavioral question ${q.slug} references unknown competency: ${competency}`);
    }
    for (const company of q.companies) {
      assert.ok(VALID_COMPANIES.has(company), `behavioral question ${q.slug} references unknown company: ${company}`);
    }
  }
});

test("behavioral slugs and competency names are unique, and 16 Amazon LPs are present", () => {
  const slugs = BEHAVIORAL_QUESTION_SEED.map((q) => q.slug);
  assert.equal(new Set(slugs).size, slugs.length, "duplicate behavioral question slug");
  const names = COMPETENCY_SEED.map((c) => c.name);
  assert.equal(new Set(names).size, names.length, "duplicate competency name");

  const amazonLPs = COMPETENCY_SEED.filter((c) => c.type === "LeadershipPrinciple" && c.company === "Amazon");
  assert.equal(amazonLPs.length, 16, "expected exactly 16 Amazon Leadership Principles");
});

test("NeetCode 250 extras are unique, well-formed, and disjoint from NeetCode 150", () => {
  // prisma/seed.ts runs its seeding on import, so read it as text instead.
  const seedSource = readFileSync(new URL("../prisma/seed.ts", import.meta.url), "utf8");
  const patternsBlock = seedSource.slice(
    seedSource.indexOf("export const PATTERNS"),
    seedSource.indexOf("export const NEETCODE_150_PROBLEMS"),
  );
  const nc150Block = seedSource.slice(
    seedSource.indexOf("export const NEETCODE_150_PROBLEMS"),
    seedSource.indexOf("export const GOAL_MILESTONE_SEED"),
  );
  const knownPatterns = new Set([...patternsBlock.matchAll(/name: '([^']+)'/g)].map((m) => m[1]));
  const nc150Ids = new Set([...nc150Block.matchAll(/problemId: '([^']+)'/g)].map((m) => m[1]));
  assert.equal(nc150Ids.size, 150, "expected 150 NeetCode 150 problem ids in seed.ts");

  assert.equal(NEETCODE_250_EXTRA_PROBLEMS.length, 100, "expected 100 NeetCode 250 extras");
  const ids = NEETCODE_250_EXTRA_PROBLEMS.map((p) => p.problemId);
  assert.equal(new Set(ids).size, ids.length, "duplicate NeetCode 250 problemId");

  // The full 250 must be exactly NeetCode 150 + the extras.
  const allIds = new Set(NEETCODE_250_ALL_IDS);
  assert.equal(allIds.size, 250, "expected 250 unique NeetCode 250 ids");
  assert.deepEqual(
    [...allIds].sort(),
    [...nc150Ids, ...ids].sort(),
    "NEETCODE_250_ALL_IDS must equal NeetCode 150 ids + extra ids",
  );

  // Every NeetCode 150 problem must also carry the Neetcode250 tag.
  const nc150Lines = nc150Block.split("\n").filter((line) => line.includes("problemId:"));
  assert.equal(nc150Lines.length, 150);
  assert.match(seedSource, /DEFAULT_TAGS = \[[^\]]*'Neetcode250'/);
  assert.match(seedSource, /NC150_TAGS = \[[^\]]*'Neetcode250'/);
  for (const line of nc150Lines) {
    assert.match(line, /tags: (DEFAULT_TAGS|NC150_TAGS) \}/, `NeetCode 150 entry missing Neetcode250 tag: ${line.slice(0, 80)}`);
  }

  for (const p of NEETCODE_250_EXTRA_PROBLEMS) {
    assert.ok(!nc150Ids.has(p.problemId), `problem ${p.problemId} is already in NeetCode 150`);
    assert.ok(["easy", "medium", "hard"].includes(p.difficulty), `problem ${p.problemId} has invalid difficulty`);
    assert.match(p.url, /^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+$/, `problem ${p.problemId} has invalid url`);
    assert.deepEqual(p.tags, [NEETCODE_250_TAG], `problem ${p.problemId} has unexpected tags`);
    for (const name of p.patternNames) {
      assert.ok(knownPatterns.has(name), `problem ${p.problemId} references unknown pattern: ${name}`);
    }
    for (const company of p.companies) {
      assert.ok(VALID_COMPANIES.has(company), `problem ${p.problemId} references unknown company: ${company}`);
    }
  }
});

test("Hello Interview lists are complete and match the seeded questions", () => {
  const sd = HELLO_INTERVIEW_LIST.filter((e) => e.kind === "system-design");
  const lld = HELLO_INTERVIEW_LIST.filter((e) => e.kind === "low-level-design");
  assert.equal(sd.length, 32, "expected 32 Hello Interview system design questions");
  assert.equal(lld.length, 9, "expected 9 Hello Interview low-level design questions");
  assert.equal(new Set(HELLO_INTERVIEW_LIST.map((e) => e.slug)).size, 41, "duplicate Hello Interview slug");
  assert.equal(new Set(HELLO_INTERVIEW_LIST.map((e) => e.kind + e.hiSlug)).size, 41, "duplicate Hello Interview page");
  assert.equal(ALL_SD_QUESTIONS.length, 48, "expected 48 seeded system design questions");

  const topicNames = new Set(SD_TOPIC_SEED.map((t) => t.name));
  assert.equal(SD_TOPIC_SEED.length, 37, "expected 37 system design topics");
  assert.equal(HELLO_INTERVIEW_PATTERNS.length, 7);
  for (const pattern of HELLO_INTERVIEW_PATTERNS) assert.ok(topicNames.has(pattern), `missing pattern topic ${pattern}`);

  const bySlug = new Map(ALL_SD_QUESTIONS.map((q) => [q.slug, q]));
  const patternSet = new Set<string>(HELLO_INTERVIEW_PATTERNS);
  for (const entry of HELLO_INTERVIEW_LIST) {
    const q = bySlug.get(entry.slug);
    assert.ok(q, `Hello Interview "${entry.name}" has no seeded question`);
    assert.equal(q.source, "HelloInterview", `${q.slug} source`);
    assert.equal(q.difficulty, entry.difficulty, `${q.slug} difficulty`);
    assert.equal(q.url, helloInterviewUrl(entry), `${q.slug} url`);
    assert.match(q.url!, /^https:\/\/www\.hellointerview\.com\/learn\/(system-design|low-level-design)\/problem-breakdowns\/[a-z0-9-]+$/);
    assert.deepEqual(
      q.topics.filter((t) => patternSet.has(t)).sort(),
      [...entry.patterns].sort(),
      `${q.slug} pattern topics must match the verified Hello Interview mapping`,
    );
    assert.equal(q.category === LLD_CATEGORY, entry.kind === "low-level-design", `${q.slug} category`);
  }
  const listed = new Set(HELLO_INTERVIEW_LIST.map((e) => e.slug));
  for (const q of ALL_SD_QUESTIONS) {
    if (q.source === "HelloInterview") assert.ok(listed.has(q.slug), `${q.slug} is marked HelloInterview but not listed`);
  }
});

test("low-level design questions use lld- slugs and only object-oriented design topics", () => {
  const categoryByTopic = new Map(SD_TOPIC_SEED.map((t) => [t.name, t.category]));
  for (const q of HELLO_INTERVIEW_LLD_QUESTIONS) {
    assert.match(q.slug, /^lld-[a-z0-9-]+$/, `${q.slug} slug`);
    assert.equal(q.category, LLD_CATEGORY);
    assert.deepEqual(q.companies, [], `${q.slug} should have no companies`);
    for (const topic of q.topics) {
      // The LLD rate limiter also covers the shared Rate Limiting building block.
      if (topic === "Rate Limiting") continue;
      assert.equal(categoryByTopic.get(topic), LLD_TOPIC_CATEGORY, `${q.slug} uses non-OOD topic ${topic}`);
    }
  }
  for (const q of [...SD_QUESTION_SEED, ...HELLO_INTERVIEW_SD_QUESTIONS]) {
    assert.notEqual(q.category, LLD_CATEGORY, `${q.slug} is a system design question`);
    for (const topic of q.topics) {
      assert.notEqual(categoryByTopic.get(topic), LLD_TOPIC_CATEGORY, `${q.slug} uses LLD topic ${topic}`);
    }
  }
  for (const [slug, topics] of Object.entries(LLD_INFERRED_TOPIC_LINKS)) {
    const q = HELLO_INTERVIEW_LLD_QUESTIONS.find((x) => x.slug === slug);
    assert.ok(q, `inferred links reference unknown question ${slug}`);
    for (const topic of topics) assert.ok(q.topics.includes(topic), `${slug} inferred topic ${topic} is not linked`);
  }
});

test("new Hello Interview system design questions carry full content and no unverified companies", () => {
  for (const q of HELLO_INTERVIEW_SD_QUESTIONS) {
    for (const field of ["prompt", "functionalRequirements", "nonFunctionalRequirements", "estimationNotes", "referenceSolution", "commonPitfalls"] as const) {
      assert.ok(q[field] && q[field]!.trim().length > 0, `${q.slug} is missing ${field}`);
    }
    assert.deepEqual(q.companies, [], `${q.slug} should have no companies`);
  }
});
