# Webhook Receiver Service

A production-ready webhook receiver service built with **NestJS**, **TypeORM**, and **PostgreSQL**.

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)

### Running with Docker (Recommended)

```bash
# Start the application and database
docker-compose up -d

# View logs
docker-compose logs -f app
```

The service will be available at `http://localhost:3000`.

### Running Locally (Development)

```bash
# 1. Start only the database
docker-compose up -d db

# 2. Install dependencies
npm install

# 3. Start the application
npm run start:dev
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/webhooks` | Receive and store a webhook |
| GET | `/webhooks` | Get all stored webhooks |
| GET | `/webhooks/:id` | Get a specific webhook by ID |

### Example Requests

**Create a webhook:**
```bash
curl -X POST http://localhost:3000/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "source": "stripe",
    "event": "payment.completed",
    "payload": {"amount": 100, "currency": "usd"}
  }'
```

**Get all webhooks:**
```bash
curl http://localhost:3000/webhooks
```

**Get webhook by ID:**
```bash
curl http://localhost:3000/webhooks/<uuid>
```

## ✅ Changes Made

See [ANALYSIS.md](./ANALYSIS.md) for detailed analysis and fixes.

### Summary of Improvements

| Area | Before | After |
|------|--------|-------|
| **Storage** | In-memory array | PostgreSQL database |
| **Validation** | None (type cast) | class-validator DTOs |
| **ID Generation** | Math.random() | UUID v4 |
| **Structure** | Single file | NestJS modules |
| **Error Handling** | Generic 500 | Proper HTTP exceptions |
| **Logging** | console.log | NestJS Logger |
| **Tests** | None | Unit tests for Service/Controller |

## 🧪 Running Tests

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# E2E tests (requires database)
npm run test:e2e
```

## 📁 Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module with TypeORM config
└── webhook/
    ├── webhook.module.ts   # Webhook feature module
    ├── webhook.controller.ts
    ├── webhook.service.ts
    ├── dto/
    │   └── create-webhook.dto.ts
    └── entities/
        └── webhook.entity.ts
```

## 🔧 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Application port |
| `POSTGRES_HOST` | localhost | Database host |
| `POSTGRES_PORT` | 5432 | Database port |
| `POSTGRES_USER` | webhook_user | Database user |
| `POSTGRES_PASSWORD` | webhook_password | Database password |
| `POSTGRES_DB` | webhook_db | Database name |
