"use client";

import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useMemo, useState } from "react";
import { Device } from "@/types";
import { Badge } from "@/components/ui/Cards";
import { ChevronDown } from "lucide-react";

export default function MapPage() {
  const { devices, counties } = useAppStore();
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  // Simple Kenya map coordinates (normalized for SVG)
  const kenyaCounties = [
    { name: "Kiambu", x: 52, y: 35 },
    { name: "Nakuru", x: 48, y: 42 },
    { name: "Nyeri", x: 55, y: 38 },
    { name: "Meru", x: 62, y: 28 },
    { name: "Kisumu", x: 35, y: 35 },
    { name: "Kakamega", x: 32, y: 30 },
    { name: "Uasin Gishu", x: 42, y: 22 },
    { name: "Nandi", x: 38, y: 20 },
    { name: "Bomet", x: 45, y: 25 },
    { name: "Kericho", x: 43, y: 28 },
    { name: "West Pokot", x: 35, y: 12 },
    { name: "Samburu", x: 55, y: 15 },
  ];

  const countyDevices = useMemo(() => {
    if (!selectedCounty) return devices;
    return devices.filter((d) => d.location.county === selectedCounty);
  }, [devices, selectedCounty]);

  const getCountyData = (countyName: string) => {
    return counties.find((c) => c.name === countyName);
  };

  const getCountyColor = (countyName: string) => {
    const data = getCountyData(countyName);
    if (!data) return "rgba(209, 213, 219, 0.3)"; // Gray for no data
    const healthScore = data.avgHealthScore;
    if (healthScore >= 80) return "rgba(22, 101, 52, 0.4)"; // Dark green
    if (healthScore >= 60) return "rgba(34, 197, 94, 0.3)"; // Green
    if (healthScore >= 40) return "rgba(234, 179, 8, 0.3)"; // Yellow
    return "rgba(239, 68, 68, 0.3)"; // Red
  };

  const getDeviceColor = (status: string) => {
    switch (status) {
      case "Online":
        return "#166534"; // Dark green
      case "Low Battery":
        return "#EAB308"; // Yellow
      case "Offline":
        return "#EF4444"; // Red
      default:
        return "#9CA3AF"; // Gray
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Map View
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time device and crop health visualization
          </p>
        </div>

        {/* Map and Legend Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-3">
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Kenya Operations Map
              </h2>

              {/* SVG Map */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <svg viewBox="0 0 100 80" className="w-full h-auto">
                  {/* Kenya outline (simplified) */}
                  <path
                    d="M 30 10 L 70 10 L 75 25 L 85 35 L 80 50 L 75 60 L 60 70 L 40 75 L 20 65 L 10 50 L 15 30 Z"
                    fill="url(#kenyaGradient)"
                    stroke="#cbd5e1"
                    strokeWidth="0.5"
                  />

                  <defs>
                    <linearGradient
                      id="kenyaGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.3" />
                      <stop
                        offset="100%"
                        stopColor="#a7f3d0"
                        stopOpacity="0.2"
                      />
                    </linearGradient>
                  </defs>

                  {/* Counties as regions */}
                  {kenyaCounties.map((county) => {
                    const data = getCountyData(county.name);
                    return (
                      <g
                        key={county.name}
                        onClick={() => setSelectedCounty(county.name)}
                        style={{ cursor: "pointer" }}
                      >
                        {/* County circle */}
                        <circle
                          cx={county.x}
                          cy={county.y}
                          r="3"
                          fill={getCountyColor(county.name)}
                          stroke={
                            selectedCounty === county.name
                              ? "#166534"
                              : "#cbd5e1"
                          }
                          strokeWidth={
                            selectedCounty === county.name ? "1.5" : "0.5"
                          }
                        />

                        {/* Device count label */}
                        {data && data.deviceCount > 0 && (
                          <text
                            x={county.x}
                            y={county.y + 6}
                            fontSize="2"
                            textAnchor="middle"
                            className="font-bold fill-gray-900 dark:fill-white"
                          >
                            {data.deviceCount}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Individual device points (sample) */}
                  {countyDevices.slice(0, 15).map((device, idx) => {
                    const county = kenyaCounties.find(
                      (c) => c.name === device.location.county,
                    );
                    if (!county) return null;

                    // Offset points slightly for visibility
                    const offsetX = county.x + (Math.random() - 0.5) * 3;
                    const offsetY = county.y + (Math.random() - 0.5) * 3;

                    return (
                      <circle
                        key={device.id}
                        cx={offsetX}
                        cy={offsetY}
                        r="0.8"
                        fill={getDeviceColor(device.status)}
                        opacity="0.8"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDevice(device);
                        }}
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Legend */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-ag-green-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Device Online
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Low Battery
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Device Offline
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    No Activity
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - County Info */}
          <div className="space-y-4">
            {/* Selected County Info */}
            {selectedCounty ? (
              <div className="card p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {selectedCounty}
                </h3>
                {getCountyData(selectedCounty) && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Devices
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {getCountyData(selectedCounty)?.deviceCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Agents
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {getCountyData(selectedCounty)?.agentCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Scans
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {getCountyData(selectedCounty)?.scanCount}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-gray-200 dark:border-slate-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Avg Health Score
                      </p>
                      <p className="text-2xl font-bold text-ag-green-600 dark:text-ag-green-400 mt-1">
                        {getCountyData(selectedCounty)?.avgHealthScore}%
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setSelectedCounty(null)}
                  className="w-full mt-4 px-4 py-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            ) : (
              <div className="card p-6 sticky top-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click on a county to view details
                </p>
              </div>
            )}

            {/* Selected Device Info */}
            {selectedDevice && (
              <div className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {selectedDevice.deviceNumber}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedDevice.location.county}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDevice(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Status
                    </span>
                    <Badge
                      variant={
                        selectedDevice.status === "Online"
                          ? "success"
                          : selectedDevice.status === "Low Battery"
                            ? "warning"
                            : "danger"
                      }
                    >
                      {selectedDevice.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Battery
                    </span>
                    <span className="font-medium">
                      {Math.round(selectedDevice.batteryPercentage)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Scans
                    </span>
                    <span className="font-medium">
                      {selectedDevice.totalScans}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Agent
                    </span>
                    <span className="font-medium text-xs">
                      {selectedDevice.assignedAgent}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* County Quick Select */}
            <div className="card p-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-3">
                COUNTIES
              </p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {kenyaCounties.map((county) => {
                  const data = getCountyData(county.name);
                  return (
                    <button
                      key={county.name}
                      onClick={() => setSelectedCounty(county.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCounty === county.name
                          ? "bg-ag-green-100 dark:bg-ag-green-900/30 text-ag-green-700 dark:text-ag-green-400"
                          : "hover:bg-gray-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{county.name}</span>
                        {data && (
                          <span className="text-xs text-gray-500">
                            {data.deviceCount}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
