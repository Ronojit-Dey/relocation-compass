from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db import get_database
from app.models import CompareRequest, ComparisonResult

router = APIRouter()

@router.get("/cities")
async def list_cities(db: AsyncIOMotorDatabase = Depends(get_database)):
    cursor = db.cities.find({}, {"city": 1, "country": 1, "search_key": 1, "_id": 0}).sort("city", 1)
    return await cursor.to_list(length=5000)

@router.post("/compare", response_model=ComparisonResult)
async def compare_locations(payload: CompareRequest, db: AsyncIOMotorDatabase = Depends(get_database)):
    origin = await db.cities.find_one(
        {"$or": [{"search_key": payload.origin_city.lower()}, {"city": payload.origin_city}]},
        {"_id": 0}
    )
    target = await db.cities.find_one(
        {"$or": [{"search_key": payload.target_city.lower()}, {"city": payload.target_city}]},
        {"_id": 0}
    )

    if not origin:
        raise HTTPException(status_code=404, detail=f"Origin city '{payload.origin_city}' not found.")
    if not target:
        raise HTTPException(status_code=404, detail=f"Target city '{payload.target_city}' not found.")

    origin_col = origin.get("estimated_monthly_col", 1.0)
    target_col = target.get("estimated_monthly_col", 1.0)

    # Avoid division by zero
    if origin_col <= 0:
        origin_col = 1.0

    ratio = round(target_col / origin_col, 3)
    required_salary = round(payload.current_annual_salary * ratio, 2)
    percent_diff = round((ratio - 1.0) * 100, 1)

    if percent_diff > 0:
        verdict = f"{target['city']} is {percent_diff}% more expensive. You need at least ${required_salary:,.2f} to maintain your lifestyle."
    elif percent_diff < 0:
        verdict = f"{target['city']} is {abs(percent_diff)}% cheaper. A salary of ${required_salary:,.2f} provides the same purchasing power."
    else:
        verdict = f"{target['city']} has virtually identical living costs to {origin['city']}."

    return {
        "origin": origin,
        "target": target,
        "col_ratio": ratio,
        "required_salary": required_salary,
        "salary_difference_percent": percent_diff,
        "verdict": verdict
    }