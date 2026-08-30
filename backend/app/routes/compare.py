from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
import re
from app.db import get_database
from app.models import CompareRequest, ComparisonResult

router = APIRouter()

def get_cat_val(city_costs: dict, cat: str) -> float:
    c = city_costs.get(cat, {})
    if cat == "housing":
        return float(c.get("rent_1br_outside") or c.get("rent_1br_center") or 0.0)
    elif cat == "transport":
        return float(c.get("monthly_pass") or c.get("monthly_estimate") or 0.0)
    return float(c.get("monthly_estimate") or 0.0)

def build_category_breakdown(city_a: dict, city_b: dict) -> list[dict]:
    weights = {"housing": 0.45, "groceries": 0.25, "transport": 0.15, "utilities": 0.15}
    categories = ["housing", "groceries", "transport", "utilities"]
    breakdown = []

    for cat in categories:
        val_a = get_cat_val(city_a.get("costs", {}), cat)
        val_b = get_cat_val(city_b.get("costs", {}), cat)
        
        delta_pct = round(((val_b - val_a) / val_a * 100), 1) if val_a > 0 else 0.0
        
        if val_a == 0 and val_b == 0:
            radar_a, radar_b = 50, 50
        elif val_a >= val_b:
            radar_a = 100
            radar_b = round((val_b / val_a) * 100) if val_a > 0 else 100
        else:
            radar_b = 100
            radar_a = round((val_a / val_b) * 100) if val_b > 0 else 100

        breakdown.append({
            "category": cat.capitalize(),
            "city_a_value": val_a,
            "city_b_value": val_b,
            "delta_pct": delta_pct,
            "weight_pct": round(weights.get(cat, 0.25) * 100),
            "radar_a": radar_a,
            "radar_b": radar_b
        })
    return breakdown

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
    return await cursor.to_list(length=5000)

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
    
    ratio = (target_total / origin_total) if origin_total > 0 else 1.0
    required_salary = round(payload.current_annual_salary * ratio)
    diff_pct = round(((required_salary - payload.current_annual_salary) / payload.current_annual_salary) * 100, 1)
    
    category_breakdown = build_category_breakdown(origin_doc, target_doc)
    
    return ComparisonResult(
        origin=origin_doc,
        target=target_doc,
        current_salary=payload.current_annual_salary,
        required_salary=required_salary,
        salary_difference_percent=diff_pct,
        category_breakdown=category_breakdown
    )