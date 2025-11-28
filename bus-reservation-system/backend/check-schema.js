// Check existing bus table structure
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function checkSchema() {
  try {
    console.log('🔍 Checking buses table schema...\n');
    
    // Try to get a single row to see structure
    const { data, error } = await supabase
      .from('buses')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error:', error.message);
      console.log('\n📝 The buses table might not exist yet.');
      console.log('💡 Please run the schema.sql file in Supabase SQL Editor first.');
      console.log('   File location: backend/config/schema.sql');
    } else {
      console.log('✅ Buses table exists!');
      if (data && data.length > 0) {
        console.log('\n📋 Sample row structure:');
        console.log(JSON.stringify(data[0], null, 2));
        console.log('\n🔑 Available columns:', Object.keys(data[0]).join(', '));
      } else {
        console.log('\n📊 Table is empty but ready for data.');
        console.log('💡 Run seed-database.js to populate with bus data.');
      }
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
}

checkSchema();
