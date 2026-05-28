// tests/auth/register.spec.js
const { test, expect } = require('@playwright/test');

test.describe("Register Page Tests", () => {

   test.beforeEach(async ({ page }) => {
      await page.goto("/register");
   });

   // ─── Page Load ────────────────────────────────────────
   test("Should load register page", async ({ page }) => {
      await expect(page).toHaveURL(/register/);
   });

   test("Should display CREATE ACCOUNT heading", async ({ page }) => {
      await expect(page.getByText("CREATE ACCOUNT")).toBeVisible();
   });

   // ─── UI Elements ──────────────────────────────────────
   test("Should display Full Name input", async ({ page }) => {
      await expect(
         page.locator('input[placeholder="Your full name"]')
      ).toBeVisible();
   });

   test("Should display Email Address input", async ({ page }) => {
      await expect(
         page.locator('input[type="email"]')
      ).toBeVisible();
   });

   test("Should display Password input", async ({ page }) => {
      await expect(
         page.locator('input[type="password"]')
      ).toBeVisible();
   });

   test("Should display Join MyStore button", async ({ page }) => {
      await expect(
         page.getByRole("button", { name: /Join MyStore/i })
      ).toBeVisible();
   });

   test("Should display Already a Member Sign In link", async ({ page }) => {
      await expect(
         page.getByRole("link", { name: /Already a Member/i })
      ).toBeVisible();
   });

   // ─── Navigation ───────────────────────────────────────
   test("Should navigate to login on Sign In click", async ({ page }) => {
      await page.getByRole("link", { name: /Already a Member/i }).click();
      await expect(page).toHaveURL(/login/);
   });

   // ─── Validation ───────────────────────────────────────
   test("Should show error on empty form submit", async ({ page }) => {
      await page.getByRole("button", { name: /Join MyStore/i }).click();
      await expect(page.getByText(/Full name is required/i)).toBeVisible();
   });

   test("Should show error on short password", async ({ page }) => {
      await page.locator('input[placeholder="Your full name"]').fill("Test User");
      await page.locator('input[type="email"]').fill("test@example.com");
      await page.locator('input[type="password"]').fill("123");
      await page.getByRole("button", { name: /Join MyStore/i }).click();
   });

   test("Should show validation for short password", async ({ page }) => {

      await page.locator('input[placeholder="Your full name"]').fill("Test User");

      await page.locator('input[type="email"]').fill("test@example.com");

      await page.locator('input[type="password"]').fill("123");

      await page.getByRole("button", {  name: /Join MyStore/i }).click();

      await expect( page.getByText(/Min. 6 Characters required/i)).toBeVisible();

   });

   // ─── Successful Registration ───────────────────────────
   test("Should register with valid details", async ({ page }) => {
      const uniqueEmail = `testuser${Date.now()}@example.com`;

      await page.locator('input[placeholder="Your full name"]').fill("Test User");
      await page.locator('input[type="email"]').fill(uniqueEmail);
      await page.locator('input[type="password"]').fill("test123456");
      await page.getByRole("button", { name: /Join MyStore/i }).click();

      await expect(page).not.toHaveURL(/register/);
   });

});