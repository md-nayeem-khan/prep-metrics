import { PROBLEM_PLATFORMS } from '../problem-platforms';

// Shared, browser-safe contract. Templates, validation and field help use this registry.
export const IMPORT_VERSION = 2;
export const MAX_FILE_BYTES = 2 * 1024 * 1024;
export const MAX_ROWS = 1000;
export const MAX_RECORD_SIZE = 128 * 1024;

export type Field = {
  kind?: 'text' | 'rich' | 'integer' | 'date' | 'url' | 'list';
  required?: boolean;
  values?: readonly string[];
  default?: string | number;
  min?: number;
  max?: number;
  maxBytes?: number;
  example?: string;
};
export type Relation = {
  model: string;
  lookup: 'name' | 'slug';
  join: string;
  related: string;
  foreignKey: string;
  joinModel: string;
  parentKey: string;
};
export type Definition = {
  label: string;
  model: string;
  fields: Record<string, Field>;
  identity: string[];
  relations?: Record<string, Relation>;
};
const required = (example: string): Field => ({ required: true, example });
const rich: Field = { kind: 'rich' };
const list: Field = { kind: 'list', example: '[]' };
const source = { values: ['Curated', 'Company'], default: 'Company' } satisfies Field;
const company = (joinModel: string, parentKey = 'questionId'): Relation => ({ model: 'companyCard', lookup: 'name', join: 'companies', related: 'company', foreignKey: 'companyId', joinModel, parentKey });
const competency = (joinModel: string, parentKey = 'questionId'): Relation => ({ model: 'competency', lookup: 'name', join: 'competencies', related: 'competency', foreignKey: 'competencyId', joinModel, parentKey });

export const DEFINITIONS = {
  problems: {
    label: 'Problems', model: 'problem', identity: ['platform', 'problemId'],
    fields: {
      platform: { ...required('leetcode'), values: PROBLEM_PLATFORMS.map(platform => platform.toLowerCase()) },
      problemId: required('001'), title: required('Example problem'),
      difficulty: { ...required('easy'), values: ['easy', 'medium', 'hard', 'unrated'] },
      url: { kind: 'url' }, notes: rich,
      source: { values: ['NeetCode', 'Company'], default: 'NeetCode' },
      tags: list, patterns: list, companies: list,
    },
    relations: {
      patterns: { model: 'pattern', lookup: 'name', join: 'patterns', related: 'pattern', foreignKey: 'patternId', joinModel: 'problemPattern', parentKey: 'problemId' },
      companies: company('problemCompany', 'problemId'),
    },
  },
  patterns: { label: 'Patterns', model: 'pattern', identity: ['name'], fields: { name: required('Example pattern'), category: required('Arrays'), description: rich } },
  companies: { label: 'Companies', model: 'companyCard', identity: ['name'], fields: { name: required('Example company'), icon: { default: '🏢' }, targetProblems: { kind: 'integer', min: 0, default: 0 } } },
  'system-design': {
    label: 'System-design questions', model: 'systemDesignQuestion', identity: ['slug'],
    fields: {
      slug: required('example-system'), title: required('Design an example system'),
      difficulty: { ...required('medium'), values: ['medium', 'hard'] }, category: required('Storage'),
      prompt: { ...required('Describe the requirements and tradeoffs.'), kind: 'rich' },
      functionalRequirements: rich, nonFunctionalRequirements: rich, estimationNotes: rich,
      referenceSolution: rich, commonPitfalls: rich, source, url: { kind: 'url' }, notes: rich,
      topics: list, companies: list,
    },
    relations: { topics: { model: 'systemDesignTopic', lookup: 'name', join: 'topics', related: 'topic', foreignKey: 'topicId', joinModel: 'sDQuestionTopic', parentKey: 'questionId' }, companies: company('sDQuestionCompany') },
  },
  topics: { label: 'Topics', model: 'systemDesignTopic', identity: ['name'], fields: { name: required('Example topic'), category: required('Storage'), description: rich } },
  behavioral: {
    label: 'Behavioral questions', model: 'behavioralQuestion', identity: ['slug'],
    fields: {
      slug: required('example-conflict'), prompt: { ...required('Tell me about a disagreement.'), kind: 'rich' },
      category: required('Conflict'), difficulty: { values: ['easy', 'medium', 'hard'] },
      whatTheyAssess: rich, exemplarAnswer: rich, followUps: rich, source, notes: rich, competencies: list, companies: list,
    },
    relations: { competencies: competency('behavioralQuestionCompetency'), companies: company('behavioralQuestionCompany') },
  },
  stories: {
    label: 'STAR stories', model: 'starStory', identity: ['title'],
    fields: {
      title: required('Example story'), situation: rich, task: rich, action: rich, result: rich,
      metrics: rich, tags: rich, strengthRating: { kind: 'integer', min: 1, max: 5 },
      competencies: list, questions: list,
    },
    relations: { competencies: competency('storyCompetency', 'storyId'), questions: { model: 'behavioralQuestion', lookup: 'slug', join: 'questions', related: 'question', foreignKey: 'questionId', joinModel: 'storyQuestion', parentKey: 'storyId' } },
  },
  competencies: {
    label: 'Competencies', model: 'competency', identity: ['name'],
    fields: { name: required('Example competency'), type: { ...required('Competency'), values: ['LeadershipPrinciple', 'Competency'] }, company: {}, description: rich },
  },
  goals: {
    label: 'Goals', model: 'goal', identity: ['title', 'startDate', 'deadline'],
    fields: {
      goalKey: required('goal-1'), title: required('Example preparation goal'),
      startDate: { ...required('2026-10-01'), kind: 'date' }, deadline: { ...required('2026-10-31'), kind: 'date' },
      description: rich, priority: { values: ['critical', 'high', 'medium', 'low'], default: 'medium' },
      milestoneTitle: required('Complete the first practice set'), milestoneDueDate: { ...required('2026-10-15'), kind: 'date' }, milestoneDescription: rich,
    },
  },
} satisfies Record<string, Definition>;

export type ImportEntity = keyof typeof DEFINITIONS;
export function isImportEntity(value: string): value is ImportEntity {
  return Object.prototype.hasOwnProperty.call(DEFINITIONS, value);
}
export function definition(entity: ImportEntity): Definition {
  const def: Definition = DEFINITIONS[entity];
  return { ...def, fields: Object.fromEntries(Object.entries(def.fields).map(([name, field]) => [name, {
    ...field, maxBytes: field.maxBytes ?? ((!field.kind || field.kind === 'text' || field.kind === 'list') ? 800 : undefined),
  }])) };
}
export type ImportIssue = { row: number; column: string; code: string; message: string };
export type ImportPreview = {
  rows: { row: number; label: string; action: 'create' | 'skip'; data: Record<string, unknown> }[];
  totals: { records: number; create: number; skipped: number };
  issues: ImportIssue[];
  warnings: ImportIssue[];
  issueCount?: number;
  warningCount?: number;
  token?: string;
};
