import { template } from '../lib/import/csv';
import { test, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';
import { AUTH_COOKIE_NAME, createSessionToken } from '../lib/auth-token';

const db = new PrismaClient();
const pages = [
  ['goals', '/goals', 'Example preparation goal'],
  ['problems', '/problems', 'Example problem'],
  ['patterns', '/patterns', 'Example pattern'],
  ['companies', '/company', 'Example company'],
  ['system-design', '/system-design', 'Design an example system'],
  ['topics', '/system-design/topics', 'Example topic'],
  ['behavioral', '/behavioral', 'Tell me about a disagreement.'],
  ['stories', '/behavioral/stories', 'Example story'],
  ['competencies', '/behavioral/competencies', 'Example competency'],
] as const;
test.beforeEach(async ({ context }) => {
  if (!process.env.TEST_DATABASE_URL || !new URL(process.env.DATABASE_URL!).searchParams.get('schema')?.startsWith('csv_test_')) throw new Error('Browser tests require an isolated test schema.');
  const user = await db.user.create({ data: { email: `${crypto.randomUUID()}@import.test`, passwordHash: 'unused-browser-test-password' } });
  const token = await createSessionToken(user.id, user.email);
  await context.addCookies([{ name: AUTH_COOKIE_NAME, value: token, domain: 'localhost', path: '/' }]);
  // The production server is considered ready at /login before its database
  // engine is initialized. Wait for the authenticated API before testing the UI.
  await expect.poll(async () => (await context.request.get('http://localhost:3107/api/companies')).status(), { timeout: 60000 }).toBe(200);
});
test.afterAll(async () => { await db.$disconnect(); });

for (const [entity, path, label] of pages) {
  test(`${entity}: template, preview, confirm, refresh, repeat skip`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(path);
    await page.getByRole('button', { name: 'Import CSV', exact: true }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: /^Import / })).toBeVisible();
    const downloadPromise = page.waitForEvent('download');
    await dialog.getByRole('link', { name: 'Download template' }).click();
    const download = await downloadPromise;
    await dialog.getByLabel('CSV file', { exact: true }).setInputFiles((await download.path())!);
    await dialog.getByRole('button', { name: 'Validate file' }).click();
    await expect(dialog.getByText('1 new records; 0 identical records to skip.')).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Confirm import' })).toBeEnabled();
    if (entity === 'companies') await page.screenshot({ path: 'test-results/import-preview.png', fullPage: true });
    await dialog.getByRole('button', { name: 'Confirm import' }).click();
    await expect(page.getByText('1 created; 0 skipped.').first()).toBeVisible();
    if (await dialog.isVisible()) await dialog.getByRole('button', { name: 'Close', exact: true }).first().click();
    await expect(page.getByText(label).first()).toBeVisible();
    await page.getByRole('button', { name: 'Import CSV', exact: true }).click();
    await dialog.getByLabel('CSV file', { exact: true }).setInputFiles((await download.path())!);
    await dialog.getByRole('button', { name: 'Validate file' }).click();
    await expect(dialog.getByText('0 new records; 1 identical records to skip.')).toBeVisible();
    expect(errors).toEqual([]);
  });
}
test('invalid file recovery, keyboard focus, changed file invalidates preview', async ({ page }) => {
  await page.goto('/company');
  const trigger = page.getByRole('button', { name: 'Import CSV', exact: true });
  await trigger.focus(); await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog');
  const input = dialog.getByLabel('CSV file', { exact: true });
  await input.setInputFiles({ name: 'bad.csv', mimeType: 'text/csv', buffer: Buffer.from('name,targetProblems\nCompany,1.5') });
  await dialog.getByRole('button', { name: 'Validate file' }).click();
  await expect(dialog.getByText('Use a whole number without decimals or exponent notation.')).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Confirm import' })).toBeDisabled();
  await input.setInputFiles({ name: 'good.csv', mimeType: 'text/csv', buffer: Buffer.from('name\nCompany') });
  await dialog.getByRole('button', { name: 'Validate file' }).click();
  await expect(dialog.getByRole('button', { name: 'Confirm import' })).toBeEnabled();
  await input.setInputFiles({ name: 'changed.csv', mimeType: 'text/csv', buffer: Buffer.from('name\nChanged') });
  await expect(dialog.getByRole('button', { name: 'Confirm import' })).toBeDisabled();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});
