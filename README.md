# Report Platform (Test Task)

## Overview

This is a prototype of a reporting platform that allows:

- running reports asynchronously
- tracking job status
- downloading results

The system is designed to demonstrate architecture and extensibility.

---

## Tech Stack

- Backend: Node.js (TypeScript)
- Frontend: React (TypeScript)
- Infrastructure: Docker Compose

---

## How to run

```bash
docker-compose up --build
```

---

## Services

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

---

## Features

- List available reports
- Run report asynchronously
- Track job status (pending → processing → done)
- Download generated report

---

## Notes

This is a prototype. Some parts are simplified:

- In-memory storage instead of database
- No real queue (simulated async execution)
- Mock data in reports

---
