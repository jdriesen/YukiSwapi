# Testing Guide

This document explains the testing approach for the YukiSwapi project, focusing on a simplified testing strategy for the PlanetCard component.

## Overview

We're using a **simple and focused testing approach** that prioritizes clarity and maintainability over exhaustive coverage. The tests focus on the core functionality of displaying planet information.

## Current Test: PlanetCard Component

### Location

- **Test file**: `test/unit/components/Cards/PlanetCard.simple.test.ts`
- **Component**: `src/components/Cards/PlanetCard.vue`

### What the Test Covers

The PlanetCard test focuses on **planets** and verifies:

1. ✅ **Component Rendering**: The component renders without errors
2. ✅ **Planet Name Display**: Shows the planet name correctly
3. ✅ **Basic Properties**: Displays climate, terrain, and gravity
4. ✅ **Unknown Values**: Handles missing/unknown data gracefully

### Test Philosophy

**Why Simple?**

- **Focused**: Tests only the essential functionality
- **Fast**: Runs quickly without complex setup
- **Maintainable**: Easy to understand and modify
- **Reliable**: Less prone to breaking due to minor changes

**What We Don't Test ATM:**

- Complex formatting functions (tested implicitly)
- Detailed styling and CSS classes
- Accessibility features
- Icon colors and positioning
- API integration (handled by E2E tests)

## How to Run Tests

### Basic Commands

```bash
# Run all tests once
npm run test:run

# Run tests in watch mode (recommended for development)
npm run test:watch

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run only the PlanetCard test
npm run test -- PlanetCard
```

### Development Workflow

1. **During development**: Use `npm run test:watch`
2. **Before committing**: Run `npm run test:run`
3. **For debugging**: Use `npm run test:ui`

## Test Structure

### Mock Data

```typescript
// Simple mock planet - just the essentials
const mockPlanet: Planet = {
  name: 'Tatooine',
  climate: 'arid',
  terrain: 'desert',
  population: '200000',
  // ... other required fields
}
```

### Test Cases

```typescript
describe('PlanetCard - Simple Tests', () => {
  it('renders the planet card component', () => {
    // Basic rendering test
  })

  it('displays the planet name', () => {
    // Name display test
  })

  it('displays basic planet properties', () => {
    // Properties display test
  })

  it('handles unknown values gracefully', () => {
    // Error handling test
  })
})
```

## Testing Tools & Setup

### Core Technologies

- **Vitest**: Fast test runner
- **Vue Test Utils**: Component testing utilities
- **Quasar**: UI framework testing support
- **Vue i18n**: Internationalization testing

### Configuration Files

- `vitest.config.ts`: Main test configuration
- `test/vitest/setup.ts`: Global test setup
- `test/helpers/mount-factory.ts`: Component mounting utilities

## Extending the Tests

### Adding New Test Cases

```typescript
it('displays orbital period correctly', () => {
  const wrapper = mountComponent(PlanetCard, {
    props: { planet: mockPlanet },
  })

  expect(wrapper.text()).toContain('304')
})
```

### Testing Other Components

Follow the same simple pattern:

1. Create basic mock data
2. Test rendering
3. Test key functionality
4. Test error handling

## Troubleshooting

### Common Issues

**Test fails with "Component not found"**

- Check import paths use `~/` alias
- Verify component exists in `src/components/`

**i18n translation errors**

- Mock translations are handled automatically
- Check `test/helpers/mount-factory.ts` for i18n setup

**Quasar component issues**

- Quasar is configured globally in test setup
- Use `.q-card`, `.q-icon` selectors for Quasar components

### Debug Tips

1. **Use `console.log(wrapper.html())`** to see rendered HTML
2. **Use `console.log(wrapper.text())`** to see text content
3. **Run single test**: `npm run test -- --run -t "specific test name"`

## Best Practices (IMHO)

### Do ✅

- Keep tests simple and focused
- Test user-visible behavior
- Use descriptive test names
- Mock only what's necessary

### Don't ❌

- Test implementation details
- Over-mock components
- Write overly complex assertions
- Test CSS styling in detail

## Coverage Goals

I aim for **practical coverage** rather than 100%:

- ✅ Core component functionality
- ✅ Error handling
- ✅ User interactions
- ❌ Edge cases that don't affect users
- ❌ Complex formatting details

---

**Remark**: My goal is confidence in my code, not perfect test coverage. Simple, focused tests that verify core functionality are more valuable than complex tests that are hard to maintain.
