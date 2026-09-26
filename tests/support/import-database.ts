import { randomBytes } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { Client } from 'pg';
import { readFileSync } from 'node:fs';

// Never fall back to DATABASE_URL: tests must be explicitly given a disposable DB.
export async function createImportTestDatabase() {
  if (!process.env.TEST_DATABASE_URL) throw new Error('Set TEST_DATABASE_URL to a disposable PostgreSQL database. Production DATABASE_URL is never used.');
  const schema = `csv_test_${randomBytes(10).toString('hex')}`;
  const admin = new Client({ connectionString: process.env.TEST_DATABASE_URL });
  await admin.connect();
  await admin.query(`CREATE SCHEMA "${schema}"`);
  const url = new URL(process.env.TEST_DATABASE_URL);
  url.searchParams.set('schema', schema);
  // Several Next routes initialize pools independently in production. Keep the
  // disposable database small and allow engine startup on busy CI machines.
  url.searchParams.set('connection_limit', '3');
  url.searchParams.set('connect_timeout', '30');
  url.searchParams.set('pool_timeout', '30');
  const env = { ...process.env, DATABASE_URL: url.toString(), DIRECT_URL: url.toString(), AUTH_SECRET: 'isolated-import-test-secret-32-characters' };
  const cleanup = async () => {
    if (!/^csv_test_[a-f0-9]{20}$/.test(schema)) throw new Error('Refusing to drop unexpected schema');
    await admin.query(`DROP SCHEMA "${schema}" CASCADE`);
    await admin.end();
  };
  try {
    // Existing historical migrations omit the original users/tenant migration.
    // Bootstrap the current baseline, then explicitly exercise the new migration.
    execFileSync(process.execPath, ['node_modules/prisma/build/index.js', 'db', 'push', '--skip-generate'], { env, stdio: 'pipe', timeout: 180000 });
    await admin.query(`SET search_path TO "${schema}"`);
    await admin.query('DROP TABLE import_receipts');
    await admin.query(readFileSync('prisma/migrations/20260926000000_csv_import_receipts/migration.sql', 'utf8'));
  } catch {
    await cleanup();
    throw new Error('Migrations failed on isolated test schema. Check migration SQL and PostgreSQL availability.');
  }
  return { url: url.toString(), env, cleanup };
}
