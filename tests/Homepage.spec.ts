import { test, expect } from '@playwright/test';
test('Homepage shows featured gear', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Featured Gear' })).toBeVisible();
    await expect(page.getByTestId('product-card')).toHaveCount(4);
});

test('Search Volta', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('searchbox', { name: 'Search products' }).fill('Volta');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('heading', { name: 'Results for “Volta”' })).toBeVisible();
    await expect(page.getByTestId('product-card')).toHaveCount(4);
});

test('Product Does not exist', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('searchbox', { name: 'Search products' }).fill('Nike');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('heading', { name: 'Results for “Nike”' })).toBeVisible();
    await expect(page.getByTestId('product-card')).toHaveCount(0);
});

test('Velocity FG Cleat Reviews', async ({ page }) => {
    await page.goto('/product/stryker-velocity-fg');
    await expect(page.getByRole('heading', { name: 'Velocity FG Cleat' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Reviews' })).toBeVisible();
    await expect(page.getByTestId('review')).toHaveCount(2);
});

test('Sort By Price Low to High', async ({ page }) => {
    await page.goto('/shop');
    await page.getByLabel('Sort By').selectOption('price-asc');
    await expect(page.getByTestId('product-price').first()).toHaveText('$14.99');});


test('Sort By Price High to Low', async ({ page }) => {
    await page.goto('/shop');
    await page.getByLabel('Sort By').selectOption('price-desc');
    await expect(page.getByTestId('product-price').first()).toHaveText('$139.99');
    await expect(page.getByTestId('product-price').last()).toHaveText('$14.99');
});

test('Filter By Category', async ({ page }) => {
    await page.goto('/shop');
    await page.getByLabel(' Category ').selectOption('goalkeeper');
    await expect(page.getByTestId('product-card')).toHaveCount(2);

}); 

test('Header Category Navigation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Categories' }).getByRole('link', { name: 'Training' }).click();
     await expect(page.getByRole('heading', { name: 'Training',exact:true })).toBeVisible();
    await expect(page.getByTestId('product-card')).toHaveCount(4);
    await expect(page.getByText('Out of Stock')).toBeVisible();
    });


test('User Journey Home to PDP', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Featured Gear' })).toBeVisible();
    await page.getByRole('link', { name: 'Match Ball' }).click();
    await expect(page).toHaveURL(/kickoff-match-ball/);
    await expect(page.getByRole('heading', { name: 'Match Ball' })).toBeVisible();
    await expect(page.getByTestId('product-price')).toHaveText('$39.99');
});

test('PDP with no reviews', async ({ page }) => {
    await page.goto('/product/kickoff-home-jersey');
    await expect(page.getByRole('heading', { name: 'Reviews' })).toBeVisible();
    await expect(page.getByTestId('review')).toHaveCount(0);
});

test('Homepage to PDP with no reviews', async ({ page }) => {
await page.goto('/');
await expect(page.getByRole('link', { name: 'KickOff Home Jersey' })).toBeVisible();
await page.getByRole('link', { name: 'Home Jersey' }).click();
await expect(page.getByRole('heading', { name: 'Reviews' })).toBeVisible();
await expect(page.getByTestId('review')).toHaveCount(0);
});

test('Search', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('searchbox', { name: 'Search products' }).fill('ball');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByTestId('product-card')).toHaveCount(4);
    await page.getByLabel('Category').selectOption('Balls');
    await expect(page.getByRole('heading', { name: 'Results for “ball”' })).toBeVisible();
    await expect(page.getByTestId('product-card')).toHaveCount(3);
});



