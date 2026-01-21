## 1) What you’re building (PoC goal)

* An AI-driven **returns + defective-product complaints verification** web app for Sinsay.
* Uses a multimodal model (GPT-4 Vision via OpenAI API) to **analyze customer-uploaded photos** and help decide whether a case is a standard return (*zwrot*) or a defect complaint (*reklamacja*). 

## 2) Recommended architecture and deployment

* Use a **single monorepo** with two apps:

  * `backend/` Spring Boot API
  * `frontend/` React SPA 
* For the PoC, **bundle the built React app into Spring Boot static resources** and ship **one deployable JAR**. This simplifies environments, avoids CORS in prod, and keeps versions aligned. 
* In dev, run them separately (e.g., backend `8080`, frontend `5173`) and enable CORS for the dev origin. 

## 3) Minimal intake form (critical UX + routing)

* Keep the initial form **≤5 fields** to quickly triage return vs complaint, and to provide structured context to the AI. 
* Core fields:

  * Purchase channel (online vs in-store)
  * Order/receipt identifier (conditional)
  * Purchase date
  * Request type (Return vs Complaint)
  * Optional contact info (email/phone) 
* Validation rules enforce policy: e.g., allow “return” only **within 30 days**, and optionally confirm “unused with tags” via checkbox. 

## 4) End-to-end workflow (form → images → chat)

* Flow is intentionally simple and staged:

  1. User submits intake form
  2. If complaint, user uploads photos
  3. User continues in chat for missing details + decision/explanation 
* The backend orchestrates: validate input, handle image uploads, call OpenAI, return analysis/questions; frontend provides multi-step UX. 
* Suggested API behavior: intake returns something like `{ conversationId, next: "upload_image" }`. 

## 5) How “form context” is passed to the AI

* Best practice here: inject the form data into the chat as **initial system prompt/context** so the user doesn’t repeat themselves and the model stays grounded. 
* Maintain conversation state via `conversationId` (server-side history or a lightweight store).

## 6) AI decisioning: policy-grounded + optionally structured output

* Encode Sinsay policy + defect categories into the assistant instructions.
* For **returns**: confirm eligibility and provide instructions (AI can still handle follow-up Q&A).
* For **complaints**: request/analyze photos, distinguish manufacturing defects vs wear-and-tear, then approve/deny or escalate. 
* Strong recommendation: make outputs **machine-checkable** when needed:

  * JSON / function calling schema (e.g., `defectType`, `decision`, `reason`), or
  * a strict “APPROVED/DENIED on first line” format to enable backend validation. 
* Add guardrails: if image is irrelevant, request a valid product photo; have fallback/escalation if classification is uncertain. 

## 7) Tech stack choices (why these tools)

**Backend**

* Java 21 + Spring Boot 3.5.x with layered architecture (Controller → Service → integrations).
* Validation with Bean Validation; Lombok to reduce boilerplate.
* OpenAI integration via:
* official `openai-java` SDK

**Frontend**

* React 19 + TailwindCSS + Shadcn UI.
* Forms: **React Hook Form + Zod** for schema validation and dynamic/conditional fields. 

**Chat UI**

* Either Vercel AI SDK UI (`useChat`) pointed to a Spring endpoint, or
* **assistant-ui** as a backend-agnostic alternative (especially if streaming integration is easier). 

**Testing**

* JUnit 5 backend + Vitest/React Testing Library frontend; test edge cases like invalid dates, malformed IDs, odd photos. 

## 8) Reliability, ops, and developer workflow

* Add robust **error handling** around OpenAI calls (rate limits/network issues), friendly UI messages, and retries/backoff (Spring AI can help). 
* Consider **logging/audit** of form + decision + conversation transcript (even if only in-memory/logs for PoC). 
* Provide clear **CLI “copy/paste” commands** for generating projects, running dev servers, building the embedded JAR, and running tests. 

If you want, I can also compress this into a one-page “PoC blueprint” checklist (architecture + endpoints + UI steps) using the same source.
