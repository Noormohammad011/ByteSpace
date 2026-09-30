# ByteSpace Design System (From Figma MCP)

Source file:

- https://www.figma.com/design/0oRvChkmu1Firdw5RTV0OM/ByteSpace-New-Check-website--Copy-?t=QCX6TZuvpAApAXx5-0

This design system is extracted from the duplicated Figma file using MCP, with `Home` (`1:1067`) as the primary source of tokens and patterns.

## 1) Foundations

### Color palette

- Accent: Electric Lime (`#D4FB20`, `#CBFC01`)
- Secondary accent: Electric Violet (`#7F30F7`, `#300B6A`)
- Support accent: Persian Blue (`#003BE2`)
- Neutral system: Shuttle Gray 50-950 and Black/White

### Typography

- Headings / displays: `Poppins` (500-600), tight negative tracking
- Body / labels: `Satoshi` (400-500), readable line heights

Recommended fallback stack:

- `Poppins, Inter, "Segoe UI", sans-serif`
- `Satoshi, Inter, "Segoe UI", sans-serif`

### Effects

- Primary elevation token: `elevationA` (8-layer progressive drop-shadow)

### Motion

Source of truth is the `motion` group in `bytespace.tokens.json`. `app/globals.css` mirrors it as `--motion-*` variables and `lib/motion.ts` imports the JSON for Motion for React, so change the JSON and the CSS together.

- Durations: `fast 160ms` (press), `base 240ms` (hover, page fade out, tab crossfade), `enter 560ms` (above the fold entrance, page fade in), `reveal 640ms` (scroll reveal), `float 7s` (one full ornament float cycle)
- Easings: `out cubic-bezier(0.22, 1, 0.36, 1)` for entrances and reveals, `inOut cubic-bezier(0.45, 0, 0.55, 1)` for the float
- Distances: `enter 16px`, `reveal 24px`, `page 12px`, `float 8px` (each way), `hover 2px` (button lift)
- Press scale `0.97`, stagger `80ms` between items
- Only `transform` and `opacity` animate. With `prefers-reduced-motion: reduce`, everything is still and fully visible.

### Layout primitives

- Desktop frame width: `1440`
- Grid: `12` columns, `120px` rhythm observed in guide layers
- Base spacing scale: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 72, 96, 120`

## 2) Screen Inventory

Top-level frame mapping:

- `Home`: `1:1067`
- `Register`: `47:351`
- `Login`: `49:195`
- `Search Page`: `55:117`
- `Course Details`: `55:4066`
- `Course Lessons`: `60:102`
- `Course Reviews`: `60:681`
- `Creator Profile`: `60:1878`
- `404 Not Found`: `63:252`

## 3) Reusable Component Patterns

- Header shell: logo left, action cluster right
- Hero: display heading, supporting text, CTA pair
- Course card: media top, metadata row, rating, price, action
- Form stack: label + input container + submit action
- Social proof cluster: avatars + count badge

## 4) Tailwind Mapping (Implementation Ready)

Suggested token mapping:

- Color tokens -> `theme.extend.colors`
- Font families -> `theme.extend.fontFamily`
- Font sizes/line heights -> `theme.extend.fontSize`
- Shadow token `elevationA` -> `theme.extend.boxShadow.card`
- Spacing scale -> `theme.extend.spacing`

Example:

```ts
export const themeExtension = {
  colors: {
    brand: {
      lime: { 400: '#D4FB20', 500: '#CBFC01' },
      violet: { 600: '#7F30F7', 950: '#300B6A' },
      blue: { 800: '#003BE2' },
    },
    gray: {
      50: '#F5F5F6',
      100: '#E5E6E8',
      200: '#CED0D3',
      300: '#ABAEB5',
      400: '#82868E',
      700: '#4B4C53',
      900: '#3A3B3F',
      950: '#242528',
    },
  },
  fontFamily: {
    heading: ['Poppins', 'Inter', 'Segoe UI', 'sans-serif'],
    body: ['Satoshi', 'Inter', 'Segoe UI', 'sans-serif'],
  },
}
```

## 5) Files Generated

- `design/design-system/bytespace.tokens.json`
- `design/figma-assets/exports/*`
- `design/figma-assets/home/raw/*`
- `design/figma-assets/home/svg/*`

If you want, next I can generate:

- a ready-to-paste `tailwind.config` extension file
- `:root` CSS variables from these tokens
- starter React components (`Button`, `Card`, `Input`, `SectionHeader`) aligned to this system

## 6) Responsive Rules (100% Responsive Baseline)

### Breakpoints

- `xs`: 360
- `sm`: 640
- `md`: 768
- `lg`: 1024
- `xl`: 1280
- `2xl`: 1536

### Layout rules

- Mobile first only: always define base styles first, then add `sm:` to `2xl:` overrides
- Container widths: fluid until `lg`, then cap using `960` (`lg`), `1120` (`xl`), `1280` (`2xl`)
- Page padding: `16px` mobile, `24px` tablet, `32px` desktop
- Content width (`layout.content.max`): `1200px` from `xl`. The `Container` caps at `1264px` (`layout.content.shellMax`, the 1200 content plus 32px padding each side), Tailwind `max-w-shell`; `max-w-content` is the bare 1200 box
- Radius (`radius.card`, `radius.pill`): `16px` for cards and floating panels (`rounded-card`, also shadcn `--radius`), `24px` for pills, buttons, inputs and tab triggers (`rounded-pill`)
- Never hardcode full-section heights on mobile; use content-driven vertical spacing
- Convert horizontal groups to vertical stack below `md` unless interaction requires side-by-side

### Typography rules

- Use `clamp()` for display/headline styles to avoid overflow between `360` and `1536`
- Heading tokens reach their Figma size at `1280` and their minimum at `360`, with unitless line heights so lines never overlap:
  - `heading-l`: `clamp(2.5rem, 1.7174rem + 3.4783vw, 4.5rem)`, line height `1.2` (72px at `xl`)
  - `heading-m`: `clamp(2rem, 1.7065rem + 1.3043vw, 2.75rem)`, line height `1.2` (44px at `xl`)
  - `heading-s`: `clamp(1.25rem, 1.1522rem + 0.4348vw, 1.5rem)`, line height `4/3` (24px at `xl`)
- `body-l` is `16px` below `md` and `18px` from `md`, line height `1.6`
- Body text minimum: `14px` on mobile, `16px` from `md` and up
- Keep heading line breaks intentional with max-width constraints, not manual `<br>` tokens

### Component rules

- Buttons and inputs minimum touch height: `44px`
- Form rows become single-column below `md`
- Cards in lists/grids:
  - `1` column at mobile
  - `2` columns at `md`
  - `3+` columns at `xl` if content allows
- Avatar clusters and icon rows must wrap on `sm` and below

### Media rules

- Images/video/illustrations must use intrinsic ratio wrappers (`aspect-*`) + `object-cover`
- SVG icons scale via parent font-size/container constraints, not fixed pixel width only
- Decorative background assets should be hidden/reduced on small screens to preserve readability

### Accessibility + resilience rules

- Preserve AA contrast in every breakpoint/theme variation
- Prevent horizontal scrolling at all sizes (`overflow-x-hidden` only when root cause is fixed)
- Respect zoom up to 200% without clipping critical content or CTA controls
