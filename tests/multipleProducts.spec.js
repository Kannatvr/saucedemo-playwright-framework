import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { testData } from '../data/testData.js';

test.describe('Multiple Products Flow', () => {
  test('Add multiple products and validate cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const productNames = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

    // Login with valid credentials
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/.*inventory.html/);
    await page.waitForLoadState('networkidle');

    // Wait for inventory to load
    await inventory.isLoaded();

    // Add products to cart
    for (const name of productNames) {
      await inventory.selectProduct(name);
      await inventory.addToCart();
      const cartCount = await inventory.getCartCount();
      console.log(`Added ${name} to cart. Cart count: ${cartCount}`);
      await page.goBack();
      await page.waitForLoadState('networkidle');
    }

    // Go to cart and verify
    await inventory.goToCart();
    await expect(page).toHaveURL(/.*cart.html/);
    await page.waitForLoadState('networkidle');

    // Verify all products are in cart
    for (const name of productNames) {
      await cartPage.validateItem(name);
    }

    // Verify item count
    const totalAmount = await cartPage.getTotalAmount();
    expect(totalAmount).toBeGreaterThan(0);
  });
}); 