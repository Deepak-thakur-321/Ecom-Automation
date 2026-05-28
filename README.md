#  VELOR E-Commerce QA Automation Suite

End-to-End automation testing project built using **Playwright + JavaScript** on a real-world React ecommerce application.

## 🔗 Application Under Test

VELOR Fashion Commerce
https://fashion-commerce-nine.vercel.app/home

---

# Tech Stack

* Playwright
* JavaScript
* Node.js

---

#  Project Structure

```txt
ecom-automation/

├── tests/
│   ├── home/
│   │   └── home.spec.js
│   └── auth/
│       ├── login.spec.js
│       └── register.spec.js

├── docs/
│   └── notes.md

├── playwright.config.js
├── package.json
└── README.md
```

---

#  Test Coverage

## Home Page

* Homepage load validation
* Navbar visibility
* Hero section validation
* CTA button validation
* Category visibility
* Category navigation
* Product card validation
* Footer validation

## Login Page

* Login page load
* Input field visibility
* Empty form validation
* Invalid credentials validation
* Successful login
* Register page navigation

## Register Page

* Register page load
* Input field visibility
* Empty form validation
* Short password validation
* Successful registration
* Login page navigation

---

#  Browser Testing

| Browser  | Status                          |
| -------- | ------------------------------- |
| Chromium | ✅                               |
| Firefox  | ⚠️ Flaky locator issue observed |
| Webkit   | 🔄 Pending                      |

---

#  Known Issue

Firefox occasionally shows locator visibility issues during category navigation testing.

---

#  Run Locally

```bash
npm install
npx playwright install
```

Run tests:

```bash
npx playwright test
```

Run UI mode:

```bash
npx playwright test --ui
```

Run specific file:

```bash
npx playwright test tests/auth/login.spec.js
```

View report:

```bash
npx playwright show-report
```

---

#  Upcoming Modules

* Cart Testing
* Search Testing
* Wishlist Testing
* Checkout Flow
* API Testing
* Page Object Model (POM)

---

#  Purpose

This repository is being built as a QA Automation portfolio project focused on practical ecommerce testing workflows, automation skills, debugging, and real-world QA scenarios.
