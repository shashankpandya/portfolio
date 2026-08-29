```markdown
# portfolio Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `portfolio` JavaScript repository. It covers file naming, import/export styles, commit message habits, and testing patterns. While no specific framework is used, the repository demonstrates clear organizational and coding standards suitable for small to medium JavaScript projects.

## Coding Conventions

### File Naming
- **PascalCase** is used for file names.
  - Example: `MyComponent.js`, `UserProfile.js`

### Import Style
- **Relative imports** are used to reference local modules.
  ```javascript
  import { MyComponent } from './MyComponent';
  ```

### Export Style
- **Named exports** are preferred.
  ```javascript
  // MyComponent.js
  export function MyComponent() { /* ... */ }
  ```

### Commit Patterns
- Commit messages are freeform, sometimes with prefixes.
- Average commit message length: 71 characters.
  - Example: `Add new About section with contact info`

## Workflows

### Adding a New Component
**Trigger:** When you need to create a new UI or logic component.
**Command:** `/add-component`

1. Create a new file in PascalCase (e.g., `NewFeature.js`).
2. Use named exports for your component or function.
   ```javascript
   export function NewFeature() { /* ... */ }
   ```
3. Import the component where needed using a relative path.
   ```javascript
   import { NewFeature } from './NewFeature';
   ```
4. Commit your changes with a clear, descriptive message.

### Writing and Running Tests
**Trigger:** When you add or modify functionality that requires testing.
**Command:** `/run-tests`

1. Create a test file matching the pattern `*.test.*` (e.g., `NewFeature.test.js`).
2. Write your tests using your preferred testing framework (not specified).
3. Run your tests using the appropriate command for your setup (e.g., `npm test`).
4. Review and fix any failing tests before committing.

## Testing Patterns

- Test files follow the pattern: `*.test.*`
  - Example: `UserProfile.test.js`
- The specific testing framework is not detected; use your team's standard.
- Place tests alongside or near the files they test for clarity.

## Commands
| Command         | Purpose                                 |
|-----------------|-----------------------------------------|
| /add-component  | Scaffold and add a new component        |
| /run-tests      | Run all test files matching `*.test.*`  |
```