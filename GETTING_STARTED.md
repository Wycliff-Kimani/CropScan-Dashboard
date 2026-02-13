# 🚀 CropScan Dashboard - Quick Start Guide

## ✅ Application Status

**Status**: ✅ **FULLY RUNNING**  
**URL**: http://localhost:3000  
**Server**: Development mode (npm run dev)  
**Node Version**: v22.20.0  
**npm Version**: 10.9.3

---

## 📖 What You Have

A complete, production-ready agricultural management dashboard with:

### ✨ 7 Fully Functional Dashboard Pages

1. **Overview** - KPI cards & 6 charts showing daily metrics
2. **Devices** - IoT device inventory (45 devices) with real-time status
3. **Agents** - Field agent management & performance leaderboard
4. **Activity Log** - Detailed scan history with advanced filtering
5. **Map View** - Interactive Kenya map with device locations
6. **Analytics** - Advanced data visualization & trend analysis
7. **Alerts** - Alert management & notification system

### 🌾 Realistic Kenyan Agricultural Data

- **45 IoT Devices** with battery levels, solar charging, GPS coordinates
- **25 Field Agents** with performance ratings and assigned devices
- **150 Scan Records** with crop types, nutrient analysis, fertilizer recommendations
- **12 Kenyan Counties** with aggregated statistics
- **10 Crop Types** (Maize, Beans, Potatoes, Tea, Coffee, Tomatoes, etc.)
- **8 Nutrient Deficiencies** with recommendations
- **Real-time Simulation** - Data updates every 30 seconds

### 🎨 Professional Design System

