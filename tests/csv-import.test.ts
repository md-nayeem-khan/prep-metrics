import test from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { definition, DEFINITIONS, MAX_FILE_BYTES, MAX_ROWS, type ImportEntity } from '../lib/import/definitions';
import { ImportError, parseCsv, template, writeCsv } from '../lib/import/csv';
import { analyzeImport, commitImport, previewImport } from '../lib/server/csv-import';
import { readImportForm, handleImport } from '../lib/server/import-http';
import { createSessionToken, AUTH_COOKIE_NAME } from '../lib/auth-token';
import type { PrismaClient } from '@prisma/client';
import { GET as exportProblems } from '../app/api/export/csv/route';
import { prisma } from '../lib/prisma';

process.env.AUTH_SECRET = 'csv-unit-test-secret-at-least-32-characters';
const bytes = (s: string) => new TextEncoder().encode(s);
const csv = (entity: ImportEntity, overrides: Record<string, string> = {}) => {
  const fields = definition(entity).fields;
  return bytes(writeCsv([Object.keys(fields), Object.entries(fields).map(([key, f]) => overrides[key] ?? f.example ?? f.default ?? '')]));
};
function fakeDb(rows: Record<string, unknown>[] = [], relations: Record<string, unknown>[] = []) {
  let reads = 0;
  const query = { findMany: async () => { reads++; return rows; } };
  return {
    db: { pattern: query, companyCard: query, problem: query, goal: query, starStory: query, systemDesignQuestion: query, behavioralQuestion: query, competency: { findMany: async () => relations }, systemDesignTopic: { findMany: async () => relations } } as unknown as PrismaClient,
    reads: () => reads,
  };
}

