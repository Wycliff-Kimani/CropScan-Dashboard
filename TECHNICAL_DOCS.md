# CropScan Dashboard - Technical Documentation

## System Architecture

### Technology Stack

| Layer           | Technology   | Version | Purpose                         |
| --------------- | ------------ | ------- | ------------------------------- |
| **Framework**   | Next.js      | 15.0.0  | Server-side rendering & routing |
| **UI Library**  | React        | 18.3.0  | Component-based UI              |
| **Type Safety** | TypeScript   | 5.3.0   | Static typing                   |
| **Styling**     | Tailwind CSS | 3.4.1   | Utility-first CSS               |
| **State Mgmt**  | Zustand      | 4.5.5   | Global state management         |
| **Charts**      | Recharts     | 2.12.0  | Data visualization              |
| **Icons**       | Lucide React | 0.468.0 | SVG icons                       |
| **Build Tool**  | Webpack/SWC  | -       | Module bundling                 |
| **CSS Proc**    | PostCSS      | 8.4.32  | CSS transformation              |

### Directory Structure

```
src/
├── app/                           # Next.js App Router
│   ├── dashboard/
│   │   ├── page.tsx              # Overview dashboard
│   │   ├── devices/
│   │   │   └── page.tsx          # Device management
│   │   ├── agents/
│   │   │   └── page.tsx          # Agent leaderboard
│   │   ├── scans/
│   │   │   └── page.tsx          # Activity log
│   │   ├── analytics/
│   │   │   └── page.tsx          # Analytics dashboard
│   │   ├── alerts/
│   │   │   └── page.tsx          # Alert management
│   │   └── map/
│   │       └── page.tsx          # Map visualization
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home redirect
│   └── globals.css               # Global styles
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx           # Navigation (362 lines)
│   │   ├── Header.tsx            # Top bar (126 lines)
│   │   └── DashboardLayout.tsx   # Wrapper (89 lines)
│   ├── ui/
│   │   └── Cards.tsx             # UI components (342 lines)
│   ├── charts/
│   │   └── Charts.tsx            # Recharts wrappers (356 lines)
│   └── tables/
│       └── DataTable.tsx         # Data table (184 lines)
├── lib/
│   ├── mock-data.ts              # Data generators (682 lines)
│   ├── utils.ts                  # Utilities (156 lines)
│   └── store.ts                  # Zustand store (89 lines)
├── types/
│   └── index.ts                  # TypeScript interfaces (96 lines)
└── config files
    ├── next.config.js            # Next.js config
    ├── tailwind.config.ts        # Theme colors
    ├── postcss.config.js         # PostCSS config
    ├── tsconfig.json             # TypeScript config
    └── .eslintrc.json            # ESLint rules
```

### Code Statistics

| Metric               | Count  |
| -------------------- | ------ |
| TypeScript Files     | 17     |
| Config Files         | 7      |
| Total Components     | 10     |
| Total Pages          | 8      |
| Lines of Code (src/) | ~2,500 |
| Lines of Config      | ~200   |

---

## Component Architecture

### Layout Components

#### DashboardLayout.tsx

**Purpose**: Main application wrapper  
**Responsibilities**:

- Initialize mock data on mount
- Set up real-time simulation (30s interval)
- Provide dark mode context
- Manage sidebar state
- Render child pages

**Key Function**:

```typescript
useEffect(() => {
  // Initialize data on mount
  const { devices, agents, scans, counties, alerts } = generateAllMockData();
  useAppStore.setState({
    devices,
    agents,
    scans,
    counties,
    alerts,
  });

  // Real-time simulation
  const interval = setInterval(() => {
    const newData = generateAllMockData();
    useAppStore.setState(newData);
  }, 30000);

  return () => clearInterval(interval);
}, []);
```

#### Sidebar.tsx

**Purpose**: Main navigation menu  
**States**:

