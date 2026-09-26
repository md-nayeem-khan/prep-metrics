import { definition } from './import/definitions';

export type CreateKind = 'question' | 'topic';
export type FieldErrors = Record<string, string>;
export class CreateValidationError extends Error {
  constructor(public fields: FieldErrors, public status = 400, public existingId?: number) {
    super('Please check the highlighted fields.');
  }
}

export const QUESTION_CATEGORIES = ['Storage', 'Social/Feed', 'Streaming', 'Messaging', 'Geo', 'Infra/Primitive'];
export const TOPIC_CATEGORIES = ['Scalability', 'Storage', 'Consistency', 'Networking', 'Messaging'];
export const RICH_FIELDS = ['functionalRequirements', 'nonFunctionalRequirements', 'estimationNotes', 'referenceSolution', 'commonPitfalls', 'notes'] as const;
export type TopicInput = { name: string; category: string; description: string | null };
export type QuestionInput = {
  slug: string; title: string; difficulty: string; category: string; prompt: string;
  source: string; url: string | null; topicIds: number[]; companyIds: number[];
} & Record<typeof RICH_FIELDS[number], string | null>;

export function questionSlug(title: string): string {
  return title.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 180).replace(/-$/g, '');
}

export function validateCreate(kind: 'topic', input: unknown): TopicInput;
export function validateCreate(kind: 'question', input: unknown): QuestionInput;
export function validateCreate(kind: CreateKind, input: unknown): TopicInput | QuestionInput;
export function validateCreate(kind: CreateKind, input: unknown): TopicInput | QuestionInput {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new CreateValidationError({ _form: 'Send a JSON object.' });
  const body = input as Record<string, unknown>;
  const fields = definition(kind === 'topic' ? 'topics' : 'system-design').fields;
  const errors: FieldErrors = {};
  const result: Record<string, unknown> = {};
  const allowed = new Set([...Object.keys(fields).filter(key => fields[key].kind !== 'list'), ...(kind === 'question' ? ['topicIds', 'companyIds'] : [])]);
  for (const key of Object.keys(body)) if (!allowed.has(key)) errors._form = 'The request contains unsupported fields.';
  for (const [key, field] of Object.entries(fields)) {
    if (field.kind === 'list') continue;
    const raw = body[key] ?? field.default ?? '';
    if (typeof raw !== 'string') { errors[key] = 'Enter text.'; continue; }
    const value = field.kind === 'rich' ? raw : raw.trim();
    if (field.required && !value.trim()) errors[key] = 'This field is required.';
    const max = field.kind === 'rich' ? 20000 : key === 'url' ? 2048 : key === 'slug' ? 180 : 200;
    if (value.length > max) errors[key] = `Use ${max.toLocaleString('en-US')} characters or fewer.`;
    if (value && field.values && !field.values.includes(value)) errors[key] = `Choose ${field.values.join(' or ')}.`;
    if (key === 'slug' && value && !/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(value)) errors[key] = 'Use letters and numbers separated by single hyphens.';
    if (field.kind === 'url' && value) {
      try { if (!['https:', 'http:'].includes(new URL(value).protocol)) throw new Error(); }
      catch { errors[key] = 'Enter a complete http:// or https:// URL.'; }
    }
    result[key] = value.trim() ? value : null;
  }
  if (kind === 'question') for (const key of ['topicIds', 'companyIds']) {
    const ids = body[key] ?? [];
    if (!Array.isArray(ids) || ids.length > 100 || ids.some(id => !Number.isSafeInteger(id) || id <= 0)) errors[key] = 'Select up to 100 valid records.';
    else result[key] = [...new Set(ids)];
  }
  if (Object.keys(errors).length) throw new CreateValidationError(errors);
  return result as TopicInput | QuestionInput;
}
