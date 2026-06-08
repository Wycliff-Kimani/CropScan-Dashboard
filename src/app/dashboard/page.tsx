"use client";

import { useAppStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard, Button } from "@/components/ui/Cards";
import {
  DeficienciesChart,
  CropsScannedChart,
  RegionalPerformanceChart,
  DeviceUtilizationChart,
} from "@/components/charts/Charts";
import {
  Activity,
  Cpu,
  Users,
  Leaf,
  TrendingUp,
  AlertCircle,
  DownloadCloud,
  RefreshCw,
  Sprout,
  BarChart2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Monthly scans chart — hardcoded rising trend, values in thousands
const MONTHLY_SCANS_DATA = [
  { month: "Jan", scans: 58.0 },
  { month: "Feb", scans: 59.2 },
  { month: "Mar", scans: 60.1 },
  { month: "Apr", scans: 63.4 },
  { month: "May", scans: 66.8 },
  { month: "Jun", scans: 70.2 },
  { month: "Jul", scans: 74.5 },
  { month: "Aug", scans: 78.9 },
  { month: "Sep", scans: 82.3 },
  { month: "Oct", scans: 86.7 },
  { month: "Nov", scans: 90.1 },
  { month: "Dec", scans: 94.4 },
];

// Trim to current month
const currentMonth = new Date().getMonth(); // 0-indexed
const scansChartData = MONTHLY_SCANS_DATA.slice(0, currentMonth + 1);

export default function DashboardOverview() {
  const { devices, agents, scans, counties } = useAppStore();

  const [deficienciesData, setDeficienciesData] = useState<any[]>([]);
  const [cropsData, setCropsData] = useState<any[]>([]);
  const [regionalData, setRegionalData] = useState<any[]>([]);
  const [utilizationData, setUtilizationData] = useState<any[]>([]);

  // Derived KPIs from real data
  const totalDevices = devices.length || 3421;
  const onlineDevices = devices.filter((d) => d.status === "Online").length ||
    Math.round(totalDevices * 0.89);
  const totalAgents = 395;
  const activeAgents = 342;
  const avgCropHealth = scans.length > 0
    ? Math.round(scans.reduce((sum, s) => sum + s.results.healthScore, 0) / scans.length)
    : 82;
  const devicesNeedingService = Math.min(
    199,
    devices.filter(
      (d) => d.maintenanceStatus === "Needs Service" || d.maintenanceStatus === "Damaged"
    ).length || Math.round(totalDevices * 0.20)
  );

  useEffect(() => {
    if (scans.length === 0) return;

    // Deficiencies
    const deficiencyCount: Record<string, number> = {};
    scans.forEach((scan) => {
      scan.results.mainNutrientDeficiencies.forEach((def) => {
        deficiencyCount[def] = (deficiencyCount[def] || 0) + 1;
      });
    });
    setDeficienciesData(
      Object.entries(deficiencyCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8)
    );

    // Crops
    const cropCount: Record<string, number> = {};
    scans.forEach((scan) => {
      cropCount[scan.cropType] = (cropCount[scan.cropType] || 0) + 1;
    });
    setCropsData(
      Object.entries(cropCount)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6)
    );

    // Regional
    setRegionalData(
      counties
        .filter((c) => c.scanCount > 0)
        .map((c) => ({
          county: c.name,
          healthScore: c.avgHealthScore,
          scans: c.scanCount,
        }))
        .sort((a, b) => b.scans - a.scans)
        .slice(0, 8)
    );

    // Utilization — weekly trend
    setUtilizationData([
      { month: "Week 1", utilization: 82 },
      { month: "Week 2", utilization: 85 },
      { month: "Week 3", utilization: 87 },
      { month: "Week 4", utilization: 91 },
    ]);
  }, [devices, agents, scans, counties]);

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Real-time field operations monitoring
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" size="md">
              <RefreshCw size={18} />
              Refresh
            </Button>
            <Button variant="primary" size="md">
              <DownloadCloud size={18} />
              Export
            </Button>
          </div>
        </div>

        {/* Primary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard
            title="Total Devices"
            value={totalDevices.toLocaleString()}
            icon={Cpu}
            description={`${onlineDevices.toLocaleString()} online`}
            trend={{ value: 12, isPositive: true }}
          />
          <KPICard
            title="Active Agents"
            value={activeAgents.toLocaleString()}
            icon={Users}
            description={`of ${totalAgents.toLocaleString()} total`}
            trend={{ value: 5, isPositive: true }}
          />
          <KPICard
            title="Pre-Harvest Scans Today"
            value="2,719"
            icon={Activity}
            description="62,500+ this month"
            trend={{ value: 23, isPositive: true }}
          />
          <KPICard
            title="Avg Crop Health"
            value={`${avgCropHealth}%`}
            icon={Leaf}
            description="Overall wellbeing score"
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Secondary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Post-Harvest Scans Today */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Post-Harvest Scans Today
                </p>
                <p className="text-2xl font-bold text-ag-green-600 dark:text-ag-green-400 mt-1">
                  2,540
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ↑ 18% vs last month
                </p>
              </div>
              <div className="w-12 h-12 bg-ag-green-100 dark:bg-ag-green-900/30 rounded-lg flex items-center justify-center">
                <Sprout className="text-ag-green-600" size={24} />
              </div>
            </div>
          </div>

          {/* Avg Fertilizer Savings */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Avg Fertilizer Savings
                </p>
                <p className="text-2xl font-bold text-ag-green-600 dark:text-ag-green-400 mt-1">
                  42%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ↑ 6% vs last season
                </p>
              </div>
              <div className="w-12 h-12 bg-ag-green-100 dark:bg-ag-green-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-ag-green-600" size={24} />
              </div>
            </div>
          </div>

          {/* Devices Needing Service */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Devices Needing Service
                </p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                  {devicesNeedingService.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ↓ 4% vs last month
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <AlertCircle className="text-amber-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Scans Over Time — Monthly Rising Trend */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Scans Over Time
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Monthly scan volume (thousands)
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-ag-green-50 dark:bg-ag-green-900/20 rounded-lg">
                <BarChart2 size={14} className="text-ag-green-600" />
                <span className="text-xs font-medium text-ag-green-700 dark:text-ag-green-400">
                  2026
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={scansChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(v) => `${v}k`}
                  domain={[50, 100]}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}k scans`, "Volume"]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="scans"
                  name="Scans (000s)"
                  stroke="#16a34a"
                  strokeWidth={2.5}
                  dot={{ fill: "#16a34a", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <DeficienciesChart data={deficienciesData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <CropsScannedChart data={cropsData} height={300} />
          </div>
          <div className="lg:col-span-2">
            <RegionalPerformanceChart data={regionalData} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DeviceUtilizationChart data={utilizationData} />

          {/* Recent Scans */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Scans
            </h3>
            <div className="space-y-3">
              {scans.slice(0, 5).map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-start justify-between pb-3 border-b border-gray-200 dark:border-slate-700 last:border-0"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {scan.cropType} — {scan.location.county}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Agent: {scan.agentId} · Device: {scan.deviceId}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Health: {scan.results.healthScore}%
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-ag-green-100 text-ag-green-800 dark:bg-ag-green-900/30 dark:text-ag-green-400">
                    {formatDate(scan.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}