"use client";

import { useAppStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { calculateDashboardKPIs, formatDate } from "@/lib/utils";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard, Button } from "@/components/ui/Cards";
import {
  ScansOverTimeChart,
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
} from "lucide-react";
// removed unused type imports

export default function DashboardOverview() {
  const { devices, agents, scans, counties } = useAppStore();
  const [kpis, setKpis] = useState(
    calculateDashboardKPIs(devices, agents, scans),
  );
  const [scansChartData, setScansChartData] = useState<any[]>([]);
  const [deficienciesData, setDeficienciesData] = useState<any[]>([]);
  const [cropsData, setCropsData] = useState<any[]>([]);
  const [regionalData, setRegionalData] = useState<any[]>([]);
  const [utilizationData, setUtilizationData] = useState<any[]>([]);

  useEffect(() => {
    // Recalculate KPIs
    setKpis(calculateDashboardKPIs(devices, agents, scans));

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
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
    setDeficienciesData(defData);

    // Generate crops data
    const cropCount: { [key: string]: number } = {};
    scans.forEach((scan) => {
      cropCount[scan.cropType] = (cropCount[scan.cropType] || 0) + 1;
    });

    const cData = Object.entries(cropCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
    setCropsData(cData);

    // Generate regional data
    const regData = counties
      .filter((c) => c.scanCount > 0)
      .map((c) => ({
        county: c.name,
        healthScore: c.avgHealthScore,
        scans: c.scanCount,
      }))
      .sort((a, b) => b.scans - a.scans)
      .slice(0, 8);
    setRegionalData(regData);

    // Generate utilization data
    const utilData = [
      { month: "Week 1", utilization: 65 },
      { month: "Week 2", utilization: 72 },
      { month: "Week 3", utilization: 68 },
      { month: "Week 4", utilization: 79 },
    ];
    setUtilizationData(utilData);
  }, [devices, agents, scans, counties]);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl">
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

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Total Devices"
            value={kpis.totalDevices}
            icon={Cpu}
            description={`${kpis.activeDevices} online`}
            trend={{ value: 12, isPositive: true }}
          />
          <KPICard
            title="Active Agents"
            value={kpis.activeAgents}
            icon={Users}
            description={`of ${kpis.totalAgents} total`}
            trend={{ value: 5, isPositive: true }}
          />
          <KPICard
            title="Scans Today"
            value={kpis.scansToday}
            icon={Activity}
            description={`${kpis.scansThisMonth} this month`}
            trend={{ value: 23, isPositive: true }}
          />
          <KPICard
            title="Avg Crop Health"
            value={`${kpis.avgCropHealthScore}%`}
            icon={Leaf}
            description="Overall wellbeing score"
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Secondary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Farmers Served
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {kpis.farmersServed}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Avg Fertilizer Savings
                </p>
                <p className="text-2xl font-bold text-ag-green-600 dark:text-ag-green-400 mt-1">
                  {kpis.avgFertilizerSavings}%
                </p>
              </div>
              <div className="w-12 h-12 bg-ag-green-100 dark:bg-ag-green-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-ag-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Devices Needing Service
                </p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                  {kpis.devicesNeedingService}
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
          <ScansOverTimeChart data={scansChartData} />
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

          {/* Recent Activity */}
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
                      {scan.cropType} - {scan.location.county}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Agent: {scan.agentId} • Device: {scan.deviceId}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Health: {scan.results.healthScore}%
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-ag-green-100 text-ag-green-800 dark:bg-ag-green-900/30 dark:text-ag-green-400">
                      {formatDate(scan.timestamp)}
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
