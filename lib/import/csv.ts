import { diagnostics, type Diagnostics } from './diagnostics';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { definition, MAX_FILE_BYTES, MAX_RECORD_SIZE, MAX_ROWS, type Field, type ImportEntity, type ImportIssue } from './definitions';

export type Values = Record<string, unknown>;
export type ImportRecord = { row: number; data: Values; supplied: string[]; milestoneDescriptionSupplied?: boolean };
export class ImportError extends Error {
  constructor(public status: number, public code: string, message: string, public issues: ImportIssue[] = []) { super(message); }
}
export function writeCsv(rows: unknown[][]): string {
  return stringify(rows, { record_delimiter: '\r\n' });
}
export function template(entity: ImportEntity): string {
  const fields = definition(entity).fields;
  return writeCsv([Object.keys(fields), Object.values(fields).map(f => f.example ?? f.default ?? '')]);
}
const legacyAliases: Record<string, string> = { 'problem id': 'problemId', 'url': 'url' };
const legacyIgnored = new Set(['attempts', 'last status', 'last time (seconds)', 'created date']);
const issue = (row: number, column: string, code: string, message: string): ImportIssue => ({ row, column, code, message });

function valueOf(raw: string, field: Field, entity: ImportEntity, column: string): unknown {
  const value = field.kind === 'rich' ? raw : raw.trim();
  if (!value.trim()) {
    if (field.required) throw new Error('A value is required.');
    return field.default ?? (field.kind === 'list' ? [] : null);
  }
  if (field.maxBytes && field.kind !== 'list' && Buffer.byteLength(value, 'utf8') > field.maxBytes) throw new Error(`Use at most ${field.maxBytes} UTF-8 bytes.`);
  if (field.values) {
    const canonical = field.values.find(option => option.toLowerCase() === value.toLowerCase());
    if (!canonical) throw new Error(`Use one of: ${field.values.join(', ')}.`);
    return canonical;
  }
  if (field.kind === 'integer') {
    if (!/^\d+$/.test(value)) throw new Error('Use a whole number without decimals or exponent notation.');
    const n = Number(value);
    if (!Number.isSafeInteger(n) || n < (field.min ?? 0) || n > (field.max ?? 2147483647)) throw new Error(`Use an integer from ${field.min ?? 0} to ${field.max ?? 2147483647}.`);
    return n;
  }
  if (field.kind === 'date') {
    const date = new Date(`${value}T00:00:00.000Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number(value.slice(0, 4)) < 1000 || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) throw new Error('Use a real calendar date in YYYY-MM-DD format.');
  }
  if (field.kind === 'url') {
    let url: URL;
    try { url = new URL(value); } catch { throw new Error('Use an absolute HTTP or HTTPS URL.'); }
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Use an HTTP or HTTPS URL without credentials.');
  }
  if (field.kind === 'list') {
    let array: unknown;
    if (entity === 'problems' && ['tags', 'patterns'].includes(column) && !value.startsWith('[')) array = value.split(';').map(v => v.trim()).filter(Boolean);
    else {
      try { array = JSON.parse(value); } catch { throw new Error('Use a JSON array of names, for example ["Storage"].'); }
    }
    if (!Array.isArray(array) || array.some(v => typeof v !== 'string' || !v.trim())) throw new Error('Use an array of non-empty strings.');
    if ((array as string[]).some(item => Buffer.byteLength(item.trim(), 'utf8') > (field.maxBytes ?? 800))) throw new Error(`Each list item must be at most ${field.maxBytes ?? 800} UTF-8 bytes.`);
    return [...new Set((array as string[]).map(v => v.trim()))].sort();
  }
  return value;
}

export function parseCsv(entity: ImportEntity, bytes: Uint8Array): { records: ImportRecord[]; issues: Diagnostics; warnings: Diagnostics } {
  if (bytes.length > MAX_FILE_BYTES) throw new ImportError(413, 'FILE_TOO_LARGE', 'Files must be 2 MiB or smaller.');
  let text: string;
  try { text = new TextDecoder('utf-8', { fatal: true }).decode(bytes); }
  catch { throw new ImportError(400, 'ENCODING', 'Save the file as UTF-8 CSV.'); }
  if (text.includes('\0')) throw new ImportError(400, 'ENCODING', 'CSV must not contain NUL characters.');
  let parsed: { record: string[]; raw: string; info: { lines: number; empty_lines: number } }[];
  try {
    parsed = parse(text, { bom: true, skip_empty_lines: true, max_record_size: MAX_RECORD_SIZE, raw: true, info: true, to: MAX_ROWS + 2 }) as unknown as typeof parsed;
  } catch (error) {
    const e = error as { lines?: number; code?: string };
    throw new ImportError(400, 'MALFORMED_CSV', 'CSV has invalid quoting, inconsistent columns, or an oversized record.', [issue(e.lines ?? 0, '', e.code ?? 'CSV', 'Check CSV quoting, column count, and the 128 KiB record limit.')]);
  }
  if (parsed.length < 2) throw new ImportError(400, 'EMPTY_CSV', 'Include a header and at least one data row.');
  if (parsed.some(entry => Buffer.byteLength(entry.raw.replace(/(?:\r\n|\r|\n)$/, ''), 'utf8') > MAX_RECORD_SIZE)) throw new ImportError(400, 'RECORD_TOO_LARGE', 'Each CSV record must be 128 KiB or smaller.');
  if (parsed.length > MAX_ROWS + 1) throw new ImportError(413, 'TOO_MANY_ROWS', 'Import at most 1,000 data rows at a time.');
  const { fields } = definition(entity);
  const aliases = new Map(Object.keys(fields).map(k => [k.toLowerCase(), k]));
  if (entity === 'problems') Object.entries(legacyAliases).forEach(([a, k]) => aliases.set(a, k));
  const issues = diagnostics();
  const warnings = diagnostics();
  const seen = new Set<string>();
  const headerRow = 1 + parsed[0].info.empty_lines;
  const headers = parsed[0].record.map(raw => {
    const lower = raw.trim().toLowerCase();
    const key = aliases.get(lower);
    const normalized = key ?? lower;
    if (seen.has(normalized)) issues.push(issue(headerRow, raw, 'DUPLICATE_HEADER', 'This column occurs more than once.'));
    seen.add(normalized);
    if (!key) {
      if (entity === 'problems' && legacyIgnored.has(lower)) warnings.push(issue(headerRow, raw, 'IGNORED_COLUMN', 'Activity and creation metadata are not imported.'));
      else issues.push(issue(headerRow, raw, 'UNKNOWN_HEADER', 'Unknown or non-importable column. Download this list’s template.'));
    }
    return key;
  });
  for (const [key, field] of Object.entries(fields)) if (field.required && !headers.includes(key)) issues.push(issue(headerRow, key, 'MISSING_HEADER', 'Required column is missing.'));
  if (issues.length) return { records: [], issues, warnings };
  const records: ImportRecord[] = [];
  for (const [index, entry] of parsed.slice(1).entries()) {
    const data: Values = {};
    // Logical spreadsheet row, not physical line count inside a quoted cell.
    const row = index + 2 + entry.info.empty_lines;
    const supplied = headers.filter((h): h is string => Boolean(h));
    for (const [key, field] of Object.entries(fields)) {
      const index = headers.indexOf(key);
      try {
        const raw = index < 0 ? '' : entry.record[index];
        data[key] = valueOf(raw, field, entity, key);
        if (field.values && raw.trim() && raw.trim() !== data[key]) warnings.push(issue(row, key, 'NORMALIZED_VALUE', `Recognized value normalized from ${raw.trim()} to ${data[key]}.`));
      }
      catch (error) { issues.push(issue(row, key, 'INVALID_VALUE', (error as Error).message)); }
    }
    records.push({ row, data, supplied });
  }
  if (entity !== 'goals' || issues.length) return { records, issues, warnings };
  const grouped = new Map<string, ImportRecord>();
  for (const record of records) {
    const { goalKey, milestoneTitle, milestoneDueDate, milestoneDescription, ...data } = record.data;
    if ((data.startDate as string) > (data.deadline as string)) issues.push(issue(record.row, 'deadline', 'DATE_ORDER', 'Deadline must be on or after startDate.'));
    if ((milestoneDueDate as string) < (data.startDate as string) || (milestoneDueDate as string) > (data.deadline as string)) issues.push(issue(record.row, 'milestoneDueDate', 'DATE_RANGE', 'Milestone date must be within the goal date range.'));
    let group = grouped.get(goalKey as string);
    if (!group) {
      group = { row: record.row, data: { ...data, milestones: [] }, supplied: [...record.supplied.filter(k => k !== 'goalKey' && !k.startsWith('milestone')), 'milestones'], milestoneDescriptionSupplied: record.supplied.includes('milestoneDescription') };
      grouped.set(goalKey as string, group);
    } else if (Object.keys(data).some(k => group!.data[k] !== data[k])) issues.push(issue(record.row, 'goalKey', 'INCONSISTENT_GOAL', 'Repeated goal fields must match within each goalKey.'));
    const milestones = group.data.milestones as Values[];
    const milestone = { title: milestoneTitle, dueDate: milestoneDueDate, description: milestoneDescription };
    const repeated = milestones.find(m => m.title === milestoneTitle && m.dueDate === milestoneDueDate);
    if (repeated) {
      if (repeated.description !== milestoneDescription) issues.push(issue(record.row, 'milestoneDescription', 'CONFLICT', 'This milestone is repeated with a different description.'));
      else warnings.push(issue(record.row, 'milestoneTitle', 'DUPLICATE_ROW', 'Identical milestone row skipped.'));
    } else milestones.push({ ...milestone, targetValue: milestones.length + 1 });
  }
  return { records: [...grouped.values()], issues, warnings };
}
