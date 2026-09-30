# Scope: ByteSpace website frontend

ByteSpace is a course marketplace website. This repo starts with the Next.js scaffold, design capture, and docs. Product features are not built here yet. Each one is built on its own branch and opened as a pull request into `dev`.

**Build approach:** Tracer Bullet (prove one thin end to end thread before thickening).
**Workflow:** Beta (`/check verify`, then `/test` after `/develop`). The project default level of rigor. `/architect` is the recommended first stop for a feature with a real decision, but skippable when you already know the build. Any feature can carry its own tag (for example `· GA`) to do more or less.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

**Git:** `dev` is the integration branch. Do not commit feature work on `main`. For a feature, branch from `dev` (`feature/add-design-system`, and the same pattern for the rest), keep the spec on that branch, and open a pull request into `dev`.

## At a glance

| #   | Feature                         | Phase      | Status      |
| --- | ------------------------------- | ---------- | ----------- |
| 1   | Stack and architecture          | Foundation | in-progress |
| 2   | Design system and UI foundation | Foundation | in-progress |
| 3   | App shell and route structure   | Skeleton   | in-progress |
| 4   | Home core loop                  | Slice 1    | in-progress |
| 5   | Home responsive pass            | Slice 1    | in-progress |
| 6   | Register and Login screens      | Slice 2    | in-progress |
| 7   | Motion and animation            | Slice 3    | in-progress |

## Foundations

### 1. Stack and architecture · in-progress

Decide and scaffold the runnable app so later slices build on a real project: Next.js latest, TypeScript, pnpm, and Tailwind latest.
**Done when:** the stack choice is recorded in a spec and the empty scaffold boots locally with `pnpm` and passes build.

- [x] Decide the stack (spec): `/architect stack and architecture`
- [x] Scaffold from the decision: `/develop stack and architecture`
- [x] Verify it: `/check verify stack and architecture`
- [x] Test it: `/test stack and architecture` (skipped; scaffold already verified, Beta test deferred)
      Spec [0001](../specs/0001-stack-and-architecture/index.md) · code in `./`

### 2. Design system and UI foundation · in-progress

Bootstrap only: map the existing Figma capture into the running app so type, color, spacing, elevation, and layout match ByteSpace exactly. Source of truth: `design/design-system/bytespace.tokens.json` and `design/design-system/bytespace.design-system.md` (plus responsive rules already documented there). Includes Satoshi loading, Poppins sizes and tracking, breakpoints, containers, and page padding. No component kit, no Home rebuild, no shell chrome in this feature.
**Done when:** those token files drive the app theme (colors, fonts, font sizes, spacing, elevation, breakpoints/containers/padding), a tiny sample surface shows them correctly from mobile through `2xl` with no horizontal overflow, and values stay aligned with the Figma capture (not invented).
**Branch:** `feature/add-design-system`, pull request into `dev`.

- [ ] Design it (spec): `/architect design system and UI foundation`

## Skeleton

### 3. App shell and route structure · in-progress

Shared chrome and App Router layout (header, content region, footer hooks) so the Home slice and later pages plug into one shell. Waits until the design system bootstrap is in place.
**Done when:** the shell renders on a base route, uses design system tokens, and stays responsive under the foundation rules.
**Branch:** `feature/app-shell`, pull request into `dev`.

- [ ] Design it (spec): `/architect app shell and route structure`

## Slice 1: Home core loop

### 4. Home core loop · in-progress

Thin end to end first product thread: the Home screen from Figma (node `1:1067`) on `/`, with design system tokens and `data/` dummies. Exact desktop 1440 match first; responsive is a follow up.
**Done when:** a visitor can open `/` and see the full Home sections match Figma desktop intent (nav through footer), fed by `data/` loops and Home assets.
**Branch:** `feature/home-core-loop`, pull request into `dev`.

- [ ] Design it (spec): `/architect home core loop`

### 5. Home responsive pass · in-progress

Make the Figma exact Home work from mobile through `2xl` and clean up its structure: small single purpose components, shared pieces reused, desktop positions kept as typed constants beside the component that renders them. Your constraint: use shadcn for every interactive primitive on Home (Sheet for the mobile menu, plus Button, Input, Tabs, Card, Avatar), restyled with ByteSpace tokens. On mobile the header shows a hamburger icon on the right that opens a panel sliding in from the right. The header is built here first; feature 3 lifts it into the shared layout later.
**Done when:** every Home section reads well at 360, `sm`, `md`, `lg`, `xl`, and `2xl` with no horizontal overflow and 44px touch targets, the desktop 1440 view still matches Figma, the mobile menu opens from the right and is keyboard and screen reader friendly, and Home primitives come from shadcn.
**Branch:** `feature/home-responsive-pass`, pull request into `dev`.

- [ ] Design it (spec): `/architect home responsive pass`

## Slice 2: Auth screens

### 6. Register and Login screens · in-progress

