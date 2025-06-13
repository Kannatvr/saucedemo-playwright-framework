import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { testData } from '../data/testData.js';
import products from '../data/products.json' assert { type: 'json' };

test.describe('Single Product Flow', () => {
  test('Add single product and validate cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Login with valid credentials
    const loginSuccess = await loginPage.login(testData.validUser.username, testData.validUser.password);
    expect(loginSuccess).toBe(true);
    await expect(page).toHaveURL(/.*inventory.html/);
    await page.waitForLoadState('networkidle');

    // Wait for inventory to load
    await inventory.isLoaded();

    // Select and add product to cart
    await inventory.selectProduct(products.singleProduct);
    await inventory.addToCart();
    
    // Verify cart badge updated
    const cartCount = await inventory.getCartCount();
    expect(cartCount).toBe(1);

    // Go to cart and verify
    await inventory.goToCart();
    await expect(page).toHaveURL(/.*cart.html/);
    await page.waitForLoadState('networkidle');

    // Verify product is in cart
    await cartPage.validateItem(products.singleProduct);

    // Verify total amount
    const totalAmount = await cartPage.getTotalAmount();
    expect(totalAmount).toBeGreaterThan(0);
  });
}); 