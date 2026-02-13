import { Device, Agent, Scan, County, Alert } from "@/types";

const KENYA_COUNTIES = [
  { name: "Nyandarua", lat: -0.55, lng: 36.35 },
  { name: "Kiambu", lat: -1.167, lng: 36.833 },
  { name: "Kitale", lat: 1.02, lng: 34.95 },
  { name: "Eldoret", lat: 0.515, lng: 35.268 },
  { name: "Murang'a", lat: -0.683, lng: 37.117 },
  { name: "Laikipia", lat: 0.05, lng: 36.85 },
];

const CROPS = [
  "Maize",
  "Beans",
  "Potatoes",
  "Tea",
  "Coffee",
  "Tomatoes",
  "Kale",
  "Wheat",
  "Bananas",
  "Avocados",
];
const NUTRIENT_DEFICIENCIES = [
  "Nitrogen",
  "Phosphorus",
  "Potassium",
  "Magnesium",
  "Iron",
  "Zinc",
  "Boron",
  "Calcium",
];
const FERTILIZER_TYPES = [
  "NPK 17-17-17",
  "Urea 46-0-0",
  "DAP 18-46-0",
  "KCl 0-0-60",
  "Organic Manure",
  "Compost",
  "Bio-fertilizer",
];

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomCounty(): { name: string; lat: number; lng: number } {
  return randomElement(KENYA_COUNTIES);
}

export function generateMockDevices(): Device[] {
  const devices: Device[] = [];
  const deviceCount = 421;

  for (let i = 1; i <= deviceCount; i++) {
    const county = getRandomCounty();
    const statuses: Array<"Online" | "Offline" | "Low Battery"> = [
      "Online",
      "Offline",
      "Low Battery",
    ];
    const maintenanceStatuses: Array<"Good" | "Needs Service" | "Damaged"> = [
      "Good",
      "Needs Service",
      "Damaged",
    ];

    const status = randomElement(statuses);
    let batteryPercentage = randomBetween(10, 100);
    if (status === "Low Battery") {
      batteryPercentage = randomBetween(5, 25);
    } else if (status === "Online") {
      batteryPercentage = randomBetween(30, 100);
    }

    devices.push({
      id: `DEV${String(i).padStart(4, "0")}`,
      deviceNumber: `CS-${String(i).padStart(3, "0")}`,
      status,
      batteryPercentage,
      solarCharging: Math.random() > 0.5,
      lastSyncTime: new Date(Date.now() - randomBetween(60, 3600) * 1000),
      location: {
        county: county.name,
        latitude: county.lat + (Math.random() - 0.5) * 0.5,
        longitude: county.lng + (Math.random() - 0.5) * 0.5,
      },
      assignedAgent: `AGT${String(randomBetween(1, 25)).padStart(3, "0")}`,
      maintenanceStatus: randomElement(maintenanceStatuses),
      totalScans: randomBetween(50, 500),
      lastScannedAt: new Date(Date.now() - randomBetween(300, 86400) * 1000),
    });
  }

  return devices;
}

