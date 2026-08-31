import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  AreaChart,
  Area,
  CartesianGrid,
  Treemap
} from "recharts";
import { TrendingDown, TrendingUp, Sparkles, Layers, DollarSign } from "lucide-react";
import DetailedBreakdown from "./DetailedBreakdown";

// Custom Tooltip for Bar Chart
function NeoBarTooltip({ active, payload, currencySymbol }) {
  if (!active || !payload || !payload.length) return null;
  const [a, b] = payload;
  const valA = Number(a.value || 0);
  const valB = Number(b.value || 0);
  const diff = valA > 0 ? (((valB - valA) / valA) * 100).toFixed(1) : "0.0";
  const isCheaper = Number(diff) <= 0;

  return (
    <div className="bg-surface shadow-neo p-3 rounded-xl border border-outline-variant/30 text-xs space-y-1">
      <p className="font-bold text-on-surface">{a.payload.category}</p>
      <div className="flex justify-between gap-4 text-on-surface-variant">
        <span>{a.name}:</span>
        <span className="font-semibold text-on-surface">
          {currencySymbol}{Math.round(valA).toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between gap-4 text-on-surface-variant">
        <span>{b.name}:</span>
        <span className="font-semibold text-[#00ed64]">
          {currencySymbol}{Math.round(valB).toLocaleString()}
        </span>
      </div>
      <div className={`pt-1 font-bold ${isCheaper ? "text-[#00ed64]" : "text-error"}`}>
        {diff > 0 ? `+${diff}%` : `${diff}%`} variance
      </div>
    </div>
  );
}

// Custom Treemap Tile Content
function CustomTreemapTile(props) {
  const { x, y, width, height, name, value, fill } = props;
  if (width < 35 || height < 35) return null;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={8}
        fill={fill}
        className="stroke-background stroke-2 transition-all duration-300"
      />
      <text
        x={x + width / 2}
        y={y + height / 2 - 4}
        textAnchor="middle"
        fill="#ffffff"
        fontSize={width < 80 ? 11 : 13}
        fontWeight="bold"
      >
        {name}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 14}
        textAnchor="middle"
        fill="rgba(255,255,255,0.85)"
        fontSize={11}
      >
        {value}%
      </text>
    </g>
  );
}

