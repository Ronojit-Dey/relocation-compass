import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "relocation_compass")

if not MONGO_URI:
    raise ValueError("MONGODB_URI is not set in backend/.env")

# Ensure tls options are appended to URI to prevent Windows TLS handshake drops
sep = "&" if "?" in MONGO_URI else "?"
connection_uri = f"{MONGO_URI}{sep}tls=true&tlsAllowInvalidCertificates=true"

client = AsyncIOMotorClient(
    connection_uri,
    serverSelectionTimeoutMS=10000
)

db = client[DB_NAME]

def get_database():
    return db