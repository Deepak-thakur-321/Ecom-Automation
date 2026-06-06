const { test, expect } = require('@playwright/test');

test.describe("Navbar Tests", () => {

   async function getNavbar(page) {
      const navbar = page.getByRole("navigation")
      await expect(navbar).toBeVisible();
      return navbar;
   };

   test.beforeEach(async ({ page }) => {
      await page.goto("/home");
      await expect(page.getByRole("navigation")).toBeVisible();
   });

   test("Should display VELOR logo", async ({ page }) => {
      await expect(page.getByRole("navigation").getByText("VELOR")).toBeVisible();
   });


   test("Should display all nav links", async ({ page }) => {
      const navbar = await getNavbar(page)
      const links = ["Best Sellers", "Gallery", "New Collection", "Sale",];
      for (const link of links) {
         await expect(navbar.getByRole("link", { name: link })).toBeVisible();
      }
   });

   test("Should display search input", async ({ page }) => {
      await expect(page.getByPlaceholder("Search products...")).toBeVisible();
   });

   test("Should display cart icon", async ({ page }) => {
      const navbar = await getNavbar(page)
      await expect(navbar.locator('a[href="/cart"]').count());
   });

   test("Should display wishlist icon", async ({ page }) => {
      const navbar = await getNavbar(page)
      await expect(navbar.locator('a[href="/wishlist"]'))
   });

   test("Should display profile icon", async ({ page }) => {
      const navbar = await getNavbar(page)
      await expect(navbar.locator('a[href="/profile"]'))
   });

   //  Navigation 
   test("Should navigate to home on VELOR logo click", async ({ page }) => {
      await page.goto("/sale");
      await page.getByRole("navigation").getByText("VELOR").click();
      await expect(page).toHaveURL(/home/);
   });

   test("Should navigate to Best Sellers page", async ({ page }) => {
      const navbar = await getNavbar(page)
      await navbar.getByRole("link", { name: "Best Sellers" }).click();
      await expect(page).toHaveURL(/best-sellers/);
   });

   test("Should navigate to Gallery page", async ({ page }) => {
      const navbar = await getNavbar(page)
      await navbar.getByRole("link", { name: "Gallery" }).click();
      await expect(page).toHaveURL(/gallery/);
   });

   test("Should navigate to New Collection page", async ({ page }) => {
      const navbar = await getNavbar(page)
      await navbar.getByRole("link", { name: "New collection" }).click();
      await expect(page).toHaveURL(/view-collection/);
   });

   test("Should navigate to Sale page", async ({ page }) => {
      const navbar = await getNavbar(page)
      await navbar.getByRole("link", { name: "Sale" }).click();
      await expect(page).toHaveURL(/sale/);
   });

   test("Should navigate to cart on cart icon click", async ({ page }) => {
      const navbar = await getNavbar(page)
      await navbar.locator('a[href="/cart"]').click();
      await expect(page).toHaveURL(/cart/);
   });

   test("Should navigate to wishlist on wishlist icon click", async ({ page }) => {
      const navbar = await getNavbar(page)
      await navbar.locator('a[href="/wishlist"]').click();
      await expect(page).toHaveURL(/wishlist/);
   });

   // ─── Categories Dropdown ──────────────────────────────
   test("Should open categories dropdown on hover", async ({ page }) => {
      await page.getByRole("button", { name: /categories/i }).hover();
      const navbar = await getNavbar(page)
      await expect(navbar.getByRole("link", { name: /T-Shirts/i }).first()).toBeVisible();
   });

   test("Should navigate to category on dropdown click", async ({ page }) => {
      const navbar = await getNavbar(page)
      await navbar.getByRole("button", { name: /categories/i }).hover();
      await navbar.getByRole("link", { name: /T-Shirts/i }).first().click();
      await expect(page).toHaveURL(/t-shirts/);
   });

   //  Search Functionality 
   test("Should show search results for valid query", async ({ page }) => {
      const navbar = await getNavbar(page)
      const searchInput = page.getByPlaceholder("Search products...");
      await searchInput.fill("shirt");

      await expect(navbar.locator('a[href*="/product/"]').first()).toBeVisible();
   });

   test("Should show No products found for invalid query", async ({ page }) => {
      const searchInput = page.getByPlaceholder("Search products...");
      await searchInput.fill("xyzabc999");

      await expect(page.getByText("No products found")).toBeVisible();
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

   //  Cart Badge 
   test.only("Should increase cart badge count after adding product", async ({ page }) => {

      // Login
      await page.goto("/login");

      await page.locator('input[type="email"]').fill("test@mystore.com");
      await page.locator('input[type="password"]').fill("test123");
      await page.getByRole("button", { name: /sign in/i }).click();
      await page.waitForURL(/home/);

      // Initial Badge Count
      const navbar = await getNavbar(page);

      const cartLink = navbar.locator('a[href="/cart"]').first();
      const badge = cartLink.locator("span");
      let initialCount = 0;
      if (await badge.count() > 0) { initialCount = Number(await badge.textContent()) }

      console.log("Initial Badge Count:", initialCount);

      // Product Page
      await page.goto("/collection/product/1");
      await page.getByRole("button", { name: /add to cart/i }).click();
      await page.waitForTimeout(3000);

      // DEBUG 1
      console.log("Product Added");

      // Cart Check
      await page.goto("/cart");
      console.log("Cart URL:", page.url());
      console.log("Cart Page Text:", await page.locator("body").textContent());

      // Verify item actually exists in cart
      await expect(page.getByText("Shopping Bag")).toBeVisible();

      // Home Page
      await page.goto("/home");
      const updatedNavbar = await getNavbar(page);
      const updatedCartLink = updatedNavbar.locator('a[href="/cart"]').first();
      console.log("Cart Link HTML:", await updatedCartLink.innerHTML());
      const updatedBadge = updatedCartLink.locator("span");
      console.log("Badge Count Found:", await updatedBadge.count());

      if (await updatedBadge.count() > 0) {
         console.log("Updated Badge Text:", await updatedBadge.textContent());
         await expect(updatedBadge).toBeVisible();

      } else {
         throw new Error("Badge span not found after adding product");

      }

   });

});