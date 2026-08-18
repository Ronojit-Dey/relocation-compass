# Relocation Compass

> An intelligent, data-driven cost-of-living and purchasing-power comparator built with FastAPI, MongoDB Atlas, and React.

---

## Overview

**Relocation Compass** helps professionals, remote workers, and job seekers calculate the true value of their compensation across different global cities. Instead of relying on generic averages, the application evaluates granular, nested expense categories—such as housing, groceries, transit, and utilities—to compute the exact salary required to maintain an equivalent standard of living in a target location.

---

## Architecture & Data Flow

1 Monorepo (GitHub)
├── /frontend  ──► Cloudflare Pages (Vite + React SPA)
└── /backend   ──► Render Web Service (FastAPI ASGI)
│
▼
MongoDB Atlas (M0 Cluster)

1. **Client Request:** The user selects origin and destination cities and enters their current annual compensation.
2. **API Processing:** FastAPI receives the payload, queries MongoDB Atlas using asynchronous non-blocking drivers (`motor`), and fetches nested city cost profiles.
3. **Purchasing Power Engine:** The backend computes relative cost indices, category differentials, and the adjusted target salary.
4. **Data Visualization:** The frontend displays an interactive visual verdict with granular expense breakdowns.

---

## Data Schema & Metrics Displayed

City records are structured as nested NoSQL documents in MongoDB Atlas[cite: 1]:

* **Location Context:** City, Country, and normalized search indices[cite: 1].
* **Housing Costs:** 1-bedroom & 3-bedroom rental estimates (city center vs. outside center)[cite: 1].
* **Groceries Basket:** Standardized monthly staple allocations (milk, bread, rice, eggs, poultry, produce).
* **Transportation:** Monthly public transit passes, single-journey tickets, and fuel prices[cite: 1].
* **Utilities & Lifestyle:** Electricity/water utilities (85m² standard), high-speed broadband, fitness memberships, and dining[cite: 1].
* **Salary Adjuster Output:** 
  * Target salary equivalent
  * Percentage cost variance (+% or -%)
  * Side-by-side expense category bar chart

---

## Tech Stack & UI Tooling

### Backend
* **FastAPI:** Asynchronous, high-performance Python REST API framework[cite: 1].
* **MongoDB Atlas (M0):** Cloud-hosted NoSQL database with nested document structure[cite: 1].
* **Motor & PyMongo:** Async I/O client for database queries[cite: 1].
* **Pandas:** Data extraction, sanitization, and schema reshaping[cite: 1].
* **Pydantic:** Strict runtime data validation and typing[cite: 1].

### Frontend & UI Tooling
* **React 18 + Vite:** Fast Single Page Application setup[cite: 1].
* **Recharts:** Declarative, responsive SVG charting library used for multi-category side-by-side cost comparisons.
* **Lucide React:** Lightweight, modern UI icons for search inputs, metrics, and navigation.
* **Three.js & React Three Fiber (`@react-three/fiber`, `@react-three/drei`):** Declarative 3D canvas for the interactive hero element[cite: 1].
* **Driver.js:** Lightweight walkthrough library for guided first-visit user onboarding[cite: 1].

---

## Local Development Setup

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

Local UI: http://localhost:5173

Deployment Targets
Frontend: Cloudflare Pages[cite: 1]

Backend: Render (Web Service)[cite: 1]

Database: MongoDB Atlas (ap-south-1)[cite: 1]