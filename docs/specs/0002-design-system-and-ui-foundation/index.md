# 0002. Design system and UI foundation for ByteSpace

**Date**: 2026-09-29
**Status**: Done

## Summary

This decision wires the already captured ByteSpace Figma tokens into the running Next.js app. You map colors, fonts, type sizes, spacing, elevation, and responsive layout into Tailwind v4 `@theme`, load Satoshi locally beside Poppins, and prove the theme on a temporary sample at `/`. No component kit, app shell, or Home rebuild in this feature. The JSON and design markdown in `design/design-system/` stay the source of truth.

## Requirements

**User stories**:

- As a frontend engineer, I want ByteSpace tokens available as theme utilities so later screens match Figma without inventing values.
- As a visitor on the sample page, I want to see color, type, space, elevation, and layout tokens applied so we can verify the bootstrap before Home.

**Acceptance criteria** (the contract, each criterion is IDed and independently checkable):

- **AC-1**: Brand colors (Electric Lime, Electric Violet, Persian Blue), Shuttle Gray scale, black, and white from `design/design-system/bytespace.tokens.json` are available as Tailwind color utilities via `@theme` in `app/globals.css`.
- **AC-2**: Every typography token in that JSON (display, heading, label, body, including `body.xs` and `label.xs` at 12px) is available as a theme text utility that sets font size, line height, and letter spacing together; weight is applied with the matching Tailwind weight utility from the token (`font-medium` / `font-semibold`). Display and heading utilities use the `clamp()` formula in the constraints table. Default running body copy on the sample uses `text-body-s` (14px) on mobile and `text-body-m` (16px) from `md` up; `text-body-xs` / `text-label-xs` remain available for captions only, never as the sample's main body.
- **AC-3**: `font-heading` resolves to Poppins (`next/font/google`, weights already on the scaffold) and `font-body` resolves to Satoshi via `next/font/local` from exactly `app/fonts/Satoshi-Regular.woff2` (400) and `app/fonts/Satoshi-Medium.woff2` (500), upright only, no variable font; sample body text uses Satoshi and sample headings use Poppins.
- **AC-4**: Spacing scale, `elevationA` as `shadow-elevation-a`, breakpoints (`xs` 360 through `2xl` 1536), container widths, and page padding from the token files are available in `@theme` (and match the design markdown responsive section).
- **AC-5**: `components/layout/Container.tsx` is a server component with `children` and optional `className` only; it is `mx-auto w-full`, uses `100%` width below `lg`, then max widths 960 / 1120 / 1280 at `lg` / `xl` / `2xl`, and page padding 16 default / 24 from `md` / 32 from `lg`; the sample uses it.
- **AC-6**: Route `/` is a temporary token proof page that renders every color token as a swatch, every type style once, every spacing scale step as a bar, one elevationA shadow card, and one `Container`; at viewports from `xs` through `2xl` there is no horizontal overflow.
- **AC-7**: The scaffold `prefers-color-scheme: dark` block is removed; the app uses light ByteSpace tokens only.
- **AC-8**: If `app/fonts/Satoshi-Regular.woff2` or `app/fonts/Satoshi-Medium.woff2` is missing, `/develop` stops and asks you for those exact files before finishing (no CDN, no silent Inter body substitute).
- **AC-9**: Numeric theme values match `bytespace.tokens.json`; prose responsive rules come from `bytespace.design-system.md` when JSON is silent; if both files disagree on the same fact, `/develop` stops and asks (does not invent). No new colors, type sizes, or spacing steps are invented; no Button/Card/Input kit, no shell chrome, and no Home section rebuild ship in this feature.

## Decision

**Chosen option**: Option 1: Hand map Figma tokens into Tailwind v4 `@theme` with local Satoshi and a temporary `/` sample

Map `design/design-system/bytespace.tokens.json` once into `app/globals.css` `@theme` (colors, fonts, font sizes with the named clamp formula on display/heading, spacing, elevation shadow, screens, containers, page padding). Keep Poppins via `next/font/google`. Load Satoshi via `next/font/local` from the two named `app/fonts/Satoshi-*.woff2` files. Add a tiny `components/layout/Container.tsx` helper. Replace the scaffold hello page at `/` with a light only full token matrix sample. JSON numbers win; markdown fills silent prose rules. No codegen script, no UI kit, no Home, no shell.

