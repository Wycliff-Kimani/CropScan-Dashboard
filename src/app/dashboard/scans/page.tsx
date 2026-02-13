"use client";

import { useAppStore } from "@/lib/store";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button, Badge } from "@/components/ui/Cards";
import { DataTable, ColumnDef } from "@/components/tables/DataTable";
import { Scan } from "@/types";
import { formatDate, formatDateShort } from "@/lib/utils";
import { Download } from "lucide-react";

export default function ScansPage() {
  const { scans } = useAppStore();
  const [expandedScan, setExpandedScan] = useState<string | null>(null);
  const [filterCrop, setFilterCrop] = useState<string>("all");
  const [filterCounty, setFilterCounty] = useState<string>("all");

  const crops = [...new Set(scans.map((s) => s.cropType))].sort();
  const counties = [...new Set(scans.map((s) => s.location.county))].sort();

  const filteredScans = scans.filter((scan) => {
    if (filterCrop !== "all" && scan.cropType !== filterCrop) return false;
    if (filterCounty !== "all" && scan.location.county !== filterCounty)
      return false;
    return true;
  });

  const columns: ColumnDef<Scan>[] = [
    {
      accessorKey: "id",
      header: "Scan ID",
      cell: (value) => <span className="font-medium text-sm">{value}</span>,
    },
    {
      accessorKey: "deviceId",
      header: "Device",
      cell: (value) => <span className="text-sm">{value}</span>,
    },
    {
      accessorKey: "agentId",
      header: "Agent",
      cell: (value) => <span className="text-sm">{value}</span>,
    },
    {
      accessorKey: "cropType",
      header: "Crop",
      cell: (value) => <span className="font-medium">{value}</span>,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: (value) => (
        <div>
          <p className="text-sm font-medium">{value.county}</p>
          <p className="text-xs text-gray-500">{value.farmerName || "N/A"}</p>
        </div>
      ),
    },
    {
      accessorKey: "results",
      header: "Health Score",
      cell: (value) => (
        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                value.healthScore >= 80
                  ? "bg-ag-green-600"
                  : value.healthScore >= 60
                    ? "bg-yellow-500"
                    : "bg-red-600"
              }`}
              style={{ width: `${value.healthScore}%` }}
            />
          </div>
          <span className="text-sm font-medium">{value.healthScore}%</span>
        </div>
      ),
    },
    {
      accessorKey: "smsSent",
      header: "SMS Status",
      cell: (value) => (
        <Badge variant={value ? "success" : "secondary"}>
          {value ? "Sent" : "Pending"}
        </Badge>
      ),
    },
    {
      accessorKey: "timestamp",
      header: "Date",
      cell: (value) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {formatDateShort(value)}
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Activity Log
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {filteredScans.length} scans
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">
              <Download size={18} />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Crop Type
            </label>
            <select
              value={filterCrop}
              onChange={(e) => setFilterCrop(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
            >
              <option value="all">All Crops</option>
              {crops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              County
            </label>
            <select
              value={filterCounty}
              onChange={(e) => setFilterCounty(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
            >
              <option value="all">All Counties</option>
              {counties.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scans Table */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Scans
          </h2>
          <DataTable columns={columns} data={filteredScans} />
        </div>

        {/* Expanded Scan Details */}
        {expandedScan && (
          <div className="card p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Scan Details
              </h3>
              <button
                onClick={() => setExpandedScan(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {filteredScans
              .filter((s) => s.id === expandedScan)
              .map((scan) => (
                <div key={scan.id} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Scan ID
                      </p>
                      <p className="text-sm font-medium mt-1">{scan.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Device
                      </p>
                      <p className="text-sm font-medium mt-1">
                        {scan.deviceId}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Agent
                      </p>
                      <p className="text-sm font-medium mt-1">{scan.agentId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Date & Time
                      </p>
                      <p className="text-sm font-medium mt-1">
                        {formatDate(scan.timestamp)}
                      </p>
                    </div>
                  </div>

                  {/* Crop & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-gray-200 dark:border-slate-700">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Crop Type
                      </p>
                      <p className="text-sm font-medium mt-1">
                        {scan.cropType}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        County
                      </p>
                      <p className="text-sm font-medium mt-1">
                        {scan.location.county}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Farmer
                      </p>
                      <p className="text-sm font-medium mt-1">
                        {scan.location.farmerName || "Anonymous"}
                      </p>
                    </div>
                  </div>

                  {/* Scan Results */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Scan Results
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Nutrient Deficiencies
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {scan.results.mainNutrientDeficiencies.map((def) => (
                            <Badge key={def} variant="warning">
                              {def}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Recommended Fertilizer
                        </p>
                        <Badge variant="info" className="mt-2">
                          {scan.results.recommendedFertilizer}
                        </Badge>
                      </div>

                      <div className="bg-ag-green-50 dark:bg-ag-green-900/20 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Crop Health Score
                        </p>
                        <p className="text-2xl font-bold text-ag-green-600 dark:text-ag-green-400 mt-2">
                          {scan.results.healthScore}%
                        </p>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Humidity Level
                        </p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                          {scan.results.humidityLevel}%
                        </p>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Estimated Yield Impact
                        </p>
                        <p
                          className={`text-2xl font-bold mt-2 ${scan.results.estimatedYieldImpact >= 0 ? "text-ag-green-600 dark:text-ag-green-400" : "text-red-600 dark:text-red-400"}`}
                        >
                          {scan.results.estimatedYieldImpact > 0 ? "+" : ""}
                          {scan.results.estimatedYieldImpact}%
                        </p>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          SMS Delivery
                        </p>
                        <div className="mt-2">
                          {scan.smsSent ? (
                            <>
                              <Badge variant="success">Sent</Badge>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                {scan.smsDeliveryTime
                                  ? formatDate(scan.smsDeliveryTime)
                                  : "N/A"}
                              </p>
                            </>
                          ) : (
                            <Badge variant="warning">Pending</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
