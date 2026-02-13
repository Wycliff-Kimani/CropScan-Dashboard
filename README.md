# CropScan Dashboard

A modern, professional managerial dashboard web application for **CropScan.co.ke** — a Kenyan agritech company providing solar-powered handheld IoT devices for on-site crop scanning.

## Features

### Core Features

- **Real-time Device Monitoring**: Track device status, battery level, solar charging, and synchronization in real-time
- **Agent Management**: Monitor agent performance with detailed metrics and leaderboards
- **Comprehensive Scans Log**: Detailed activity log with advanced filtering and search capabilities
- **Interactive Map View**: Visual representation of device locations and crop health across Kenyan counties
- **Advanced Analytics**: Rich charts showing trends, performance metrics, and regional analysis
- **Alerts & Notifications**: Real-time alerts for critical issues (offline devices, low battery, high-deficiency clusters)

### Advanced Features

- 🌓 **Dark Mode Support**: Full dark mode with system preference detection
- 📊 **Real-time Simulation**: Mock data updates simulate live device activity
- 🔍 **Advanced Filtering**: Powerful search and filter across all tables
- 📥 **Export Functionality**: Export data as CSV and PDF reports
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile
- 🎨 **Agricultural Theme**: Professional design with green accents and earth tones
- ⚡ **Performance Optimized**: Fast navigation with excellent data density
- 🔄 **Real-time Updates**: Simulated live data streaming and device status changes

## Dashboard Pages

### 1. **Overview Dashboard** (`/dashboard`)

- KPI cards showing key metrics
- Scans trend chart (last 30 days)
- Top counties by activity
- Device status breakdown
- Most common nutrient deficiencies
- Crop types distribution
- Regional performance comparison
- Recent scans activity feed

### 2. **Devices** (`/dashboard/devices`)

- Filterable/sortable device table
- Device cards with quick stats
- Filter by status (Online/Offline/Low Battery)
- Filter by maintenance condition (Good/Needs Service/Damaged)
- Bulk actions for device assignment
- Battery level visualization
- Solar charging status
- Last sync time tracking

### 3. **Agents** (`/dashboard/agents`)

- Agent performance table
- Top performers leaderboard
- Scans metrics (today/week/month)
- Performance ratings
- Location tracking
- Assigned device count

### 4. **Activity Log** (`/dashboard/scans`)

- Comprehensive scan history
- Advanced filtering by crop, county, date range
- Detailed scan information modal
- Nutrient deficiency analysis
- Fertilizer recommendations
- Health scores and humidity levels
- Yield impact projections
- SMS delivery status

### 5. **Map View** (`/dashboard/map`)

- Interactive Kenya map
- County-level health score visualization
- Device location pins colored by status
- Heatmap of scan density
- County selection for detailed stats
- Quick county selector sidebar
- Real-time device status indicators

### 6. **Analytics** (`/dashboard/analytics`)

- Scans over time trends
- Most common nutrient deficiencies
- Crop distribution analysis
- Regional performance comparison
- Device utilization rates
- Yield projection trends
- Detailed metrics breakdown
- Export analytics reports

### 7. **Alerts** (`/dashboard/alerts`)

- Critical, warning, and info alerts
- Unread alert counter
- Offline device alerts
- Low battery warnings
- High-deficiency cluster detection
- Maintenance alerts
- Alert management and dismissal

## Technology Stack

### Frontend

- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **TanStack Table** for advanced tables
- **Lucide React** for icons
- **Zustand** for state management
- **Radix UI** primitives

### Styling

- Custom agricultural theme colors
- Dark mode with Tailwind
- Responsive mobile-first design
- Smooth animations and transitions

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx (Overview)
│   │   ├── devices/page.tsx
│   │   ├── agents/page.tsx
│   │   ├── scans/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── alerts/page.tsx
│   │   └── map/page.tsx
│   ├── layout.tsx
│   ├── page.tsx (Home redirect)
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── DashboardLayout.tsx
│   ├── ui/
│   │   └── Cards.tsx
│   ├── charts/
│   │   └── Charts.tsx
│   └── tables/
│       └── DataTable.tsx
├── lib/
│   ├── mock-data.ts (Realistic Kenyan data)
│   ├── utils.ts (Utility functions)
│   └── store.ts (Zustand store)
└── types/
    └── index.ts (TypeScript interfaces)
```

## Data Model

### Device

- ID, Number, Status (Online/Offline/Low Battery)
- Battery %, Solar Charging Status
- Location (County + GPS)
- Assigned Agent
- Maintenance Status (Good/Needs Service/Damaged)
- Total Scans, Last Sync Time

### Agent

- Name, ID, Phone
- Assigned Devices
- Current Location (County)
- Scans (Today/Week/Month)
- Performance Rating (1-5)
- Status (Active/Inactive)

### Scan

- Device ID, Agent ID
- Location (County, GPS, Farmer Name)
- Crop Type
- Timestamp
- Results:
  - Nutrient Deficiencies
  - Recommended Fertilizer
  - Humidity Level
  - Health Score (1-100)
  - Estimated Yield Impact
  - SMS Delivery Status

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone or extract the project**

```bash
cd "CropScan Dashboard"
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Mock Data

The application includes realistic Kenyan mock data:

- **Counties**: Kiambu, Nakuru, Nyeri, Meru, Kisumu, Kakamega, and more
- **Crops**: Maize, Beans, Potatoes, Tea, Coffee, Tomatoes, Kale, Wheat
- **Nutrients**: Nitrogen, Phosphorus, Potassium, and trace elements
- **45 Devices** with realistic statuses and battery levels
- **25 Agents** across different regions
- **150 Scans** with detailed results

Real-time simulation updates device statuses and battery levels every 30 seconds to simulate live operations.

## Key Highlights

### Agricultural Focus

- Kenyan county-specific data and locations
- Common crops and nutrient deficiencies for East Africa
- Fertilizer recommendations aligned with regional needs
- Realistic IoT device metrics (battery, solar charging, sync times)

### Professional UX

- Clean, modern interface inspired by Stripe
- Excellent data density without clutter
- Fast navigation between sections
- Loading states and empty states
- Responsive design for field managers on tablets

### Business Metrics

- **40%+ Fertilizer Savings**: Highlight CropScan's value proposition
- **Crop Health Scoring**: Comprehensive plant wellness indicators
- **Performance Tracking**: Agent leaderboards and productivity metrics
- **Regional Analysis**: County-level performance and trends

## Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the agricultural green theme:

```typescript
'ag-green': {
  700: '#166534', // Primary dark green
  600: '#16a34a', // Secondary green
  400: '#4ade80', // Accent green
}
```

### Mock Data

Modify `src/lib/mock-data.ts` to:

- Add more devices, agents, or scans
- Change crop types or nutrient deficiencies
- Add more Kenya counties
- Update fertilizer recommendations

### Pages

Add new dashboard pages by creating files in `src/app/dashboard/[page]/page.tsx`

## Future Enhancements

- [ ] Authentication and role-based access control
- [ ] Real API integration instead of mock data
- [ ] Advanced geospatial analysis with Leaflet
- [ ] PDF report generation
- [ ] Email notifications
- [ ] Mobile app
- [ ] Multi-language support (English/Swahili)
- [ ] Predictive analytics
- [ ] AI-powered recommendations

## Performance

- **First Load**: ~2-3 seconds
- **Navigation**: Instant (SPA)
- **Data Operations**: Optimized client-side sorting and filtering
- **Charts**: Efficient Recharts rendering

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - CropScan.co.ke

## Support

For issues or feature requests, contact the development team.

---

**Built with ❤️ for farmers and agricultural managers in Kenya**
