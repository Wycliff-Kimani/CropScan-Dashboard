import { create } from "zustand";
import { Device, Agent, Scan, County, Alert } from "@/types";

interface AppStore {
  // Data
  devices: Device[];
  agents: Agent[];
  scans: Scan[];
  counties: County[];
  alerts: Alert[];

  // UI State
  darkMode: boolean;
  sidebarOpen: boolean;
  selectedDevice: Device | null;
  selectedAgent: Agent | null;
  selectedScan: Scan | null;

  // Actions
  setDevices: (devices: Device[]) => void;
  setAgents: (agents: Agent[]) => void;
  setScans: (scans: Scan[]) => void;
  setCounties: (counties: County[]) => void;
  setAlerts: (alerts: Alert[]) => void;
  updateDevice: (device: Device) => void;
  updateAgent: (agent: Agent) => void;
  addAlert: (alert: Alert) => void;
  removeAlert: (alertId: string) => void;
  markAlertAsRead: (alertId: string) => void;

  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setSelectedDevice: (device: Device | null) => void;
  setSelectedAgent: (agent: Agent | null) => void;
  setSelectedScan: (scan: Scan | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  devices: [],
  agents: [],
  scans: [],
  counties: [],
  alerts: [],
  darkMode: false,
  sidebarOpen: true,
  selectedDevice: null,
  selectedAgent: null,
  selectedScan: null,

  setDevices: (devices) => set({ devices }),
  setAgents: (agents) => set({ agents }),
  setScans: (scans) => set({ scans }),
  setCounties: (counties) => set({ counties }),
  setAlerts: (alerts) => set({ alerts }),

  updateDevice: (device) =>
    set((state) => ({
      devices: state.devices.map((d) => (d.id === device.id ? device : d)),
    })),

  updateAgent: (agent) =>
    set((state) => ({
      agents: state.agents.map((a) => (a.id === agent.id ? agent : a)),
    })),

  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts].slice(0, 50), // Keep only last 50
    })),

  removeAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== alertId),
    })),

  markAlertAsRead: (alertId) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId ? { ...a, read: true } : a,
      ),
    })),

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSelectedDevice: (device) => set({ selectedDevice: device }),
  setSelectedAgent: (agent) => set({ selectedAgent: agent }),
  setSelectedScan: (scan) => set({ selectedScan: scan }),
}));
