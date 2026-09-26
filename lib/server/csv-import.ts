// Server-only persistence boundary: use explicit tenant predicates, never the scoped
// Prisma extension (its unique lookups escape interactive transactions).
import { createHash } from 'node:crypto';
import { SignJWT, jwtVerify } from 'jose';
import { Prisma, type PrismaClient } from '@prisma/client';
import { authPrisma } from '../prisma';
import { definition, IMPORT_VERSION, type ImportEntity, type ImportPreview } from '../import/definitions';
import { ImportError, parseCsv, type ImportRecord, type Values } from '../import/csv';

type Client = Prisma.TransactionClient | PrismaClient;
type RecordRow = Values & { id: number; userId: string };
// The registry supplies dynamic model names. Keep the cast confined to this boundary.
type Delegate = {
  findMany(args: Values): Promise<RecordRow[]>;
  createMany(args: { data: Values[] }): Promise<{ count: number }>;
};
function model(db: Client, name: string): Delegate { return (db as unknown as Record<string, Delegate>)[name]; }
export function hash(value: unknown): string { return createHash('sha256').update(typeof value === 'string' || value instanceof Uint8Array ? value : JSON.stringify(value)).digest('hex'); }
function secret(): Uint8Array {
  if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32) throw new Error('Import signing is not configured');
  return new TextEncoder().encode(process.env.AUTH_SECRET);
}
function normalize(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'string') return value;
  return value ?? null;
}
function key(data: Values, fields: string[]): string { return JSON.stringify(fields.map(f => typeof data[f] === 'string' ? (data[f] as string).trim() : normalize(data[f]))); }
function equal(a: unknown, b: unknown): boolean { return JSON.stringify(a) === JSON.stringify(b); }
function suppliedValuesEqual(record: ImportRecord, field: string, previous: Values): boolean {
  if (field === 'milestones' && !record.milestoneDescriptionSupplied) {
    const withoutDescriptions = (value: unknown) => (value as Values[]).map(m => ({ title: m.title, dueDate: m.dueDate, targetValue: m.targetValue }));
    return equal(withoutDescriptions(record.data[field]), withoutDescriptions(previous[field]));
  }
  return equal(record.data[field], previous[field]);
}
function comparable(entity: ImportEntity, row: RecordRow): Values {
  const def = definition(entity);
  const result: Values = {};
  for (const [field, spec] of Object.entries(def.fields)) {
    result[field] = typeof row[field] === 'string' && spec.kind !== 'rich' ? (row[field] as string).trim() : normalize(row[field]);
    if (!spec.required && typeof result[field] === 'string' && !(result[field] as string).trim()) result[field] = spec.default ?? null;
    if (spec.values && typeof result[field] === 'string') result[field] = spec.values.find(option => option.toLowerCase() === (result[field] as string).toLowerCase()) ?? result[field];
  }
  for (const [field, relation] of Object.entries(def.relations ?? {})) {
    result[field] = ((row[relation.join] ?? []) as Values[]).map(join => ((join[relation.related] as Values)[relation.lookup] as string).trim()).sort();
  }
  if (entity === 'problems') result.tags = [...new Set(((row.tags ?? []) as Values[]).map(t => String(t.tag).trim()))].sort();
  if (entity === 'goals') result.milestones = ((row.milestones ?? []) as Values[]).map(m => ({ title: m.title, dueDate: normalize(m.dueDate), description: m.description ?? null, targetValue: m.targetValue })).sort((a, b) => Number(a.targetValue) - Number(b.targetValue));
  return result;
}
type Decision = ImportRecord & { action: 'create' | 'skip'; existingId?: number; links: Record<string, number[]> };
type Analysis = { preview: ImportPreview; decisions: Decision[]; digest: string };

async function insertBatches(db: Client, name: string, rows: Values[]) {
  // Keep parameter counts and statement sizes bounded for wide question records.
  for (let offset = 0; offset < rows.length; offset += 250) await model(db, name).createMany({ data: rows.slice(offset, offset + 250) });
}

