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
      category: "Housing",
      [origin.city]: origin.costs.housing.rent_1br_outside || origin.costs.housing.rent_1br_center || 0,
      [target.city]: target.costs.housing.rent_1br_outside || target.costs.housing.rent_1br_center || 0
    },
    {
      category: "Groceries",
      [origin.city]: origin.costs.groceries.monthly_estimate || 0,
      [target.city]: target.costs.groceries.monthly_estimate || 0
    },
    {
      category: "Transit",
      [origin.city]: origin.costs.transport.monthly_pass || 0,
      [target.city]: target.costs.transport.monthly_pass || 0
    },
    {
      category: "Utilities",
      [origin.city]: origin.costs.utilities.monthly_estimate || 0,
      [target.city]: target.costs.utilities.monthly_estimate || 0
    }
  ];

  return (
    <div className="w-full h-64 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ecf7e7" />
          <XAxis dataKey="category" stroke="#3b4b3b" tickLine={false} />
          <YAxis stroke="#3b4b3b" tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderColor: "#bacbb7",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(27,54,31,0.08)"
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "12px" }} />
          <Bar dataKey={origin.city} fill="#1b361f" radius={[4, 4, 0, 0]} />
          <Bar dataKey={target.city} fill="#00ed64" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}