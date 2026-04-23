# Homepage Hero Follow-up Design

**Date:** 2026-04-23

**Goal:** Restyle the sections immediately below the homepage hero so they match the supplied reference more closely, including tighter copy, a timeline learning path, and blueprint-style illustrations.

## Approved Direction

- Keep the existing homepage composition and reuse `StageBand` and `IntroBand`
- Restyle `StageBand` into a desktop horizontal timeline with four cards and a mobile vertical flow
- Restyle `IntroBand` into a large editorial preface card with stronger hierarchy
- Replace missing artwork with local inline SVG illustrations in a consistent light-blue line style
- Adjust copy to closely match the reference while preserving the existing chapter-to-stage mapping

## Constraints

- Do not rewrite the rest of the homepage
- Keep the implementation responsive
- Avoid introducing external image dependencies
- Keep styling aligned with the current blue-and-white brand system

## Verification

- `npm run lint`
- `npm run build`
