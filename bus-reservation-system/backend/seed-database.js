// Seed database with 50 realistic Indian bus routes
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const buses = [
  // Major North India Routes - Using EXACT schema column names
  { bus_number: 'UP-80-A-1234', bus_name: 'UPSRTC Express', bus_type: 'AC', from_location: 'Delhi', to_location: 'Lucknow', departure_time: '06:00', arrival_time: '12:00', duration: '6h 0m', total_seats: 40, available_seats: 40, fare: 650.00 },
  { bus_number: 'RJ-01-U-1111', bus_name: 'RSRTC Gold Line', bus_type: 'AC', from_location: 'Jaipur', to_location: 'Delhi', departure_time: '06:00', arrival_time: '11:00', duration: '5h 0m', total_seats: 40, available_seats: 40, fare: 600.00, amenities: ['AC', 'Wi-Fi', 'Water Bottle'] },
  { bus_number: 'PVT-06-T-1234', bus_name: 'National Travels', bus_type: 'AC', from_location: 'Delhi', to_location: 'Chandigarh', departure_time: '06:00', arrival_time: '11:00', duration: '5h 0m', total_seats: 40, available_seats: 40, fare: 650.00, amenities: ['AC', 'Wi-Fi', 'USB Charging'] },
  { bus_number: 'UP-14-E-7890', bus_name: 'UPSRTC Super', bus_type: 'AC', from_location: 'Agra', to_location: 'Jaipur', departure_time: '09:00', arrival_time: '13:30', duration: '4h 30m', total_seats: 40, available_seats: 40, fare: 450.00, amenities: ['Water Bottle', 'AC'] },
  { bus_number: 'PVT-09-W-3456', bus_name: 'IntrCity SmartBus', bus_type: 'AC', from_location: 'Lucknow', to_location: 'Delhi', departure_time: '22:00', arrival_time: '06:00', duration: '8h 0m', total_seats: 40, available_seats: 40, fare: 900.00, amenities: ['AC', 'Wi-Fi', 'USB Charging', 'Entertainment'] },
  
  // Maharashtra Routes
  { bus_number: 'MH-01-F-1111', bus_name: 'MSRTC Shivneri', bus_type: 'AC', from_location: 'Mumbai', to_location: 'Pune', departure_time: '06:00', arrival_time: '09:30', duration: '3h 30m', total_seats: 40, available_seats: 40, fare: 350.00, amenities: ['AC', 'Wi-Fi', 'USB Charging'] },
  { bus_number: 'MH-03-H-3333', bus_name: 'MSRTC Express', bus_type: 'Semi-Sleeper', from_location: 'Mumbai', to_location: 'Nagpur', departure_time: '20:00', arrival_time: '08:00', duration: '12h 0m', total_seats: 35, available_seats: 35, fare: 950.00, amenities: ['Blanket', 'Pillow', 'AC'] },
  { bus_number: 'MH-05-J-5555', bus_name: 'MSRTC Sheetal', bus_type: 'AC', from_location: 'Mumbai', to_location: 'Kolhapur', departure_time: '21:00', arrival_time: '07:00', duration: '10h 0m', total_seats: 40, available_seats: 40, fare: 850.00, amenities: ['AC', 'Charging Point', 'Blanket'] },
  { bus_number: 'PVT-04-R-9999', bus_name: 'Kaveri Travels', bus_type: 'AC', from_location: 'Pune', to_location: 'Goa', departure_time: '20:00', arrival_time: '08:00', duration: '12h 0m', total_seats: 40, available_seats: 40, fare: 1000.00, amenities: ['AC', 'Charging Point', 'Blanket', 'Entertainment'] },
  { bus_number: 'PVT-05-S-0000', bus_name: 'Paulo Travels', bus_type: 'Sleeper', from_location: 'Mumbai', to_location: 'Goa', departure_time: '21:00', arrival_time: '07:00', duration: '10h 0m', total_seats: 35, available_seats: 35, fare: 950.00, amenities: ['AC', 'Blanket', 'Pillow', 'Water Bottle'] },
  
  // Karnataka Routes
  { bus_number: 'KA-01-K-6666', bus_name: 'KSRTC Airavat', bus_type: 'AC', from_location: 'Bangalore', to_location: 'Mysore', departure_time: '06:30', arrival_time: '10:00', duration: '3h 30m', total_seats: 40, available_seats: 40, fare: 400.00, amenities: ['AC', 'Wi-Fi', 'Water Bottle'] },
  { bus_number: 'KA-02-L-7777', bus_name: 'KSRTC Rajahamsa', bus_type: 'AC', from_location: 'Bangalore', to_location: 'Mangalore', departure_time: '22:00', arrival_time: '06:00', duration: '8h 0m', total_seats: 40, available_seats: 40, fare: 700.00, amenities: ['Semi-Sleeper', 'Blanket', 'Pillow'] },
  { bus_number: 'KA-04-N-9999', bus_name: 'KSRTC Flybus', bus_type: 'AC', from_location: 'Bangalore', to_location: 'Hyderabad', departure_time: '21:30', arrival_time: '07:30', duration: '10h 0m', total_seats: 40, available_seats: 40, fare: 950.00, amenities: ['AC', 'Wi-Fi', 'USB Charging', 'Blanket'] },
  { bus_number: 'KA-05-O-0000', bus_name: 'KSRTC Super Deluxe', bus_type: 'Semi-Sleeper', from_location: 'Bangalore', to_location: 'Chennai', departure_time: '22:00', arrival_time: '06:00', duration: '8h 0m', total_seats: 40, available_seats: 40, fare: 800.00, amenities: ['AC', 'Charging Point', 'Water Bottle'] },
  { bus_number: 'PVT-01-O-6666', bus_name: 'VRL Travels', bus_type: 'AC', from_location: 'Bangalore', to_location: 'Mumbai', departure_time: '18:00', arrival_time: '06:00', duration: '12h 0m', total_seats: 40, available_seats: 40, fare: 1200.00, amenities: ['AC', 'Wi-Fi', 'USB Charging', 'Blanket', 'Pillow', 'Entertainment'] },
  
  // Andhra Pradesh & Telangana Routes
  { bus_number: 'AP-01-P-1234', bus_name: 'APSRTC Garuda', bus_type: 'AC', from_location: 'Hyderabad', to_location: 'Vijayawada', departure_time: '07:00', arrival_time: '12:00', duration: '5h 0m', total_seats: 40, available_seats: 40, fare: 550.00, amenities: ['AC', 'Wi-Fi', 'Charging Point'] },
  { bus_number: 'AP-04-S-3456', bus_name: 'APSRTC Rajdhani', bus_type: 'AC', from_location: 'Hyderabad', to_location: 'Bangalore', departure_time: '22:00', arrival_time: '06:00', duration: '8h 0m', total_seats: 40, available_seats: 40, fare: 900.00, amenities: ['AC', 'Wi-Fi', 'USB Charging', 'Blanket'] },
  { bus_number: 'AP-05-T-7890', bus_name: 'APSRTC Pallevelugu', bus_type: 'Semi-Sleeper', from_location: 'Hyderabad', to_location: 'Chennai', departure_time: '21:00', arrival_time: '07:00', duration: '10h 0m', total_seats: 40, available_seats: 40, fare: 950.00, amenities: ['AC', 'Charging Point', 'Pillow'] },
  { bus_number: 'TS-01-J-1111', bus_name: 'TSRTC Garuda Plus', bus_type: 'AC', from_location: 'Hyderabad', to_location: 'Warangal', departure_time: '06:00', arrival_time: '09:30', duration: '3h 30m', total_seats: 40, available_seats: 40, fare: 350.00, amenities: ['AC', 'Wi-Fi', 'Water Bottle'] },
  { bus_number: 'PVT-02-P-7777', bus_name: 'SRS Travels', bus_type: 'Sleeper', from_location: 'Bangalore', to_location: 'Hyderabad', departure_time: '21:00', arrival_time: '06:00', duration: '9h 0m', total_seats: 35, available_seats: 35, fare: 950.00, amenities: ['AC', 'Blanket', 'Pillow', 'Reading Light'] },
  
  // Kerala Routes
  { bus_number: 'KL-01-Z-6666', bus_name: 'Kerala KSRTC Super Fast', bus_type: 'AC', from_location: 'Thiruvananthapuram', to_location: 'Kochi', departure_time: '06:00', arrival_time: '10:00', duration: '4h 0m', total_seats: 40, available_seats: 40, fare: 450.00, amenities: ['AC', 'Wi-Fi', 'USB Charging'] },
  { bus_number: 'KL-02-A-7777', bus_name: 'Kerala KSRTC Express', bus_type: 'AC', from_location: 'Kochi', to_location: 'Kozhikode', departure_time: '07:30', arrival_time: '12:30', duration: '5h 0m', total_seats: 40, available_seats: 40, fare: 500.00, amenities: ['Water Bottle', 'Reading Light'] },
  { bus_number: 'KL-03-B-8888', bus_name: 'Kerala KSRTC Garuda', bus_type: 'AC', from_location: 'Thiruvananthapuram', to_location: 'Bangalore', departure_time: '20:00', arrival_time: '06:00', duration: '10h 0m', total_seats: 40, available_seats: 40, fare: 950.00, amenities: ['AC', 'Wi-Fi', 'Blanket', 'Pillow'] },
  { bus_number: 'KL-05-D-0000', bus_name: 'Kerala KSRTC Deluxe', bus_type: 'Semi-Sleeper', from_location: 'Kochi', to_location: 'Chennai', departure_time: '21:00', arrival_time: '07:00', duration: '10h 0m', total_seats: 40, available_seats: 40, fare: 900.00, amenities: ['AC', 'Charging Point', 'Water Bottle'] },
  { bus_number: 'PVT-03-Q-8888', bus_name: 'Orange Travels', bus_type: 'AC', from_location: 'Chennai', to_location: 'Bangalore', departure_time: '22:00', arrival_time: '06:00', duration: '8h 0m', total_seats: 40, available_seats: 40, fare: 850.00, amenities: ['AC', 'Wi-Fi', 'USB Charging', 'Water Bottle'] },
  
  // Gujarat & Rajasthan Routes
  { bus_number: 'GJ-01-E-1234', bus_name: 'GSRTC Volvo', bus_type: 'AC', from_location: 'Ahmedabad', to_location: 'Mumbai', departure_time: '21:00', arrival_time: '07:00', duration: '10h 0m', total_seats: 40, available_seats: 40, fare: 900.00, amenities: ['AC', 'Wi-Fi', 'USB Charging', 'Blanket'] },
  { bus_number: 'GJ-02-F-5678', bus_name: 'GSRTC Express', bus_type: 'AC', from_location: 'Surat', to_location: 'Pune', departure_time: '08:00', arrival_time: '15:00', duration: '7h 0m', total_seats: 40, available_seats: 40, fare: 650.00, amenities: ['Water Bottle', 'Charging Point'] },
  { bus_number: 'GJ-05-I-7890', bus_name: 'GSRTC Super', bus_type: 'AC', from_location: 'Ahmedabad', to_location: 'Jaipur', departure_time: '22:00', arrival_time: '07:00', duration: '9h 0m', total_seats: 40, available_seats: 40, fare: 850.00, amenities: ['AC', 'Blanket', 'Pillow', 'Charging Point'] },
  { bus_number: 'RJ-02-V-2222', bus_name: 'RSRTC Silver Line', bus_type: 'AC', from_location: 'Jaipur', to_location: 'Udaipur', departure_time: '08:00', arrival_time: '14:00', duration: '6h 0m', total_seats: 40, available_seats: 40, fare: 550.00, amenities: ['Charging Point', 'Reading Light'] },
  { bus_number: 'PVT-10-X-7890', bus_name: 'Patel Travels', bus_type: 'Sleeper', from_location: 'Ahmedabad', to_location: 'Surat', departure_time: '22:00', arrival_time: '04:00', duration: '6h 0m', total_seats: 35, available_seats: 35, fare: 550.00, amenities: ['AC', 'Blanket', 'Pillow'] },
  
  // Additional North-East Routes
  { bus_number: 'UP-65-C-9012', bus_name: 'UPSRTC Ordinary', bus_type: 'Non-AC', from_location: 'Kanpur', to_location: 'Varanasi', departure_time: '07:00', arrival_time: '13:30', duration: '6h 30m', total_seats: 45, available_seats: 45, fare: 350.00, amenities: ['Reading Light'] },
  { bus_number: 'UP-32-D-3456', bus_name: 'UPSRTC Deluxe', bus_type: 'Semi-Sleeper', from_location: 'Noida', to_location: 'Gorakhpur', departure_time: '22:00', arrival_time: '08:00', duration: '10h 0m', total_seats: 40, available_seats: 40, fare: 800.00, amenities: ['Blanket', 'Pillow', 'Charging Point'] },
  { bus_number: 'PVT-08-V-9012', bus_name: 'Express Travels', bus_type: 'AC', from_location: 'Kolkata', to_location: 'Patna', departure_time: '20:00', arrival_time: '06:00', duration: '10h 0m', total_seats: 40, available_seats: 40, fare: 850.00, amenities: ['AC', 'Blanket', 'Pillow', 'Water Bottle'] },
  
  // Weekend/Popular Routes
  { bus_number: 'MH-02-G-2222', bus_name: 'MSRTC Hirkani', bus_type: 'AC', from_location: 'Pune', to_location: 'Nashik', departure_time: '07:00', arrival_time: '11:00', duration: '4h 0m', total_seats: 40, available_seats: 40, fare: 400.00, amenities: ['Water Bottle', 'Reading Light'] },
  { bus_number: 'UP-80-B-5678', bus_name: 'UPSRTC Volvo', bus_type: 'AC', from_location: 'Lucknow', to_location: 'Agra', departure_time: '08:30', arrival_time: '14:00', duration: '5h 30m', total_seats: 40, available_seats: 40, fare: 550.00, amenities: ['AC', 'Comfortable Seats', 'Water Bottle'] },
  { bus_number: 'RJ-04-X-4444', bus_name: 'RSRTC Deluxe', bus_type: 'Semi-Sleeper', from_location: 'Jaipur', to_location: 'Ahmedabad', departure_time: '22:00', arrival_time: '06:00', duration: '8h 0m', total_seats: 40, available_seats: 40, fare: 750.00, amenities: ['AC', 'Blanket', 'Pillow'] },
  { bus_number: 'GJ-04-H-3456', bus_name: 'GSRTC Deluxe', bus_type: 'Semi-Sleeper', from_location: 'Ahmedabad', to_location: 'Udaipur', departure_time: '09:00', arrival_time: '16:00', duration: '7h 0m', total_seats: 40, available_seats: 40, fare: 700.00, amenities: ['AC', 'Water Bottle', 'Comfortable Seats'] },
  { bus_number: 'AP-02-Q-5678', bus_name: 'APSRTC Indra', bus_type: 'AC', from_location: 'Vijayawada', to_location: 'Visakhapatnam', departure_time: '20:00', arrival_time: '05:00', duration: '9h 0m', total_seats: 40, available_seats: 40, fare: 750.00, amenities: ['Semi-Sleeper', 'Blanket', 'Water Bottle'] },
  { bus_number: 'TS-04-M-4444', bus_name: 'TSRTC Super Luxury', bus_type: 'AC', from_location: 'Hyderabad', to_location: 'Vijayawada', departure_time: '22:00', arrival_time: '04:00', duration: '6h 0m', total_seats: 40, available_seats: 40, fare: 700.00, amenities: ['AC', 'Wi-Fi', 'Blanket', 'USB Charging'] },
  
  // Additional Popular Inter-State Routes
  { bus_number: 'KA-03-M-8888', bus_name: 'KSRTC Express', bus_type: 'Non-AC', from_location: 'Mysore', to_location: 'Hubli', departure_time: '08:00', arrival_time: '16:00', duration: '8h 0m', total_seats: 45, available_seats: 45, fare: 450.00, amenities: ['Reading Light'] },
  { bus_number: 'AP-03-R-9012', bus_name: 'APSRTC Express', bus_type: 'Non-AC', from_location: 'Tirupati', to_location: 'Hyderabad', departure_time: '06:00', arrival_time: '12:00', duration: '6h 0m', total_seats: 45, available_seats: 45, fare: 400.00, amenities: ['Reading Light'] },
  { bus_number: 'RJ-03-W-3333', bus_name: 'RSRTC Express', bus_type: 'Non-AC', from_location: 'Jodhpur', to_location: 'Jaisalmer', departure_time: '07:00', arrival_time: '14:00', duration: '7h 0m', total_seats: 45, available_seats: 45, fare: 350.00, amenities: ['Water Bottle'] },
  { bus_number: 'RJ-05-Y-5555', bus_name: 'RSRTC Super', bus_type: 'AC', from_location: 'Bikaner', to_location: 'Jaipur', departure_time: '09:00', arrival_time: '15:00', duration: '6h 0m', total_seats: 40, available_seats: 40, fare: 500.00, amenities: ['Water Bottle', 'Charging Point'] },
  { bus_number: 'GJ-03-G-9012', bus_name: 'GSRTC Parivartan', bus_type: 'Non-AC', from_location: 'Vadodara', to_location: 'Rajkot', departure_time: '07:00', arrival_time: '13:00', duration: '6h 0m', total_seats: 45, available_seats: 45, fare: 350.00, amenities: ['Reading Light'] },
  { bus_number: 'TS-02-K-2222', bus_name: 'TSRTC Rajdhani', bus_type: 'AC', from_location: 'Hyderabad', to_location: 'Karimnagar', departure_time: '08:00', arrival_time: '12:00', duration: '4h 0m', total_seats: 40, available_seats: 40, fare: 400.00, amenities: ['Charging Point', 'Reading Light'] },
  { bus_number: 'TS-05-N-5555', bus_name: 'TSRTC Pallevelugu', bus_type: 'Semi-Sleeper', from_location: 'Hyderabad', to_location: 'Nizamabad', departure_time: '09:00', arrival_time: '13:00', duration: '4h 0m', total_seats: 40, available_seats: 40, fare: 450.00, amenities: ['AC', 'Water Bottle', 'Comfortable Seats'] },
  { bus_number: 'MH-04-I-4444', bus_name: 'MSRTC Parivartan', bus_type: 'Semi-Sleeper', from_location: 'Thane', to_location: 'Aurangabad', departure_time: '10:00', arrival_time: '17:00', duration: '7h 0m', total_seats: 40, available_seats: 40, fare: 650.00, amenities: ['Comfortable Seats', 'Water Bottle'] },
  { bus_number: 'KL-04-C-9999', bus_name: 'Kerala KSRTC Fast', bus_type: 'Non-AC', from_location: 'Kannur', to_location: 'Thrissur', departure_time: '08:00', arrival_time: '14:00', duration: '6h 0m', total_seats: 45, available_seats: 45, fare: 350.00, amenities: ['Reading Light'] },
  { bus_number: 'PVT-07-U-5678', bus_name: 'Sharma Travels', bus_type: 'Semi-Sleeper', from_location: 'Jaipur', to_location: 'Delhi', departure_time: '07:00', arrival_time: '12:00', duration: '5h 0m', total_seats: 40, available_seats: 40, fare: 600.00, amenities: ['AC', 'Water Bottle', 'Charging Point'] },
  { bus_number: 'TS-03-L-3333', bus_name: 'TSRTC Express', bus_type: 'Non-AC', from_location: 'Warangal', to_location: 'Khammam', departure_time: '07:30', arrival_time: '11:30', duration: '4h 0m', total_seats: 45, available_seats: 45, fare: 250.00, amenities: ['Water Bottle'] },
];

async function seedDatabase() {
  console.log('🚀 Starting database seeding...\n');
  
  const { count: before } = await supabase.from('buses').select('*', { count: 'exact', head: true });
  console.log(`📊 Buses before: ${before || 0}\n`);
  
  let success = 0;
  const batchSize = 10;
  
  for (let i = 0; i < buses.length; i += batchSize) {
    const batch = buses.slice(i, i + batchSize);
    const { data, error } = await supabase.from('buses').insert(batch).select();
    
    if (error) {
      console.error(`❌ Batch ${Math.floor(i / batchSize) + 1}:`, error.message);
    } else {
      success += data.length;
      console.log(`✅ Batch ${Math.floor(i / batchSize) + 1}: ${data.length} buses`);
    }
  }
  
  const { count: after } = await supabase.from('buses').select('*', { count: 'exact', head: true });
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Inserted: ${success} buses`);
  console.log(`   📦 Total: ${after || 0} buses\n`);
  console.log(`✨ Database seeded successfully!\n`);
  console.log(`🔍 Popular routes: Delhi→Lucknow, Mumbai→Pune, Bangalore→Mysore, Hyderabad→Vijayawada\n`);
}

seedDatabase();

