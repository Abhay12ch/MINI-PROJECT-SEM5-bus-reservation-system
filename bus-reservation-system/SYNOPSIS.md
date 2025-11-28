Mini Project Synopsis


Title: BUS RESERVATION SYSTEM

Domain: Web Application (MERN + Supabase)

Course/Branch: B. Tech (CSIT)

Semester/Year: Semester V / Year 3

Academic Year: 2025-26

Submitted by (Team):
• Abhay Choudhary — Roll No.: 2300680110003
• Angel Gupta — Roll No.: 2300680110013
• Arpit Jain — Roll No.: 2300680110023

Institution/Department: MIET, Department of IT

Guide/Supervisor: Asst. Prof.: Mr. Rakesh Sambyal

Date of Submission: ______________________________



Signatures:

Abhay Choudhary        	  Angel Gupta			  Arpit Jain 

   ___________                          ________                         ___________



Guide: _________						 HOD: ___________





Abstract



This project implements a full-featured Bus Reservation System designed for academic and practical use. The application enables users to search buses across 300+ Indian cities, view operator details, check real-time seat availability, select seats interactively, and complete bookings. It supports both government and private operators, provides multiple boarding and dropping points, and offers optional live bus tracking via interactive maps. An admin dashboard allows operators/administrators to manage buses, routes, and bookings.

The system is built using the MERN stack (React, Node.js, Express) with Supabase (PostgreSQL) as the managed database. Security features include JWT-based authentication, encrypted passwords, environment-based configuration, and database Row Level Security (RLS). The application follows a modular architecture with clean separation between frontend, backend APIs, and data storage, making it maintainable and extensible for future enhancements such as payments, notifications, and operator dashboards.




Problem Statement



Traditional bus reservation processes can be fragmented and inefficient—users struggle to discover buses across operators, view accurate availability, and get reliable route information. Operators require tools to manage schedules and bookings effectively. There is a need for a unified, user-friendly platform supporting search, booking, and tracking with a professional UI and secure backend.








Objectives



- Provide a unified web platform to search, filter, and book inter-city buses.
- Support both government and private bus operators with rich metadata.
- Offer interactive seat selection with real-time availability.
- Enable live bus tracking and multiple boarding/dropping points.
- Provide an admin dashboard for complete bus and booking management.
- Ensure data security with JWT, password hashing, RLS, and environment-based secrets.
- Deliver a responsive, accessible, and modern user experience.



Scope



- User authentication and profile management
- Bus search across 300+ cities with advanced filters (operator type, bus type)
- Seat selection (2+1, 2+2, 2+3 layouts) and booking lifecycle
- Operator ratings, amenities, and live tracking badges
- Boarding and dropping point selection
- Admin module for buses and bookings management
- Professional ticket printing and booking history
- Compatible with desktop and mobile devices

Out of scope (current version): online payments, SMS gateways, multi-factor authentication. These are listed under future enhancements.











Proposed System & Features



- Secure authentication (JWT), password hashing (bcrypt)
- Professional bus cards with ratings, amenities, timing, and price
- Real-time seat availability, single-seat identification, “Filling Fast” indicators
- Live tracking integration using Leaflet and OpenStreetMap tiles
- Multi-operator support (government/private) with operator metadata
- Admin dashboard for CRUD operations on buses and supervision of bookings
- Export/print professional tickets and booking summaries



System Architecture (High-Level)



- Frontend: React (React Router, Axios, Bootstrap/React-Bootstrap, Toastify)
- Backend: Node.js + Express REST APIs
- Database: Supabase (PostgreSQL) with RLS and UUID keys
- Auth: JWT-based auth, bcrypt password hashing
- Maps/Tracking: Leaflet + React-Leaflet (OpenStreetMap)
- Deployment (suggested): Frontend (Vercel/Netlify), Backend (Render/Railway/Heroku), DB (Supabase)

Data Flow:
User → React UI → Axios → Express API → Supabase (PostgreSQL)











Module Description



- Authentication Module: Register, Login, Protected routes, Role management (user/admin)
- Bus Search Module: City-based search, date selection, operator/bus-type filters
- Bus Listing Module: Detailed cards with timing, duration, rating, amenities, live status
- Seat Selection & Booking Module: Interactive layout, availability checks, booking creation
- Tracking Module: Live map, location updates (simulated for demo), route visualization
- Admin Module: Add/Edit/Delete buses, view bookings, manage operator details
- Ticketing Module: Generate and print professional e-tickets with journey and passenger details


