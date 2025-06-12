// @ts-check
import { expect } from '@playwright/test';

export async function validatePriceDetails(page, prices) {
  const expectedSubtotal = prices.reduce((sum, val) => sum + val, 0);
  const subtotalText = await page.locator('.summary_subtotal_label').textContent();
  const subtotal = Number(subtotalText?.replace(/[^\d.]/g, ''));
  expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
  console.log(`🧾 Subtotal: $${subtotal}`);

  const taxText = await page.locator('.summary_tax_label').textContent();
  const tax = Number(taxText?.replace(/[^\d.]/g, ''));
  console.log(`💸 Tax: $${tax}`);

  const totalText = await page.locator('.summary_total_label').textContent();
  const total = Number(totalText?.replace(/[^\d.]/g, ''));
  console.log(`💰 Total: $${total}`);

  expect(total).toBeCloseTo(expectedSubtotal + tax, 2);
}
