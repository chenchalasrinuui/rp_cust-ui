// @ts-check
const { test, expect } = require('@playwright/test');

test('has Header', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');

  // Expect a title "to contain" a substring.
  await expect(page.getByText("Customer Portal")).toBeInViewport();
});


test('has Footer', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');
  const footerEle = page.getByTestId("footer")
  // Expect a title "to contain" a substring.
  await expect(page.getByTestId('footer')).toHaveText("© rights  belongs to NIT.");
});