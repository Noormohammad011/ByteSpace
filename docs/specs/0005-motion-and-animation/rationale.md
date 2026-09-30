# 0005. Motion and animation: rationale

## Context

Home, Register and Login match Figma and work from 360px to wide desktops (specs 0003, 0004 and the auth screens), but they are completely static. You asked for motion that makes "a real difference" while keeping the Figma match. The stack is Next.js 16 App Router, React 19 and Tailwind v4 with `tw-animate-css` already imported. React 19 in Next.js 16 ships `<ViewTransition>` with no config needed. Pages are server components with a few client islands, and the hero person image is the likely largest paint.

In the interview you chose: every surface, a polished feel, scroll reveals through a library, a soft page crossfade, a staggered entrance, full stillness for reduced motion, Motion for React loaded lazily, a hybrid CSS and library split, float on 3D ornaments only, hover and press on buttons only, a tab crossfade, entrance done in CSS first, reveals that play once, heading then items stagger, and every section below the hero.

## Options considered

### Option 1: Hybrid, CSS plus Motion plus ViewTransition (chosen)

CSS for anything that plays on its own or above the fold, Motion only for viewport reveals with stagger, and React ViewTransition for page and tab crossfades.

- **Pros**: first paint never waits for JavaScript. The library cost is small and only for work it does best. Page transitions need no extra package.
- **Cons**: two animation systems to learn, and the token values live in both JSON and CSS.

### Option 2: Motion for everything

Entrance, float, hover, reveals and page transitions all go through `motion`.

- **Pros**: one API and one place for values.
- **Cons**: above the fold content renders hidden in the server HTML and waits for hydration, which delays the largest paint. Page transitions need `AnimatePresence` around a route template, which fights the App Router. The bundle is bigger for effects CSS does for free.

### Option 3: CSS only

Keyframes plus an `IntersectionObserver` hook for reveals, and ViewTransition for pages.

- **Pros**: no new dependency.
- **Cons**: you write and maintain your own viewport, stagger and reduced motion logic. It's less smooth when interrupted, and you turned it down in favor of a library for reveals.

## Rationale

Option 1 puts each effect where it costs the least and works the best. The entrance and float are fixed loops that play on their own, and CSS keyframes do those with no JavaScript, which protects the largest paint. Viewport triggered stagger across nested children is exactly what Motion's `whileInView` and variants are made for, and `LazyMotion` with `domAnimation` keeps that cost small. Page and tab crossfades are built into React 19 and Next.js 16 through `<ViewTransition>`, so adding a library there would only add weight. The price is values stored in two places (JSON and CSS). That is smaller than Option 2's paint delay or Option 3's custom observer code, and the design system notes keep the two in sync.