export default function ComparisonDeepDive({ result, currency, effectiveRate }) {
  if (!result) return null;

  const symbol = currency?.symbol || "$";
  const rate = effectiveRate || 1.0;
  const cityA = result.origin.city;
  const cityB = result.target.city;

  const rawBreakdown = result.category_breakdown || [];
  
  // Scaled Data for Bar & Radar
  const scaledData = rawBreakdown.map((item) => ({
    ...item,
    city_a_scaled: Math.round(item.city_a_value * rate),
    city_b_scaled: Math.round(item.city_b_value * rate),
    [cityA]: item.radar_a,
    [cityB]: item.radar_b
  }));

  // Monthly totals for cumulative burn rate
  const monthlyA = scaledData.reduce((acc, curr) => acc + curr.city_a_scaled, 0);
  const monthlyB = scaledData.reduce((acc, curr) => acc + curr.city_b_scaled, 0);

  // 6-Month Cumulative Projection for Area Chart
  const cumulativeData = [
    { month: "M1", [cityA]: monthlyA, [cityB]: monthlyB },
    { month: "M2", [cityA]: monthlyA * 2, [cityB]: monthlyB * 2 },
    { month: "M3", [cityA]: monthlyA * 3, [cityB]: monthlyB * 3 },
    { month: "M4", [cityA]: monthlyA * 4, [cityB]: monthlyB * 4 },
    { month: "M5", [cityA]: monthlyA * 5, [cityB]: monthlyB * 5 },
    { month: "M6", [cityA]: monthlyA * 6, [cityB]: monthlyB * 6 }
  ];

  // Treemap Data for Budget Weight Allocation
  const treemapPalette = ["#1b361f", "#00ed64", "#2e5d36", "#4ade80"];
  const treemapData = scaledData.map((item, idx) => ({
    name: item.category,
    value: item.weight_pct,
    fill: treemapPalette[idx % treemapPalette.length]
  }));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Deep-Dive Header */}
      <div className="bg-surface rounded-3xl p-6 md:p-8 shadow-neo border border-outline-variant/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background shadow-neo-sm text-[#00ed64] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00ed64]" />
            Deep-Dive Telemetry
          </div>
          <h2 className="font-headline font-bold text-2xl md:text-3xl text-on-surface">
            {cityA} vs {cityB}
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Granular breakdown across core living indexes scaled to {currency.code} ({symbol}).
          </p>
        </div>

        <div className="flex items-center gap-4 bg-background px-4 py-2.5 rounded-2xl shadow-neo-inset text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#1b361f]" />
            <span className="font-semibold text-on-surface">{cityA}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#00ed64]" />
            <span className="font-semibold text-on-surface">{cityB}</span>
          </div>
        </div>
      </div>

      {/* 4-Grid Visual Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Monthly Category Expenses */}
        <div className="bg-surface rounded-3xl p-6 shadow-neo border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline font-bold text-base text-on-surface">
              Monthly Category Expenses ({symbol})
            </h3>
            <span className="text-xs text-on-surface-variant font-medium">Nominal Costs</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scaledData} barGap={8}>
                <XAxis dataKey="category" tickLine={false} axisLine={false} stroke="#888888" fontSize={12} />
                <YAxis hide />
                <Tooltip content={<NeoBarTooltip currencySymbol={symbol} />} />
                <Bar dataKey="city_a_scaled" name={cityA} fill="#1b361f" radius={[6, 6, 0, 0]} />
                <Bar dataKey="city_b_scaled" name={cityB} fill="#00ed64" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Radar Profile */}
        <div className="bg-surface rounded-3xl p-6 shadow-neo border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline font-bold text-base text-on-surface">
              Lifestyle Profile (Normalized Index)
            </h3>
            <span className="text-xs text-[#00ed64] font-semibold">0-100 Relative Scale</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={scaledData}>
                <PolarGrid stroke="rgba(148, 163, 184, 0.2)" />
                <PolarAngleAxis dataKey="category" tick={{ fill: "#888888", fontSize: 11 }} />
                <Radar name={cityA} dataKey={cityA} stroke="#1b361f" fill="#1b361f" fillOpacity={0.4} />
                <Radar name={cityB} dataKey={cityB} stroke="#00ed64" fill="#00ed64" fillOpacity={0.3} />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: 6-Month Cumulative Burn (Area Chart) */}
        <div className="bg-surface rounded-3xl p-6 shadow-neo border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline font-bold text-base text-on-surface">
              6-Month Expense Velocity ({symbol})
            </h3>
            <span className="text-xs text-on-surface-variant font-medium">Cumulative Outflow</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cumulativeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaOrigin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1b361f" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1b361f" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="areaTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ed64" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#00ed64" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={11}
                  tickFormatter={(val) => `${symbol}${Math.round(val / 1000)}k`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val) => `${symbol}${Number(val).toLocaleString()}`}
                  contentStyle={{ backgroundColor: "#1b361f", borderRadius: "12px", border: "none", color: "#fff" }}
                />
                <Area type="monotone" dataKey={cityA} stroke="#1b361f" strokeWidth={2} fillOpacity={1} fill="url(#areaOrigin)" />
                <Area type="monotone" dataKey={cityB} stroke="#00ed64" strokeWidth={2} fillOpacity={1} fill="url(#areaTarget)" />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Expense Weight Allocation (Treemap) */}
        <div className="bg-surface rounded-3xl p-6 shadow-neo border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline font-bold text-base text-on-surface">
              Expense Weight Footprint (%)
            </h3>
            <span className="text-xs text-[#00ed64] font-semibold">Normalized Allocation</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={treemapData}
                dataKey="value"
                nameKey="name"
                aspectRatio={4 / 3}
                stroke="#fff"
                content={<CustomTreemapTile />}
              >
                <Tooltip
                contentStyle={{
                backgroundColor: "#064e3b", // dark emerald container
                borderColor: "#10b981",     // crisp border
                 borderRadius: "0.5rem",
                color: "#bbf7d0",
                }}
                itemStyle={{
              color: "#bbf7d0",          // forces text/numbers to light green
                }}
                  formatter={(val) => `${val}% Total Weight`}
                />
              </Treemap>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Insight Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {scaledData.map((item) => {
          const isCheaperInTarget = item.delta_pct <= 0;
          const absPct = Math.abs(item.delta_pct);
          const favoredCity = isCheaperInTarget ? cityB : cityA;

          return (
            <div
              key={item.category}
              className="bg-surface rounded-2xl p-4 shadow-neo border border-outline-variant/20 flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  {item.category}
                </span>
                {isCheaperInTarget ? (
                  <span className="p-1 rounded-full bg-[#00ed64]/10 text-[#00ed64]">
                    <TrendingDown className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <span className="p-1 rounded-full bg-error/10 text-error">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <div className="text-sm text-on-surface">
                <strong>{absPct}% {isCheaperInTarget ? "cheaper" : "more expensive"}</strong> in{" "}
                <span className="font-semibold text-primary">{favoredCity}</span>
              </div>

              <div className="text-[11px] text-on-surface-variant pt-1 border-t border-outline-variant/20 flex justify-between">
                <span>Weight: {item.weight_pct}%</span>
                <span>
                  {symbol}{item.city_b_scaled}/mo
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Itemized Table Breakdown */}
      <div className="pt-2">
        <DetailedBreakdown
          origin={result.origin}
          target={result.target}
          currency={currency}
          effectiveRate={rate}
        />
      </div>
    </div>
  );
}