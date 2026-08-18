import os
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "relocation_compass")
CSV_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "cost-of-living_v2.csv")

if not MONGO_URI:
    raise ValueError("MONGODB_URI is missing from .env")

def clean_val(val, default=0.0):
    if pd.isna(val) or val is None:
        return default
    try:
        return round(float(val), 2)
    except (ValueError, TypeError):
        return default

def run():
    print(f"Loading {CSV_PATH}...")
    df = pd.read_csv(CSV_PATH)
    
    # Filter rows with missing city or country
    df = df.dropna(subset=["city", "country"])

    documents = []

    for _, row in df.iterrows():
        # Housing Costs
        rent_1br_center = clean_val(row.get("x48"))
        rent_1br_outside = clean_val(row.get("x49"))
        rent_3br_center = clean_val(row.get("x50"))
        rent_3br_outside = clean_val(row.get("x51"))

        # Monthly Basket Estimates
        # Groceries: Milk (10L), Bread (8 loaves), Rice (4kg), Eggs (48), Chicken (4kg), Apples (4kg), Potatoes (4kg)
        groceries_monthly = (
            clean_val(row.get("x9")) * 10 +
            clean_val(row.get("x10")) * 8 +
            clean_val(row.get("x11")) * 4 +
            clean_val(row.get("x12")) * 4 +
            clean_val(row.get("x14")) * 4 +
            clean_val(row.get("x16")) * 4 +
            clean_val(row.get("x20")) * 4
        )

        transport_pass = clean_val(row.get("x29"))
        utilities_monthly = clean_val(row.get("x36")) + clean_val(row.get("x38"))
        monthly_salary = clean_val(row.get("x54"))

        # Baseline single-person cost of living (1BR outside center + groceries + transport + utilities)
        primary_rent = rent_1br_outside if rent_1br_outside > 0 else rent_1br_center
        estimated_col = primary_rent + groceries_monthly + transport_pass + utilities_monthly

        doc = {
            "city": str(row["city"]).strip(),
            "country": str(row["country"]).strip(),
            "search_key": f"{str(row['city']).strip().lower()}, {str(row['country']).strip().lower()}",
            "currency": "USD",
            "costs": {
                "housing": {
                    "rent_1br_center": rent_1br_center,
                    "rent_1br_outside": rent_1br_outside,
                    "rent_3br_center": rent_3br_center,
                    "rent_3br_outside": rent_3br_outside,
                },
                "groceries": {
                    "monthly_estimate": round(groceries_monthly, 2),
                    "milk_1l": clean_val(row.get("x9")),
                    "bread_500g": clean_val(row.get("x10")),
                    "rice_1kg": clean_val(row.get("x11")),
                    "eggs_12": clean_val(row.get("x12")),
                    "chicken_1kg": clean_val(row.get("x14")),
                },
                "transport": {
                    "monthly_pass": transport_pass,
                    "one_way_ticket": clean_val(row.get("x28")),
                    "gas_1l": clean_val(row.get("x33")),
                },
                "utilities": {
                    "basic_85sqm": clean_val(row.get("x36")),
                    "internet_60mbps": clean_val(row.get("x38")),
                    "monthly_estimate": round(utilities_monthly, 2)
                },
                "lifestyle": {
                    "meal_inexpensive": clean_val(row.get("x1")),
                    "meal_midrange_2p": clean_val(row.get("x2")),
                    "fitness_club_monthly": clean_val(row.get("x39")),
                    "cinema_1seat": clean_val(row.get("x41"))
                }
            },
            "monthly_avg_salary": monthly_salary,
            "estimated_monthly_col": round(estimated_col, 2),
            "data_quality": int(row.get("data_quality", 0))
        }
        documents.append(doc)

    print(f"Connecting to MongoDB cluster and database: {DB_NAME}...")
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db["cities"]

    collection.delete_many({})
    result = collection.insert_many(documents)
    collection.create_index([("search_key", 1)])
    collection.create_index([("city", 1)])

    print(f"Ingestion complete: {len(result.inserted_ids)} cities uploaded.")

if __name__ == "__main__":
    run()