# React Todos App

A modern, type-safe React application for managing todos built with TypeScript, Vite, and modern styling solutions. The app integrates with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/todos) to provide a full-featured todo management system with real-time data.

## 🚀 Tech Stack

### Core Technologies

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast development server and build tool
- **Stylus** - Global app styling with powerful CSS preprocessing
- **Styled Components** - Component-level styling with CSS-in-JS
- **Vitest** - Fast unit testing with jsdom for DOM testing
- **ESLint** - Code linting and quality enforcement
- **Prettier** - Code formatting for consistency

### State Management

- **React Context API** - For shared state across components
- **React Hooks** - useState, useReducer for local state management
- **Custom Hooks** - For reusable state logic (useTodos for API integration)
- **Optimistic Updates** - For better user experience

## 📁 Project Structure

```
react-todos/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx     # Styled button component with variants
│   │   ├── Input.tsx      # Form input component with validation
│   │   └── TodoItem.tsx   # Individual todo item with CRUD operations
│   ├── pages/             # Page-level components
│   │   └── TodoPage.tsx   # Main todos page with filtering and management
│   ├── hooks/             # Custom React hooks
│   │   └── useTodos.ts    # Todo state management and API integration
│   ├── services/          # API service layer
│   │   └── todoService.ts # JSONPlaceholder API integration
│   ├── types/             # TypeScript type definitions
│   │   └── todo.ts        # Todo-related interfaces and types
│   ├── styles/            # Global Stylus styles
│   │   └── global.styl    # App-wide styling and design tokens
│   ├── __tests__/         # All test files
│   │   ├── setup.ts       # Test environment configuration
│   │   └── App.test.tsx   # Component tests
│   ├── assets/            # Static assets (images, icons)
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global CSS
├── .cursorrules           # Cursor IDE rules
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── vitest.config.ts       # Vitest configuration
├── .prettierrc            # Prettier configuration
└── eslint.config.js       # ESLint configuration
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd react-todos

# Install dependencies
yarn install
```

### Development

```bash
# Start development server
yarn dev
```

### Building

```bash
# Build for production
yarn build
```

### Testing

```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test:watch
```

### Code Quality

```bash
# Lint code
yarn lint

# Format code
yarn format
```

## 🎨 Styling Architecture

### Global Styling (Stylus)

- Located in `src/styles/`
- Used for app-wide styles, themes, and design tokens
- Follows BEM methodology for class naming
- Supports CSS custom properties for theming
- **Modern CSS Reset** for cross-browser consistency
- **Accessibility-focused styling** with `:focus-visible`

### Component Styling (Styled Components)

- Component-specific styles using CSS-in-JS
- TypeScript support for styled-component props
- Consistent design tokens through theme provider
- Scoped styling to prevent conflicts
- **Form element consistency** with `font-family: inherit`
- **Proper focus management** for accessibility
- **Enhanced disabled states** for better UX
- **Responsive design system** with mobile-first approach
- **Modern design patterns** with gradients and micro-interactions

## 🚀 App Features

### Todo Management

- ✅ **View all todos** from JSONPlaceholder API
- ✅ **Add new todos** with form validation
- ✅ **Edit todo titles** inline with real-time updates
- ✅ **Toggle completion status** with optimistic updates
- ✅ **Delete todos** with confirmation
- ✅ **Real-time statistics** (completed vs pending)

### Filtering & Search

- ✅ **Filter by status** (All/Pending/Completed)
- ✅ **Filter by user ID** (dynamically populated)
- ✅ **Search todos** by title with real-time filtering
- ✅ **Clear filters** to reset to default view

### User Experience

- ✅ **Loading states** for all async operations
- ✅ **Error handling** with user-friendly messages
- ✅ **Responsive design** for all screen sizes
- ✅ **Optimistic updates** for better performance
- ✅ **Empty states** when no todos match filters

### Accessibility & Styling

- ✅ **Modern CSS Reset** for cross-browser consistency
- ✅ **Keyboard navigation** with proper focus indicators
- ✅ **Reduced motion support** for users with vestibular disorders
- ✅ **Consistent typography** with proper heading hierarchy
- ✅ **Enhanced form elements** with better UX
- ✅ **Custom scrollbar styling** for visual consistency

### Responsive Design

- ✅ **Mobile-first approach** with progressive enhancement
- ✅ **Breakpoint system** for all device sizes (Mobile, Tablet, Desktop, Wide)
- ✅ **Flexible layouts** using CSS Grid and Flexbox
- ✅ **Touch-friendly interactions** for mobile devices
- ✅ **Optimized typography** that scales across screen sizes
- ✅ **Consistent spacing** using design token system

## 🧪 Testing Strategy

### Test Organization

- All tests located in `src/__tests__/`
- Mirrors source directory structure
- Uses Vitest with jsdom for DOM testing
- React Testing Library for component testing

### Testing Guidelines

