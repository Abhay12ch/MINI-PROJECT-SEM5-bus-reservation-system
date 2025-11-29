-- Add Reviews Table to Bus Reservation System
-- Run this SQL in your Supabase SQL Editor

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bus_id UUID NOT NULL REFERENCES buses(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    cleanliness_rating INTEGER CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
    punctuality_rating INTEGER CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
    staff_behavior_rating INTEGER CHECK (staff_behavior_rating >= 1 AND staff_behavior_rating <= 5),
    comfort_rating INTEGER CHECK (comfort_rating >= 1 AND comfort_rating <= 5),
    is_verified BOOLEAN DEFAULT true,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(booking_id)  -- One review per booking
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reviews_bus ON reviews(bus_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Reviews
CREATE POLICY "Enable read access for all users" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON reviews
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own reviews" ON reviews
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete own reviews" ON reviews
    FOR DELETE USING (true);

-- Function to update bus rating based on reviews
CREATE OR REPLACE FUNCTION update_bus_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE buses
    SET rating = (
        SELECT ROUND(AVG(rating)::numeric, 1)
        FROM reviews
        WHERE bus_id = NEW.bus_id
    )
    WHERE id = NEW.bus_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update bus rating after review insert/update/delete
DROP TRIGGER IF EXISTS trigger_update_bus_rating_insert ON reviews;
CREATE TRIGGER trigger_update_bus_rating_insert
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_bus_rating();

DROP TRIGGER IF EXISTS trigger_update_bus_rating_update ON reviews;
CREATE TRIGGER trigger_update_bus_rating_update
AFTER UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_bus_rating();

DROP TRIGGER IF EXISTS trigger_update_bus_rating_delete ON reviews;
CREATE TRIGGER trigger_update_bus_rating_delete
AFTER DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_bus_rating();

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on review update
DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
