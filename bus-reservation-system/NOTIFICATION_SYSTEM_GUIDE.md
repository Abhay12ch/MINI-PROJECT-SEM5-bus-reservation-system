# Email and SMS Notification System

## Overview
A comprehensive notification system integrated with **SendGrid** for emails and **Twilio** for SMS messages. Automatically sends notifications for booking confirmations, cancellations, password resets, and journey reminders.

## Features

### 1. **Email Notifications (SendGrid)**
- Professional HTML email templates
- Responsive design
- Branded headers and footers
- Rich formatting with colors and icons
- QR code placeholders for tickets

### 2. **SMS Notifications (Twilio)**
- Concise SMS messages optimized for 160 characters
- International number support (E.164 format)
- Automatic Indian country code prefix (+91)
- Delivery status tracking

### 3. **Notification Types**

#### Booking Confirmation
**Trigger**: After successful booking creation
**Channels**: Email + SMS
**Content**:
- Booking ID
- Bus details (name, number, operator)
- Journey details (from, to, date, time)
- Seat numbers
- Total fare
- Passenger information
- Important travel reminders

#### Booking Cancellation
**Trigger**: After booking cancellation
**Channels**: Email + SMS
**Content**:
- Booking ID
- Cancellation confirmation
- Refund amount
- Refund processing timeline (5-7 business days)
- Original payment method details

#### Password Reset
**Trigger**: When user requests password reset
**Channels**: Email + SMS
**Content**:
- 6-digit reset code
- Code expiry time (10 minutes)
- Security warnings
- Instructions to ignore if not requested

#### Journey Reminder (Future Feature)
**Trigger**: 24 hours before journey
**Channels**: Email + SMS
**Content**:
- Journey date and time
- Bus details
- Seat numbers
- Boarding point
- Travel checklist
- Contact information

## Setup Instructions

### 1. SendGrid Setup (Email)

