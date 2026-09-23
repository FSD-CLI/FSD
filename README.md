# FSD Architecture Starter

An opinionated React, Vite, and TypeScript starter with the complete
Feature-Sliced Design layer structure ready from the first commit.

## Quick Start with fsd

```bash
npm install
npm run dev
npm run build
```

## Structure

```text
src/
  app/       App entry, config, providers, routing, and global styles
  pages/     Route-level screens
  widgets/   Large composed page sections
  features/  User actions and feature flows
  entities/  Business entities and domain models
  shared/    API client, reusable UI, helpers, config, types, and assets
```

All six layers are committed even before they contain product code. Empty layers
keep a short README because Git does not track empty directories.

## Included stack

- Axios API client in `src/shared/api`.
- React Query provider in `src/app/providers`.
- Zustand for client state.
- React Hook Form and Zod for forms and validation.
- Reusable UI primitives under `src/shared/ui`.
- Official Steiger architecture checks through `npm run fsd:check`.

Projects created through the CLI store their selected stack once in
`fsd.config.json`. Slice generators read that file and do not ask the same stack
questions again.

## Where To Start

- Replace the welcome screen in `src/pages/welcome`.
- Create route-level screens in `src/pages`.
- Add composed sections in `src/widgets`.
- Keep user actions in `src/features`.
- Put reusable primitives in `src/shared`.

## Demo Data

The landing page uses a small typed config file at `src/shared/config/template-info.ts`.
It is intentionally static so the starter has no API dependency or business logic.

## Quality Commands

```bash
npm run ci
git diff --check
npm audit --omit=dev
```

## Support FSD CLI

If this project helps you, you can optionally support its development:

- [Buy Me a Coffee](https://buymeacoffee.com/ashrafqopiah)
- **InstaPay (Egypt):** `ashrafmo-1`

For InstaPay, use the username exactly as shown and verify the recipient details
in the app before confirming a transfer. Donations are optional.