async function createRecords(db: Client, userId: string, entity: ImportEntity, decisions: Decision[]): Promise<number[]> {
  const def = definition(entity);
  const records = decisions.filter(record => record.action === 'create');
  if (!records.length) return [];
  const parents = records.map(record => {
    const data: Values = { ...record.data, userId };
    for (const field of Object.keys(def.relations ?? {})) delete data[field];
    if (entity === 'problems') delete data.tags;
    if (entity === 'goals') {
      delete data.milestones;
      data.startDate = new Date(`${data.startDate}T00:00:00.000Z`);
      data.deadline = new Date(`${data.deadline}T00:00:00.000Z`);
      Object.assign(data, { type: 'custom', unit: 'percentage', targetValue: 100, currentValue: 0, status: 'active' });
    }
    return data;
  });
  await insertBatches(db, def.model, parents);
  // These identities were absent in the same serializable transaction. This
  // retrieves generated IDs without depending on database insertion order.
  const inserted = await model(db, def.model).findMany({
    where: { userId, OR: parents.map(data => Object.fromEntries(def.identity.map(field => [field, data[field]]))) },
    select: Object.fromEntries(['id', ...def.identity].map(field => [field, true])),
  });
  const idsByKey = new Map<string, number>();
  for (const row of inserted) {
    const identity = key(row, def.identity);
    if (idsByKey.has(identity)) throw new ImportError(409, 'CONCURRENT_CHANGE', 'An identity became ambiguous. Validate the file again.');
    idsByKey.set(identity, row.id);
  }
  const ids = records.map(record => {
    const id = idsByKey.get(key(record.data, def.identity));
    if (id === undefined) throw new Error('Inserted import identity could not be resolved');
    return id;
  });
  for (const [field, rel] of Object.entries(def.relations ?? {})) {
    await insertBatches(db, rel.joinModel, records.flatMap((record, index) => record.links[field].map(id => ({ userId, [rel.parentKey]: ids[index], [rel.foreignKey]: id }))));
  }
  if (entity === 'problems') await insertBatches(db, 'problemTag', records.flatMap((record, index) => (record.data.tags as string[]).map(tag => ({ userId, problemId: ids[index], tag }))));
  if (entity === 'goals') await insertBatches(db, 'milestone', records.flatMap((record, index) => (record.data.milestones as Values[]).map(m => ({ ...m, userId, goalId: ids[index], dueDate: new Date(`${m.dueDate}T00:00:00.000Z`), completed: false }))));
  return ids;
}

export async function analyzeImport(db: Client, userId: string, entity: ImportEntity, bytes: Uint8Array): Promise<Analysis> {
  const parsed = parseCsv(entity, bytes);
  const def = definition(entity);
  const decisions: Decision[] = [];
  const preview: ImportPreview = { rows: [], totals: { records: parsed.records.length, create: 0, skipped: 0 }, issues: parsed.issues, warnings: parsed.warnings, issueCount: parsed.issues.total, warningCount: parsed.warnings.total };
  if (preview.issues.length) return { preview, decisions, digest: hash([]) };
  const include: Values = {};
  for (const rel of Object.values(def.relations ?? {})) include[rel.join] = { include: { [rel.related]: true } };
  if (entity === 'problems') include.tags = true;
  if (entity === 'goals') include.milestones = true;
  const existing = await model(db, def.model).findMany({ where: { userId }, ...(Object.keys(include).length ? { include } : {}) });
  const existingByKey = new Map<string, RecordRow[]>();
  for (const row of existing) {
    const identity = key(comparable(entity, row), def.identity);
    existingByKey.set(identity, [...(existingByKey.get(identity) ?? []), row]);
  }
  const lookups: Record<string, Map<string, number[]>> = {};
  for (const [field, rel] of Object.entries(def.relations ?? {})) {
    const wanted = [...new Set(parsed.records.flatMap(r => r.data[field] as string[]))];
    const rows = wanted.length ? await model(db, rel.model).findMany({ where: { userId }, select: { id: true, [rel.lookup]: true } }) : [];
    lookups[field] = new Map();
    for (const row of rows) {
      const name = String(row[rel.lookup]).trim();
      lookups[field].set(name, [...(lookups[field].get(name) ?? []), row.id]);
    }
  }
  const inFile = new Map<string, ImportRecord>();
  for (const record of parsed.records) {
    const identity = key(record.data, def.identity);
    const matches = existingByKey.get(identity) ?? [];
    const earlier = inFile.get(identity);
    const links: Record<string, number[]> = {};
    for (const field of Object.keys(def.relations ?? {})) {
      links[field] = [];
      for (const name of record.data[field] as string[]) {
        const ids = lookups[field].get(name) ?? [];
        if (ids.length !== 1) preview.issues.push({ row: record.row, column: field, code: ids.length ? 'AMBIGUOUS_REFERENCE' : 'MISSING_REFERENCE', message: `${name}: ${ids.length ? 'more than one matching record' : 'not found; import this catalog first'}.` });
        else links[field].push(ids[0]);
      }
    }
    let action: 'create' | 'skip' = 'create';
    if (matches.length > 1) preview.issues.push({ row: record.row, column: def.identity.join(', '), code: 'AMBIGUOUS_RECORD', message: 'Multiple existing records have this identity.' });
    else if (matches.length === 1 || earlier) {
      const previous = matches.length ? comparable(entity, matches[0]) : earlier!.data;
      const conflicts = record.supplied.filter(field => !suppliedValuesEqual(record, field, previous));
      if (conflicts.length) preview.issues.push({ row: record.row, column: conflicts.join(', '), code: 'CONFLICT', message: 'A record with this identity has different values. Imports do not update existing records.' });
      action = 'skip';
    }
    inFile.set(identity, record);
    decisions.push({ ...record, action, existingId: matches[0]?.id, links });
    preview.rows.push({ row: record.row, label: String(record.data.title ?? record.data.name ?? record.data.slug), action, data: record.data });
    if (action === 'create') preview.totals.create++; else preview.totals.skipped++;
  }
  preview.issueCount = parsed.issues.total;
  return { preview, decisions, digest: hash(decisions) };
}

