# Rationale: 0002 Design system and UI foundation

## Context

ByteSpace already has a Figma derived token pack under `design/design-system/` (JSON plus markdown, including responsive rules). The Next.js scaffold from spec 0001 loads Poppins and ships a default Tailwind theme with a dark preference block. Scope feature 2 asks for a bootstrap only pass: wire those tokens into the app so fonts, sizes, color, space, elevation, and layout match Figma exactly, without a component kit, shell, or Home rebuild.

Without this decision, every later screen invents values or copies hex by hand, and the scaffold dark block fights a light only capture. The consequence of not deciding is visual drift and blocked shell/Home work.

## Options considered

### Option 1: Hand map tokens into Tailwind v4 `@theme` with local Satoshi and a `/` sample

Copy values once from the JSON into `app/globals.css` `@theme`, load Satoshi from local `woff2`, prove on a temporary `/` page, add one Container helper.

**Pros**:

- Smallest path that matches the existing Tailwind v4 stack
- Exact values stay reviewable next to the source JSON
- Sample gives `/check verify` something real to open

**Cons**:

- Manual remapping if Figma refresh is frequent
- Needs you to supply Satoshi files before finish

### Option 2: Build time codegen from JSON to CSS

Add a script that generates theme CSS from `bytespace.tokens.json` on each build.

**Pros**:

- Lower drift when tokens change often

**Cons**:

- Extra moving parts for a one time bootstrap
- Overkill until refresh cadence is proven

### Option 3: Theme tokens only, no sample route

Wire `@theme` and fonts, leave `/` as the scaffold hello page.

**Pros**:

- Slightly less UI work

**Cons**:

- Harder to verify fonts, clamp, container, and overflow without a dedicated surface
- Beta verify has nothing concrete to watch

### Option 4: Pull live from Figma MCP during build

Treat the JSON as a hint and re extract from Figma while building.

**Pros**:

- Always fresh from the design tool

**Cons**:

- Needs live MCP and edit access every build
- Fights the already captured source of truth you asked to use

## Rationale

Option 1 fits Tracer Bullet and the scope “bootstrap only” line. The capture already exists, Tailwind v4 `@theme` is the handoff named in spec 0001, and a temporary `/` sample closes the verify loop without pulling Home forward. Codegen (Option 2) can wait until token churn hurts. Skipping the sample (Option 3) weakens Beta proof. Live Figma pulls (Option 4) add coupling you explicitly did not want for this pass.

Local Satoshi keeps licensing honest. Removing scaffold dark mode avoids inventing a dark palette the capture does not define. Folding responsive rules into this feature matches your replan (no separate responsive row).

Cross check follow ups closed in the build spec: named clamp formula and floors, body min rule scoped to sample running copy (12px tokens kept for captions), full text utility naming and weight pairing, exact Satoshi filenames, page padding at `md`/`lg`, Container API and 100% width below `lg`, exhaustive sample matrix, and JSON vs markdown precedence.
