import { test, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';
import { AUTH_COOKIE_NAME, createSessionToken } from '../lib/auth-token';

const db = new PrismaClient();
test.beforeEach(async ({ context }) => {
  if (!process.env.TEST_DATABASE_URL || !new URL(process.env.DATABASE_URL!).searchParams.get('schema')?.startsWith('csv_test_')) throw new Error('Requires an isolated test schema.');
  const user = await db.user.create({ data: { email: `${crypto.randomUUID()}@create.test`, passwordHash: 'unused' } });
  await context.addCookies([{ name: AUTH_COOKIE_NAME, value: await createSessionToken(user.id, user.email), domain: 'localhost', path: '/' }]);
  await expect.poll(async () => (await context.request.get('http://localhost:3107/api/system-design/filters')).status(), { timeout: 60000 }).toBe(200);
});
test.afterAll(async () => { await db.$disconnect(); });

test('topic creation validates, refreshes zero metrics, and rejects duplicates', async ({ page }) => {
  await page.goto('/system-design/topics');
  await page.getByRole('button', { name: 'Add topic', exact: true }).first().click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('button', { name: 'Create topic', exact: true }).click();
  await expect(dialog.getByLabel('Topic name')).toBeFocused();
  await dialog.getByLabel('Topic name').fill('Distributed caching');
  await dialog.getByLabel('Topic category').fill('Storage');
  await dialog.getByRole('button', { name: 'Create topic', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  const row = page.getByRole('row').filter({ hasText: 'Distributed caching' });
  await expect(row).toContainText('0/0');
  await expect(row).toContainText('0%');
  await page.getByRole('button', { name: 'Add topic', exact: true }).first().click();
  await dialog.getByLabel('Topic name').fill('Distributed caching');
  await dialog.getByLabel('Topic category').fill('Storage');
  await dialog.getByRole('button', { name: 'Create topic', exact: true }).click();
  await expect(dialog.getByText('A topic with this name already exists.')).toBeVisible();
});

test('question creates an inline topic, preserves rich text, and opens its detail', async ({ page }) => {
  await page.goto('/system-design');
  await page.getByRole('button', { name: 'Add question', exact: true }).first().click();
  const sheet = page.getByRole('dialog');
  await sheet.getByLabel('Title', { exact: false }).fill('Design a cache');
  await sheet.getByLabel('Prompt', { exact: false }).fill('First requirement\n\n  Second requirement');
  await sheet.getByLabel('Category', { exact: false }).fill('Storage');
  await page.screenshot({ path: 'test-results/create-question-essentials.png', fullPage: true });
  await sheet.getByRole('button', { name: 'Create a topic', exact: true }).click();
  await sheet.getByLabel('Topic name').fill('Caching');
  await sheet.getByLabel('Topic category').fill('Storage');
  await sheet.getByRole('button', { name: 'Create topic', exact: true }).click();
  await expect(sheet.getByRole('checkbox', { name: 'Caching', exact: true })).toBeChecked();
  await expect(sheet.getByLabel('Title', { exact: false })).toHaveValue('Design a cache');
  await sheet.getByRole('button', { name: 'Reference material', exact: true }).click();
  await sheet.getByLabel('Reference solution').fill('Use a bounded LRU cache.');
  await page.screenshot({ path: 'test-results/create-question-desktop.png', fullPage: true });
  await sheet.getByRole('button', { name: 'Create question', exact: true }).click();
  await expect(sheet).not.toBeVisible();
  await expect(page.getByRole('row').filter({ hasText: 'Design a cache' })).toContainText('Caching');
  await page.getByRole('button', { name: 'View question', exact: true }).click();
  await expect(page).toHaveURL(/\/system-design\/\d+$/);
  await expect(page.getByText('First requirement', { exact: false })).toBeVisible();
});

test('mobile keyboard, draft protection, and network recovery', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/system-design');
  const trigger = page.getByRole('button', { name: 'Add question', exact: true }).first();
  await trigger.focus(); await page.keyboard.press('Enter');
  const sheet = page.getByRole('dialog');
  await sheet.getByLabel('Title', { exact: false }).fill('Mobile cache');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('alertdialog')).toBeVisible();
  await page.getByRole('button', { name: 'Keep editing' }).click();
  await expect(sheet.getByLabel('Title', { exact: false })).toHaveValue('Mobile cache');
  await sheet.getByLabel('Prompt', { exact: false }).fill('Design a cache for mobile clients.');
  await sheet.getByLabel('Category', { exact: false }).fill('Storage');
  await page.route('**/api/system-design', route => route.abort(), { times: 1 });
  await sheet.getByRole('button', { name: 'Create question', exact: true }).click();
  await expect(sheet.getByText('Unable to confirm the save.', { exact: false })).toBeInViewport();
  await expect(sheet.getByLabel('Title', { exact: false })).toHaveValue('Mobile cache');
  await page.screenshot({ path: 'test-results/create-question-mobile.png', fullPage: true });
  await sheet.getByRole('button', { name: 'Create question', exact: true }).click();
  await expect(sheet).not.toBeVisible();
  await expect(page.getByRole('row').filter({ hasText: 'Mobile cache' })).toHaveCount(1);
});

test('a lost response can be recovered without creating a duplicate', async ({ page }) => {
  await page.goto('/system-design');
  await page.getByRole('button', { name: 'Add question', exact: true }).first().click();
  const sheet = page.getByRole('dialog');
  await sheet.getByLabel('Title', { exact: false }).fill('Recover cache');
  await sheet.getByLabel('Prompt', { exact: false }).fill('Design a recoverable cache.');
  await sheet.getByLabel('Category', { exact: false }).fill('Storage');
  await page.route('**/api/system-design', async route => {
    const response = await route.fetch();
    expect(response.status()).toBe(201);
    await route.abort();
  }, { times: 1 });
  await sheet.getByRole('button', { name: 'Create question', exact: true }).click();
  await expect(sheet.getByText('Unable to confirm the save.', { exact: false })).toBeVisible();
  await sheet.getByRole('button', { name: 'Create question', exact: true }).click();
  await expect(sheet.getByLabel('Slug', { exact: false })).toBeFocused();
  await sheet.getByRole('link', { name: 'View existing question' }).click();
  await expect(page).toHaveURL(/\/system-design\/\d+$/);
  const records = await page.request.get('/api/system-design');
  expect((await records.json()).questions.filter((q: { slug: string }) => q.slug === 'recover-cache')).toHaveLength(1);
});

test('active filters retain their selection and success offers a detail link', async ({ page }) => {
  await page.goto('/system-design');
  await page.getByRole('combobox').first().click();
  await page.getByRole('option', { name: 'Hard', exact: true }).click();
  await page.getByRole('button', { name: 'Add question', exact: true }).first().click();
  const sheet = page.getByRole('dialog');
  await sheet.getByLabel('Title', { exact: false }).fill('Filtered cache');
  await sheet.getByLabel('Prompt', { exact: false }).fill('Design a cache.');
  await sheet.getByLabel('Category', { exact: false }).fill('Storage');
  await sheet.getByRole('button', { name: 'Create question', exact: true }).click();
  await expect(sheet).not.toBeVisible();
  await expect(page.getByRole('combobox').first()).toContainText('Hard');
  await page.getByRole('button', { name: 'View question', exact: true }).click();
  await expect(page).toHaveURL(/\/system-design\/\d+$/);
});

for (const kind of ['question', 'topic'] as const) {
  test(`${kind} draft survives client-side browser navigation and explicit discard clears it`, async ({ page }) => {
    const target = kind === 'question' ? '/system-design' : '/system-design/topics';
    const source = kind === 'question' ? '/system-design/topics' : '/system-design';
    await page.goto(source);
    await page.locator(`a[href="${target}"]`).first().click();
    await page.getByRole('button', { name: `Add ${kind}`, exact: true }).first().click();
    const dialog = page.getByRole('dialog');
    const label = kind === 'question' ? 'Title' : 'Topic name';
    await dialog.getByLabel(label, { exact: false }).fill('Retained navigation draft');
    if (kind === 'question') {
      await dialog.getByRole('button', { name: 'Create a topic', exact: true }).click();
      await dialog.getByLabel('Topic name').fill('Retained inline topic');
    }
    await page.goBack();
    await expect(page).toHaveURL(source);
    await page.goForward();
    await page.getByRole('button', { name: `Add ${kind}`, exact: true }).first().click();
    await expect(dialog.getByLabel(label, { exact: false })).toHaveValue('Retained navigation draft');
    if (kind === 'question') await expect(dialog.getByLabel('Topic name')).toHaveValue('Retained inline topic');
    await dialog.getByRole('button', { name: 'Cancel', exact: true }).last().click();
    await page.getByRole('button', { name: 'Discard draft', exact: true }).click();
    await page.getByRole('button', { name: `Add ${kind}`, exact: true }).first().click();
    await expect(dialog.getByLabel(label, { exact: false })).toHaveValue('');
  });
}