export function generateMockAgents(): Agent[] {
  const agents: Agent[] = [];
  const agentCount = 421;
  const agentNames = [
    "John Mwangi",
    "Mary Kipchoge",
    "Peter Mureithi",
    "Grace Nyambura",
    "Samuel Kipchoge",
    "Lucy Wairimu",
    "David Ochieng",
    "Alice Kamau",
    "Joseph Kariuki",
    "Susan Chebet",
    "Moses Kiplagat",
    "Patricia Maina",
    "Paul Omondi",
    "Rebecca Kipchepkeny",
    "George Wanyonyi",
    "Elizabeth Njeri",
    "Robert Kipkemboi",
    "Martha Kipchirchir",
    "Thomas Kiplagat",
    "Ruth Mwangi",
    "Henry Kipketer",
    "Ann Kipchoge",
    "Michael Kiplagat",
    "Janet Nyambura",
    "Charles Kipkemboi",
    "William Kipkemboi",
    "Alice Kipchoge",
    "Benjamin Kiplagat",
    "Catherine Nyambura",
    "Daniel Kipkemboi",
    "Esther Kipchoge",
    "Francis Kiplagat",
    "Gloria Kipkemboi",
    "Henry Kipchoge",
    "Irene Kiplagat",
    "James Kipkemboi",
    "Katherine Kipchoge",
    "Lawrence Kiplagat",
    "Margaret Kipkemboi",
    "Nathan Kipchoge",
    "Olivia Kiplagat",
    "Patrick Kipkemboi",
    "Queenie Kipchoge",
    "Richard Kiplagat",
    "Sophia Kipkemboi",
    "Thomas Kipchoge",
    "Uriel Kiplagat",
    "Victoria Kipkemboi",
    "William Kipchoge",
    "Xavier Kiplagat",
    "Yvonne Kipkemboi",
    "Zachary Kipchoge",
    "Abigail Kiplagat",
    "Abraham Kipkemboi",
    "Amanda Kipchoge",
  ];

  // Create a large pool of names by cycling
  const namePool = [];
  for (let i = 0; i < agentCount; i++) {
    namePool.push(
      agentNames[i % agentNames.length] +
        ` ${Math.floor(i / agentNames.length) + 1}`,
    );
  }

  for (let i = 0; i < agentCount; i++) {
    const county = getRandomCounty();

    agents.push({
      id: `AGT${String(i + 1).padStart(4, "0")}`,
      name: namePool[i],
      phone: `+254${randomBetween(700000000, 799999999)}`,
      assignedDevices: [`DEV${String(i + 1).padStart(4, "0")}`], // Each agent has exactly one device
      currentLocation: {
        county: county.name,
        latitude: county.lat + (Math.random() - 0.5) * 0.5,
        longitude: county.lng + (Math.random() - 0.5) * 0.5,
      },
      scansToday: randomBetween(0, 15),
      scansThisWeek: randomBetween(20, 80),
      scansThisMonth: randomBetween(100, 300),
      performanceRating: randomBetween(35, 50) / 10,
      status: Math.random() > 0.1 ? "Active" : "Inactive",
      joinedDate: new Date(Date.now() - randomBetween(86400, 31536000) * 1000),
    });
  }

  return agents;
}

