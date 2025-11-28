require('dotenv').config();
const { supabase } = require('./config/supabase');
const bcrypt = require('bcryptjs');

async function debugLogin() {
  const testEmail = 'abhaychaudhary109@gmail.com';
  
  console.log('🔍 Debugging login for:', testEmail);
  console.log('');
  
  // Get user from database
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', testEmail)
    .single();
  
  if (error) {
    console.log('❌ Error:', error.message);
    if (error.code === 'PGRST116') {
      console.log('📝 This user does not exist. Please register first.');
    }
    return;
  }
  
  console.log('✅ User found!');
  console.log('Name:', user.name);
  console.log('Email:', user.email);
  console.log('Role:', user.role);
  console.log('Created:', user.created_at);
  console.log('');
  
  // Test password hashing
  console.log('🔐 Testing password hashing...');
  console.log('Stored password hash:', user.password.substring(0, 20) + '...');
  console.log('');
  
  // Try common passwords
  const testPasswords = ['password', 'password123', '123456', 'test123', 'admin', 'admin123'];
  
  console.log('🧪 Testing common passwords:');
  for (const pwd of testPasswords) {
    const isMatch = await bcrypt.compare(pwd, user.password);
    if (isMatch) {
      console.log(`  ✅ FOUND IT! Password is: "${pwd}"`);
      console.log('');
      console.log('💡 Use this to login:');
      console.log(`   Email: ${testEmail}`);
      console.log(`   Password: ${pwd}`);
      return;
    } else {
      console.log(`  ❌ Not "${pwd}"`);
    }
  }
  
  console.log('');
  console.log('⚠️  None of the common passwords matched.');
  console.log('💡 You need to remember the password you used during registration.');
  console.log('   Or register a new account with a password you will remember.');
}

debugLogin().catch(console.error);
