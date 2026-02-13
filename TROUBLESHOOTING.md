# 🆘 Troubleshooting Guide

## Problems and Solutions

### ❌ Page Won't Load / Shows 404

**Symptoms**: You see "Page not found" or blank page

**Solutions**:

1. Check server is running: `npm run dev`
2. Verify correct URL: http://localhost:3002
3. Hard refresh browser: `Ctrl+Shift+R`
4. Clear cache: `Ctrl+Shift+Delete` → Clear all

### ❌ Dark Mode Not Applying

**Symptoms**: Toggle button works but colors don't change

**Solutions**:

1. Hard refresh: `Ctrl+Shift+R`
2. Check browser DevTools (F12) → Elements
3. Look for `dark` class on `<html>` element
4. If missing, try toggling dark mode again
5. Check console (F12) for JavaScript errors

### ❌ Charts Not Showing

**Symptoms**: Empty space where charts should be

**Solutions**:

1. Check browser console (F12) for errors
2. Verify Recharts installed: `npm list recharts`
3. Check network tab - all files loaded?
4. Refresh page: `Ctrl+R`
5. If still broken: `npm install recharts@latest --save`

### ❌ Sidebar Not Appearing / Mobile Menu Broken

**Symptoms**: Sidebar missing or hamburger menu not working

**Solutions**:

1. Refresh page: `Ctrl+R`
2. Check screen size (resize browser)
3. Check F12 console for errors
4. Verify all CSS loaded (no 404s in Network tab)

### ❌ Data Not Loading / All Tables Empty

**Symptoms**: Pages load but no data displayed

**Solutions**:

1. Check browser console (F12) for errors
2. Verify Zustand installed: `npm list zustand`
3. Wait 5 seconds for data to initialize
4. Try refreshing: `Ctrl+R`
5. Check that mock-data.ts exists: `src/lib/mock-data.ts`

### ❌ Real-time Updates Not Working

**Symptoms**: Data doesn't change every 30 seconds

**Solutions**:

1. That's expected - updates are simulated
2. Manually refresh page: `Ctrl+R`
3. Check browser console for errors
4. Verify DashboardLayout.tsx has setInterval

### ❌ Browser Shows "Cannot Find Module" Error

**Symptoms**: Error in console like "Cannot find module '@/...'

**Solutions**:

1. Run: `npm install`
2. Verify `tsconfig.json` has path aliases
3. Check file actually exists
4. Restart dev server: `npm run dev`

### ❌ Filter/Search Not Working

**Symptoms**: Filter buttons don't change results

**Solutions**:

1. Click again - sometimes needs 2 clicks
2. Verify data loaded first (see above)
3. Check browser console for errors
4. Try refreshing page: `Ctrl+R`

### ❌ Export Button Not Working

**Symptoms**: Click export but nothing happens

**Solutions**:

1. CSV export redirects - check Downloads folder
2. PDF is not yet implemented (shows alert)
3. Check browser console for errors
4. Try with different page: Devices or Analytics

### ❌ Wrong Port / "Port 3000 in use"

**Symptoms**: Server shows port 3000 in use, tries 3001, 3002

**Solution**: That's normal! Server uses first available port

- Access at: http://localhost:3002 (or whatever port shows)
- Or kill Node processes: `taskkill /IM node.exe /F`

---

## 🔧 Nuclear Options (If All Else Fails)

### Complete Fresh Start

```powershell
# 1. Delete node_modules and cache
rmdir /s /q node_modules
rmdir /s /q .next
del package-lock.json

# 2. Reinstall everything
npm install

# 3. Start fresh
npm run dev
```

### Reset Tailwind Cache

```powershell
# Delete Tailwind cache
rmdir /s /q node_modules/.cache

# Rebuild
npm run build
npm start
```

### Clear All Data and Restart

This won't delete your code, just build artifacts:

```powershell
npm run clean 2>nul || (rmdir /s /q .next 2>nul)
npm install
npm run dev
```

---

## 🔍 Diagnostic Checklist

Before seeking help, verify:

- [ ] Server running: Can you see terminal output?
- [ ] Port accessible: Can you reach localhost:3002?
- [ ] Console clean: F12 → Console tab - any huge red errors?
- [ ] Files exist:
  - [ ] src/app/dashboard/page.tsx
  - [ ] src/lib/store.ts
  - [ ] src/components/layout/Sidebar.tsx
  - [ ] package.json
  - [ ] node_modules/ exists
- [ ] Dependencies installed: `npm list | grep -E "react|next|zustand|recharts"`
- [ ] TypeScript valid: `npx tsc --noEmit`

---

## 📊 Browser DevTools Tips

### Check for Errors

Press **F12** → **Console** tab

- Red X = Error (problematic)
- Yellow ⚠ = Warning (usually okay)
- Blue ℹ = Info (just info)

### Check Network

Press **F12** → **Network** tab

- Red = Failed requests (404, 500, etc.)
- Green = Success (200)
- Orange = Pending (wait)

### Check Elements

Press **F12** → **Elements** tab

- Look for `<html class="dark">` when dark mode on
- Verify `<body>` is inside HTML
- Check Sidebar expanded under lg breakpoint

### Check Performance

Press **F12** → **Performance** tab

- Record for 5 seconds while page loads
- Look for long tasks (anything in red)
- Check if charts are slowing things

---

## 🆘 Still Stuck?

### When Reporting Issues, Include:

1. **Error Message** (exact text)
2. **Screenshot** (what you see)
3. **Browser Console** (F12 → Console → copy all)
4. **What You Did** (steps to reproduce)
5. **Expected Result** (what should happen)
6. **Actual Result** (what actually happened)

Example:

```
Error: Cannot read property 'length' of undefined
at DashboardLayout.tsx:23

Browser: Chrome 120
OS: Windows 11
Port: 3002

Steps to reproduce:
1. Start npm run dev
2. Go to localhost:3002
3. Click "Devices" page
4. Error appears

Expected: See list of 45 devices
Actual: Blank page with error
```

---

## 📞 Quick Help Commands

```powershell
# Check if server is running on port 3002
netstat -ano | findstr :3002

# Kill all Node processes
taskkill /IM node.exe /F

# Restart server
npm run dev

# Type check
npx tsc --noEmit

# List installed packages
npm list

# Check specific package
npm list react

# Update all packages
npm update

# Clear npm cache
npm cache clean --force
```

---

## ✅ Everything Working?

Great! You can now:

- ✅ Explore all 7 dashboard pages
- ✅ Filter and search data
- ✅ Toggle dark mode
- ✅ Watch real-time updates
- ✅ Export data as CSV
- ✅ View interactive charts
- ✅ Manage alerts

---

## 🎊 Need More Help?

1. Check **FIXES_APPLIED.md** - What was fixed
2. Check **README.md** - Full documentation
3. Check **TECHNICAL_DOCS.md** - Developer info
4. Check **GETTING_STARTED.md** - Quick start
5. Check **STATUS.md** - Current status

---

**Good luck! 🚀**

CropScan Dashboard is ready to use at: http://localhost:3002
