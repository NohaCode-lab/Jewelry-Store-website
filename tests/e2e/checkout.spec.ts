import { test, expect } from '@playwright/test';

test.describe('E2E Shopping & Checkout Flow', () => {
  test('User opens platform, customizes jewelry, adds to cart, and completes checkout', async ({ page }) => {
    await page.goto('/');

    // 1. Verify Home Page Title & Logo
    await expect(page).toHaveTitle(/Mangata & Gallo/i);

    // 2. Open Search Engine
    await page.click('button[title*="Search"]');
    await page.fill('input[placeholder*="Search"]', 'Solitaire');
    await page.click('text=The Eternal Solitaire Ring');

    // 3. Customize Metal & Add to Cart
    await page.click('text=950 Platinum');
    await page.click('button:has-text("Add to Cart")');

    // 4. Open Shopping Cart & Verify Item
    await page.click('button[title*="Shopping Cart"]');
    await expect(page.locator('text=950 Platinum')).toBeVisible();

    // 5. Proceed to Checkout
    await page.click('button:has-text("Proceed to Checkout")');
    await page.fill('input[placeholder="Full Name"]', 'Lady Mariana Gallo');
    await page.fill('input[placeholder="Email Address"]', 'mariana@mangatagallo.com');
    await page.fill('input[placeholder="Phone Number"]', '5125550199');
    await page.fill('input[placeholder="Street Address Line 1"]', '123 Diamond Ave');
    await page.fill('input[placeholder="City"]', 'Austin');
    await page.fill('input[placeholder="State"]', 'TX');
    await page.fill('input[placeholder="ZIP Code"]', '78701');

    // 6. Submit Order
    await page.click('button:has-text("Complete Order")');

    // 7. Verify Order Confirmation Screen
    await expect(page.locator('text=Order Confirmed')).toBeVisible({ timeout: 5000 });
  });
});
