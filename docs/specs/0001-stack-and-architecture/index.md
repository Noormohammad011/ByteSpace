# 0001. Stack and architecture for ByteSpace frontend

**Date**: 2026-09-29
**Status**: Done

## Summary

This decision picks the base tools for the ByteSpace course website frontend. You will use Next.js with the App Router (the modern Next page and layout model), TypeScript, pnpm, and Tailwind CSS v4. The first scaffold has no database and no auth yet. Hosting is aimed at Vercel. `/develop` will create the empty app from this stack table and the scaffold constraints below.

## Decision

**Chosen option**: Option 1: Next.js App Router marketing site on TypeScript, pnpm, and Tailwind v4

Scaffold a single Next.js App Router app in the existing `frontend` root with TypeScript strict mode, pnpm, Tailwind CSS v4, ESLint Next defaults, Prettier, Turbopack for local `next dev`, root `app/` (no `src/`), and the `@/` import alias. Defer database and auth. Target Vercel for deploy later. Keep ByteSpace tokens for the design system feature; do not add a third party UI kit in the scaffold.

**Implementation skills**: `vercel-react-best-practices` (`vercel-labs/agent-skills`, `.agents/skills/vercel-react-best-practices/`) · `vercel-composition-patterns` (`vercel-labs/agent-skills`, `.agents/skills/vercel-composition-patterns/`) · `web-design-guidelines` (`vercel-labs/agent-skills`, `.agents/skills/web-design-guidelines/`) · `vercel-optimize` (`vercel-labs/agent-skills`, `.agents/skills/vercel-optimize/`) · `deploy-to-vercel` (`vercel-labs/agent-skills`, `.agents/skills/deploy-to-vercel/`)

### Scaffold constraints (named so `/develop` does not invent them)

| Concern                 | Decision                                                                                                                                                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Node                    | `package.json` `engines.node` `>=20`; add `.nvmrc` with `20` (aligns with current Vercel Node defaults)                                                                                                                                        |
| create-next-app command | From repo root: `pnpm create next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --turbopack --use-pnpm` (adjust only if the CLI renames a flag; keep the same meaning)                                 |
| Preserve existing tree  | Before scaffold, confirm `design/`, `docs/`, `.agents/`, `.cursor/`, and `change.md` stay. Never delete them. If create-next-app refuses a nonempty dir, scaffold into a temp folder and merge app files in without overwriting design or docs |
| Path alias              | `tsconfig.json` `compilerOptions.paths`: `"@/*": ["./*"]`                                                                                                                                                                                      |
| PostCSS                 | `postcss.config.mjs` with plugin `@tailwindcss/postcss` only (Tailwind v4 path)                                                                                                                                                                |
| Format                  | Install `prettier` and `eslint-config-prettier`. `.prettierrc.json`: `semi: false`, `singleQuote: true`, `trailingComma: "es5"`                                                                                                                |
| Env                     | No `.env.example`. Keep `.env.local` gitignored. No secrets in scaffold                                                                                                                                                                        |
| Fonts                   | In root layout, load Poppins via `next/font/google` with weights `400`, `500`, `600`, `700`. Satoshi waits for the design system feature (local or licensed files)                                                                             |
| Design exports          | One time copy `design/figma-assets/exports/*` → `public/assets/exports/` during scaffold so Home can reference them later                                                                                                                      |

## Proposed stack

| Layer             | Choice                                                             | Reason                                                                           |
| ----------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Application shape | Next.js App Router marketing / course site                         | Matches public ByteSpace pages and Tracer Bullet UI first slices                 |
| Runtime           | Node `>=20` (`.nvmrc` `20`)                                        | Matches current Vercel Node defaults; avoids old Next 16 toolchains              |
| Language          | TypeScript (strict)                                                | Scope already requires TypeScript; catches UI contract mistakes early            |
| Package manager   | pnpm                                                               | Scope already requires pnpm; first class with `create-next-app --use-pnpm`       |
| Framework         | Next.js latest via `create-next-app` (App Router, React 19.2 era)  | Current greenfield default; App Router is the supported new path                 |
| Styling           | Tailwind CSS v4 + `@tailwindcss/postcss` in `postcss.config.mjs`   | Current create-next-app default; `@theme` maps cleanly to ByteSpace tokens later |
| Project layout    | `app/` at repo root (no `src/`); preserve `design/` and `docs/`    | Matches create-next-app defaults; keeps design assets beside the app             |
| Path alias        | `@/` → `./*` in `tsconfig.json`                                    | Default and simple for imports                                                   |
| Lint              | ESLint with Next defaults                                          | Enough until `/audit` deepens tooling                                            |
| Format            | Prettier + `eslint-config-prettier` (no semicolons, single quotes) | Matches project frontend conventions already in Cursor rules                     |
| Dev bundler       | Turbopack for `next dev`                                           | Current create-next-app default                                                  |
| Images            | `next/image`; exports mirrored under `public/assets/exports/`      | Fits a visual marketing site                                                     |
| Fonts             | `next/font/google` Poppins 400/500/600/700; Satoshi later          | Matches ByteSpace type without loading a UI kit early                            |
| UI kit            | None in scaffold                                                   | Design system feature owns tokens and primitives                                 |
| Primary DB        | Deferred (none in scaffold)                                        | Scope defers data model; Home can ship as UI first                               |
| Auth              | Deferred (none in scaffold)                                        | Register and Login are deferred in scope                                         |
| Env               | `.env.local` gitignored; no example env file                       | Ready for later secrets without inventing vars now                               |
| Hosting           | Vercel (decision only; no deploy in this feature)                  | Natural fit for Next App Router                                                  |
| Observability     | Deferred past scaffold                                             | Add structured logging and error tracking when a real runtime path exists        |

## Consequences

**Positive**:

- You get a current Next 16 style App Router baseline that matches official docs and Vercel skills.
- Design assets in `design/` can stay next to the app without a monorepo yet.
- Tailwind v4 `@theme` is a clean handoff into the ByteSpace token feature.
- Scaffold constraints name Node, CLI flags, fonts, Prettier, PostCSS, and asset copy so `/develop` is not guessing.

**Negative / tradeoffs**:

- Tailwind v4 has a higher browser floor than v3 (Safari 16.4+, Chrome 111+, Firefox 128+).
- Scaffolding into a nonempty root may need a merge if create-next-app refuses the directory.
- No DB or auth in the scaffold means later features must introduce them deliberately (good for order, a second decision each).
- One time export copy can drift from Figma until a later refresh step exists.

**Neutral**:

- MCP helpers chosen for this stack: connect `next-devtools-mcp` and `tailwindcss-mcp` in your Cursor MCP settings (agent cannot finish OAuth or MCP config for you).
- Installed project skills live under `.agents/skills/` and should be listed in root `AGENTS.md` by `/audit` or `/sync`.

## Follow-up

- [ ] Record installed Vercel skills in root `AGENTS.md` `## Agent skills` (project wide) via `/audit` or `/sync`
- [ ] Connect MCP: `next-devtools-mcp` (`npx -y next-devtools-mcp@latest`) and `tailwindcss-mcp` in Cursor MCP settings
- [x] Design system and UI foundation maps `design/design-system/bytespace.tokens.json` into Tailwind `@theme` (spec [0002](../0002-design-system-and-ui-foundation/index.md))
- [ ] Later enroll database and auth specs when those deferred scope rows become active

## Rationale

Reasoning and options: see [rationale.md](./rationale.md).
