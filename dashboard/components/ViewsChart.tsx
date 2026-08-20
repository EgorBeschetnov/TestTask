"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ViewsChart({
  data,
}: {
  data: { date: string; views: number }[];
}) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E94F82" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#E94F82" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#ECE7E2" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#726C80"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke="#726C80" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #ECE7E2",
              fontSize: 13,
            }}
          />
          <Area
            type="monotone"
            dataKey="views"
            stroke="#E94F82"
            strokeWidth={2}
            fill="url(#viewsFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
