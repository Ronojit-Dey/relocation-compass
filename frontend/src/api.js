const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";


const MOCK_CITIES = [
  {
    city: "San Francisco",
    country: "United States",
    costs: {
      housing: { rent_1br_center: 3400, rent_1br_outside: 2800 },
      groceries: { monthly_estimate: 620 },
      transport: { monthly_pass: 98 },
      utilities: { monthly_estimate: 180 }
    }
  },
  {
    city: "Austin",
    country: "United States",
    costs: {
      housing: { rent_1br_center: 2100, rent_1br_outside: 1650 },
      groceries: { monthly_estimate: 480 },
      transport: { monthly_pass: 42 },
      utilities: { monthly_estimate: 195 }
    }
  },
  {
    city: "New York",
    country: "United States",
    costs: {
      housing: { rent_1br_center: 3900, rent_1br_outside: 2600 },
      groceries: { monthly_estimate: 680 },
      transport: { monthly_pass: 132 },
      utilities: { monthly_estimate: 210 }
    }
  },
  {
    city: "London",
    country: "United Kingdom",
    costs: {
      housing: { rent_1br_center: 2600, rent_1br_outside: 1900 },
      groceries: { monthly_estimate: 450 },
      transport: { monthly_pass: 180 },
      utilities: { monthly_estimate: 240 }
    }
  }
];


export async function fetchCities() {
  try {
    const res = await fetch(`${API_BASE}/api/cities`);
    if (!res.ok) throw new Error("API offline");
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data;
    return MOCK_CITIES;
  } catch (err) {
    console.warn("Backend unavailable, using mock city dataset for visual testing:", err);
    return MOCK_CITIES;
  }
}

export async function compareCities(originCity, targetCity, currentSalary) {
  try {
    const res = await fetch(`${API_BASE}/api/compare`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin_city: originCity,
        target_city: targetCity,
        current_annual_salary: Number(currentSalary)
      })
    });
    if (!res.ok) throw new Error("API offline");
    return await res.json();
  } catch (err) {
    console.warn("Backend unavailable, computing comparison locally with mock data.");
    const originObj = MOCK_CITIES.find(c => c.city === originCity) || MOCK_CITIES[0];
    const targetObj = MOCK_CITIES.find(c => c.city === targetCity) || MOCK_CITIES[1];

    const originTotal =
      (originObj.costs.housing.rent_1br_outside || 2000) +
      originObj.costs.groceries.monthly_estimate +
      originObj.costs.transport.monthly_pass +
      originObj.costs.utilities.monthly_estimate;

    const targetTotal =
      (targetObj.costs.housing.rent_1br_outside || 2000) +
      targetObj.costs.groceries.monthly_estimate +
      targetObj.costs.transport.monthly_pass +
      targetObj.costs.utilities.monthly_estimate;

    const ratio = targetTotal / originTotal;
    const required_salary = Math.round(Number(currentSalary) * ratio);
    const diff_percent = Number((((required_salary - Number(currentSalary)) / Number(currentSalary)) * 100).toFixed(1));

    return {
      origin: originObj,
      target: targetObj,
      current_salary: Number(currentSalary),
      required_salary: required_salary,
      salary_difference_percent: diff_percent
    };
  }
}