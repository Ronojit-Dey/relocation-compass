from pydantic import BaseModel
from typing import Dict, Any, List, Optional

class CompareRequest(BaseModel):
    origin_city: str
    target_city: str
    current_annual_salary: float

class CategoryBreakdownItem(BaseModel):
    category: str
    city_a_value: float
    city_b_value: float
    delta_pct: float
    weight_pct: int
    radar_a: int
    radar_b: int

class ComparisonResult(BaseModel):
    origin: Dict[str, Any]
    target: Dict[str, Any]
    current_salary: float
    required_salary: float
    salary_difference_percent: float
    category_breakdown: Optional[List[CategoryBreakdownItem]] = []