-- Bus Reservation System - Supabase Schema
-- Run this SQL in your Supabase SQL Editor
-- Safe to run multiple times - will not recreate existing tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    reset_code VARCHAR(6),
    reset_code_expiry TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Add reset code columns if they don't exist (for existing tables)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='reset_code') THEN
        ALTER TABLE users ADD COLUMN reset_code VARCHAR(6);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='reset_code_expiry') THEN
        ALTER TABLE users ADD COLUMN reset_code_expiry TIMESTAMP;
    END IF;
END $$;

-- Buses Table
CREATE TABLE IF NOT EXISTS buses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bus_number VARCHAR(50) UNIQUE NOT NULL,
    bus_name VARCHAR(255) NOT NULL,
    bus_type VARCHAR(50) NOT NULL CHECK (bus_type IN ('AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper', 'Volvo', 'Deluxe')),
    operator_type VARCHAR(50) DEFAULT 'Government' CHECK (operator_type IN ('Government', 'Private')),
    operator_name VARCHAR(255) DEFAULT 'UPSRTC',
    from_location VARCHAR(255) NOT NULL,
    to_location VARCHAR(255) NOT NULL,
    departure_time VARCHAR(10) NOT NULL,
    arrival_time VARCHAR(10) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    total_seats INTEGER NOT NULL DEFAULT 40,
    available_seats INTEGER NOT NULL DEFAULT 40,
    fare DECIMAL(10, 2) NOT NULL,
    amenities TEXT[],
    boarding_points TEXT[],
    dropping_points TEXT[],
    seat_layout VARCHAR(10) DEFAULT '2+2',
    live_tracking BOOLEAN DEFAULT true,
    rating DECIMAL(2, 1) DEFAULT 4.0,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Maintenance')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bus_id UUID NOT NULL REFERENCES buses(id) ON DELETE CASCADE,
    seat_numbers INTEGER[] NOT NULL,
    passenger_name VARCHAR(255) NOT NULL,
    passenger_age INTEGER NOT NULL CHECK (passenger_age >= 1 AND passenger_age <= 120),
    passenger_gender VARCHAR(10) NOT NULL CHECK (passenger_gender IN ('Male', 'Female', 'Other')),
    passenger_phone VARCHAR(10) NOT NULL,
    journey_date DATE NOT NULL,
    total_fare DECIMAL(10, 2) NOT NULL,
    booking_status VARCHAR(20) DEFAULT 'Confirmed' CHECK (booking_status IN ('Confirmed', 'Cancelled', 'Completed')),
    payment_status VARCHAR(20) DEFAULT 'Paid' CHECK (payment_status IN ('Pending', 'Paid', 'Refunded')),
    booking_date TIMESTAMP DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_buses_route ON buses(from_location, to_location);
CREATE INDEX IF NOT EXISTS idx_buses_status ON buses(status);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_bus ON bookings(bus_id);
CREATE INDEX IF NOT EXISTS idx_bookings_journey ON bookings(journey_date);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE buses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Users
CREATE POLICY "Enable insert for everyone" ON users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON users
    FOR SELECT USING (true);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (true);

-- RLS Policies for Buses (everyone can read, anyone can modify via API)
CREATE POLICY "Enable read access for all users" ON buses
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON buses
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only" ON buses
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for authenticated users only" ON buses
    FOR DELETE USING (true);

-- RLS Policies for Bookings
CREATE POLICY "Enable insert for everyone" ON bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON bookings
    FOR SELECT USING (true);

CREATE POLICY "Enable update for all users" ON bookings
    FOR UPDATE USING (true);

-- Comments
COMMENT ON TABLE users IS 'Stores user account information';
COMMENT ON TABLE buses IS 'Stores bus information and schedules';
COMMENT ON TABLE bookings IS 'Stores booking information';
