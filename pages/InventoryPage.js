export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productList = page.locator('.inventory_list');
  }

  async isLoaded() {
    await this.productList.waitFor();
  }

  async selectProduct(name) {
    await this.page.click(`text=${name}`);
  }

  async addToCart() {
    await this.page.click('button[id^="add-to-cart"]');
  }

  async goToCart() {
    await this.page.click('#shopping_cart_container');
  }
}
