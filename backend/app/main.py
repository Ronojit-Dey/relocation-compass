from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import compare

app = FastAPI(title="Relocation Compass API", version="1.0.0")

# Configure permissive CORS to accept requests from Cloudflare Pages
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.pages\.dev|https://.*\.workers\.dev|http://localhost:\d+",
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(compare.router, prefix="/api")

@app.get("/health")
async def health():
    return {"status": "ok", "service": "relocation-compass-api"}