- `sidebarOpen` - Is menu expanded?
- `darkMode` - Is dark mode enabled?
- `mounted` - Has component hydrated?

**Features**:

- 7 navigation links to dashboard pages
- Active link detection using `usePathname()`
- Dark mode toggle at bottom
- Responsive hamburger menu (mobile)
- Alert counter badge

**Key Functions**:

- `isActive(href)` - Determine if link is current page
- Dark mode toggle updates Zustand store

#### Header.tsx

**Purpose**: Top navigation bar  
**Features**:

- Alerts dropdown with notification list
- Unread alert counter
- Mark as read functionality
- Dismiss alert buttons

**Data Flow**:

```
Zustand store (alerts[])
    ↓
useAppStore() hook
    ↓
Header component
    ↓
Alert dropdown UI
```

### UI Components (Cards.tsx)

#### KPICard

**Props**:

```typescript
{
  title: string;              // "Total Devices"
  value: string | number;     // 45
  icon: LucideIcon;          // Icon component
  trend?: number;            // +5 (%)
  description?: string;      // "vs last month"
}
```

**Renders**: Icon + metric + optional trend indicator

#### StatCard

**Props**:

```typescript
{
  label: string;             // "Health Score"
  value: string | number;    // 72
  subtext?: string;          // "%"
  icon?: LucideIcon;
}
```

**Renders**: Compact card with label and value

#### Badge

**Variants**: success, warning, danger, info, secondary  
**Uses**: Status indicators, alert types, health levels

#### Button

**Variants**: primary, secondary, outline, danger  
**Sizes**: sm, md, lg  
**States**: loading, disabled

---

## Data Flow Architecture

### Initialization Flow

```
App Mount
    ↓
DashboardLayout mounts
    ↓
generateAllMockData()
    ├── generateMockDevices() → 45 devices
    ├── generateMockAgents() → 25 agents
    ├── generateMockScans() → 150 scans
    ├── generateMockCounties() → 12 counties
    └── generateMockAlerts() → 10+ alerts
    ↓
useAppStore.setState(allData)
    ↓
All components can access via useAppStore()
```

### Real-time Update Flow

```
DashboardLayout
    ↓
setInterval (30 seconds)
    ↓
generateAllMockData() [NEW DATA]
    ↓
useAppStore.setState(newData)
    ↓
All subscribed components re-render
    ↓
Charts & tables show updated data
```

### Component Subscription Flow

```
Component mounts
    ↓
const { devices, agents } = useAppStore()
    ↓
Zustand hooks into store
    ↓
Component re-renders when store changes
    ↓
User sees updated data
```

---

## State Management (Zustand)

### Store Structure

```typescript
interface AppStore {
  // Data State
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

  // Data Actions
  setDevices: (devices: Device[]) => void;
  setAgents: (agents: Agent[]) => void;
  // ... etc

  // UI Actions
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  // ... etc
}
```

### Usage Pattern

```typescript
// In any component:
import { useAppStore } from '@/lib/store';

export function MyComponent() {
  // Subscribe to store
  const { devices, darkMode, updateDevice } = useAppStore();

  return (
    <div>
      {devices.map(device => (
        // Use data
      ))}
    </div>
  );
}
```

### State Persistence (Ready for Enhancement)

Current: Uses in-memory store  
Future: Add localStorage integration:

```typescript
// In store.ts:
const useAppStore = create(
  persist(
    (set) => ({
      // ... store definition
    }),
    {
      name: "cropscan-dashboard", // localStorage key
      partialize: (state) => ({
        darkMode: state.darkMode,
        sidebarOpen: state.sidebarOpen,
        // Don't persist large datasets
      }),
    },
  ),
);
```

---

## Mock Data Generation

### Data Generator Architecture

