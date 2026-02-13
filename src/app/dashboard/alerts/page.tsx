"use client";

import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button, Badge } from "@/components/ui/Cards";
import { AlertCircle, Info, CheckCircle, X, DownloadCloud } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AlertsPage() {
  const { alerts, removeAlert, markAlertAsRead } = useAppStore();

  const criticalAlerts = alerts.filter((a) => a.type === "critical");
  const warningAlerts = alerts.filter((a) => a.type === "warning");
  const infoAlerts = alerts.filter((a) => a.type === "info");
  const unreadAlerts = alerts.filter((a) => !a.read);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="text-red-500" size={24} />;
      case "warning":
        return <AlertCircle className="text-yellow-500" size={24} />;
      case "info":
        return <Info className="text-blue-500" size={24} />;
      default:
        return <CheckCircle className="text-gray-500" size={24} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Alerts & Notifications
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Monitor critical system events
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">
              <DownloadCloud size={18} />
              Export
            </Button>
          </div>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {alerts.length}
            </p>
          </div>

          <div className="card p-4 border-l-4 border-red-500">
            <p className="text-sm text-gray-600 dark:text-gray-400">Critical</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
              {criticalAlerts.length}
            </p>
          </div>

          <div className="card p-4 border-l-4 border-yellow-500">
            <p className="text-sm text-gray-600 dark:text-gray-400">Warnings</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
              {warningAlerts.length}
            </p>
          </div>

          <div className="card p-4 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
              {unreadAlerts.length}
            </p>
          </div>
        </div>

        {/* Alerts List */}
        {alerts.length === 0 ? (
          <div className="card p-12 text-center">
            <CheckCircle className="mx-auto text-ag-green-600 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              All Clear!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No alerts or notifications at this time.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`card p-5 ${!alert.read ? "border-l-4 border-ag-green-500 bg-ag-green-50/50 dark:bg-ag-green-900/10" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getAlertIcon(alert.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {alert.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {alert.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <Badge
                          variant={
                            alert.type === "critical"
                              ? "danger"
                              : alert.type === "warning"
                                ? "warning"
                                : "info"
                          }
                        >
                          {alert.type.charAt(0).toUpperCase() +
                            alert.type.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {formatDate(alert.createdAt)}
                      </p>

                      <div className="flex gap-2">
                        {!alert.read && (
                          <button
                            onClick={() => markAlertAsRead(alert.id)}
                            className="text-xs font-medium text-ag-green-600 hover:text-ag-green-700 dark:hover:text-ag-green-400"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => removeAlert(alert.id)}
                          className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeAlert(alert.id)}
                    className="flex-shrink-0 text-gray-300 hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
