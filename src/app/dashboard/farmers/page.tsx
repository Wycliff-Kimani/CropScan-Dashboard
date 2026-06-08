"use client";

import { useAppStore } from "@/lib/store";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Cards";
import {
  Farmer,
  ComplianceStatus,
  ResidueLevel,
  ExportEligibility,
} from "@/types";
import {
  Download,
  ChevronDown,
  ChevronUp,
  Sprout,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

// --- Helper Components ---

function ResidueBadge({ level }: { level: ResidueLevel }) {
  const styles = {
    Safe: "bg-blue-100 text-blue-700 border border-blue-300 dark:bg-blue-900/30 dark:text-blue-400",
    Borderline: "bg-yellow-100 text-yellow-700 border border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400",
    Unsafe: "bg-red-100 text-red-700 border border-red-300 dark:bg-red-900/30 dark:text-red-400",
  };
  const icons = {
    Safe: <CheckCircle size={13} />,
    Borderline: <AlertTriangle size={13} />,
    Unsafe: <XCircle size={13} />,
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${styles[level]}`}>
      {icons[level]} {level.toUpperCase()}
    </span>
  );
}

function ComplianceBadge({ status }: { status: ComplianceStatus }) {
  const styles = {
    Pass: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Borderline: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Fail: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}

function ExportBadge({ status }: { status: ExportEligibility }) {
  const styles = {
    Eligible: "bg-green-100 text-green-700 border border-green-300 dark:bg-green-900/30 dark:text-green-400",
    Borderline: "bg-yellow-100 text-yellow-700 border border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400",
    "Not Eligible": "bg-red-100 text-red-700 border border-red-300 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
      {status === "Eligible" ? <CheckCircle size={13} /> : status === "Borderline" ? <AlertTriangle size={13} /> : <XCircle size={13} />}
      {status}
    </span>
  );
}

function DeficiencyDot({ level }: { level: string }) {
  const colors = {
    None: "bg-green-500",
    Low: "bg-yellow-400",
    Moderate: "bg-orange-500",
    Severe: "bg-red-600",
  };
  return (
    <span className="flex items-center gap-1 text-xs">
      <span className={`w-2 h-2 rounded-full ${colors[level as keyof typeof colors] || "bg-gray-400"}`} />
      {level}
    </span>
  );
}

function CreditScore({ score }: { score: number }) {
  const color = score >= 7 ? "text-green-600" : score >= 5 ? "text-yellow-600" : "text-red-600";
  const bg = score >= 7 ? "bg-green-100 dark:bg-green-900/30" : score >= 5 ? "bg-yellow-100 dark:bg-yellow-900/30" : "bg-red-100 dark:bg-red-900/30";
  return (
    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${color} ${bg}`}>
      {score.toFixed(1)}
    </span>
  );
}

