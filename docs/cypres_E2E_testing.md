# Simplified E2E Testing with Cypress

This project currently uses a **simple E2E testing approach** focused on the core user journey.

## 🎯 **Basic Flow**

- **One test file**: `basic-app-flow.cy.ts`
- **Core user journey**: Home → People → Person Detail
- **2 simple commands**: `visitAndWait()` and `clickAndVerify()`
- **No API mocking**: Tests against real app behavior
- **Fast execution**: Runs in ~30 seconds

## 🚀 **Running Tests**

### **1. Start Development Server**

```bash
npm run dev
# or
quasar dev
```

### **2. Run E2E Test**

```bash
# Run in headless mode
npx cypress run --spec "cypress/e2e/basic-app-flow.cy.ts"

# Run with Cypress UI
npx cypress open
```

## 📋 **Test Coverage**

The single test covers:

1. **Home Page Load** - Verifies app starts correctly
2. **Navigation** - Clicks "People" link
3. **Data Display** - Confirms content loads
4. **Detail Navigation** - Clicks on first person
5. **Detail Page** - Verifies person detail page loads

## 🎯 **Philosophy**

### **"Happy Path Only"**

- Tests the main user flow that matters most
- No edge cases or error scenarios
- Simple, reliable selectors
- Fast feedback for developers

### **Benefits**

- ✅ **Easy to understand** - Anyone can read the test
- ✅ **Fast execution** - No complex setup or teardown
- ✅ **Reliable** - Uses simple, stable selectors
- ✅ **Maintainable** - Single file to update

## 📁 **File Structure**

```
cypress/
├── e2e/
│   ├── basic-app-flow.cy.ts     # Main test file
│   └── archive/                 # Old complex tests (preserved)
│       ├── navigation/
│       ├── entities/
│       └── features/
├── support/
│   └── commands.ts              # 2 simple commands
└── README.md                    # This file
```

## 🔧 **Custom Commands**

### **visitAndWait(url)**

```typescript
cy.visitAndWait('/')
// Visits page and waits for content to be visible
```

### **clickAndVerify(selector, expectedUrl)**

```typescript
cy.clickAndVerify('a[href="/people"]', '/people')
// Clicks element and verifies URL change
```

## 📝 **Example Test**

```typescript
describe('Star Wars App - Basic Flow', () => {
  it('should complete basic user journey', () => {
    // 1. Visit home page
    cy.visit('/')
    cy.contains('Star Wars').should('be.visible')

    // 2. Navigate to People page
    cy.contains('People').click()
    cy.url().should('include', '/people')

    // 3. Verify data loads
    cy.get('table, .q-card').should('be.visible')

    // 4. Click on first person
    cy.get('tbody tr:first a, .q-card:first a, [href*="/people/"]').first().click()

    // 5. Verify detail page
    cy.url().should('include', '/people/')
    cy.get('h1, h2').should('be.visible')
  })
})
```

## 🎯 **When to Use**

### **Perfect For:**

- ✅ Smoke testing after deployments
- ✅ Quick validation of core functionality
- ✅ CI/CD pipeline integration
- ✅ Developer confidence checks

### **Not Suitable For:**

- ❌ Comprehensive feature testing
- ❌ Edge case validation
- ❌ Performance testing
- ❌ Accessibility testing

---

**Simple, Fast, Reliable E2E Testing** 🚀
