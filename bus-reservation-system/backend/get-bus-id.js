require('dotenv').config();
const { supabase } = require('./config/supabase');

async function testEndpoints() {
  console.log('🧪 Testing Backend Endpoints\n');
  
  try {
    // Get a real bus ID
    const { data: buses, error } = await supabase
      .from('buses')
      .select('id, bus_name, from_location, to_location')
      .limit(1);
    
    if (error) {
      console.log('❌ Error:', error.message);
      return;
    }
    
    if (buses && buses.length > 0) {
      const bus = buses[0];
      console.log('✅ Found bus:', bus.bus_name);
      console.log('   ID:', bus.id);
      console.log('   Route:', bus.from_location, '→', bus.to_location);
      console.log('\n📝 Use this bus ID to test booking page');
      console.log('   URL: http://localhost:3000/booking/' + bus.id);
    }
  } catch (err) {
    console.log('❌ Error:', err.message);
  }
}

testEndpoints();
