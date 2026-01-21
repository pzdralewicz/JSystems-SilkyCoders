# AGENTS.md (Backend API)

Purpose
- Provide backend implementation guidance for the Sinsay returns/defects PoC API.
- Keep the flow simple: intake -> (if complaint) photo upload -> chat clarification/decision.

Tech stack
- Java 21, Spring Boot 3.5.x, Spring MVC.
- **ENABLE VIRTUAL THREADS** (`spring.threads.virtual.enabled=true`) to handle slow AI I/O without blocking OS threads.

Architecture principles
- Layered architecture: Controller -> Service -> Integration. Controllers are thin, Services own business logic, Integrations handle external systems.
- Validate input at the boundary using Bean Validation and fail fast with clear, user-facing messages.
- Centralize error handling with ProblemDetail-based responses and an @ControllerAdvice.
- Use CORS config only for local dev (frontend runs separately).
- Make external AI calls resilient (timeouts, retries/backoff, circuit breaker) and log decisions with redaction.
- Keep conversation state keyed by conversationId on the server side.

Directory structure (suggested)
- src/main/java/com/sinsay/returns/
  - Application.java
  - config/
    - CorsConfig.java
    - JacksonConfig.java
    - OpenAiClientConfig.java
    - WebMvcConfig.java
  - controller/
    - IntakeController.java
    - UploadController.java
    - ChatController.java
  - service/
    - IntakeService.java
    - ComplaintService.java
    - ChatService.java
  - integration/
    - openai/
      - OpenAiClient.java
      - OpenAiRequestMapper.java
      - OpenAiResponseMapper.java
      - OpenAiRetryPolicy.java
  - dto/
    - request/
      - IntakeRequest.java
      - UploadRequest.java
      - ChatRequest.java
    - response/
      - IntakeResponse.java
      - DecisionResponse.java
      - ErrorResponse.java
  - domain/
    - ComplaintType.java
    - DefectCategory.java
    - DecisionStatus.java
  - validation/
    - AllowedPurchaseDate.java
    - ValidConversationId.java
  - exception/
    - ApiException.java
    - NotFoundException.java
    - RateLimitedException.java
    - GlobalExceptionHandler.java
  - store/
    - ConversationStore.java
    - InMemoryConversationStore.java
  - util/
    - RedactionUtil.java
    - CorrelationIdFilter.java
- src/main/resources/
  - application.yml
  - application-dev.yml
- src/test/java/com/sinsay/returns/
  - controller/
  - service/
  - integration/
  - validation/

Implementation details
- Controllers
  - Use @RestController and keep them thin (mapping, validation, and delegating to services).
  - For multipart requests, use @RequestPart for metadata and file(s) in the same request.
  - For chat endpoints, accept conversationId and message; return decision status in a machine-checkable first line (or JSON field) per policy.

- Validation
  - Use jakarta.validation annotations on request DTOs and @Validated on services for method validation.
  - Validate: required fields, date ranges, ID formats, photo count limits, and intake rules.

- Error handling
  - Implement a GlobalExceptionHandler as @ControllerAdvice extending ResponseEntityExceptionHandler.
  - Return ProblemDetail with a stable error code and user-friendly message; avoid leaking internals.
  - Map integration failures (OpenAI timeouts, rate limits) to clear 429/503 style responses.

- CORS (dev only)
  - Configure a WebMvcConfigurer bean and allow the React dev origin; keep it off in prod profiles.

- OpenAI integration
  - Put all OpenAI calls in integration/openai and keep request/response mapping isolated.
  - Enforce strict JSON schema outputs when possible.
  - Add timeouts, retry with exponential backoff, and circuit breaker around outbound calls.
  - Log request/response metadata with redaction and correlation IDs.

- Observability
  - Add spring-boot-starter-actuator for health/metrics endpoints.
  - Log intake, decisions, and full transcript IDs for auditability (redact PII).
  - Log token usage (prompt/completion) for every AI interaction.
Testing checklist
- Controller validation: missing fields, invalid IDs, invalid dates.
- Service logic: decision outcomes for return vs defect vs wear.
- Integration: OpenAI error mapping, retries, timeouts, and circuit breaker behavior.

Notes
- Adjust base package name as needed if the app package differs.
