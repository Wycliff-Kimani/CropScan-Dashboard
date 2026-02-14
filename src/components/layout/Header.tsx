"use client";

import { useAppStore } from "@/lib/store";
import { Bell, AlertCircle, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { formatDateShort } from "@/lib/utils";

export function Header() {
  const { alerts, markAlertAsRead, removeAlert } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
      <div className="h-16 flex items-center justify-between px-6 gap-4">
        <div className="flex-1">
          <h1 className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Welcome back, Admin
          </h1>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Bell size={20} className="text-gray-600 dark:text-gray-400" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications dropdown */}
          {showNotifications && mounted && (
            <div className="fixed sm:absolute left-2 right-2 sm:left-auto sm:right-0 top-16 sm:top-auto sm:mt-2 w-auto sm:w-80 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-slate-800 max-h-96 overflow-y-auto z-50 sm:z-auto">
              <div className="p-4 border-b border-gray-200 dark:border-slate-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Alerts & Notifications ({unreadCount})
                </h3>
              </div>

              {alerts.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <Info size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No alerts</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-slate-800">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ${!alert.read ? "bg-ag-green-50 dark:bg-ag-green-900/20" : ""}`}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {alert.type === "critical" ? (
                            <AlertCircle className="text-red-500" size={20} />
                          ) : alert.type === "warning" ? (
                            <AlertCircle
                              className="text-yellow-500"
                              size={20}
                            />
                          ) : (
                            <Info className="text-blue-500" size={20} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-gray-900 dark:text-white truncate">
                              {alert.title}
                            </h4>
                            {!alert.read && (
                              <button
                                onClick={() => markAlertAsRead(alert.id)}
                                className="text-ag-green-600 hover:text-ag-green-700 text-xs font-medium whitespace-nowrap"
                              >
                                Mark read
                              </button>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                            {alert.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {formatDateShort(alert.createdAt)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeAlert(alert.id)}
                          className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {alerts.length > 0 && (
                <div className="p-3 border-t border-gray-200 dark:border-slate-800 text-center">
                  <a
                    href="/dashboard/alerts"
                    className="text-sm font-medium text-ag-green-600 hover:text-ag-green-700"
                  >
                    View all alerts
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2 px-3 py-2 bg-ag-green-50 dark:bg-ag-green-900/30 rounded-lg border border-ag-green-200 dark:border-ag-green-800">
          <div className="w-2 h-2 bg-ag-green-600 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-ag-green-700 dark:text-ag-green-400">
            System Normal
          </span>
        </div>
      </div>
    </header>
  );
}
