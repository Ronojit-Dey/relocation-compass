import React, { useState, useEffect } from "react";
import { Building2, PlaneTakeoff, DollarSign, ArrowDown, ArrowUp } from "lucide-react";
import CostChart from "./CostChart";
import DetailedBreakdown from "./DetailedBreakdown";
import { fetchCities, compareCities } from "../api";

export default function Dashboard({ onBack }) {
  const [cities, setCities] = useState([]);
  const [origin, setOrigin] = useState("San Francisco");
  const [target, setTarget] = useState("Austin");
  const [salary, setSalary] = useState(120000);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard" | "comparison"

  useEffect(() => {
    fetchCities().then((data) => {
      console.log("Cities loaded from backend:", data ? data.length : 0);
      if (Array.isArray(data) && data.length > 0) {
        setCities(data);
        
        // Pick default cities that exist in dataset
        const defaultOrigin = data.find(c => c.city.toLowerCase().includes("san francisco"))?.city || data[0].city;
        const defaultTarget = data.find(c => c.city.toLowerCase().includes("austin"))?.city || (data[1] ? data[1].city : data[0].city);
        
        setOrigin(defaultOrigin);
        setTarget(defaultTarget);
        executeComparison(defaultOrigin, defaultTarget, salary);
      }
    });
  }, []);
  const executeComparison = async (originCity, targetCity, currentSalary) => {
    if (!originCity || !targetCity || !currentSalary) return;
    setLoading(true);
    try {
      const data = await compareCities(originCity, targetCity, currentSalary);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    executeComparison(origin, target, salary);
  };

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background Soft Glow */}
      <div className="fixed -top-24 -right-24 w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Top Navbar */}
      <nav className="w-full h-20 bg-background flex justify-between items-center px-6 md:px-12 max-w-container-max mx-auto shadow-neo-sm z-50 sticky top-0">
        <div
          onClick={onBack}
          className="font-headline text-xl font-bold text-primary cursor-pointer hover:opacity-80 transition"
        >
          Relocation Compass
        </div>

        <div className="hidden md:flex gap-8">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`pb-1 font-semibold text-sm transition-colors ${
              activeTab === "dashboard"
                ? "text-primary border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("comparison")}
            className={`pb-1 font-semibold text-sm transition-colors ${
              activeTab === "comparison"
                ? "text-primary border-b-2 border-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Comparison Deep-Dive
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="text-primary text-sm font-semibold px-4 py-2 hover:opacity-75"
          >
            Overview
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-grow max-w-container-max w-full mx-auto px-6 md:px-12 py-8 flex flex-col gap-6">
        {/* Controls Section (Neomorphic Raised) */}
        <form
          onSubmit={handleCalculate}
          className="shadow-neo rounded-2xl p-6 md:p-8 bg-surface flex flex-wrap gap-6 items-end"
        >
          <div className="flex-1 min-w-[220px]">
            <label className="block text-xs font-semibold text-on-surface-variant mb-2 ml-1 uppercase tracking-wider">
              Origin City
            </label>
            <div className="relative">
              <Building2 className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full h-12 bg-surface shadow-neo-inset rounded-xl pl-12 pr-4 border-none text-sm font-medium text-on-surface focus:outline-none appearance-none"
              >
                {cities.map((c, i) => (
                  <option key={i} value={c.city}>
                    {c.city}, {c.country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 min-w-[220px]">
            <label className="block text-xs font-semibold text-on-surface-variant mb-2 ml-1 uppercase tracking-wider">
              Destination City
            </label>
            <div className="relative">
              <PlaneTakeoff className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full h-12 bg-surface shadow-neo-inset rounded-xl pl-12 pr-4 border-none text-sm font-medium text-on-surface focus:outline-none appearance-none"
              >
                {cities.map((c, i) => (
                  <option key={i} value={c.city}>
                    {c.city}, {c.country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-on-surface-variant mb-2 ml-1 uppercase tracking-wider">
              Current Salary ($ USD)
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full h-12 bg-surface shadow-neo-inset rounded-xl pl-12 pr-4 border-none text-sm font-medium text-on-surface focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 px-8 bg-primary-container text-on-surface font-headline text-base font-bold rounded-xl shadow-neo-button active:shadow-neo-inset transition-all whitespace-nowrap cursor-pointer"
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>
        </form>

        {/* Dashboard Grid View */}
        {result && activeTab === "dashboard" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Verdict Card */}
            <div className="lg:col-span-1 bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-surface-container-low rounded-bl-full -z-10" />
              <h3 className="text-sm font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                Target Salary Required
              </h3>
              <div className="text-4xl font-headline font-extrabold text-on-surface mb-4">
                ${result.required_salary.toLocaleString()}
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                    result.salary_difference_percent <= 0
                      ? "bg-surface-container text-primary"
                      : "bg-error/10 text-error"
                  }`}
                >
                  {result.salary_difference_percent <= 0 ? (
                    <ArrowDown className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowUp className="w-3.5 h-3.5" />
                  )}
                  {Math.abs(result.salary_difference_percent)}% {result.salary_difference_percent <= 0 ? "Decrease" : "Increase"}
                </span>
                <span className="text-xs text-on-surface-variant font-medium">
                  vs. Current (${salary.toLocaleString()})
                </span>
              </div>
            </div>

            {/* Chart Card */}
            <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-headline font-bold text-lg text-on-surface">
                  Cost Category Comparison
                </h3>
              </div>
              <CostChart origin={result.origin} target={result.target} />
            </div>

            {/* Detailed Table Card */}
            <div className="lg:col-span-3">
              <DetailedBreakdown origin={result.origin} target={result.target} />
            </div>
          </div>
        )}

        {/* Dedicated Deep-Dive Tab */}
        {result && activeTab === "comparison" && (
          <div className="space-y-6">
            <DetailedBreakdown origin={result.origin} target={result.target} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 bg-background border-t border-outline-variant/30 mt-12">
        <div className="max-w-container-max mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
          <div>© Relocation Compass. Real-time cost-of-living purchasing power calculator.</div>
          <div className="flex gap-6">
            <span className="hover:text-primary cursor-pointer">MongoDB Atlas M0</span>
            <span className="hover:text-primary cursor-pointer">FastAPI</span>
            <span className="hover:text-primary cursor-pointer">React SPA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}