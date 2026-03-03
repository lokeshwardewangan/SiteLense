# Site Overview (Website Performance Scanner)

This project is a modern web application built with Next.js 15, focusing on website performance scanning and analysis. It utilizes the latest web technologies to provide a fast, responsive, and maintainable codebase.

## Project Overview

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with OKLCH color space and CSS variables.
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (configured for Tailwind v4)
- **Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Validation:** [Zod](https://zod.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/)

## Architecture

- `app/`: Contains the application routes and layout (Next.js App Router).
  - `layout.tsx`: Root layout with font and provider setup.
  - `page.tsx`: Home page showcasing the project scaffold.
  - `providers.tsx`: Client-side provider wrapper (React Query).
- `components/`: Reusable UI components.
  - `ui/`: shadcn/ui components.
- `lib/`: Utility functions and shared configurations (e.g., `query-client.ts`, `utils.ts`).
- `styles/`: Global styles and Tailwind CSS configuration.

## Building and Running

### Development

To start the development server:

```bash
bun run dev
```

### Production

To build the application for production:

```bash
bun run build
```

To start the production server:

```bash
bun start
```

### Linting

To run ESLint:

```bash
bun run lint
```

## Development Conventions

- **Component Structure:** Use functional components with TypeScript and Arrow functions preferred for small components.
- **Styling:** Leverage Tailwind CSS v4 utility classes. Custom theme variables are defined in `styles/globals.css` using the `@theme inline` directive.
- **State Management:** Use React Query for server state and standard React hooks (useState, useReducer, useContext) for local/UI state.
- **Type Safety:** Ensure all props, data structures, and API responses are properly typed with TypeScript or validated with Zod.
- **Icons:** Use `lucide-react` for consistent iconography.
- **Class Merging:** Use the `cn` utility from `lib/utils.ts` for conditional class joining and Tailwind class merging.

## Key Files

- `package.json`: Project dependencies and scripts.
- `app/providers.tsx`: Centralized provider setup for React Query.
- `lib/query-client.ts`: Shared React Query client configuration.
- `styles/globals.css`: Tailwind CSS v4 setup and theme definitions.
- `tsconfig.json`: TypeScript configuration.
