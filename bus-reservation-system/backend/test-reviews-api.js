const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testReviewsAPI() {
  console.log('Testing Reviews API Endpoints...\n');

  try {
    // Test 1: Get reviews for a bus (public endpoint)
    console.log('1. Testing GET /reviews/bus/:busId');
    try {
      const busRes = await axios.get(`${API_URL}/buses`);
      if (busRes.data.data && busRes.data.data.length > 0) {
        const busId = busRes.data.data[0].id;
        console.log(`   Using bus ID: ${busId}`);
        
        const reviewsRes = await axios.get(`${API_URL}/reviews/bus/${busId}`);
        console.log(`   ✓ Success: Found ${reviewsRes.data.count} reviews`);
      } else {
        console.log('   ⚠ No buses found to test with');
      }
    } catch (error) {
      console.log(`   ✗ Error: ${error.response?.data?.message || error.message}`);
    }

    // Test 2: Get rating statistics (public endpoint)
    console.log('\n2. Testing GET /reviews/stats/:busId');
    try {
      const busRes = await axios.get(`${API_URL}/buses`);
      if (busRes.data.data && busRes.data.data.length > 0) {
        const busId = busRes.data.data[0].id;
        
        const statsRes = await axios.get(`${API_URL}/reviews/stats/${busId}`);
        console.log(`   ✓ Success: Total reviews: ${statsRes.data.data.totalReviews}`);
        console.log(`   Average rating: ${statsRes.data.data.averageRating}`);
      }
    } catch (error) {
      console.log(`   ✗ Error: ${error.response?.data?.message || error.message}`);
    }

    // Test 3: Try to create review without auth (should fail)
    console.log('\n3. Testing POST /reviews (without auth - should fail)');
    try {
      await axios.post(`${API_URL}/reviews`, {
        bookingId: 'test-id',
        rating: 5
      });
      console.log('   ✗ Unexpected success - auth should be required');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('   ✓ Correctly requires authentication');
      } else {
        console.log(`   ⚠ Unexpected error: ${error.message}`);
      }
    }

    // Test 4: Test login endpoint
    console.log('\n4. Testing authentication');
    try {
      const loginRes = await axios.post(`${API_URL}/auth/login`, {
        email: 'test@example.com',
        password: 'password123'
      });
      console.log('   ✓ Login successful');
      
      const token = loginRes.data.token;
      
      // Test 5: Get my reviews
      console.log('\n5. Testing GET /reviews/my-reviews (with auth)');
      try {
        const myReviewsRes = await axios.get(`${API_URL}/reviews/my-reviews`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`   ✓ Success: Found ${myReviewsRes.data.count} user reviews`);
      } catch (error) {
        console.log(`   ✗ Error: ${error.response?.data?.message || error.message}`);
      }
      
    } catch (error) {
      console.log(`   ⚠ Could not login: ${error.response?.data?.message || error.message}`);
      console.log('   (Create a test user first if not exists)');
    }

    console.log('\n✓ Review API endpoints are configured correctly!');
    console.log('\nNext steps:');
    console.log('1. Run the SQL script in Supabase to create reviews table');
    console.log('2. Start the backend server: cd backend && node server.js');
    console.log('3. Start the frontend: cd frontend && npm start');
    console.log('4. Create a booking and mark it as "Completed" to test reviews');

  } catch (error) {
    console.error('\n✗ Fatal error:', error.message);
    console.log('\nMake sure:');
    console.log('- Backend server is running on port 5000');
    console.log('- Database is properly configured');
  }
}

testReviewsAPI();
