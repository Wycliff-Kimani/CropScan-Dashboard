"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#166534",
  "#4ade80",
  "#34d399",
  "#6ee7b7",
  "#a7f3d0",
  "#d1fae5",
];

interface ChartContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({
  title,
  description,
  children,
  className = "",
}: ChartContainerProps) {
  return (
    <div className={`card p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

interface LineChartProps {
  data: any[];
  dataKey: string;
  xAxisKey: string;
  title?: string;
  height?: number;
}

export function SimpleLineChart({
  data,
  dataKey,
  xAxisKey,
  title,
  height = 300,
}: LineChartProps) {
  return (
    <ChartContainer title={title || "Trend"}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(209 213 219)" />
          <XAxis dataKey={xAxisKey} stroke="rgb(107 114 128)" />
          <YAxis stroke="rgb(107 114 128)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(17 24 39)",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#166534"
            strokeWidth={2}
            dot={{ fill: "#166534", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function ScansOverTimeChart({
  data,
  height = 300,
}: {
  data: any[];
  height?: number;
}) {
  return (
    <ChartContainer title="Scans Over Time" description="Last 30 days activity">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(209 213 219)" />
          <XAxis dataKey="date" stroke="rgb(107 114 128)" />
          <YAxis stroke="rgb(107 114 128)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(17 24 39)",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="scans"
            stroke="#166534"
            strokeWidth={2}
            dot={{ fill: "#166534", r: 4 }}
            name="Daily Scans"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function DeficienciesChart({
  data,
  height = 300,
}: {
  data: any[];
  height?: number;
}) {
  return (
    <ChartContainer
      title="Most Common Deficiencies"
      description="Nutrient deficiencies detected"
    >
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(209 213 219)" />
          <XAxis
            dataKey="name"
            stroke="rgb(107 114 128)"
            angle={-45}
            textAnchor="end"
            height={100}
          />
          <YAxis stroke="rgb(107 114 128)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(17 24 39)",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
          />
          <Bar dataKey="count" fill="#166534" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function CropsScannedChart({
  data,
  height = 300,
}: {
  data: any[];
  height?: number;
}) {
  return (
    <ChartContainer
      title="Crops Scanned Distribution"
      description="Breakdown by crop type"
    >
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={100}
            fill="#166534"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(17 24 39)",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function RegionalPerformanceChart({
  data,
  height = 300,
}: {
  data: any[];
  height?: number;
}) {
  return (
    <ChartContainer
      title="Regional Performance"
      description="Health score by county"
    >
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(209 213 219)" />
          <XAxis
            dataKey="county"
            stroke="rgb(107 114 128)"
            angle={-45}
            textAnchor="end"
            height={100}
          />
          <YAxis stroke="rgb(107 114 128)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(17 24 39)",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
          />
          <Bar
            dataKey="healthScore"
            fill="#166534"
            radius={[8, 8, 0, 0]}
            name="Health Score"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function DeviceUtilizationChart({
  data,
  height = 300,
}: {
  data: any[];
  height?: number;
}) {
  return (
    <ChartContainer
      title="Device Utilization Rate"
      description="Scans per device"
    >
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(209 213 219)" />
          <XAxis dataKey="month" stroke="rgb(107 114 128)" />
          <YAxis stroke="rgb(107 114 128)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(17 24 39)",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="utilization"
            stroke="#166534"
            strokeWidth={2}
            dot={{ fill: "#166534", r: 4 }}
            name="Utilization %"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
