# VELOR E-Commerce — QA Automation Suite

End-to-End test suite for a real-world React e-commerce application, built with Playwright and JavaScript.

**Live App:** https://fashion-commerce-nine.vercel.app/home

---

## Project Structure

```
ecom-automation/
├── tests/
│   ├── home/
│   │   └── home.spec.js
│   ├── auth/
│   │   ├── login.spec.js
│   │   ├── register.spec.js
│   │   └── logout.spec.js
│   ├── products/
│   │   └── productDetail.spec.js
│   └── cart/
│       └── cart.spec.js
├── utils/
│   └── helpers.js
├── playwright.config.js
└── README.md
```

---

## Test Coverage

### Home Page

| Test Case                        | Status |
| -------------------------------- | ------ |
| Page load and URL validation     | ✅     |
| Navbar and brand logo visibility | ✅     |
| Announcement bar with offer code | ✅     |
| Hero section and CTA button      | ✅     |
| All 8 category links visible     | ✅     |
| Category navigation on click     | ✅     |
| Product cards visible (min 4)    | ✅     |
| Footer visibility                | ✅     |

### Auth — Login

| Test Case                           | Status |
| ----------------------------------- | ------ |
| Login page load                     | ✅     |
| Email and password field visibility | ✅     |
| Sign In button visibility           | ✅     |
| Error on invalid credentials        | ✅     |
| Empty form validation               | ✅     |
| Successful login and redirect       | ✅     |
| Navigation to Register              | ✅     |

### Auth — Register

| Test Case                         | Status |
| --------------------------------- | ------ |
| Register page load                | ✅     |
| Full name, email, password fields | ✅     |
| Join MyStore button visibility    | ✅     |
| Empty form validation             | ✅     |
| Short password validation         | ✅     |
| Successful registration           | ✅     |
| Navigation to Login               | ✅     |

### Auth — Logout

| Test Case                      | Status |
| ------------------------------ | ------ |
| Logout redirects to login/home | ✅     |

### Product Detail

| Test Case                          | Status |
| ---------------------------------- | ------ |
| Dynamic navigation from collection | ✅     |
| Product name in h1                 | ✅     |
| Category label and description     | ✅     |
| Size options S, M, L, XL           | ✅     |
| Size selection on click            | ✅     |
| Default quantity is 1              | ✅     |
| Quantity increase on plus click    | ✅     |
| Quantity does not go below 1       | ✅     |
| ADD TO CART button visible         | ✅     |
| Product added to cart after login  | ✅     |

### Cart

| Test Case                         | Status |
| --------------------------------- | ------ |
| Cart page load                    | ✅     |
| Shopping Bag heading              | ✅     |
| Product visible in cart after add | ✅     |
| Order Summary section             | ✅     |
| Subtotal, Shipping FREE, Total    | ✅     |
| Secure Checkout button            | ✅     |
| Continue Shopping button          | ✅     |
| Quantity increase in cart         | ✅     |
| Remove item from cart             | ✅     |
| Continue Shopping navigation      | ✅     |

---

## Test Execution Summary

- Total Automated Tests: 79
- Passed: 74
- Failed: 5
- Framework: Playwright
- Language: JavaScript
- Target Application: React E-Commerce Platform
- Browser Coverage: Chromium

### Areas Covered

- Authentication Flow (Login, Register, Logout)
- Home Page Validation
- Product Detail Validation
- Cart Functionality
- Search Functionality
- Navbar Navigation
- UI Validation
- Functional Testing

### Known Limitations

Some tests are intentionally retained for demonstrating defect identification and reporting capabilities. These failures highlight locator ambiguity, UI synchronization challenges, and edge-case validation scenarios commonly encountered during real-world QA automation projects.

## Known Issues

The application currently contains a few functional and UI-related issues identified during automation testing:

- Cart badge count does not update reliably after product addition.
- Quantity decrement validation requires further investigation.
- Some cart summary locators return multiple matching elements, causing strict mode failures.

These failures are documented intentionally as part of the QA process and demonstrate defect identification capabilities rather than test implementation issues.

## Browser Coverage

| Browser  | Status  |
| -------- | ------- |
| Chromium | ✅ Pass |
| Firefox  | ✅ Pass |

---

## Setup

```bash
git clone https://github.com/Deepak-thakur-321/Ecom-Automation.git
cd ecom-automation
npm install
npx playwright install
```

## Run Tests

```bash
# All tests
npx playwright test

# Headed mode (browser visible)
npx playwright test --headed

# Specific file
npx playwright test tests/cart/cart.spec.js

# Specific browser
npx playwright test --project=chromium

# HTML report
npx playwright show-report
```
