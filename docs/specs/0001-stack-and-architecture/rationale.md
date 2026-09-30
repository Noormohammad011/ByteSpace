# Rationale: Stack and architecture for ByteSpace frontend

## Context

> Premise note: The scope already names Next.js, TypeScript, pnpm, and Tailwind. This spec does not reopen that product choice. It locks the finer greenfield setup (App Router, Tailwind major, layout, what to defer) so `/develop` scaffolds without inventing defaults.

ByteSpace needs a runnable frontend base before design tokens, shell, and Home can land. There is no app source yet (design system files and Figma exports only). Without a recorded stack, every later feature would re decide create-next-app flags and fight inconsistent folders.

Not deciding now leaves `/develop` free to invent package manager, router, or Tailwind major. That is expensive to undo once Home and the shell exist.

Build approach from scope: Tracer Bullet. Foundations first, then a thin Home thread. The stack must support a real Next app with real UI, not a throwaway prototype.

## Options considered

### Option 1: Next.js App Router site with TypeScript, pnpm, Tailwind v4

Greenfield create-next-app defaults aligned to the scope: App Router, TypeScript, pnpm, Tailwind v4, ESLint, Turbopack, root `app/`, no UI kit, no DB or auth yet, Vercel as host target.

**Pros**:

- Matches current official Next and Tailwind paths
- Lowest friction for Vercel deploy later
- Leaves room for ByteSpace tokens in a dedicated feature

**Cons**:

- Tailwind v4 browser floor is stricter than v3
- Scaffold into a nonempty `frontend` root needs careful flags

### Option 2: Next.js Pages Router or older Tailwind v3

Keep Pages Router and or Tailwind v3 for familiarity or older browser support.

**Pros**:

- Familiar for some teams; wider browser floor on Tailwind v3

**Cons**:

- Fights current create-next-app defaults and App Router docs
- Extra migration cost when the rest of the ecosystem assumes App Router

### Option 3: Monorepo or heavy product shell on day one

Scaffold `apps/web` plus packages, or install auth and DB clients before any UI.

**Pros**:

- Scales if many packages appear soon

**Cons**:

- Overbuilt for Foundation plus one Home flow
- Violates foundations first simplicity for this pass

## Rationale

Option 1 wins because the product is a public course website, the scope already chose Next plus TypeScript plus pnpm plus Tailwind, and the landscape check (2026-09-29) shows create-next-app landing on Next 16.x, React 19.2, and Tailwind v4 with App Router. Deferring DB and auth keeps the Tracer Bullet thread honest: prove UI and tooling first, then thicken. Vercel as the host target keeps deploy assumptions boring. Skipping a UI kit avoids fighting ByteSpace tokens before they are wired.

A cross check (another model) found eight unnamed scaffold details. Those are now locked in `index.md` under Scaffold constraints: Node 20, exact create-next-app flags, preserve `design/` and `docs/`, Poppins via `next/font/google`, one time export copy to `public/assets/exports/`, Prettier without semicolons, empty `.env.example`, Tailwind v4 PostCSS plugin, and explicit `@/*` paths.

## Landscape notes

Checked on 2026-09-29 via official docs and a live create-next-app probe: Next ~16.3.x, React ~19.2.x, Tailwind v4 with `@tailwindcss/postcss`, App Router default, Turbopack default for `next dev`, `src/` opt in only.

## References

**Project sources**:

- `docs/scope/scope.md` (Stack and architecture feature; build approach Tracer Bullet; workflow Beta)
- `design/design-system/bytespace.tokens.json` and `design/design-system/bytespace.design-system.md` (tokens deferred to the design system feature)
- Installed skills under `.agents/skills/` from `vercel-labs/agent-skills`

**Practices & standards**:

- Monolith first for a small marketing site
- Foundations before feature slices (Tracer Bullet)
- Prefer current framework defaults over custom snowflake scaffolds

**Links** (web verified during the design conversation):

- Installation: https://nextjs.org/docs/app/getting-started/installation
- App Router getting started: https://nextjs.org/docs/app/getting-started
- create-next-app CLI: https://nextjs.org/docs/app/api-reference/cli/create-next-app
- Upgrade to Next.js 16: https://nextjs.org/docs/app/guides/upgrading/version-16
- Install Tailwind with Next.js: https://tailwindcss.com/docs/installation/framework-guides/nextjs
- Tailwind v3 to v4 upgrade guide: https://tailwindcss.com/docs/upgrade-guide
- pnpm create: https://pnpm.io/cli/create
