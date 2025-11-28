require('dotenv').config();
const { supabase } = require('./config/supabase');

async function testEndpoints() {
  console.log('🔍 Testing Endpoints...\n');
  
  // Test 1: Get all buses
  console.log('1. Testing GET /buses');
  const { data: buses, error: busError } = await supabase
    .from('buses')
    .select('*')
    .eq('status', 'Active')
    .limit(1);
  
  if (busError) {
    console.log('   ❌ Error:', busError.message);
  } else if (buses.length > 0) {
    console.log('   ✅ Success! Found', buses.length, 'bus(es)');
    const testBus = buses[0];
    console.log('   Sample bus:', testBus.bus_name, '|', testBus.id);
    
    // Test 2: Get single bus
    console.log('\n2. Testing GET /buses/:id');
    const { data: singleBus, error: singleError } = await supabase
      .from('buses')
      .select('*')
      .eq('id', testBus.id)
      .single();
    
    if (singleError) {
      console.log('   ❌ Error:', singleError.message);
    } else {
      console.log('   ✅ Success! Retrieved:', singleBus.bus_name);
      console.log('   Properties:', Object.keys(singleBus).join(', '));
    }
    
    // Test 3: Get booked seats
    console.log('\n3. Testing GET /bookings/booked-seats/:busId');
    const testDate = new Date().toISOString().split('T')[0];
    const { data: bookings, error: bookingError } = await supabase
      .from('bookings')
      .select('seat_numbers')
      .eq('bus_id', testBus.id)
      .eq('journey_date', testDate)
      .eq('booking_status', 'Confirmed');
    
    if (bookingError) {
      console.log('   ❌ Error:', bookingError.message);
      console.log('   Note: This might be because bookings table doesn\'t exist yet');
    } else {
      console.log('   ✅ Success! Found', bookings.length, 'booking(s)');
      const bookedSeats = bookings.flatMap(b => b.seat_numbers);
      console.log('   Booked seats:', bookedSeats.length > 0 ? bookedSeats.join(', ') : 'None');
    }
  } else {
    console.log('   ⚠️  No buses found. Run seed-database.js first');
  }
  
  // Test 4: Check if bookings table exists
  console.log('\n4. Checking bookings table');
  const { data: bookingTest, error: bookingTableError } = await supabase
    .from('bookings')
    .select('count', { count: 'exact', head: true });
  
  if (bookingTableError) {
    console.log('   ❌ Bookings table error:', bookingTableError.message);
    console.log('   💡 Solution: Run the schema.sql in Supabase SQL Editor');
  } else {
    console.log('   ✅ Bookings table exists');
  }
  
  console.log('\n✅ Test complete');
}

testEndpoints().catch(console.error);
