import test from 'node:test';
import assert from 'node:assert/strict';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';
import { createImportTestDatabase } from '../support/import-database';
import { createSystemDesignRecord } from '../../lib/server/system-design-create';
import { CreateValidationError } from '../../lib/system-design-create';

test('system design creation against isolated PostgreSQL', { timeout: 240000 }, async t => {
  const isolated = await createImportTestDatabase();
  process.env.DATABASE_URL = isolated.url;
  process.env.AUTH_SECRET = isolated.env.AUTH_SECRET;
  const db = new PrismaClient({ datasources: { db: { url: isolated.url } } });
  const question = { slug: 'design-cache', title: 'Design a cache', category: 'Storage', difficulty: 'medium', prompt: 'Requirements\n  preserved' };
  try {
    const topic = await db.systemDesignTopic.create({ data: { userId: 'owner', name: 'Cache', category: 'Storage' } });
    const company = await db.companyCard.create({ data: { userId: 'owner', name: 'Example' } });
    await t.test('creates explicitly owned parents and joins without activity', async () => {
      const result = await createSystemDesignRecord(db, 'owner', 'question', { ...question, topicIds: [topic.id], companyIds: [company.id] });
      assert.equal(result.question?.userId, 'owner');
      assert.equal((await db.sDQuestionTopic.findFirstOrThrow()).userId, 'owner');
      assert.equal((await db.sDQuestionCompany.findFirstOrThrow()).userId, 'owner');
      assert.equal(await db.systemDesignAttempt.count(), 0);
    });
    await t.test('rejects cross-user topics and companies before writing', async () => {
      for (const relation of [{ topicIds: [topic.id] }, { companyIds: [company.id] }]) {
        await assert.rejects(createSystemDesignRecord(db, 'other', 'question', { ...question, ...relation }), CreateValidationError);
      }
      assert.equal(await db.systemDesignQuestion.count({ where: { userId: 'other' } }), 0);
      await createSystemDesignRecord(db, 'other', 'question', question);
    });
    await t.test('duplicate topic names and question slugs return useful conflicts', async () => {
      await assert.rejects(createSystemDesignRecord(db, 'owner', 'topic', { name: ' Cache ', category: 'Storage' }), error => error instanceof CreateValidationError && error.status === 409 && error.existingId === topic.id);
      await assert.rejects(createSystemDesignRecord(db, 'owner', 'question', question), error => error instanceof CreateValidationError && error.status === 409);
    });
    await t.test('concurrent submissions create one question', async () => {
      const results = await Promise.allSettled([1, 2].map(() => createSystemDesignRecord(db, 'owner', 'question', { ...question, slug: 'concurrent' })));
      assert.equal(results.filter(result => result.status === 'fulfilled').length, 1);
      assert.equal(await db.systemDesignQuestion.count({ where: { userId: 'owner', slug: 'concurrent' } }), 1);
    });
    await t.test('a child failure rolls back the question', async () => {
      await db.$executeRawUnsafe(`CREATE FUNCTION reject_create_join() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'test child failure'; END $$`);
      await db.$executeRawUnsafe(`CREATE TRIGGER reject_create_join BEFORE INSERT ON sd_question_topics FOR EACH ROW EXECUTE FUNCTION reject_create_join()`);
      try { await assert.rejects(createSystemDesignRecord(db, 'owner', 'question', { ...question, slug: 'rollback', topicIds: [topic.id] })); }
      finally { await db.$executeRawUnsafe('DROP TRIGGER reject_create_join ON sd_question_topics'); }
      assert.equal(await db.systemDesignQuestion.count({ where: { slug: 'rollback' } }), 0);
    });
    await t.test('route authentication, malformed JSON, bounded input and success', async () => {
      const { createSystemDesignResponse } = await import('../../lib/server/system-design-create-http');
      const { createSessionToken, AUTH_COOKIE_NAME } = await import('../../lib/auth-token');
      const cookie = `${AUTH_COOKIE_NAME}=${await createSessionToken('route-owner', 'route@example.test')}`;
      const request = (body: string, authenticated = true) => new NextRequest('http://localhost/api/system-design/topics', {
        method: 'POST', headers: { 'Content-Type': 'application/json', ...(authenticated ? { Cookie: cookie } : {}) }, body,
      });
      assert.equal((await createSystemDesignResponse(request('{}', false), 'topic')).status, 401);
      assert.equal((await createSystemDesignResponse(request('{'), 'topic')).status, 400);
      assert.equal((await createSystemDesignResponse(request('x'.repeat(256 * 1024 + 1)), 'topic')).status, 413);
      assert.equal((await createSystemDesignResponse(request(JSON.stringify({ name: 'New topic', category: 'Storage' })), 'topic')).status, 201);
      const { authPrisma } = await import('../../lib/prisma');
      await authPrisma.$disconnect();
    });
  } finally { await db.$disconnect(); await isolated.cleanup(); }
});