for (const entity of Object.keys(DEFINITIONS) as ImportEntity[]) {
  test(`${entity}: template is valid and every required column is enforced`, () => {
    const parsed = parseCsv(entity, bytes(template(entity)));
    assert.deepEqual(parsed.issues, []);
    assert.equal(parsed.records.length, 1);
    for (const [column, field] of Object.entries(definition(entity).fields)) {
      if (field.required) assert.ok(parseCsv(entity, csv(entity, { [column]: '' })).issues.some(i => i.column === column));
    }
  });
}
test('CSV correctly round-trips BOM, Unicode, quoted comma, escaped quotes, multiline text, and leading zeros', () => {
  const input = '\uFEFF' + writeCsv([['Platform', 'Problem ID', 'Title', 'Difficulty', 'Notes'], ['leetcode', '001', 'বাংলা, "quoted"', 'easy', '  line 1\r\nline 2  ']]);
  const result = parseCsv('problems', bytes(input));
  assert.deepEqual(result.issues, []);
  assert.equal(result.records[0].data.problemId, '001');
  assert.equal(result.records[0].data.title, 'বাংলা, "quoted"');
  assert.equal(result.records[0].data.notes, '  line 1\r\nline 2  ');
  assert.equal(result.records[0].row, 2);
});
test('rejects unknown, duplicate, alias-duplicate and prohibited headers', () => {
  for (const header of ['userId', 'id', 'createdAt', 'Name', 'unknown']) {
    assert.ok(parseCsv('companies', bytes(`name,${header}\nAcme,value`)).issues.length);
  }
  assert.ok(parseCsv('problems', bytes('platform,problemId,Problem ID,title,difficulty\nleetcode,1,1,A,easy')).issues.some(i => i.code === 'DUPLICATE_HEADER'));
});
test('legacy problem exports accept explicit aliases and report ignored metadata', () => {
  const parsed = parseCsv('problems', bytes('Platform,Problem ID,Title,Difficulty,Tags,Patterns,Attempts,Last Status,Last Time (seconds),Created Date\nleetcode,1,A,easy,one;two,Arrays,3,solved,30,2026-01-01'));
  assert.deepEqual(parsed.issues, []);
  assert.equal(parsed.warnings.length, 4);
  assert.deepEqual(parsed.records[0].data.tags, ['one', 'two']);
});
test('legacy enum casing is explicitly normalized and existing records compare canonically', async () => {
  const input = bytes('Platform,Problem ID,Title,Difficulty\nLeetCode,001,A,Easy');
  const parsed = parseCsv('problems', input);
  assert.deepEqual(parsed.issues, []);
  assert.equal(parsed.warnings.length, 2);
  assert.equal(parsed.records[0].data.difficulty, 'easy');
  const db = fakeDb([{ id: 1, platform: 'LeetCode', problemId: '001', title: 'A', difficulty: 'Easy' }]);
  const analysis = await analyzeImport(db.db, 'user-a', 'problems', input);
  assert.deepEqual(analysis.preview.issues, []);
  assert.equal(analysis.preview.totals.skipped, 1);
});
test('strict parsing rejects empty, malformed, invalid UTF-8, NUL, and oversized inputs', () => {
  for (const input of ['', 'name', 'name\n"unterminated', 'name\na,b', 'name\na\0b', `name\n${'x'.repeat(128 * 1024 + 1)}`]) assert.throws(() => parseCsv('companies', bytes(input)), ImportError);
  assert.throws(() => parseCsv('companies', new Uint8Array([0xff])), ImportError);
  assert.throws(() => parseCsv('companies', new Uint8Array(MAX_FILE_BYTES + 1)), /2 MiB/);
  assert.throws(() => parseCsv('companies', bytes(`name\n${Array.from({ length: MAX_ROWS + 1 }, (_, i) => i).join('\n')}`)), /1,000/);
  assert.equal(parseCsv('companies', bytes(`name\n${Array.from({ length: MAX_ROWS }, (_, i) => i).join('\n')}`)).records.length, MAX_ROWS);
});
test('numeric validation rejects decimals, exponent notation, negatives, overflow and out-of-range scores', () => {
  for (const value of ['1.2', '1e3', '-1', '2147483648', 'NaN']) assert.ok(parseCsv('companies', csv('companies', { targetProblems: value })).issues.length);
  for (const value of ['0', '6', '1.5']) assert.ok(parseCsv('stories', csv('stories', { strengthRating: value })).issues.length);
});
test('strict enums, dates, relationship arrays, and URL protocols', () => {
  assert.ok(parseCsv('problems', csv('problems', { difficulty: 'eazy' })).issues.length);
  for (const value of ['javascript:alert(1)', 'ftp://example.com', 'https://user:secret@example.com']) assert.ok(parseCsv('problems', csv('problems', { url: value })).issues.length);
  for (const value of ['[1]', '{}', '[""]', 'Storage']) assert.ok(parseCsv('system-design', csv('system-design', { topics: value })).issues.length);
  for (const value of ['2026-02-30', '2026-13-01', '10/01/2026']) assert.ok(parseCsv('goals', csv('goals', { startDate: value })).issues.length);
});
test('goals group milestone rows, preserve order, and validate repeated fields and date ranges', () => {
  const base = template('goals').trimEnd().split('\r\n');
  const second = base[1].replace('Complete the first practice set', 'Complete the second practice set').replace('2026-10-15', '2026-10-20');
  const input = bytes([...base, second].join('\r\n'));
  const parsed = parseCsv('goals', input);
  assert.deepEqual(parsed.issues, []);
  const milestones = parsed.records[0].data.milestones as { targetValue: number }[];
  assert.deepEqual(milestones.map(m => m.targetValue), [1, 2]);
  assert.ok(parseCsv('goals', bytes([...base, second.replace('Example preparation goal', 'Different')].join('\n'))).issues.some(i => i.code === 'INCONSISTENT_GOAL'));
  assert.ok(parseCsv('goals', bytes([...base, base[1]].join('\n'))).warnings.some(i => i.code === 'DUPLICATE_ROW'));
  assert.ok(parseCsv('goals', csv('goals', { milestoneDueDate: '2026-11-01' })).issues.some(i => i.code === 'DATE_RANGE'));
});
test('validation errors short-circuit database access', async () => {
  const db = fakeDb();
  const result = await analyzeImport(db.db, 'user-a', 'companies', bytes('name\n""'));
  assert.ok(result.preview.issues.length);
  assert.equal(db.reads(), 0);
});
test('identical duplicates skip, conflicts block, omitted optional columns are ignored', async () => {
  const db = fakeDb([{ id: 1, userId: 'user-a', name: 'Acme', icon: 'A', targetProblems: 50 }]);
  const identical = await analyzeImport(db.db, 'user-a', 'companies', bytes('name\nAcme'));
  assert.deepEqual(identical.preview.issues, []);
  assert.equal(identical.preview.totals.skipped, 1);
  const conflict = await analyzeImport(db.db, 'user-a', 'companies', bytes('name,targetProblems\nAcme,51'));
  assert.equal(conflict.preview.issues[0].code, 'CONFLICT');
  const within = await analyzeImport(fakeDb().db, 'user-a', 'companies', bytes('name\nAcme\nAcme'));
  assert.deepEqual(within.preview.totals, { records: 2, create: 1, skipped: 1 });
  const different = await analyzeImport(fakeDb().db, 'user-a', 'companies', bytes('name,targetProblems\nAcme,1\nAcme,2'));
  assert.equal(different.preview.issues[0].code, 'CONFLICT');
});
test('ambiguous existing identities and missing references block imports', async () => {
  const ambiguous = await analyzeImport(fakeDb([{ id: 1, title: 'A' }, { id: 2, title: 'A' }]).db, 'user-a', 'stories', bytes('title\nA'));
  assert.equal(ambiguous.preview.issues[0].code, 'AMBIGUOUS_RECORD');
  const missing = await analyzeImport(fakeDb().db, 'user-a', 'system-design', csv('system-design', { topics: '["Missing"]' }));
  assert.equal(missing.preview.issues[0].code, 'MISSING_REFERENCE');
});
test('omitted milestone descriptions do not conflict with existing content', async () => {
  const db = fakeDb([{ id: 1, title: 'Goal', startDate: new Date('2026-10-01'), deadline: new Date('2026-10-31'), milestones: [{ title: 'Milestone', dueDate: new Date('2026-10-15'), description: 'Keep this existing description', targetValue: 1, completed: true }] }]);
  const input = bytes('goalKey,title,startDate,deadline,milestoneTitle,milestoneDueDate\ng,Goal,2026-10-01,2026-10-31,Milestone,2026-10-15');
  const analysis = await analyzeImport(db.db, 'user-a', 'goals', input);
  assert.deepEqual(analysis.preview.issues, []);
  assert.equal(analysis.preview.totals.skipped, 1);
});
test('preview token binds the user, entity, file and version; commit rejects forged and mismatched tokens', async () => {
  const db = fakeDb().db;
  Object.assign(db, { importReceipt: { findUnique: async () => null } });
  const input = csv('companies');
  const preview = await previewImport('user-a', 'companies', input, db);
  assert.ok(preview.token);
  for (const [user, token, file] of [['user-b', preview.token!, input], ['user-a', 'forged', input], ['user-a', preview.token!, csv('companies', { name: 'Different' })]] as const) {
    await assert.rejects(commitImport(user, 'companies', file, token, crypto.randomUUID(), db), (e: ImportError) => e.code === 'INVALID_PREVIEW');
  }
});
test('HTTP authenticates independently and rejects unknown entities and invalid forms', async () => {
  assert.equal((await handleImport(new NextRequest('http://localhost/api/import/companies/preview', { method: 'POST' }), 'companies', 'preview')).status, 401);
  const token = await createSessionToken('user-a', 'test@example.test');
  const request = () => new NextRequest('http://localhost/api/import/companies/preview', { method: 'POST', headers: { cookie: `${AUTH_COOKIE_NAME}=${token}` } });
  assert.equal((await handleImport(request(), 'unknown', 'preview')).status, 404);
  assert.equal((await handleImport(request(), 'companies', 'preview')).status, 400);
});
test('serialization retries are bounded and transaction timeouts have a recoverable error', async () => {
  const db = fakeDb().db;
  let attempts = 0;
  Object.assign(db, {
    importReceipt: { findUnique: async () => null },
    $transaction: async () => { attempts++; throw Object.assign(new Error('write conflict'), { code: 'P2034' }); },
  });
  const input = csv('companies');
  const preview = await previewImport('user-a', 'companies', input, db);
  await assert.rejects(commitImport('user-a', 'companies', input, preview.token!, crypto.randomUUID(), db), (e: ImportError) => e.code === 'CONCURRENT_CHANGE');
  assert.equal(attempts, 4);
  Object.assign(db, { $transaction: async () => { throw Object.assign(new Error('timeout'), { code: 'P2028' }); } });
  await assert.rejects(commitImport('user-a', 'companies', input, preview.token!, crypto.randomUUID(), db), (e: ImportError) => e.status === 503);
});
test('request body is bounded before multipart parsing, even without Content-Length', async () => {
  const request = new Request('http://localhost', { method: 'POST', headers: { 'content-type': 'multipart/form-data; boundary=test' }, body: new Uint8Array(MAX_FILE_BYTES + 65537) });
  await assert.rejects(readImportForm(request), (error: ImportError) => error.status === 413);
  const form = new FormData();
  form.set('file', new File(['name\nAcme'], 'data.csv'));
  assert.ok((await readImportForm(new Request('http://localhost', { method: 'POST', body: form }))).get('file') instanceof File);
});
test('existing problem export quotes complex content and round-trips safely', async () => {
  const original = prisma.problem.findMany;
  prisma.problem.findMany = (async () => [{
    platform: 'leetcode', problemId: '001', title: 'A, "quoted"\nproblem', difficulty: 'easy', url: 'https://example.com/a,b',
    tags: [{ tag: 'semi;colon' }, { tag: 'comma,tag' }], patterns: [{ pattern: { name: 'Array;scan' } }],
    _count: { submissions: 3 }, submissions: [{ status: 'solved', timeSpentSeconds: 10 }], createdAt: new Date('2026-01-01'),
  }]) as unknown as typeof prisma.problem.findMany;
  try {
    const response = await exportProblems();
    assert.equal(response.status, 200);
    const parsed = parseCsv('problems', bytes(await response.text()));
    assert.deepEqual(parsed.issues, []);
    assert.equal(parsed.records[0].data.title, 'A, "quoted"\nproblem');
    assert.equal(parsed.records[0].data.problemId, '001');
    assert.deepEqual(parsed.records[0].data.tags, ['comma,tag', 'semi;colon']);
    assert.deepEqual(parsed.records[0].data.patterns, ['Array;scan']);
    assert.equal(parsed.warnings.length, 4);
  } finally { prisma.problem.findMany = original; }
});


