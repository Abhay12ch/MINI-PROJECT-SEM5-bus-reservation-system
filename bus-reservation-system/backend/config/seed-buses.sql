-- Seed Data for Government and Private Bus Operators
-- Run this AFTER running schema.sql in Supabase SQL Editor

-- UPSRTC (Uttar Pradesh State Road Transport Corporation) Buses
INSERT INTO buses (bus_number, bus_name, bus_type, operator_type, operator_name, from_location, to_location, departure_time, arrival_time, duration, total_seats, available_seats, fare, amenities, boarding_points, dropping_points, seat_layout, live_tracking, rating) VALUES
('UP-80-A-1234', 'UPSRTC Express', 'AC', 'Government', 'UPSRTC', 'Delhi', 'Lucknow', '06:00', '12:00', '6h 0m', 40, 40, 650.00, ARRAY['Wi-Fi', 'Charging Point', 'Water Bottle'], ARRAY['Kashmere Gate', 'Anand Vihar', 'Ghaziabad'], ARRAY['Alambagh', 'Charbagh', 'Gomti Nagar'], '2+2', true, 4.2),
('UP-80-B-5678', 'UPSRTC Volvo', 'Volvo', 'Government', 'UPSRTC', 'Lucknow', 'Agra', '08:30', '14:00', '5h 30m', 40, 40, 550.00, ARRAY['AC', 'Comfortable Seats', 'Water Bottle'], ARRAY['Alambagh', 'Charbagh', 'Kaiserbagh'], ARRAY['Agra Cantt', 'Sikandra', 'Taj Mahal'], '2+2', true, 4.5),
('UP-65-C-9012', 'UPSRTC Ordinary', 'Non-AC', 'Government', 'UPSRTC', 'Kanpur', 'Varanasi', '07:00', '13:30', '6h 30m', 45, 45, 350.00, ARRAY['Reading Light'], ARRAY['Kanpur Central', 'Barra', 'Kalyanpur'], ARRAY['Varanasi Cantt', 'Godowlia', 'Bhelupur'], '2+3', false, 3.8),
('UP-32-D-3456', 'UPSRTC Deluxe', 'Deluxe', 'Government', 'UPSRTC', 'Noida', 'Gorakhpur', '22:00', '08:00', '10h 0m', 40, 40, 800.00, ARRAY['Blanket', 'Pillow', 'Charging Point'], ARRAY['Noida Sector 16', 'Greater Noida'], ARRAY['Gorakhpur Station', 'Civil Lines'], '2+1', true, 4.3),
('UP-14-E-7890', 'UPSRTC Super', 'AC', 'Government', 'UPSRTC', 'Agra', 'Jaipur', '09:00', '13:30', '4h 30m', 40, 40, 450.00, ARRAY['Water Bottle', 'AC'], ARRAY['Agra Cantt', 'Sikandra'], ARRAY['Jaipur Sindhi Camp', 'Vaishali Nagar'], '2+2', true, 4.1),

-- MSRTC (Maharashtra State Road Transport Corporation) Buses
('MH-01-F-1111', 'MSRTC Shivneri', 'Volvo', 'Government', 'MSRTC', 'Mumbai', 'Pune', '06:00', '09:30', '3h 30m', 40, 40, 350.00, ARRAY['AC', 'Wi-Fi', 'USB Charging']),
('MH-02-G-2222', 'MSRTC Hirkani', 'AC', 'Government', 'MSRTC', 'Pune', 'Nashik', '07:00', '11:00', '4h 0m', 40, 40, 400.00, ARRAY['Water Bottle', 'Reading Light']),
('MH-03-H-3333', 'MSRTC Express', 'Semi-Sleeper', 'Government', 'MSRTC', 'Mumbai', 'Nagpur', '20:00', '08:00', '12h 0m', 35, 35, 950.00, ARRAY['Blanket', 'Pillow', 'AC']),
('MH-04-I-4444', 'MSRTC Parivartan', 'Deluxe', 'Government', 'MSRTC', 'Thane', 'Aurangabad', '10:00', '17:00', '7h 0m', 40, 40, 650.00, ARRAY['Comfortable Seats', 'Water Bottle']),
('MH-05-J-5555', 'MSRTC Sheetal', 'AC', 'Government', 'MSRTC', 'Mumbai', 'Kolhapur', '21:00', '07:00', '10h 0m', 40, 40, 850.00, ARRAY['AC', 'Charging Point', 'Blanket']),

