# Portfolio Project - AI Coding Instructions

## Architecture Overview

This is a single-page React portfolio application with no routing. All sections are rendered sequentially in [src/App.js](../src/App.js) as direct component imports. Navigation uses `react-scroll` for smooth scrolling to section anchors, not React Router.

**Component structure:**

- `NavBar` - Fixed header with smooth scroll links
- `Home` - Hero section with intro and CTA
- `SocialLinks` - Fixed sidebar with external links (LinkedIn, GitHub, Resume, Email)
- `About` - About section
- `Portfolio` - Project showcase grid
- `Experience` - Tech stack display
- `Contacts` - Contact form

## Styling System

**Tailwind-first approach:** Use utility classes exclusively. No separate CSS modules or styled-components.

**Design tokens (use consistently):**

- Primary gradient: `from-cyan-500 via-blue-500 to-purple-500`
- Background: `bg-gradient-to-b from-black via-black to-gray-800`
- Glassmorphism: `backdrop-blur-md bg-black/30 border border-white/10`
- Hover effects: `hover:scale-105 transition-all duration-300`

**Custom animations** in [tailwind.config.js](../tailwind.config.js):

- `animate-float` - Floating effect (3s ease-in-out)
- `animate-shine` - Shimmer effect (1.5s)
- `animate-pulse-slow` - Slow pulse (6s)
- `animate-border-glow` - Border glow effect (2s)

**Font families:**

- `font-signature` - Grey Qo (for logo/signature text)
- `font-poppins` - Raleway (body text)

## Component Patterns

**Data-driven rendering:** All content sections use array mapping:

```jsx
const items = [
  { id: 1, name: "Item", href: "...", style: "..." },
  // ...
];

return (
  <div>
    {items.map((item) => (
      <div key={item.id}>{/* Render item */}</div>
    ))}
  </div>
);
```

**Section structure:** Each section component follows this pattern:

- Container: `name="sectionName"` attribute for scroll targeting
- Max-width wrapper: `max-w-screen-lg mx-auto`
- Title with underline: `border-b-4 border-gray-500 inline`
- Grid layout for content: `grid sm:grid-cols-2 md:grid-cols-3`

## Navigation & Links

**Internal navigation:** Use `react-scroll`'s `<Link>` component:

```jsx
import { Link } from "react-scroll";

<Link to="portfolio" smooth duration={500}>
  Portfolio
</Link>;
```

**Section names:** Must match between NavBar links and section `name` attributes:

- "home", "about", "portfolio", "experience", "contact"

**External links:** Standard `<a>` tags with `target="_blank"` and `rel="noreferrer"`

## Icons & Assets

**Icons:** Use `react-icons` library. Common patterns:

- `FaBars`, `FaTimes` - Menu icons
- `FaGithub`, `FaLinkedinIn` - Social icons
- `HiOutlineMail`, `BsFillPersonLinesFill` - Contact icons
- `MdKeyboardDoubleArrowRight` - CTA arrows

**Images:**

- Portfolio project images: `src/assets/portfolio/`
- Tech stack icons: `src/assets/` (html.png, css.png, react.png, etc.)
- Profile picture: `src/assets/Img.jpg`

Import with: `import imageName from "../assets/folder/file.png"`

## Development Workflow

**Start dev server:** `npm start` (opens localhost:3000)
**Production build:** `npm run build` (outputs to build/)
**No testing setup:** Test scripts exist but no tests implemented

**Common tasks:**

- Add portfolio item: Update `portfolios` array in [src/Components/Portfolio.jsx](../src/Components/Portfolio.jsx), add image to `src/assets/portfolio/`
- Add tech skill: Update `experiences` array in [src/Components/Experience.jsx](../src/Components/Experience.jsx), add icon to `src/assets/`
- Modify gradient colors: Update in multiple places for consistency (NavBar, Home, Portfolio section backgrounds)

## State & Interactivity

**Minimal state usage:** Only `useState` for toggling mobile menu in NavBar:

```jsx
const [nav, setNav] = useState(false);
```

**No other state management needed** - all data is static arrays within components.

## Responsive Design

**Mobile-first breakpoints:**

- Mobile: Default styles
- Tablet: `md:` prefix (768px+)
- Desktop: `lg:` prefix (1024px+)

**Mobile menu:** Hamburger icon reveals full-screen overlay menu on small screens, hidden on `md:` and above.

**Common responsive patterns:**

- `flex-col md:flex-row` - Stack mobile, row desktop
- `hidden md:flex` - Hide mobile, show desktop
- `w-2/3 md:w-full` - Responsive sizing

## Key Files

- [src/App.js](../src/App.js) - Main component orchestration
- [src/Components/NavBar.jsx](../src/Components/NavBar.jsx) - Navigation with mobile menu
- [tailwind.config.js](../tailwind.config.js) - Custom animations and colors
- [src/index.css](../src/index.css) - Font imports and Tailwind directives
- [package.json](../package.json) - Dependencies (react-scroll, react-icons, tailwindcss)