function VulnerabilityBar({ index, level }: { index: number; level: string }) {
  const color = level === "Low" ? "bg-green-500" : level === "Medium" ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${index}%` }} />
      </div>
      <span className="text-xs font-medium w-8">{index}</span>
    </div>
  );
}

// --- Expanded Row ---
function ExpandedFarmerRow({ farmer }: { farmer: Farmer }) {
  return (
    <div className="bg-gray-50 dark:bg-slate-800/50 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Compliance Grid */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <ShieldCheck size={16} className="text-ag-green-600" /> Compliance Status
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {(["EU", "US", "EAC", "Kenya"] as const).map((market) => (
            <div key={market} className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-lg px-3 py-2 border border-gray-200 dark:border-slate-700">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{market}</span>
              <ComplianceBadge status={farmer.compliance[market]} />
            </div>
          ))}
        </div>
      </div>

      {/* Nutrient Deficiencies */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <Sprout size={16} className="text-ag-green-600" /> Nutrient Deficiencies
        </h4>
        <div className="space-y-2 bg-white dark:bg-slate-900 rounded-lg p-3 border border-gray-200 dark:border-slate-700">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Nitrogen (N)</span>
            <DeficiencyDot level={farmer.nitrogenDeficiency} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Phosphorus (P)</span>
            <DeficiencyDot level={farmer.phosphorusDeficiency} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Potassium (K)</span>
            <DeficiencyDot level={farmer.potassiumDeficiency} />
          </div>
        </div>
      </div>

      {/* Risk & Finance */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Risk & Finance</h4>
        <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-gray-200 dark:border-slate-700 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400">Insurance Reduction</span>
            <span className="text-xs font-bold text-ag-green-600">{farmer.insuranceClaimReduction}%</span>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-600 dark:text-gray-400">Climate Vulnerability</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{farmer.vulnerabilityLevel}</span>
            </div>
            <VulnerabilityBar index={farmer.climateVulnerabilityIndex} level={farmer.vulnerabilityLevel} />
          </div>
        </div>
      </div>

      {/* Recommended Action */}
      <div className="md:col-span-2 lg:col-span-3">
        <div className="bg-ag-green-50 dark:bg-ag-green-900/20 border border-ag-green-200 dark:border-ag-green-800 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle size={16} className="text-ag-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-ag-green-700 dark:text-ag-green-400">Primary Barrier: {farmer.primaryBarrier}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{farmer.recommendedAction}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function FarmersPage() {
  const { farmers } = useAppStore();
  const [expandedFarmer, setExpandedFarmer] = useState<string | null>(null);
  const [filterExport, setFilterExport] = useState("all");
  const [filterCounty, setFilterCounty] = useState("all");
  const [filterCrop, setFilterCrop] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const counties = [...new Set(farmers.map((f) => f.county))].sort();
  const crops = [...new Set(farmers.map((f) => f.cropType))].sort();

  const filtered = farmers.filter((f) => {
    if (filterExport !== "all" && f.exportEligibility !== filterExport) return false;
    if (filterCounty !== "all" && f.county !== filterCounty) return false;
    if (filterCrop !== "all" && f.cropType !== filterCrop) return false;
    if (searchTerm && !f.name.toLowerCase().includes(searchTerm.toLowerCase()) && !f.farmerId.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const eligibleCount = farmers.filter((f) => f.exportEligibility === "Eligible").length;
  const avgCredit = (farmers.reduce((sum, f) => sum + f.creditworthinessScore, 0) / (farmers.length || 1)).toFixed(1);

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Farmer intelligence & compliance data across Kenya</p>
          </div>
          <Button variant="secondary">
            <Download size={18} /> Export
          </Button>
        </div>

        {/* Summary KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">Avg Health Score</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{Math.round(farmers.reduce((sum, f) => sum + f.creditworthinessScore, 0) / (farmers.length || 1) * 10)}%</p>
          </div>
          <div className="card p-4 border-l-4 border-green-500">
            <p className="text-xs text-gray-500 dark:text-gray-400">% Export Eligible</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{Math.round((eligibleCount / (farmers.length || 1)) * 100)}%</p>
          </div>
          <div className="card p-4 border-l-4 border-ag-green-500">
            <p className="text-xs text-gray-500 dark:text-gray-400">Avg Credit Score</p>
            <p className="text-2xl font-bold text-ag-green-600 mt-1">{avgCredit}</p>
          </div>
          <div className="card p-4 border-l-4 border-ag-green-500">
            <p className="text-xs text-gray-500 dark:text-gray-400">Avg Productivity</p>
            <p className="text-2xl font-bold text-ag-green-600 mt-1">+{Math.round(farmers.filter(f => f.productivityTrend > 0).reduce((sum, f) => sum + f.productivityTrend, 0) / (farmers.filter(f => f.productivityTrend > 0).length || 1))}%</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
            <input
              type="text"
              placeholder="Name or Farmer ID..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm w-48"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Export Eligibility</label>
            <select value={filterExport} onChange={(e) => { setFilterExport(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm">
              <option value="all">All</option>
              <option value="Eligible">Eligible</option>
              <option value="Borderline">Borderline</option>
              <option value="Not Eligible">Not Eligible</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">County</label>
            <select value={filterCounty} onChange={(e) => { setFilterCounty(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm">
              <option value="all">All Counties</option>
              {counties.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Crop</label>
            <select value={filterCrop} onChange={(e) => { setFilterCrop(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm">
              <option value="all">All Crops</option>
              {crops.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Farmer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Crop & Yield</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Residue</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Export</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Credit</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Productivity</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                      No farmers found
                    </td>
                  </tr>
                ) : (
                  paginated.map((farmer) => (
                    <>
                      <tr
                        key={farmer.id}
                        className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                        onClick={() => setExpandedFarmer(expandedFarmer === farmer.id ? null : farmer.id)}
                      >
                        <td className="px-4 py-4">
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{farmer.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{farmer.farmerId}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{farmer.county}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{farmer.cropType}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{farmer.expectedYield.toLocaleString()} {farmer.yieldUnit}</p>
                        </td>
                        <td className="px-4 py-4">
                          <ResidueBadge level={farmer.chemicalResidueLevel} />
                        </td>
                        <td className="px-4 py-4">
                          <ExportBadge status={farmer.exportEligibility} />
                        </td>
                        <td className="px-4 py-4">
                          <CreditScore score={farmer.creditworthinessScore} />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            {farmer.productivityTrend >= 0
                              ? <TrendingUp size={16} className="text-green-500" />
                              : <TrendingDown size={16} className="text-red-500" />}
                            <span className={`text-sm font-medium ${farmer.productivityTrend >= 0 ? "text-green-600" : "text-red-600"}`}>
                              {farmer.productivityTrend > 0 ? "+" : ""}{farmer.productivityTrend}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {expandedFarmer === farmer.id
                            ? <ChevronUp size={16} className="text-gray-400" />
                            : <ChevronDown size={16} className="text-gray-400" />}
                        </td>
                      </tr>
                      {expandedFarmer === farmer.id && (
                        <tr key={`${farmer.id}-expanded`}>
                          <td colSpan={7} className="p-0">
                            <ExpandedFarmerRow farmer={farmer} />
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Rows per page:</span>
              <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="px-2 py-1 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Showing {Math.min((currentPage - 1) * pageSize + 1, filtered.length)}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
                className="px-2 py-1 text-sm rounded border border-gray-300 dark:border-slate-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-slate-800">«</button>
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="px-2 py-1 text-sm rounded border border-gray-300 dark:border-slate-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-slate-800">‹</button>
              <span className="px-3 py-1 text-sm">Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                className="px-2 py-1 text-sm rounded border border-gray-300 dark:border-slate-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-slate-800">›</button>
              <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}
                className="px-2 py-1 text-sm rounded border border-gray-300 dark:border-slate-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-slate-800">»</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}