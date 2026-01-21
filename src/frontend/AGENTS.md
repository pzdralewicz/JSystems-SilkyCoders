# AGENTS.md (Frontend React SPA)

Purpose
- Provide frontend implementation guidance for the Sinsay returns/defects PoC UI.
- Keep the flow simple: intake -> (if complaint) photo and metadata upload -> chat clarification/decision.

Tech stack
- React 19, Vite, TypeScript, TailwindCSS, Shadcn UI.
- Forms: @tanstack/form.
- State: local component state (avoid context usage) + React Query (if needed for server state).

Architecture principles
- Feature-first organization with a thin shared layer; keep UI, logic, and API calls co-located.
- Keep components small, pure, and composable; avoid long files (>200 LOC when possible).
- Prefer hooks for logic reuse; avoid prop drilling.
- Centralize API calls and DTO typing; keep API details out of UI components.
- Enforce consistent naming, file structure, and linting/formatting.

Directory structure (suggested)
- src/
  - app/
    - App.tsx
    - routes.tsx
    - providers.tsx
  - features/
    - intake/
      - components/
      - hooks/
      - api/
      - types.ts
      - IntakePage.tsx
    - upload/
      - components/
      - hooks/
      - api/
      - types.ts
      - UploadPage.tsx
    - chat/
      - components/
      - hooks/
      - api/
      - types.ts
      - ChatPage.tsx
  - shared/
    - components/
      - ui/            # shadcn components
      - layout/
    - hooks/
    - lib/
      - http.ts        # fetch/axios wrapper
      - validation.ts  # zod schemas shared across features
      - env.ts         # runtime config
    - types/
    - styles/
      - index.css
  - assets/
  - main.tsx

Coding conventions
- File naming:
  - Components: PascalCase (e.g., IntakeForm.tsx).
  - Hooks: useX.ts (e.g., useIntakeForm.ts).
  - Utilities: camelCase (e.g., formatDate.ts).
- Components:
  - Prefer function components.
  - One component per file.
  - Keep render logic simple; move complex logic to hooks.
- State:
  - Form state in @tanstack/form.
  - Server state in @tanstack/query.
  - Keep URL state in the router only.
- Styling:
  - Tailwind utility classes; use `cn` helper for conditional classes.
  - Prefer design tokens via Tailwind config for colors/spacing.

Implementation details
- Multi-step UX
  - Step 1: Intake form (<= 5 fields) with validation and policy rules.
  - Step 2: Photo upload for complaints only; validate file type/size/count.
  - Step 3: Chat clarification/decision; show status and next action.
  - Use a simple stepper/progress indicator to show current step.

- Forms & validation
  - Define Zod schemas in `shared/lib/validation.ts` or per-feature `types.ts`.
  - Reuse schemas between client and server where possible.
  - Display clear, user-friendly error messages.

- API layer
  - Put API calls in `features/*/api/` with typed request/response DTOs.
  - Use a single HTTP client wrapper for base URL, headers, and error mapping.
  - Map API errors to user-friendly messages (ProblemDetail -> UI).

- Accessibility
  - Use semantic HTML and labels for inputs.
  - Ensure focus management on step transitions.
  - Provide error summaries where helpful.

Testing checklist
- Form rules: required fields, dates, ID formats, and conditional fields.
- Step transitions: intake -> upload -> chat.
- API error mapping and UI messaging.

Notes
- Adjust base paths and package names to match the actual app structure.
