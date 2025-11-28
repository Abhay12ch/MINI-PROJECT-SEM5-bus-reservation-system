require('dotenv').config();
const { supabase } = require('./config/supabase');

async function checkResetColumns() {
  console.log('🔍 Checking if reset_code columns exist...\n');
  
  try {
    // Try to query a user with reset columns
    const { data, error } = await supabase
      .from('users')
      .select('id, email, reset_code, reset_code_expiry')
      .limit(1);
    
    if (error) {
      console.log('❌ Reset columns do NOT exist in database');
      console.log('Error:', error.message);
      console.log('\n📝 Action Required:');
      console.log('Run this SQL in your Supabase SQL Editor:');
      console.log('');
      console.log('ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_code VARCHAR(6);');
      console.log('ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_code_expiry TIMESTAMP;');
      console.log('');
      console.log('Or use the file: backend/config/add-reset-columns.sql');
    } else {
      console.log('✅ Reset columns exist in database!');
      console.log('   - reset_code (VARCHAR)');
      console.log('   - reset_code_expiry (TIMESTAMP)');
      console.log('\n🎉 Forgot password feature is ready to use!');
    }
  } catch (err) {
    console.log('❌ Error checking columns:', err.message);
  }
}

checkResetColumns();
