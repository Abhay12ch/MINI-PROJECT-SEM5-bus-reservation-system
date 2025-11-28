-- Migration Script: Add Operator Fields to Existing Buses Table
-- Run this ONLY if you already have the buses table created
-- This script is safe to run multiple times (uses IF NOT EXISTS)

-- Add new columns to buses table
ALTER TABLE buses 
ADD COLUMN IF NOT EXISTS operator_type VARCHAR(50) DEFAULT 'Government',
ADD COLUMN IF NOT EXISTS operator_name VARCHAR(255) DEFAULT 'UPSRTC';

-- Add check constraint for operator_type (drop old one if exists)
ALTER TABLE buses DROP CONSTRAINT IF EXISTS buses_operator_type_check;
ALTER TABLE buses ADD CONSTRAINT buses_operator_type_check 
CHECK (operator_type IN ('Government', 'Private'));

-- Update bus_type enum to include new types (Volvo, Deluxe)
ALTER TABLE buses DROP CONSTRAINT IF EXISTS buses_bus_type_check;
ALTER TABLE buses ADD CONSTRAINT buses_bus_type_check 
CHECK (bus_type IN ('AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper', 'Volvo', 'Deluxe'));

-- Add additional professional booking features columns
ALTER TABLE buses 
ADD COLUMN IF NOT EXISTS boarding_points TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN IF NOT EXISTS dropping_points TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN IF NOT EXISTS seat_layout VARCHAR(10) DEFAULT '2+2',
ADD COLUMN IF NOT EXISTS live_tracking BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS rating DECIMAL(2, 1) DEFAULT 4.0;

-- Add check constraint for rating
ALTER TABLE buses DROP CONSTRAINT IF EXISTS buses_rating_check;
ALTER TABLE buses ADD CONSTRAINT buses_rating_check 
CHECK (rating >= 0 AND rating <= 5);

-- Add comments
COMMENT ON COLUMN buses.operator_type IS 'Type of operator - Government or Private';
COMMENT ON COLUMN buses.operator_name IS 'Name of the bus operator (UPSRTC, MSRTC, VRL Travels, etc.)';
COMMENT ON COLUMN buses.boarding_points IS 'Array of boarding point locations';
COMMENT ON COLUMN buses.dropping_points IS 'Array of dropping point locations';
COMMENT ON COLUMN buses.seat_layout IS 'Seat configuration (2+1, 2+2, 2+3)';
COMMENT ON COLUMN buses.live_tracking IS 'Whether bus has live GPS tracking';
COMMENT ON COLUMN buses.rating IS 'Bus operator rating out of 5';

-- Verify the changes
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'buses' 
AND column_name IN ('operator_type', 'operator_name', 'boarding_points', 'dropping_points', 'seat_layout', 'live_tracking', 'rating');

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Migration completed successfully! operator_type and operator_name columns added.';
  RAISE NOTICE 'Now you can run seed-buses.sql to add realistic bus data.';
END $$;