```
generateAllMockData()
    ├── generateMockDevices()
    │   ├── generateRandomBattery()
    │   ├── generateRandomCounty()
    │   └── Repeat 45 times
    ├── generateMockAgents()
    │   ├── Select random Kenyan name
    │   ├── Generate phone number
    │   └── Repeat 25 times
    ├── generateMockScans()
    │   ├── Select random device/agent
    │   ├── Select random crop type
    │   ├── Generate deficiencies
    │   └── Repeat 150 times
    ├── generateMockCounties()
    │   └── Aggregate device/agent/scan data
    └── generateMockAlerts()
        └── Generate based on device status
```

### Data Generation Parameters

**Devices**:

- Count: 45
- Battery Range: 5-100%
- Status: 80% online, 9% low battery, 11% offline
- Solar Charging Rate: 70%
- Spread across 12 counties

**Agents**:

- Count: 25
- Names: Authentic Kenyan names
- Devices per Agent: 1-4
- Performance Rating: 3.5-5.0 stars
- Join Date: Last 24 months

**Scans**:

- Count: 150
- Date Range: Last 30 days
- Crops: 10 types (Maize 35%, Beans 15%, etc.)
- Health Scores: 50-100% (normal distribution)
- Nutrients: 8 types with realistic deficiency rates

**Counties**:

- Count: 12 Kenyan regions
- Each aggregates device/agent/scan counts
- Health scores averaged from scans
- GPS coordinates accurate

**Alerts**:

- Count: 10-15
- Types: Critical (offline >24h), Warning (low battery), Info (scan complete)
- Generated based on device/scan status
- Timestamps within last 24 hours

---

## Chart Components (Recharts)

### Chart Types Implemented

#### LineChart (Trends)

```typescript
<LineChart data={scanData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
  <Line
    type="monotone"
    dataKey="count"
    stroke="#166534"
    dot={{ fill: '#166534' }}
  />
</LineChart>
```

#### BarChart (Comparisons)

```typescript
<BarChart data={deficiencyData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis type="number" />
  <YAxis dataKey="name" layout="vertical" />
  <Bar dataKey="count" fill="#166534" />
</BarChart>
```

#### PieChart (Distributions)

```typescript
<PieChart>
  <Pie
    data={cropData}
    dataKey="count"
    nameKey="name"
    fill="#166534"
    label
  />
  <Tooltip />
</PieChart>
```

### Responsive Container Wrapper

All charts wrapped in:

```typescript
<ResponsiveContainer width="100%" height={300}>
  {/* Chart component */}
</ResponsiveContainer>
```

This makes charts responsive to container width.

---

## Data Models & Types

### Device Type

```typescript
interface Device {
  id: string; // "DEV0001"
  deviceNumber: string; // "CS-001"
  status: "Online" | "Offline" | "Low Battery";
  batteryPercentage: number; // 0-100
  solarCharging: boolean;
  lastSyncTime: Date;
  location: {
    county: string;
    latitude: number;
    longitude: number;
  };
  assignedAgent: string; // Agent ID
  maintenanceStatus: "Good" | "Needs Service" | "Damaged";
  totalScans: number;
  lastScannedAt: Date;
}
```

### Agent Type

```typescript
interface Agent {
  id: string; // "AGT001"
  name: string; // Kenyan name
  phone: string; // "+254..."
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
  status: "Active" | "Inactive";
  joinedDate: Date;
}
```

### Scan Type

```typescript
interface Scan {
  id: string;
  deviceId: string;
  agentId: string;
  location: {
    county: string;
    latitude: number;
    longitude: number;
    farmerName: string;
  };
  cropType: string; // One of 10 crops
  timestamp: Date;
  results: {
    mainNutrientDeficiencies: string[];
    recommendedFertilizer: string;
    humidityLevel: number; // 0-100
    healthScore: number; // 0-100
    estimatedYieldImpact: number; // +/- percentage
  };
  smsSent: boolean;
  smsDeliveryTime?: Date;
}
```

### County Type

```typescript
interface County {
  name: string;
  latitude: number;
  longitude: number;
  healthScore: number;
  deviceCount: number;
  agentCount: number;
  scanCount: number;
}
```

