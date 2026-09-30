# Rationale: 0003 Home core loop

## Context

ByteSpace already has a Figma Home frame (`1:1067`), design tokens (spec 0002), and a temporary token sample on `/`. The scope Slice 1 asks for a thin end to end Home thread. The engineer asked for exact Figma design first, dummy data in a `data/` folder for loops, Figma pulls for missing assets, and responsive work later. Without this decision, `/develop` would guess section order, invent course content, or start responsive before desktop match.

## Options considered

### Option 1: Exact desktop Home on `/` from Figma with `data/` dummies

Full page sections, static typed dummy modules, Figma asset export for gaps, stub interactions, responsive deferred.

**Pros**:

- Matches the stated goal of exact design first
- Keeps Tracer Bullet moving without a backend
- Clear asset and data homes for later slices

**Cons**:

- Mobile/responsive remains unfinished until a follow up
- Temporary ownership of nav/footer inside Home

### Option 2: Thin Home (hero + courses + footer only)

**Pros**: Faster first paint of a slice

**Cons**: Breaks “exact design” for the full Figma page

### Option 3: Home behind a real API and CMS

**Pros**: Closer to production data flow

**Cons**: Scope deferred data/API; slows exact UI match

### Option 4: Responsive and desktop in one pass

**Pros**: One feature closes more devices

**Cons**: Conflicts with the engineer’s explicit exact first priority

## Rationale

Option 1 is the only option that honors exact Figma desktop match, dummy `data/` loops, and deferred responsive without inventing a backend. Shell extraction waits so Home can hit pixel parity without another foundation gate. Token sample replacement on `/` keeps a single product entry point.

Cross check follow ups closed in the build spec: section node map, asset folder contract, verbatim copy policy, tab filter behavior, stub href table, metadata strings, EmptyList API, and scope Done when aligned to desktop first.
