import { fsdStack } from "./fsd-stack";

const selectedStack: readonly string[] = [
  fsdStack.apiClient,
  fsdStack.serverState,
  fsdStack.clientState,
  fsdStack.forms,
];

export type TemplateFeature = {
  title: string;
  description: string;
};

export type TemplateLayer = {
  name: string;
  path: string;
  purpose: string;
};

export type TemplateAction = {
  title: string;
  description: string;
  path: string;
};

export const templateInfo = {
  name: "FSD Architecture Starter",
  intro:
    "A React, Vite, and TypeScript starter template organized around Feature-Sliced Design layers.",
  framework: fsdStack.frameworkLabel,
  stack: selectedStack.filter((item) => item !== "none"),
  commands: [
    fsdStack.commands.install,
    fsdStack.commands.dev,
    fsdStack.commands.generateFeature,
    fsdStack.commands.generatePage,
  ],
  docsUrl: fsdStack.docsUrl,
  layers: [
    {
      name: "app",
      path: "src/app",
      purpose: "Application entry, providers, routing, and global styles.",
    },
    {
      name: "pages",
      path: "src/pages",
      purpose: "Route-level screens that compose widgets, features, and entities.",
    },
    {
      name: "widgets",
      path: "src/widgets",
      purpose: "Large reusable page sections made from lower-level slices.",
    },
    {
      name: "features",
      path: "src/features",
      purpose: "User actions and product capabilities with focused behavior.",
    },
    {
      name: "entities",
      path: "src/entities",
      purpose: "Business entities and typed domain models when your app needs them.",
    },
    {
      name: "shared",
      path: "src/shared",
      purpose: "Reusable UI, helpers, assets, config, and primitive types.",
    },
  ] satisfies TemplateLayer[],
  features: [
    {
      title: "TypeScript",
      description: "Strict-friendly defaults for confident refactors.",
    },
    {
      title: "Vite",
      description: "Fast local development and optimized production builds.",
    },
    {
      title: "FSD Architecture",
      description: "Clear layers that help the codebase grow predictably.",
    },
    {
      title: "ESLint",
      description: "Project linting with React and TypeScript rules.",
    },
    {
      title: "Husky",
      description: "Git hooks ready for local quality checks.",
    },
    {
      title: "Commitlint",
      description: "Conventional commit validation for cleaner history.",
    },
    {
      title: "GitHub Actions",
      description: "CI workflow files included for automated checks.",
    },
  ] satisfies TemplateFeature[],
  actions: [
    {
      title: "Start building from src/pages",
      description: "Create route-level screens and compose them from widgets.",
      path: "src/pages",
    },
    {
      title: "Create features inside src/features",
      description: "Keep user actions isolated and easy to test or replace.",
      path: "src/features",
    },
    {
      title: "Put reusable UI inside src/shared",
      description: "Share buttons, cards, helpers, and config across layers.",
      path: "src/shared",
    },
  ] satisfies TemplateAction[],
} as const;
