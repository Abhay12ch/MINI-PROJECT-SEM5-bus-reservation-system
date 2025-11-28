require('dotenv').config();
const { supabase } = require('./config/supabase');

async function checkSupabase() {
  console.log('🔍 Checking Supabase Database Status\n');
  console.log('='.repeat(50));
  
  try {
    // Check users table
    console.log('\n📊 USERS TABLE:');
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('id, name, email, role, created_at')
      .order('created_at', { ascending: false });
    
    if (userError) {
      console.log('❌ Error:', userError.message);
    } else {
      console.log(`   Total Users: ${users.length}`);
      users.forEach((user, index) => {
        console.log(`\n   ${index + 1}. ${user.name}`);
        console.log(`      Email: ${user.email}`);
        console.log(`      Role: ${user.role}`);
        console.log(`      Created: ${new Date(user.created_at).toLocaleDateString()}`);
      });
    }

    // Check buses table
    console.log('\n\n📊 BUSES TABLE:');
    const { data: buses, error: busError, count } = await supabase
      .from('buses')
      .select('*', { count: 'exact', head: true });
    
    if (busError) {
      console.log('❌ Error:', busError.message);
    } else {
      console.log(`   Total Buses: ${count}`);
    }

    // Check bookings table
    console.log('\n📊 BOOKINGS TABLE:');
    const { data: bookings, error: bookingError, count: bookingCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true });
    
    if (bookingError) {
      console.log('❌ Error:', bookingError.message);
    } else {
      console.log(`   Total Bookings: ${bookingCount}`);
    }

    // Check reset columns
    console.log('\n📊 PASSWORD RESET FEATURE:');
    const { data: resetCheck, error: resetError } = await supabase
      .from('users')
      .select('reset_code, reset_code_expiry')
      .limit(1);
    
    if (resetError) {
      console.log('❌ Reset columns missing');
    } else {
      console.log('✅ Reset columns exist (reset_code, reset_code_expiry)');
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ Supabase connection successful!\n');

  } catch (err) {
    console.log('❌ Error:', err.message);
  }
}

checkSupabase();
