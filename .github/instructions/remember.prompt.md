---
agent: agent
description: This prompt is used to save user input to a memory instruction file.
model: GPT-4o
---

# Portfolio Project - Context Memory

## Project Identity

This is a single-page React portfolio application for Shashank Pandya, built with Create React App, Tailwind CSS, and react-scroll for smooth navigation.

## Key Technical Decisions

### Why No React Router?

- Single-page design with smooth scroll navigation using `react-scroll` library
- All sections render in sequence in App.js
- Navigation anchors use `name` attributes, not routes

### Why Minimal State?

- All content is static data (no backend, no API calls)
- Only state needed: mobile menu toggle in NavBar
- Portfolio items, experience data, and links are hardcoded arrays

### Styling Philosophy

- 100% Tailwind utility classes - no CSS modules or styled-components
- Custom animations defined in tailwind.config.js (float, shine, pulse-slow, border-glow)
- Glassmorphism effects throughout: `backdrop-blur-md bg-black/30 border border-white/10`
- Consistent gradient: `from-cyan-500 via-blue-500 to-purple-500`

## Project Structure Rules

### Component Pattern

Every section follows:

1. Container with `name="sectionName"` for scroll targeting
2. Max-width wrapper: `max-w-screen-lg mx-auto`
3. Title with underline: `border-b-4 border-gray-500 inline`
4. Content mapped from data arrays with unique `id` keys

### Asset Organization

- Portfolio screenshots: `src/assets/portfolio/` (.jpeg, .png)
- Tech stack icons: `src/assets/` (html.png, css.png, etc.)
- Profile picture: `src/assets/Img.jpg`

### Icon Library Usage

- `react-icons` for all icons - never use image files for icons
- Import from specific packages: `react-icons/fa`, `react-icons/hi`, `react-icons/md`, `react-icons/bs`

## Data Structure Pattern

All interactive sections use this pattern:

```jsx
const items = [
  { id: 1, name: "...", href: "...", style: "..." },
  // ...
];

return (
  <div>
    {items.map((item) => (
      <div key={item.id}>{/* content */}</div>
    ))}
  </div>
);
```

## Section Names (MUST MATCH)

NavBar links must match section `name` props exactly:

- "home" ↔ Home component
- "about" ↔ About component
- "portfolio" ↔ Portfolio component
- "experience" ↔ Experience component
- "contact" ↔ Contacts component

## External Links

- LinkedIn: https://www.linkedin.com/in/shashank-pandya-213366287/
- GitHub: https://github.com/shashankpandya
- Email: pandyashashank1@gmail.com
- Resume: /resume.pdf (in public folder)

## Development Commands

- `npm start` - Dev server on localhost:3000
- `npm run build` - Production build to build/ folder
- No testing infrastructure (test scripts exist but unused)

## Common Modifications

### Adding Portfolio Item

1. Add image to `src/assets/portfolio/`
2. Import image in Portfolio.jsx
3. Add object to `portfolios` array with id, src, href, code

### Adding Tech Skill

1. Add icon to `src/assets/`
2. Import in Experience.jsx
3. Add object to `experiences` array with id, src, name, color styles

### Modifying Colors

Update consistently across:

- NavBar gradient (logo and glassmorphism)
- Home background gradient
- Portfolio section backgrounds
- SocialLinks hover effects
