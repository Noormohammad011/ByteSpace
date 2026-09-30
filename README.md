# ByteSpace

ByteSpace is a course marketplace frontend. Home, Register, and Login are built. They share one design system, one app shell, and one motion setup.

Live: [byte-space-green.vercel.app](https://byte-space-green.vercel.app)

## Run

Node.js 20 or newer, and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). `/register` and `/login` are the auth screens. `pnpm build` and `pnpm lint` check the app before a pull request.

## How I built it

This repo is agentic development, one feature at a time.

The plan is [`docs/scope/scope.md`](docs/scope/scope.md). Each row names the feature, the branch, the done condition, and where the code lives. Specs sit in [`docs/specs`](docs/specs). The changelog is [`change.md`](change.md).

`dev` is the integration branch. Feature work does not land on `main`.

For every row I did the same loop:

1. Check out `dev` and pull.
2. Branch from that updated `dev` (`feature/add-design-system`, and the same pattern for the rest).
3. Build only that row. Later slices stay on their own branches.
4. Mark the row done in the scope, with the spec beside it when the feature has one.
5. Commit with a conventional message that says what the feature does.
6. Push the branch and open a pull request into `dev`.
7. Merge, then start the next row from the updated `dev`.

Husky and lint-staged run on each commit. Design tokens live in [`design/design-system`](design/design-system). Figma captures live in [`design/figma-assets`](design/figma-assets).

## What landed

| Feature                         | Branch                                        | Where it shows up                              |
| ------------------------------- | --------------------------------------------- | ---------------------------------------------- |
| Stack and architecture          | `feature/app-shell` (recorded with the shell) | Next.js 16, TypeScript, pnpm, Tailwind v4      |
| Design system and UI foundation | `feature/add-design-system`                   | Tokens, Satoshi, Poppins, spacing, color       |
| App shell and route structure   | `feature/app-shell`                           | Header, content region, footer                 |
| Home core loop                  | `feature/home-core-loop`                      | `/` from hero through testimonials             |
| Home responsive pass            | `feature/home-responsive-pass`                | Home from 360 through `2xl`                    |
| Register and Login              | `feature/register-and-login`                  | `/register` and `/login`                       |
| Motion and animation            | `feature/motion-and-animation`                | Shared reveals, float, hover, page transitions |