test('lost response can be retried without duplicating the record', async ({ page }) => {
  await page.goto('/company');
  await page.getByRole('button', { name: 'Import CSV', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('CSV file', { exact: true }).setInputFiles({ name: 'retry.csv', mimeType: 'text/csv', buffer: Buffer.from('name\nRetry company') });
  await dialog.getByRole('button', { name: 'Validate file' }).click();
  await expect(dialog.getByRole('button', { name: 'Confirm import' })).toBeEnabled();
  await page.route('**/api/import/companies/commit', async route => { await route.fetch(); await route.abort('failed'); }, { times: 1 });
  await dialog.getByRole('button', { name: 'Confirm import' }).click();
  await expect(dialog.getByRole('alert')).toBeVisible();
  await dialog.getByRole('button', { name: 'Confirm import' }).click();
  await expect(page.getByText('1 created; 0 skipped.').first()).toBeVisible();
  expect(await db.companyCard.count({ where: { name: 'Retry company' } })).toBe(1);
});

for (const timezoneId of ['UTC', 'America/Los_Angeles', 'Asia/Dhaka']) {
  test.describe(`goal date-only round trip in ${timezoneId}`, () => {
    test.use({ timezoneId });
    test('import, display, edit and save preserve calendar dates', async ({ page, context }) => {
      const multipart = { file: { name: 'goals.csv', mimeType: 'text/csv', buffer: Buffer.from(template('goals')) } };
      const preview = await (await context.request.post('/api/import/goals/preview', { multipart })).json();
      expect(preview.token).toBeTruthy();
      expect((await context.request.post('/api/import/goals/commit', { multipart: { ...multipart, token: preview.token, requestId: crypto.randomUUID() } })).ok()).toBeTruthy();
      await page.goto('/goals');
      await expect(page.getByText('Oct 1, 2026 - Oct 31, 2026', { exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Edit Goal', exact: true }).click();
      const dialog = page.getByRole('dialog');
      await expect(dialog.getByLabel('Start Date', { exact: true })).toHaveValue('2026-10-01');
      await expect(dialog.getByLabel('End Date', { exact: true })).toHaveValue('2026-10-31');
      await expect(dialog.locator('input[type="date"]').nth(2)).toHaveValue('2026-10-15');
      await dialog.getByRole('button', { name: 'Update Goal', exact: true }).click();
      await expect(dialog).not.toBeVisible();
      const goals = await (await context.request.get('/api/goals')).json();
      expect(goals.goals[0].startDate.slice(0, 10)).toBe('2026-10-01');
      expect(goals.goals[0].deadline.slice(0, 10)).toBe('2026-10-31');
      expect(goals.goals[0].milestones[0].dueDate.slice(0, 10)).toBe('2026-10-15');
    });
  });
}

test('diagnostics paginate and retained file remains visible when reopening', async ({ page }) => {
  await page.goto('/company');
  const trigger = page.getByRole('button', { name: 'Import CSV', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('CSV file', { exact: true }).setInputFiles({ name: 'many-errors.csv', mimeType: 'text/csv', buffer: Buffer.from('name,targetProblems\n' + Array.from({ length: 250 }, (_, i) => `Company ${i},-1`).join('\n')) });
  await dialog.getByRole('button', { name: 'Validate file', exact: true }).click();
  await expect(dialog.getByText(/1–20 of 250 errors/)).toBeVisible();
  await expect(dialog.getByText('Use a whole number without decimals or exponent notation.', { exact: true })).toHaveCount(20);
  await dialog.getByRole('button', { name: 'Next errors', exact: true }).click();
  await expect(dialog.getByText(/21–40 of 250 errors/)).toBeVisible();
  await dialog.getByRole('button', { name: 'Close', exact: true }).first().click();
  await trigger.click();
  await expect(dialog.getByText(/Selected: many-errors.csv/)).toBeVisible();
});
