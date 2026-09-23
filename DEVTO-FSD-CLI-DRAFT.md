---
title: "Introducing create-fsd-architecture: Start with Feature-Sliced Design from Day One"
published: false
description: "A practical look at create-fsd-architecture, an open-source CLI for creating and extending FSD projects across React, Next.js, Vue, Nuxt, and SvelteKit."
tags: architecture, frontend, javascript, opensource
cover_image: "{{COVER_IMAGE_URL}}"
canonical_url: "{{CANONICAL_URL}}"
---

Starting a frontend project is easy.

Keeping its architecture clear after the first few features is the hard part.

At the beginning, almost every folder structure looks reasonable. Then the project grows. A shared component starts containing business logic. A feature imports directly from another feature. Route files become responsible for everything. Every developer has a different answer to the same question:

> Where should this code live?

That is the problem I wanted to reduce with **create-fsd-architecture**.

It is an open-source CLI that creates frontend projects with a complete [Feature-Sliced Design structure]({{FSD_OFFICIAL_DOCS_URL}}), remembers the stack selected for the project, and generates framework-aware slices later without asking the same setup questions again.

The project is available on [npm]({{NPM_URL}}), and the source code is on [GitHub]({{GITHUB_URL}}).

> This article describes version `2.5.0`, the current release at the time of writing.

## What is a CLI?

CLI stands for **Command-Line Interface**.

Instead of opening a visual setup screen and configuring a project manually, you run a command in your terminal. The tool asks for the decisions it needs, creates the project, configures the selected stack, and gives you a consistent starting point.

For example:

```bash
npx create-fsd-architecture@latest my-app
```

That command starts an interactive setup where you can choose:

- The framework
- The API client
- The server-state solution
- The client-state solution
- The forms and validation stack
- The package manager
- Whether dependencies should be installed
- Whether the development server should start

The CLI is not only a folder generator. It owns the full project-creation lifecycle and can continue helping after the project is created.

## Why build a CLI around Feature-Sliced Design?

Feature-Sliced Design gives frontend projects a clear set of architectural layers and boundaries. But understanding the methodology and applying it consistently are two different things.

A starter repository can give you the first structure, but it does not automatically answer what should happen when you add a new feature, entity, widget, or page three months later.

The goal of this CLI is to make the architectural decision repeatable:

1. Create the complete FSD structure from day one.
2. Save the selected technical stack in the project.
3. Generate future slices based on that saved configuration.
4. Respect the routing and runtime conventions of the selected framework.
5. Protect existing work when generation or setup fails.

It is intentionally opinionated. The point is not to generate every possible project shape. The point is to give the project a clear map from the beginning.

## Supported frameworks

The current release includes five stable templates:

| Template ID | Framework | Template source |
| --- | --- | --- |
| `react-vite` | React + Vite | [Open template]({{REACT_VITE_TEMPLATE_URL}}) |
| `nextjs` | Next.js with App Router | [Open template]({{NEXTJS_TEMPLATE_URL}}) |
| `vue-vite` | Vue + Vite | [Open template]({{VUE_VITE_TEMPLATE_URL}}) |
| `nuxt` | Nuxt 4 | [Open template]({{NUXT_TEMPLATE_URL}}) |
| `sveltekit` | SvelteKit | [Open template]({{SVELTEKIT_TEMPLATE_URL}}) |

You can inspect the available templates at any time:

```bash
npx create-fsd-architecture@latest --list-templates
```

Or select one directly:

```bash
npx create-fsd-architecture@latest my-app --framework nextjs
```

## A complete FSD structure from day one

The generated project contains the six primary FSD layers:

```text
src/
├── app/          # App setup, providers, routing, and global styles
├── pages/        # Route-level compositions
├── widgets/      # Large reusable interface blocks
├── features/     # User interactions and business actions
├── entities/     # Business entities and their representations
└── shared/       # API, assets, config, utilities, types, and UI
```

The core segments are present from the beginning. Documentation placeholders keep intentionally empty architectural directories available after cloning the Git repository.

There are two framework-specific details worth calling out:

- **Nuxt** keeps the complete layers under its official `app/` source directory. Thin file-based route wrappers live separately in `app/app/routes`.
- **SvelteKit** keeps the FSD layers under `src/` and reserves `src/routes` for thin route wrappers. Because SvelteKit already owns the `$app` alias, the generated project uses `$fsd-app` for the FSD app layer, plus aliases such as `$pages` and `$shared`.

The framework keeps control of its routing convention. FSD keeps control of application structure.

## Choose the stack once

Different frameworks need different defaults. The CLI uses a capability matrix to offer valid choices for each framework and reject invalid cross-framework combinations.

