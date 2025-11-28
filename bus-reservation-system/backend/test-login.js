require('dotenv').config();
const { supabase } = require('./config/supabase');
const bcrypt = require('bcryptjs');

async function testLogin() {
  const testEmail = 'abhaychaudhary109@gmail.com';
  const testPassword = process.argv[2] || 'test123'; // Get password from command line
  
  console.log(`\n🔐 Testing login for: ${testEmail}`);
  console.log(`   Password to test: ${testPassword}\n`);
  
  // Get user from database
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', testEmail)
    .single();
  
  if (error) {
    console.error('❌ Error finding user:', error.message);
    return;
  }
  
  if (!user) {
    console.log('❌ User not found');
    return;
  }
  
  console.log('✅ User found in database');
  console.log(`   Name: ${user.name}`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Password Hash: ${user.password.substring(0, 20)}...`);
  
  // Test password
  console.log('\n🔍 Comparing password...');
  const isMatch = await bcrypt.compare(testPassword, user.password);
  
  if (isMatch) {
    console.log('✅ PASSWORD MATCHES!');
    console.log('   Login should work with this password');
  } else {
    console.log('❌ PASSWORD DOES NOT MATCH');
    console.log('   This is why login fails');
  }
  
  console.log('\n💡 To test with different password, run:');
  console.log(`   node test-login.js "your_password_here"`);
}

testLogin().catch(console.error);