#### A. Create SendGrid Account
1. Go to [SendGrid](https://sendgrid.com/)
2. Sign up for a free account (100 emails/day free tier)
3. Verify your email address

#### B. Create API Key
1. Log in to SendGrid dashboard
2. Go to **Settings** → **API Keys**
3. Click **Create API Key**
4. Name: "Bus Reservation System"
5. Permissions: Select **Full Access** or **Mail Send** only
6. Click **Create & View**
7. **IMPORTANT**: Copy the API key immediately (shown only once)

#### C. Verify Sender Identity
1. Go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill in your details:
   - From Name: "Bus Reservation System"
   - From Email: Use your domain email (e.g., noreply@yourdomain.com)
   - Reply To: Your support email
4. Verify the email address

#### D. Add to Environment Variables
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

### 2. Twilio Setup (SMS)

#### A. Create Twilio Account
1. Go to [Twilio](https://www.twilio.com/)
2. Sign up for a free trial account
3. Verify your phone number

#### B. Get Credentials
1. Log in to Twilio Console
2. From the dashboard, find:
   - **Account SID** (starts with AC...)
   - **Auth Token** (click to reveal)
3. Copy both values

#### C. Get Phone Number
1. Go to **Phone Numbers** → **Manage** → **Buy a number**
2. Select your country (India: +91)
3. Choose a number with SMS capability
4. Purchase the number (free trial includes credits)
5. Note: Trial accounts can only send to verified phone numbers

#### D. Verify Test Numbers (Trial Account)
1. Go to **Phone Numbers** → **Manage** → **Verified Caller IDs**
2. Click **Add a new number**
3. Enter your test phone number
4. Verify via SMS code

#### E. Add to Environment Variables
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

### 3. Backend Configuration

Add all credentials to your `.env` file:

```env
# Email Notification (SendGrid)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@busreservation.com

# SMS Notification (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567
```

**Note**: The system works even if only one service is configured. If credentials are missing, notifications will be logged but not sent.

## Testing

### Test Notification System
```bash
cd backend
node test-notifications.js
```

This script will:
1. Check if SendGrid and Twilio are configured
2. Show configuration status
3. Send test email (if configured)
4. Send test SMS (if configured)
5. Display results

### Test with Real Bookings
1. Configure at least one notification service
2. Create a test booking through the app
3. Check your email/phone for confirmation
4. Cancel the booking and check for cancellation notification

### Manual Testing
Create a test script:
```javascript
const { sendEmail, sendSMS } = require('./config/notification');

// Test email
sendEmail('your-email@example.com', 'bookingConfirmation', {
  bookingId: 'TEST123',
  busName: 'Test Bus',
  // ... other data
});

// Test SMS
sendSMS('+919999999999', 'bookingConfirmation', {
  bookingId: 'TEST123',
  // ... other data
});
```

## Implementation Details

### File Structure
```
backend/
├── config/
│   └── notification.js          # Main notification service
├── controllers/
│   ├── bookingController.js     # Sends booking notifications
│   └── authController.js        # Sends password reset notifications
├── test-notifications.js        # Testing script
└── .env                         # Configuration
```

### Notification Service API

#### sendEmail(to, templateName, data)
Sends an email using a pre-defined template.
```javascript
const result = await sendEmail(
  'user@example.com',
  'bookingConfirmation',
  {
    bookingId: 'BK123',
    busName: 'Express Bus',
    // ... template data
  }
);
```

#### sendSMS(to, templateName, data)
Sends an SMS using a pre-defined template.
```javascript
const result = await sendSMS(
  '+919999999999',
  'bookingConfirmation',
  {
    bookingId: 'BK123',
    // ... template data
  }
);
```

#### sendNotification(email, phone, templateName, data)
Sends both email and SMS notifications.
```javascript
const results = await sendNotification(
  'user@example.com',
  '+919999999999',
  'bookingConfirmation',
  {
    // ... template data
  }
);

// Returns:
// {
//   email: { success: true, message: '...' },
//   sms: { success: true, message: '...' }
// }
```

### Available Templates

1. **bookingConfirmation**
   - Email: Full HTML template with journey details
   - SMS: Concise booking confirmation

2. **bookingCancellation**
   - Email: Cancellation confirmation with refund details
   - SMS: Brief cancellation notice

3. **passwordReset**
   - Email: Reset code with security warnings
   - SMS: 6-digit code with expiry notice

4. **journeyReminder** (Ready for implementation)
   - Email: 24-hour reminder with checklist
   - SMS: Brief journey reminder

## Email Templates

### Design Features
- Responsive HTML design
- Gradient headers (Purple theme)
- Clear information hierarchy
- Professional formatting
- Security notices
- Company branding
- QR code placeholders
- Mobile-friendly layout

### Customization
Edit `backend/config/notification.js` to customize:
- Colors and styling
- Email content
- Company information
- Footer details
- Logo/images

## SMS Templates

### Best Practices
- Keep under 160 characters
- Include essential information only
- Use clear, concise language
- Include contact number
- Use abbreviations where appropriate

### Indian Number Format
The system automatically handles Indian numbers:
- Input: `9999999999` → Converts to: `+919999999999`
- Input: `+919999999999` → Keeps as is

## Error Handling

### Graceful Degradation
- If SendGrid fails, booking still succeeds
- If Twilio fails, booking still succeeds
- Errors are logged for monitoring
- Users get success message regardless

### Error Logging
All notification errors are logged:
```javascript
console.error('Notification error:', error);
```

Monitor these logs to track delivery issues.

## Cost Considerations

### SendGrid (Email)
- **Free Tier**: 100 emails/day
- **Essentials**: $15/month for 50,000 emails
- **Pro**: $90/month for 100,000 emails

### Twilio (SMS)
- **Free Trial**: $15 credit (limited features)
- **Pay-as-you-go**: ~$0.0075 per SMS (India)
- **Monthly volume discounts** available

### Cost Optimization
1. Use email as primary channel (cheaper)
2. Use SMS for critical notifications only
3. Implement SMS preferences in user settings
4. Use bulk sending for reminders
5. Monitor usage regularly

## Security Best Practices

### API Key Security
1. ✅ Never commit .env file to Git
2. ✅ Use environment variables only
3. ✅ Rotate keys regularly (every 90 days)
4. ✅ Use different keys for dev/prod
5. ✅ Restrict API key permissions (least privilege)

### Data Protection
1. Don't log sensitive user data
2. Don't include passwords in notifications
3. Use secure templates (no XSS vulnerabilities)
4. Validate phone numbers before sending
5. Implement rate limiting for notifications

### Compliance
1. Include unsubscribe links (future feature)
2. Follow CAN-SPAM Act guidelines
3. Comply with TRAI regulations (India)
4. Provide opt-out for SMS
5. Store consent records

## Troubleshooting

### Email Not Received
1. ✅ Check SendGrid API key is correct
2. ✅ Verify sender email address
3. ✅ Check spam/junk folder
4. ✅ Verify recipient email is valid
5. ✅ Check SendGrid dashboard for errors
6. ✅ Ensure "From Email" is verified in SendGrid

### SMS Not Received
1. ✅ Check Twilio credentials are correct
2. ✅ Verify phone number format (+91...)
3. ✅ Check Twilio phone number is valid
4. ✅ For trial accounts: verify recipient number
5. ✅ Check Twilio console for delivery status
6. ✅ Ensure sufficient credits

### Common Errors

#### "SendGrid not configured"
- Add `SENDGRID_API_KEY` to .env file

#### "Twilio not configured"
- Add Twilio credentials to .env file

#### "Unverified recipient" (Twilio trial)
- Verify recipient phone in Twilio console
- Or upgrade to paid account

#### "Invalid API key"
- Regenerate API key in SendGrid/Twilio
- Update .env file with new key

#### "From email not verified"
- Complete sender verification in SendGrid
- Use verified sender email

## Future Enhancements

### Planned Features
1. **Journey Reminders**: Automated 24h before departure
2. **Delay Notifications**: Real-time delay alerts
3. **Promotional SMS**: Marketing campaigns
4. **Multi-language Support**: Templates in regional languages
5. **User Preferences**: Let users choose notification channels
6. **Notification History**: Track all sent notifications
7. **Retry Logic**: Automatic retry for failed deliveries
8. **Templates Admin Panel**: Edit templates via UI
9. **Analytics Dashboard**: Track open rates, delivery rates
10. **WhatsApp Integration**: Use WhatsApp Business API

### Webhook Support
Implement webhooks for delivery tracking:
- Email opened
- Email clicked
- SMS delivered
- SMS failed

### Advanced Features
1. **A/B Testing**: Test different email templates
2. **Personalization**: Dynamic content based on user data
3. **Attachments**: PDF tickets via email
4. **Rich SMS**: MMS with images
5. **Voice Calls**: IVR for critical notifications

## Monitoring and Analytics

### SendGrid Analytics
Access metrics in SendGrid dashboard:
- Delivery rate
- Open rate
- Click rate
- Bounce rate
- Spam reports

### Twilio Analytics
Access metrics in Twilio console:
- Delivery rate
- Failed messages
- Delivery time
- Cost per message

### Custom Logging
Add to notification.js:
```javascript
// Log all notifications
const logNotification = async (type, channel, recipient, status) => {
  // Store in database for analytics
};
```

## Support and Resources

### Documentation
- **SendGrid Docs**: https://docs.sendgrid.com/
- **Twilio Docs**: https://www.twilio.com/docs/

### Getting Help
- **SendGrid Support**: https://support.sendgrid.com/
- **Twilio Support**: https://support.twilio.com/

### Community
- **SendGrid Community**: https://community.sendgrid.com/
- **Twilio Community**: https://www.twilio.com/community

## Conclusion

The notification system provides a professional, reliable way to communicate with users through multiple channels. The modular design makes it easy to add new notification types, customize templates, and integrate additional services in the future.

**Key Benefits:**
- ✅ Improved user experience
- ✅ Reduced support queries
- ✅ Professional communication
- ✅ Automated workflows
- ✅ Multi-channel delivery
- ✅ Scalable architecture
- ✅ Easy to customize
- ✅ Cost-effective solution
