# RefundHelper (Sinsay Returns/Defects PoC)

PoC web app that classifies returns vs defect complaints from customer input, photos, and AI.

## Monorepo layout
- `src/backend/` - Spring Boot API (Java 21)
- `src/frontend/` - React 19 SPA (Vite + Tailwind + Shadcn UI)

## Current status
- Backend: Bootstrapped Spring Boot app with model classes.
- Frontend: Vite React template (placeholder UI).

## Quick start (dev)
### Backend
```bash
cd src/backend
./mvnw spring-boot:run
```
Runs on port `8080` by default.

### Frontend
```bash
cd src/frontend
npm install
npm run dev
```
Vite runs on a default dev port (usually `5173`).

## Build (prod packaging)
Production intent: build the React app and bundle it into Spring Boot static resources for a single deployable JAR. This wiring is not set up yet.

## Docs
- Root guidance: `AGENTS.md`
- Backend guidance: `src/backend/AGENTS.md`
- Frontend guidance: `src/frontend/AGENTS.md`