- Unit tests for all components
- Integration tests for user workflows
- Mock external dependencies
- Test accessibility features
- Ensure proper error handling

## 📝 Code Quality Standards

### TypeScript

- Strict mode enabled
- Proper type definitions for all components
- Interface-first development approach
- Avoid `any` type usage

### ESLint & Prettier

- Consistent code formatting
- Enforced coding standards
- Automatic formatting on save
- Pre-commit hooks for quality assurance

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)

- Strict type checking enabled
- Modern ES features support
- Path mapping for clean imports
- React JSX support

### Vite (`vite.config.ts`)

- Fast development server
- Hot module replacement
- Optimized production builds
- Plugin support for React and TypeScript

### ESLint (`eslint.config.js`)

- React-specific rules
- TypeScript integration
- Accessibility guidelines
- Performance best practices

## 🚀 Development Workflow

1. **Component Development**
   - Create TypeScript interfaces with type-only imports
   - Implement component logic with proper error handling
   - Add styled-components styling with consistent design tokens
   - Implement responsive design with mobile-first approach
   - Add micro-interactions and hover effects for better UX
   - Write comprehensive tests with React Testing Library

2. **State Management**
   - Use local state for component-specific data
   - Implement custom hooks for complex API logic (useTodos)
   - Handle async operations with loading and error states
   - Implement optimistic updates for better UX

3. **Design System Implementation**
   - Use consistent design tokens for spacing, typography, and colors
   - Implement responsive breakpoints for all device sizes
   - Follow accessibility guidelines with proper focus management
   - Add smooth animations and transitions for better user experience

4. **API Integration**
   - Create service classes for API calls (todoService)
   - Use TypeScript interfaces for request/response types
   - Implement proper error handling and retry logic
   - Follow RESTful conventions for endpoints

5. **Testing**
   - Write tests alongside component development
   - Test user interactions and edge cases
   - Ensure accessibility compliance
   - Mock API calls for isolated testing

## 📦 Key Dependencies

### Production Dependencies

- `react` - React library
- `react-dom` - React DOM rendering
- `styled-components` - CSS-in-JS styling
- `stylus` - CSS preprocessor

### Development Dependencies

- `typescript` - Type safety
- `vite` - Build tool and dev server
- `vitest` - Testing framework
- `jsdom` - DOM testing environment
- `@testing-library/react` - React testing utilities
- `eslint` - Code linting
- `prettier` - Code formatting

## 🔌 API Integration

### JSONPlaceholder API

The app integrates with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/todos) which provides:

- **200 sample todos** across 10 users
- **Full CRUD operations** (GET, POST, PUT, PATCH, DELETE)
- **RESTful endpoints** for development and testing
- **Real-time data** for todo management

### Service Architecture

- **`todoService.ts`** - Centralized API service layer
- **Type-safe interfaces** for all API interactions
- **Error handling** with proper HTTP status codes
- **Loading states** for better user experience
- **Optimistic updates** for immediate UI feedback

## 🎨 CSS Reset & Accessibility

### Modern CSS Reset Implementation

- **Comprehensive reset** in `src/styles/global.styl`
- **Box-sizing normalization** for consistent layouts
- **Form element resets** (button, input, select, textarea)
- **Typography improvements** with better font rendering
- **Reduced motion support** for accessibility

### Accessibility Features

- **`:focus-visible`** for keyboard navigation indicators
- **Proper focus outlines** with `outline-offset`
- **Mouse focus removal** with `:focus:not(:focus-visible)`
- **Color contrast compliance** for better readability
- **Screen reader friendly** markup and styling

### Enhanced Component Styling

- **Consistent form elements** with `font-family: inherit`
- **Improved focus management** across all interactive elements
- **Enhanced disabled states** for better user feedback
- **Custom scrollbar styling** for visual consistency
- **Typography system** with proper heading hierarchy

## 🎨 Design System

### Design Tokens

- **Spacing Scale**: xs (0.25rem) to xxl (3rem) for consistent margins and padding
- **Typography Scale**: xs (0.75rem) to 4xl (2.25rem) with proper font weights
- **Color Palette**: Semantic colors with gradients for primary actions
- **Border Radius**: sm (0.375rem) to xl (1rem) for consistent rounded corners
- **Shadows**: Multiple levels for depth and visual hierarchy

### Modern Design Patterns

- **Gradient backgrounds** for visual appeal and depth
- **Card-based layouts** with proper shadows and spacing
- **Status badges** with color-coded states (completed/pending)
- **Micro-interactions** with hover effects and subtle animations
- **Responsive breakpoints** for optimal viewing on all devices

### Component Architecture

- **Consistent sizing** across all interactive elements
- **Progressive enhancement** for different screen sizes
- **Accessibility-first** approach with proper focus management
- **Performance optimization** with efficient CSS and animations
- **Maintainable code** with clear component interfaces

## 🤝 Contributing

1. Follow the established code style and conventions
2. Write tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues, please refer to the project documentation or create an issue in the repository.
