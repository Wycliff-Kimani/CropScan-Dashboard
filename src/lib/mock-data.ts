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
  { name: "Nakuru", lat: -0.303, lng: 36.08 },
  { name: "Meru", lat: 0.047, lng: 37.649 },
  { name: "Kisumu", lat: -0.091, lng: 34.768 },
  { name: "Kakamega", lat: 0.282, lng: 34.752 },
  { name: "Uasin Gishu", lat: 0.55, lng: 35.27 },
  { name: "Nandi", lat: 0.183, lng: 35.117 },
  { name: "Bomet", lat: -0.783, lng: 35.35 },
  { name: "Kericho", lat: -0.369, lng: 35.286 },
];

const CROPS = [
  "Maize", "Beans", "Potatoes", "Cabbages", "Coffee",
  "Tomatoes", "Kale", "Wheat", "Bananas", "Avocados",
];

const FERTILIZER_TYPES = [
  "NPK 17-17-17", "Urea 46-0-0", "DAP 18-46-0",
  "KCl 0-0-60", "Organic Manure", "Bio-fertilizer", "EcoRich Fertilizer",
];

const DEFICIENCY_WEIGHTS = [
  { name: "Nitrogen", weight: 25 },
  { name: "Phosphorus", weight: 22 },
  { name: "Potassium", weight: 15 },
  { name: "Magnesium", weight: 12 },
  { name: "Calcium", weight: 10 },
  { name: "Iron", weight: 8 },
  { name: "Zinc", weight: 5 },
  { name: "Boron", weight: 3 },
];