export function generateMockScans(devices: Device[], agents: Agent[]): Scan[] {
  const scans: Scan[] = [];
  const baseDate = new Date();

  // Generate 30,000 scans spread across different times
  for (let i = 0; i < 30000; i++) {
    const device = randomElement(devices);
    const agent =
      agents.find((a) => a.assignedDevices.includes(device.id)) ||
      randomElement(agents);
    const county = getRandomCounty();
    const scanDate = new Date(
      baseDate.getTime() - randomBetween(0, 2592000) * 1000,
    ); // Last 30 days

    const deficiencies = [];
    const deficiencyCount = randomBetween(1, 3);
    for (let j = 0; j < deficiencyCount; j++) {
      deficiencies.push(randomElement(NUTRIENT_DEFICIENCIES));
    }

    scans.push({
      id: `SCN${String(i + 1).padStart(5, "0")}`,
      deviceId: device.id,
      agentId: agent.id,
      location: {
        county: county.name,
        gps: {
          latitude: county.lat + (Math.random() - 0.5) * 0.5,
          longitude: county.lng + (Math.random() - 0.5) * 0.5,
        },
        farmerName: `Farmer ${randomBetween(1, 5000)}`,
      },
      cropType: randomElement(CROPS),
      timestamp: scanDate,
      results: {
        mainNutrientDeficiencies: [...new Set(deficiencies)],
        recommendedFertilizer: randomElement(FERTILIZER_TYPES),
        humidityLevel: randomBetween(40, 95),
        healthScore: randomBetween(50, 100),
        estimatedYieldImpact: randomBetween(-30, 30),
      },
      smsSent: Math.random() > 0.15,
      smsDeliveryTime:
        Math.random() > 0.15
          ? new Date(scanDate.getTime() + randomBetween(60, 3600) * 1000)
          : undefined,
    });
  }

  return scans.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function generateMockCounties(
  devices: Device[],
  agents: Agent[],
  scans: Scan[],
): County[] {
  const countyMap = new Map<string, County>();

  // Initialize all counties
  KENYA_COUNTIES.forEach((county) => {
    countyMap.set(county.name, {
      name: county.name,
      deviceCount: 0,
      agentCount: 0,
      scanCount: 0,
      avgHealthScore: 0,
      latitude: county.lat,
      longitude: county.lng,
    });
  });

  // Count devices per county
  devices.forEach((device) => {
    const county = countyMap.get(device.location.county);
    if (county) {
      county.deviceCount++;
    }
  });

  // Count agents per county
  agents.forEach((agent) => {
    const county = countyMap.get(agent.currentLocation.county);
    if (county) {
      county.agentCount++;
    }
  });

  // Count scans and calculate average health score per county
  scans.forEach((scan) => {
    const county = countyMap.get(scan.location.county);
    if (county) {
      county.scanCount++;
    }
  });

  // Calculate average health score
  KENYA_COUNTIES.forEach((county) => {
    const countyScans = scans.filter((s) => s.location.county === county.name);
    if (countyScans.length > 0) {
      const avgScore =
        countyScans.reduce((sum, scan) => sum + scan.results.healthScore, 0) /
        countyScans.length;
      const countyData = countyMap.get(county.name);
      if (countyData) {
        countyData.avgHealthScore = Math.round(avgScore);
      }
    }
  });

  return Array.from(countyMap.values()).filter(
    (c) => c.deviceCount > 0 || c.agentCount > 0,
  );
}

export function generateMockAlerts(devices: Device[], scans: Scan[]): Alert[] {
  const alerts: Alert[] = [];

  // Offline devices alert
  const offlineDevices = devices.filter((d) => d.status === "Offline");
  offlineDevices.forEach((device, idx) => {
    if (idx < 5) {
      // Limit to 5
      alerts.push({
        id: `ALT${String(alerts.length + 1).padStart(4, "0")}`,
        type: "critical",
        title: "Device Offline",
        description: `Device ${device.deviceNumber} has been offline for more than 24 hours. Last sync: ${device.lastSyncTime.toLocaleString()}`,
        relatedEntityId: device.id,
        relatedEntityType: "device",
        createdAt: new Date(Date.now() - randomBetween(3600, 86400) * 1000),
        read: false,
      });
    }
  });

  // Low battery alerts
  const lowBatteryDevices = devices.filter(
    (d) => d.batteryPercentage < 15 && d.status !== "Offline",
  );
  lowBatteryDevices.forEach((device, idx) => {
    if (idx < 3) {
      alerts.push({
        id: `ALT${String(alerts.length + 1).padStart(4, "0")}`,
        type: "warning",
        title: "Low Battery",
        description: `Device ${device.deviceNumber} battery at ${device.batteryPercentage}%. Needs immediate charging.`,
        relatedEntityId: device.id,
        relatedEntityType: "device",
        createdAt: new Date(Date.now() - randomBetween(600, 3600) * 1000),
        read: false,
      });
    }
  });

  // High deficiency cluster alert
  const recentScans = scans.slice(0, 20);
  const deficiencyCount = new Map<string, number>();
  recentScans.forEach((scan) => {
    scan.results.mainNutrientDeficiencies.forEach((def) => {
      deficiencyCount.set(def, (deficiencyCount.get(def) || 0) + 1);
    });
  });

  const highDeficiencies = Array.from(deficiencyCount.entries()).filter(
    ([_, count]) => count > 3,
  );
  if (highDeficiencies.length > 0) {
    alerts.push({
      id: `ALT${String(alerts.length + 1).padStart(4, "0")}`,
      type: "warning",
      title: "High Deficiency Cluster Detected",
      description: `${highDeficiencies.map(([def]) => def).join(", ")} deficiencies detected in recent scans across multiple locations.`,
      createdAt: new Date(Date.now() - randomBetween(1800, 7200) * 1000),
      read: false,
    });
  }

  // Device maintenance alert
  const maintenanceDevices = devices.filter(
    (d) => d.maintenanceStatus !== "Good",
  );
  maintenanceDevices.slice(0, 2).forEach((device) => {
    alerts.push({
      id: `ALT${String(alerts.length + 1).padStart(4, "0")}`,
      type: "warning",
      title: "Maintenance Required",
      description: `Device ${device.deviceNumber} status: ${device.maintenanceStatus}. Schedule service immediately.`,
      relatedEntityId: device.id,
      relatedEntityType: "device",
      createdAt: new Date(Date.now() - randomBetween(7200, 21600) * 1000),
      read: Math.random() > 0.7,
    });
  });

  // Info alerts
  alerts.push({
    id: `ALT${String(alerts.length + 1).padStart(4, "0")}`,
    type: "info",
    title: "Daily Report Ready",
    description:
      "Your daily operation report is ready for review. 142 scans completed today.",
    createdAt: new Date(Date.now() - randomBetween(600, 3600) * 1000),
    read: true,
  });

  return alerts;
}

// Main data store
export function generateAllMockData() {
  const devices = generateMockDevices();
  const agents = generateMockAgents();
  const scans = generateMockScans(devices, agents);
  const counties = generateMockCounties(devices, agents, scans);
  const alerts = generateMockAlerts(devices, scans);

  return {
    devices,
    agents,
    scans,
    counties,
    alerts,
  };
}
