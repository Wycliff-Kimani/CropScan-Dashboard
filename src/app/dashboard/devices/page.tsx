"use client";

import { useAppStore } from "@/lib/store";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button, Badge } from "@/components/ui/Cards";
import { DataTable, ColumnDef } from "@/components/tables/DataTable";
import { Device } from "@/types";
import {
  getDeviceStatusColor,
  getMaintenanceStatusColor,
  formatDateShort,
} from "@/lib/utils";
import { Cpu, Download, Plus, Battery, Sun } from "lucide-react";

export default function DevicesPage() {
  const { devices } = useAppStore();
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterMaintenance, setFilterMaintenance] = useState<string>("all");

  const filteredDevices = devices.filter((device) => {
    if (filterStatus !== "all" && device.status !== filterStatus) return false;
    if (
      filterMaintenance !== "all" &&
      device.maintenanceStatus !== filterMaintenance
    )
      return false;
    return true;
  });

  const columns: ColumnDef<Device>[] = [
    {
      accessorKey: "deviceNumber",
      header: "Device ID",
      cell: (value) => <span className="font-medium">{value}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (value) => (
        <span className={`font-medium ${getDeviceStatusColor(value)}`}>
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              value === "Online"
                ? "bg-ag-green-600"
                : value === "Low Battery"
                  ? "bg-yellow-600"
                  : "bg-red-600"
            } mr-2`}
          />
          {value}
        </span>
      ),
    },
    {
      accessorKey: "batteryPercentage",
      header: "Battery",
      cell: (value) => (
        <div className="flex items-center gap-2">
          <Battery size={16} className="text-gray-400" />
          <div className="w-24 bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                value >= 60
                  ? "bg-ag-green-600"
                  : value >= 30
                    ? "bg-yellow-500"
                    : "bg-red-600"
              }`}
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm font-medium">{Math.round(value)}%</span>
        </div>
      ),
    },
    {
      accessorKey: "solarCharging",
      header: "Solar",
      cell: (value) => (
        <div className="flex items-center gap-2">
          {value ? (
            <>
              <Sun size={16} className="text-yellow-500" />
              <span className="text-sm text-yellow-700 dark:text-yellow-400">
                Charging
              </span>
            </>
          ) : (
            <span className="text-sm text-gray-500">Idle</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: (value) => <span>{value.county}</span>,
    },
    {
      accessorKey: "assignedAgent",
      header: "Assigned Agent",
      cell: (value) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {value}
        </span>
      ),
    },
    {
      accessorKey: "maintenanceStatus",
      header: "Condition",
      cell: (value) => (
        <span className={`font-medium ${getMaintenanceStatusColor(value)}`}>
          {value}
        </span>
      ),
    },
    {
      accessorKey: "totalScans",
      header: "Total Scans",
      cell: (value) => <span className="font-medium">{value}</span>,
    },
    {
      accessorKey: "lastSyncTime",
      header: "Last Sync",
      cell: (value) => (
        <span className="text-sm text-gray-500">{formatDateShort(value)}</span>
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
              Devices
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {filteredDevices.length} devices in operation
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">
              <Download size={18} />
              Export
            </Button>
            <Button variant="primary">
              <Plus size={18} />
              Add Device
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
            >
              <option value="all">All Statuses</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Low Battery">Low Battery</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Condition
            </label>
            <select
              value={filterMaintenance}
              onChange={(e) => setFilterMaintenance(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
            >
              <option value="all">All Conditions</option>
              <option value="Good">Good</option>
              <option value="Needs Service">Needs Service</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>

          {selectedDevices.length > 0 && (
            <div className="ml-auto flex gap-2">
              <Badge>{selectedDevices.length} selected</Badge>
              <Button variant="secondary" size="sm">
                Assign Agent
              </Button>
              <Button variant="secondary" size="sm">
                Schedule Service
              </Button>
            </div>
          )}
        </div>

        {/* Devices Cards View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredDevices.slice(0, 6).map((device) => (
            <div
              key={device.id}
              className="card p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() =>
                setSelectedDevices((prev) =>
                  prev.includes(device.id)
                    ? prev.filter((d) => d !== device.id)
                    : [...prev, device.id],
                )
              }
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {device.deviceNumber}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {device.location.county}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={selectedDevices.includes(device.id)}
                  onChange={() => {
                    setSelectedDevices((prev) =>
                      prev.includes(device.id)
                        ? prev.filter((d) => d !== device.id)
                        : [...prev, device.id],
                    );
                  }}
                  className="rounded"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Status
                  </span>
                  <Badge
                    variant={
                      device.status === "Online"
                        ? "success"
                        : device.status === "Low Battery"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {device.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Battery
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round(device.batteryPercentage)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Condition
                  </span>
                  <Badge
                    variant={
                      device.maintenanceStatus === "Good"
                        ? "success"
                        : device.maintenanceStatus === "Needs Service"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {device.maintenanceStatus}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Total Scans
                  </span>
                  <span className="text-sm font-medium">
                    {device.totalScans}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-slate-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Assigned: {device.assignedAgent}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Last sync: {formatDateShort(device.lastSyncTime)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Full Table View */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            All Devices
          </h2>
          <DataTable columns={columns} data={filteredDevices} />
        </div>
      </div>
    </DashboardLayout>
  );
}
