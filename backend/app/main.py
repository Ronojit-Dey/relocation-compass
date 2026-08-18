from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import compare

app = FastAPI(
    title="Relocation Compass API",
    description="Cost of living comparison service powered by MongoDB and FastAPI",
    version="1.0.0"
)

# CORS configuration for Vite local development and Cloudflare Pages
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(compare.router, prefix="/api")

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "relocation-compass-api"}