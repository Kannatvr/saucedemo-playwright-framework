import { test, expect } from '@playwright/test';
//POM 
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
// utility
import { validatePriceDetails } from '../utils/priceValidator.js';
import { addProductsAndCollectPrices } from '../utils/productHelper.js';
import { verifyCartItems } from '../utils/cartHelper.js';
// t-data 
import users from '../data/users.json' assert { type: 'json' };
import products from '../data/products.json' assert { type: 'json' };
import checkoutInfo from '../data/checkoutInfo.json' assert { type: 'json' };

test.describe('End-to-End Purchase Flow', () => {
  test('Valid login, add products and verify total', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    // valid login credentials 
    const { username, password } = users.valid;
    // Get product names from data
    const productNames = products.items; 
    const { firstName, lastName, zip } = checkoutInfo.user1;

    await login.goto();
    await login.login(username, password);

    // Wait for after successful login
    await inventory.isLoaded();
    // Add prices for later validation
    const prices = await addProductsAndCollectPrices(page, inventory, productNames);
    // Navigate to the cart page
    await inventory.goToCart();
    // Verify that the correct products appear
    await verifyCartItems(page, productNames);
    await cart.checkout();
    // Fill in checkout information
    await checkout.fillInfo(firstName, lastName, zip);
    // Validate subtotal, tax, and total amount on checkout page 
    await validatePriceDetails(page, prices);
    await checkout.finish();
    // Assert the final confirmation message to ensure order is complete
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});