test('blank CSV lines count as rows but quoted newlines do not', () => {
  const result = parseCsv('companies', bytes('name\n\n\nAcme\n"Multi\nline"\n\nNext'));
  assert.deepEqual(result.records.map(record => record.row), [4, 5, 7]);
  assert.equal(parseCsv('companies', bytes('\n\nunknown\nAcme')).issues[0].row, 3);
});
test('indexed text and list entries enforce UTF-8 limits before database access', () => {
  for (const name of ['x'.repeat(6000), '界'.repeat(267)]) assert.ok(parseCsv('companies', bytes(`name\n${name}`)).issues.length);
  assert.equal(parseCsv('companies', bytes(`name\n${'界'.repeat(266)}`)).issues.length, 0);
  assert.ok(parseCsv('problems', csv('problems', { tags: JSON.stringify(['x'.repeat(801)]) })).issues.length);
});
test('all supported problem platform spellings remain reimportable', async () => {
  for (const platform of ['LeetCode', 'HackerRank', 'CodeForces', 'AtCoder', 'GeeksforGeeks', 'Other']) {
    const input = bytes(writeCsv([['Platform', 'Problem ID', 'Title', 'Difficulty', 'URL'], [platform, '001', 'Example', 'Easy', '']]));
    const result = await analyzeImport(fakeDb([{ id: 1, platform, problemId: '001', title: 'Example', difficulty: 'easy', url: '' }]).db, 'user-a', 'problems', input);
    assert.equal(result.preview.issues.length, 0, platform);
    assert.equal(result.preview.totals.skipped, 1);
  }
});
test('diagnostics remain bounded for large invalid headers and relationship fan-out', async () => {
  const headers = ['name', ...Array.from({ length: 1000 }, (_, i) => `unknown${i}`)];
  const badHeaders = parseCsv('companies', bytes(writeCsv([headers, headers])));
  assert.equal(badHeaders.issues.length, 200);
  assert.equal(badHeaders.issues.total, 1000);
  const topics = JSON.stringify(Array.from({ length: 50 }, (_, i) => `missing${i}`));
  const input = bytes(writeCsv([['slug', 'title', 'difficulty', 'category', 'prompt', 'topics'], ...Array.from({ length: 1000 }, (_, i) => [`q${i}`, `Title${i}`, 'medium', 'Storage', 'Prompt', topics])]));
  const preview = await previewImport('user-a', 'system-design', input, fakeDb().db);
  assert.equal(preview.issues.length, 200);
  assert.equal(preview.issueCount, 50000);
  assert.equal(preview.token, undefined);
  assert.ok(Buffer.byteLength(JSON.stringify(preview)) < 1100000);
});
