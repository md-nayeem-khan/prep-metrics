import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { SD_TOPIC_SEED, SD_QUESTION_SEED } from "../prisma/seed-data/system-design";
import { COMPETENCY_SEED, BEHAVIORAL_QUESTION_SEED } from "../prisma/seed-data/behavioral";
import { NEETCODE_250_ALL_IDS, NEETCODE_250_EXTRA_PROBLEMS, NEETCODE_250_TAG } from "../prisma/seed-data/neetcode250";

// Mirrors COMPANY_SEED in prisma/seed.ts (kept in sync intentionally).
const VALID_COMPANIES = new Set([
  "Amazon", "Apple", "Facebook", "Google", "Microsoft", "Netflix", "Bytedance", "Grab", "Agoda",
]);

test("every system design question references known topics and companies", () => {
  const topicNames = new Set(SD_TOPIC_SEED.map((t) => t.name));
  for (const q of SD_QUESTION_SEED) {
    for (const topic of q.topics) {
      assert.ok(topicNames.has(topic), `SD question ${q.slug} references unknown topic: ${topic}`);
    }
    for (const company of q.companies) {
      assert.ok(VALID_COMPANIES.has(company), `SD question ${q.slug} references unknown company: ${company}`);
    }
    assert.ok(["medium", "hard"].includes(q.difficulty), `SD question ${q.slug} has invalid difficulty`);
  }
});

test("system design slugs and topic names are unique", () => {
  const slugs = SD_QUESTION_SEED.map((q) => q.slug);
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
