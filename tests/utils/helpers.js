// utils/helpers.js
const { expect } = require('@playwright/test');

async function verifyNavbarVisible(page) {
   await expect(page.getByRole("navigation")).toBeVisible();
}

async function verifyFooterVisible(page) {
   await expect(page.getByRole("contentinfo")).toBeVisible();
}

async function searchProduct(page, query) {
   const input = page.getByPlaceholder("Search products...");
   await input.fill(query);
}

async function loginUser(page) {
   await page.goto("/login");
   await page.locator('input[type="email"]').fill("test@mystore.com");
   await page.locator('input[type="password"]').fill("test123");
   await page.getByRole("button", { name: /sign in/i }).click();
   await page.waitForURL(/home/);
}

module.exports = {
   verifyNavbarVisible,
   verifyFooterVisible,
   searchProduct,
   loginUser,
};