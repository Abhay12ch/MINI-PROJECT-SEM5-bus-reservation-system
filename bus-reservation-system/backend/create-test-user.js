require('dotenv').config();
const { supabase } = require('./config/supabase');
const bcrypt = require('bcryptjs');

async function createTestUser() {
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    phone: '9999999999'
  };
  
  console.log('🔧 Creating test user...\n');
  console.log('Email:', testUser.email);
  console.log('Password:', testUser.password);
  console.log('');
  
  // Check if user already exists
  const { data: existing } = await supabase
    .from('users')
    .select('email')
    .eq('email', testUser.email)
    .single();
  
  if (existing) {
    console.log('⚠️  User already exists. Deleting old user...');
    await supabase
      .from('users')
      .delete()
      .eq('email', testUser.email);
  }
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(testUser.password, salt);
  
  // Create user
  const { data, error } = await supabase
    .from('users')
    .insert([{
      name: testUser.name,
      email: testUser.email,
      password: hashedPassword,
      phone: testUser.phone,
      role: 'user'
    }])
    .select()
    .single();
  
  if (error) {
    console.log('❌ Error:', error.message);
    return;
  }
  
  console.log('✅ Test user created successfully!\n');
  console.log('📝 Login credentials:');
  console.log('   Email: test@example.com');
  console.log('   Password: password123');
  console.log('');
  console.log('💡 Use these credentials to login to your application.');
}

createTestUser().catch(console.error);
