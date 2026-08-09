# UltimateHealth Web Development — PR & Contribution Guidelines

Welcome! This document outlines the Pull Request (PR) process, code quality standards, and design aesthetics for the **UltimateHealth Web** codebase on the `web` branch. 

Adhering to these guidelines ensures a premium, high-performance, and unified user experience across the web application.

---

## 1. Branching & PR Workflow

### Branch Naming Conventions
Always create feature/bugfix branches off the `web` branch using the following prefixes:
- `feat/web-<feature-name>` — For new web features
- `fix/web-<bug-name>` — For bug fixes on the web app
- `docs/web-<topic>` — For documentation updates
- `refactor/web-<area>` — For code refactoring or cleaning

### Pull Request Target
* **Target Branch:** All PRs for the web application **must** target the `web` branch.
* **PR Title Format:** Use conventional commits format:
  - `feat(web): add responsive article grid`
  - `fix(web): correct light/dark theme transition lag`
  - `docs(web): update getting started instructions`

---

## 2. Design & Styling Standards

We aim to create an interface that feels **exceptionally premium, dynamic, and responsive**. Follow these design directives when writing components:

### Framework & Styling Technologies
- **Next.js & Tailwind CSS v4:** The application is built using Next.js (App Router) and Tailwind CSS v4. Always use Tailwind utility classes or Tailwind `@utility` rules in CSS files for styling.
- **Avoid Inline CSS-in-JS:** Do not write styles in React files using the legacy inline `styles = { body: ... }` pattern. Use Tailwind class names (`className="..."`) to ensure compatibility with Next.js Server Components, styling consistency, and smaller bundle sizes.
- **HSL/HEX Color Harmony:** Avoid standard/generic primary colors (like pure `#FF0000` or `#0000FF`). Use curated color systems configured in Tailwind/CSS variables (e.g., slate grays, deep emerald, indigo accents, and rich glassmorphism).
- **Dark Mode First:** Ensure all styling is fully compatible with sleek dark themes using Tailwind's `dark:` modifier or custom CSS selectors.
- **Glassmorphism:** For overlays, cards, and navigation bars, utilize premium backdrop-filter techniques. In Tailwind CSS v4, this can be written as:
  `bg-white/5 backdrop-blur-md border border-white/10`
  Or in vanilla CSS:
  ```css
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  ```

### Responsive & Fluid Layouts
- **Mobile First:** Ensure components adapt perfectly to all viewport sizes (Mobile, Tablet, Desktop) using Tailwind responsive modifiers (`sm:`, `md:`, `lg:`, `xl:`).
- **Animations:** Implement subtle, non-intrusive micro-animations (e.g., hover scaling, smooth color transitions, and fade-in states) using Tailwind transitions (`transition-all duration-300 ease-in-out`).

---

## 3. Technical & Code Quality Standards

### Next.js App Router & Server Components
- **Server/Client Components:** By default, components in Next.js are Server Components. Use `"use client";` at the top of files only when necessary (e.g., when using React hooks like `useState`, `useEffect`, or interactive elements like signature canvases and sliders).
- **File & Directory Structure:** 
  - Keep page routes inside `src/app/<route-name>/page.tsx`.
  - Place reusable visual components in `src/components/` rather than inline code.
  - Put non-visual utilities, constants, and custom hooks in `src/utils/`, `src/hooks/`, etc.

### TypeScript
- **Strong Typing:** Avoid the use of `any`. Explicitly define interfaces or types for all component props, hooks, and API structures.
- **Strict Null Checks:** Safely handle optional values or potential null states (e.g., user profiles or API response fields).

### SEO & Semantic HTML
To maintain high SEO rankings and excellent accessibility, every page must adhere to:
- **Heading Hierarchy:** Exactly one `<h1>` per page. Sub-headings must use sequential `<h2>`, `<h3>` tags.
- **Semantic Tags:** Use `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, and `<nav>` rather than generic nested `<div>`s.
- **Next.js Metadata:** Utilize Next.js static or dynamic metadata exports (`export const metadata: Metadata = { ... }`) to handle pages' `<title>` and `<meta name="description">` tags instead of manually inserting them in layout files.
- **Interactive Elements:** Ensure buttons, links, and input elements have explicit, descriptive `id` or `aria-label` properties.

---

## 4. Pull Request Checklist

Before submitting your Pull Request, verify that you have completed the following self-review steps:

### Code Review Checklist
- [ ] Code compiles with no TypeScript compiler errors or warnings.
- [ ] No placeholder assets or dummy copy remain in the UI.
- [ ] The console is free of React key warnings, console logs, or styling conflicts.

### UI & UX Verification
- [ ] The layout is fully responsive across different screen sizes.
- [ ] Dark and light mode colors are applied correctly with sufficient contrast.
- [ ] Hover states and micro-interactions are present and feel smooth.

### Git Hygiene
- [ ] The PR has a clean commit history (no redundant "fix typo" or "wip" commits).
- [ ] Unrelated files (e.g., mobile app assets or local development configs) are not included.
