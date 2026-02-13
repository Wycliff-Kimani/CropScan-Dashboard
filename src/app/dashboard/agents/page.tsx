"use client";

import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button, Badge } from "@/components/ui/Cards";
import { DataTable, ColumnDef } from "@/components/tables/DataTable";
import { Agent } from "@/types";
import { Download, Plus, Star } from "lucide-react";

export default function AgentsPage() {
  const { agents } = useAppStore();

  const columns: ColumnDef<Agent>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (value) => <span className="font-medium">{value}</span>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: (value) => <span className="text-sm">{value}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (value) => (
        <Badge variant={value === "Active" ? "success" : "secondary"}>
          {value}
        </Badge>
      ),
    },
    {
      accessorKey: "currentLocation",
      header: "Location",
      cell: (value) => <span>{value.county}</span>,
    },
    {
      accessorKey: "assignedDevices",
      header: "Devices",
      cell: (value) => (
        <span className="font-medium">{(value as string[]).length}</span>
      ),
    },
    {
      accessorKey: "scansToday",
      header: "Scans Today",
      cell: (value) => <span className="font-medium">{value}</span>,
    },
    {
      accessorKey: "scansThisWeek",
      header: "Week",
      cell: (value) => <span className="font-medium">{value}</span>,
    },
    {
      accessorKey: "scansThisMonth",
      header: "Month",
      cell: (value) => <span className="font-medium">{value}</span>,
    },
    {
      accessorKey: "performanceRating",
      header: "Rating",
      cell: (value) => (
        <div className="flex items-center gap-1">
          <span className="font-medium">{value.toFixed(1)}</span>
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
        </div>
      ),
    },
  ];

  const topPerformers = [...agents]
    .sort((a, b) => b.performanceRating - a.performanceRating)
    .slice(0, 5);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Agents
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {agents.length} agents across Kenya
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">
              <Download size={18} />
              Export
            </Button>
            <Button variant="primary">
              <Plus size={18} />
              Add Agent
            </Button>
          </div>
        </div>

        {/* Top Performers */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Performers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {topPerformers.map((agent, idx) => (
              <div key={agent.id} className="card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-full bg-ag-green-100 dark:bg-ag-green-900/30 flex items-center justify-center">
                    <span className="font-bold text-ag-green-600 dark:text-ag-green-400">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.floor(agent.performanceRating)
                            ? "fill-yellow-500"
                            : ""
                        }
                      />
                    ))}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  {agent.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {agent.currentLocation.county}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">
                      Today:
                    </span>
                    <span className="font-medium">{agent.scansToday}</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Month:
                    </span>
                    <span className="font-medium">{agent.scansThisMonth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Agents Table */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            All Agents
          </h2>
          <DataTable columns={columns} data={agents} />
        </div>
      </div>
    </DashboardLayout>
  );
}
