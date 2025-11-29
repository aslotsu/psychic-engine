# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 16** form application for collecting preorders. The project uses:
- **Framework**: Next.js 16 with App Router and React 19
- **Form Handling**: react-hook-form with Zod validation
- **UI Components**: shadcn/ui components (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS 4 with CSS variables for theming
- **Testing**: Vitest with Storybook integration for component testing
- **Component Library**: Storybook for component documentation and testing

The application redirects the root path (`/`) to `/preorder` where users can fill out a preorder form.

## Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Storybook development (runs on http://localhost:6006)
npm run storybook

# Build Storybook for static hosting
npm run build-storybook

# Run Storybook tests with Vitest (component testing via browser)
npm run test       # Note: ensure vitest is properly configured

# Run tests in watch mode
npm run test:watch
```

## Code Architecture

### Directory Structure

- **`app/`** - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with theme provider and mode toggle
  - `page.tsx` - Home page (currently redirects to /preorder)
  - `preorder/page.tsx` - Main preorder form page

- **`components/`** - Reusable React components
  - `ui/` - Base shadcn/ui components (button, input, form, label, card)
  - `theme-provider.tsx` - next-themes wrapper for dark mode
  - `mode-toggle.tsx` - Dark/light mode toggle button
  - `SampleForm.tsx` - Example form component using the form pattern

- **`lib/`** - Utility functions
  - `utils.ts` - Helper functions (e.g., className merging via clsx/tailwind-merge)

- **`stories/`** - Storybook story files for component documentation and testing
  - Components and stories follow the naming convention `*.stories.tsx` or `*.stories.ts`

- **`.storybook/`** - Storybook configuration
  - `main.ts` - Storybook config with vitest addon enabled
  - `preview.ts` - Storybook preview settings (a11y checks set to 'todo')
  - `vitest.setup.ts` - Storybook test setup file

### Key Technologies and Patterns

**Form Implementation Pattern**:
- Define Zod schema at top of component with validation rules
- Use `useForm` with `zodResolver` for validation
- Leverage `<Form>` wrapper component for consistent styling and error handling
- Form fields use `FormField` component with render pattern for type safety

**Theme System**:
- Uses `next-themes` for automatic dark mode detection and manual toggle
- Theme provider wraps entire app in layout.tsx
- CSS variables set in Tailwind config for semantic colors (card, foreground, muted-foreground, etc.)
- `disableTransitionOnChange` prevents flash during theme switch

**Component Styling**:
- All components use Tailwind CSS utility classes
- shadcn/ui components are built with CVA (class-variance-authority) for variant support
- Icons from lucide-react

**Type Safety**:
- Full TypeScript strict mode enabled
- React Server Components by default (use "use client" for client-side components)
- Next.js type-safe redirects in next.config.js

### Testing Strategy

- **Storybook + Vitest**: Component testing via browser integration
  - Run browser-based tests with Playwright
  - Stories defined in `stories/` directory
  - Vitest configured in `vitest.config.ts` with Storybook plugin
  - Accessibility checks enabled (a11y addon) but set to 'todo' mode (warnings only)

- **No Unit Tests Yet**: The project doesn't have traditional Jest tests
  - Consider adding Vitest for unit testing if needed beyond component testing

## Configuration Notes

**TypeScript Paths**:
- `@/*` resolves to project root (configured in `tsconfig.json` and `components.json`)
- Use path aliases for all imports: `@/components`, `@/lib`, `@/hooks`

**Redirects**:
- Root path `/` redirects permanently to `/preorder` (Next.js redirect in next.config.js)

**ESLint**:
- Uses Next.js flat config format with TypeScript support
- Storybook plugin included for story linting

**Tailwind CSS 4**:
- PostCSS configuration uses `@tailwindcss/postcss` plugin
- Global CSS variables defined in `app/globals.css` for theming
- Neutral base color with custom CSS variable integration

## Common Development Tasks

**Adding a New Form**:
1. Create a new page file in `app/` directory
2. Define Zod validation schema
3. Use `useForm` with `zodResolver`
4. Build form UI with Form and FormField components
5. Add corresponding Storybook story in `stories/`

**Creating a New Component**:
1. Create `.tsx` file in `components/`
2. Add "use client" if needs interactivity
3. Export named function component
4. Create corresponding story file in `stories/ComponentName.stories.tsx`
5. Ensure story tests pass with Storybook + Vitest integration

**Styling**:
- Use Tailwind utility classes directly in components
- For reusable style patterns, add component variants using CVA (see shadcn/ui components as examples)
- Reference CSS variables for theme colors (e.g., `bg-card`, `text-foreground`)

**Dark Mode**:
- Tailwind dark mode uses `dark:` prefix (automatic via next-themes)
- Test both light and dark modes in Storybook before committing
