# React Todos App

A modern, type-safe React application for managing todos built with TypeScript, Vite, and modern styling solutions.

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
- **Custom Hooks** - For reusable state logic

## 📁 Project Structure

```
react-todos/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page-level components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── styles/            # Global Stylus styles
│   ├── __tests__/         # All test files
│   ├── assets/            # Static assets (images, icons)
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global CSS
├── .cursorrules           # Cursor IDE rules
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
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

### Component Styling (Styled Components)

- Component-specific styles using CSS-in-JS
- TypeScript support for styled-component props
- Consistent design tokens through theme provider
- Scoped styling to prevent conflicts

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

   - Create TypeScript interfaces
   - Implement component logic
   - Add styled-components styling
   - Write comprehensive tests

2. **State Management**

   - Use local state for component-specific data
   - Implement Context API for shared state
   - Create custom hooks for complex logic
   - Avoid prop drilling

3. **Testing**
   - Write tests alongside component development
   - Test user interactions and edge cases
   - Ensure accessibility compliance
   - Mock external dependencies

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

## 🤝 Contributing

1. Follow the established code style and conventions
2. Write tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues, please refer to the project documentation or create an issue in the repository.
