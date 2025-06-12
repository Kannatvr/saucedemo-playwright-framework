export class CartPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator('.cart_item');
  }

  async validateItem(name) {
    await this.page.locator('.cart_item_label', { hasText: name }).waitFor();
  }

  async checkout() {
    await this.page.click('#checkout');
  }
}
