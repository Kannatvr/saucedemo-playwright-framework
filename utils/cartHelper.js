// @ts-check
import { expect } from '@playwright/test';

/**
 * Verifies that each product name is present in the cart.
 * @param {import('@playwright/test').Page} page 
 * @param {string[]} productNames 
 */
export async function verifyCartItems(page, productNames) {
  for (const name of productNames) {
    await expect(page.locator('.cart_item_label', { hasText: name })).toBeVisible();
    console.log(`✅ Verified in cart: ${name}`);
  }
}