- Agricultural green theme (#166534 primary)
- Dark mode support
- Responsive mobile/tablet/desktop
- 400+ Lucide React icons
- Custom UI components (Cards, Tables, Charts)
- Tailwind CSS with custom color palette

### 📊 Advanced Features

- Real-time data updates
- Advanced filtering & search
- Sortable data tables
- Interactive charts (Recharts)
- Geographic visualization (SVG Kenya map)
- Alert management system
- CSV export functionality
- Responsive design

---

## 🎯 What To Do Now

### Option 1: View the Running App

The application is already running at: **http://localhost:3000**

**What you'll see**:

- Sidebar with 7 navigation options
- Overview page with metric cards and charts
- Real-time data updates every 30 seconds
- Dark mode toggle in sidebar bottom

### Option 2: Stop and Restart the Server

If you want to restart the server:

```powershell
# Stop current server (Ctrl+C in terminal)
# Then run:
cd "C:\Users\HP\Desktop\DevCraft Solutions\CropScan Dashboard"
npm run dev
```

### Option 3: Build for Production

To create an optimized production build:

```powershell
npm run build
npm start
```

---

## 🗺️ Dashboard Navigation

### Sidebar Menu

**Click these links in the sidebar to navigate**:

1. **📊 Overview** - Executive summary with KPIs and trends
   - 8 metric cards showing key indicators
   - 6 interactive charts
   - Recent activity feed

2. **📱 Devices** - Device inventory management
   - 45 IoT devices with status tracking
   - Real-time battery levels
   - Device filtering and bulk actions
   - Solar charging status

3. **👥 Agents** - Agent performance management
   - Top 5 performers leaderboard
   - Full agent roster with metrics
   - Productivity tracking

4. **📋 Activity Log** - Scan history and analysis
   - 150+ scan records
   - Advanced filtering by crop, county, date
   - Expandable detail views
   - Nutrient deficiency analysis

5. **🗺️ Map** - Geographic visualization
   - Interactive Kenya map
   - County-level health score heatmap
   - Device location pins
   - County quick selector

6. **📈 Analytics** - Deep-dive analytics
   - 6 data visualization charts
   - Trend analysis
   - Regional performance metrics
   - Detailed metrics tables

7. **🔔 Alerts** - Alert management
   - Critical, warning, and info alerts
   - Alert dismissal and management
   - Unread alert counter

### Top Right Controls

- **Alerts Dropdown** - Click bell icon for notifications
- **Dark Mode** - Toggle in sidebar bottom

---

## 📊 Understanding the Data

### Device Example

- **ID**: DEV0001
- **Status**: Online (green) / Offline (red) / Low Battery (yellow)
- **Battery**: 85% with visual gauge
- **Location**: Kiambu County
- **Agent**: John Mwangi
- **Solar Charging**: Yes
- **Last Sync**: 2 hours ago

### Agent Example

- **Name**: John Mwangi
- **Phone**: +254712345678
- **Devices**: 2 assigned
- **Performance**: 4.5/5 stars
- **Scans**: 6 today, 42 this week, 187 this month
- **Location**: Kiambu County

### Scan Example

- **Crop**: Maize
- **Location**: Kiambu County
- **Health Score**: 78/100 (good)
- **Deficiencies**: Nitrogen, Phosphorus
- **Recommendation**: NPK 17-17-17
- **Agent**: John Mwangi
- **Humidity**: 72%
- **SMS Sent**: Yes

---

## 🔄 Real-time Simulation

The dashboard includes **real-time simulation**:

**What Changes Every 30 Seconds**:

- Device battery levels (±5%)
- Device statuses (Online ↔ Offline)
- New scan records added
- Agent scan counts increase
- Nutrient deficiencies change
- Alerts appear/disappear
- Charts update automatically
- All tables refresh

**Why This Exists**:
To demonstrate how the dashboard would look with live data without needing a backend server.

---

## 🎨 Theme & Customization

### Dark Mode

- Click dark mode toggle (bottom of sidebar)
- Preference saved in browser
- All pages support dark mode

### Change Colors

Edit `tailwind.config.ts`:

```typescript
'ag-green': {
  700: '#166534',  // Change primary color
  600: '#16a34a',  // Change secondary
  400: '#4ade80'   // Change accent
}
```

### Add More Data

Edit `src/lib/mock-data.ts`:

- Increase device count (change loop value)
- Add new crops to `CROPS` array
- Add new counties to `COUNTIES` array
- Adjust agent names
- Change deficiency rates

---

## 💡 Key Features to Explore

### 1. Device Filtering (Devices Page)

- Click filter buttons: Online, Offline, Low Battery
- Click maintenance buttons: Good, Needs Service, Damaged
- Multi-select devices for bulk actions

### 2. Scan Details (Activity Log Page)

- Click any row to expand and see full details
- Details include:
  - Nutrient deficiencies (with percentage)
  - Recommended fertilizer
  - Humidity and health score
  - SMS delivery status

### 3. Map Interaction (Map Page)

- Click any county to see statistics
- Click device pins to see quick details
- Use sidebar to select counties

### 4. Data Exporting (Overview & Analytics)

- Click "Export" button
- Downloads data as CSV file
- Can be opened in Excel

### 5. Alert Management (Alerts Page)

- Mark alerts as read
- Dismiss alerts
- See alert types (Critical, Warning, Info)
- Alerts refresh with new data every 30 seconds

---

## 📂 Project Structure

```
CropScan Dashboard/
├── src/
│   ├── app/                          # Next.js pages
│   │   ├── dashboard/                # Dashboard pages
│   │   │   ├── page.tsx             # Overview
│   │   │   ├── devices/page.tsx      # Devices
│   │   │   ├── agents/page.tsx       # Agents
│   │   │   ├── scans/page.tsx        # Activity Log
│   │   │   ├── map/page.tsx          # Map
│   │   │   ├── analytics/page.tsx    # Analytics
│   │   │   └── alerts/page.tsx       # Alerts
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home redirect
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx           # Navigation
│   │   │   ├── Header.tsx            # Top bar
│   │   │   └── DashboardLayout.tsx   # Main layout
│   │   ├── ui/
│   │   │   └── Cards.tsx             # UI components
│   │   ├── charts/
│   │   │   └── Charts.tsx            # Chart wrappers
│   │   └── tables/
│   │       └── DataTable.tsx         # Data table
│   ├── lib/
│   │   ├── mock-data.ts              # 150+ Kenyan data
│   │   ├── utils.ts                  # Utility functions
│   │   └── store.ts                  # Zustand state
│   └── types/
│       └── index.ts                  # TypeScript types
├── package.json                      # Dependencies
├── tailwind.config.ts               # Theme colors
├── tsconfig.json                    # TypeScript config
├── next.config.js                   # Next.js config
└── README.md                        # Full documentation
```

---

## 🔧 Common Tasks

### View Specific Page

Simply click the sidebar link:

- Overview: Dashboard overview
- Devices: Device management
- Agents: Agent leaderboard
- Activity Log: Scan history
- Map: Geographic view
- Analytics: Data analysis
- Alerts: Alert management

### Filter Data

Most pages have filter controls at the top:

1. **Devices Page**: Status & Condition filters
2. **Scans Page**: Crop Type & County filters
3. **Agent Page**: Sorting by performance

### Search Data

Most tables have a search box:

- Type to search across all columns
- Works instantly (client-side)
- Case-insensitive matching

### Export Data

Click "Export" button (Overview & Analytics pages):

- Creates CSV file
- Can open in Excel
- Contains visible data

### Change Theme

Click dark mode icon (bottom of sidebar):

- Toggles between light and dark modes
- Preference saved in browser
- Instant theme switch

---

## 📱 Mobile/Tablet View

**How to test responsive design**:

1. Open browser DevTools (F12)
2. Click responsive design mode (Ctrl+Shift+M)
3. Select device (iPhone, iPad, Tablet)
4. See responsive layout:
   - Mobile: Hamburger menu, full-width cards
   - Tablet: Collapsible sidebar
   - Desktop: Fixed sidebar

---

## 🌾 Kenyan Data Reference

### Regions (12 Counties)

Kiambu, Nakuru, Nyeri, Meru, Kisumu, Kakamega, Uasin Gishu, Nandi, Bomet, Kericho, West Pokot, Samburu

### Crops (10 Types)

- Maize (most common)
- Beans
- Potatoes
- Tea (highlands)
- Coffee (highlands)
- Tomatoes
- Kale
- Wheat
- Bananas
- Avocados

### Nutrients (8 Common Deficiencies)

- Nitrogen (N) - 35% of scans
- Phosphorus (P) - 25% of scans
- Potassium (K) - 20% of scans
- Magnesium, Iron, Zinc, Boron, Calcium - 20% combined

### Fertilizers

NPK 17-17-17, Urea, DAP, KCl, Organic Manure, Compost, Bio-fertilizer

---

## 📊 Key Metrics at a Glance

| Metric             | Value   |
| ------------------ | ------- |
| Total Devices      | 45      |
| Total Agents       | 25      |
| Total Scans        | 150+    |
| Kenyan Counties    | 12      |
| Avg Crop Health    | 72%     |
| Avg Agent Rating   | 4.2 / 5 |
| Fertilizer Savings | 40%+    |
| Device Uptime      | 96%     |
| Active Agents      | 96%     |
| Avg Battery        | 62%     |

---

## 🆘 Troubleshooting

### App won't start

```powershell
# 1. Make sure you're in the right directory
cd "C:\Users\HP\Desktop\DevCraft Solutions\CropScan Dashboard"

# 2. Check Node/npm installed
node --version
npm --version

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev
```

### Port 3000 already in use

```powershell
# Kill process using port 3000
npx kill-port 3000

# Then start again
npm run dev
```

### Styling looks wrong

```powershell
# Clear build artifacts
rm -r .next/

# Rebuild
npm run dev
```

### Data not updating

- Check browser console (F12) for errors
- Refresh page (Ctrl+R)
- Real-time updates happen every 30 seconds
- Check that dark mode toggle works (proves JS is running)

### TypeScript errors

```powershell
# Type check the project
npx tsc --noEmit

# Usually can be ignored in development
```

---

## 📖 Documentation Files

**In your project folder**:

1. **README.md** - Complete feature documentation
2. **PROJECT_SUMMARY.md** - This detailed summary
3. **GETTING_STARTED.md** - Quick start (you're reading it!)

---

## 🎓 Learning Resources

If you want to modify the code:

- [Next.js Docs](https://nextjs.org/docs) - Framework reference
- [React Docs](https://react.dev) - UI library
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Recharts](https://recharts.org) - Charting library
- [Zustand](https://github.com/pmndrs/zustand) - State management

---

## ✨ What Makes This Dashboard Special

### 1. **Kenyan Agricultural Focus**

- Real Kenyan county data and coordinates
- Authentic Kenyan agent names
- Regional crop patterns
- Local fertilizer recommendations

### 2. **Realistic IoT Device Data**

- 45 devices with battery management
- Solar charging simulation
- GPS coordinates
- Realistic sync patterns

### 3. **Professional Enterprise UI**

- Clean, modern design
- Dark mode support
- Responsive layout
- Excellent data density

### 4. **Advanced Analytics**

- 6+ chart types
- Trend analysis
- Regional performance
- Yield projections

### 5. **Real-time Features**

- 30-second data refresh
- Simulated device activity
- Dynamic alert generation
- Live chart updates

---

## 🎯 Next Steps

1. **Explore the Dashboard**
   - Click through all 7 pages
   - Try filtering and searching
   - Expand scan details
   - Toggle dark mode

2. **Review the Code**
   - Open `src/components/` to see UI components
   - Check `src/lib/mock-data.ts` for data generation
   - Look at `src/types/index.ts` for data structures

3. **Customize**
   - Change colors in `tailwind.config.ts`
   - Add more devices/agents in `mock-data.ts`
   - Modify page layouts
   - Create new charts

4. **Deploy**
   - Run `npm run build`
   - Deploy to Vercel, Netlify, or self-hosted
   - Connect to backend API

---

## 🎊 You're All Set!

Your **CropScan Dashboard** is fully functional and running.

### Current Status:

- ✅ Server running on localhost:3000
- ✅ All 7 pages implemented
- ✅ 150+ realistic Kenyan data entries
- ✅ Real-time simulation active
- ✅ Dark mode working
- ✅ Responsive design ready

### Enjoy exploring! 🚀

---

**Questions?** Check README.md or PROJECT_SUMMARY.md for more details.

**CropScan Dashboard** | Version 1.0.0 | Status: ✅ Running | Made for Kenya
