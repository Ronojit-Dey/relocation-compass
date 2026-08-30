# 🧭 Relocation Compass

> **Full-Stack Purchasing Power Parity (PPP) & Cost of Living Analytics Engine**
> Translate your true lifestyle and compensation across 4,900+ global metropolitan hubs.

[![Live Demo](https://img.shields.io/badge/Live%20App-relocation--compass.pages.dev-00ed64?style=for-the-badge&logo=cloudflare&logoColor=white)](https://relocation-compass.pages.dev)
[![API Status](https://img.shields.io/badge/API-FastAPI%20on%20Render-46e3b7?style=for-the-badge&logo=fastapi&logoColor=white)](https://relocation-compass-l82u.onrender.com/health)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas%20M0-13aa52?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

---

## 🌐 Live Deployments

* **Production Client:** [https://relocation-compass.pages.dev](https://relocation-compass.pages.dev)
* **Backend API Base:** [https://relocation-compass-l82u.onrender.com](https://relocation-compass-l82u.onrender.com)
* **Interactive API Docs:** [https://relocation-compass-l82u.onrender.com/docs](https://relocation-compass-l82u.onrender.com/docs)
* **Health Check Probe:** [https://relocation-compass-l82u.onrender.com/health](https://relocation-compass-l82u.onrender.com/health)

---

## ⚡ Overview

**Relocation Compass** evaluates what an annual salary is genuinely worth when transitioning across different cities worldwide. Standard cost-of-living calculators rely solely on flat, national indices. This engine calculates purchasing power parity across discrete expense categories: housing, groceries, transit, and utilities.

The interface is built using a custom light-mode **Neomorphic Design System** (`#00ed64` and deep forest green `#1b361f` accents), paired with an interactive 4-chart analytical deep-dive workspace and client-side multi-currency engine.

---

## 🛠️ Architecture & System Design

```
                 ┌─────────────────────────────────────────┐
                 │          Cloudflare Pages Edge          │
                 │    Vite + React SPA (Neomorphic UI)     │
                 └────────────────────┬────────────────────┘
                                      │
                               HTTPS / REST
                           (CORS Preflight Spec)
                                      │
                                      ▼
                 ┌─────────────────────────────────────────┐
                 │             Render Web Service          │
                 │         FastAPI + Uvicorn ASGI          │
                 │    (Pydantic V2 + Weighted PPP Math)    │
                 └────────────────────┬────────────────────┘
                                      │
                            Asynchronous Queries
                         (Motor Driver / PyMongo 4)
                                      │
                                      ▼
                 ┌─────────────────────────────────────────┐
                 │           MongoDB Atlas Cluster         │
                 │   Indexed Collections (4,900+ Cities)   │
                 └─────────────────────────────────────────┘
```

### Technical Highlights

* **Edge Client**: React 19 + Vite deployed to Cloudflare Pages edge cache.
* **Non-Blocking Backend**: FastAPI ASGI service containerized on Render utilizing `motor` for non-blocking database queries.
* **Flexible Search Combobox**: Debounced typeahead search matching across both city names and country metadata.
* **Dynamic Currency Converter**: Client-side exchange engine supporting major presets (`USD`, `INR`, `EUR`, `GBP`, `CAD`, `AUD`) and customizable rates.
* **Visual Telemetry (Recharts)**:
  * **Bar Chart**: Nominal monthly cost comparisons.
  * **Radar Chart**: Normalized 0–100 lifestyle profiles.
  * **Area Chart**: 6-month cumulative burn-rate trajectories.
  * **Treemap**: Relative budget allocation footprints.
* **Instant CSV Dossier**: One-click data export assembling category metrics, variances, and localized currency projections.

---

## 📊 Endpoints

### `GET /health`
Returns service uptime status.
```json
{
  "status": "ok",
  "service": "relocation-compass-api"
}
```

### `GET /api/cities`
Retrieves indexed city metadata for auto-suggestion inputs.

```json
[
  {
    "city": "London",
    "country": "United Kingdom",
    "search_key": "london united kingdom"
  }
]
```

### `POST /api/compare`
Calculates purchasing power equivalence and multi-category variance metrics.

**Payload:**
```json
{
  "origin_city": "San Francisco",
  "target_city": "Austin",
  "current_annual_salary": 120000
}
```

**Response:**
```json
{
  "origin": { "city": "San Francisco", "country": "United States", "costs": { ... } },
  "target": { "city": "Austin", "country": "United States", "costs": { ... } },
  "current_salary": 120000.0,
  "required_salary": 82450.0,
  "salary_difference_percent": -31.3,
  "category_breakdown": [
    {
      "category": "Housing",
      "city_a_value": 2800.0,
      "city_b_value": 1650.0,
      "delta_pct": -41.1,
      "weight_pct": 45,
      "radar_a": 100,
      "radar_b": 59
    }
  ]
}
```

---

## 💻 Local Setup & Development

### 1. Prerequisites
* Node.js (v18+)
* Python (v3.10+)
* MongoDB Atlas cluster URI

### 2. Backend Installation
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables (.env)
echo "MONGODB_URI=your_atlas_connection_string" > .env
echo "DB_NAME=relocation_compass" >> .env

# Run FastAPI server
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Installation
```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables (.env)
echo "VITE_API_BASE_URL=http://127.0.0.1:8000" > .env

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the application.

---

## 📂 Repository Structure

```
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   └── compare.py      # Endpoints: /cities and /compare
│   │   ├── db.py               # Motor MongoDB connection manager
│   │   ├── models.py           # Pydantic V2 schemas
│   │   └── main.py             # FastAPI entrypoint and CORS policy
│   └── requirements.txt        # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CitySearchSelect.jsx      # Searchable typeahead combobox
│   │   │   ├── ComparisonDeepDive.jsx    # 4-grid Recharts dashboard
│   │   │   ├── CostChart.jsx             # Overview comparison chart
│   │   │   ├── Dashboard.jsx             # Main interactive application view
│   │   │   ├── DetailedBreakdown.jsx     # Itemized table and CSV export
│   │   │   ├── Footer.jsx                # Neomorphic footer
│   │   │   ├── HeroScene.jsx             # Interactive 3D globe canvas
│   │   │   ├── LandingPage.jsx           # Entry presentation layout
│   │   │   └── PipelineRoadmap.jsx       # Behind-the-scenes pipeline spine
│   │   ├── api.js              # Fetch client and offline fallback mocks
│   │   ├── App.jsx             # Screen router and view state manager
│   │   └── index.css           # Custom neomorphic shadows and utility tokens
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🔗 Connect

[![GitHub](https://img.shields.io/badge/GitHub-Ronojit--Dey-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ronojit-Dey)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ranajit%20Dey-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ranajit-dey-4b8911275/)
[![Twitter](https://img.shields.io/badge/Twitter-%40Rono__Jit__-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/Rono_Jit_)
[![Live Demo](https://img.shields.io/badge/Live%20Site-relocation--compass.pages.dev-00ed64?style=for-the-badge&logo=cloudflare&logoColor=white)](https://relocation-compass.pages.dev/)

---

## 🛡️ License

Distributed under the MIT License. Open-source for personal and educational use.