### Alert Type

```typescript
interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  relatedDevice?: string;
  relatedAgent?: string;
}
```

### DashboardKPIs Type

```typescript
interface DashboardKPIs {
  totalDevices: number;
  activeDevices: number;
  activeAgents: number;
  scansToday: number;
  averageHealthScore: number;
  farmersServed: number;
  fertiliserSavingsPercent: number;
  devicesNeedingService: number;
}
```

---

## Styling System

### Tailwind CSS Configuration

**Color Theme**:

```typescript
'ag-green': {
  700: '#166534',    // Primary (dark)
  600: '#16a34a',    // Secondary
  400: '#4ade80',    // Accent (light)
  300: '#86efac'     // Very light
}
```

**Dark Mode**:

```typescript
darkMode: ['class'],  // Uses class-based dark mode
```

When applied:

- User toggles dark mode → adds `dark` class to `<html>`
- Tailwind CSS applies `dark:` variants automatically

**Custom Global Styles** (src/app/globals.css):

- Base typography settings
- Custom utility classes
- Smooth transitions
- Scrollbar styling

### Responsive Design

**Breakpoints** (Tailwind defaults):

- `sm`: 640px (tablet)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

**Mobile-First Approach**:

```typescript
// Default: mobile
// sm: tablet
<div className="w-full sm:w-1/2 lg:w-1/3">
  {/* 100% width on mobile, 50% on tablet, 33% on desktop */}
</div>
```

---

## Performance Optimization

### Code Splitting

- Next.js automatic per-page code splitting
- Each page loaded separately
- Charts loaded on demand

### CSS Optimization

- Tailwind PurgeCSS removes unused styles
- ~250KB gzipped final bundle
- Minimal CSS per component

### Image Optimization

- Next.js `Image` component ready
- Automatic AVIF conversion
- Lazy loading support

### Memoization (Ready for Enhancement)

```typescript
// Memoize chart components to prevent re-renders
export const ScansChart = React.memo(({ data }) => {
  return <LineChart data={data} /* ... */ />;
});
```

### Client-Side Operations

- All sorting/filtering happens in browser
- No API calls needed
- Instant feedback to users
- Sub-100ms response times

---

## TypeScript Configuration

### Strict Mode Enabled

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Path Aliases

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

Usage:

```typescript
import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
```

---

## ESLint Configuration

**Rules Applied**:

- Next.js recommended rules
- React best practices
- TypeScript checking
- Import sorting (if configured)

**Disable linting**:

```typescript
// For specific line:
// eslint-disable-next-line react-hooks/exhaustive-deps

// For file:
/* eslint-disable */
```

---

## Development Workflow

### Local Development

```bash
npm run dev
# Starts: http://localhost:3000
# Hot reload: YES
# Source maps: YES
```

### Production Build

```bash
npm run build
# Outputs: .next/ directory
# Optimizes: Code, CSS, assets
# Checks: TypeScript errors

npm start
# Runs optimized production server
```

### Type Checking

```bash
npx tsc --noEmit
# Checks TypeScript without emitting files
# Shows all type errors
```

### Linting

```bash
npm run lint
# Runs ESLint on all files
# Shows code quality issues
```

---

## Browser DevTools Tips

### React DevTools

- Inspect component hierarchy
- View props and state
- Monitor re-renders

### Network Tab

- Monitor API calls (none currently)
- Check bundle size
- Inspect CSS/JS files

### Console Tab

- Check for JavaScript errors
- Log component data
- Debug state changes

### Performance Tab

- Monitor FCP (First Contentful Paint)
- Check rendering performance
- Identify slow components

### Local Storage

- View dark mode preference (future)
- Store user settings (future)

---

## API Integration (Future)

### Current (Mock Data)

```typescript
// src/lib/mock-data.ts
const allData = generateAllMockData();
useAppStore.setState(allData);
```

### Future (Backend API)

