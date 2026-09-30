# 0003. Home core loop (exact desktop Home page)

**Date**: 2026-09-29
**Status**: Done

## Summary

This decision builds the ByteSpace Home page from Figma frame `1:1067` as an exact desktop (1440) match on `/`. Dummy content lives in a root `data/` folder and drives loops for courses, categories, partners, and testimonials. Missing images are pulled from Figma during build. Responsive layouts wait for a later pass. Nav and footer ship with Home for pixel match; a shared app shell can extract them later.

## Requirements

**User stories**:

- As a visitor, I want to open `/` and see the full ByteSpace Home matching the Figma desktop design so I can browse the product story without signing in.
- As a frontend engineer, I want Home content in `data/` modules so lists and cards loop from one place without inventing an API.

**Acceptance criteria** (the contract, each criterion is IDed and independently checkable):

- **AC-1**: Route `/` replaces the token sample and renders the full Home page sections from Figma `1:1067` in order: header/nav, hero, partners, courses (with category tabs), category paths, growth/stats, creator, CTA, testimonials, footer.
- **AC-2**: At desktop width 1440 the layout and visual hierarchy match the Figma Home frame (exact design first). Responsive breakpoints are out of scope for this feature and must not be treated as done criteria.
- **AC-3**: Home uses ByteSpace theme tokens from spec 0002 (colors, fonts, type, spacing, elevation) wherever the design maps; fixed 1440 section widths/padding may be used to hit exact desktop match even if Container max width utilities are still incomplete.
- **AC-4**: Root `data/` contains typed dummy modules for `navLinks`, `courses`, `categoryTabs`, `categoryPaths`, `partners`, `stats`, `testimonials`, `footerColumns`, plus `home` content (hero/CTA copy), and a barrel export; Home sections loop over these lists (no database, no API routes).
- **AC-5**: Course cards, category path cards, partner logos, and testimonials render from `data/` (not hard coded one offs for each card).
- **AC-6**: Any asset required by Home that is missing from `public/assets/home/` is exported from Figma (file `0oRvChkmu1Firdw5RTV0OM`, Home `1:1067` and child nodes) into that folder during `/develop`; if MCP/auth fails, `/develop` stops and asks you (no invented stock photos).
- **AC-7**: Interactive controls are present for exact UI (nav, Search, Join, Sign In, Join as Creator, newsletter) but do not call real backends; hrefs may be `#` or stub paths.
- **AC-8**: `/` sets Next.js metadata: title, description, and an Open Graph image from an existing Home export or hero asset.
- **AC-9**: Section UI lives under `components/home/` (one component per major section or clear shared card); `app/page.tsx` composes them.
- **AC-10**: A reusable empty list UI path exists for course/testimonial style lists, but the default `data/` set is populated so the happy path matches Figma; no auth, no persistence, no component kit beyond Home needs.

## Decision

**Chosen option**: Option 1: Exact desktop Home on `/` from Figma, fed by `data/` dummies, assets from Figma as needed

Build the full Home marketing page as a UI first Tracer Bullet on `/`, matching Figma `1:1067` at 1440px. Source design from the Figma file and local captures. Put looping content in root `data/*.ts` modules. Export missing assets via Figma MCP into `public/assets/home/`. Stub interactions. Defer responsive polish and shared app shell extraction. Use ByteSpace tokens from 0002 where they fit.

**Implementation skills**: `vercel-react-best-practices` (`vercel-labs/agent-skills`, `.agents/skills/vercel-react-best-practices/`) · `vercel-composition-patterns` (`vercel-labs/agent-skills`, `.agents/skills/vercel-composition-patterns/`) · `web-design-guidelines` (`vercel-labs/agent-skills`, `.agents/skills/web-design-guidelines/`)

### Implementation constraints (named so `/develop` does not invent them)