function weightedDeficiency(): string {
  const total = DEFICIENCY_WEIGHTS.reduce((sum, d) => sum + d.weight, 0);
  let rand = Math.random() * total;
  for (const d of DEFICIENCY_WEIGHTS) {
    rand -= d.weight;
    if (rand <= 0) return d.name;
  }
  return "Nitrogen";
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomCounty() {
  return randomElement(KENYA_COUNTIES);
}

// Phone masking utility
export function maskPhone(phone: string): string {
  // +254700123456 → +2547001****6
  if (phone.length <= 6) return phone;
  const visible_start = phone.slice(0, 8);
  const visible_end = phone.slice(-2);
  return `${visible_start}****${visible_end}`;
}

export function generateMockDevices(): Device[] {
  const devices: Device[] = [];
  const deviceCount = 3421;

  for (let i = 1; i <= deviceCount; i++) {
    const county = getRandomCounty();

    // 89% Online, 8% Low Battery, 3% Offline
    const rand = Math.random();
    const status: "Online" | "Low Battery" | "Offline" =
      rand < 0.89 ? "Online" : rand < 0.97 ? "Low Battery" : "Offline";

    let batteryPercentage: number;
    if (status === "Low Battery") {
      batteryPercentage = randomBetween(5, 25);
    } else if (status === "Offline") {
      batteryPercentage = randomBetween(0, 15);
    } else {
      batteryPercentage = randomBetween(40, 100);
    }

    // 32% of devices are solar charging
    const solarCharging = Math.random() < 0.32;

    // Maintenance: 80% Good, 15% Needs Service, 5% Damaged
    const maintRand = Math.random();
    const maintenanceStatus: "Good" | "Needs Service" | "Damaged" =
      maintRand < 0.80 ? "Good" : maintRand < 0.95 ? "Needs Service" : "Damaged";

    devices.push({
      id: `DEV${String(i).padStart(4, "0")}`,
      deviceNumber: `CS-${String(i).padStart(4, "0")}`,
      status,
      batteryPercentage,
      solarCharging,
      lastSyncTime: new Date(Date.now() - randomBetween(60, 3600) * 1000),
      location: {
        county: county.name,
        latitude: county.lat + (Math.random() - 0.5) * 0.5,
        longitude: county.lng + (Math.random() - 0.5) * 0.5,
      },
      assignedAgent: `AGT${String(randomBetween(1, 3421)).padStart(4, "0")}`,
      maintenanceStatus,
      totalScans: randomBetween(800, 8000),
      lastScannedAt: new Date(Date.now() - randomBetween(300, 86400) * 1000),
    });
  }

  return devices;
}

export function generateMockAgents(): Agent[] {
  const agents: Agent[] = [];
  const agentCount = 3421;

  const agentNames = [
    "John Mwangi", "Mary Kipchoge", "Peter Mureithi", "Grace Nyambura",
    "Samuel Kipchoge", "Lucy Wairimu", "David Ochieng", "Alice Kamau",
    "Joseph Kariuki", "Susan Chebet", "Moses Kiplagat", "Patricia Maina",
    "Paul Omondi", "Rebecca Kipchepkeny", "George Wanyonyi", "Elizabeth Njeri",
    "Robert Kipkemboi", "Martha Kipchirchir", "Thomas Kiplagat", "Ruth Mwangi",
    "Henry Kipketer", "Ann Kipchoge", "Michael Kiplagat", "Janet Nyambura",
    "Charles Kipkemboi", "William Kipkemboi", "Benjamin Kiplagat",
    "Catherine Nyambura", "Daniel Kipkemboi", "Esther Kipchoge",
    "Francis Kiplagat", "Gloria Kipkemboi", "Irene Kiplagat",
    "James Kipkemboi", "Katherine Kipchoge", "Lawrence Kiplagat",
    "Margaret Kipkemboi", "Nathan Kipchoge", "Olivia Kiplagat",
    "Patrick Kipkemboi", "Richard Kiplagat", "Sophia Kipkemboi",
    "Uriel Kiplagat", "Victoria Kipkemboi", "Xavier Kiplagat",
    "Yvonne Kipkemboi", "Zachary Kipchoge", "Abigail Kiplagat",
    "Abraham Kipkemboi", "Amanda Kipchoge",
  ];

  const namePool: string[] = [];
  for (let i = 0; i < agentCount; i++) {
    const base = agentNames[i % agentNames.length];
    const suffix = Math.floor(i / agentNames.length) + 1;
    namePool.push(suffix === 1 ? base : `${base} ${suffix}`);
  }

  for (let i = 0; i < agentCount; i++) {
    const county = getRandomCounty();

    // Masked phone: store raw, display masked
    const rawPhone = `+254${randomBetween(700000000, 799999999)}`;

    agents.push({
      id: `AGT${String(i + 1).padStart(4, "0")}`,
      name: namePool[i],
      phone: maskPhone(rawPhone),
      assignedDevices: [`DEV${String(i + 1).padStart(4, "0")}`],
      currentLocation: {
        county: county.name,
        latitude: county.lat + (Math.random() - 0.5) * 0.5,
        longitude: county.lng + (Math.random() - 0.5) * 0.5,
      },
      scansToday: randomBetween(80, 150),
      scansThisWeek: randomBetween(500, 700),
      scansThisMonth: randomBetween(2000, 2800),
      performanceRating: randomBetween(38, 50) / 10,
      status: Math.random() > 0.05 ? "Active" : "Inactive",
      joinedDate: new Date(Date.now() - randomBetween(86400, 31536000) * 1000),
    });
  }

  return agents;
}

export function generateMockScans(devices: Device[], agents: Agent[]): Scan[] {
  const scans: Scan[] = [];
  const baseDate = new Date();
  const currentYear = baseDate.getFullYear();

  // Monthly scan targets: 2500/day × 25 working days = 62,500/month
  // Show stagnant for Jan-Mar, then rising from Apr onwards
  const monthlyTargets: Record<number, number> = {
    0: 58000,  // Jan — stagnant
    1: 59000,  // Feb — stagnant
    2: 60000,  // Mar — stagnant, slight uptick
    3: 63000,  // Apr — starts rising
    4: 66000,  // May — rising
    5: 70000,  // Jun — rising
    6: 74000,  // Jul — rising
    7: 78000,  // Aug — rising
    8: 82000,  // Sep — rising
    9: 86000,  // Oct — rising
    10: 90000, // Nov — rising
    11: 94000, // Dec — rising
  };

  let scanIndex = 0;

  for (let month = 0; month <= baseDate.getMonth(); month++) {
    const target = monthlyTargets[month] || 62500;
    // Generate scans spread across working days in that month
    const daysInMonth = new Date(currentYear, month + 1, 0).getDate();

    for (let s = 0; s < target; s++) {
      const day = randomBetween(1, daysInMonth);
      const hour = randomBetween(6, 18); // Working hours
      const scanDate = new Date(currentYear, month, day, hour,
        randomBetween(0, 59), randomBetween(0, 59));

      // Skip future dates
      if (scanDate > baseDate) continue;

      const device = devices[scanIndex % devices.length];
      const agent = agents[scanIndex % agents.length];
      const county = getRandomCounty();

      const deficiencies: string[] = [];
      const defCount = randomBetween(1, 3);
      for (let j = 0; j < defCount; j++) {
        deficiencies.push(weightedDeficiency());
      }

      scans.push({
        id: `SCN${String(scanIndex + 1).padStart(6, "0")}`,
        deviceId: device.id,
        agentId: agent.id,
        location: {
          county: county.name,
          gps: {
            latitude: county.lat + (Math.random() - 0.5) * 0.5,
            longitude: county.lng + (Math.random() - 0.5) * 0.5,
          },
          farmerName: `Farmer ${randomBetween(1, 50000)}`,
        },
        cropType: randomElement(
          county.name === "Uasin Gishu" ? ["Wheat", "Maize", "Maize", "Beans"] :
          county.name === "Kericho" || county.name === "Bomet" ? ["Coffee", "Kale", "Bananas", "Maize"] :
          county.name === "Kiambu" || county.name === "Murang'a" ? ["Coffee", "Potatoes", "Kale", "Maize", "Bananas"] :
          county.name === "Nakuru" ? ["Potatoes", "Maize", "Wheat", "Tomatoes"] :
          CROPS
        ),
        timestamp: scanDate,
        results: {
          mainNutrientDeficiencies: [...new Set(deficiencies)],
          recommendedFertilizer: randomElement(FERTILIZER_TYPES),
          humidityLevel: randomBetween(45, 95),
          healthScore: Math.min(100, Math.max(50,
            randomBetween(65, 100) +
              (["Kiambu", "Nakuru", "Uasin Gishu", "Kericho"].includes(county.name) ? 5 : 0) -
              (["Laikipia", "West Pokot", "Samburu"].includes(county.name) ? 8 : 0)
          )),
          estimatedYieldImpact: randomBetween(-10, 40), // Mostly positive
        },
        smsSent: Math.random() > 0.05, // 95% SMS sent
        smsDeliveryTime:
          Math.random() > 0.05
            ? new Date(scanDate.getTime() + randomBetween(60, 1800) * 1000)
            : undefined,
      });

      scanIndex++;

      // Cap at 500k for performance
      if (scanIndex >= 500000) break;
    }
    if (scanIndex >= 500000) break;
  }

  return scans.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function generateMockCounties(
  devices: Device[],
  agents: Agent[],
  scans: Scan[],
): County[] {
  const countyMap = new Map<string, County>();

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

  devices.forEach((device) => {
    const county = countyMap.get(device.location.county);
    if (county) county.deviceCount++;
  });

  agents.forEach((agent) => {
    const county = countyMap.get(agent.currentLocation.county);
    if (county) county.agentCount++;
  });

  scans.forEach((scan) => {
    const county = countyMap.get(scan.location.county);
    if (county) county.scanCount++;
  });

  KENYA_COUNTIES.forEach((county) => {
    const countyScans = scans.filter((s) => s.location.county === county.name);
    if (countyScans.length > 0) {
      const avgScore =
        countyScans.reduce((sum, scan) => sum + scan.results.healthScore, 0) /
        countyScans.length;
      const countyData = countyMap.get(county.name);
      if (countyData) countyData.avgHealthScore = Math.round(avgScore);
    }
  });

  return Array.from(countyMap.values()).filter(
    (c) => c.deviceCount > 0 || c.agentCount > 0,
  );
}

export function generateMockAlerts(devices: Device[], scans: Scan[]): Alert[] {
  const alerts: Alert[] = [];

  // Only a few offline devices now (3%)
  const offlineDevices = devices.filter((d) => d.status === "Offline");
  offlineDevices.slice(0, 3).forEach((device) => {
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
  });

  // Low battery alerts
  const lowBatteryDevices = devices.filter(
    (d) => d.batteryPercentage < 15 && d.status !== "Offline",
  );
  lowBatteryDevices.slice(0, 3).forEach((device) => {
    alerts.push({
      id: `ALT${String(alerts.length + 1).padStart(4, "0")}`,
      type: "warning",
      title: "Low Battery",
      description: `Device ${device.deviceNumber} battery at ${Math.round(device.batteryPercentage)}%. Solar charging recommended.`,
      relatedEntityId: device.id,
      relatedEntityType: "device",
      createdAt: new Date(Date.now() - randomBetween(600, 3600) * 1000),
      read: false,
    });
  });

  // Deficiency cluster
  const recentScans = scans.slice(0, 50);
  const deficiencyCount = new Map<string, number>();
  recentScans.forEach((scan) => {
    scan.results.mainNutrientDeficiencies.forEach((def) => {
      deficiencyCount.set(def, (deficiencyCount.get(def) || 0) + 1);
    });
  });
  const highDeficiencies = Array.from(deficiencyCount.entries()).filter(
    ([_, count]) => count > 5,
  );
  if (highDeficiencies.length > 0) {
    alerts.push({
      id: `ALT${String(alerts.length + 1).padStart(4, "0")}`,
      type: "warning",
      title: "Nutrient Deficiency Cluster Detected",
      description: `${highDeficiencies.map(([def]) => def).join(", ")} deficiencies detected across multiple regions. Fertilizer advisory issued.`,
      createdAt: new Date(Date.now() - randomBetween(1800, 7200) * 1000),
      read: false,
    });
  }

  // Maintenance
  const maintenanceDevices = devices.filter(
    (d) => d.maintenanceStatus === "Damaged",
  );
  maintenanceDevices.slice(0, 2).forEach((device) => {
    alerts.push({
      id: `ALT${String(alerts.length + 1).padStart(4, "0")}`,
      type: "warning",
      title: "Device Maintenance Required",
      description: `Device ${device.deviceNumber} is marked as Damaged. Schedule field service.`,
      relatedEntityId: device.id,
      relatedEntityType: "device",
      createdAt: new Date(Date.now() - randomBetween(7200, 21600) * 1000),
      read: Math.random() > 0.5,
    });
  });

  // Positive info alerts
  alerts.push({
    id: `ALT${String(alerts.length + 1).padStart(4, "0")}`,
    type: "info",
    title: "Daily Report Ready",
    description: "Today's operation report is ready. 2,719 pre-harvest scans and 2,540 post-harvest scans completed.",
    createdAt: new Date(Date.now() - randomBetween(600, 3600) * 1000),
    read: true,
  });

  alerts.push({
    id: `ALT${String(alerts.length + 1).padStart(4, "0")}`,
    type: "info",
    title: "Monthly Milestone Reached",
    description: "CropScan has surpassed 62,500 scans this month — a new record. Great work across all counties.",
    createdAt: new Date(Date.now() - randomBetween(3600, 14400) * 1000),
    read: true,
  });

  return alerts;
}

// ─── Farmer / Data Analytics ────────────────────────────────────────────────

const farmerNames = [
  "John Kamau", "Mary Wanjiku", "Peter Ochieng", "Grace Akinyi", "James Mwangi",
  "Faith Chebet", "David Otieno", "Agnes Wambui", "Samuel Kipkemoi", "Esther Njeri",
  "Charles Mutua", "Beatrice Auma", "Francis Karanja", "Lydia Adhiambo", "Joseph Nderitu",
  "Priscilla Waweru", "Moses Omondi", "Tabitha Muthoni", "Daniel Kosgei", "Rose Wairimu",
  "Patrick Musyoka", "Caroline Achieng", "Stephen Githinji", "Mercy Cherotich", "Paul Njoroge",
  "Judith Atieno", "George Wekesa", "Violet Kemunto", "Isaac Muriithi", "Lilian Nekesa",
];

const cropYieldRanges: Record<string, { min: number; max: number; unit: string }> = {
  "Maize":    { min: 800,   max: 2800,  unit: "kg/acre" },
  "Beans":    { min: 400,   max: 1200,  unit: "kg/acre" },
  "Potatoes": { min: 4000,  max: 12000, unit: "kg/acre" },
  "Tomatoes": { min: 8000,  max: 25000, unit: "kg/acre" },
  "Kale":     { min: 10000, max: 30000, unit: "kg/acre" },
  "Cabbage":  { min: 10000, max: 28000, unit: "kg/acre" },
  "Wheat":    { min: 600,   max: 2200,  unit: "kg/acre" },
  "Sorghum":  { min: 500,   max: 1800,  unit: "kg/acre" },
};

const farmerCrops = Object.keys(cropYieldRanges);
const deficiencyLevels = ["None", "None", "None", "Low", "Moderate"] as const;

const primaryBarriers = [
  "None",
  "None",
  "None",
  "Needs GlobalGAP Training",
  "Soil Testing Required",
  "Low Credit Score",
  "Phosphorus Deficiency",
  "High Climate Vulnerability",
];

const recommendedActions = [
  "No action required — maintain current practices",
  "No action required — maintain current practices",
  "Join a certified cooperative",
  "Apply nitrogen-rich fertilizer",
  "Soil testing and amendment required",
  "Needs GlobalGAP certification training",
  "Enroll in crop insurance program",
  "Irrigation system installation recommended",
];

function deriveExportEligibility(
  compliance: FarmerCompliance,
  residue: ResidueLevel,
): ExportEligibility {
  if (compliance.EU === "Fail" || residue === "Unsafe") return "Not Eligible";
  if (compliance.EU === "Borderline" || residue === "Borderline") return "Borderline";
  if (compliance.EU === "Pass" && compliance.Kenya === "Pass" && residue === "Safe")
    return "Eligible";
  return "Not Eligible";
}

function deriveVulnerabilityLevel(index: number): VulnerabilityLevel {
  if (index < 35) return "Low";
  if (index < 65) return "Medium";
  return "High";
}

export function generateFarmers(count: number = 5000): Farmer[] {
  const farmers: Farmer[] = [];

  for (let i = 0; i < count; i++) {
    const baseName = farmerNames[i % farmerNames.length];
    const suffix = Math.floor(i / farmerNames.length);
    const name = suffix === 0 ? baseName : `${baseName} ${suffix + 1}`;

    const county = randomElement(KENYA_COUNTIES).name;
    const crop = randomElement(farmerCrops);
    const yieldRange = cropYieldRanges[crop];
    const expectedYield = Math.floor(
      yieldRange.min + Math.random() * (yieldRange.max - yieldRange.min),
    );

    // 80% Pass on EU, 90%+ on EAC & Kenya → drives high eligibility
    const compliance: FarmerCompliance = {
      EU:    Math.random() < 0.80 ? "Pass" : Math.random() < 0.6 ? "Borderline" : "Fail" as ComplianceStatus,
      US:    Math.random() < 0.75 ? "Pass" : Math.random() < 0.6 ? "Borderline" : "Fail" as ComplianceStatus,
      EAC:   Math.random() < 0.92 ? "Pass" : "Borderline" as ComplianceStatus,
      Kenya: Math.random() < 0.95 ? "Pass" : "Borderline" as ComplianceStatus,
    };

    // Residue must be consistent with compliance
    const allPass =
      compliance.EU === "Pass" &&
      compliance.US === "Pass" &&
      compliance.EAC === "Pass" &&
      compliance.Kenya === "Pass";
    const anyFail = compliance.EU === "Fail" || compliance.US === "Fail";

    const residueRand = Math.random();
    const residue: ResidueLevel = allPass
      ? "Safe" // All markets pass → must be Safe
      : anyFail
      ? residueRand < 0.6
        ? "Borderline"
        : "Unsafe"
      : residueRand < 0.75
      ? "Safe"
      : residueRand < 0.9
      ? "Borderline"
      : "Unsafe";

    const exportEligibility = deriveExportEligibility(compliance, residue);

    // Climate vulnerability: lean lower (better)
    const climateVulnerabilityIndex = randomBetween(20, 70);
    const vulnerabilityLevel = deriveVulnerabilityLevel(climateVulnerabilityIndex);

    // Credit score: lean higher (5.5–9.0)
    const creditworthinessScore =
      Math.round((5.5 + Math.random() * 3.5) * 10) / 10;

    // Productivity: mostly positive
    const productivityRand = Math.random();
    const productivityTrend =
      productivityRand < 0.75
        ? Math.round((2 + Math.random() * 43) * 10) / 10   // +2% to +45%
        : Math.round((-1 - Math.random() * 14) * 10) / 10; // -1% to -15%

    farmers.push({
      id: `farmer-${i + 1}`,
      farmerId: `FARM-KE-2026-${String(i + 1).padStart(5, "0")}`,
      name,
      county,
      cropType: crop,
      expectedYield,
      yieldUnit: yieldRange.unit,
      nitrogenDeficiency:    deficiencyLevels[randomBetween(0, deficiencyLevels.length - 1)],
      phosphorusDeficiency:  deficiencyLevels[randomBetween(0, deficiencyLevels.length - 1)],
      potassiumDeficiency:   deficiencyLevels[randomBetween(0, deficiencyLevels.length - 1)],
      chemicalResidueLevel:  residue,
      compliance,
      exportEligibility,
      creditworthinessScore,
      productivityTrend,
      insuranceClaimReduction: Math.round((20 + Math.random() * 45) * 10) / 10,
      climateVulnerabilityIndex,
      vulnerabilityLevel,
      primaryBarrier:   primaryBarriers[randomBetween(0, primaryBarriers.length - 1)],
      recommendedAction: recommendedActions[randomBetween(0, recommendedActions.length - 1)],
      lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    });
  }

  return farmers;
}

// ─── Main ────────────────────────────────────────────────────────────────────

export function generateAllMockData() {
  const devices = generateMockDevices();
  const agents  = generateMockAgents();
  const scans   = generateMockScans(devices, agents);
  const counties = generateMockCounties(devices, agents, scans);
  const alerts  = generateMockAlerts(devices, scans);
  const farmers = generateFarmers(5000);

  return { devices, agents, scans, counties, alerts, farmers };
}
