import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CreateValidationError, questionSlug, validateCreate } from '../lib/system-design-create';

const question = { title: ' Design a cache ', slug: 'design-a-cache', prompt: '  Line one\n\nLine two  ', category: ' Storage ', difficulty: 'medium' };
function invalid(body: unknown, field: string, kind: 'question' | 'topic' = 'question') {
  assert.throws(() => validateCreate(kind, body), error => error instanceof CreateValidationError && !!error.fields[field]);
}
test('normalization preserves rich content and applies creation defaults', () => {
  const result = validateCreate('question', { ...question, topicIds: [1, 1, 2] });
  assert.equal(result.title, 'Design a cache'); assert.equal(result.prompt, question.prompt);
  assert.equal(result.category, 'Storage'); assert.equal(result.source, 'Company');
  assert.deepEqual(result.topicIds, [1, 2]); assert.deepEqual(result.companyIds, []);
  assert.equal(result.notes, null);
});
test('rejects missing, whitespace-only, oversized and non-text fields', () => {
  invalid(null, '_form'); invalid([], '_form');
  invalid({ ...question, title: '  ' }, 'title');
  invalid({ ...question, prompt: '\n ' }, 'prompt');
  invalid({ ...question, notes: 'a'.repeat(20001) }, 'notes');
  invalid({ ...question, title: 1 }, 'title');
});
test('rejects unsupported values and ownership fields without coercion', () => {
  invalid({ ...question, difficulty: 'easy' }, 'difficulty');
  invalid({ ...question, source: 'other' }, 'source');
  invalid({ ...question, userId: 'someone-else' }, '_form');
  invalid({ ...question, topicIds: ['1'] }, 'topicIds');
  invalid({ ...question, companyIds: [-1] }, 'companyIds');
  invalid({ ...question, topicIds: Array(101).fill(1) }, 'topicIds');
  invalid({ ...question, slug: 'bad slug' }, 'slug');
});
test('only full HTTP(S) URLs are accepted', () => {
  invalid({ ...question, url: 'javascript:alert(1)' }, 'url');
  invalid({ ...question, url: '//example.com' }, 'url');
  assert.equal(validateCreate('question', { ...question, url: ' https://example.com/a ' }).url, 'https://example.com/a');
});
test('topic creation requires a name/category and permits custom categories', () => {
  invalid({ name: ' ', category: 'Storage' }, 'name', 'topic');
  invalid({ name: 'Cache' }, 'category', 'topic');
  assert.deepEqual(validateCreate('topic', { name: ' Cache ', category: 'Custom', description: '  text\n ' }), { name: 'Cache', category: 'Custom', description: '  text\n ' });
});
test('slugs support Unicode, normalize accents and remain bounded', () => {
  assert.equal(questionSlug('  Design a Café!  '), 'design-a-cafe');
  assert.equal(questionSlug('设计 系统'), '设计-系统');
  assert.equal(questionSlug('a'.repeat(300)).length, 180);
  assert.equal(questionSlug('!!!'), '');
});
