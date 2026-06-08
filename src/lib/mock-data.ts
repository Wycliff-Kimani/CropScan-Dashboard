import {
  Device,
  Agent,
  Scan,
  County,
  Alert,
  Farmer,
  FarmerCompliance,
  ComplianceStatus,
  ResidueLevel,
  ExportEligibility,
  VulnerabilityLevel,
} from "@/types";

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
  "Cabbages",
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
  "Bio-fertilizer",
  "EcoRich Fertilizer",
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
  const deviceCount = 3421;

  for (let i = 1; i <= deviceCount; i++) {
    const county = getRandomCounty();
    const maintenanceStatuses: Array<"Good" | "Needs Service" | "Damaged"> = [
      "Good",
      "Needs Service",
      "Damaged",
    ];

    const rand = Math.random();
    const status =
      rand < 0.89 ? "Online" : rand < 0.97 ? "Low Battery" : "Offline";
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
      totalScans: randomBetween(500, 5000),
      lastScannedAt: new Date(Date.now() - randomBetween(300, 86400) * 1000),
    });
  }

  return devices;
}

export function generateMockAgents(): Agent[] {
  const agents: Agent[] = [];
  const agentCount = 3421;
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
      scansToday: randomBetween(80, 150),
      scansThisWeek: randomBetween(500, 700),
      scansThisMonth: randomBetween(2000, 2800),
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

  // Generate 5,000 scans spread across different times (realistic production volume)
  for (let i = 0; i < 5000; i++) {
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

const farmerNames = [
  "John Kamau", "Mary Wanjiku", "Peter Ochieng", "Grace Akinyi", "James Mwangi",
  "Faith Chebet", "David Otieno", "Agnes Wambui", "Samuel Kipkemoi", "Esther Njeri",
  "Charles Mutua", "Beatrice Auma", "Francis Karanja", "Lydia Adhiambo", "Joseph Nderitu",
  "Priscilla Waweru", "Moses Omondi", "Tabitha Muthoni", "Daniel Kosgei", "Rose Wairimu",
  "Patrick Musyoka", "Caroline Achieng", "Stephen Githinji", "Mercy Cherotich", "Paul Njoroge",
  "Judith Atieno", "George Wekesa", "Violet Kemunto", "Isaac Muriithi", "Lilian Nekesa"
];

const cropYieldRanges: Record<string, { min: number; max: number; unit: string }> = {
  "Maize": { min: 800, max: 2800, unit: "kg/acre" },
  "Beans": { min: 400, max: 1200, unit: "kg/acre" },
  "Potatoes": { min: 4000, max: 12000, unit: "kg/acre" },
  "Tomatoes": { min: 8000, max: 25000, unit: "kg/acre" },
  "Kale": { min: 10000, max: 30000, unit: "kg/acre" },
  "Cabbage": { min: 10000, max: 28000, unit: "kg/acre" },
  "Wheat": { min: 600, max: 2200, unit: "kg/acre" },
  "Sorghum": { min: 500, max: 1800, unit: "kg/acre" },
};

const crops = Object.keys(cropYieldRanges);

const deficiencyLevels = ["None", "Low", "Moderate", "Severe"] as const;

const primaryBarriers = [
  "High Chemical Residue",
  "EU Compliance Fail",
  "Low Credit Score",
  "Soil Testing Required",
  "Needs GlobalGAP Training",
  "High Climate Vulnerability",
  "Phosphorus Deficiency",
  "Nitrogen Deficiency",
  "None"
];

const recommendedActions = [
  "Needs GlobalGAP certification training",
  "Soil testing and amendment required",
  "Reduce pesticide application frequency",
  "Apply nitrogen-rich fertilizer",
  "Irrigation system installation recommended",
  "Enroll in crop insurance program",
  "Join a certified cooperative",
  "No action required — maintain current practices"
];

function deriveExportEligibility(
  compliance: FarmerCompliance,
  residue: ResidueLevel
): ExportEligibility {
  if (compliance.EU === "Fail" || residue === "Unsafe") return "Not Eligible";
  if (compliance.EU === "Borderline" || residue === "Borderline") return "Borderline";
  if (compliance.EU === "Pass" && compliance.Kenya === "Pass" && residue === "Safe") return "Eligible";
  return "Not Eligible";
}

function deriveVulnerabilityLevel(index: number): VulnerabilityLevel {
  if (index < 60) return "Low";
  if (index < 80) return "Medium";
  return "High";
}

export function generateFarmers(count: number = 500): Farmer[] {
  const farmers: Farmer[] = [];

  for (let i = 0; i < count; i++) {
    const name = farmerNames[i % farmerNames.length] + (i >= farmerNames.length ? ` ${Math.floor(i / farmerNames.length)}` : "");
    const county = randomElement(KENYA_COUNTIES).name;
    const crop = randomElement(crops);
    const yieldRange = cropYieldRanges[crop];
    const expectedYield = Math.floor(yieldRange.min + Math.random() * (yieldRange.max - yieldRange.min));

    const compliance: FarmerCompliance = {
      EU: Math.random() > 0.4 ? "Pass" : ["Fail", "Borderline"][Math.floor(Math.random() * 2)] as ComplianceStatus,
      US: Math.random() > 0.5 ? "Pass" : ["Fail", "Borderline"][Math.floor(Math.random() * 2)] as ComplianceStatus,
      EAC: Math.random() > 0.25 ? "Pass" : ["Fail", "Borderline"][Math.floor(Math.random() * 2)] as ComplianceStatus,
      Kenya: Math.random() > 0.15 ? "Pass" : ["Fail", "Borderline"][Math.floor(Math.random() * 2)] as ComplianceStatus,
    };

    const residue = ["Safe", "Unsafe", "Borderline"][
      Math.floor(Math.random() * 3)
    ] as ResidueLevel;

    const exportEligibility = deriveExportEligibility(compliance, residue);
    const climateVulnerabilityIndex = Math.floor(45 + Math.random() * 47);
    const vulnerabilityLevel = deriveVulnerabilityLevel(climateVulnerabilityIndex);

    farmers.push({
      id: `farmer-${i + 1}`,
      farmerId: `FARM-KE-2026-${String(i + 1).padStart(5, "0")}`,
      name,
      county,
      cropType: crop,
      expectedYield,
      yieldUnit: yieldRange.unit,
      nitrogenDeficiency: deficiencyLevels[Math.floor(Math.random() * 4)],
      phosphorusDeficiency: deficiencyLevels[Math.floor(Math.random() * 4)],
      potassiumDeficiency: deficiencyLevels[Math.floor(Math.random() * 4)],
      chemicalResidueLevel: residue,
      compliance,
      exportEligibility,
      creditworthinessScore: Math.round((2.5 + Math.random() * 6) * 10) / 10,
      productivityTrend: Math.round((-35 + Math.random() * 80) * 10) / 10,
      insuranceClaimReduction: Math.round(Math.random() * 65 * 10) / 10,
      climateVulnerabilityIndex,
      vulnerabilityLevel,
      primaryBarrier: primaryBarriers[Math.floor(Math.random() * primaryBarriers.length)],
      recommendedAction: recommendedActions[Math.floor(Math.random() * recommendedActions.length)],
      lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    });
  }

  return farmers;
}

// Main data store
export function generateAllMockData() {
  const devices = generateMockDevices();
  const agents = generateMockAgents();
  const scans = generateMockScans(devices, agents);
  const counties = generateMockCounties(devices, agents, scans);
  const alerts = generateMockAlerts(devices, scans);
  const farmers = generateFarmers(500);

  return {
    devices,
    agents,
    scans,
    counties,
    alerts,
    farmers,
  };
}
