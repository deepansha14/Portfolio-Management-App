# Portfolio Management App

A Next.js 14 application with client/admin dashboard for portfolio management.

## Features

- **Role-based Authentication**: Different interfaces for investors and administrators
- **Secure JWT Authentication**: Token-based authentication with refresh functionality
- **Responsive Dashboards**: Interactive dashboards for both clients and administrators
- **Modern UI**: Tailwind CSS with dark mode support

## Demo Credentials

### Admin User

- **Email**: advisor@portfoliomanager.com
- **Password**: admin123

### Investor User

- **Email**: investor@example.com
- **Password**: demo123

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/portfolio-management-app.git
   cd portfolio-management-app
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
src/
  app/             # Next.js App Router pages
    api/           # API routes
    admin/         # Admin pages
    client/        # Client pages
  components/      # React components
    admin/         # Admin-specific components
    auth/          # Authentication components
    client/        # Client-specific components
    ui/            # Shared UI components
  data/            # Mock data
  lib/             # Utility functions
  store/           # Global state management
  types/           # TypeScript types
```

## Authentication Flow

1. User selects role (admin or investor) on landing page
2. User logs in with credentials for selected role
3. Server validates credentials and issues JWT tokens
4. Client stores tokens in HTTP-only cookies
5. Token refresh happens automatically in the background

## Development Notes

- Use `npm run build` to build for production
- Use `npm run lint` to run ESLint
