require('dotenv').config();
const { supabase } = require('./config/supabase');

async function checkAndFixBusData() {
  console.log('🔍 Checking bus data for missing fields...\n');
  
  // Get all buses
  const { data: buses, error } = await supabase
    .from('buses')
    .select('*');
  
  if (error) {
    console.error('❌ Error fetching buses:', error.message);
    return;
  }
  
  console.log(`✅ Found ${buses.length} buses\n`);
  
  let needsUpdate = [];
  
  buses.forEach(bus => {
    const missingFields = [];
    
    if (!bus.operator_type) missingFields.push('operator_type');
    if (!bus.operator_name) missingFields.push('operator_name');
    if (!bus.boarding_points) missingFields.push('boarding_points');
    if (!bus.dropping_points) missingFields.push('dropping_points');
    if (!bus.seat_layout) missingFields.push('seat_layout');
    if (bus.live_tracking === null || bus.live_tracking === undefined) missingFields.push('live_tracking');
    if (!bus.rating) missingFields.push('rating');
    
    if (missingFields.length > 0) {
      console.log(`⚠️  Bus ${bus.bus_name} (${bus.id}) missing:`, missingFields.join(', '));
      needsUpdate.push(bus.id);
    }
  });
  
  if (needsUpdate.length > 0) {
    console.log(`\n📝 Updating ${needsUpdate.length} buses with default values...`);
    
    for (const busId of needsUpdate) {
      const { error: updateError } = await supabase
        .from('buses')
        .update({
          operator_type: 'Government',
          operator_name: 'UPSRTC',
          boarding_points: [],
          dropping_points: [],
          seat_layout: '2+2',
          live_tracking: true,
          rating: 4.0
        })
        .eq('id', busId);
      
      if (updateError) {
        console.log(`   ❌ Error updating bus ${busId}:`, updateError.message);
      }
    }
    
    console.log('✅ Update complete!');
  } else {
    console.log('\n✅ All buses have complete data!');
  }
  
  // Show sample bus data
  console.log('\n📋 Sample bus data:');
  const sampleBus = buses[0];
  console.log(JSON.stringify(sampleBus, null, 2));
}

checkAndFixBusData().catch(console.error);
