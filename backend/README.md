# Safar Backend

NestJS foundation with MongoDB and Docker setup.

## Setup
1. Copy `.env.example` to `.env`
2. Install dependencies: `npm install`

## Scripts
- **Start Local:** `npm run start:dev`
- **Start Docker (with Mongo):** `docker-compose up -d`
- **Build:** `npm run build`

## Architecture
- `src/main.ts`: Application orchestrator
- `src/config`: Environment configurations
- `src/database`: Mongoose setup and models
- `src/health`: Basic health check
- `src/modules`: Future business logic
- `src/common`: Utilities and interceptors
