"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useAppStore } from "@/lib/store";
import { useEffect } from "react";
import { generateAllMockData } from "@/lib/mock-data";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { setDevices, setAgents, setScans, setCounties, setAlerts } =
    useAppStore();

  useEffect(() => {
    // Initialize mock data on first mount
    const mockData = generateAllMockData();
    setDevices(mockData.devices);
    setAgents(mockData.agents);
    setScans(mockData.scans);
    setCounties(mockData.counties);
    setAlerts(mockData.alerts);

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Randomly update some device statuses
      const currentDevices = useAppStore.getState().devices;
      const updatedDevices = currentDevices.map((device) => {
        if (Math.random() > 0.95) {
          // 5% chance to update each device
          const newDevice = { ...device };
          if (Math.random() > 0.7) {
            newDevice.batteryPercentage = Math.max(
              5,
              newDevice.batteryPercentage - Math.random() * 5,
            );
          } else {
            newDevice.batteryPercentage = Math.min(
              100,
              newDevice.batteryPercentage + Math.random() * 3,
            );
          }
          return newDevice;
        }
        return device;
      });
      setDevices(updatedDevices);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [setDevices, setAgents, setScans, setCounties, setAlerts]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden lg:pl-0 pt-16 lg:pt-0">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
