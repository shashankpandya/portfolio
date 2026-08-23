---
name: plan
description: High Level planning for PR-based workflow
model: Claude Opus 4.6 (copilot)
---
# Plan: Add Light & Dark Mode Theme Switching

**TL;DR:** Implement theme switching with a toggle button in the NavBar that persists to localStorage. Use React Context API to manage theme state and conditional Tailwind classes to swap backgrounds (black ↔ white) and text colors (white ↔ gray-900) while keeping the cyan-blue-purple gradients. All 8 components will be updated to use theme-aware class conditionals.

## Steps

### 1. Create Theme Context

**File:** [src/context/ThemeContext.js](src/context/ThemeContext.js) — new file

- Define context to store `isDark` boolean state
- Add `toggleTheme()` function
- Initialize theme from localStorage on mount, default to dark mode
- Export `ThemeProvider` wrapper component and `useTheme` hook

### 2. Wrap App with ThemeProvider

**File:** [src/App.js](src/App.js)

- Import ThemeContext and ThemeProvider
- Wrap all components inside `<ThemeProvider>`

### 3. Update NavBar

**File:** [src/Components/NavBar.jsx](src/Components/NavBar.jsx)

- Import `useTheme` hook
- Add theme toggle button (sun/moon icon from react-icons) to the right of nav links
- Update all color classes with conditional logic:
  - `bg-black` → `${isDark ? 'bg-black' : 'bg-white'}`
  - `text-white` → `${isDark ? 'text-white' : 'text-gray-900'}`
  - `border-white/10` → `${isDark ? 'border-white/10' : 'border-gray-300/30'}`
  - Gradient logo remains `from-cyan-500 via-blue-500 to-purple-500`
- Toggle button should float right with sun/moon icons from `react-icons/fa`

### 4. Update Home

**File:** [src/Components/Home.jsx](src/Components/Home.jsx)

- Apply theme conditionals to:
  - Background: `from-black to-gray-800` ↔ `from-white to-gray-100`
  - Text colors: `text-white/60` ↔ `text-gray-600`
  - Keep gradient button (`from-cyan-500 to-blue-500`) unchanged
  - Adjust shadow on profile image for light mode

### 5. Update About

**File:** [src/Components/About.jsx](src/Components/About.jsx)

- Background gradient: `from-gray-800 to-black` ↔ `from-gray-100 to-white`
- Text: `text-white` ↔ `text-gray-900`
- Border: `border-gray-500` ↔ `border-gray-400`

### 6. Update Portfolio

**File:** [src/Components/Portfolio.jsx](src/Components/Portfolio.jsx) — one of the more complex updates

- Background: `bg-black` ↔ `bg-white`
- Cards: `bg-gray-900` ↔ `bg-gray-50`
- Borders: `border-gray-800` ↔ `border-gray-300`
- Text: `text-white` ↔ `text-gray-900`
- Hover overlays: `bg-cyan-500/20` remains same (contrast isn't affected)
- Keep gradient buttons unchanged

### 7. Update Experience

**File:** [src/Components/Experience.jsx](src/Components/Experience.jsx) — most complex (40+ classes)

- Background: `bg-black` ↔ `bg-white`
- Card backgrounds: `bg-black/40` ↔ `bg-white/40`
- Text: `text-white` ↔ `text-gray-900`
- Border: `border-gray-600` ↔ `border-gray-400`
- Hover effects and shadows remain unchanged (colored shadows work on both)
- Floating animations continue unchanged

### 8. Update Contacts

**File:** [src/Components/Contacts.jsx](src/Components/Contacts.jsx)

- Background: `bg-black` ↔ `bg-white`
- Form input backgrounds: `bg-transparent` remains but adjust text/placeholder colors
- Text: `text-white` ↔ `text-gray-900`
- Focus border: `border-cyan-500` remains (good contrast on both)
- Button gradient remains unchanged

### 9. Update SocialLinks

**File:** [src/Components/SocialLinks.jsx](src/Components/SocialLinks.jsx)

- Background: `bg-black/80` ↔ `bg-white/80`
- Text: `text-white` ↔ `text-gray-900`
- Border: `border-r-4 border-cyan-500` remains unchanged
- Hover gradient effects remain unchanged

### 10. Add theme persistence

- In ThemeContext, save theme preference to localStorage on toggle
- On app load, restore from localStorage or use system preference as fallback

## Verification

- Toggle theme button visible in NavBar (sun/moon icon)
- All text readable in both modes (check contrast)
- Experience component with shadow effects displays correctly
- Portfolio cards visible and interact properly in both modes
- SocialLinks sidebar theme-aware while keeping position fixed
- Refresh page → theme persists from localStorage
- Gradients (cyan-blue-purple) work well on both backgrounds

## Implementation Decisions

- **Architecture:** Context API instead of Redux (minimal, appropriate for single boolean state)
- **Color mapping:** White/gray-50/100 for light backgrounds, gray-900/700 for light text
- **Gradients:** Keep unchanged — cyan-blue-purple has sufficient contrast on light backgrounds
- **Component strategy:** Conditional render classes (`${isDark ? 'classA' : 'classB'}`) vs Tailwind dark: prefix — using conditionals for clarity over all files
- **Storage:** localStorage without system preference detection initially (can be added later)
