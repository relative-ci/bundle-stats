import { expect, test } from '@playwright/test';

const TEST_URL = 'http://localhost:8080/bundle-stats.html';

test('should load overview panel', async ({ page }) => {
  await page.goto(TEST_URL);
});
