const { test, expect } = require('@playwright/test');

test.describe("Navbar Tests", () => {

   test.beforeEach(async ({ page }) => {
      await page.goto("/home");
      await expect(page.getByRole("navigation")).toBeVisible();
   });

   test("Should display VELOR logo", async ({ page }) => {
      await expect(page.getByRole("navigation").getByText("VELOR")).toBeVisible();
   });


   test("Should display all nav links", async ({ page }) => {
      const navbar = page.getByRole("navigation")
      await expect(navbar).toBeVisible();
      const links = ["Best Sellers", "Gallery", "New Collection", "Sale",];
      for (const link of links) {
         await expect(navbar.getByRole("link", { name: link })).toBeVisible();
      }
   });

   test("Should display search input", async ({ page }) => {
      await expect(page.getByPlaceholder("Search products...")).toBeVisible();
   });

   test("Should display cart icon", async ({ page }) => {
      const navbar = page.getByRole("navigation")
      await expect(navbar).toBeVisible();
      await expect(page.locator('a[href="/cart"]').count());
   });

   test("Should display wishlist icon", async ({ page }) => {
      const navbar = page.getByRole("navigation");
      await expect(navbar).toBeVisible();
      await expect(page.locator('a[href="/wishlist"]'))
   });

   test("Should display profile icon", async ({ page }) => {
      const navbar = page.getByRole("navigation");
      await expect(navbar).toBeVisible();
      await expect(navbar.locator('a[href="/profile"]'))
   });

   // ─── Navigation ───────────────────────────────────────
   test("Should navigate to home on VELOR logo click", async ({ page }) => {
      await page.goto("/sale"); // kisi aur page pe jao pehle
      await page.getByRole("navigation").getByText("VELOR").click();
      await expect(page).toHaveURL(/home/);
   });

   test("Should navigate to Best Sellers page", async ({ page }) => {
      await page.getByRole("link", { name: "Best Sellers" }).click();
      await expect(page).toHaveURL(/best-sellers/);
   });

   test("Should navigate to Gallery page", async ({ page }) => {
      await page.getByRole("link", { name: "Gallery" }).click();
      await expect(page).toHaveURL(/gallery/);
   });

   test("Should navigate to New Collection page", async ({ page }) => {
      await page.getByRole("link", { name: "New Collection" }).click();
      await expect(page).toHaveURL(/view-collection/);
   });

   test("Should navigate to Sale page", async ({ page }) => {
      await page.getByRole("link", { name: "Sale" }).click();
      await expect(page).toHaveURL(/sale/);
   });

   test("Should navigate to cart on cart icon click", async ({ page }) => {
      await page.locator('a[href="/cart"]').click();
      await expect(page).toHaveURL(/cart/);
   });

   test("Should navigate to wishlist on wishlist icon click", async ({ page }) => {
      await page.locator('a[href="/wishlist"]').click();
      await expect(page).toHaveURL(/wishlist/);
   });

   // ─── Categories Dropdown ──────────────────────────────
   test("Should open categories dropdown on hover", async ({ page }) => {
      await page.getByRole("button", { name: /categories/i }).hover();
      // Dropdown mein T-Shirts link visible hona chahiye
      await expect(
         page.getByRole("link", { name: /T-Shirts/i }).first()
      ).toBeVisible();
   });

   test("Should navigate to category on dropdown click", async ({ page }) => {
      await page.getByRole("button", { name: /categories/i }).hover();
      await page.getByRole("link", { name: /T-Shirts/i }).first().click();
      await expect(page).toHaveURL(/t-shirts/);
   });

   // ─── Search Functionality ─────────────────────────────
   test("Should show search results for valid query", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search products...");
      await searchInput.fill("shirt");

    
      await expect(
         page.locator('a[href*="/product/"]').first()
      ).toBeVisible();
   });

   test("Should show No products found for invalid query", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search products...");
      await searchInput.fill("xyzabc999");

      await expect(
         page.getByText("No products found")
      ).toBeVisible();
   });

   test("Should navigate to product on search result click", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search products...");
      await searchInput.fill("shirt");

      
      await page.locator('a[href*="/product/"]').first().click();

     
      await expect(page).toHaveURL(/product/);
   });

   test("Should clear results after clicking a result", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search products...");
      await searchInput.fill("shirt");

      await page.locator('a[href*="/product/"]').first().click();

   });

   // ─── Cart Badge ───────────────────────────────────────
   test("Should show cart badge after adding product", async ({ page }) => {
      
      await page.goto("/login");
      await page.locator('input[type="email"]').fill("test@mystore.com");
      await page.locator('input[type="password"]').fill("test123");
      await page.getByRole("button", { name: /sign in/i }).click();
      await page.waitForURL(/home/);

    
      await page.goto("/product/1");
      await page.getByRole("button", { name: /ADD TO CART/i }).click();

      await page.goto("/home");
      const cartLink = page.locator('a[href="/cart"]');
      await expect(cartLink).toBeVisible();

      const badge = cartLink.locator('span');
      await expect(badge).toBeVisible();
   });

});