# Contributing to UltimateHealth Frontend

Welcome to **UltimateHealth Web**! We are thrilled that you are interested in contributing to our modern web application.

This repository is actively migrating towards a Next.js (App Router), TypeScript, and Tailwind CSS v4 architecture to build a premium, highly interactive, and responsive healthcare platform.

Before you start writing code, please read this guide to understand our codebase structure, development workflow, and UI design standards.

---

## 🗺️ Finding Issues & Contribution Roadmap

If you are looking for tasks to work on, please check the [implementation_plan.md](/implementation_plan.md) in the root directory. It contains a hyper-granular migration roadmap consisting of **50 structured issues** broken down into:

- **Phase 1-2**: Core Infrastructure & Design System
- **Phase 3**: Landing Page Enhancements
- **Phase 4-5**: Article Hub (Discovery, Filters, Infinite Scroll, Comments)
- **Phase 6**: Authentication & OTP Verification
- **Phase 7**: User Profile & Personalization
- **Phase 8-9**: Admin Onboarding (Signature Canvas, Moderator Agreement) & Account Management

---

## 🛠️ Setting Up Your Development Environment

The frontend web project is entirely contained in the `/web` directory of the `web` branch.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` (or `yarn` / `pnpm` / `bun`) installed.

### Step-by-Step Setup

1. **Clone the repository and switch to the `web` branch**:
   ```bash
   git clone https://github.com/SB2318/UltimateHealth.git
   cd UltimateHealth
   git checkout web
   ```
2. **Navigate to the web project subdirectory**:
   ```bash
   cd web
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the local development server**:
   ```bash
   npm run dev
   ```
5. **Open the browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application running locally.

---

## Running Knip

Knip detects unused dependencies, exports, and files in the Next.js web app. From the repository root:

```bash
cd web
npm install
```

Run the following scripts as needed:

- `npm run knip` — check all (dependencies, exports, and files)
- `npm run knip:deps` — unused dependencies only
- `npm run knip:files` — unused files only

---

## 📁 Codebase Directory Structure

All frontend application code is placed in the `/web/src` folder. Please adhere to the following directory layout:

- **`src/app/`** — Next.js App Router folders, page components (`page.tsx`), and route layouts (`layout.tsx`).
- **`src/components/`** — Reusable layout and custom interface sections.
- **`src/components/ui/`** — Reusable, atomic design components. **Read the UI Component section below for details.**
- **`src/hooks/`** — Reusable custom React hooks.
- **`src/lib/`** — Context providers, state configurations, and external utility integrations.
- **`src/utils/`** — Helper utilities, api configurations, and general constants.

---

## 🎨 Reusing UI Components (`components/ui`)

To maintain UI consistency and avoid duplicate styling code, all basic, reusable visual components are located in:
👉 **[web/src/components/ui/](/web/src/components/ui)**

We have standard UI components preconfigured and styled with Tailwind CSS, including:

- **Form Controls:** `button.tsx`, `input.tsx`, `textarea.tsx`, `checkbox.tsx`, `switch.tsx`, `radio-group.tsx`, `select.tsx`, `input-otp.tsx`
- **Layout & Structure:** `card.tsx`, `accordion.tsx`, `collapsible.tsx`, `tabs.tsx`, `separator.tsx`, `aspect-ratio.tsx`, `scroll-area.tsx`, `resizable.tsx`
- **Feedback & Loaders:** `spinner.tsx`, `skeleton.tsx`, `progress.tsx`, `sonner.tsx` (toasts)
- **Overlays:** `dialog.tsx`, `sheet.tsx`, `drawer.tsx`, `alert-dialog.tsx`, `popover.tsx`, `hover-card.tsx`, `tooltip.tsx`, `dropdown-menu.tsx`, `context-menu.tsx`
- **Data Display:** `table.tsx`, `badge.tsx`, `avatar.tsx`, `carousel.tsx`, `chart.tsx`, `empty.tsx`
- **Navigation:** `navigation-menu.tsx`, `menubar.tsx`, `breadcrumb.tsx`, `pagination.tsx`

### Contribution Rules for UI Components:

1. ⚠️ **Do NOT re-implement standard UI elements** (like custom buttons, input inputs, or layout boxes) from scratch. Check if a component exists in `src/components/ui` first.
2. 🔄 **Reuse existing components** by importing them:
   ```tsx
   import { Button } from "@/components/ui/button";
   import {
     Card,
     CardHeader,
     CardTitle,
     CardContent,
   } from "@/components/ui/card";
   import { Input } from "@/components/ui/input";
   ```
3. 🛠️ **Extend rather than duplicate**: If an existing component lacks a variant or property that you need for your feature, modify/extend the existing component file inside `src/components/ui` rather than creating a separate custom file.

---

## 📋 Pull Request and Styling Guidelines

For detailed technical requirements, styling rules, and git commit guidelines, please **MUST refer to the following file**:
👉 **[PR_GUIDELINES.md](/PR_GUIDELINES.md)**

### Quick Highlights from the PR Guidelines:

- **Target Branch:** All PRs must target the `web` branch.
- **Branch Naming:** Use `feat/web-<name>` for new features, `fix/web-<name>` for bugs, or `refactor/web-<name>`.
- **Commits:** Follow conventional commits (e.g. `feat(web): add OTP verification modal`).
- **Styling:** Use Next.js + Tailwind CSS v4. Standardize on sleek dark-mode first design, curated HSL color schemes, smooth micro-animations, and glassmorphism.
- **Type Safety:** Ensure 100% strict type safety using TypeScript. The use of `any` is strictly prohibited.
- **SEO & Accessibility:** Follow semantic markup and provide proper heading hierarchy with explicit interactive identifiers (`id`, `aria-label`).

Thank you for helping to improve **UltimateHealth**! 🚀
