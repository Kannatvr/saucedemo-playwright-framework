export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productList = page.locator('.inventory_list');
    this.productName = page.locator('.inventory_item_name');
    this.addToCartButton = page.locator('button[id^="add-to-cart"]');
    this.cartIcon = page.locator('#shopping_cart_container');
  }

  async isLoaded() {
    await this.productList.waitFor();
  }

  async selectProduct(name) {
    await this.productName.filter({ hasText: name }).click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}