-- KSRTC (Karnataka State Road Transport Corporation) Buses
('KA-01-K-6666', 'KSRTC Airavat', 'Volvo', 'Government', 'KSRTC', 'Bangalore', 'Mysore', '06:30', '10:00', '3h 30m', 40, 40, 400.00, ARRAY['AC', 'Wi-Fi', 'Water Bottle']),
('KA-02-L-7777', 'KSRTC Rajahamsa', 'AC', 'Government', 'KSRTC', 'Bangalore', 'Mangalore', '22:00', '06:00', '8h 0m', 40, 40, 700.00, ARRAY['Semi-Sleeper', 'Blanket', 'Pillow']),
('KA-03-M-8888', 'KSRTC Express', 'Non-AC', 'Government', 'KSRTC', 'Mysore', 'Hubli', '08:00', '16:00', '8h 0m', 45, 45, 450.00, ARRAY['Reading Light']),
('KA-04-N-9999', 'KSRTC Flybus', 'Volvo', 'Government', 'KSRTC', 'Bangalore', 'Hyderabad', '21:30', '07:30', '10h 0m', 40, 40, 950.00, ARRAY['AC', 'Wi-Fi', 'USB Charging', 'Blanket']),
('KA-05-O-0000', 'KSRTC Super Deluxe', 'Deluxe', 'Government', 'KSRTC', 'Bangalore', 'Chennai', '22:00', '06:00', '8h 0m', 40, 40, 800.00, ARRAY['AC', 'Charging Point', 'Water Bottle']),

-- APSRTC (Andhra Pradesh State Road Transport Corporation) Buses
('AP-01-P-1234', 'APSRTC Garuda', 'Volvo', 'Government', 'APSRTC', 'Hyderabad', 'Vijayawada', '07:00', '12:00', '5h 0m', 40, 40, 550.00, ARRAY['AC', 'Wi-Fi', 'Charging Point']),
('AP-02-Q-5678', 'APSRTC Indra', 'AC', 'Government', 'APSRTC', 'Vijayawada', 'Visakhapatnam', '20:00', '05:00', '9h 0m', 40, 40, 750.00, ARRAY['Semi-Sleeper', 'Blanket', 'Water Bottle']),
('AP-03-R-9012', 'APSRTC Express', 'Non-AC', 'Government', 'APSRTC', 'Tirupati', 'Hyderabad', '06:00', '12:00', '6h 0m', 45, 45, 400.00, ARRAY['Reading Light']),
('AP-04-S-3456', 'APSRTC Rajdhani', 'Volvo', 'Government', 'APSRTC', 'Hyderabad', 'Bangalore', '22:00', '06:00', '8h 0m', 40, 40, 900.00, ARRAY['AC', 'Wi-Fi', 'USB Charging', 'Blanket']),
('AP-05-T-7890', 'APSRTC Pallevelugu', 'Deluxe', 'Government', 'APSRTC', 'Hyderabad', 'Chennai', '21:00', '07:00', '10h 0m', 40, 40, 950.00, ARRAY['AC', 'Charging Point', 'Pillow']),

-- RSRTC (Rajasthan State Road Transport Corporation) Buses
('RJ-01-U-1111', 'RSRTC Gold Line', 'Volvo', 'Government', 'RSRTC', 'Jaipur', 'Delhi', '06:00', '11:00', '5h 0m', 40, 40, 600.00, ARRAY['AC', 'Wi-Fi', 'Water Bottle']),
('RJ-02-V-2222', 'RSRTC Silver Line', 'AC', 'Government', 'RSRTC', 'Jaipur', 'Udaipur', '08:00', '14:00', '6h 0m', 40, 40, 550.00, ARRAY['Charging Point', 'Reading Light']),
('RJ-03-W-3333', 'RSRTC Express', 'Non-AC', 'Government', 'RSRTC', 'Jodhpur', 'Jaisalmer', '07:00', '14:00', '7h 0m', 45, 45, 350.00, ARRAY['Water Bottle']),
('RJ-04-X-4444', 'RSRTC Deluxe', 'Deluxe', 'Government', 'RSRTC', 'Jaipur', 'Ahmedabad', '22:00', '06:00', '8h 0m', 40, 40, 750.00, ARRAY['AC', 'Blanket', 'Pillow']),
('RJ-05-Y-5555', 'RSRTC Super', 'AC', 'Government', 'RSRTC', 'Bikaner', 'Jaipur', '09:00', '15:00', '6h 0m', 40, 40, 500.00, ARRAY['Water Bottle', 'Charging Point']),

