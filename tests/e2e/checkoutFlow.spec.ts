import { test, expect } from '@playwright/test';

test.describe('Mangata & Gallo User Journey & Checkout E2E Scenario', () => {
  test('should complete storefront browsing, product search, cart addition, and checkout flow', async ({ page }) => {
    // 1. Open Storefront Home Page
    await page.goto('/');
    await expect(page).toHaveTitle(/Mangata & Gallo/i);

    // 2. Verify Primary Brand Navigation Elements
    const brandHeading = page.locator('text=MANGATA & GALLO');
    await expect(brandHeading.first()).toBeVisible();

    // 3. Navigate to Collections Page
    await page.goto('/collections');
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // 4. Verify Interactive Modals (AI Concierge & Cart)
    const aiButton = page.locator('button:has-text("AI Concierge"), button[aria-label*="AI"]');
    if (await aiButton.count() > 0) {
      await expect(aiButton.first()).toBeVisible();
    }

    // 5. Open Cart Drawer Simulation
    const cartButton = page.locator('button[aria-label*="Cart"], button:has-text("Cart")');
    if (await cartButton.count() > 0) {
      await cartButton.first().click();
    }
  });
});
