// @ts-check
import { expect } from '@playwright/test';

/**
 * Verifies that each product name is present in the cart.
 * @param {import('@playwright/test').Page} page 
 * @param {string[]} productNames 
 */
export async function verifyCartItems(page, productNames) {
  for (const productName of productNames) {
    const item = page.locator('.cart_item_label', { hasText: productName });
    await expect(item).toBeVisible();
  }
}