-- Kerala KSRTC (Kerala State Road Transport Corporation) Buses
('KL-01-Z-6666', 'Kerala KSRTC Super Fast', 'Volvo', 'Government', 'Kerala KSRTC', 'Thiruvananthapuram', 'Kochi', '06:00', '10:00', '4h 0m', 40, 40, 450.00, ARRAY['AC', 'Wi-Fi', 'USB Charging']),
('KL-02-A-7777', 'Kerala KSRTC Express', 'AC', 'Government', 'Kerala KSRTC', 'Kochi', 'Kozhikode', '07:30', '12:30', '5h 0m', 40, 40, 500.00, ARRAY['Water Bottle', 'Reading Light']),
('KL-03-B-8888', 'Kerala KSRTC Garuda', 'Volvo', 'Government', 'Kerala KSRTC', 'Thiruvananthapuram', 'Bangalore', '20:00', '06:00', '10h 0m', 40, 40, 950.00, ARRAY['AC', 'Wi-Fi', 'Blanket', 'Pillow']),
('KL-04-C-9999', 'Kerala KSRTC Fast', 'Non-AC', 'Government', 'Kerala KSRTC', 'Kannur', 'Thrissur', '08:00', '14:00', '6h 0m', 45, 45, 350.00, ARRAY['Reading Light']),
('KL-05-D-0000', 'Kerala KSRTC Deluxe', 'Deluxe', 'Government', 'Kerala KSRTC', 'Kochi', 'Chennai', '21:00', '07:00', '10h 0m', 40, 40, 900.00, ARRAY['AC', 'Charging Point', 'Water Bottle']),

-- GSRTC (Gujarat State Road Transport Corporation) Buses
('GJ-01-E-1234', 'GSRTC Volvo', 'Volvo', 'Government', 'GSRTC', 'Ahmedabad', 'Mumbai', '21:00', '07:00', '10h 0m', 40, 40, 900.00, ARRAY['AC', 'Wi-Fi', 'USB Charging', 'Blanket']),
('GJ-02-F-5678', 'GSRTC Express', 'AC', 'Government', 'GSRTC', 'Surat', 'Pune', '08:00', '15:00', '7h 0m', 40, 40, 650.00, ARRAY['Water Bottle', 'Charging Point']),
('GJ-03-G-9012', 'GSRTC Parivartan', 'Non-AC', 'Government', 'GSRTC', 'Vadodara', 'Rajkot', '07:00', '13:00', '6h 0m', 45, 45, 350.00, ARRAY['Reading Light']),
('GJ-04-H-3456', 'GSRTC Deluxe', 'Deluxe', 'Government', 'GSRTC', 'Ahmedabad', 'Udaipur', '09:00', '16:00', '7h 0m', 40, 40, 700.00, ARRAY['AC', 'Water Bottle', 'Comfortable Seats']),
('GJ-05-I-7890', 'GSRTC Super', 'AC', 'Government', 'GSRTC', 'Ahmedabad', 'Jaipur', '22:00', '07:00', '9h 0m', 40, 40, 850.00, ARRAY['AC', 'Blanket', 'Pillow', 'Charging Point']),

