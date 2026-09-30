# 0005. Motion and animation

**Date**: 2026-09-29
**Status**: Done

## Summary

This decision adds polished, subtle motion to Home, Register and Login. Content above the fold rises in with plain CSS on first paint, so it never waits for JavaScript. Sections below the fold reveal once as you scroll: the heading first, then its items one after another. This uses Motion for React (the `motion` package), loaded lazily. The 3D ornaments float gently. Buttons lift a little on hover and press down on click. Moving between pages is a soft crossfade with a slight rise, and switching course tabs crossfades the grid. Both use React's built in `<ViewTransition>`. Every duration, easing and distance comes from one shared set of motion tokens. When the system asks for reduced motion, everything is still.

## Requirements

**User stories**:

- As a visitor, I want the pages to feel alive and polished as I land and scroll, so ByteSpace feels like a quality product.
- As a visitor who prefers reduced motion, I want everything to stay still and show right away, so the site is comfortable to use.
- As a frontend engineer, I want every animation to use one shared set of motion tokens and a couple of small wrappers, so new sections get the same motion without copying values.

**Acceptance criteria** (the contract, each one checkable on its own):

- **AC-1**: The motion tokens (durations, easings, distances, stagger step, float range) are defined once in `design/design-system/bytespace.tokens.json` under a `motion` group, described in `bytespace.design-system.md`, and mirrored as CSS custom properties in `app/globals.css`. JavaScript reads the JSON file directly, so no motion value is typed by hand in a component.
- **AC-2**: On first load, the entrance targets rise in from `--motion-distance-enter` below, one stagger step apart, in this order. Home: headline (step 0), body (1), search form (2), hero visual box (3). Register and Login: promo text block (0), form card (1), collage (2, shown from `lg` only). The likely largest paint elements (the Home headline, the hero visual box and the auth promo heading) stay fully opaque and only rise. Every other target also fades from 0. This is pure CSS with `animation-fill-mode: both`, so it plays in the server rendered HTML before hydration, and step 0 starts with no delay.
- **AC-3**: Every Home section below the hero (partners, courses, categories, Growth, Creator, CTA, testimonials, footer) starts hidden and reveals when its top crosses 80% of the viewport height (a fraction of the section would never be reached by very tall sections on phones). When a section has a heading block (its title plus body), that block reveals first. Then the section's main content groups follow in DOM order, one stagger step apart (logos, the course tabs block, category cards, stats, checklist rows, the CTA button, testimonial cards, footer columns). Sections with no heading (partners, footer) stagger their groups only. Decorative shapes never reveal. Each reveal plays once per page visit and never again when you scroll back up.
- **AC-4**: The 3D ornaments float between −`--motion-float-distance` and +`--motion-float-distance` on a slow, endless loop. This covers the hero ornaments, the CTA ornaments, and the torus, pyramid, spring and cylinder shapes in the auth collage. Each ornament's phase is `−(index ÷ count) × duration.float`, so they don't move together. Cards, people images and text never float.
- **AC-5**: Every enabled `Button` (all variants except `link`, including `asChild` links) lifts `distance.hover` on hover and scales to `scale.press` while pressed, over `duration.fast`. Hover applies only on devices that can hover (Tailwind v4 `hover:` already does this). Disabled buttons and buttons with `aria-haspopup` get no transform. Plain text links, tabs and inputs get no transform.
- **AC-6**: Every link between Home, Register and Login fades the old page out over `duration.base` and fades the new page in over `duration.enter` with a `distance.page` rise. There is no sideways slide. Same page links (like `/#courses`) and routes without a page VT swap without a page animation. Clicks are never blocked by the transition overlay. Browsers without view transition support just swap pages instantly.
- **AC-7**: Switching a course tab crossfades the old grid into the new one in place. The active tab and its `aria-selected` commit in the same frame the crossfade starts (nothing in the tabs suspends). The tab row and everything above it stay fixed. The grid's own height may change because the tabs hold different numbers of courses.
- **AC-8**: With `prefers-reduced-motion: reduce`: no entrance, no float, no reveal, no page or tab crossfade and no button lift or press scale. All content is fully visible as soon as it renders, or reveals with zero duration.
- **AC-9**: Motion animates only `transform`, `translate`, `scale`, `rotate` and `opacity`. At widths 360, 390, 768, 1024, 1280, 1440 and 1536, `document.documentElement.scrollWidth` equals `document.documentElement.clientWidth`. This is sampled every 100ms while reveals and floats run, and again after they settle. No element changes layout size because of motion.
- **AC-10**: Once motion settles (checked in the browser at DPR 1, with reduced motion emulated and fonts and images loaded), the 1440 Home, Register and Login views match their Figma exports with no visual regression in the existing side by side scripts. Every Home section top sits within 2px of where it was before this work (compare with the existing band script).
- **AC-11**: With JavaScript turned off, above the fold content is fully visible (it's CSS only), and below the fold content is visible through a `<noscript>` override. `motion` is loaded through `LazyMotion` with the `domAnimation` features fetched by an async import, plus the light `m` components, and the full `motion` component is never imported.
- **AC-12**: `pnpm exec tsc --noEmit`, `pnpm exec eslint .` and `pnpm build` pass.

## Decision

**Chosen option**: A hybrid. CSS handles above the fold entrance, float and hover. Motion for React handles below the fold scroll reveals. React `<ViewTransition>` handles page and tab crossfades.

CSS keyframes cover everything that plays on its own (the entrance and the float) plus the button states, so first paint and the largest paint never wait for JavaScript. The `motion` library is used only where it clearly beats CSS: reveals triggered by the viewport, with parent to child stagger. It's loaded lazily with the smallest feature set. Page and tab crossfades use the view transition support already built into React 19 and Next.js 16, so they need no extra package.

**Implementation skills**: `motion` (`motiondivision/ai-kit`, `.agents/skills/motion/`) · `vercel-react-view-transitions` (`vercel-labs/agent-skills`, `.agents/skills/vercel-react-view-transitions/`) · `vercel-react-best-practices` (`vercel-labs/agent-skills`, `.agents/skills/vercel-react-best-practices/`)

## Feature design

There is no data model and no API. This is a presentation layer feature.

### Motion tokens

One `motion` group in `bytespace.tokens.json`, mirrored in `globals.css` `:root` as `--motion-*`:

| Token             | Value                            | Used by                                             |
| ----------------- | -------------------------------- | --------------------------------------------------- |
| `duration.fast`   | 160ms                            | button hover and press                              |
| `duration.base`   | 240ms                            | page fade out, tab crossfade                        |
| `duration.enter`  | 560ms                            | above the fold entrance, page fade in               |
| `duration.reveal` | 640ms                            | scroll reveal of each item                          |
| `duration.float`  | 7s                               | one float cycle (each ornament adds its own offset) |
| `ease.out`        | `cubic-bezier(0.22, 1, 0.36, 1)` | entrance, reveal, page fade in                      |
| `ease.inOut`      | `cubic-bezier(0.45, 0, 0.55, 1)` | float                                               |
| `distance.enter`  | 16px                             | entrance rise                                       |
| `distance.reveal` | 24px                             | reveal rise                                         |
| `distance.page`   | 12px                             | page fade in rise                                   |
| `distance.float`  | 8px                              | float range (up and down)                           |
| `distance.hover`  | 2px                              | button lift                                         |
| `scale.press`     | 0.97                             | button press                                        |
| `stagger`         | 80ms                             | the gap between steps in entrance and reveal        |

`lib/motion.ts` imports the JSON and exports numbers in the units Motion expects (seconds, pixels, easing arrays). CSS uses the custom properties.

### Pieces

- **`app/globals.css`**: the `--motion-*` properties; keyframes `enter-rise`, `float`, `page-in`, `page-out`; the utilities `animate-enter` (it reads `--enter-step` for its delay) and `animate-float` (it reads `--float-offset` for its phase); the view transition recipes (the `.page` class, the tab crossfade duration, `::view-transition { pointer-events: none }`); one `@media (prefers-reduced-motion: reduce)` block that turns off `animate-enter`, `animate-float` and all view transition animations.
- **`components/motion/MotionProvider.tsx`** (client): `LazyMotion features={loadFeatures} strict`, where `loadFeatures` async imports `components/motion/features.ts` (it re exports `domAnimation`), plus `MotionConfig reducedMotion="user"`. It's placed once in `app/layout.tsx` around `children`. Until the features load, `m` elements hold their `hidden` state and animate once the features arrive.
- **`components/motion/Reveal.tsx`** (client): `Reveal` is the viewport trigger (`initial="hidden"`, `whileInView="visible"`, `viewport={{ once: true, margin: '0px 0px -20% 0px' }}`); it passes the state down to its items. `RevealItem` rises by `distance.reveal` and fades, delayed by its `order` prop × `stagger`. `Section` always renders as a `Reveal`, and `SectionHeader` is a `RevealItem` at order 0. Both take `as` from a fixed set (`div`, `section`, `ul`, `ol`, `li`, `dl`, `p`, `h2`, `nav`, `footer`), mapped to the matching `m` element, so they can replace an existing element instead of adding a wrapper that changes layout. The motion goes on the outer element, and absolute positioning, `ScaledCanvas` scaling and Tailwind `rotate` or `translate` stay on the inner elements. Every revealed element carries `data-reveal`. A reduced motion media query in `globals.css` and the `<noscript>` override both force `[data-reveal]` visible, so reduced motion needs no JS branch.
- **`app/layout.tsx`**: a `<noscript><style>` that forces `[data-reveal]` to `opacity:1; transform:none`.
- **`components/ui/button.tsx`**: the base class changes `transition-all` to transitions on color, background, border, shadow and transform with `--motion-duration-fast`, and replaces `active:translate-y-px` with a `motion-safe` hover lift and press scale. Both skip `aria-haspopup` and `data-variant=link`.
- **`components/home/Ornaments.tsx`** and **`components/auth/AuthCollage.tsx`**: add `animate-float` with a per item `--float-offset` of `−(index ÷ count) × duration.float`.
- **Page VTs**: `app/page.tsx`, `app/(auth)/register/page.tsx` and `app/(auth)/login/page.tsx` each wrap their content in `<ViewTransition enter="page" exit="page" default="none">`. They go in the pages, never a layout. Because of `default="none"`, a tab change inside the page never activates the page boundary.
- **`components/home/CourseTabs.tsx`**: becomes controlled (`value` plus `onValueChange` that calls `startTransition`). The panels (`children`) are wrapped in `<ViewTransition key={value} name="course-grid" share="course-grid" default="none">` (the `course-grid` class sets the crossfade to `duration.base`). The `key` swaps the whole panel subtree in one commit, so exactly one `course-grid` exists before and after. A view transition inside each `TabsContent` would not pair, because Radix presence keeps the old panel mounted for one extra commit. No `useOptimistic` is needed, since nothing suspends and the commit lands in the next frame.
- **Hero, CTA and auth**: add `animate-enter` plus `[--enter-step:N]` to the entrance targets named in AC-2.
- **Sections**: wrap each below the fold section's heading and item group with `Reveal` and `RevealItem`. The course grid reveals as one item (not per card), so a tab switch never replays a reveal.

### Value sourcing

| Value                                               | Source                                                                                            |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Every duration, easing, distance, scale and stagger | `motion` group in `bytespace.tokens.json` (CSS through `--motion-*`, JS through `lib/motion.ts`)  |
| Entrance order                                      | `--enter-step` index set at each call site, following the order in AC-2                           |
| Reveal order                                        | the explicit `order` prop on each `RevealItem` (heading block 0, then groups 1, 2, …)             |
| Float phase                                         | ornament index × a fixed fraction of `duration.float`, set as `--float-offset`                    |
| Reduced motion                                      | the browser `prefers-reduced-motion` media query (CSS), which also forces `[data-reveal]` visible |
| Reveal trigger point                                | `viewport.margin` `0px 0px -20% 0px` in `Reveal` (a fixed constant, not a token)                  |

### Edge cases

- **Header**: the header lives inside the Home page, and Register and Login have no header, so no page pair shares it. It needs no anchoring now. When the later app shell lifts it into a shared layout, give it `viewTransitionName: 'site-header'` plus the isolation CSS.
- **Float and positioning**: ornaments already use Tailwind's separate `rotate` and `translate` properties, and the float keyframes use `transform`, so the two stack instead of overwriting each other.
- **Largest paint**: the Home headline, the hero visual box and the auth promo heading never start at zero opacity, only the rise plays, so the largest paint is not delayed by the entrance.
- **Firefox and older Safari**: without view transitions the page and tab changes are instant. Nothing breaks.
- **Browser back and forward**: these fire the same untyped page crossfade (no transition types are used), so they animate the same way.

### Critical test scenarios

- **Entrance before hydration** (AC-2, AC-11): load Home with JavaScript off. The hero text, search and visual rise in and end fully visible, and below the fold sections are visible too.
- **Reveal once** (AC-3): scroll to partners. The heading appears before the logos. Scroll up and back down, and nothing replays.
- **Reduced motion** (AC-8, AC-10): emulate `prefers-reduced-motion: reduce`. Nothing moves, all content is visible right away, and the 1440 screenshot matches the Figma export.
- **No overflow during motion** (AC-9): at each width in AC-9, sample `scrollWidth` while reveals and floats are running. It never goes above the viewport width.
- **Page crossfade** (AC-6): click Sign In on Home, then the logo on Login. Both fade with a rise, and the button stays clickable during the transition.
- **Tab crossfade** (AC-7): pick a course tab. The grid crossfades, `aria-selected` moves right away, and no reveal replays.
- **Button press** (AC-5): hover lifts a button 2px and pressing scales it to 0.97. A `link` variant does neither.

## Build plan

The build approach is Tracer Bullet. First one thin thread runs end to end through every layer (tokens, CSS entrance, one Motion reveal, one page crossfade), then it gets thicker.

1. **Tokens and base** (AC-1, AC-8, AC-11): add the `motion` group to `bytespace.tokens.json` and document it in `bytespace.design-system.md`. Add `--motion-*`, the keyframes, utilities, view transition recipes and the reduced motion block to `globals.css`. Add `lib/motion.ts`. Run `pnpm add motion` and add `MotionProvider` plus the `<noscript>` override in `app/layout.tsx`.
2. **Thin thread** (AC-2, AC-3, AC-6): the Home hero CSS entrance, `Reveal` and `RevealItem` on the partners section only, and the page `<ViewTransition>` on Home and Login. Check one navigation each way, the reveal, and reduced motion.
3. **Reveals everywhere** (AC-3): wrap courses, categories, Growth, Creator, CTA, testimonials and footer. Replace existing elements through `as` instead of adding wrappers.
4. **Float, buttons, tabs, auth** (AC-2, AC-4, AC-5, AC-7): float on hero, CTA and collage ornaments; button hover and press; controlled `CourseTabs` with the grid crossfade; the auth entrance; the page VT on Register.
5. **Verify** (AC-8, AC-9, AC-10, AC-12): run the width sweep for overflow during and after motion, with reduced motion emulated for the settled 1440 comparison against Figma, then `tsc`, `eslint` and `pnpm build`.

## Consequences

**Positive**:

- The pages feel polished, and the motion stays consistent because every value comes from one token set.
- First paint and the largest paint don't wait for JavaScript, since everything above the fold is CSS.
- Reduced motion is a single switch in CSS plus one hook in JS.

**Negative**:

- `motion` adds about 15KB (gzipped) of client JavaScript through `LazyMotion` plus `domAnimation`, and the section wrappers become small client islands inside server sections.
- Below the fold content is hidden in the server HTML until hydration runs. The `<noscript>` override covers JavaScript being off. If JavaScript loads but hydration fails, below the fold sections stay hidden. That is an accepted risk.
- The motion values exist twice (JSON for JS, CSS custom properties for CSS). The design system notes say to keep them in sync.
- Page and tab crossfades are Chromium and Safari 18.2+ only, and Firefox 144+. Older browsers get instant swaps.

## Follow-up

- Connect the Motion MCP (`mcp.motion.dev`, from the Cursor marketplace "Motion" plugin or `npx motion-ai`) when you want live API docs while building.
- Add the `motion` skill to the `## Agent skills` section of `AGENTS.md` (through `/audit` or `/sync`).
- When the app shell lifts the header into a shared layout, anchor it with `viewTransitionName: 'site-header'` and the isolation CSS.

## Rationale

See [rationale.md](rationale.md). Verification steps and results are in [verify.md](verify.md).
