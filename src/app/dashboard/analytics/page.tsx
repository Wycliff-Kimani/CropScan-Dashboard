"use client";

import { useAppStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  ScansOverTimeChart,
  DeficienciesChart,
  CropsScannedChart,
  RegionalPerformanceChart,
  DeviceUtilizationChart,
} from "@/components/charts/Charts";
import { ChartContainer } from "@/components/charts/Charts";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { DownloadCloud } from "lucide-react";
import { Button } from "@/components/ui/Cards";

export default function AnalyticsPage() {
  const { scans, devices, counties } = useAppStore();
  const [scansChartData, setScansChartData] = useState<any[]>([]);
  const [deficienciesData, setDeficienciesData] = useState<any[]>([]);
  const [cropsData, setCropsData] = useState<any[]>([]);
  const [regionalData, setRegionalData] = useState<any[]>([]);
  const [utilizationData, setUtilizationData] = useState<any[]>([]);
  const [yieldTrendData, setYieldTrendData] = useState<any[]>([]);

  useEffect(() => {
    // Generate scans chart data (last 30 days)
    const today = new Date();
    const scansByDate: { [key: string]: number } = {};

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      scansByDate[dateStr] = 0;
    }

    scans.forEach((scan) => {
      const dateStr = new Date(scan.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      if (dateStr in scansByDate) {
        scansByDate[dateStr]++;
      }
    });

    const chartData = Object.entries(scansByDate).map(([date, cnt]) => ({
      date,
      scans: cnt,
    }));
    setScansChartData(chartData);

    // Generate deficiencies data
    const deficiencyCount: { [key: string]: number } = {};
    scans.forEach((scan) => {
      scan.results.mainNutrientDeficiencies.forEach((def) => {
        deficiencyCount[def] = (deficiencyCount[def] || 0) + 1;
      });
    });

    const defData = Object.entries(deficiencyCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    setDeficienciesData(defData);

    // Generate crops data
    const cropCount: { [key: string]: number } = {};
    scans.forEach((scan) => {
      cropCount[scan.cropType] = (cropCount[scan.cropType] || 0) + 1;
    });

    const cData = Object.entries(cropCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
    setCropsData(cData);

    // Generate regional data
    const regData = counties
      .filter((c) => c.scanCount > 0)
      .map((c) => ({
        county: c.name,
        healthScore: c.avgHealthScore,
        scans: c.scanCount,
      }))
      .sort((a, b) => b.scans - a.scans);
    setRegionalData(regData);

    // Generate utilization data
    const utilData = [
      { month: "Week 1", utilization: 65 },
      { month: "Week 2", utilization: 72 },
      { month: "Week 3", utilization: 68 },
      { month: "Week 4", utilization: 79 },
    ];
    setUtilizationData(utilData);

    // Generate yield trend data
    const yieldData = [
      { month: "Jan", avgYield: -5, region: "National" },
      { month: "Feb", avgYield: 2, region: "National" },
      { month: "Mar", avgYield: 8, region: "National" },
      { month: "Apr", avgYield: 12, region: "National" },
      { month: "May", avgYield: 15, region: "National" },
      { month: "Jun", avgYield: 18, region: "National" },
    ];
    setYieldTrendData(yieldData);
  }, [scans, devices, counties]);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Comprehensive performance and trends analysis
            </p>
          </div>
          <Button variant="primary">
            <DownloadCloud size={18} />
            Export Report
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Scans
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {scans.length}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Last 30 days
            </p>
          </div>

          <div className="card p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Avg Health Score
            </p>
            <p className="text-3xl font-bold text-ag-green-600 dark:text-ag-green-400 mt-2">
              {scans.length > 0
                ? Math.round(
                    scans.reduce((sum, s) => sum + s.results.healthScore, 0) /
                      scans.length,
                  )
                : 0}
              %
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Crop health index
            </p>
          </div>

          <div className="card p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Device Utilization
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              {devices.length > 0
                ? Math.round((scans.length / (devices.length * 30)) * 100)
                : 0}
              %
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Monthly average
            </p>
          </div>

          <div className="card p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Top County
            </p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">
              {counties.length > 0
                ? counties.reduce((max, c) =>
                    c.scanCount > max.scanCount ? c : max,
                  ).name
                : "N/A"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              by scan volume
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ScansOverTimeChart data={scansChartData} height={350} />
          <DeficienciesChart data={deficienciesData} height={350} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <CropsScannedChart data={cropsData} height={330} />
          </div>
          <div className="lg:col-span-2">
            <RegionalPerformanceChart data={regionalData} height={330} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DeviceUtilizationChart data={utilizationData} height={330} />

          <ChartContainer
            title="Yield Trend Projection"
            description="Estimated yield impact over time"
          >
            <ResponsiveContainer width="100%" height={330}>
              <LineChart
                data={yieldTrendData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgb(209 213 219)"
                />
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
                  dataKey="avgYield"
                  stroke="#166534"
                  strokeWidth={2}
                  dot={{ fill: "#166534", r: 4 }}
                  name="Yield Impact %"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Deficiency Analysis
            </h3>
            <div className="space-y-3">
              {deficienciesData.slice(0, 8).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-ag-green-600 to-yellow-500"
                        style={{ width: `${item.count * 2}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-10 text-right">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Crop Distribution
            </h3>
            <div className="space-y-3">
              {cropsData.slice(0, 8).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-ag-green-600 to-emerald-500"
                        style={{
                          width: `${(item.value / Math.max(...cropsData.map((c) => c.value))) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-10 text-right">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
