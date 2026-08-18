const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function fetchCities() {
  const res = await fetch(`${API_BASE}/api/cities`);
  if (!res.ok) throw new Error("Failed to load cities");
  return res.json();
}

export async function compareCities(originCity, targetCity, currentSalary) {
  const res = await fetch(`${API_BASE}/api/compare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      origin_city: originCity,
      target_city: targetCity,
      current_annual_salary: Number(currentSalary)
    })
  });
  if (!res.ok) throw new Error("Failed to calculate comparison");
  return res.json();
}