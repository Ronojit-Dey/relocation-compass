import React from "react";
import { Home, Utensils, Car, Zap, Download } from "lucide-react";

export default function DetailedBreakdown({ origin, target }) {
  if (!origin || !target) return null;

  const rows = [
    {
      name: "Median Rent (1BR)",
      icon: Home,
      originVal: origin.costs.housing.rent_1br_outside || origin.costs.housing.rent_1br_center || 0,
      targetVal: target.costs.housing.rent_1br_outside || target.costs.housing.rent_1br_center || 0,
    },
    {
      name: "Basic Groceries (Basket)",
      icon: Utensils,
      originVal: origin.costs.groceries.monthly_estimate || 0,
      targetVal: target.costs.groceries.monthly_estimate || 0,
    },
    {
      name: "Transit Pass (Monthly)",
      icon: Car,
      originVal: origin.costs.transport.monthly_pass || 0,
      targetVal: target.costs.transport.monthly_pass || 0,
    },
    {
      name: "Utilities & Internet",
      icon: Zap,
      originVal: origin.costs.utilities.monthly_estimate || 0,
      targetVal: target.costs.utilities.monthly_estimate || 0,
    }
  ];

  const handleExportCSV = () => {
    const headers = "Expense Category,Origin (Monthly),Destination (Monthly),Variance (%)\n";
    const body = rows.map(r => {
      const diff = r.originVal > 0 ? (((r.targetVal - r.originVal) / r.originVal) * 100).toFixed(1) : "0.0";
      return `"${r.name}","$${r.originVal}","$${r.targetVal}","${diff}%"`;
    }).join("\n");

    const blob = new Blob([headers + body], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `relocation_${origin.city}_to_${target.city}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
        <h3 className="font-headline font-bold text-lg text-on-surface">Detailed Breakdown</h3>
        <button
          onClick={handleExportCSV}
          className="text-primary font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:underline cursor-pointer"
        >
          Download CSV <Download className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full text-left">
        <div className="grid grid-cols-4 px-6 py-3 border-b border-outline-variant text-xs font-semibold text-on-surface-variant uppercase tracking-wider bg-surface-container-low/40">
          <div>Expense Category</div>
          <div>{origin.city} (Monthly)</div>
          <div>{target.city} (Monthly)</div>
          <div>Variance</div>
        </div>

        {rows.map((row, idx) => {
          const Icon = row.icon;
          const diff = row.originVal > 0 ? (((row.targetVal - row.originVal) / row.originVal) * 100) : 0;
          const isCheaper = diff <= 0;

          return (
            <div
              key={idx}
              className={`grid grid-cols-4 px-6 py-4 border-b border-outline-variant/50 items-center text-sm ${
                idx % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface-container-low/30"
              }`}
            >
              <div className="flex items-center gap-3 font-medium text-on-surface">
                <Icon className="w-4 h-4 text-outline" />
                {row.name}
              </div>
              <div className="text-on-surface">${row.originVal.toLocaleString()}</div>
              <div className="text-on-surface">${row.targetVal.toLocaleString()}</div>
              <div className={`font-bold ${isCheaper ? "text-primary" : "text-error"}`}>
                {diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}