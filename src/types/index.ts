export type DeviceStatus = "Online" | "Offline" | "Low Battery";
export type MaintenanceStatus = "Good" | "Needs Service" | "Damaged";
export type AgentStatus = "Active" | "Inactive";

export interface Device {
  id: string;
  deviceNumber: string;
  status: DeviceStatus;
  batteryPercentage: number;
  solarCharging: boolean;
  lastSyncTime: Date;
  location: {
    county: string;
    latitude: number;
    longitude: number;
  };
  assignedAgent: string; // Agent ID
  maintenanceStatus: MaintenanceStatus;
  totalScans: number;
  lastScannedAt?: Date;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  assignedDevices: string[]; // Device IDs
  currentLocation: {
    county: string;
    latitude: number;
    longitude: number;
  };
  scansToday: number;
  scansThisWeek: number;
  scansThisMonth: number;
  performanceRating: number; // 1-5
  status: AgentStatus;
  joinedDate: Date;
}

export interface Scan {
  id: string;
  deviceId: string;
  agentId: string;
  location: {
    county: string;
    gps: { latitude: number; longitude: number };
    farmerName?: string;
  };
  cropType: string;
  timestamp: Date;
  results: {
    mainNutrientDeficiencies: string[];
    recommendedFertilizer: string;
    humidityLevel: number;
    healthScore: number; // 1-100
    estimatedYieldImpact: number; // percentage
  };
  smsSent: boolean;
  smsDeliveryTime?: Date;
}

export interface County {
  name: string;
  deviceCount: number;
  agentCount: number;
  scanCount: number;
  avgHealthScore: number;
  latitude: number;
  longitude: number;
}

export interface DashboardKPIs {
  totalDevices: number;
  activeDevices: number;
  devicesNeedingService: number;
  totalAgents: number;
  activeAgents: number;
  scansToday: number;
  scansThisMonth: number;
  farmersServed: number;
  avgFertilizerSavings: number;
  avgCropHealthScore: number;
}

export interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  relatedEntityId?: string;
  relatedEntityType?: "device" | "agent" | "scan";
  createdAt: Date;
  read: boolean;
}
