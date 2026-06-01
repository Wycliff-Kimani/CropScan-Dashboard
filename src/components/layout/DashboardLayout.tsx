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
  const {
    setDevices,
    setAgents,
    setScans,
    setCounties,
    setAlerts,
    setFarmers,
  } = useAppStore();

  useEffect(() => {
    const mockData = generateAllMockData();
    setDevices(mockData.devices);
    setAgents(mockData.agents);
    setScans(mockData.scans);
    setCounties(mockData.counties);
    setAlerts(mockData.alerts);
    setFarmers(mockData.farmers);

    const interval = setInterval(() => {
      const currentDevices = useAppStore.getState().devices;
      const devicesToUpdate = 5 + Math.floor(Math.random() * 5);
      const updatedDevices = [...currentDevices];

      for (let i = 0; i < devicesToUpdate; i++) {
        const randomIdx = Math.floor(Math.random() * updatedDevices.length);
        const device = updatedDevices[randomIdx];
        const newDevice = { ...device };
        if (Math.random() > 0.6) {
          newDevice.batteryPercentage = Math.max(
            5,
            newDevice.batteryPercentage - Math.random() * 3
          );
        } else {
          newDevice.batteryPercentage = Math.min(
            100,
            newDevice.batteryPercentage + Math.random() * 2
          );
        }
        updatedDevices[randomIdx] = newDevice;
      }
      setDevices(updatedDevices);
    }, 60000);

    return () => clearInterval(interval);
  }, [
    setDevices,
    setAgents,
    setScans,
    setCounties,
    setAlerts,
    setFarmers,
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Sidebar — fixed, always on left */}
      <Sidebar />

      {/* Main area — offset by sidebar width on desktop */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden lg:ml-64">
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}