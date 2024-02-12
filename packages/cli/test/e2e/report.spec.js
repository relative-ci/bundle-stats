import { expect, test } from '@playwright/test';

const BASE_PATH = '/bundle-stats.html';

test('should load overview panel', async ({ page }) => {
  await page.goto(BASE_PATH);
  await expect(page).toHaveTitle(/^Bundle Size — .*\./);
  await expect(page.getByRole('link', { name: 'Overview', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('should load assets panel', async ({ page }) => {
  await page.goto(`${BASE_PATH}#/assets`);
  await expect(page.getByRole('link', { name: 'Assets', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('should load modules panel', async ({ page }) => {
  await page.goto(`${BASE_PATH}#/modules`);
  await expect(page.getByRole('link', { name: 'Modules', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('should load packages panel', async ({ page }) => {
  await page.goto(`${BASE_PATH}#/packages`);
  await expect(page.getByRole('link', { name: 'Packages', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('should navigate to sections', async ({ page }) => {
  await page.goto(BASE_PATH);

  const overviewLink = page.getByRole('link', { name: 'Overview', exact: true });
  await expect(overviewLink).toHaveAttribute('aria-current', 'page');

  const assetsLink = page.getByRole('link', { name: 'Assets', exact: true });
  await assetsLink.click();
  await expect(assetsLink).toHaveAttribute('aria-current', 'page');

  const modulesLink = page.getByRole('link', { name: 'Modules', exact: true });
  await modulesLink.click();
  await expect(modulesLink).toHaveAttribute('aria-current', 'page');

  const packagesLink = page.getByRole('link', { name: 'Packages', exact: true });
  await packagesLink.click();
  await expect(packagesLink).toHaveAttribute('aria-current', 'page');
});
