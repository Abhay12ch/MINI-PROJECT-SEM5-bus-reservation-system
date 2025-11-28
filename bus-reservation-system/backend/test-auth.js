require('dotenv').config();
const { supabase } = require('./config/supabase');
const bcrypt = require('bcryptjs');

async function testAuth() {
  console.log('🔍 Testing Authentication System...\n');
  
  // Check if users exist
  const { data: users, error } = await supabase
    .from('users')
    .select('id, name, email, password')
    .limit(5);
  
  if (error) {
    console.error('❌ Error fetching users:', error.message);
    return;
  }
  
  console.log(`✅ Found ${users.length} users in database`);
  
  if (users.length > 0) {
    console.log('\n📋 User Details:');
    for (const user of users) {
      console.log(`\n  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Password Hash Length: ${user.password ? user.password.length : 'NULL'}`);
      console.log(`  Password starts with: ${user.password ? user.password.substring(0, 7) : 'NULL'}`);
      
      // Test if password is bcrypt hash
      const isBcryptHash = user.password && user.password.startsWith('$2a$') || user.password.startsWith('$2b$');
      console.log(`  Is BCrypt Hash: ${isBcryptHash ? '✅ Yes' : '❌ No'}`);
    }
    
    // Test password comparison with a sample
    console.log('\n🔐 Testing Password Comparison:');
    const testUser = users[0];
    
    // Try comparing with common test passwords
    const testPasswords = ['password', 'password123', '123456', 'test123'];
    
    for (const testPwd of testPasswords) {
      try {
        const isMatch = await bcrypt.compare(testPwd, testUser.password);
        if (isMatch) {
          console.log(`  ✅ Password "${testPwd}" matches for ${testUser.email}`);
        }
      } catch (err) {
        // Skip
      }
    }
  } else {
    console.log('\n⚠️  No users found in database');
    console.log('   Try registering a new user first');
  }
  
  console.log('\n✅ Authentication test complete');
}

testAuth().catch(console.error);
