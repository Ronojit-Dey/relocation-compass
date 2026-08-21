from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import compare

app = FastAPI(
    title="Relocation Compass API",
    description="Cost of living comparison service powered by MongoDB and FastAPI",
    version="1.0.0"
)

# Robust CORS for local dev + future deployments
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(compare.router, prefix="/api")

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "relocation-compass-api"}