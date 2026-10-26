import { test, expect } from '@playwright/test';

// Your first test. Lesson 1 walks through every line.
test('home page loads and search finds the match ball', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/KickOff Sports/);

  await page.getByRole('searchbox', { name: 'Search products' }).fill('match ball');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByRole('heading', { name: 'Results for “match ball”' })).toBeVisible();
  await expect(page.getByTestId('product-card')).toHaveCount(1);
  await expect(page.getByRole('link', { name: /Match Ball/ })).toBeVisible();
});
