# Fullstack App (Frontend + Backend)

## Overview
Simple fullstack demo with:
- Backend: Node.js + Express + MongoDB (Mongoose), JWT auth
- Frontend: React (Vite)
Features:
- Login / Register (JWT)
- Employees: add, delete, list
- Tasks: add, delete, mark complete, list, completed view

## Setup

### Prerequisites
- Node.js (16+)
- npm
- MongoDB running locally (your connection string: `mongodb://localhost:27017/`)

### Backend
1. Open terminal, go to `backend/`
2. Copy `.env.example` to `.env` and set `MONGO_URI` (default used if omitted).
3. Install deps:
cd backend
npm install

4. Seed sample data (optional):
npm run seed

5. Start server:
npm run dev
###### or
npm start

Backend server runs on `http://localhost:5000`

### Frontend
1. In another terminal:
cd frontend
npm install
npm run dev

2. Open the Vite URL (usually http://localhost:3000)

### Notes
- The frontend expects API base at `VITE_API_BASE` (see `.env.example`)
- Use register to create an account and login.
- API endpoints are protected with JWT — token stored in `localStorage`.

## Structure
See the provided folder structure in the project.

## Assumptions & Bonuses
- Simple JWT auth (no refresh tokens)
- Basic, clean responsive UI with CSS (no external UI libs)
- Seed script to create sample employees & tasks

