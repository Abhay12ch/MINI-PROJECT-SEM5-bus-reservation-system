# Bus Reservation System - Run Guide

This document explains how to set up and run the project locally, and what to change if you use a different PC or directory.

## Prerequisites
- Node.js and npm installed
- Supabase project (URL + anon key)
- Two terminals (backend and frontend)

## 1) Clone or copy the project
If you’re on another PC, place the project in any folder (e.g. D:\Projects\bus-reservation-system). Note the path; you’ll use it in commands below.

## 2) Environment variables (backend/.env)
Create or edit `backend/.env`:
```
SUPABASE_URL=https://<your-project-id>.supabase.co
SUPABASE_ANON_KEY=<your_anon_key>
JWT_SECRET=<generate_a_secret>
```
Tip: Generate a secret
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

If you have a local backup, copy it:
```
# Windows PowerShell
Copy-Item .\backend\.env.backup .\backend\.env
```

## 3) Install dependencies
Open PowerShell and run:

Backend
```
cd "c:\Users\abhay\OneDrive\Desktop\Work\MINI PROJECT SEM5\bus-reservation-system\backend"
npm install
```

Frontend
```
cd "c:\Users\abhay\OneDrive\Desktop\Work\MINI PROJECT SEM5\bus-reservation-system\frontend"
npm install
```

If using another PC or directory, replace the path accordingly. Example:
```
cd "D:\Projects\bus-reservation-system\backend"
npm install
cd "D:\Projects\bus-reservation-system\frontend"
npm install
```

## 4) Database setup (first time only)
In Supabase Dashboard → SQL Editor, run the schema file:
- backend/config/schema.sql
If you need sample data, run:
- backend/config/seed-buses.sql

## 5) Start servers
Backend (Terminal 1):
```
cd "<your-path>\bus-reservation-system\backend"
npm run dev
```

Frontend (Terminal 2):
```
cd "<your-path>\bus-reservation-system\frontend"
npm start
```

Open the app:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 6) Common issues
- Port 5000 in use:
```
Stop-Process -Name node -Force
```
- CORS errors: ensure backend allows http://localhost:3000
- Invalid credentials: reset via forgot-password or ensure hashing in DB
- UUID errors: make sure you pass bus.id (not _id) to booking route

## 7) Using on another PC or directory
- Update all path commands to your new location.
- Ensure `backend/.env` is created with your Supabase URL/Key on that PC.
- If cloning from GitHub, remember `.env` isn’t committed—create it manually using `.env.example`.

## 8) Static preview (optional)
Build frontend:
```
cd "<your-path>\bus-reservation-system\frontend"
npm run build
```
Open:
```
<your-path>\bus-reservation-system\frontend\build\index.html
```
Note: API calls require backend running.

## 9) Welcome page flow
When visiting the site, you’ll first see the Welcome page with options:
- Login / Register
- Continue as Guest (limited features)
