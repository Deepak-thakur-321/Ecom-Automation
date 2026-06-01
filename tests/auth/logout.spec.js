const { test, expect } = require("@playwright/test");


test.describe("Logout Page Test", () => {
   test.beforeEach(async ({ page }) => {
      await page.goto("/logout")
   })

   // tests/auth/logout.spec.js
   test("Should logout successfully", async ({ page }) => {
      await page.goto("/login");
      await page.locator('input[type="email"]').fill("test@mystore.com");
      await page.locator('input[type="password"]').fill("test123");
      await page.getByRole("button", { name: /sign in/i }).click();
      await page.waitForURL(/home/);
      await page.goto("/profile");
      await page.getByRole("button", { name: /logout|sign out/i }).click();

      await expect(page).toHaveURL(/login|home/);
   });

})


