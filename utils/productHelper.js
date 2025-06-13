// @ts-check
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

/**
 * Selects products, adds them to cart, and collects their prices
 * @param {import('@playwright/test').Page} page
 * @param {string[]} productNames - Names of the products to add
 * @returns {Promise<number[]>} - Array of prices for the selected products
 */
export async function addProductsAndCollectPrices(page, productNames) {
  const prices = [];
  const inventoryPage = new InventoryPage(page);

  for (const name of productNames) {
    // Select the product
    await inventoryPage.selectProduct(name);
    
    // Get the price of the product
    const price = await inventoryPage.getProductPrice();
    prices.push(price);
    
    // Add to cart
    await inventoryPage.addToCart();
    
    // Verify cart badge updated
    const cartCount = await inventoryPage.getCartCount();
    console.log(`Added ${name} to cart. Cart count: ${cartCount}`);
    
    // Go back to inventory
    await page.goBack();
    await page.waitForLoadState('networkidle');
  }

  return prices;
}
