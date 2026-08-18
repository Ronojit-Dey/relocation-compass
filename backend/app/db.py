import os 
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv


load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "relocation_compass")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

def get_database():
    return db

