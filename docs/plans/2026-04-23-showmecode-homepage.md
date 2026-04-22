# Showmecode Homepage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a new Next.js App Router homepage for `showmecode` that matches the approved design direction, includes polished interactions, and establishes a reusable site foundation.

**Architecture:** Start from a clean Next.js scaffold, keep the homepage mostly server-rendered, and isolate interaction to small client components such as the category tabs. Centralize copy and card data in a typed data module so future pages can reuse the same content model and section structure.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS

---

### Task 1: Scaffold the app

**Files:**
- Create: `package.json`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `components/*`
- Create: `data/homepage.ts`

**Step 1: Create the project files**

Use the official Next.js app structure with TypeScript and Tailwind-ready global styling.

**Step 2: Install dependencies**

Run: `npm install`
Expected: dependencies install without lockfile conflicts

**Step 3: Verify the scaffold boots**

Run: `npm run lint`
Expected: lint command runs and reports no configuration errors

**Step 4: Commit**

```bash
git add .
git commit -m "chore: scaffold next homepage app"
```

### Task 2: Establish the visual foundation

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Step 1: Define theme tokens**

Add CSS variables for brand blue, text, muted text, borders, surfaces, and decorative gradients.

**Step 2: Set base typography and page defaults**

Apply body background, text color, smoothing, selection styles, focus styles, and shared utility classes for section spacing and containers.

**Step 3: Verify visually critical styles compile**

Run: `npm run lint`
Expected: PASS

**Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "style: add homepage design tokens"
```

### Task 3: Create homepage content models

**Files:**
- Create: `data/homepage.ts`

**Step 1: Define typed content data**

Add arrays and object literals for:

- navigation items
- chapter categories
- chapter cards
- learning path steps
- value proposition items
- footer links

**Step 2: Keep copy aligned with approved design**

Use Chinese marketing copy consistent with `showmecode` and the supplied mockup.

**Step 3: Verify imports remain type-safe**

Run: `npm run lint`
Expected: PASS

**Step 4: Commit**

```bash
git add data/homepage.ts
git commit -m "feat: add homepage content model"
```

### Task 4: Build reusable layout and navigation components

**Files:**
- Create: `components/header.tsx`
- Create: `components/logo.tsx`
- Create: `components/section-shell.tsx`
- Create: `components/footer.tsx`

**Step 1: Implement the header**

Build a sticky header with brand, nav links, search shell, keyboard hint, and primary CTA.

**Step 2: Implement shared layout wrappers**

Add a section shell for title, actions, and consistent content width.

**Step 3: Implement the footer**

Build a footer that reuses the same data model and visual language.

**Step 4: Verify**

Run: `npm run lint`
Expected: PASS

**Step 5: Commit**

```bash
git add components/header.tsx components/logo.tsx components/section-shell.tsx components/footer.tsx
git commit -m "feat: add shared homepage frame components"
```

### Task 5: Build the hero section

**Files:**
- Create: `components/hero.tsx`

**Step 1: Implement the left hero content**

Add headline, supporting paragraph, and two CTA buttons with strong typographic hierarchy.

**Step 2: Implement the right illustration panel**

Create a CSS-driven browser/editor mock with icon rail, content lines, image placeholder, and dotted decorative field.

**Step 3: Add motion polish**

Use lightweight transitions and subtle transforms for page-load feel and hover response.

**Step 4: Verify**

Run: `npm run lint`
Expected: PASS

**Step 5: Commit**

```bash
git add components/hero.tsx
git commit -m "feat: add homepage hero section"
```

### Task 6: Build the hot chapters section

**Files:**
- Create: `components/category-tabs.tsx`
- Create: `components/chapter-card.tsx`
- Create: `components/hot-chapters.tsx`

**Step 1: Implement chapter cards**

Create a reusable card with badge, visual art area, title, description, and meta text.

**Step 2: Implement interactive tabs**

Use a small client component to switch between chapter categories and update the visible card set.

**Step 3: Compose the section**

Add the section title, right-side browse link, tab bar, and responsive card grid.

**Step 4: Verify**

Run: `npm run lint`
Expected: PASS

**Step 5: Commit**

```bash
git add components/category-tabs.tsx components/chapter-card.tsx components/hot-chapters.tsx
git commit -m "feat: add hot chapters section"
```

### Task 7: Build follow-up brand sections

**Files:**
- Create: `components/learning-path.tsx`
- Create: `components/value-grid.tsx`

**Step 1: Implement the learning path**

Build a three-step section that clearly shows the beginner-to-product journey.

**Step 2: Implement the value grid**

Add concise value cards that reinforce the brand and make the homepage feel more complete.

**Step 3: Verify**

Run: `npm run lint`
Expected: PASS

**Step 4: Commit**

```bash
git add components/learning-path.tsx components/value-grid.tsx
git commit -m "feat: add supporting homepage sections"
```

### Task 8: Compose the homepage

**Files:**
- Modify: `app/page.tsx`

**Step 1: Assemble the sections**

Render header, hero, hot chapters, learning path, value grid, and footer in homepage order.

**Step 2: Check responsive spacing**

Ensure section rhythm and container widths are consistent across viewport sizes.

**Step 3: Verify**

Run: `npm run lint`
Expected: PASS

**Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose showmecode homepage"
```

### Task 9: Final verification

**Files:**
- Modify as needed based on lint feedback

**Step 1: Run final checks**

Run: `npm run lint`
Expected: PASS

Run: `npm run build`
Expected: PASS with a production build output

**Step 2: Commit**

```bash
git add .
git commit -m "chore: finalize homepage implementation"
```
