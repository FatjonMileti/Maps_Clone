# Overview

This is a map-based web application built with React and Vite, utilizing Leaflet for interactive mapping capabilities. The project is a modern, lightweight single-page application that displays interactive maps in the browser. It was initially bootstrapped with Create React App but has been migrated to use Vite as the build tool for improved performance and developer experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Build Tool: Vite**
- The application uses Vite instead of the traditional Create React App webpack setup
- Vite provides faster hot module replacement (HMR) and optimized builds
- Configuration is minimal and focused on React plugin integration
- Development server runs on port 5000 with host binding to 0.0.0.0 for accessibility in containerized environments

**UI Framework: React 18.2 with TypeScript**
- Component-based architecture using modern React patterns
- Entry point is `/src/main.tsx` as specified in the HTML file
- Uses ES modules (type: "module" in package.json)
- Strict TypeScript configuration for type safety

**Mapping Library: Leaflet + React Leaflet**
- Leaflet 1.9.3 provides the core mapping functionality
- React Leaflet 4.2.1 wraps Leaflet in React-friendly components
- CSS is loaded via CDN from unpkg.com for Leaflet styles
- Enables interactive map features like panning, zooming, and marker placement

**State Management: TanStack Query (React Query)**
- React Query 5.0+ is included for server state management
- Handles data fetching, caching, and synchronization
- Provides efficient data management without the need for Redux or similar global state libraries

## Design Patterns

**Module System**
- ES6 modules throughout the codebase
- Vite handles module bundling and tree-shaking

**Development vs Production**
- Development mode uses Vite's dev server with HMR
- Production builds are optimized and output to `/build` folder
- Static assets are served from `/public` directory

## Deployment Considerations

**Server Configuration**
- Vite dev server configured to accept all hosts for deployment flexibility
- Suitable for Docker containers and cloud platforms
- Port 5000 is the default development port

**Progressive Web App (PWA) Ready**
- Includes manifest.json for PWA capabilities
- Icons and theme configuration in place
- Service worker integration possible but not currently implemented

# External Dependencies

## Core Libraries

**React Ecosystem**
- `react` (18.2.0) - UI library
- `react-dom` (18.2.0) - DOM rendering

**Mapping**
- `leaflet` (1.9.3) - Core mapping library
- `react-leaflet` (4.2.1) - React bindings for Leaflet
- Leaflet CSS loaded from unpkg.com CDN

**Data Management**
- `@tanstack/react-query` (5.0+) - Async state management and data fetching

## Development Tools

**Build & Development**
- `vite` (5.0+) - Build tool and dev server
- `@vitejs/plugin-react` (4.2+) - React integration for Vite
- `typescript` (5.0+) - TypeScript compiler
- `@types/react`, `@types/react-dom`, `@types/leaflet` - Type definitions

## External Services

**CDN Resources**
- Leaflet CSS served from unpkg.com CDN with integrity checking
- No backend API currently configured (though React Query suggests future API integration)

## Notes

- No database integration currently present
- No authentication/authorization system implemented
- Application is frontend-only with OpenStreetMap Nominatim API integration via React Query
- No environment-specific configuration files detected (may need .env for API keys or map service tokens)

# Recent Changes

**November 30, 2025**
- Migrated from Create React App to Vite for faster development builds
- Replaced axios with TanStack Query (useQuery) for data fetching
- Added loading and error states to location search
- Removed legacy CRA dependencies (react-scripts, testing libraries, axios)
- Upgraded to TypeScript with strict type checking
- Added proper type definitions for Leaflet, React, and API responses
- Converted all source files from .jsx to .tsx