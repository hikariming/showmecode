# Homepage Hero Follow-up Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refresh the homepage sections under the hero to match the approved learning-path and preface design.

**Architecture:** Keep the existing homepage section structure, move the visual complexity into `StageBand`, `IntroBand`, shared SVG icon components, and a few new global utility classes. Use static data already present in `data/book.ts`.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS

---

### Task 1: Refresh the stage path section

**Files:**
- Modify: `components/stage-band.tsx`
- Modify: `components/icons.tsx`
- Modify: `app/globals.css`

**Step 1: Add the required blueprint-style stage illustrations**

Create local SVG components for the bulb, code window, cube, and rocket visuals.

**Step 2: Rebuild the section layout**

Render the heading, timeline rail, stage nodes, and four cards to match the approved design.

**Step 3: Verify**

Run: `npm run lint`
Expected: PASS

### Task 2: Refresh the preface card

**Files:**
- Modify: `components/intro-band.tsx`
- Modify: `components/icons.tsx`
- Modify: `app/globals.css`

**Step 1: Add the open-book illustration**

Create a local SVG that fits the same blueprint visual language as the stage illustrations.

**Step 2: Rebuild the section card**

Update the layout, heading, supporting copy, decorative accents, and CTA placement.

**Step 3: Verify**

Run: `npm run lint`
Expected: PASS

### Task 3: Final verification

**Files:**
- Modify as needed based on lint/build feedback

**Step 1: Run checks**

Run: `npm run lint`
Expected: PASS

Run: `npm run build`
Expected: PASS
