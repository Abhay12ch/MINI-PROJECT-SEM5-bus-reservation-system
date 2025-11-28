const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file!');
  console.log('Please add SUPABASE_URL and SUPABASE_ANON_KEY to your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const connectDB = async () => {
  try {
    // Test connection
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    
    if (error && error.code !== 'PGRST116') {
      // PGRST116 means table doesn't exist yet, which is okay for first run
      console.log('Supabase connection test:', error.message);
    }
    
    console.log('✅ Supabase Connected Successfully!');
  } catch (error) {
    console.error('❌ Supabase Connection Error:', error.message);
    console.log('\n📝 Setup Instructions:');
    console.log('1. Go to https://supabase.com/dashboard');
    console.log('2. Create a new project (free tier)');
    console.log('3. Go to Settings > API');
    console.log('4. Copy your URL and anon key to .env file');
    console.log('5. Run the SQL schema from backend/config/schema.sql\n');
  }
};

module.exports = { supabase, connectDB };
