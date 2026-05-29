# VELOR E-Commerce QA Automation Suite

End-to-End QA Automation project built using **Playwright + JavaScript** on a real-world React ecommerce application.

## Application Under Test

VELOR Fashion Commerce
https://fashion-commerce-nine.vercel.app/home

---

## Tech Stack

* Playwright
* JavaScript
* Node.js

---

## Project Structure

```txt
ecom-automation/

├── tests/
│   ├── home/
│   │   └── home.spec.js
│   │
│   ├── auth/
│   │   ├── login.spec.js
│   │   └── register.spec.js
│   │
│   └── cart/
│       └── cart.spec.js

├── docs/
│   └── notes.md

├── playwright.config.js
├── package.json
└── README.md
```

---

## Test Coverage

### Home Page

* Homepage load validation
* Navbar visibility
* Hero section validation
* CTA button validation
* Category visibility
* Category navigation
* Product card validation
* Footer validation

### Login Page

* Login page load
* Input field validation
* Empty form validation
* Invalid credentials validation
* Successful login
* Register page navigation

### Register Page

* Register page load
* Input field validation
* Empty form validation
* Short password validation
* Successful registration
* Login page navigation

### Cart Page

* Cart page load
* Shopping Bag visibility
* Product added to cart validation
* Order Summary validation
* Subtotal validation
* Shipping information validation
* Total amount validation
* Secure Checkout button validation
* Continue Shopping button validation
* Quantity increase validation
* Remove item from cart
* Navigation testing

---

## Browser Testing

| Browser  | Status                       |
| -------- | ---------------------------- |
| Chromium | ✅                            |
| Firefox  | ⚠️ Some flaky locator issues |
| Webkit   | 🔄 Pending                   |

---

## Run Locally

Install dependencies:

```bash
npm install
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run UI mode:

```bash
npx playwright test --ui
```

Run specific file:

```bash
npx playwright test tests/cart/cart.spec.js
```

View HTML report:

```bash
npx playwright show-report
```

---

## Purpose

This project is being built to practice real-world QA Automation workflows, debugging, browser testing, and ecommerce application testing using Playwright.
