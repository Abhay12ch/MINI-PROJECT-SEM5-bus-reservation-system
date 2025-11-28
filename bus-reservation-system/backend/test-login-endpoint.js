require('dotenv').config();
const axios = require('axios');

async function testLogin() {
  console.log('🔐 Testing Login Endpoint...\n');
  
  const testCredentials = {
    email: 'abhaychaudhary109@gmail.com',
    password: 'test123' // You need to replace this with the actual password
  };
  
  console.log('Testing with email:', testCredentials.email);
  console.log('Password:', testCredentials.password);
  
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', testCredentials);
    console.log('\n✅ Login successful!');
    console.log('Token:', response.data.token);
    console.log('User:', JSON.stringify(response.data.user, null, 2));
  } catch (error) {
    console.log('\n❌ Login failed!');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', error.response.data);
    } else if (error.request) {
      console.log('No response from server. Is the backend running?');
    } else {
      console.log('Error:', error.message);
    }
  }
}

testLogin();
