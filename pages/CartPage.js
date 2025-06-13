export class CartPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.cartItemLabel = page.locator('.cart_item_label');
  }

  async validateItem(name) {
    await this.cartItemLabel.filter({ hasText: name }).waitFor();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
