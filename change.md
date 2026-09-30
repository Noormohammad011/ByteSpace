# Changelog

All changes to this project will be documented in this file.

## [Unreleased]

- Added the Home responsive pass on `feature/home-responsive-pass`: the parent responsive Home layout was already in the Home slice, and specs 0003 and 0004 are now in `docs/specs`
- Ignore browser-extension attributes on `<html>` and `<body>` so hydration stays quiet when ColorZilla or Grammarly rewrites those tags
- Added the Home core loop on `feature/home-core-loop`: hero through testimonials on `/`, fed by `data/` and Home assets, with motion left for its own branch
- Added the app shell on `feature/app-shell`: shared header, blue content region, and footer in the site layout, matching the parent chrome
- Added the design system foundation on `feature/add-design-system`: ByteSpace tokens in the theme, local Satoshi, Container, and a token sample on `/`
- Started the ByteSpace repo from the Next.js scaffold, design capture, Figma assets, and docs. Each later feature lands from its own branch into `dev`
- Marked stack and architecture done: spec 0001 records the Next.js, TypeScript, pnpm, and Tailwind scaffold
- Scaffolded Next.js 16 App Router app with TypeScript, pnpm, Tailwind v4, Prettier, Poppins, Husky, and lint-staged
