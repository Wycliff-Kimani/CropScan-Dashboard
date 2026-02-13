"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

export interface ColumnDef<T> {
  accessorKey?: string;
  header: string;
  cell?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  name?: string;
  sortable?: boolean;
  filterable?: boolean;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  name = "Table",
  sortable = true,
  filterable = true,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let result = [...data];

    // Filter
    if (searchTerm && filterable) {
      result = result.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Sort
    if (sortConfig.key && sortable) {
      result.sort((a, b) => {
        const aValue = (a as any)[sortConfig.key];
        const bValue = (b as any)[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setSortedData(result);
  }, [data, searchTerm, sortConfig, sortable, filterable]);

  const handleSort = (key: string) => {
    if (!sortable) return;

    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (key: string) => {
    if (!sortable) return <ChevronsUpDown size={16} className="opacity-30" />;
    if (sortConfig.key !== key)
      return <ChevronsUpDown size={16} className="opacity-30" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  return (
    <div className="space-y-4">
      {filterable && (
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  onClick={() => handleSort(column.accessorKey || "")}
                  className={`px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 ${
                    column.sortable !== false && sortable
                      ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
                      : ""
                  } ${column.width || ""}`}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable !== false &&
                      getSortIcon(column.accessorKey || "")}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  {columns.map((column, idx) => (
                    <td
                      key={idx}
                      className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100"
                    >
                      {column.cell
                        ? column.cell(
                            (row as any)[column.accessorKey || ""],
                            row,
                          )
                        : (row as any)[column.accessorKey || ""]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {sortedData.length > 0 && (
        <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
          Showing {sortedData.length} of {data.length} results
        </div>
      )}
    </div>
  );
}
