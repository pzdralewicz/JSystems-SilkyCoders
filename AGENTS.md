# AGENTS.md

Purpose
- Build a PoC web app for Sinsay that classifies return vs defect complaints using customer photos and AI.
- Keep flow simple: intake form -> (if complaint) photo upload -> chat for clarification/decision.

Repo layout
- Monorepo with:
  - src/backend/ (Spring Boot API)
  - src/frontend/ (React SPA)
- Production: bundle built React app into Spring Boot static resources and ship one deployable JAR.
- Development: run backend and frontend separately and enable CORS for the frontend dev origin.

Backend (Spring Boot) guidelines
- Java 21 + Spring Boot 3.5.x, layered architecture (Controller -> Service -> Integration).
- Use Bean Validation for request validation; return clear, user-friendly error messages.
- Implement resilient OpenAI calls: retries/backoff, timeouts, and error handling for rate limits/network.
- Store conversation state by conversationId (server-side history or lightweight store).
- Prefer machine-checkable AI output (JSON schema or strict first-line status).

Frontend (React) guidelines
- React 19 + TailwindCSS + Shadcn UI.
- Forms: React Hook Form + Zod; keep intake form <= 5 fields and enforce policy rules.
- Multi-step UX: intake -> upload (if complaint) -> chat; show clear progress and next step.

AI integration and policy
- Inject intake form data into the initial system context so the user does not repeat details.
- Encode policy and defect categories in the assistant instructions.
- If image is irrelevant or unclear, request a valid product photo; escalate when uncertain.
- For returns: confirm eligibility and provide instructions; for complaints: analyze defect vs wear.

Testing
- Backend: JUnit 5; test validation edges (dates, IDs, missing fields) and OpenAI error handling.
- Frontend: Vitest + React Testing Library; test form rules and step transitions.

Operations and logging
- Log intake, decisions, and transcripts (at least for PoC) with redaction of sensitive data.
- Keep audit-friendly traces for decisions and model outputs.
