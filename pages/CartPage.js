export class CartPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.cartItemLabel = page.locator('.cart_item_label');
    this.itemPrice = page.locator('.inventory_item_price');
  }

  async validateItem(name) {
    await this.cartItemLabel.filter({ hasText: name }).waitFor();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async getTotalAmount() {
    const prices = await this.itemPrice.allTextContents();
    return prices.reduce((total, price) => {
      return total + parseFloat(price.replace('$', ''));
    }, 0);
  }
}
