import React, { useState, useEffect } from "react";
import { fetchCities, compareCities } from "./api";
import HeroScene from "./components/HeroScene";
import CostChart from "./components/CostChart";
import { ArrowRight, DollarSign, MapPin, AlertCircle } from "lucide-react";
import "driver.js/dist/driver.css";

export default function App() {
  const [cities, setCities] = useState([]);
  const [origin, setOrigin] = useState("");
  const [target, setTarget] = useState("");
  const [salary, setSalary] = useState(80000);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCities()
      .then((data) => {
        setCities(data);
        if (data.length >= 2) {
          setOrigin(data[0].city);
          setTarget(data[1].city);
        }
      })
      .catch((err) => setError("Failed to fetch cities from database."));
  }, []);

  const handleCompare = async (e) => {
    e.preventDefault();
    if (!origin || !target || !salary) return;
    setLoading(true);
    setError("");

    try {
      const data = await compareCities(origin, target, salary);
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong comparing cities.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#090d16", color: "#f8fafc", fontFamily: "sans-serif", padding: "20px 16px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        {/* Hero Section */}
        <header style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "800", letterSpacing: "-0.025em", marginBottom: "8px" }}>
            Relocation <span style={{ color: "#3b82f6" }}>Compass</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
            Adjust your salary against true living costs before accepting an offer.
          </p>
          <HeroScene />
        </header>

        {/* Comparator Form */}
        <form
          onSubmit={handleCompare}
          style={{
            backgroundColor: "#131b2e",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #1e293b",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            alignItems: "end"
          }}
        >
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#94a3b8", marginBottom: "6px" }}>
              Current City
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", backgroundColor: "#1e293b", color: "#fff", border: "1px solid #334155" }}
            >
              {cities.map((c, i) => (
                <option key={i} value={c.city}>{c.city}, {c.country}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#94a3b8", marginBottom: "6px" }}>
              Target City
            </label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", backgroundColor: "#1e293b", color: "#fff", border: "1px solid #334155" }}
            >
              {cities.map((c, i) => (
                <option key={i} value={c.city}>{c.city}, {c.country}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#94a3b8", marginBottom: "6px" }}>
              Current Annual Salary ($)
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", backgroundColor: "#1e293b", color: "#fff", border: "1px solid #334155" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              backgroundColor: "#3b82f6",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            {loading ? "Calculating..." : <>Compare <ArrowRight size={16} /></>}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "#7f1d1d", borderRadius: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            <AlertCircle size={18} /> <span>{error}</span>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div style={{ marginTop: "24px", backgroundColor: "#131b2e", padding: "24px", borderRadius: "12px", border: "1px solid #1e293b" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#3b82f6", fontWeight: "700" }}>
                Target Salary Equivalent
              </span>
              <div style={{ fontSize: "2.5rem", fontWeight: "800", margin: "8px 0" }}>
                ${result.required_salary.toLocaleString()}
              </div>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", maxWidth: "600px", margin: "0 auto" }}>
                {result.verdict}
              </p>
            </div>

            <CostChart origin={result.origin} target={result.target} />
          </div>
        )}

      </div>
    </div>
  );
}