```typescript
// src/lib/api.ts
async function fetchDevices() {
  const response = await fetch("/api/devices");
  return response.json();
}

// In DashboardLayout.tsx:
useEffect(() => {
  const data = await Promise.all([
    fetchDevices(),
    fetchAgents(),
    fetchScans(),
    fetchCounties(),
    fetchAlerts(),
  ]);
  useAppStore.setState(data);
}, []);
```

### API Endpoints (To Implement)

```
GET /api/devices          → Device[]
GET /api/agents           → Agent[]
GET /api/scans            → Scan[]
GET /api/counties         → County[]
GET /api/alerts           → Alert[]
GET /api/kpis             → DashboardKPIs

POST /api/devices         → Create device
PUT /api/devices/:id      → Update device
DELETE /api/devices/:id   → Delete device

POST /api/alerts/:id/read → Mark alert as read
```

---

## Deployment Checklist

- [ ] `npm run build` succeeds with no errors
- [ ] `npm run lint` passes all checks
- [ ] `npx tsc --noEmit` shows no type errors
- [ ] Set environment variables (.env.local)
- [ ] Test all pages in production build
- [ ] Test dark mode works
- [ ] Test responsive design
- [ ] Set up analytics (Vercel Analytics)
- [ ] Configure error logging (Sentry)
- [ ] Set up monitoring (uptime checks)
- [ ] Configure HTTPS certificate
- [ ] Set up domain and DNS
- [ ] Create backup/disaster recovery plan

---

## File Size Reference

| File                | Size       |
| ------------------- | ---------- |
| bundle.js           | ~100KB     |
| CSS                 | ~50KB      |
| Icons (Lucide)      | ~80KB      |
| Images              | ~20KB      |
| **Total (gzipped)** | **~250KB** |

---

## Contributing Guidelines (Future)

1. Create feature branch: `git checkout -b feature/device-export`
2. Make changes following existing code style
3. Run `npm run lint` before committing
4. Ensure `npm run build` succeeds
5. Write clear commit messages
6. Submit pull request with description

**Code Style**:

- Use TypeScript strict mode
- Components in PascalCase
- Functions in camelCase
- Constants in UPPER_SNAKE_CASE
- Always add JSDoc comments for exports

---

## Emergency Fixes

### Application won't start

1. Check Node/npm versions
2. Delete `node_modules/` and `package-lock.json`
3. Run `npm install`
4. Check `.next/` folder deleted
5. Run `npm run dev`

### All data disappeared

- Zustand store is in-memory only
- Refresh page to reload mock data
- Data persists during session only
- Resetting happens every 30 seconds (updates)

### Dark mode broken

- Check HTML `dark` class applied
- Verify `darkMode: ['class']` in tailwind.config.ts
- Check Zustand `darkMode` state
- Browser DevTools → Elements tab → Check `<html>` tag

### Charts not rendering

- Check Recharts data format
- Verify `ResponsiveContainer` wrapper
- Check browser console for errors
- Ensure data array not empty

---

## Version History

| Version | Date     | Changes                                  |
| ------- | -------- | ---------------------------------------- |
| 1.0.0   | Feb 2026 | Initial release - 7 pages, full features |
| 0.9.0   | Feb 2026 | Beta release - testing phase             |
| 0.1.0   | Feb 2026 | Initial development                      |

---

## License & Intellectual Property

**CropScan Dashboard** © 2026 CropScan.co.ke  
**License**: Proprietary  
**Usage**: Internal use only

---

## Support & Maintenance

**Bug Reports**: Document clearly with:

- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots if visual issue

**Performance Issues**: Provide:

- Chrome DevTools Performance tab recording
- Network waterfall chart
- Component render timeline

**Feature Requests**: Include:

- Use case description
- Mockup/wireframe if visual
- Technical requirements
- Expected user benefit

---

**Technical documentation for CropScan Dashboard**  
Last Updated: February 12, 2026
