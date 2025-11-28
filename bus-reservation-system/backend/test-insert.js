// Test inserting one bus to see which columns work
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function testInsert() {
  try {
    console.log('🧪 Testing bus insert...\n');
    
    const testBus = {
      bus_number: 'TEST-01',
      bus_name: 'Test Bus',
      bus_type: 'AC',
      from_location: 'Delhi',
      to_location: 'Lucknow',
      departure_time: '06:00',
      arrival_time: '12:00',
      duration: '6h 0m',
      total_seats: 40,
      available_seats: 40,
      fare: 650.00
    };

    const { data, error } = await supabase
      .from('buses')
      .insert([testBus])
      .select();

    if (error) {
      console.error('❌ Error:', error.message);
    } else {
      console.log('✅ Successfully inserted test bus!');
      console.log('\n📋 Inserted data:');
      console.log(JSON.stringify(data[0], null, 2));
      console.log('\n🔑 Available columns:', Object.keys(data[0]).join(', '));
      
      // Delete the test bus
      const { error: deleteError } = await supabase
        .from('buses')
        .delete()
        .eq('bus_number', 'TEST-01');
      
      if (!deleteError) {
        console.log('\n🧹 Test bus cleaned up successfully!');
      }
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
}

testInsert();
