import test from 'node:test';
import assert from 'node:assert/strict';
import { PrismaClient } from '@prisma/client';
import { createImportTestDatabase } from '../support/import-database';
import { commitImport, previewImport } from '../../lib/server/csv-import';
import { ImportError, template, writeCsv } from '../../lib/import/csv';
import { definition, DEFINITIONS, type ImportEntity } from '../../lib/import/definitions';
import { SignJWT } from 'jose';

const bytes = (s: string) => new TextEncoder().encode(s);
test('CSV import against isolated PostgreSQL', { timeout: 240000 }, async t => {
  const isolated = await createImportTestDatabase();
  process.env.AUTH_SECRET = isolated.env.AUTH_SECRET;
  const db = new PrismaClient({ datasources: { db: { url: isolated.url } } });
  const userId = 'csv-user-a';
  const execute = async (entity: ImportEntity, input: Uint8Array, owner = userId) => {
    const preview = await previewImport(owner, entity, input, db);
    assert.deepEqual(preview.issues, []);
    return commitImport(owner, entity, input, preview.token!, crypto.randomUUID(), db);
  };
  try {
    await t.test('trimmed owned references resolve exactly and whitespace collisions are ambiguous', async () => {
      const topic = await db.systemDesignTopic.create({ data: { userId, name: ' Trimmed catalog ', category: 'Storage' } });
      const input = bytes(writeCsv([['slug', 'title', 'difficulty', 'category', 'prompt', 'topics'], ['trim-test', 'Trim test', 'medium', 'Storage', 'Prompt', '["Trimmed catalog"]']]));
      const preview = await previewImport(userId, 'system-design', input, db);
      assert.equal(preview.issues.length, 0);
      await db.systemDesignTopic.create({ data: { userId, name: 'Trimmed catalog', category: 'Storage' } });
      const ambiguous = await previewImport(userId, 'system-design', input, db);
      assert.equal(ambiguous.issues[0].code, 'AMBIGUOUS_REFERENCE');
      await assert.rejects(commitImport(userId, 'system-design', input, preview.token!, crypto.randomUUID(), db), (error: ImportError) => error.code === 'STALE_PREVIEW');
      await db.systemDesignTopic.deleteMany({ where: { userId, name: { in: [topic.name, 'Trimmed catalog'] } } });
    });
    await t.test('receipt replay accepts equivalent UUID casing', async () => {
      const input = bytes('name\nCase insensitive receipt');
      const preview = await previewImport(userId, 'companies', input, db);
      const requestId = crypto.randomUUID();
      const result = await commitImport(userId, 'companies', input, preview.token!, requestId.toUpperCase(), db);
      assert.deepEqual(await commitImport(userId, 'companies', input, preview.token!, requestId, db), result);
      assert.equal(await db.importReceipt.count({ where: { userId, requestId } }), 1);
    });
    await t.test('all nine templates create, then skip identically without activity writes', async () => {
      for (const entity of Object.keys(DEFINITIONS) as ImportEntity[]) {
        const input = bytes(template(entity));
        assert.equal((await execute(entity, input)).created, 1, entity);
        assert.equal((await execute(entity, input)).skipped, 1, entity);
      }
      assert.equal(await db.submission.count(), 0);
      assert.equal(await db.systemDesignAttempt.count(), 0);
      assert.equal(await db.behavioralAttempt.count(), 0);
      assert.equal(await db.revision.count(), 0);
      assert.equal(await db.dailyProgress.count(), 0);
    });
    await t.test('cross-user references fail, same identities across users are independent', async () => {
      await db.pattern.create({ data: { userId: 'csv-user-b', name: 'Private pattern', category: 'Arrays' } });
      const input = bytes(writeCsv([['platform', 'problemId', 'title', 'difficulty', 'patterns'], ['leetcode', 'private-link', 'Private link', 'easy', '["Private pattern"]']]));
      const preview = await previewImport(userId, 'problems', input, db);
      assert.equal(preview.issues[0].code, 'MISSING_REFERENCE');
      assert.equal(preview.token, undefined);
      await execute('companies', bytes('name\nShared name'), userId);
      await execute('companies', bytes('name\nShared name'), 'csv-user-b');
      assert.equal(await db.companyCard.count({ where: { name: 'Shared name' } }), 2);
    });
    await t.test('relationships and milestones receive explicit ownership', async () => {
      const input = bytes(writeCsv([['platform', 'problemId', 'title', 'difficulty', 'patterns', 'companies', 'tags'], ['leetcode', 'owned-links', 'Owned links', 'easy', '["Example pattern"]', '["Example company"]', '["Arrays"]']]));
      const result = await execute('problems', input);
      assert.equal((await db.problemPattern.findFirst({ where: { problemId: result.recordIds[0] } }))?.userId, userId);
      assert.equal((await db.problemCompany.findFirst({ where: { problemId: result.recordIds[0] } }))?.userId, userId);
      assert.equal((await db.problemTag.findFirst({ where: { problemId: result.recordIds[0] } }))?.userId, userId);
      assert.equal((await db.milestone.findFirst())?.userId, userId);
      for (const [entity, overrides] of [
        ['system-design', { slug: 'linked-system', topics: '["Example topic"]', companies: '["Example company"]' }],
        ['behavioral', { slug: 'linked-behavioral', competencies: '["Example competency"]', companies: '["Example company"]' }],
        ['stories', { title: 'Linked story', competencies: '["Example competency"]', questions: '["linked-behavioral"]' }],
      ] as [ImportEntity, Record<string, string>][]) {
        const fields = definition(entity).fields;
        const linked = bytes(writeCsv([Object.keys(fields), Object.entries(fields).map(([k, f]) => overrides[k] ?? f.example ?? f.default ?? '')]));
        assert.equal((await execute(entity, linked)).created, 1);
        assert.equal((await execute(entity, linked)).skipped, 1);
      }
      assert.equal((await db.sDQuestionTopic.findFirst())?.userId, userId);
      assert.equal((await db.sDQuestionCompany.findFirst())?.userId, userId);
      assert.equal((await db.behavioralQuestionCompetency.findFirst())?.userId, userId);
      assert.equal((await db.behavioralQuestionCompany.findFirst())?.userId, userId);
      assert.equal((await db.storyCompetency.findFirst())?.userId, userId);
      assert.equal((await db.storyQuestion.findFirst())?.userId, userId);
    });
    await t.test('goal date round-trip and mutable milestone completion do not affect duplicate matching', async () => {
      const goal = await db.goal.findFirstOrThrow({ where: { userId }, include: { milestones: true } });
      assert.equal(goal.startDate.toISOString(), '2026-10-01T00:00:00.000Z');
      assert.equal(goal.deadline.toISOString(), '2026-10-31T00:00:00.000Z');
      await db.milestone.update({ where: { id: goal.milestones[0].id }, data: { completed: true, completedDate: new Date() } });
      await db.goal.update({ where: { id: goal.id }, data: { currentValue: 100, status: 'completed' } });
      assert.equal((await execute('goals', bytes(template('goals')))).skipped, 1);
    });
    await t.test('conflict and ambiguous story identity block the entire file', async () => {
      const conflict = await previewImport(userId, 'companies', bytes('name,targetProblems\nNever created,5\nExample company,99'), db);
      assert.equal(conflict.token, undefined);
      assert.equal(await db.companyCard.count({ where: { name: 'Never created' } }), 0);
      await db.starStory.createMany({ data: [{ userId, title: 'Ambiguous' }, { userId, title: 'Ambiguous' }] });
      assert.equal((await previewImport(userId, 'stories', bytes('title\nAmbiguous'), db)).issues[0].code, 'AMBIGUOUS_RECORD');
    });
    await t.test('deleted relationship between preview and commit is stale', async () => {
      const topic = await db.systemDesignTopic.create({ data: { userId, name: 'Temporary topic', category: 'Storage' } });
      const fields = definition('system-design').fields;
      const input = bytes(writeCsv([Object.keys(fields), Object.entries(fields).map(([k, f]) => k === 'topics' ? '["Temporary topic"]' : k === 'slug' ? 'stale-topic' : f.example ?? f.default ?? '')]));
      const preview = await previewImport(userId, 'system-design', input, db);
      await db.systemDesignTopic.delete({ where: { id: topic.id } });
      await assert.rejects(commitImport(userId, 'system-design', input, preview.token!, crypto.randomUUID(), db), (e: ImportError) => e.code === 'STALE_PREVIEW');
      assert.equal(await db.systemDesignQuestion.count({ where: { slug: 'stale-topic' } }), 0);
    });
    await t.test('injected child failure rolls back all parents and receipt', async () => {
      await db.$executeRawUnsafe(`CREATE FUNCTION csv_fail_child() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.tag = 'reject-test-tag' THEN RAISE EXCEPTION 'test child failure'; END IF; RETURN NEW; END $$`);
      await db.$executeRawUnsafe(`CREATE TRIGGER csv_fail_child BEFORE INSERT ON problem_tags FOR EACH ROW EXECUTE FUNCTION csv_fail_child()`);
      const input = bytes(writeCsv([['platform', 'problemId', 'title', 'difficulty', 'tags'], ['leetcode', 'rollback-first', 'First', 'easy', '[]'], ['leetcode', 'rollback-child', 'Second', 'easy', '["reject-test-tag"]']]));
      const preview = await previewImport(userId, 'problems', input, db);
      const requestId = crypto.randomUUID();
      await assert.rejects(commitImport(userId, 'problems', input, preview.token!, requestId, db));
      assert.equal(await db.problem.count({ where: { problemId: { startsWith: 'rollback-' } } }), 0);
      assert.equal(await db.importReceipt.count({ where: { requestId } }), 0);
      await db.$executeRawUnsafe('DROP TRIGGER csv_fail_child ON problem_tags');
      await db.$executeRawUnsafe('DROP FUNCTION csv_fail_child()');
    });
    await t.test('concurrent same-request replay and overlapping imports do not duplicate stories', async () => {
      const input = bytes('title\nConcurrent story');
      const preview = await previewImport(userId, 'stories', input, db);
      const requestId = crypto.randomUUID();
      const results = await Promise.all([commitImport(userId, 'stories', input, preview.token!, requestId, db), commitImport(userId, 'stories', input, preview.token!, requestId, db)]);
      assert.deepEqual(results[0], results[1]);
      assert.equal(await db.starStory.count({ where: { title: 'Concurrent story' } }), 1);
      await assert.rejects(commitImport(userId, 'stories', bytes('title\nChanged'), preview.token!, requestId, db), (e: ImportError) => e.code === 'REQUEST_ID_REUSED');
      const overlap = bytes('title\nOverlapping story');
      const p = await previewImport(userId, 'stories', overlap, db);
      const settlements = await Promise.allSettled([commitImport(userId, 'stories', overlap, p.token!, crypto.randomUUID(), db), commitImport(userId, 'stories', overlap, p.token!, crypto.randomUUID(), db)]);
      assert.equal(settlements.filter(s => s.status === 'fulfilled').length, 1);
      assert.equal(await db.starStory.count({ where: { title: 'Overlapping story' } }), 1);
    });
    await t.test('expired confirmations are rejected', async () => {
      const token = await new SignJWT({}).setProtectedHeader({ alg: 'HS256' }).setAudience('csv-import').setSubject(userId).setExpirationTime(1).sign(new TextEncoder().encode(process.env.AUTH_SECRET));
      await assert.rejects(commitImport(userId, 'companies', bytes('name\nExpired'), token, crypto.randomUUID(), db), (e: ImportError) => e.code === 'INVALID_PREVIEW');
    });
    await t.test('1,000 records commit within the transaction budget', async () => {
      const start = performance.now();
      const input = bytes(writeCsv([['name'], ...Array.from({ length: 1000 }, (_, i) => [`Performance ${i}`])]));
      assert.equal((await execute('companies', input)).created, 1000);
      const elapsed = performance.now() - start;
      assert.ok(elapsed < 55000, `Import took ${elapsed} ms`);
      t.diagnostic(`1,000 records including preview: ${Math.round(elapsed)} ms`);
    });
  } finally {
    await db.$disconnect();
    await isolated.cleanup();
  }
});
