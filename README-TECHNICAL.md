# React Todos App – Technical Developer Guide

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Tech Stack](#tech-stack)
4. [Design System & Styling](#design-system--styling)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Custom Hooks](#custom-hooks)
8. [Component Architecture](#component-architecture)
9. [Testing Strategy](#testing-strategy)
10. [Best Practices & Guidelines](#best-practices--guidelines)
11. [Accessibility](#accessibility)
12. [Performance](#performance)
13. [Error Handling](#error-handling)
14. [Extending the App](#extending-the-app)

---

## Project Overview

A modern, fully responsive React Todos application built with TypeScript, Vite, and a robust design system. The app demonstrates best practices in component architecture, state management, API integration, accessibility, and testing.

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Styled button component with variants
│   ├── Input.tsx       # Form input component with validation
│   └── TodoItem.tsx    # Individual todo item with CRUD operations
├── pages/              # Page-level components
│   └── TodoPage.tsx    # Main todos page with filtering and management
├── hooks/              # Custom React hooks
│   └── useTodos.ts     # Todo state management and API integration
├── services/           # API service layer
│   └── todoService.ts  # JSONPlaceholder API integration
├── types/              # TypeScript type definitions
│   └── todo.ts         # Todo-related interfaces and types
├── styles/             # Global Stylus styles
│   └── global.styl     # App-wide styling and design tokens
├── __tests__/          # All test files
│   ├── setup.ts        # Test environment configuration
│   └── App.test.tsx    # Component tests
└── assets/             # Static assets
```

### Directory Purpose

- **components/**: All reusable, styled UI components. Each is self-contained and uses styled-components for local styles.
- **pages/**: Page-level containers that compose components and manage layout.
- **hooks/**: Custom hooks for encapsulating logic (e.g., API, state, effects).
- **services/**: API abstraction layer for all network requests.
- **types/**: TypeScript interfaces and types for strong typing across the app.
- **styles/**: Global Stylus files for resets, design tokens, and base styles.
- ****tests**/**: All unit and integration tests, mirroring the source structure.
- **assets/**: Static files (e.g., SVGs, images).

---

## Tech Stack

- **React 19** (functional components, hooks)
- **TypeScript** (strict mode, type-only imports)
- **Vite** (fast dev/build)
- **Stylus** (global styles, design tokens)
- **styled-components** (component-level styling)
- **Vitest** + **jsdom** (unit/component testing)
- **ESLint** + **Prettier** (code quality)

---

## Design System & Styling

### Global Styling

- **Stylus** in `src/styles/global.styl` for resets, tokens, and base styles.
- **CSS Custom Properties** for colors, spacing, typography, radii, and shadows.
- **Modern CSS Reset** for cross-browser consistency.
- **BEM methodology** for class naming in global styles.

### Component Styling

- **styled-components** for local, themeable, and dynamic styles.
- **Design tokens** imported as JS objects for consistency.
- **Responsive breakpoints**: Mobile (480px), Tablet (768px), Desktop (1024px), Wide (1200px).
- **Card-based layouts**, gradient backgrounds, and micro-interactions.

### Example: Design Tokens

```js
const tokens = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  borderRadius: { sm: '0.375rem', md: '0.5rem', lg: '0.75rem', xl: '1rem' },
  shadows: {
    sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
  },
};
```

---

## State Management

- **No Redux**: Uses React's built-in state (`useState`, `useReducer`, Context API).
- **Local state** for component-specific data.
- **Custom hooks** (e.g., `useTodos`) for shared/complex logic.
- **Context** only if state must be shared deeply.
- **Async operations** handled with loading and error states.

---

## API Integration

- **Service Layer**: All API calls in `services/todoService.ts`.
- **JSONPlaceholder API** for todos (GET, POST, PUT, PATCH, DELETE).
- **TypeScript interfaces** for all request/response types.
- **Error handling**: Try/catch, user feedback, and logging.
- **Optimistic updates**: UI updates before server confirmation for better UX.

---

## Custom Hooks

### `useTodos`

- Encapsulates all todo state, API calls, and logic.
- Returns todos, loading, error, and CRUD/filter methods.
- Handles filtering, searching, and refreshing todos.
- Provides a single source of truth for todo data.

---

## Component Architecture

### Main Hierarchy

- **App → TodoPage → TodoItem**

### Key Components

- **Button**: Reusable, styled, supports variants (primary, secondary, etc.), sizes, and disabled states.
- **Input**: Reusable, styled, supports validation, error display, and accessibility.
- **TodoItem**: Displays a single todo, supports edit, delete, toggle, and status badge.
- **TodoPage**: Main page, manages layout, filters, add form, and todo list.

### Component Best Practices

- **Functional components** only.
- **TypeScript interfaces** for all props.
- **Styled-components** for local styles.
- **Design tokens** for all spacing, colors, and typography.
- **Responsive**: All components adapt to breakpoints.
- **Accessibility**: Proper ARIA, focus management, and keyboard navigation.

---

## Testing Strategy

- **Vitest** with **jsdom** for DOM testing.
- **React Testing Library** for user-centric tests.
- **All tests in `src/__tests__/`**, mirroring source structure.
- **Unit tests** for all components and hooks.
- **Integration tests** for workflows (e.g., add/edit/delete todo).
- **Mock API/service layer** for isolation.
- **Accessibility tests** for focus, keyboard, and ARIA.

---

## Best Practices & Guidelines

- **TypeScript strict mode**: No `any`, always type props and state.
- **Type-only imports**: For interfaces/types (with `verbatimModuleSyntax`).
- **Named exports**: For all components and hooks.
- **Absolute imports**: For maintainability.
- **Consistent naming**: PascalCase for components, camelCase for hooks/utilities.
- **No prop drilling**: Use hooks/context for shared state.
- **No Redux**: Use React state and hooks.
- **Optimistic UI**: For better perceived performance.
- **Error boundaries**: For catching component errors.
- **Meaningful commit messages**: Use conventional commits.

---

## Accessibility

- **Semantic HTML**: Use correct elements for structure.
- **ARIA attributes**: For dynamic/interactable elements.
- **Keyboard navigation**: All interactive elements are focusable.
- **:focus-visible**: For clear keyboard focus indication.
- **Color contrast**: Meets WCAG AA standards.
- **Screen reader**: All forms and buttons are labeled.

---

## Performance

- **React.memo**: For expensive components.
- **useCallback/useMemo**: For stable references and memoization.
- **Lazy loading**: For large components/pages.
- **Efficient CSS**: Use design tokens and avoid deep selectors.
- **Minimal re-renders**: Proper dependency arrays in hooks.

---

## Error Handling

- **Error boundaries**: For component errors.
- **User feedback**: Friendly error messages in UI.
- **API errors**: Caught and displayed, not swallowed.
- **Logging**: Console for dev, extendable for production.

---

## Extending the App

- **Add new features**: Create new components/hooks in their respective folders.
- **Follow design system**: Use tokens and breakpoints.
- **Write tests**: For all new features.
- **Update types**: In `types/` for new data models.
- **Document**: Update this file and README for new features.

---

## Further Reading

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Styled Components](https://styled-components.com/docs)
- [Vitest Docs](https://vitest.dev/)
- [Accessibility (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
