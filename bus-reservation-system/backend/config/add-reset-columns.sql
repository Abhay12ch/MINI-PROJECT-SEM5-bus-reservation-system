-- Add reset code columns to users table
-- Run this in Supabase SQL Editor if the columns don't exist

ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_code VARCHAR(6);
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_code_expiry TIMESTAMP;

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name IN ('reset_code', 'reset_code_expiry');
