const { test, expect } = require('@playwright/test');

test.describe("Login Page Tests", () => {

   test.beforeEach(async ({ page }) => {
      await page.goto("/login");
   });

   // Page Load 
   test("Should load login page", async ({ page }) => {
      await expect(page).toHaveURL(/login/);
   });

   test("Should display WELCOME BACK heading", async ({ page }) => {
      await expect(page.getByText(/WELCOME BACK/i)).toBeVisible();
   });

   // UI Elements 
   test("Should display Email Address field", async ({ page }) => {
      await expect(page.locator('input[type="email"]')).toBeVisible();
   });

   test("Should display Password field", async ({ page }) => {
      await expect(
         page.locator('input[type="password"]')
      ).toBeVisible();
   });

   test("Should display Sign In button", async ({ page }) => {
      await expect(
         page.getByRole("button", { name: /SIGN IN/i })
      ).toBeVisible();
   });

   test("Should display Create New Account Link", async ({ page }) => {
      await expect(page.getByRole("link", { name: /CREATE NEW ACCOUNT/i })).toBeVisible();
   });

   // Validation 
   test("Should show error on invalid credentials", async ({ page }) => {
      await page.locator('input[type="email"]').fill("wrong@email.com");  // 
      await page.locator('input[type="password"]').fill("wrongpass");
      await page.getByRole("button", { name: /SIGN IN/i }).click();

      await expect(page.getByText(/Invalid credentials/i)).toBeVisible();
   });

   test("Should show validation on empty form submit", async ({ page }) => {
      await page.getByRole("button", { name: /SIGN IN/i }).click();
      await expect(page.getByText(/email is required/i)).toBeVisible();
      await expect(page.getByText(/password is required/i)).toBeVisible();
   });

   //  Successful Login 
   test("Should login with valid credentials", async ({ page }) => {
      await page.locator('input[type="email"]').fill("test@mystore.com");
      await page.locator('input[type="password"]').fill("test123");
      await page.getByRole("button", { name: /SIGN IN/i }).click();
      await expect(page).not.toHaveURL(/login/);
   });

   // Navigation 
   test("Should navigate to Register tab on click", async ({ page }) => {
      await page.getByText(/REGISTER/i).click();
      await expect(page).toHaveURL(/register/);
   });

});