| Framework | API client | Server state | Client state | Forms |
| --- | --- | --- | --- | --- |
| React + Vite | Axios or Fetch | TanStack React Query or none | Zustand, Redux Toolkit, or none | React Hook Form + Zod or none |
| Next.js | Axios or Fetch | TanStack React Query or none | Zustand, Redux Toolkit, or none | React Hook Form + Zod or none |
| Vue + Vite | Axios or Fetch | TanStack Vue Query or none | Pinia or none | VeeValidate + Zod or none |
| Nuxt | Axios or native `$fetch` | TanStack Vue Query or none | Pinia or none | VeeValidate + Zod or none |
| SvelteKit | Axios or Fetch | TanStack Svelte Query or none | Svelte stores or none | SvelteKit Superforms + Zod or none |

Every framework supports these package managers:

- npm
- pnpm
- Yarn
- Bun

For repeatable local automation, CI, or demos, every important choice can be passed as a flag:

```bash
npx create-fsd-architecture@latest my-app \
  --framework react-vite \
  --package-manager pnpm \
  --api-client fetch \
  --server-state react-query \
  --client-state redux \
  --forms react-hook-form-zod \
  --yes \
  --no-start
```

You can also use `none` for the optional server-state, client-state, or forms capabilities supported by the selected framework.

## The project remembers its configuration

After creation, the selected stack is stored in `fsd.config.json`:

```json
{
  "$schema": "https://raw.githubusercontent.com/FSD-CLI/cli/main/schema/fsd.config.schema.json",
  "schemaVersion": 1,
  "packageManager": "npm",
  "apiClient": "axios",
  "serverState": "react-query",
  "clientState": "zustand",
  "forms": "react-hook-form-zod",
  "ui": "shared-ui",
  "framework": "react-vite"
}
```

This file is important because future generators read it automatically.

If the project uses Redux, the generator can create Redux-aware files. If it uses Zustand, it can generate a Zustand integration. If forms or server state are disabled, it does not add those dependencies to the generated slice.

The project makes the decision once. The generators reuse it later.

## Generate slices inside an existing project

The CLI currently supports four generator types:

- `feature`
- `entity`
- `widget`
- `page`

Examples:

```bash
npx create-fsd-architecture@latest --generate feature checkout
npx create-fsd-architecture@latest -g entity product
npx create-fsd-architecture@latest -g widget navbar
npx create-fsd-architecture@latest -g page settings
```

Each generated slice gets a public API through its root `index.ts`. The files inside the slice are adapted to the selected framework and stack.

### The complete auth generator

Authentication is usually bigger than one login form, so `feature auth` is treated as a complete flow:

```bash
npx create-fsd-architecture@latest -g feature auth
```

It generates the UI and supporting files for:

- Login
- Registration
- Forgot password
- Reset password
- Verification code

Depending on the saved stack, the generated feature can also include typed form components, Zod schemas, query mutations, API functions, and the selected client-state integration.

The output is framework-native. React and Next.js receive React components, Vue and Nuxt receive Vue components, and SvelteKit receives Svelte components with its selected form and state contracts.

## Page generation also updates routing

Generating an FSD page slice is only half the job. The application also needs a route that renders that page.

The page generator handles that integration using the framework's normal routing model:

- React + Vite: registers a React Router route
- Vue + Vite: registers a Vue Router route
- Next.js: creates a thin App Router route file
- Nuxt: creates a thin file-based route wrapper
- SvelteKit: creates a thin `+page.svelte` route wrapper

The route layer stays thin while the page composition stays inside the FSD `pages` layer.

## Safe previews with `--dry-run`

You should be able to see what a generator intends to change before it writes anything.

For project creation:

```bash
npx create-fsd-architecture@latest my-app \
  --framework vue-vite \
  --yes \
  --dry-run
```

For slice generation:

```bash
npx create-fsd-architecture@latest -g page settings --dry-run
```

The CLI prints the project or file plan and does not change the filesystem.

## Conflict protection and rollback

Existing projects and slices are protected by default.

If a target already exists, the CLI stops instead of silently replacing it. You must pass `--force` when replacement is intentional:

```bash
npx create-fsd-architecture@latest -g feature checkout --force
```

Forced replacement is transactional. The previous target is backed up, and if generation or setup fails, the CLI restores the original state.

The same idea applies during project creation: incomplete downloads, configuration failures, or commit-tooling failures trigger rollback instead of leaving a half-created project behind.

Project paths are also checked so a project name cannot escape the current working directory.

## Inspect and diagnose a project

The CLI includes three inspection commands:

```bash
npx create-fsd-architecture@latest check
npx create-fsd-architecture@latest doctor
npx create-fsd-architecture@latest config
```

### `check`

Validates the resolved FSD configuration and confirms that the six required architectural layers exist.

### `doctor`

Runs the project checks and also inspects the local toolchain, including Node.js, Git, and the package manager selected in `fsd.config.json`.

### `config`

Prints the resolved project configuration as JSON. This is useful when debugging a generator or checking an older project where configuration may need to be inferred.