export async function previewImport(userId: string, entity: ImportEntity, bytes: Uint8Array, db: PrismaClient = authPrisma): Promise<ImportPreview> {
  const analysis = await analyzeImport(db, userId, entity, bytes);
  if (!analysis.preview.issues.length) analysis.preview.token = await new SignJWT({ entity, fileHash: hash(bytes), version: IMPORT_VERSION, digest: analysis.digest })
    .setProtectedHeader({ alg: 'HS256' }).setSubject(userId).setAudience('csv-import').setIssuedAt().setExpirationTime('15m').sign(secret());
  return analysis.preview;
}

export type ImportResult = { created: number; skipped: number; recordIds: number[] };
export async function commitImport(userId: string, entity: ImportEntity, bytes: Uint8Array, token: string, requestId: string, db: PrismaClient = authPrisma): Promise<ImportResult> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) throw new ImportError(400, 'REQUEST_ID', 'A UUID v4 requestId is required.');
  requestId = requestId.toLowerCase();
  const payloadHash = hash({ entity, file: hash(bytes), token });
  // A committed request can be recovered after token expiry, but only by its owner
  // presenting the exact original payload and request UUID.
  const replay = await db.importReceipt.findUnique({ where: { userId_requestId: { userId, requestId } } });
  if (replay) {
    if (replay.payloadHash !== payloadHash) throw new ImportError(409, 'REQUEST_ID_REUSED', 'This request ID was used for another import.');
    return JSON.parse(replay.result) as ImportResult;
  }
  let expectedDigest: string;
  try {
    const { payload } = await jwtVerify(token, secret(), { audience: 'csv-import', algorithms: ['HS256'] });
    if (payload.sub !== userId || payload.entity !== entity || payload.fileHash !== hash(bytes) || payload.version !== IMPORT_VERSION || typeof payload.digest !== 'string') throw new Error('Mismatch');
    expectedDigest = payload.digest;
  } catch { throw new ImportError(409, 'INVALID_PREVIEW', 'Preview expired or does not match this file. Validate the file again.'); }
  const deadline = Date.now() + 50000;
  for (let attempt = 0; attempt < 4; attempt++) {
    const remaining = deadline - Date.now();
    if (remaining < 1000) throw new ImportError(503, 'IMPORT_TIMEOUT', 'Import timed out without saving. Retry the same request.');
    try {
      return await db.$transaction(async tx => {
        const receipt = await tx.importReceipt.findUnique({ where: { userId_requestId: { userId, requestId } } });
        if (receipt) {
          if (receipt.payloadHash !== payloadHash) throw new ImportError(409, 'REQUEST_ID_REUSED', 'This request ID was used for another import.');
          return JSON.parse(receipt.result) as ImportResult;
        }
        const analysis = await analyzeImport(tx, userId, entity, bytes);
        if (analysis.preview.issues.length || analysis.digest !== expectedDigest) throw new ImportError(409, 'STALE_PREVIEW', 'Records changed since validation. Validate the file again.', analysis.preview.issues);
        const ids = await createRecords(tx, userId, entity, analysis.decisions);
        const result: ImportResult = { created: ids.length, skipped: analysis.preview.totals.skipped, recordIds: ids };
        await tx.importReceipt.create({ data: { userId, requestId, payloadHash, result: JSON.stringify(result) } });
        return result;
      }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, maxWait: Math.min(2000, remaining - 500), timeout: Math.max(500, remaining - 2000) });
    } catch (error) {
      const code = (error as { code?: string }).code;
      if (code === 'P2028') throw new ImportError(503, 'IMPORT_TIMEOUT', 'Import timed out without saving. Retry the same request.');
      if ((code === 'P2034' || code === 'P2002') && attempt < 3) continue;
      if (code === 'P2034' || code === 'P2002' || code === 'P2003') throw new ImportError(409, 'CONCURRENT_CHANGE', 'Another write conflicted with this import. Validate the file again.');
      throw error;
    }
  }
  throw new ImportError(409, 'CONCURRENT_CHANGE', 'Please retry the import.');
}