| Concern          | Decision                                                                                                                                                                                                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Design source    | Figma file `0oRvChkmu1Firdw5RTV0OM`, Home node `1:1067`; reference `design/figma-assets/exports/home.png`                                                                                                                                                                                             |
| Section node map | Hero `1:1695` (includes header chrome in frame or adjacent); Partners `1:1794`; Course tabs `21:33`; Course grid `33:683`; Category paths `34:725`; Growth `34:684`; Creator `34:1159`; CTA `34:1161`; Testimonials `34:1175`; Footer `34:1256`. `/develop` follows live Figma names if labels differ |
| Exactness        | Desktop 1440 exact match first; verify by comparing `/` at 1440 to `design/figma-assets/exports/home.png` (section order and hierarchy). Responsive deferred                                                                                                                                          |
| Copy policy      | Verbatim visible Figma text in `data/`; invent only when a string is not in the frame, mark invents with a `// invented:` comment                                                                                                                                                                     |
| Route            | `/` is Home (token sample removed)                                                                                                                                                                                                                                                                    |
| Data             | Root `data/` TypeScript modules + barrel; static imports only                                                                                                                                                                                                                                         |
| Entities         | NavLink, Course, CategoryTab, CategoryPath, Partner, Stat, Testimonial, FooterColumn, HomeContent (fields as in Feature design)                                                                                                                                                                       |
| Course tabs      | Client filter on `categoryTabId`; default active tab `featured`; empty filtered set uses `EmptyList`                                                                                                                                                                                                  |
| Stub hrefs       | Nav Home `/`; Courses `/#courses`; Creators `/#creator`; Careers `/#`; Sign In `/#sign-in`; Join Us `/#join`; Join as Creator `/#creator`; Search and newsletter submit are no ops; footer links `/#`                                                                                                 |
| Assets           | Runtime under `public/assets/home/{hero,partners,courses,categories,creator,testimonials,icons}/`; kebab filenames from Figma layer names; export `@2x` PNG (SVG when the node is vector). OG may use `public/assets/exports/home.png`                                                                |
| Components       | `components/home/*` sections; `EmptyList.tsx` with `title` + `description`; shared cards when repeated                                                                                                                                                                                                |
| Chrome           | Header and footer included in Home for exact match; app shell feature may extract later                                                                                                                                                                                                               |
| Interactions     | Visual stubs only (no search API, cart, auth, payments)                                                                                                                                                                                                                                               |
| SEO              | title `ByteSpace                                                                                                                                                                                                                                                                                      | Courses for creators and learners`; description from hero support line in `data/home.ts`; OG image `/assets/exports/home.png` |
| Design system    | Prefer 0002 tokens; fixed desktop widths allowed; Container AC-5 fix is not a hard gate for Home                                                                                                                                                                                                      |
| Out of scope     | Responsive layouts, real API/DB, auth, shell extraction, other screens                                                                                                                                                                                                                                |

## Feature design

**Data model sketch**:
Static dummy only (no migration).

| Entity       | PK         | Fields (required unless noted)                                                                                                | Rel                    |
| ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| NavLink      | id: string | label, href                                                                                                                   | —                      |
| CategoryTab  | id: string | label                                                                                                                         | —                      |
| Course       | id: string | title, thumbnail, rating: number, priceLabel, badge?: string, instructorName, instructorAvatar, categoryTabId                 | N→1 CategoryTab        |
| CategoryPath | id: string | name, icon                                                                                                                    | —                      |
| Partner      | id: string | name, logo                                                                                                                    | —                      |
| Stat         | id: string | label, value                                                                                                                  | —                      |
| Testimonial  | id: string | name, role, quote, avatar                                                                                                     | —                      |
| FooterLink   | —          | label, href                                                                                                                   | nested in FooterColumn |
| FooterColumn | id: string | title, links: FooterLink[]                                                                                                    | —                      |
| HomeContent  | singleton  | heroTitle, heroBody, heroSearchPlaceholder, section titles/bodies, creator bullets, ctaTitle, ctaButtonLabel, newsletterTitle | —                      |

**State transitions**:
None (static page).

**API surface**:

| Endpoint | Method | Key inputs | Key outputs                          | Auth   | Key errors                |
| -------- | ------ | ---------- | ------------------------------------ | ------ | ------------------------- |
| `/`      | GET    | none       | Full Home HTML from `data/` + assets | public | none beyond Next defaults |

**Value sourcing**:

