# replit.md

## Overview

This is a personal portfolio website built as a full-stack TypeScript application. It showcases a developer's profile, skills, projects, and services with a modern dark-themed UI featuring glassmorphism effects, smooth animations, and 3D parallax interactions. The application follows a client-server architecture with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled using Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **Styling**: Tailwind CSS with CSS variables for theming, using a dark color scheme with purple/cyan accent colors
- **UI Components**: shadcn/ui component library (New York style variant) built on Radix UI primitives
- **Animations**: Framer Motion for scroll reveals, parallax effects, and micro-interactions
- **Smooth Scrolling**: Lenis library for buttery-smooth scroll behavior
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **3D Effects**: react-parallax-tilt for interactive avatar tilt effects

### Backend Architecture
- **Framework**: Express 5 running on Node.js with TypeScript
- **API Design**: RESTful API endpoints defined in `shared/routes.ts` with Zod schemas for type-safe request/response validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Development**: tsx for TypeScript execution, Vite dev server with HMR proxied through Express

### Data Layer
- **Database**: PostgreSQL with connection pooling via `pg` Pool
- **Schema Definition**: Drizzle schema in `shared/schema.ts` defining four main tables:
  - `profile` - Single row for developer profile info with social links (JSONB)
  - `skills` - Technical skills with icons and categories
  - `projects` - Portfolio projects with tags (array), featured flag, and URLs
  - `services` - Offered services with descriptions
- **Migrations**: Drizzle Kit for schema migrations (`drizzle-kit push`)
- **Type Safety**: drizzle-zod generates Zod schemas from Drizzle tables for runtime validation

### Shared Code
- **Location**: `shared/` directory contains code used by both client and server
- **API Contract**: `shared/routes.ts` defines API endpoints with methods, paths, input schemas, and response types
- **Type Exports**: Schema types exported for use across the codebase

### Build System
- **Development**: Vite dev server with React plugin and HMR
- **Production Build**: Custom build script using esbuild for server bundling and Vite for client
- **Server Bundling**: Dependencies allowlisted for bundling to reduce cold start times
- **Output**: `dist/public` for static assets, `dist/index.cjs` for server

### Key Design Patterns
- **API Hooks**: Custom hooks in `use-portfolio.ts` wrap React Query for data fetching
- **Component Structure**: Reusable UI components in `components/ui/`, feature components at top level
- **Path Aliases**: `@/` for client src, `@shared/` for shared code, `@assets/` for attached assets
- **Glassmorphism UI**: Semi-transparent cards with backdrop blur and subtle borders

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Connection Pooling**: `pg` Pool for efficient connection management

### UI/Animation Libraries
- **Radix UI**: Full suite of accessible, unstyled UI primitives (dialog, dropdown, tabs, etc.)
- **Framer Motion**: Animation library for React
- **Lenis**: Smooth scroll library
- **react-parallax-tilt**: 3D tilt effect for cards
- **Embla Carousel**: Carousel component foundation
- **Vaul**: Drawer component
- **cmdk**: Command palette component
- **react-icons**: Icon library (Simple Icons for tech logos)
- **Lucide React**: Icon library for UI icons

### Form & Validation
- **Zod**: Schema validation throughout the stack
- **React Hook Form**: Form state management
- **zod-validation-error**: Better Zod error messages

### Utility Libraries
- **date-fns**: Date manipulation
- **clsx / tailwind-merge**: Conditional class name utilities
- **class-variance-authority**: Component variant management
- **nanoid**: Unique ID generation

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server bundling
- **Drizzle Kit**: Database migrations
- **TypeScript**: Type checking across the stack

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Source map integration (dev only)
- **@replit/vite-plugin-dev-banner**: Development mode banner (dev only)