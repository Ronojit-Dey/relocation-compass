from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
import re
from app.db import get_database
from app.models import CompareRequest, ComparisonResult

router = APIRouter()

def compute_monthly_total(city_doc: dict) -> float:
    costs = city_doc.get("costs", {})
    
    housing = costs.get("housing", {})
    rent = housing.get("rent_1br_outside") or housing.get("rent_1br_center") or 0.0
    
    groceries = costs.get("groceries", {}).get("monthly_estimate") or 0.0
    transit = costs.get("transport", {}).get("monthly_pass") or 0.0
    utilities = costs.get("utilities", {}).get("monthly_estimate") or 0.0
    
    return float(rent + groceries + transit + utilities)

@router.get("/cities")
async def list_cities(db: AsyncIOMotorDatabase = Depends(get_database)):
    cursor = db.cities.find(
        {},
        {"city": 1, "country": 1, "search_key": 1, "_id": 0}
    ).sort("city", 1)
    
    cities = await cursor.to_list(length=5000)
    return cities

@router.post("/compare", response_model=ComparisonResult)
async def compare_cities(payload: CompareRequest, db: AsyncIOMotorDatabase = Depends(get_database)):
    origin_regex = re.compile(f"^{re.escape(payload.origin_city.strip())}$", re.IGNORECASE)
    target_regex = re.compile(f"^{re.escape(payload.target_city.strip())}$", re.IGNORECASE)
    
    origin_doc = await db.cities.find_one({"city": origin_regex}, {"_id": 0})
    target_doc = await db.cities.find_one({"city": target_regex}, {"_id": 0})
    
    if not origin_doc:
        raise HTTPException(status_code=404, detail=f"Origin city '{payload.origin_city}' not found")
    if not target_doc:
        raise HTTPException(status_code=404, detail=f"Destination city '{payload.target_city}' not found")
    
    origin_total = compute_monthly_total(origin_doc)
    target_total = compute_monthly_total(target_doc)
    
    if origin_total <= 0:
        ratio = 1.0
    else:
        ratio = target_total / origin_total
        
    required_salary = round(payload.current_annual_salary * ratio)
    diff_pct = round(((required_salary - payload.current_annual_salary) / payload.current_annual_salary) * 100, 1)
    
    return ComparisonResult(
        origin=origin_doc,
        target=target_doc,
        current_salary=payload.current_annual_salary,
        required_salary=required_salary,
        salary_difference_percent=diff_pct
    )