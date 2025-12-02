require('dotenv').config();
const { sendEmail, sendSMS, sendNotification } = require('./config/notification');

async function testNotifications() {
  console.log('====================================');
  console.log('Testing Notification System');
  console.log('====================================\n');

  // Test data
  const testData = {
    bookingConfirmation: {
      bookingId: 'BK12345',
      busName: 'UPSRTC Express',
      busNumber: 'UP78AB1234',
      from: 'Delhi',
      to: 'Agra',
      departureTime: '06:00 AM',
      arrivalTime: '09:30 AM',
      journeyDate: '2025-12-05',
      seatNumbers: '12, 13',
      totalFare: '850',
      passengerName: 'Test User'
    },
    passwordReset: {
      userName: 'Test User',
      resetCode: '123456'
    }
  };

  // Check configuration
  console.log('📋 Configuration Status:');
  console.log('  SendGrid API Key:', process.env.SENDGRID_API_KEY ? '✅ Configured' : '❌ Not configured');
  console.log('  SendGrid From Email:', process.env.SENDGRID_FROM_EMAIL ? '✅ Configured' : '❌ Not configured');
  console.log('  Twilio Account SID:', process.env.TWILIO_ACCOUNT_SID ? '✅ Configured' : '❌ Not configured');
  console.log('  Twilio Auth Token:', process.env.TWILIO_AUTH_TOKEN ? '✅ Configured' : '❌ Not configured');
  console.log('  Twilio Phone Number:', process.env.TWILIO_PHONE_NUMBER ? '✅ Configured' : '❌ Not configured');
  console.log('');

  if (!process.env.SENDGRID_API_KEY && !process.env.TWILIO_ACCOUNT_SID) {
    console.log('⚠️  No notification services configured.');
    console.log('📝 To enable notifications, add the following to your .env file:');
    console.log('');
    console.log('# SendGrid (Email)');
    console.log('SENDGRID_API_KEY=your_sendgrid_api_key');
    console.log('SENDGRID_FROM_EMAIL=noreply@yourdomain.com');
    console.log('');
    console.log('# Twilio (SMS)');
    console.log('TWILIO_ACCOUNT_SID=your_twilio_account_sid');
    console.log('TWILIO_AUTH_TOKEN=your_twilio_auth_token');
    console.log('TWILIO_PHONE_NUMBER=+1234567890');
    console.log('');
    console.log('Get SendGrid API key from: https://app.sendgrid.com/settings/api_keys');
    console.log('Get Twilio credentials from: https://console.twilio.com/');
    return;
  }

  // Test email if configured
  if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL) {
    console.log('📧 Testing Email Notification...');
    const testEmail = process.env.TEST_EMAIL || 'test@example.com';
    console.log(`   Sending to: ${testEmail}`);
    
    const emailResult = await sendEmail(
      testEmail,
      'bookingConfirmation',
      testData.bookingConfirmation
    );
    
    console.log(`   Result: ${emailResult.success ? '✅ Success' : '❌ Failed'}`);
    if (!emailResult.success) {
      console.log(`   Error: ${emailResult.message}`);
    }
    console.log('');
  }

  // Test SMS if configured
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    console.log('📱 Testing SMS Notification...');
    const testPhone = process.env.TEST_PHONE || '+919999999999';
    console.log(`   Sending to: ${testPhone}`);
    
    const smsResult = await sendSMS(
      testPhone,
      'bookingConfirmation',
      testData.bookingConfirmation
    );
    
    console.log(`   Result: ${smsResult.success ? '✅ Success' : '❌ Failed'}`);
    if (!smsResult.success) {
      console.log(`   Error: ${smsResult.message}`);
    }
    console.log('');
  }

  console.log('====================================');
  console.log('Test Complete');
  console.log('====================================');
}

// Run tests
testNotifications()
  .then(() => {
    console.log('\n✅ All tests completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });
