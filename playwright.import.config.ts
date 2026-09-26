import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  testMatch: ['csv-import.spec.ts', 'system-design-create.spec.ts'],
  fullyParallel: false,
  workers: 1,
  maxFailures: 2,
  timeout: 120000,
  expect: { timeout: 30000 },
  use: { baseURL: 'http://localhost:3107', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  webServer: {
    command: 'node node_modules/next/dist/bin/next start -p 3107',
    url: 'http://localhost:3107/login',
    reuseExistingServer: false,
    timeout: 120000,
  },
});
