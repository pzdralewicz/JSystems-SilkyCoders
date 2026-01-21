# RefundHelper Backend

Spring Boot API for the Sinsay returns/defects PoC.

## Tech stack
- Java 21
- Spring Boot 3.5.x
- Maven Wrapper

## Package
- Base package: `com.silkycoders.refundhelper`

## Current modules
- `RefundHelperApplication` (app entry point)
- `model/` (domain model enums/POJOs)

## Run
```bash
cd src/backend
./mvnw spring-boot:run
```
Default port: `8080`.

## Build
```bash
cd src/backend
./mvnw clean package
```

## Config
- `src/main/resources/application.properties`

## Notes
This backend is a scaffold. Implementation of controllers, services, integrations, and validation is planned per `src/backend/AGENTS.md`.
