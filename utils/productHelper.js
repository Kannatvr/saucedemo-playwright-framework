// @ts-check
import { expect } from '@playwright/test';

/**
 * Selects products, adds them to cart, and collects their prices
 * @param {import('@playwright/test').Page} page
 * @param {import('../pages/InventoryPage').InventoryPage} inventory - Page object for Inventory
 * @param {string[]} productNames - Names of the products to add
 * @returns {Promise<number[]>} - Array of prices for the selected products
 */
export async function addProductsAndCollectPrices(page, inventory, productNames) {
  const prices = [];

  for (const name of productNames) {
    await inventory.selectProduct(name);
    const priceElement = page.locator('.inventory_details_price');
    await expect(priceElement).toBeVisible();

    const priceText = await priceElement.textContent();
    if (!priceText) throw new Error(`Price not found for product: ${name}`);

    prices.push(Number(priceText.replace('$', '')));
    await inventory.addToCart();
    await page.goBack();
  }

  return prices;
}
