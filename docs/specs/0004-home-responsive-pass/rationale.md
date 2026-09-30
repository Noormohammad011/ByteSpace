# 0004. Home responsive pass: rationale

## Context

Home (spec 0003) was built as an exact 1440 desktop match. Sections use fixed widths and absolute positions measured from the Figma frame, the header centers its nav with absolute offsets, and overlapping compositions (hero visual, Growth cluster, Creator cluster) are placed in desktop pixels. Below roughly 1200px these layouts clip, and at 360px the hero headline, search bar and floating cards are cut off. The page does not scroll sideways only because sections hide their overflow.

The only design source is the 1440 Figma frame plus the responsive rules in `bytespace.design-system.md` (breakpoints 360 to 1536, mobile first, stack below `md`, fluid headings, reduce decoration on small screens, 44px targets). There are no mobile frames, so mobile layouts must be derived, not copied.

The engineer set three constraints: use shadcn for every interactive primitive on Home (Sheet, Button, Input, Tabs, Card, Avatar), put a hamburger on the right on mobile that opens a panel from the right, and leave the code in small single purpose pieces. The header built here must be liftable by the later app shell feature. Desktop fidelity must not regress, since it was the point of 0003.

## Options considered

### Option 1: Fix in place, section by section, with a CSS only scaled canvas

Keep each section, add shadcn and width/type primitives, then make sections responsive one at a time. Overlapping compositions reuse their desktop position constants inside a canvas that scales per breakpoint band using CSS variables only.

**Pros**:

- 1440 stays verifiable after every step; small, reversible changes.
- One composition source of truth for desktop and mobile; no JavaScript.

**Cons**:

- Stepped scaling leaves spare space between band edges.
- Scaled card text is small on narrow phones.

### Option 2: Separate mobile and desktop trees

Render a purpose built mobile layout below `xl` and the current desktop layout above, switching with `hidden`/`xl:block`.

**Pros**:

- Each tree is simple and fully tuned to its size.

**Cons**:

- Two copies of every section to maintain; content drift between them.
- Both trees ship in the HTML, doubling markup and images.

### Option 3: Rewrite Home mobile first from scratch

Start over with fluid layouts for all sizes and rebuild the desktop match on top.

**Pros**:

- Cleanest end state, no desktop pixel constants.

**Cons**:

- Throws away a verified 1440 match and earns it again; a big bang rewrite with the highest regression risk.

### Option 4: Fix in place with JavaScript measured scaling

Same as Option 1, but a small client component measures the container with a resize observer and sets an exact scale.

**Pros**:

- Perfectly fluid scaling at every width.

**Cons**:

- Adds client JavaScript and a layout shift between server render and first measurement; three compositions become client boundaries or wrappers.

## Rationale

Option 1 is chosen because the desktop match is the asset worth protecting, and an in place refactor keeps it checkable at every step (strangler instinct applied to a page). Separate trees (Option 2) would double the surface the engineer asked to keep small and clean. A rewrite (Option 3) re earns fidelity that already exists. Measured scaling (Option 4) buys smoothness at the cost of client JavaScript and a visible shift on load; stepped CSS scaling is good enough for decorative compositions and keeps every section a server component.

shadcn on Radix is the engineer's constraint; Radix was picked over Base UI because it is the long standing default with the most examples, and its Dialog based Sheet already provides focus trapping, scroll lock, Escape handling and focus return, which the menu acceptance criteria require. Mapping shadcn's semantic variables to ByteSpace tokens keeps one source of truth for color, and variants inside the copied components keep call sites short.

Small decisions made with full context: shadcn's standard `cn` replaces the `cn` package so the project has one class merge helper (runner up: keep the re export); Figma icons stay and lucide fills only the icons Figma lacks, protecting the visual match; the hero image switches from the deprecated `priority` to `loading="eager"` with `fetchPriority="high"` as the Next 16 docs advise; heading tokens are retuned to hit their Figma size at `xl` instead of 1440, because `xl` is where the exact layout now starts.
