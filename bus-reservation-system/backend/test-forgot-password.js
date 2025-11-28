require('dotenv').config();
const axios = require('axios');

async function testForgotPassword() {
  const testEmail = 'test@example.com';
  
  console.log('🔐 Testing Forgot Password Flow\n');
  console.log('Step 1: Request reset code...');
  
  try {
    // Step 1: Request reset code
    const response1 = await axios.post('http://localhost:5000/api/auth/forgot-password', {
      email: testEmail
    });
    
    console.log('✅ Reset code generated!');
    console.log('Code:', response1.data.resetCode);
    console.log('');
    
    const resetCode = response1.data.resetCode;
    
    // Step 2: Reset password with code
    console.log('Step 2: Resetting password with code...');
    const response2 = await axios.post('http://localhost:5000/api/auth/reset-password', {
      email: testEmail,
      resetCode: resetCode,
      newPassword: 'newpassword123'
    });
    
    console.log('✅', response2.data.message);
    console.log('');
    console.log('📝 New login credentials:');
    console.log('   Email:', testEmail);
    console.log('   Password: newpassword123');
    console.log('');
    
    // Step 3: Test login with new password
    console.log('Step 3: Testing login with new password...');
    const response3 = await axios.post('http://localhost:5000/api/auth/login', {
      email: testEmail,
      password: 'newpassword123'
    });
    
    console.log('✅ Login successful!');
    console.log('User:', response3.data.user.name);
    console.log('');
    console.log('🎉 Forgot password flow working perfectly!');
    
  } catch (error) {
    console.log('❌ Error:', error.response?.data?.message || error.message);
    console.log('Full error:', error.response?.data || error);
  }
}

testForgotPassword();