Database Design (Supabase PostgreSQL)


Tables (key fields only):
- users (id UUID, name, email UNIQUE, password_hash, phone, role [user/admin], created_at)
- buses (id UUID, bus_name, operator_type, operator_name, from_city, to_city,
  departure_time, arrival_time, duration, total_seats, available_seats, fare,
  bus_type [AC/Non-AC/Volvo/Sleeper/Deluxe], amenities TEXT[], boarding_points TEXT[],
  dropping_points TEXT[], seat_layout, live_tracking BOOLEAN, rating DECIMAL(2,1))
- bookings (id UUID, user_id, bus_id, journey_date, seats INT[], total_amount,
  passenger_name, passenger_phone, passenger_email, boarding_point, dropping_point,
  status [confirmed/cancelled], created_at)

Security: Row Level Security (RLS) policies for controlled access (development-friendly by default; hardening recommended for production).

Technology Stack

- Frontend: React 18, React Router, Bootstrap 5/React-Bootstrap, Axios, React Toastify
- Backend: Node.js, Express 4.x, jsonwebtoken, bcryptjs
- Database: Supabase PostgreSQL, @supabase/supabase-js, pg
- Maps: Leaflet 1.9.x, React-Leaflet
- Dev Tools: VS Code, Git/GitHub, npm



Hardware & Software Requirements

- Hardware: Any modern PC/laptop (≥ 8 GB RAM recommended)
- OS: Windows/Linux/macOS
- Software: Node.js (v14+), npm, modern browser (Chrome/Firefox/Edge)
- Accounts/Services: Supabase account (free tier sufficient)



Methodology

- Agile-inspired incremental development with iterative feature additions
- Modular MERN architecture with separated concerns
- RESTful API design and stateless authentication
- Client-side state via React hooks; Axios interceptors for auth headers
- Data seeding for demo via SQL scripts (60+ realistic routes)



Security Measures

- JWT-based authentication (short-lived tokens recommended)
- Password hashing using bcrypt
- Environment variables for secrets; `.env` excluded via `.gitignore`
- Supabase Row Level Security (RLS) policies
- Input validation and basic CORS configuration (production hardening advised)
- Pre-publish checklist and SECURITY.md included in repository





Testing Strategy


- Unit and integration tests for critical flows (auth and booking APIs)
- Manual verification checklists for search, booking, and admin flows
- Edge cases: overlapping bookings, invalid seats, date boundaries, auth failures


Project Plan (Suggested Timeline)


- Week 1: Requirements, architecture, Supabase schema, basic CRUD
- Week 2: Authentication, bus search, cities, filters
- Week 3: Seat selection, booking flow, validation
- Week 4: Tracking, amenities, ratings, ticket printing
- Week 5: Admin dashboard, polish UI/UX, responsive design
- Week 6: Security hardening, docs, testing, final demo



Expected Outcomes & Success Criteria


- Fully functional end-to-end booking flow with seat selection
- Accurate search and filtering across major cities
- Admin control over bus data and bookings
- Secure authentication and data storage
- Professional UI with responsive design and print-ready tickets


Future Enhancements


- Online payments (Razorpay/Stripe) and automatic invoicing
- Email/SMS notifications for bookings and cancellations
- Operator portal and analytics dashboard
- Reviews and ratings per journey/operator
- PWA (offline support), push notifications, multi-language i18n




References


- React: https://react.dev
- Express: https://expressjs.com
- Supabase: https://supabase.com/docs
- Leaflet Maps: https://leafletjs.com & https://react-leaflet.js.org
- Bootstrap: https://getbootstrap.com


How to Run (Summary)


- Refer to `README.md` for complete setup
- Required: Node.js, npm, Supabase project URL and anon key
- Backend: `cd backend && npm install && npm start`
- Frontend: `cd frontend && npm install && npm start`



Conclusion


The Bus Reservation System demonstrates a production-style web application using modern web technologies and a managed database. It addresses key pain points in bus discovery, booking, and tracking while implementing secure, modular, and scalable practices suitable for academic submission and real-world adaptation.