-- TSRTC (Telangana State Road Transport Corporation) Buses
('TS-01-J-1111', 'TSRTC Garuda Plus', 'Volvo', 'Government', 'TSRTC', 'Hyderabad', 'Warangal', '06:00', '09:30', '3h 30m', 40, 40, 350.00, ARRAY['AC', 'Wi-Fi', 'Water Bottle']),
('TS-02-K-2222', 'TSRTC Rajdhani', 'AC', 'Government', 'TSRTC', 'Hyderabad', 'Karimnagar', '08:00', '12:00', '4h 0m', 40, 40, 400.00, ARRAY['Charging Point', 'Reading Light']),
('TS-03-L-3333', 'TSRTC Express', 'Non-AC', 'Government', 'TSRTC', 'Warangal', 'Khammam', '07:30', '11:30', '4h 0m', 45, 45, 250.00, ARRAY['Water Bottle']),
('TS-04-M-4444', 'TSRTC Super Luxury', 'Volvo', 'Government', 'TSRTC', 'Hyderabad', 'Vijayawada', '22:00', '04:00', '6h 0m', 40, 40, 700.00, ARRAY['AC', 'Wi-Fi', 'Blanket', 'USB Charging']),
('TS-05-N-5555', 'TSRTC Pallevelugu', 'Deluxe', 'Government', 'TSRTC', 'Hyderabad', 'Nizamabad', '09:00', '13:00', '4h 0m', 40, 40, 450.00, ARRAY['AC', 'Water Bottle', 'Comfortable Seats']),

-- Private Bus Operators
('PVT-01-O-6666', 'VRL Travels', 'Volvo', 'Private', 'VRL Travels', 'Bangalore', 'Mumbai', '18:00', '06:00', '12h 0m', 40, 40, 1200.00, ARRAY['AC', 'Wi-Fi', 'USB Charging', 'Blanket', 'Pillow', 'Entertainment']),
('PVT-02-P-7777', 'SRS Travels', 'Sleeper', 'Private', 'SRS Travels', 'Bangalore', 'Hyderabad', '21:00', '06:00', '9h 0m', 35, 35, 950.00, ARRAY['AC', 'Blanket', 'Pillow', 'Reading Light']),
('PVT-03-Q-8888', 'Orange Travels', 'Volvo', 'Private', 'Orange Travels', 'Chennai', 'Bangalore', '22:00', '06:00', '8h 0m', 40, 40, 850.00, ARRAY['AC', 'Wi-Fi', 'USB Charging', 'Water Bottle']),
('PVT-04-R-9999', 'Kaveri Travels', 'AC', 'Private', 'Kaveri Travels', 'Pune', 'Goa', '20:00', '08:00', '12h 0m', 40, 40, 1000.00, ARRAY['AC', 'Charging Point', 'Blanket', 'Entertainment']),
('PVT-05-S-0000', 'Paulo Travels', 'Sleeper', 'Private', 'Paulo Travels', 'Mumbai', 'Goa', '21:00', '07:00', '10h 0m', 35, 35, 950.00, ARRAY['AC', 'Blanket', 'Pillow', 'Water Bottle']),
('PVT-06-T-1234', 'National Travels', 'Volvo', 'Private', 'National Travels', 'Delhi', 'Chandigarh', '06:00', '11:00', '5h 0m', 40, 40, 650.00, ARRAY['AC', 'Wi-Fi', 'USB Charging']),
('PVT-07-U-5678', 'Sharma Travels', 'Deluxe', 'Private', 'Sharma Travels', 'Jaipur', 'Delhi', '07:00', '12:00', '5h 0m', 40, 40, 600.00, ARRAY['AC', 'Water Bottle', 'Charging Point']),
('PVT-08-V-9012', 'Express Travels', 'AC', 'Private', 'Express Travels', 'Kolkata', 'Patna', '20:00', '06:00', '10h 0m', 40, 40, 850.00, ARRAY['AC', 'Blanket', 'Pillow', 'Water Bottle']),
('PVT-09-W-3456', 'IntrCity SmartBus', 'Volvo', 'Private', 'IntrCity', 'Lucknow', 'Delhi', '22:00', '06:00', '8h 0m', 40, 40, 900.00, ARRAY['AC', 'Wi-Fi', 'USB Charging', 'Entertainment']),
('PVT-10-X-7890', 'Patel Travels', 'Sleeper', 'Private', 'Patel Travels', 'Ahmedabad', 'Surat', '22:00', '04:00', '6h 0m', 35, 35, 550.00, ARRAY['AC', 'Blanket', 'Pillow']);

-- Additional comments
COMMENT ON COLUMN buses.operator_type IS 'Type of operator - Government or Private';
COMMENT ON COLUMN buses.operator_name IS 'Name of the bus operator (UPSRTC, MSRTC, VRL Travels, etc.)';
