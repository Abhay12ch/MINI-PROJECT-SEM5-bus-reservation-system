// Test which bus_type values are accepted
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const busTypes = ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper', 'Volvo', 'Deluxe', 'Seater'];

async function testBusTypes() {
  console.log('🧪 Testing bus_type values...\n');
  
  for (const type of busTypes) {
    const testBus = {
      bus_number: `TEST-${type}`,
      bus_name: `Test ${type} Bus`,
      bus_type: type,
      from_location: 'Delhi',
      to_location: 'Mumbai',
      departure_time: '06:00',
      arrival_time: '12:00',
      duration: '6h',
      total_seats: 40,
      available_seats: 40,
      fare: 500
    };
    
    const { data, error } = await supabase.from('buses').insert([testBus]).select();
    
    if (error) {
      console.log(`❌ "${type}" - FAILED: ${error.message}`);
    } else {
      console.log(`✅ "${type}" - SUCCESS`);
      // Clean up
      await supabase.from('buses').delete().eq('bus_number', `TEST-${type}`);
    }
  }
  
  console.log('\n✨ Test complete!');
}

testBusTypes();
