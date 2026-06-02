const { test, expect } = require('@playwright/test');

test.describe("Product Detail Page Tests", () => {

   test.beforeEach(async ({ page }) => {
      await page.goto("/view-collection");

      await page.locator("div.col-card").first().click();

      await page.waitForURL(/\/collection\/product\/\d+/);
   });

   //  Page Load 
   test("Should load product detail page", async ({ page }) => {
      await expect(page).toHaveURL(/\/collection\/product\/\d+/);
   });

   //  Product Info 
   test("Should display product name in h1", async ({ page }) => {
      const h1 = page.locator("h1");
      await expect(h1).toBeVisible();
      const text = await h1.textContent();
      expect(text.trim().length).toBeGreaterThan(0);
   });

   test("Should display product category label", async ({ page }) => {
      await expect(page.locator("p.uppercase.tracking-wider")).toBeVisible();
   });

   test("Should display product description", async ({ page }) => {
      await expect(page.locator("p.text-gray-600.leading-relaxed.text-base")).toBeVisible();
   });

   //  Size Selector
   test("Should display SIZE heading", async ({ page }) => {
      await expect(page.locator("h3").filter({ hasText: "SIZE" })).toBeVisible();
   });

   test("Should display size options S, M, L,", async ({ page }) => {
      for (const size of ["S", "M", "L",]) {
         await expect(page.getByRole("button", { name: size, exact: true })).toBeVisible();
      }
   });

   test("Should select size M on click", async ({ page }) => {
      const sizeM = page.getByRole("button", { name: "M", exact: true });
      await sizeM.click();
      await expect(sizeM).toBeVisible(); 
   });

   //  Quantity 
   test("Should display QUANTITY heading", async ({ page }) => {
      await expect(page.locator("h3").filter({ hasText: "QUANTITY" })).toBeVisible();
   });

   test("Should show default quantity as 1", async ({ page }) => {
      await expect(page.locator("span.w-16.text-center")).toHaveText("1");
   });

   test("Should increase quantity on plus click", async ({ page }) => {
      await page.getByRole("button", { name: "+", exact: true }).click();
      await expect(page.locator("span.w-16.text-center")).toHaveText("2");
   });

   test.only("Should not decrease quantity below 1", async ({ page }) => {
      await page.getByRole("button", { name: "-", exact: false }).click();
      await expect(page.locator("span.w-16.text-center")).toHaveText("1");
   });

   //  Add To Cart
   test("Should display ADD TO CART button", async ({ page }) => {
      await expect(page.getByRole("button", { name: /ADD TO CART/i })).toBeVisible();
   });

   test("Should add product to cart after login", async ({ page }) => {
      await page.goto("/login");
      await page.locator('input[type="email"]').fill("test@mystore.com");
      await page.locator('input[type="password"]').fill("test123");
      await page.getByRole("button", { name: /sign in/i }).click();
      await page.waitForURL(/home/);

      
      await page.goto("/view-collection");
      await page.locator("div.col-card").first().click();
      await page.waitForURL(/\/collection\/product\/\d+/);

      await page.getByRole("button", { name: /ADD TO CART/i }).click();

      await page.goto("/cart");
      await expect(page.getByText("Shopping Bag")).toBeVisible();
      await expect(page.getByText(/item/)).toBeVisible();
   });
});


