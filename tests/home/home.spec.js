const { test, expect } = require('@playwright/test');

test.describe("Home Page Test", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/home");
    });

    // URL
    test("Should Home Page Load Successfully", async ({ page }) => {
        await expect(page).toHaveURL("/home");
    });

    // Navbar
    test("Should display Navbar", async ({ page }) => {
        await expect(page.getByRole("navigation")).toBeVisible();
    });

    test("Should display VELOR brand logo", async ({ page }) => {
        await expect(page.getByText("VELOR").first()).toBeVisible();
    });

    // Announcement Bar
    test("Should display Announcement Bar", async ({ page }) => {
        await expect(page.getByText(/VELOR10/i)).toBeVisible();
    });

    // Hero
    test("Should display Hero section", async ({ page }) => {
        await expect(page.getByText(/Upgrade Your/i)).toBeVisible();
    });

    // CTA
    test("Should have Shop Now button", async ({ page }) => {
        await expect(
            page.getByRole("button", { name: /shop now/i })
        ).toBeVisible();
    });


    test("Should display category images", async ({ page }) => {
        const categories = ["T-shirts", "Jeans", "Shirts", "Jackets", "Caps", "Bags", "Shoes", "Watches"]

        for (const items of categories) {
            await expect(page.getByText(items).last()).toBeVisible()
        }
    })

    test("Should navigate to categories", async ({ page }) => {

        const links = [
            { name: "T-shirts", href: "/category/t-shirts" },

            { name: "Shirts", href: "/category/shirts" },

            { name: "Jackets", href: "/category/jackets" },

            { name: "Jeans", href: "/category/jeans" },

            { name: "Caps", href: "/category/caps" },

            { name: "Bags", href: "/category/bags" },

            { name: "Shoes", href: "/category/shoes" },

            { name: "Watches", href: "/category/watches" },

        ];

        for (const category of links) {
            await page.goto("/home");
            const item = page.locator(`a[href="${category.href}"]`).last();
            await item.scrollIntoViewIfNeeded();
            await item.click();
            await expect(page).toHaveURL(new RegExp(category.href.replace("/category/", "")));
        }

    });

    // Product Cards
    test("Should display product cards", async ({ page }) => {
        const cards = page.locator(".rounded-3xl.bg-white.shadow-xl");
        await expect(cards.first()).toBeVisible();
    });

    test("Should display at least 4 product cards", async ({ page }) => {
        const cards = page.locator(".rounded-3xl.bg-white.shadow-xl");
        const count = await cards.count();
        expect(count).toBeGreaterThanOrEqual(4);
    });

    // Footer
    test("Should display Footer", async ({ page }) => {
        await expect(page.getByRole("contentinfo")).toBeVisible();
    });

});