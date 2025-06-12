export class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async fillInfo(first, last, zip) {
    await this.page.fill('#first-name', first);
    await this.page.fill('#last-name', last);
    await this.page.fill('#postal-code', zip);
    await this.page.click('#continue');
  }

  async finish() {
    await this.page.click('#finish');
  }
}
