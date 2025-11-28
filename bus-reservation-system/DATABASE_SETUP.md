# Quick Setup Guide for Database

## ⚠️ Important: Run Schema First

Your Supabase database needs the proper schema before adding bus data.

### Steps:

1. **Open Supabase**: https://supabase.com/dashboard/project/fdarmdgsxskdwmemmxmj

2. **Go to SQL Editor** (in left sidebar)

3. **Copy this file**: `backend/config/schema.sql`

4. **Paste and Run** the SQL in Supabase SQL Editor

5. **Then run**: `node backend/seed-database.js`

### After Schema is Applied:

The seed script will add **50 realistic bus routes** including:
- **UPSRTC** (Uttar Pradesh) buses
- **MSRTC** (Maharashtra) buses  
- **KSRTC** (Karnataka) buses
- **APSRTC/TSRTC** (Andhra Pradesh/Telangana) buses
- **Kerala KSRTC** buses
- **GSRTC** (Gujarat) buses
- **RSRTC** (Rajasthan) buses
- **Popular private operators** (VRL, SRS, Orange, IntrCity, etc.)

### Popular Routes:
- Delhi ↔ Lucknow, Jaipur, Chandigarh
- Mumbai ↔ Pune, Goa, Kolhapur
- Bangalore ↔ Mysore, Chennai, Hyderabad, Mumbai
- Hyderabad ↔ Vijayawada, Bangalore, Chennai
- Jaipur ↔ Delhi, Udaipur, Ahmedabad
- And many more!

All buses have realistic:
- Departure/arrival times
- Journey durations
- Fares (₹250-₹1200)
- Seat capacities (35-45 seats)
- Multiple bus types (AC, Volvo, Sleeper, Deluxe, Semi-Sleeper, Non-AC)
