"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Cpu,
  Users,
  BarChart3,
  Map,
  AlertCircle,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useEffect, useState } from "react";

const navigationItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Devices", href: "/dashboard/devices", icon: Cpu },
  { label: "Agents", href: "/dashboard/agents", icon: Users },
  { label: "Activity Log", href: "/dashboard/scans", icon: BarChart3 },
  { label: "Map View", href: "/dashboard/map", icon: Map },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Alerts", href: "/dashboard/alerts", icon: AlertCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, darkMode, toggleDarkMode } =
    useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/dashboard/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 z-40 flex items-center justify-between px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-ag-green-600 rounded-lg flex items-center justify-center text-white font-bold">
            CS
          </div>
          <span className="font-semibold text-ag-green-600">CropScan</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 overflow-y-auto transition-transform duration-300 z-40 lg:translate-x-0 lg:relative lg:z-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:pt-0 pt-16`}
      >
        <div className="p-6 hidden lg:block">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-ag-green-600 to-ag-green-700 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg transition-shadow">
              CS
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white">
                CropScan
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Dashboard
              </div>
            </div>
          </Link>
        </div>

        <nav className="space-y-1 px-4 pb-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group ${
                  active
                    ? "bg-ag-green-50 dark:bg-ag-green-900/30 text-ag-green-700 dark:text-ag-green-400 border-l-4 border-ag-green-600 pl-3"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    toggleSidebar();
                  }
                }}
              >
                <Icon
                  size={20}
                  className={
                    active
                      ? "text-ag-green-600"
                      : "group-hover:text-ag-green-600"
                  }
                />
                <span>{item.label}</span>
                {item.label === "Alerts" && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-slate-800 p-4 space-y-2">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 transition-colors"
          >
            {mounted && darkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{mounted && darkMode ? "Light" : "Dark"} Mode</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 text-red-700 dark:text-red-400 transition-colors">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content margin on desktop */}
      <div className="lg:ml-64" />
    </>
  );
}