| Action                   | Value produced / displayed                  | Source                                                                                             |
| ------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Render nav               | link labels/hrefs                           | `data/navLinks.ts`                                                                                 |
| Render hero              | title, body, search placeholder, hero image | `data/home.ts` + `public/assets/home/*` (Figma if missing)                                         |
| Render partners          | logos                                       | `data/partners.ts` + assets                                                                        |
| Render course tabs/cards | tabs, course fields                         | `data/categoryTabs.ts`, `data/courses.ts`                                                          |
| Render category paths    | name, icon                                  | `data/categoryPaths.ts` + assets                                                                   |
| Render stats             | label, value                                | `data/stats.ts`                                                                                    |
| Render creator/CTA copy  | titles, bullets, button                     | `data/home.ts`                                                                                     |
| Render testimonials      | quote cards                                 | `data/testimonials.ts` + assets                                                                    |
| Render footer            | columns, newsletter stub                    | `data/footerColumns.ts`, `data/home.ts`                                                            |
| Metadata                 | title, description, OG image                | title/description from constraints table + `data/home.ts` hero body; OG `/assets/exports/home.png` |
| Course tab filter        | filtered course list                        | `data/courses.ts` filtered by active `CategoryTab.id` (client state)                               |
| Empty courses tab        | empty UI                                    | `components/home/EmptyList.tsx`                                                                    |

**Key invariants**:

- Happy path `data/` lists are non empty so Figma match holds.
- No real network calls for Home content.
- Pixel target is desktop 1440; responsive is explicitly deferred.

**Security model**:
Public page. No auth. No secrets. Dummy names/avatars are fictional.

**Configuration required**:
None beyond Figma MCP access when exporting missing assets.

**Critical test scenarios**:

- Happy path: `/` shows all sections with looped cards from `data/`, verifies **AC-1**, **AC-4**, **AC-5**, **AC-9**
- Exactness: at 1440 width, section order and key visuals match Figma Home, verifies **AC-2**, **AC-3**
- Assets: missing file triggers Figma export into `public/assets/home/` (or stop if MCP fails), verifies **AC-6**
- Stubs: Search/Join/Sign In do not hit backends, verifies **AC-7**
- SEO: document title/description/OG present, verifies **AC-8**
- Auth/permission: `/` is public, verifies public access in **AC-10**

## Build plan

Tracer Bullet: stand up `/` with data + one thin section path, then thicken to full page exact match.

1. [x] Create `data/` modules and barrel with populated dummy content matching Figma copy counts (courses, tabs, paths, partners, stats, testimonials, nav, footer, home content), satisfies **AC-4**, **AC-5**
2. [x] Inventory required images vs `public/assets/home/`; export gaps from Figma into that folder (stop if MCP fails), satisfies **AC-6**
3. [x] Scaffold `components/home/` section shells and replace `app/page.tsx` to compose them on `/` using `data/`, satisfies **AC-1**, **AC-9**
4. [x] Implement each section to desktop 1440 exact match (header through footer), using ByteSpace tokens where mapped, satisfies **AC-2**, **AC-3**
5. [x] Wire stub interactions and empty list helper (unused on happy path), satisfies **AC-7**, **AC-10**
6. [x] Add metadata (title, description, OG), run build, visual check against `home.png` / Figma at 1440, satisfies **AC-8**, **AC-2**

## Consequences

**Positive**:

- Visitors see the real marketing Home quickly.
- `data/` keeps loops honest without a backend.
- Exact desktop match reduces design drift before responsive work.

**Negative / tradeoffs**:

- Responsive debt is explicit; mobile will not be “done” here.
- Home owns chrome until shell extraction, so some duplication risk later.
- Figma MCP needed when assets are missing.

**Neutral**:

- Token sample on `/` goes away.
- Design system Container max width bug may remain; Home can still ship with fixed desktop widths.

## Follow-up

- [ ] Enroll or run a responsive Home pass after desktop match (from this feature)
- [ ] `/architect app shell and route structure` to extract shared header/footer when ready
- [ ] Fix design system Container max width tokens (spec 0002 AC-5) if still open
- [ ] Record Home/`data/` conventions via `/sync` after ship

## Rationale

Reasoning and options: see [rationale.md](./rationale.md).
