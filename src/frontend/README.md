# RefundHelper Frontend

React SPA for the Sinsay returns/defects PoC.

## Current state
- Still the Vite React template UI (`src/App.tsx`).
- Tailwind + Shadcn tooling installed, but the screens are not implemented yet.

## Tech stack
- React 19 + Vite
- TypeScript
- TailwindCSS + Shadcn UI

## Scripts
```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run typecheck
```

## Structure
```
src/
  App.tsx
  App.css
  main.tsx
  index.css
  assets/
```

## Run
```bash
cd src/frontend
npm install
npm run dev
```
Vite uses the default dev port (usually `5173`).

## Next steps
Implement the intake -> upload -> chat flow per `src/frontend/AGENTS.md`.
