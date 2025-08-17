# Ubuntu Lobola Guide

## Overview

Ubuntu Lobola Guide is a culturally sensitive web application that provides educational guidance about lobola traditions across South African cultures. The application serves as a respectful tool to help users understand traditional practices while emphasizing the importance of family discussions and cultural elders' advice.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom cultural color scheme
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL storage
- **Development**: Hot reload with Vite middleware integration

### Data Storage Solutions
- **Primary Database**: PostgreSQL 16 (configured via Replit modules)
- **ORM**: Drizzle ORM for type-safe database operations
- **Migrations**: Drizzle Kit for database schema management
- **Fallback Storage**: In-memory storage implementation for development

## Key Components

### Database Schema
- **calculations** table: Stores user calculation data including cultural group, education, employment, and calculated results
- **Validation**: Zod schemas for runtime type checking and form validation
- **Types**: Shared TypeScript interfaces between client and server

### API Endpoints
- `POST /api/calculate`: Processes lobola calculation requests
- `GET /api/calculations/stats`: Retrieves aggregated statistics (optional analytics)

### UI Components
- **Calculator Form**: Multi-step form with cultural group, education, and employment selections
- **Results Display**: Shows calculated lobola range with detailed breakdown
- **Cultural Insights**: Provides educational content and negotiation guidelines
- **Share Section**: WhatsApp and general sharing functionality
- **Cultural Disclaimer**: Emphasizes respectful use and limitations

### Calculation Engine
- Algorithm considers cultural traditions, education level, employment status, and optional factors
- Provides range-based results rather than fixed amounts
- Includes detailed breakdown of calculation factors

## Data Flow

1. **User Input**: Form submission with cultural and personal information
2. **Validation**: Client-side validation using Zod schemas
3. **API Request**: POST to `/api/calculate` endpoint
4. **Calculation**: Server-side algorithm processes input data
5. **Storage**: Optional storage of calculation for analytics
6. **Response**: Results returned with amount range and breakdown
7. **Display**: Client renders results with cultural insights and sharing options

## External Dependencies

### Database Integration
- **@neondatabase/serverless**: PostgreSQL connection driver
- **connect-pg-simple**: PostgreSQL session store for Express

### UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework with custom cultural theme
- **class-variance-authority**: Component variant styling utility

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Development tooling integration

### Form and Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Integration layer for validation libraries
- **zod**: TypeScript-first schema validation

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev` runs TSX server with hot reload
- **Port**: Application serves on port 5000
- **Database**: Automatic PostgreSQL provisioning via Replit

### Production Build
- **Frontend**: Vite builds React application to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Command**: `npm run build` followed by `npm run start`

### Replit Configuration
- **Deployment Target**: Autoscale deployment
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Port Mapping**: Internal 5000 → External 80

## Changelog

Changelog:
- June 26, 2025: Enhanced visual design and user experience
  - Made cattle equivalent section prominent with golden background and bold styling
  - Reduced spacing between results sections for better visual flow
  - Added red asterisks to highlight all required form fields
  - Implemented complete translation system across entire application interface
- June 25, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.