# 🚌 Bus Reservation System

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![Supabase](https://img.shields.io/badge/Database-Supabase-orange?logo=supabase)
![License](https://img.shields.io/badge/License-MIT-yellow)

A professional, full-featured bus reservation system built with the MERN stack and Supabase. This system supports multiple government and private bus operators across 300+ Indian cities.

[Features](#-features) • [Demo](#-screenshots) • [Installation](#-installation) • [API Documentation](#-api-endpoints) • [Tech Stack](#-tech-stack)

</div>

---


---

## 🎯 Overview

A comprehensive bus booking platform designed for college projects, featuring real-time bus tracking, multi-operator support, interactive seat selection, and professional booking management. The system handles both government operators (UPSRTC, MSRTC, KSRTC) and private operators (VRL, SRS, Orange Travels).

## ✨ Features

### 🔐 Authentication & User Management
- Secure user registration and login with JWT authentication
- Password encryption using bcrypt
- Protected routes and role-based access control
- Persistent user sessions with localStorage

### 🔍 Advanced Bus Search
- Search across **300+ Indian cities** (all states covered)
- Filter by operator type (Government/Private)
- Filter by bus type (AC, Non-AC, Volvo, Sleeper, Deluxe)
- Real-time seat availability display
- Date-based search with calendar picker

### 🪑 Interactive Seat Booking
- Visual seat layout (2+1, 2+2, 2+3 configurations)
- Real-time seat availability updates
- Prevent double booking conflicts
- "Filling Fast" indicators for limited seats
- Multiple seat selection support

### 🚍 Multi-Operator Support
**Government Operators:**
- UPSRTC (Uttar Pradesh)
- MSRTC (Maharashtra)
- KSRTC (Karnataka)
- Kerala KSRTC
- APSRTC (Andhra Pradesh)
- TSRTC (Telangana)
- RSRTC (Rajasthan)
- GSRTC (Gujarat)

**Private Operators:**
- VRL Travels
- SRS Travels
- Orange Travels
- Kaveri Travels
- IntrCity SmartBus
- Paulo Travels
- National Travels
- And more...

### 🗺️ Real-Time Tracking Features
- Live GPS tracking on interactive maps (Leaflet.js)
- Automatic user location detection
- Multiple boarding and dropping points
- Route visualization with OpenStreetMap
- Simulated real-time location updates

### 🎫 Booking Management
- View all bookings with detailed information
- Print professional e-tickets
- Booking cancellation with refund policy
- Booking history tracking
- Passenger details management

### ⭐ Professional UI Features
- Operator ratings (star-based system)
- Live tracking badges with pulse animations
- Amenities display (Wi-Fi, Charging, Water, Blanket, AC)
- Professional card layouts with hover effects
- "Filling Fast" badges for popular routes
- Boarding/Dropping points with tooltips

### 👨‍💼 Admin Dashboard
- Complete bus management (CRUD operations)
- Add/Edit/Delete buses
- Manage operators and routes
- View all bookings
- Operator-specific controls

### 🛡️ Safety & Security Features
- COVID-19 safety guidelines
- 24×7 helpline information
- Security notices and alerts
- Safety protocols display
- Emergency contact information

### 📱 Additional Features
- Fully responsive design (mobile, tablet, desktop)
- Popular routes section
- Quick action cards (Book, Cancel, Reprint, Track)
- Professional footer with contact info
- Toast notifications for user feedback
- Loading states and error handling

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.2.0
- **Routing:** React Router DOM 6.x
- **UI Library:** Bootstrap 5, React-Bootstrap
- **HTTP Client:** Axios
- **Maps:** Leaflet, React-Leaflet
- **Notifications:** React Toastify
- **Styling:** Custom CSS with modern animations

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 4.18.2
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Database Client:** @supabase/supabase-js
- **PostgreSQL Driver:** pg (for Supabase)

### Database
- **Platform:** Supabase (PostgreSQL)
- **Features:** Row Level Security (RLS), UUID primary keys
- **Storage:** Cloud-hosted with automatic backups

## 🚀 Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **Supabase Account** (free tier available)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/bus-reservation-system.git
cd bus-reservation-system
```

### 2️⃣ Supabase Setup

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** and run the schema:

```sql
-- Run: backend/config/schema.sql
-- This creates users, buses, and bookings tables
```

4. (Optional) Load sample data:

```sql
-- Run: backend/config/seed-buses.sql
-- This adds 60+ realistic bus routes
```

5. Get your credentials from **Project Settings** → **API**:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

### 3️⃣ Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the `backend` folder:
```bash
# Copy the example file
cp .env.example .env

# Or on Windows
copy .env.example .env
```

Then edit `.env` with your actual credentials:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here_min_32_characters_required
JWT_EXPIRE=7d
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

> ⚠️ **Critical:** 
> - Never commit the `.env` file to GitHub
> - The `.env` file is already added to `.gitignore`
> - Generate strong JWT secret using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

4. Start the backend server:
```bash
npm start
```

✅ Backend will run on `http://localhost:5000`

### 4️⃣ Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Update API URL in `src/utils/api.js` if needed:
```javascript
const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});
```

4. Start the React app:
```bash
npm start
```

✅ Frontend will run on `http://localhost:3000`

### 5️⃣ Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

### 🎬 Quick Start

1. **Register** a new account
2. **Search** for buses (e.g., Delhi → Mumbai)
3. **Select seats** and complete booking
4. **View bookings** in "My Bookings"
5. **Track bus** in real-time (if live tracking enabled)

## 📡 API Endpoints

### 🔐 Authentication Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| GET | `/api/auth/me` | Get current user profile | Protected |

**Request Body (Register):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 🚍 Bus Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/buses` | Get all buses | Public |
| GET | `/api/buses/search?from=X&to=Y&date=Z` | Search buses by route | Public |
| GET | `/api/buses/:id` | Get single bus details | Public |
| POST | `/api/buses` | Create new bus | Admin |
| PUT | `/api/buses/:id` | Update bus | Admin |
| DELETE | `/api/buses/:id` | Delete bus | Admin |

**Search Example:**
```
GET /api/buses/search?from=Delhi&to=Mumbai&date=2025-11-10
```

**Response:**
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "id": "uuid",
      "busName": "VRL Travels",
      "operatorType": "Private",
      "operatorName": "VRL Travels",
      "from": "Delhi",
      "to": "Mumbai",
      "departure": "22:00",
      "arrival": "12:00",
      "duration": "14h 0m",
      "fare": 1200.00,
      "totalSeats": 40,
      "availableSeats": 28,
      "busType": "AC",
      "amenities": ["Wi-Fi", "Charging Point", "Water Bottle"],
      "boardingPoints": ["Kashmere Gate", "Majnu Ka Tilla"],
      "droppingPoints": ["Dadar", "Andheri"],
      "seatLayout": "2+2",
      "liveTracking": true,
      "rating": 4.5
    }
  ]
}
```

### 🎫 Booking Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/bookings` | Create new booking | Protected |
| GET | `/api/bookings` | Get all bookings | Admin |
| GET | `/api/bookings/my-bookings` | Get user's bookings | Protected |
| GET | `/api/bookings/:id` | Get booking details | Protected |
| PUT | `/api/bookings/:id/cancel` | Cancel booking | Protected |
| GET | `/api/bookings/booked-seats/:busId?date=X` | Get booked seats for bus | Public |

**Create Booking Request:**
```json
{
  "busId": "uuid",
  "seats": [12, 13],
  "totalAmount": 1400,
  "journeyDate": "2025-11-10",
  "passengerName": "John Doe",
  "passengerPhone": "9876543210",
  "passengerEmail": "john@example.com",
  "boardingPoint": "Kashmere Gate",
  "droppingPoint": "Dadar"
}
```

## 👨‍💼 Admin Access

To create an admin account, register a user and update their role in Supabase:

1. Go to **Supabase Dashboard** → **Table Editor** → **users**
2. Find your user account
3. Update the `role` column from `user` to `admin`
4. Save changes
5. Re-login to apply admin privileges

**Or use SQL Editor:**
```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'admin@example.com';
```

## 📁 Project Structure

```
bus-reservation-system/
├── 📂 backend/
│   ├── 📂 config/
│   │   ├── db.js                          # Database connection (deprecated)
│   │   ├── supabase.js                    # Supabase client setup
│   │   ├── schema.sql                     # Database schema
│   │   ├── seed-buses.sql                 # Sample bus data (60+ routes)
│   │   └── migration-add-operators.sql    # Migration script
│   ├── 📂 controllers/
│   │   ├── authController.js              # Authentication logic
│   │   ├── busController.js               # Bus CRUD operations
│   │   └── bookingController.js           # Booking management
│   ├── 📂 middleware/
│   │   └── auth.js                        # JWT authentication middleware
│   ├── 📂 models/
│   │   ├── User.js                        # User model (Mongoose - deprecated)
│   │   ├── UserSupabase.js                # User model (Supabase)
│   │   ├── Bus.js                         # Bus model (Mongoose - deprecated)
│   │   ├── BusSupabase.js                 # Bus model (Supabase)
│   │   ├── Booking.js                     # Booking model (Mongoose - deprecated)
│   │   └── BookingSupabase.js             # Booking model (Supabase)
│   ├── 📂 routes/
│   │   ├── authRoutes.js                  # Authentication routes
│   │   ├── busRoutes.js                   # Bus routes
│   │   └── bookingRoutes.js               # Booking routes
│   ├── .env                               # Environment variables
│   ├── server.js                          # Express server entry point
│   └── package.json                       # Backend dependencies
│
├── 📂 frontend/
│   ├── 📂 public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── Navbar.jsx                 # Navigation bar
│   │   │   ├── Footer.jsx                 # Professional footer
│   │   │   ├── PrivateRoute.jsx           # Protected route wrapper
│   │   │   └── SeatLayout.jsx             # Interactive seat selection
│   │   ├── 📂 pages/
│   │   │   ├── Home.jsx                   # Landing page with features
│   │   │   ├── Login.jsx                  # User login
│   │   │   ├── Register.jsx               # User registration
│   │   │   ├── BusSearch.jsx              # Search & filter buses
│   │   │   ├── BusDetails.jsx             # Bus details page
│   │   │   ├── BookingPage.jsx            # Seat selection & booking
│   │   │   ├── MyBookings.jsx             # User booking history
│   │   │   ├── BusTracking.jsx            # Real-time GPS tracking
│   │   │   └── AdminDashboard.jsx         # Admin panel
│   │   ├── 📂 utils/
│   │   │   └── api.js                     # Axios instance & interceptors
│   │   ├── App.js                         # Main app component
│   │   ├── App.css                        # Global styles
│   │   └── index.js                       # React entry point
│   └── package.json                       # Frontend dependencies
│
├── 📄 README.md                            # This file
├── 📄 INTEGRATION_GUIDE.md                 # Detailed setup guide
├── 📄 IMPLEMENTATION_SUMMARY.md            # Feature summary
├── 📄 PROFESSIONAL_FEATURES.md             # Advanced features guide
└── 📄 SUPABASE_SETUP.md                    # Supabase configuration
```

## 📸 Screenshots

### Home Page
- Professional landing page with safety guidelines
- Popular routes section
- Quick action cards (Book, Cancel, Track)
- 24×7 helpline information

### Bus Search
- 300+ Indian cities dropdown
- Advanced filters (operator type, bus type)
- Professional card layouts
- Live tracking indicators
- Operator ratings and amenities

### Seat Selection
- Interactive visual seat map
- Real-time availability
- Multiple seat selection
- Conflict prevention

### Admin Dashboard
- Complete bus management
- Add/Edit/Delete operations
- Multi-operator support

## ✅ Features Implementation Status

| Feature | Status | Description |
|---------|--------|-------------|
| User Authentication | ✅ Complete | JWT-based secure auth |
| Bus Search & Filter | ✅ Complete | 300+ cities, multiple filters |
| Seat Selection | ✅ Complete | Interactive visual layout |
| Booking System | ✅ Complete | Full booking lifecycle |
| Multi-Operator | ✅ Complete | 8 govt + 10+ private operators |
| Real-time Tracking | ✅ Complete | GPS with Leaflet maps |
| Admin Dashboard | ✅ Complete | Full CRUD operations |
| Ticket Printing | ✅ Complete | Professional e-tickets |
| Mobile Responsive | ✅ Complete | All screen sizes |
| Rating System | ✅ Complete | Operator ratings |
| Boarding Points | ✅ Complete | Multiple pickup locations |
| Live Tracking Badge | ✅ Complete | Animated indicators |
| Safety Guidelines | ✅ Complete | COVID-19 protocols |
| Professional UI | ✅ Complete | Modern design with animations |

## 🔮 Future Enhancements

- [ ] Payment Gateway Integration (Razorpay/Stripe)
- [ ] Email/SMS Notifications (Twilio, SendGrid)
- [ ] User Reviews & Ratings System
- [ ] Bus Operator Dashboard
- [ ] Ticket PDF Download (jsPDF)
- [ ] Multi-language Support (i18n)
- [ ] Loyalty Points & Offers
- [ ] Cancellation Refund Automation
- [ ] Advanced Analytics Dashboard
- [ ] Progressive Web App (PWA)
- [ ] Push Notifications
- [ ] QR Code Ticket Verification

## 🔒 Security & Privacy

### Environment Variables Protection
**NEVER commit these files to GitHub:**
- `.env` files (backend and frontend)
- `node_modules/` directories
- Database credentials
- API keys and secrets

### Recommended `.gitignore` Configuration
```gitignore
# Environment Variables
.env
.env.local
.env.production
*.env

# Dependencies
node_modules/
package-lock.json
yarn.lock

# Production Build
build/
dist/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS Files
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
```

### Security Best Practices
1. **Change Default Credentials:** Always use strong, unique passwords
2. **JWT Secret:** Use a strong random string (min 32 characters)
3. **Database Access:** Enable Row Level Security (RLS) in Supabase
4. **API Keys:** Never expose API keys in frontend code
5. **HTTPS Only:** Use HTTPS in production
6. **Input Validation:** Always validate and sanitize user inputs
7. **Rate Limiting:** Implement rate limiting on API endpoints
8. **CORS:** Configure proper CORS policies

### What to Hide Before Publishing
- [ ] Remove or replace actual database URLs
- [ ] Replace real API keys with placeholders
- [ ] Remove personal email addresses
- [ ] Hide production server details
- [ ] Replace actual Supabase project URLs
- [ ] Remove any test user credentials
- [ ] Use `.env.example` instead of actual `.env` files
- [ ] Sanitize all configuration files

### 📖 Full Security Guidelines
For comprehensive security guidelines, see [SECURITY.md](SECURITY.md)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Note:** Ensure no sensitive information is included in your pull request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the excellent PostgreSQL backend
- **Leaflet.js** for mapping functionality
- **OpenStreetMap** for map tiles
- **React Bootstrap** for UI components
- All government and private bus operators for inspiration

## 📧 Contact & Support

- **Project Link:** [GitHub Repository URL]
- **Issues:** [Report Issues Here]
- **Email:** [Your Contact Email]

> 📝 **Note:** Replace the placeholders above with your actual contact information

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐️ on GitHub!

---

<div align="center">

**Made with ❤️ by Abhay for College Mini Project 2025**

![MERN Stack](https://img.shields.io/badge/MERN-Stack-success)
![Supabase](https://img.shields.io/badge/Powered%20by-Supabase-orange)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

</div>
```
