from pydantic import BaseModel, Field
from typing import Dict, Any, Optional

class CompareRequest(BaseModel):
    origin_city: str
    target_city: str
    current_annual_salary: float = Field(..., gt=0)

class ComparisonResult(BaseModel):
    origin: Dict[str, Any]
    target: Dict[str, Any]
    current_salary: float
    required_salary: float
    salary_difference_percent: float