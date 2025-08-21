# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `yarn dev` (uses Turbopack for faster builds)
- **Build**: `yarn build` (includes Prisma generation)
- **Production server**: `yarn start`
- **Unit tests**: `yarn test` (or `yarn test:watch` for watch mode)
- **Test coverage**: `yarn test:coverage`
- **E2E tests**: Use Playwright - tests are in `__tests__/e2e/`
- **Linting**: Run `eslint` - configured in `eslint.config.js`
- **Code formatting**: Prettier is configured - uses 4 spaces, semicolons, double quotes

## Code Architecture & Organization

This is a Next.js 15 application with App Router, using TypeScript, Prisma, and PostgreSQL.

### Key Architecture Principles

**New Architecture (src/features/)**: All new code should follow this pattern:
- **Features**: Organized by functionality (e.g., `acf`, `diabetes`)
- **Three-layer structure**: Each feature has `backend/`, `frontend/`, and `shared/` folders
  - `backend/`: Business logic, queries, API routes
  - `frontend/`: React components (server and client)
  - `shared/`: Code used by both backend and frontend (schemas, models)
- **Modules**: Direct child folders are modules - can be single files or folders
- **Index files**: Complex modules must export their public API via `index.ts/tsx`
- **Tests**: Colocated in `__tests__/` folders within modules

**Legacy Code (src/componentes/, src/services/, etc.)**: Will be gradually migrated to the new structure.

### Import Rules
- Internal module imports: Use relative paths (`'./controller.ts'`)
- External module imports: Use absolute paths (`'@features/acf/diabetes'`)
- Never import internal files from other modules - use their public API via index files

### Path Aliases (configured in Jest)
- `@/` → `src/`
- `@features/` → `src/features/`
- `@componentes/` → `src/componentes/`
- `@services/` → `src/services/`
- `@utils/` → `src/utils/`
- `@constants/` → `src/constants/`
- And more...

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict type checking
- **Database**: PostgreSQL with Prisma ORM (multi-schema setup)
- **UI**: React 19, Material-UI, custom design system (`@impulsogov/design-system`)
- **Authentication**: NextAuth.js
- **Testing**: Jest (unit), Playwright (E2E)
- **Monitoring**: Sentry
- **Analytics**: Mixpanel, Hotjar, Google Tag Manager

## Code Style Guidelines

Based on [this TypeScript style guide](https://mkosir.github.io/typescript-style-guide/) with project-specific deviations documented in `docs/style-guide.md`.

### ESLint Rules
- Prefer `type` over `interface`
- Boolean variables must have prefixes: `is`, `are`, `should`, `has`, `can`, `did`, `will`
- Type aliases: PascalCase
- Generic type parameters: Must start with `T` followed by uppercase letter (e.g., `TUser`)
- No enums - use literal types or const assertions
- Exhaustive switch statements required

### Prettier Configuration
- 4 spaces for indentation
- Semicolons required
- Double quotes
- Trailing commas in ES5 style

## Database

- **ORM**: Prisma with PostgreSQL
- **Schemas**: `dados_nominais_datalake`, `indicadores_cuidado_mockups`
- **Generate client**: Run `prisma generate` (included in build script)
- **Client location**: `prisma/prismaClient.tsx`

## Testing Strategy

- **Unit tests**: Jest with jsdom environment in `__tests__/unit/`
- **E2E tests**: Playwright in `__tests__/e2e/`
- **Test location**: Colocated with modules in `__tests__/` folders
- **Coverage**: Configured to generate reports in `coverage/`

## Key Directories

- `src/app/`: Next.js App Router pages and layouts
- `src/features/`: New modular architecture
- `src/componentes/`: Legacy UI components
- `src/services/`: Legacy API services  
- `src/helpers/`: Utility functions
- `src/middlewares/`: Custom middleware
- `prisma/`: Database schema and client

## Development Notes

- Uses Yarn package manager
- Husky for Git hooks
- Environment-specific configurations
- Development includes Vercel Toolbar
- Supports multiple authentication providers
- Multi-tenant architecture with municipality-based access