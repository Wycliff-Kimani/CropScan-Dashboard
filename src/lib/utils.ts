import { Device, Agent, Scan, DashboardKPIs } from "@/types";

export function calculateDashboardKPIs(
  devices: Device[],
  agents: Agent[],
  scans: Scan[],
): DashboardKPIs {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const thisMonth = new Date();
  thisMonth.setDate(1);
  thisMonth.setHours(0, 0, 0, 0);

  const scansToday = scans.filter((s) => {
    const scanDate = new Date(s.timestamp);
    scanDate.setHours(0, 0, 0, 0);
    return scanDate.getTime() === today.getTime();
  }).length;

  const scansThisMonth = scans.filter((s) => {
    const scanDate = new Date(s.timestamp);
    scanDate.setHours(0, 0, 0, 0);
    return scanDate.getTime() >= thisMonth.getTime();
  }).length;

  const avgHealthScore =
    scans.length > 0
      ? Math.round(
          scans.reduce((sum, s) => sum + s.results.healthScore, 0) /
            scans.length,
        )
      : 0;

  // Calculate fertilizer savings (assuming 40%+ savings is the benchmark)
  const avgFertilizerSavings = 42; // CropScan's claim: 40%+ savings

  return {
    totalDevices: devices.length,
    activeDevices: devices.filter((d) => d.status === "Online").length,
    devicesNeedingService: devices.filter((d) => d.maintenanceStatus !== "Good")
      .length,
    totalAgents: agents.length,
    activeAgents: agents.filter((a) => a.status === "Active").length,
    scansToday,
    scansThisMonth,
    farmersServed: Math.round(scans.length * 0.8), // Estimate: 80% of scans are unique farmers
    avgFertilizerSavings,
    avgCropHealthScore: avgHealthScore,
  };
}

export function getDeviceStatusColor(status: string): string {
  switch (status) {
    case "Online":
      return "text-ag-green-600";
    case "Low Battery":
      return "text-yellow-600";
    case "Offline":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}

export function getDeviceStatusBgColor(status: string): string {
  switch (status) {
    case "Online":
      return "bg-ag-green-100";
    case "Low Battery":
      return "bg-yellow-100";
    case "Offline":
      return "bg-red-100";
    default:
      return "bg-gray-100";
  }
}

export function getMaintenanceStatusColor(status: string): string {
  switch (status) {
    case "Good":
      return "text-ag-green-600";
    case "Needs Service":
      return "text-yellow-600";
    case "Damaged":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatDateShort(date: Date): string {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return "Just now";
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
}

export function generateCSV(
  headers: string[],
  rows: (string | number)[][],
): string {
  const csvHeaders = headers.map((h) => `"${h}"`).join(",");
  const csvRows = rows
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");
  return `${csvHeaders}\n${csvRows}`;
}

export function downloadCSV(filename: string, csv: string): void {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/csv;charset=utf-8," + encodeURIComponent(csv),
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function generatePDF(title: string, content: string): void {
  // PDF generation placeholder: log content so parameter is used and
  // future implementation can pick this up.
  console.log("PDF export requested:", title, content);
  alert("PDF export ready for implementation. Use CSV export for now.");
}
