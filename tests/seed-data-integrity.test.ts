import test from "node:test";
import assert from "node:assert/strict";

import { SD_TOPIC_SEED, SD_QUESTION_SEED } from "../prisma/seed-data/system-design";
import { COMPETENCY_SEED, BEHAVIORAL_QUESTION_SEED } from "../prisma/seed-data/behavioral";

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
