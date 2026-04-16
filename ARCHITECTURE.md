# Architecture

## 1. Overview

The system is designed as a modular reporting platform with asynchronous job processing.

Main components:

- API layer (controllers)
- Job system (creation + execution)
- Reports module (business logic)
- Frontend UI

---

## 2. Components

### Backend

#### Jobs module

- `job.service` — creates jobs
- `job.store` — in-memory storage (Map)
- `worker` — executes jobs asynchronously

#### Reports module

- `domain` — report interface
- `implementations` — concrete reports
- `registry` — list of available reports

---

## 3. Data Flow

1. User clicks "Run report" in UI
2. Frontend calls API: `POST /reports/:id/run`
3. Backend creates job with status `pending`
4. Worker starts processing:
   - status → `processing`
   - executes `report.generate()`
   - status → `done` or `error`

5. Frontend polls job status
6. When done → user downloads result

---

## 4. How to add a new report

1. Create new class in `implementations`:

```ts
class NewReport implements Report
```

2. Implement:

```ts
async generate()
```

3. Register in `reports.registry.ts`:

```ts
new NewReport();
```

No changes required in other parts of the system.

---

## 5. Key decisions

### 1. Separation of job execution and report logic

- Worker handles execution
- Reports contain business logic

### 2. Registry pattern

- Allows dynamic resolution of reports
- Avoids hardcoded conditionals

### 3. In-memory storage (Map)

- Simple for prototype
- Easily replaceable with DB/Redis

### 4. Polling for status

- Simple implementation
- Can be replaced with WebSockets

---

## 6. What is not implemented

- Persistent storage (DB)
- Real queue system (Redis / RabbitMQ)
- Retry mechanism
- Logging and monitoring
- Authentication

---

## 7. Production improvements

- Add Redis queue for job processing
- Add database for job persistence
- Store files in S3
- Replace polling with WebSockets
- Add retries and error handling
- Add structured logging

---
