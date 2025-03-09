# Book Management System (BMS)

This is a Book Management System using Monorepo architecture, consisting of frontend and backend projects.

## Project Structure

```
bms/
├── frontend/          # Frontend project (React + Vite)
├── backend/           # Backend project (NestJS)
├── package.json       # Root project configuration
└── pnpm-workspace.yaml # PNPM workspace configuration
```

## Development Setup

1. Install dependencies
```bash
pnpm install
```

2. Start development servers
```bash
# Start both frontend and backend
pnpm start

# Only start frontend
pnpm start:frontend

# Only start backend
pnpm start:backend
```

3. Build the project
```bash
pnpm build
```

## Technology Stack

### Frontend
- React 19
- Vite
- TypeScript
- TailwindCSS
- React Router
- React Hook Form

### Backend
- NestJS
- TypeScript
- Express
- Class Validator

## License

ISC 