**Implementation skills**: `vercel-react-best-practices` (`vercel-labs/agent-skills`, `.agents/skills/vercel-react-best-practices/`) · `web-design-guidelines` (`vercel-labs/agent-skills`, `.agents/skills/web-design-guidelines/`) · `vercel-composition-patterns` (`vercel-labs/agent-skills`, `.agents/skills/vercel-composition-patterns/`)

### Implementation constraints (named so `/develop` does not invent them)

| Concern            | Decision                                                                                                                                                                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source of truth    | Numeric values from `bytespace.tokens.json` win; prose responsive rules from `bytespace.design-system.md` win when JSON is silent; same fact conflict → stop and ask. No live Figma re pull required for this feature                                                                     |
| Theme delivery     | Hand map into Tailwind v4 `@theme` in `app/globals.css`; keep existing Poppins CSS variable wiring in root layout                                                                                                                                                                         |
| Token names        | Brand aliases: `brand-lime`, `brand-violet`, `brand-blue`, `shuttle-gray` scale, `font-heading` / `font-body`, text utilities `text-display-{s,xs}`, `text-heading-{l,m,s,xs}`, `text-label-{xl,l,m,s,xs}`, `text-body-{l,m,s,xs}`, `shadow-elevation-a`, spacing from `baseSpacingScale` |
| Text utility shape | Each `text-{role}-{size}` sets font size + line height + letter spacing; apply token weight with `font-medium` (500) or `font-semibold` (600) beside it                                                                                                                                   |
| Satoshi files      | Exact paths: `app/fonts/Satoshi-Regular.woff2` (400) and `app/fonts/Satoshi-Medium.woff2` (500); upright only; no variable font; `/develop` stops if either is missing                                                                                                                    |
| Poppins            | Keep scaffold `next/font/google` Poppins 400/500/600/700                                                                                                                                                                                                                                  |
| Fluid type         | Display and heading only. For each token size `S` (px): `clamp(max(floor, 0.7*S), S * 100vw / 1440, S)` where `floor` is 28px for display roles and 20px for heading roles. Line height and letter spacing stay the fixed JSON values                                                     |
| Body / label mins  | Sample running body uses `text-body-s` then `md:text-body-m`; keep `text-body-xs` and `text-label-xs` as caption utilities only                                                                                                                                                           |
| Elevation          | Encode the eight `elevationA` layers as one CSS `box-shadow` list on `--shadow-elevation-a`; keep layer colors and offsets from JSON (round decimals to at most 2 places only when CSS needs it, never change the intent)                                                                 |
| Breakpoints        | Custom screens: `xs` 360, `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536                                                                                                                                                                                                            |
| Containers         | Below `lg`: width `100%`. At `lg` / `xl` / `2xl`: max width 960 / 1120 / 1280 px. Centered with `mx-auto`                                                                                                                                                                                 |
| Page padding       | 16px default, 24px from `md`, 32px from `lg` (wired in `Container`, not magic numbers on the sample)                                                                                                                                                                                      |
| Layout helper      | `components/layout/Container.tsx`: props `children` + optional `className` only; no `as` prop; padding/width only overridable via `className`                                                                                                                                             |
| Sample matrix      | Every color swatch, every type style once, every spacing step bar, one elevation card, one `Container`                                                                                                                                                                                    |
| Sample route       | Replace `app/page.tsx` content with the token proof; Home feature replaces it later                                                                                                                                                                                                       |
| Dark mode          | Remove scaffold dark `prefers-color-scheme` block and default dark `:root` colors                                                                                                                                                                                                         |
| Out of scope       | Component kit, app shell, Home, auth, data, git remote                                                                                                                                                                                                                                    |

## Feature design

**Data model sketch**:
None. No persistence.

**State transitions**:
None.

**API surface**:

| Endpoint              | Method | Key inputs | Key outputs                | Auth   | Key errors                |
| --------------------- | ------ | ---------- | -------------------------- | ------ | ------------------------- |
| `/` (App Router page) | GET    | none       | HTML sample proving tokens | public | none beyond Next defaults |

**Value sourcing**:

| Action                                  | Value produced / displayed                              | Source                                                                                                                                     |
| --------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Theme color utilities                   | Hex swatches on `/`                                     | `bytespace.tokens.json` → `colors.*`                                                                                                       |
| Theme type utilities                    | Font family, size, weight, line height, tracking on `/` | `bytespace.tokens.json` → `typography.*`; clamp formula from this spec constraints table; weight utilities paired per token weight         |
| Heading vs body font on `/`             | Poppins / Satoshi                                       | Poppins: existing `next/font/google` in `app/layout.tsx`; Satoshi: `next/font/local` from `Satoshi-Regular.woff2` + `Satoshi-Medium.woff2` |
| Spacing examples on `/`                 | Every scale step as a bar                               | `layout.baseSpacingScale` in tokens JSON                                                                                                   |
| Elevation sample on `/`                 | Box shadow                                              | `effects.elevationA` in tokens JSON → `shadow-elevation-a`                                                                                 |
| Container width and page padding on `/` | Max width and padding                                   | `layout.containers` (100% below `lg`) + page padding switches from this spec (`md` / `lg`)                                                 |
| Breakpoint behavior                     | Stack and padding changes across widths                 | `layout.breakpoints` in tokens JSON                                                                                                        |

**Key invariants**:

- Numeric values match JSON; markdown fills prose rules when JSON is silent; same fact conflict → stop and ask.
- No third party UI kit.
- Light theme only for this pass.
- Satoshi is the two named local `woff2` files only (no CDN, no variable font).

**Security model**:
Public static theme and sample page. No auth, no secrets, no PII.

**Configuration required**:
None beyond placing `app/fonts/Satoshi-Regular.woff2` and `app/fonts/Satoshi-Medium.woff2` on disk.

**Critical test scenarios** (each maps to an acceptance criterion in ## Requirements):

- Happy path: `/` renders every color swatch, every type style, every spacing step, elevation card, and Container; Poppins headings and Satoshi body are visible; sample body uses `text-body-s` / `md:text-body-m`, verifies **AC-1**, **AC-2**, **AC-3**, **AC-4**, **AC-5**, **AC-6**
- Failure case: either named Satoshi file missing → `/develop` stops and asks for those files (no silent fallback body font), verifies **AC-8**
- Drift case: a theme value that does not match JSON is corrected to the JSON value; same fact JSON vs markdown conflict stops the build; sample stays light only with dark block gone, verifies **AC-7**, **AC-9**
- Auth/permission: `/` stays public with no auth gate, verifies public sample in **AC-6**

## Build plan

Tracer Bullet order: fonts and theme first so the sample can prove the full token thread end to end, then the helper and page, then a drift pass.

1. [x] Confirm `app/fonts/Satoshi-Regular.woff2` and `app/fonts/Satoshi-Medium.woff2` exist; if missing, stop and ask you for them, satisfies **AC-8**
2. [x] Wire Satoshi with `next/font/local` in `app/layout.tsx` beside Poppins; expose `--font-heading` and `--font-body` into the theme, satisfies **AC-3**
3. [x] Hand map colors, typography (clamp formula + text utility shape from constraints), spacing, elevation, breakpoints, containers, and page padding into `app/globals.css` `@theme`; remove the dark `prefers-color-scheme` block and scaffold dark colors, satisfies **AC-1**, **AC-2**, **AC-4**, **AC-7**
4. [x] Add `components/layout/Container.tsx` (`children` + optional `className`) with 100% / max width and padding switches from constraints, satisfies **AC-5**
5. [x] Replace `app/page.tsx` with the full sample matrix (every color, every type style, every spacing step, elevation card, Container), satisfies **AC-6**
6. [x] Spot check theme values against JSON (and markdown when JSON is silent); confirm no kit/shell/Home work landed; `pnpm build` succeeds, satisfies **AC-9**

## Consequences

**Positive**:

- Later features (shell, Home) share one ByteSpace theme instead of reinventing hex and type.
- Exact Figma capture stays the contract; the sample makes drift visible early.
- Tailwind v4 `@theme` keeps tokens next to the app with no extra config file.

**Negative / tradeoffs**:

- Hand mapping can drift if Figma is refreshed; no codegen yet (follow up if refresh becomes frequent).
- Feature cannot finish until you supply Satoshi files.
- Temporary `/` sample will be thrown away when Home ships.

**Neutral**:

- Responsive foundation is folded into this feature (no separate scope row).
- Component patterns listed in the design markdown wait for shell/Home features.

## Follow-up

- [ ] When Figma tokens change often, consider a small JSON → `@theme` generator (not in this feature)
- [ ] Record design token conventions in root `AGENTS.md` via `/audit` or `/sync` after this ships
- [ ] Home and shell features consume these tokens; they replace the `/` sample
- [x] Tick the related follow up on spec 0001 once this feature maps `@theme` (design system row)

## Rationale

Reasoning and options: see [rationale.md](./rationale.md).
