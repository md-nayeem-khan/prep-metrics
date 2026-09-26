import { spawn } from 'node:child_process';
import { createImportTestDatabase } from '../tests/support/import-database';

async function main() {
  const isolated = await createImportTestDatabase();
  try {
    const code = await new Promise<number>((resolve, reject) => {
      const child = spawn(process.execPath, ['node_modules/@playwright/test/cli.js', 'test', '--config=playwright.import.config.ts', ...process.argv.slice(2)], { env: isolated.env, stdio: 'inherit' });
      child.on('error', reject);
      child.on('exit', code => resolve(code ?? 1));
    });
    process.exitCode = code;
  } finally { await isolated.cleanup(); }
}
main().catch(() => { console.error('Import browser test setup failed. Check TEST_DATABASE_URL, migrations, and the production build.'); process.exitCode = 1; });