UI only: the Register (`/register`, frame `47:351`) and Login (`/login`, frame `49:195`) pages from Figma, sharing one split layout (promo panel with the course card collage on the left, form card on the right). Forms validate on the client and submit to a stub, the same way Home stubs its forms. No auth provider, sessions, or real sign in yet; that waits for the Data model and API decision.
**Done when:** both pages match Figma at desktop, read well from 360 to `2xl` with no horizontal overflow and 44px touch targets, the fields have labels, required and email checks, and each page links to the other.
**Branch:** `feature/register-and-login`, pull request into `dev`.

- [ ] Design it (spec): `/architect register and login screens`

## Slice 3: Motion

### 7. Motion and animation · in-progress

Polished, subtle motion across Home, Register and Login so the site feels alive: sections fade and rise in on scroll, the hero and auth collage images float gently, buttons, cards and category tiles react on hover and press, and moving between pages uses smooth transitions. One shared set of motion tokens (durations, easings, distances) in the design system, so every page moves the same way. The Figma layout at 1440 stays exactly as it is once the motion settles.
**Done when:** Home, Register and Login use the shared motion tokens for scroll reveals, gentle floating images, hover and press feedback, and page transitions; everything is still when the system asks for reduced motion; motion causes no layout shift and no horizontal overflow from 360 to `2xl`; it animates only transform and opacity, so it stays smooth on a mid range phone; and the settled 1440 view still matches Figma.
**Branch:** `feature/motion-and-animation`, pull request into `dev`.

- [ ] Design it (spec): `/architect motion and animation`

## Deferred

Out of scope for this pass, kept so the plan stays honest.

- **Coding standards and tooling**: capture conventions via `/audit`, then lint/format enforcement · was Foundation #2
- **Responsive foundation and layout primitives**: dropped as its own row; folded into feature 2 (design system bootstrap) · was Foundation #4
- **Real sign in and sign up**: wire the Register and Login forms to an auth provider and sessions · needs a decision · GA
- **Search Page**: course discovery from frame `55:117` · needs a decision
- **Course Details / Lessons / Reviews**: course consumption path · needs a decision
- **Creator Profile**: creator public page · needs a decision
- **404 Not Found**: empty state page from frame `63:252` · needs a decision
- **Data model and API**: persistence for courses, creators, and accounts · needs a decision · GA

## Legend

**The decision box.** Every feature carries exactly one, the sub task whose label ends with `(spec)`. Its wording varies (`Design it (spec)` normally, `Decide the stack (spec)` on Stack and architecture), so skills locate it by that `(spec)` suffix, never by an exact label. Every other box is an execution box and `/architect` never ticks one.

**Feature lifecycle**: the scope updates as a feature moves; each row is what it shows and who sets it:

| State                        | Set by                                                                                 | The feature shows                                                                                                                                                                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `planned` · needs a decision | `/scope`                                                                               | one box: `Design it (spec): /architect <feature>`                                                                                                                                                                                            |
| `in-progress` (designed)     | **`/architect` at spec capture**                                                       | `Design it` ticked; spec linked; `Build it: /develop <feature>` + **2 to 5 milestones**; the tier's closing boxes (`Verify it` Alpha+, `Test it` Beta+, `Review it` + `Document it` GA); any surfaced follow up enrolled                     |
| `in-progress` (building)     | `/develop`                                                                             | milestone sub boxes tick one by one; code pointer filled                                                                                                                                                                                     |
| `in-progress` (verified)     | `/check verify`                                                                        | `Build it` + milestones ticked; `Verify it` ticked                                                                                                                                                                                           |
| `done`                       | **you, when you decide it is** (any skill sets it when you say so); `/sync` reconciles | boxes you ran ticked, skipped ones marked skipped; the tier's last stage (`Prototype` → after `/develop`; `Alpha` → after `/check verify`; `Beta`/`GA` → after `/test`) is the suggested point to call it done; `/sync` captures conventions |

- **Next step** = the first unticked box (always a command or a tracked milestone).
- **needs a decision** = run `/architect` first; otherwise straight to `/develop` (or `/audit` for standards and tooling). The tag drops once the spec is captured.
- **Atomic build tasks live in the spec's `## Build plan`, not here**: the scope carries only the milestone rollup.
- **Status** `planned` → `in-progress` → `done`, plus `existing` (pre workflow) and `dropped` (de scoped, kept for history).
- **Approach tag** beside a heading (for example `· Facade`) overrides the project default for that feature; no tag = inherits it.
- **Workflow tier tag** beside a heading (for example `· GA`, `· Prototype`) sets that one feature's rigor above or below the project default; no tag inherits the default. It decides the feature's check boxes and each skill's next suggestion.
- **Workflow** (header line) is the project default, what runs after `/develop`: **Prototype** = nothing (trust develop's own build time self check); **Alpha** = `/check verify`; **Beta** = `/check verify` then `/test`; **GA** = adds a fresh model `/check review` then `/document`. A feature built on an unratified decision (an `Assumed` spec) stays flagged, but that never blocks `done`.
- **Pointer line** (`spec <n> · code in <path>`): the spec link added by `/architect`, the code path by `/develop`.
