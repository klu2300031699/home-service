# HomeServe - AI Coding Instructions

This document provides essential knowledge for AI agents working with the HomeServe codebase, a React-based home services booking platform.

## Project Overview

HomeServe is a modern web application built with:
- React 19.x with Vite as the build tool
- Pure CSS for styling (no external UI libraries)
- Component-based architecture with stateful management
- Responsive design patterns

## Key Architecture Components

### Core Components
1. `App.jsx` - Root component managing authentication state and main routing
   - Uses useState hooks for user session management
   - Handles conditional rendering between Welcome and Home views

2. Authentication Flow
   - `Welcome.jsx` - Landing page with login/register options
   - `Auth.jsx` - Handles user authentication with predefined credentials
     - Admin: 2300031699@gmail.com / gncgncgnc
     - User: gnanesh@gmail.com / Gnanesh

3. Main Application
   - `Home.jsx` - Dashboard after authentication containing:
     - Service browsing and booking
     - User profile management
     - Admin dashboard (for admin users)

### Data Management
- Local state management using React hooks
- Predefined services data in `allServices` array
- User bookings stored in component state
- Admin management for users and services

## Development Workflows

### Running the Project
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Organization
- `/src/components/` - Reusable UI components
- `/src/assets/` - Static assets and images
- `/src/apis/` - API integrations (future implementation)

## Project Conventions

### Component Structure
- Each component has its own CSS module
- Modal components are defined inline with their parent components
- Use of SVG icons directly in JSX for UI elements

### State Management
- User authentication state maintained at App level
- Component-specific state using useState hooks
- Props drilling for data passing between components

### Styling Patterns
- BEM-like CSS class naming
- CSS Grid and Flexbox for layouts
- Mobile-first responsive design
- CSS variables for theme colors and spacing

### Feature Implementation Patterns
1. Service Booking Flow:
   ```jsx
   // Example from Home.jsx
   const handleBookNow = (service) => {
     setSelectedService(service);
     setShowBookingModal(true);
     setShowDetailModal(false);
     document.body.style.overflow = 'hidden';
   };
   ```

2. Admin Features:
   - User management (CRUD operations)
   - Service catalog management
   - Booking oversight

### Integration Points
- Admin dashboard in `Home.jsx` for user/service management
- Booking system integration with user profiles
- Future API integration points in `/src/apis/`

## Common Tasks

1. Adding a New Service:
   - Extend `allServices` array in `Home.jsx`
   - Include all required fields (id, title, category, etc.)
   - Add corresponding images in public directory

2. Modifying Authentication:
   - Update predefined credentials in `Auth.jsx`
   - Modify validation logic in handleSubmit function

3. Extending Admin Features:
   - Add new management sections in admin dashboard
   - Follow existing CRUD patterns for consistency

Remember to:
- Maintain component state isolation
- Follow existing naming conventions
- Update both JSX and corresponding CSS
- Test admin and user flows after changes