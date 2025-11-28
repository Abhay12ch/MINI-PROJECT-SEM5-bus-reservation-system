-- Run this in Supabase SQL Editor to see what bus_type values are allowed
SELECT 
    con.conname AS constraint_name,
    pg_get_constraintdef(con.oid) AS constraint_definition
FROM pg_constraint con
JOIN pg_class rel ON rel.oid = con.conrelid
WHERE rel.relname = 'buses' 
  AND con.contype = 'c'
  AND con.conname LIKE '%bus_type%';
