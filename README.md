# VELOR E-Commerce QA Automation Suite (Playwright)

Automated End-to-End testing project built using **Playwright + JavaScript** on a real-world React ecommerce application.

The goal of this project is to practice and demonstrate:

- UI Testing
- Functional Testing
- Navigation Testing
- Assertions & Validations
- Cross-browser Testing
- QA Automation Workflows
- Real-world ecommerce test scenarios

---

##  Application Under Test

**VELOR Fashion Commerce**

Live URL:https://fashion-commerce-nine.vercel.app/home


# Current Project Structure

ecom-automation/

├── tests/
│      └── home/
│            └── home.spec.js

├── docs/
│      └── notes.md

├── screenshots/

├── package.json
├── playwright.config.js
└── README.md
```

---

# ✅ Test Coverage

## Home Page Tests — `tests/home/home.spec.js`

| Test Scenario | Status |
|---------------|---------|
| Homepage loads successfully | ✅ |
| Correct URL validation | ✅ |
| Navbar visible | ✅ |
| Brand logo visible | ✅ |
| Announcement bar visible | ✅ |
| Hero section visible | ✅ |
| Shop Now CTA visible | ✅ |
| All category items visible | ✅ |
| Category navigation works | ✅ |
| Product cards visible | ✅ |
| Minimum products displayed | ✅ |
| Footer visible | ✅ |

---

# Browser Testing Status

| Browser | Result |
|----------|---------|
| Chromium | ✅ Passed |
| Firefox | ⚠️ Flaky locator issue observed |
| Webkit | 🔄 Pending |

Notes:

Firefox showed inconsistent visibility behavior during category navigation testing.


---

#  Bugs / Observations Found

### Issue:

Category navigation occasionally fails in Firefox.

### Expected:

User should navigate to selected category page.

### Actual:

Locator visibility issue occurs.

### Possible Cause:

Browser-specific rendering or timing issue.

Status:

Investigating

---

#  Run Project Locally

Install dependencies:

```bash
npm install
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run with browser:

```bash
npx playwright test --headed
```

Run UI mode:

```bash
npx playwright test --ui
```

Run specific test:

```bash
npx playwright test tests/home/home.spec.js
```

View HTML report:

```bash
npx playwright show-report
```

---

#  Upcoming Test Modules

Planned automation:

- Login Testing
- Signup Testing
- Search Functionality
- Cart Testing
- Wishlist Testing
- Checkout Flow
- Profile Testing
- API Testing
- Page Object Model (POM)

---

#  Purpose of This Repository

This repository is being built as a **QA Automation portfolio project** while testing a real ecommerce application using Playwright.

Focus:

- Practical QA skills
- Automation workflows
- Bug thinking
- Interview preparation
- Production-like testing structure