## Git and commit tooling are part of setup

Creating the source files is not the end of project setup.

The CLI also:

- Initializes a fresh Git repository
- Removes the template's `origin` remote
- Configures Husky hooks
- Adds Commitlint with the Conventional Commits configuration
- Runs linting and builds through the generated Git hooks
- Installs dependencies with the selected package manager when requested

If dependencies are installed during the interactive flow, the CLI verifies that Commitlint rejects an invalid commit message before completing setup.

The generated templates also include an FSD architecture check with Steiger as part of their `ci` script.

## Framework-specific behavior

The CLI shares one project lifecycle across all templates, but it does not pretend that every framework behaves the same way.

Framework adapters own details such as:

- Source-directory location
- Public environment-variable syntax
- API-client generation
- Provider setup
- Client-component requirements
- Route registration
- Framework-specific dependencies

For example:

- Nuxt defaults to native `$fetch` and can generate a Vue Query plugin with SSR hydration.
- Vue and Nuxt can configure Pinia, TanStack Vue Query, VeeValidate, and Zod through their native providers or modules.
- SvelteKit defaults to native Fetch, uses `PUBLIC_API_BASE`, supports Svelte 5 components, and can configure TanStack Svelte Query, Svelte stores, Superforms, and Zod 4.
- Next.js keeps App Router route files inside `src/app`, while route-level FSD compositions remain inside `src/pages`.

This boundary is one of the most important parts of the project: shared architecture should not require framework-specific code to leak everywhere.

## Useful commands in one place

```bash
# Create a project interactively
npx create-fsd-architecture@latest my-app

# Show help and version
npx create-fsd-architecture@latest --help
npx create-fsd-architecture@latest --version

# List templates
npx create-fsd-architecture@latest --list-templates

# Create without prompts
npx create-fsd-architecture@latest my-app \
  --framework react-vite \
  --yes \
  --no-install \
  --no-start

# Generate slices
npx create-fsd-architecture@latest -g feature auth
npx create-fsd-architecture@latest -g entity product
npx create-fsd-architecture@latest -g widget header
npx create-fsd-architecture@latest -g page dashboard

# Preview without writing
npx create-fsd-architecture@latest -g page dashboard --dry-run

# Inspect the current project
npx create-fsd-architecture@latest check
npx create-fsd-architecture@latest doctor
npx create-fsd-architecture@latest config
```

## Requirements

- Node.js 20 or later for the CLI
- Node.js 22.22.2 or later for generated Nuxt and SvelteKit projects

## Current validation status

For version `2.5.0`:

- The CLI test suite contains 35 tests.
- The CI matrix runs the CLI on Node.js 20, 22, and 24.
- Framework smoke jobs create, extend, validate, and build all five templates.
- Package-manager smoke jobs create and build the React + Vite template with npm, pnpm, Yarn, and Bun.

You can inspect the current workflow runs and their exact results on [GitHub Actions]({{CI_URL}}).

## What this tool is — and what it is not

`create-fsd-architecture` is an opinionated project scaffolder and code generator built around Feature-Sliced Design.

It is not a replacement for understanding architecture. It is also not the official Feature-Sliced Design CLI. The methodology, concepts, and official learning resources belong to the Feature-Sliced Design project, which you can explore in the [official documentation]({{FSD_OFFICIAL_DOCS_URL}}).

The CLI focuses on a different problem: turning an architectural decision into a repeatable project workflow across multiple frontend frameworks.

## Try it

```bash
npx create-fsd-architecture@latest my-app
```

Then explore the generated structure, inspect `fsd.config.json`, and try adding a page or feature.

If you find a bug, an unsupported use case, or a generator that could be improved, open an issue on [GitHub]({{ISSUES_URL}}). You can also read the [changelog]({{CHANGELOG_URL}}) to follow each release.

For a visual walkthrough, watch the [demo video]({{DEMO_VIDEO_URL}}).

If the project helps you, you can support its continued development [here]({{SUPPORT_URL}}).

I would especially like feedback from developers already using FSD:

> Which repeated architectural task should the CLI automate next?

---

## Links

- [npm package]({{NPM_URL}})
- [GitHub repository]({{GITHUB_URL}})
- [Documentation]({{DOCS_URL}})
- [Official Feature-Sliced Design documentation]({{FSD_OFFICIAL_DOCS_URL}})
- [Changelog]({{CHANGELOG_URL}})
- [Issues and feature requests]({{ISSUES_URL}})
- [CI status]({{CI_URL}})
- [Demo video]({{DEMO_VIDEO_URL}})
- [Roadmap]({{ROADMAP_URL}})
- [Author on GitHub]({{AUTHOR_GITHUB_URL}})
- [Author on LinkedIn]({{AUTHOR_LINKEDIN_URL}})
- [Support the project]({{SUPPORT_URL}})
