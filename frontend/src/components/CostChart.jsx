import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function CostChart({ origin, target }) {
  if (!origin || !target) return null;

  const data = [
    {
      category: "Rent (1BR)",
      [origin.city]: origin.costs.housing.rent_1br_outside || origin.costs.housing.rent_1br_center,
      [target.city]: target.costs.housing.rent_1br_outside || target.costs.housing.rent_1br_center
    },
    {
      category: "Groceries",
      [origin.city]: origin.costs.groceries.monthly_estimate,
      [target.city]: target.costs.groceries.monthly_estimate
    },
    {
      category: "Transport",
      [origin.city]: origin.costs.transport.monthly_pass,
      [target.city]: target.costs.transport.monthly_pass
    },
    {
      category: "Utilities",
      [origin.city]: origin.costs.utilities.monthly_estimate,
      [target.city]: target.costs.utilities.monthly_estimate
    }
  ];

  return (
    <div style={{ width: "100%", height: 320, marginTop: "24px" }}>
      <h3 style={{ fontSize: "1rem", color: "#64748b", marginBottom: "12px", textAlign: "center" }}>
        Monthly Cost Breakdown ($ USD)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis dataKey="category" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#fff" }} />
          <Legend />
          <Bar dataKey={origin.city} fill="#64748b" radius={[4, 4, 0, 0]} />
          <Bar dataKey={target.city} fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}