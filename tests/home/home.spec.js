const { test, expect } = require('@playwright/test');

test.describe("Home Page Test", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/home");
    });

    // ─── URL ──────────────────────────────────────────────
    test("Should Home Page Load Successfully", async ({ page }) => {
        await expect(page).toHaveURL("/home");
    });

    // ─── Navbar ───────────────────────────────────────────
    test("Should display Navbar", async ({ page }) => {
        await expect(page.getByRole("navigation")).toBeVisible();
    });

    test("Should display VELOR brand logo", async ({ page }) => {
        await expect(page.getByText("VELOR").first()).toBeVisible();
    });

    // ─── Announcement Bar ─────────────────────────────────
    test("Should display Announcement Bar", async ({ page }) => {
        await expect(page.getByText(/VELOR10/i)).toBeVisible();
    });

    // ─── Hero Section ─────────────────────────────────────
    test("Should display Hero section", async ({ page }) => {
        await expect(page.getByText(/Upgrade Your/i)).toBeVisible();
    });

    test("Should have CTA button", async ({ page }) => {
        await expect(
            page.getByRole("link", { name: /shop|explore|browse/i })
        ).toBeVisible();
    });

    // ─── Category Section ─────────────────────────────────
    test("Should display all categories", async ({ page }) => {
        const categories = ["T-SHIRTS", "SHIRTS", "JACKETS", "JEANS"];
        for (const cat of categories) {
            await expect(
                page.getByText(new RegExp(cat, 'i')).first()
            ).toBeVisible();
        }
    });

    test("Should navigate on category click", async ({ page }) => {
        await page.getByText(/T-SHIRTS/i).first().click();
        await expect(page).not.toHaveURL("/home");
    });

    // ─── Product Section ──────────────────────────────────
    test("Should display product cards", async ({ page }) => {
        // .group → apni site pe confirm karo DevTools se
        const cards = page.locator(".group");
        await expect(cards.first()).toBeVisible();
    });

    test("Should display at least 4 product cards", async ({ page }) => {
        const cards = page.locator(".group");
        const count = await cards.count();
        expect(count).toBeGreaterThanOrEqual(4);
    });

    // ─── Footer ───────────────────────────────────────────
    test("Should display Footer", async ({ page }) => {
        await expect(
            page.getByRole("contentinfo")
        ).toBeVisible();
    });

});