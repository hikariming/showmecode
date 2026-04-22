# Showmecode Homepage Design

**Date:** 2026-04-23

**Goal:** Build a production-ready Next.js homepage for `showmecode` that closely matches the provided design while adding lightweight real-site interactions and two follow-up sections for a more complete brand landing page.

## Product Intent

The homepage should communicate one clear idea: `showmecode` helps users learn VibeCoding and ship their own products through practical tutorials, projects, tools, and inspiration.

The page should feel:

- Clean and technical
- Confident but not flashy
- Editorial rather than dashboard-like
- Blue-and-white brand forward

## Scope

This first iteration includes:

- Sticky top navigation with brand, menu, search UI, and primary CTA
- Hero section with large Chinese headline, supporting copy, dual CTA buttons, and a code/product illustration panel
- Hot chapters section with category tabs and reusable chapter cards
- Learning path section that explains the progression from beginner to building a product
- Value proposition section that reinforces why users should learn on this site
- Footer with navigation and brand summary

This first iteration does not include:

- Real backend search
- CMS integration
- Account system
- Actual article detail pages

## Information Architecture

### Header

- Left: `showmecode` brand mark and logo text
- Center: top-level navigation
- Right: search box and `开始学习` CTA

Interaction:

- Sticky on scroll
- Subtle blur and border when attached to top
- Hover states on nav items and buttons

### Hero

- Left column:
  - Headline: `学习 VibeCoding 设计你自己的产品`
  - Supporting paragraph
  - Primary and secondary CTA buttons
- Right column:
  - Stylized browser/editor panel
  - Icon rail
  - Content wireframe
  - Dotted halftone background

Interaction:

- Soft entrance motion on page load
- Hover emphasis on buttons
- Slight float/parallax feel on the illustration without heavy JavaScript

### Hot Chapters

- Section title
- Horizontal category tabs
- Link to browse all tutorials
- Grid of chapter/resource cards

Card content:

- Tag badge
- Thumbnail illustration area
- Title
- Description
- Meta row with category and read count

Interaction:

- Category switch updates active state and displayed cards
- Card hover raises elevation and border emphasis

### Learning Path

- 3-step progression:
  - Understand VibeCoding basics
  - Use tools and patterns in practice
  - Build and publish a real product

Interaction:

- Strong directional flow on desktop
- Clean stacked layout on mobile

### Value Proposition

- 3 to 4 concise benefit blocks
- Focus on practical learning, product mindset, curated tools, and inspiration

Interaction:

- Card hover polish only

### Footer

- Brand summary
- Quick navigation
- Resource links
- Copyright line

## Visual System

### Color

- Primary blue for logo, highlights, CTA, active tabs, and line illustrations
- White base background
- Soft gray text for secondary copy
- Light blue dot/gradient accents in backgrounds

### Typography

- Large bold Chinese headline with strong visual contrast
- Clean sans-serif body copy
- Tight heading spacing, looser paragraph rhythm

### Shape Language

- Large rounded corners on buttons and cards
- Thin blue outline treatment in illustrations
- Light borders for cards and surfaces

### Motion

- Small, purposeful transitions only
- No heavy animation libraries unless needed
- Motion should support clarity, not distract from content

## Technical Design

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS with CSS variables for theme tokens
- Content: local typed data objects for menus, tabs, cards, steps, and value props
- Components:
  - `Header`
  - `Hero`
  - `SectionShell`
  - `CategoryTabs`
  - `ChapterCard`
  - `LearningPath`
  - `ValueGrid`
  - `Footer`

## Data Flow

- Static content lives in a central data module
- Homepage server component composes sections
- Small client components are used only where interaction is needed, mainly tabs and minor UI states

## Responsive Behavior

- Desktop: two-column hero, five-card chapter row if space allows
- Tablet: hero stacks with illustration below text, cards shift to 2-column grid
- Mobile: condensed header, stacked hero, horizontal overflow-safe tabs, single-column cards

## Testing Strategy

- Verify project builds cleanly
- Verify lint passes
- Validate responsive layout at mobile and desktop widths
- Check keyboard focus states for nav, search, tabs, and buttons

## Success Criteria

- The page visually matches the supplied design language at first glance
- The site feels like a real launch-ready homepage rather than a static mock
- The component structure is reusable for follow-up pages
- The homepage runs locally in a clean Next.js codebase without placeholder breakage
