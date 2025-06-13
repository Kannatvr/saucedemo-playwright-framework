export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productName = page.locator('.inventory_item_name');
    this.addToCartButton = page.locator('button[data-test^="add-to-cart"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.inventoryList = page.locator('.inventory_list');
    this.productPrice = page.locator('.inventory_item_price');
  }

  async isLoaded() {
    await this.inventoryList.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }

  async selectProduct(name) {
    const product = this.productName.filter({ hasText: name });
    await product.waitFor({ state: 'visible', timeout: 10000 });
    await product.click();
    await this.page.waitForLoadState('networkidle');
  }

  async addToCart() {
    const button = this.addToCartButton.first();
    await button.waitFor({ state: 'visible', timeout: 10000 });
    await button.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getProductPrice() {
    const priceElement = this.productPrice.first();
    await priceElement.waitFor({ state: 'visible', timeout: 10000 });
    const priceText = await priceElement.textContent();
    if (!priceText) {
      throw new Error('Could not find product price');
    }
    return parseFloat(priceText.replace('$', ''));
  }

  async getCartCount() {
    const badge = this.cartBadge;
    await badge.waitFor({ state: 'visible', timeout: 10000 });
    return parseInt(await badge.textContent());
  }

  async goToCart() {
    await this.cartLink.click();
    await this.page.waitForLoadState('networkidle');
  }
}
