// tests/cart/cart.spec.js
const { test, expect } = require('@playwright/test');

test.describe("Cart Page Tests", () => {

   async function addProductToCart(page) {
      await page.goto("/login");
      await page.locator('input[type="email"]').fill("test@mystore.com");
      await page.locator('input[type="password"]').fill("test123");
      await page.getByRole("button", { name: /sign in/i }).click();
      await page.waitForURL(/home/);

      await page.goto("/product/1");

      const productName = await page.locator("h1").first().textContent();


      await page.getByRole("button", { name: /add to cart/i }).click();


      await page.goto("/cart");

      return productName.trim();
   }

   //  Cart Page Tests

   //  Page Load 
   test("Should load cart page", async ({ page }) => {
      await page.goto("/cart");
      await expect(page).toHaveURL(/cart/);
   });


   test("Should display Shopping Bag heading", async ({ page }) => {
      await page.goto("/cart");
      await expect(page.getByText("Shopping Bag")).toBeVisible();
   });


   // Cart With Items
   test("Should display product in cart after adding", async ({ page }) => {
      const productName = await addProductToCart(page);
      await expect(page.getByText(productName)).toBeVisible()
   });

   test("Should display Order Summary section", async ({ page }) => {
      await addProductToCart(page);
      await expect(page.getByText("Order Summary")).toBeVisible();
   });

   test("Should display Subtotal in Order Summary", async ({ page }) => {
      await addProductToCart(page);
      await expect(page.getByText("Subtotal")).toBeVisible();
   });

   test("Should display FREE shipping", async ({ page }) => {
      await addProductToCart(page);
      await page.pause();
      await expect(page.getByText("FREE")).toBeVisible();
   });

   test("Should display Total amount", async ({ page }) => {
      await addProductToCart(page);
      await expect(page.getByText("Total")).toBeVisible();
   });

   test("Should display Secure Checkout button", async ({ page }) => {
      await addProductToCart(page);
      await expect(
         page.getByRole("button", { name: /SECURE CHECKOUT/i })
      ).toBeVisible();
   });

   test("Should display Continue Shopping button", async ({ page }) => {
      await addProductToCart(page);
      await expect(
         page.getByRole("button", { name: /CONTINUE SHOPPING/i })
      ).toBeVisible();
   });

   //  Quantity Controls 
   test("Should increase quantity on plus click", async ({ page }) => {
      await addProductToCart(page);

      const quantitySpan = page.locator('span.text-center').filter({ hasText: /^\d+$/ }).first();
      const before = await quantitySpan.textContent();

      const plusBtn = page.locator('div.divide-x button').last();
      await plusBtn.click();

      const after = await quantitySpan.textContent();
      expect(Number(after)).toBeGreaterThan(Number(before));
   });

   // Remove Item 
   test("Should remove item on delete click", async ({ page }) => {
      await addProductToCart(page);

      const deleteBtn = page.locator('button.hover\\:text-red-600');
      await deleteBtn.click();

      await expect(page.getByText("Shopping Bag")).toBeVisible();
   });

   //  Navigation 
   test("Should navigate to home on Continue Shopping click", async ({ page }) => {
      await addProductToCart(page);
      await page.getByRole("button", { name: /CONTINUE SHOPPING/i }).click();
      await expect(page).not.toHaveURL(/cart/);
   });

});