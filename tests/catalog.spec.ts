import { test, expect } from '@playwright/test';

test('Balls category shows 3 products', async ({ page }) => {
  await page.goto('/shop');
  await page.getByRole('link', { name: 'Balls' }).click();
  await expect(page.getByTestId('product-card')).toHaveCount(3);
});

test('search with no matches shows a helpful message', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('searchbox', { name: 'Search products' }).fill('zzz');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByText('No products match your search.')).toBeVisible();
  await expect(page.getByTestId('product-card')).toHaveCount(0);
});

test('out-of-stock product shows Out of stock', async ({ page }) => {
  await page.goto('/product/kickoff-popup-goal');
  await expect(page.getByText('Out of stock', { exact: true })).toBeVisible();
});

test('Cleats PLP shows 5 products', async ({ page }) => {
  await page.goto('/shop?category=cleats');
  await expect(page.getByRole('heading', { name: 'Cleats' })).toBeVisible();
  await expect(page.getByTestId('product-card')).toHaveCount(5);});
